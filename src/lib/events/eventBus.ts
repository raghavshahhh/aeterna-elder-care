// src/lib/events/eventBus.ts
import { EventEmitter } from "events";
import { RealtimeBusinessEvent, RealtimeEventType, EventChannel, EntityType } from "./types";

class RealtimeEventBus extends EventEmitter {
  private static instance: RealtimeEventBus;
  private sequence = 0;
  private recentEvents: RealtimeBusinessEvent[] = [];
  private readonly maxBufferSize = 100;

  constructor() {
    super();
    this.setMaxListeners(200); // Allow multiple concurrent admin and public SSE streams
  }

  public static getInstance(): RealtimeEventBus {
    const globalKey = "__SLCF_REALTIME_EVENT_BUS__";
    if (!(globalThis as any)[globalKey]) {
      (globalThis as any)[globalKey] = new RealtimeEventBus();
    }
    return (globalThis as any)[globalKey];
  }

  public publish(
    eventInput: Omit<RealtimeBusinessEvent, "id" | "timestamp" | "version">
  ): RealtimeBusinessEvent {
    this.sequence++;
    const fullEvent: RealtimeBusinessEvent = {
      ...eventInput,
      id: `evt_${Date.now()}_${this.sequence}`,
      timestamp: new Date().toISOString(),
      version: this.sequence,
    };

    // Store in circular buffer
    this.recentEvents.push(fullEvent);
    if (this.recentEvents.length > this.maxBufferSize) {
      this.recentEvents.shift();
    }

    // Emit event
    this.emit("event", fullEvent);
    this.emit(fullEvent.type, fullEvent);
    this.emit(`channel:${fullEvent.channel}`, fullEvent);

    return fullEvent;
  }

  public getEventsSince(lastEventId?: string, channel?: EventChannel): RealtimeBusinessEvent[] {
    if (!lastEventId) return [];
    const index = this.recentEvents.findIndex((e) => e.id === lastEventId);
    if (index === -1) return [];

    const missed = this.recentEvents.slice(index + 1);
    if (channel) {
      return missed.filter((e) => channel === "admin" || e.channel === "public");
    }
    return missed;
  }
}

export const eventBus = RealtimeEventBus.getInstance();

// Broadcast Helpers for Domain Mutations
export function broadcastBusinessEvent(
  type: RealtimeEventType,
  channel: EventChannel,
  entityType: EntityType,
  entityId: string,
  metadata?: Record<string, any>,
  actor?: { id?: string; name?: string; role?: string }
): RealtimeBusinessEvent {
  return eventBus.publish({
    type,
    channel,
    entityType,
    entityId,
    metadata,
    actor,
  });
}
