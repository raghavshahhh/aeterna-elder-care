// src/lib/events/types.ts

export type RealtimeEventType =
  | "LEAD_CREATED"
  | "LEAD_UPDATED"
  | "SITE_VISIT_CREATED"
  | "SITE_VISIT_UPDATED"
  | "PARTNER_CREATED"
  | "REFERRAL_CREATED"
  | "REFERRAL_CONVERTED"
  | "REFERRAL_CLICKED"
  | "INVENTORY_UPDATED"
  | "BOOKING_CREATED"
  | "BOOKING_UPDATED"
  | "BOOKING_EXPIRED"
  | "PAYMENT_CREATED"
  | "PAYMENT_CAPTURED"
  | "PAYMENT_FAILED"
  | "PAYMENT_REFUNDED"
  | "RESIDENCE_UPDATED"
  | "SETTINGS_UPDATED"
  | "DOCUMENT_UPDATED"
  | "LOCATION_UPDATED"
  | "PROJECT_UPDATED";

export type EventChannel = "public" | "admin";

export type EntityType =
  | "LEAD"
  | "SITE_VISIT"
  | "PARTNER"
  | "REFERRAL"
  | "INVENTORY"
  | "BOOKING"
  | "PAYMENT"
  | "SETTINGS"
  | "DOCUMENT"
  | "LOCATION"
  | "PROJECT";

export interface RealtimeBusinessEvent {
  id: string;
  type: RealtimeEventType;
  channel: EventChannel;
  timestamp: string;
  version: number;
  entityType: EntityType;
  entityId: string;
  actor?: {
    id?: string;
    name?: string;
    role?: string;
  };
  metadata?: Record<string, any>;
}
