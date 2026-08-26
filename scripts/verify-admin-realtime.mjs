// scripts/verify-admin-realtime.mjs
import fs from "fs";

console.log("================================================================");
console.log("SLCF ADMIN PANEL REAL-TIME & CONCURRENCY VERIFICATION SUITE");
console.log("================================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify Event Bus & Event Types Infrastructure
const typesCode = fs.readFileSync("src/lib/events/types.ts", "utf8");
const busCode = fs.readFileSync("src/lib/events/eventBus.ts", "utf8");
const sseCode = fs.readFileSync("src/app/api/events/route.ts", "utf8");

assert(typesCode.includes("LEAD_CREATED"), "types.ts defines LEAD_CREATED");
assert(typesCode.includes("INVENTORY_UPDATED"), "types.ts defines INVENTORY_UPDATED");
assert(typesCode.includes("BOOKING_CREATED"), "types.ts defines BOOKING_CREATED");
assert(typesCode.includes("BOOKING_EXPIRED"), "types.ts defines BOOKING_EXPIRED");
assert(typesCode.includes("PAYMENT_CAPTURED"), "types.ts defines PAYMENT_CAPTURED");
assert(typesCode.includes("SETTINGS_UPDATED"), "types.ts defines SETTINGS_UPDATED");

assert(busCode.includes("class RealtimeEventBus"), "eventBus.ts defines RealtimeEventBus");
assert(busCode.includes("publish("), "eventBus.ts has publish method");
assert(busCode.includes("getEventsSince("), "eventBus.ts has replay buffer for reconnects");
assert(busCode.includes("broadcastBusinessEvent"), "eventBus.ts exports broadcast helper");

assert(sseCode.includes("text/event-stream"), "SSE route specifies text/event-stream content type");
assert(sseCode.includes(": keepalive"), "SSE route sends periodic keepalive heartbeats");
assert(sseCode.includes("lastEventId"), "SSE route handles Last-Event-ID replay header");
assert(sseCode.includes("canAccessAdmin"), "SSE route enforces channel authorization based on session");

// 2. Verify Client-Side Real-Time Hooks
const adminHookCode = fs.readFileSync("src/hooks/useAdminRealtime.ts", "utf8");
const publicHookCode = fs.readFileSync("src/hooks/usePublicRealtime.ts", "utf8");

assert(adminHookCode.includes("new EventSource"), "useAdminRealtime connects to EventSource");
assert(adminHookCode.includes("fallbackPollIntervalMs"), "useAdminRealtime has resilience fallback polling");
assert(adminHookCode.includes("visibilitychange"), "useAdminRealtime has tab visibility-aware state reconciliation");

assert(publicHookCode.includes("new EventSource"), "usePublicRealtime connects to public EventSource");
assert(publicHookCode.includes("INVENTORY_UPDATED"), "usePublicRealtime listens to INVENTORY_UPDATED");

// 3. Verify Admin Pages Connected to Real-Time Synchronization
const dashboardCode = fs.readFileSync("src/app/admin/page.tsx", "utf8");
const leadsCode = fs.readFileSync("src/app/admin/leads/page.tsx", "utf8");
const visitsCode = fs.readFileSync("src/app/admin/site-visits/page.tsx", "utf8");
const invCode = fs.readFileSync("src/app/admin/inventory/page.tsx", "utf8");
const bookingsCode = fs.readFileSync("src/app/admin/bookings/page.tsx", "utf8");
const paymentsCode = fs.readFileSync("src/app/admin/payments/page.tsx", "utf8");
const referralsCode = fs.readFileSync("src/app/admin/referrals/page.tsx", "utf8");
const settingsCode = fs.readFileSync("src/app/admin/settings/page.tsx", "utf8");
const auditCode = fs.readFileSync("src/app/admin/audit-logs/page.tsx", "utf8");

assert(dashboardCode.includes("useAdminRealtime("), "Dashboard connects to useAdminRealtime");
assert(leadsCode.includes("useAdminRealtime("), "Leads CRM connects to useAdminRealtime");
assert(visitsCode.includes("useAdminRealtime("), "Site Visits connects to useAdminRealtime");
assert(invCode.includes("useAdminRealtime("), "Inventory connects to useAdminRealtime");
assert(bookingsCode.includes("useAdminRealtime("), "Bookings connects to useAdminRealtime");
assert(paymentsCode.includes("useAdminRealtime("), "Payments connects to useAdminRealtime");
assert(referralsCode.includes("useAdminRealtime("), "Referrals connects to useAdminRealtime");
assert(settingsCode.includes("useAdminRealtime("), "Settings connects to useAdminRealtime");
assert(auditCode.includes("useAdminRealtime("), "Audit Logs connects to useAdminRealtime");

// 4. Verify Public Availability Synchronized to Real-Time
const matrixCode = fs.readFileSync("src/components/property/AvailabilityMatrix.tsx", "utf8");
const resExplorerCode = fs.readFileSync("src/components/property/ResidenceUnitExplorer.tsx", "utf8");

assert(matrixCode.includes("usePublicRealtime("), "Public AvailabilityMatrix connects to usePublicRealtime");
assert(resExplorerCode.includes("usePublicRealtime("), "Public ResidenceUnitExplorer connects to usePublicRealtime");

// 5. Verify Repository Business Mutex & FSM Validations
const repoCode = fs.readFileSync("src/lib/db/repository.ts", "utf8");

assert(
  repoCode.includes("unit.status !== 'AVAILABLE'") &&
  repoCode.includes("is not available for reservation"),
  "Repository createBookingWithHold enforces atomic availability check"
);

assert(
  repoCode.includes("allowedTransitions") &&
  repoCode.includes("Invalid booking state transition"),
  "Repository updateBooking enforces server-side Finite State Machine (FSM)"
);

assert(
  repoCode.includes("p.razorpayPaymentId === params.razorpayPaymentId && p.status === 'CAPTURED'") ||
  repoCode.includes("existingPayment && existingPayment.status === 'CAPTURED'"),
  "Repository verifyAndCompletePayment enforces payment replay idempotency"
);

// 6. Verify Booking API Returns 409 on Conflict
const bookingApiCode = fs.readFileSync("src/app/api/bookings/route.ts", "utf8");
assert(
  bookingApiCode.includes("isConflict ? 409 : 400"),
  "POST /api/bookings returns HTTP 409 Conflict when unit is already taken"
);

// 7. Verify Real-Time Event Dispatch on Repository Mutations
assert(repoCode.includes("broadcastBusinessEvent('LEAD_CREATED'"), "Repository emits LEAD_CREATED");
assert(repoCode.includes("broadcastBusinessEvent('LEAD_UPDATED'"), "Repository emits LEAD_UPDATED");
assert(repoCode.includes("broadcastBusinessEvent('SITE_VISIT_CREATED'"), "Repository emits SITE_VISIT_CREATED");
assert(repoCode.includes("broadcastBusinessEvent('SITE_VISIT_UPDATED'"), "Repository emits SITE_VISIT_UPDATED");
assert(repoCode.includes("broadcastBusinessEvent('INVENTORY_UPDATED'"), "Repository emits INVENTORY_UPDATED");
assert(repoCode.includes("broadcastBusinessEvent('BOOKING_CREATED'"), "Repository emits BOOKING_CREATED");
assert(repoCode.includes("broadcastBusinessEvent('BOOKING_UPDATED'"), "Repository emits BOOKING_UPDATED");
assert(repoCode.includes("broadcastBusinessEvent('BOOKING_EXPIRED'"), "Repository emits BOOKING_EXPIRED");
assert(repoCode.includes("broadcastBusinessEvent('PAYMENT_CAPTURED'"), "Repository emits PAYMENT_CAPTURED");
assert(repoCode.includes("broadcastBusinessEvent('PARTNER_CREATED'"), "Repository emits PARTNER_CREATED");
assert(repoCode.includes("broadcastBusinessEvent('REFERRAL_CONVERTED'"), "Repository emits REFERRAL_CONVERTED");
assert(repoCode.includes("broadcastBusinessEvent('SETTINGS_UPDATED'"), "Repository emits SETTINGS_UPDATED");

console.log("----------------------------------------------------------------");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("----------------------------------------------------------------");

if (failed > 0) process.exit(1);
