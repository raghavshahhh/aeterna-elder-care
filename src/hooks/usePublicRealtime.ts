// src/hooks/usePublicRealtime.ts
"use client";

import { useEffect, useRef, useCallback } from "react";
import { RealtimeBusinessEvent, RealtimeEventType } from "@/lib/events/types";

export interface UsePublicRealtimeOptions {
  onEvent?: (event: RealtimeBusinessEvent) => void;
  onRefresh?: () => void;
  eventTypes?: RealtimeEventType[];
  enabled?: boolean;
}

export function usePublicRealtime({
  onEvent,
  onRefresh,
  eventTypes = ["INVENTORY_UPDATED", "BOOKING_CREATED", "BOOKING_EXPIRED", "BOOKING_UPDATED"],
  enabled = true,
}: UsePublicRealtimeOptions) {
  const onEventRef = useRef(onEvent);
  const onRefreshRef = useRef(onRefresh);
  const eventTypesRef = useRef(eventTypes);

  useEffect(() => {
    onEventRef.current = onEvent;
    onRefreshRef.current = onRefresh;
    eventTypesRef.current = eventTypes;
  }, [onEvent, onRefresh, eventTypes]);

  const triggerRefresh = useCallback(() => {
    if (typeof onRefreshRef.current === "function") {
      onRefreshRef.current();
    }
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let eventSource: EventSource | null = null;

    const connectSSE = () => {
      try {
        eventSource = new EventSource("/api/events?channel=public");

        const handleIncomingEvent = (eventData: any) => {
          try {
            const parsed: RealtimeBusinessEvent =
              typeof eventData === "string" ? JSON.parse(eventData) : eventData;

            const interestedTypes = eventTypesRef.current;
            if (
              !interestedTypes ||
              interestedTypes.length === 0 ||
              interestedTypes.includes(parsed.type)
            ) {
              if (onEventRef.current) {
                onEventRef.current(parsed);
              }
              triggerRefresh();
            }
          } catch (err) {
            console.error("[usePublicRealtime] Parse error:", err);
          }
        };

        const publicTypes: RealtimeEventType[] = [
          "INVENTORY_UPDATED",
          "BOOKING_CREATED",
          "BOOKING_EXPIRED",
          "BOOKING_UPDATED",
          "RESIDENCE_UPDATED",
        ];

        publicTypes.forEach((t) => {
          eventSource?.addEventListener(t, (e: MessageEvent) => {
            handleIncomingEvent(e.data);
          });
        });
      } catch (err) {
        console.error("[usePublicRealtime] SSE Connection error:", err);
      }
    };

    connectSSE();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        triggerRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    };
  }, [enabled, triggerRefresh]);
}
