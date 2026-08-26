// src/app/api/events/route.ts
import { NextRequest } from "next/server";
import { eventBus } from "@/lib/events/eventBus";
import { RealtimeBusinessEvent } from "@/lib/events/types";
import { verifySessionToken, canAccessAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token =
    request.cookies.get("slcf_session")?.value ||
    request.cookies.get("sl_owner_session")?.value;
  const user = verifySessionToken(token);
  const isAdmin = Boolean(user && canAccessAdmin(user));

  const { searchParams } = new URL(request.url);
  const requestedChannel = searchParams.get("channel") || "all";
  const lastEventId =
    request.headers.get("last-event-id") ||
    searchParams.get("lastEventId") ||
    undefined;

  const encoder = new TextEncoder();

  let cleanupListeners: (() => void) | null = null;
  let heartbeatTimer: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Helper to enqueue formatted SSE messages
      const sendSSE = (event: string, data: any, id?: string) => {
        try {
          let msg = "";
          if (id) msg += `id: ${id}\n`;
          if (event) msg += `event: ${event}\n`;
          msg += `data: ${typeof data === "string" ? data : JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(msg));
        } catch {
          // Stream might be closed
        }
      };

      // 1. Send Handshake
      sendSSE("connected", {
        status: "connected",
        isAdmin,
        allowedChannels: isAdmin ? ["public", "admin"] : ["public"],
        timestamp: new Date().toISOString(),
      });

      // 2. Replay missed events if requested
      if (lastEventId) {
        const missed = eventBus.getEventsSince(
          lastEventId,
          isAdmin ? undefined : "public"
        );
        for (const evt of missed) {
          sendSSE(evt.type, evt, evt.id);
        }
      }

      // 3. Setup Live Event Subscriber
      const onEvent = (evt: RealtimeBusinessEvent) => {
        // Enforce channel permissions
        if (evt.channel === "admin" && !isAdmin) {
          return;
        }

        // Filter by requested channel if specified
        if (requestedChannel === "public" && evt.channel !== "public") {
          return;
        }
        if (requestedChannel === "admin" && evt.channel !== "admin") {
          return;
        }

        sendSSE(evt.type, evt, evt.id);
      };

      eventBus.on("event", onEvent);

      // 4. Heartbeat Ping every 15s
      heartbeatTimer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: keepalive ${Date.now()}\n\n`));
        } catch {
          if (heartbeatTimer) clearInterval(heartbeatTimer);
        }
      }, 15000);

      cleanupListeners = () => {
        eventBus.off("event", onEvent);
        if (heartbeatTimer) {
          clearInterval(heartbeatTimer);
          heartbeatTimer = null;
        }
      };
    },
    cancel() {
      if (cleanupListeners) {
        cleanupListeners();
      }
    },
  });

  // Handle request abort
  request.signal.addEventListener("abort", () => {
    if (cleanupListeners) {
      cleanupListeners();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform, private, no-store, max-age=0, must-revalidate",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
