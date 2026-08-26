// src/hooks/useAdminRealtime.ts
"use client";

import { useEffect, useRef, useCallback } from "react";
import { RealtimeBusinessEvent, RealtimeEventType } from "@/lib/events/types";

export interface UseAdminRealtimeOptions {
  onEvent?: (event: RealtimeBusinessEvent) => void;
  onRefresh?: () => void;
  eventTypes?: RealtimeEventType[];
  enabled?: boolean;
  fallbackPollIntervalMs?: number;
}

export function useAdminRealtime({
  onEvent,
  onRefresh,
  eventTypes,
  enabled = true,
  fallbackPollIntervalMs = 10000,
}: UseAdminRealtimeOptions) {
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
    let fallbackPollTimer: NodeJS.Timeout | null = null;
    let isConnected = false;

    // Start fallback polling if SSE is unavailable or disconnected
    const startFallbackPolling = () => {
      if (fallbackPollTimer) return;
      fallbackPollTimer = setInterval(() => {
        if (document.visibilityState === "visible") {
          triggerRefresh();
        }
      }, fallbackPollIntervalMs);
    };

    const stopFallbackPolling = () => {
      if (fallbackPollTimer) {
        clearInterval(fallbackPollTimer);
        fallbackPollTimer = null;
      }
    };

    const connectSSE = () => {
      try {
        eventSource = new EventSource("/api/events?channel=admin");

        eventSource.onopen = () => {
          isConnected = true;
          stopFallbackPolling();
        };

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
            console.error("[useAdminRealtime] Failed to parse SSE event payload:", err);
          }
        };

        // Listen for specific business events
        const knownTypes: RealtimeEventType[] = [
          "LEAD_CREATED",
          "LEAD_UPDATED",
          "SITE_VISIT_CREATED",
          "SITE_VISIT_UPDATED",
          "PARTNER_CREATED",
          "REFERRAL_CREATED",
          "REFERRAL_CONVERTED",
          "INVENTORY_UPDATED",
          "BOOKING_CREATED",
          "BOOKING_UPDATED",
          "BOOKING_EXPIRED",
          "PAYMENT_CREATED",
          "PAYMENT_CAPTURED",
          "PAYMENT_FAILED",
          "PAYMENT_REFUNDED",
          "RESIDENCE_UPDATED",
          "SETTINGS_UPDATED",
          "DOCUMENT_UPDATED",
          "LOCATION_UPDATED",
          "PROJECT_UPDATED",
        ];

        knownTypes.forEach((t) => {
          eventSource?.addEventListener(t, (e: MessageEvent) => {
            handleIncomingEvent(e.data);
          });
        });

        eventSource.onerror = () => {
          isConnected = false;
          startFallbackPolling();
        };
      } catch (err) {
        console.error("[useAdminRealtime] Failed to initialize EventSource:", err);
        startFallbackPolling();
      }
    };

    connectSSE();

    // Visibility-aware state reconciliation
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Tab brought to foreground -> immediately refetch latest state
        triggerRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopFallbackPolling();
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    };
  }, [enabled, fallbackPollIntervalMs, triggerRefresh]);
}
