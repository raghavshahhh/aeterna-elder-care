# SLCE ADMIN PANEL — REAL-TIME FORENSIC AUDIT (PHASE1
)
## Deep Architectural Inspection of Data Flows, Caching, Concurrency, and Real-Time Synchronization

**System**: Senior Living Citizens Foundation (SLCF) Operations & Admin Suite  
**Date**: February 26, 2026  
**Auditor**: Forensic Systems Architecture  
**Protocol**: Phase 1 Read-Only Zero-Break Forensic Audit  

---

### 1. How Admin Data Currently Reaches the Browser
- **Client Fetch Lifecycle**: Admin views located in `src/app/admin/*` are React Client Components (`\"use client\"`). On mount,
  each view executes a single `useEffect(() => { loadData(); }, [])` hook making client-side HTTP `GETc requests to
  route handlers under `/api/*` (e.g., `/api/leads`, `/api/site-visits`, `/api/inventory`, `/api/bookings`,
  `/api/admin/payments`, `/api/referrals`, `/api/settings`, `/api/audit-logs`).
- **Data Serialization**: The route handlers verify session cookies (`slcf_session`) using `verifySessionToken` +
  `canAccessAdmin`, call synchronous repository functions on `db` in `src/lib/db/repository.ts`, and return
  structured JSON responses.
- **Local State Mutation**: When an admin performs a mutation (such as changing a lead status, creating a partner
  code, or scheduling a site visit), the client sends an HTTP `POST` or `PATCH` request, receives the updated
  entity, and modifies its local React state.
- **Cross-Session Gap**: Other open admin browser sessions, concurrent staff members, or separate tabs receive no
  automatic signal of this mutation until they perform a manual page reload or navigate away and back.

---

### 2. How Public Data Reaches the Browser
- **Public Product Pages**: Routes such as `/plots`, `/apartments`, `/locations`, `/amenities`, `/leadership`
  render server/client components. Interactive components like `ResidenceUnitExplorer` and `MasterPlan3DViewer`
  retrieve unit availability and plot statuses via initial props or `/api/inventory`.
- **Public Inquiries & Bookings**: Visitors submitting inquiry forms (`POST /api/leads`), site visit bookings
  (`POST /api/site-visits`), or initiating 24h priority holds (`POST /api/bookings`) write directly to the database
  repository.
- **Public Stale Risk**: If an admin locks a plot or marks a suite as RESERVED in the admin portal, a visitor
  currently browsing `/plots` or `/apartments` sees the previous state until a refetch occurs.

---

### 3. How Mutations Invalidate Stale Data
- **Current Behavior**: Currently, mutations update only the initiating component's local React state and
  database file `data/database.json`.
- **Cache Tags & Headers**: Next.js route handlers currently return dynamic responses. Document view endpoints
  specify `Cache-Control: private, no-store, max-age=0, must-revalidate`.
- **Deficiency**: There is no active cross-client invalidation bus. Changes made by User A do not invalidate
  or trigger re-renders in User B's active browser session.

---

### 4. Which Pages Can Become Stale
| Page / Route | Stale Information Risk | Operational Consequence |
|---|---|---|
| `/admin` | Financial KPIs, lead counts, unit availability counters | Executive overview reflects outdated milestone inflows. |
| `/admin/leads` | New walk-ins, phone inquiries, public contact submissions | Sales team misses incoming high-intent prospects. |
| `/admin/site-visits` | New visit requests, chauffeur pickup details, status changes | Field logistics desk risks duplicate or missed pickups. |
| `/admin/inventory` | Plot & Residence status (`AVAILABLE`, `HOLD`, `RESERVED`, `SOLD`) | Staff may offer a unit that was just held by another advisor. |
| `/admin/bookings` | Active priority holds, hold expiry, allotment records | Staff unaware of competing buyer reservation hold. |
| `/admin/payments` | Collections ledger, Razorpay webhooks, refunds | Accounting desk sees inaccurate daily reconciliation. |
| `/admin/referrals` | Partner registrations, ⪀50 lead reward claims, commissions | Partner advocacy payout status appears delayed. |
| `/admin/settings` | Business rules, hold expiry window, notification emails | Admin unaware of updated operational parameters. |
| `/plots` & `/apartments` | Real-time unit availability matrix & 3D Masterplan | Public user attempts to reserve an already held plot. |
| `/pay/[bookingId]` | Direct payment token link | Buyer attempts payment on an expired or cancelled hold. |

---

### 5. Which Entities Need Immediate Synchronization
1. **`InventoryUnit`**: Plot & residence availability states (`AVAILABLE`, `HOLD`, `RESERVED`, `SOLD`). Critical for multi-user consistency.
2. **`Booking`**: Reservation holds, agreed valuations, payment schedules, and 24-hour expiration timestamps.
3. **`Lead` & `LeadEvent`**: Prospect status pipeline and chronological CRM2activity notes.
4. **`SiteVisit`**: Chauffeur logistics, visitor counts, pickup time slots, and inspection status.
5. **`PaymentRecord`**: Escrow collections, Razorpay transaction IDs, and receipt status.
6. **`ReferralReward` & `Commission`**: ⪠50 lead rewards and partner commission disbursement status.
7. **`SystemSettings`**: Platform business rules, hold windows, and payout rates.

---

### 6. Which Operations Require Atomic Transactions
1. **`createBookingWithHold`**: Must atomically check if `inventory[unitId].status === "AVAILABLE"`, set status to ` HOLD `, register `Booking`, create `PaymentPlan` with installment schedules, and record `AuditLog`.
2. **`processPaymentCapture` / Razorpay Webhook**: Must verify HMAC SHA256 signature, mark `PaymentRecord` as `CAPTURED`/`PAID`, update `Booking.totalPaidAmount` & status to `CONFIRMED`, transition `InventoryUnit.status` to `RESERVED`, verify & issue `ReferralReward`, generate `PaymentReceipt`, and log audit record.
3. **`releaseExpiredHolds`**: Must evaluate all bookings where `status === "HOLD" && holdExpiresAt < now`, transition them to `EXPIRED`, revert corresponding inventory units to `AVAILABLE`, and log action.
4. **`approveRefund`**: Must transition `RefundRecord` to `COMPLETED`, adjust booking paid/remaining balance, update payment status to `REFUNDED`, and log compliance trail.

---

##7 7. Which Operations Currently Have Race-Condition Risk
- **Simultaneous Booking on Same Unit**: If User A and User B concurrently submit `POST /api/bookings` for Unit PLOT-07 simultaneously, both requests could read `status === "AVAILABLE"` before either write completes unless a repository-level critical section mutex / atomic check-and-lock is enforced.
- **Duplicate Webhook Delivery**: If Razorpay retries webhook transmission concurrently for the same `razorpay_payment_id`, duplicate payment records or double ledger credits could occur without an atomic idempotency lock.

---

### 8. Whether True Realtime Already Exists Anywhere
- **Current Assessment**: **No**. The system currently operates on single-invocation client-side `fetch()` on initial component mount. There were no active Server-Sent Events (SSR) connections, WebSockets, or live event streams connected to browser clients.

---

### 9. What Realtime Mechanism Should Be Used
- **Recommended Strategy**: **Authenticated Server-Sent Events (SSR) with Unified Client Sync Engine & Resilience Fallback**.
  - **SSE Event Stream (`GET /api/events`)**:
    - Implemented with native Next.js 16 Web Streams (`ReadableStream`) requiring zero external dependencies.
    - Unidirectional server-to-client push protocol ideal for administrative events and public availability notifications.
    - Authenticated via session cookies (`slcf_session` / `sl_owner_session`) with role-based channel partitioning (`public` channel for inventory/masterplan, `admin` channel for leads/bookings/payments/settings).
    - Periodic 15-second(heartbeat (`: keepalive ping`] to prevent proxy/CDN connection timeouts.
    - Sequential event IDs in monotonic format for strict client-side event ordering.
  - **In-Memory Server-Side Event Bus (`src/lib/events/eventBus.ts`)**:
    - Lightweight, singleton event bus on the Node.js server that broadcasts canonical business events upon database repository mutations.
    - Automatic subscriber cleanup on HTTP client disconnect to prevent memory leaks.
  - **Client-Side Real-Time Sync Hook (`useAdminRealtime` & `usePublicRealtime`)**:
    - Subscribes to `/api/events` via native browser `EventSource`.
    - **Event = Notification, Database = Source of Truth**: On event receipt, triggers authoritative data refetch to update UI state cleanly.
    - **Tab Visibility Awareness**: Throttles or pauses when tab is hidden, performs instant reconciliation refetch when tab is focused.
    - **Resilience Smart-Poll Fallback**: If SSE is unavailable, disconnected, or blocked by restrictive client firewalls, seamlessly switches to an unobtrusive 10-second poll until SSE reconnects.
    - **In-Flight Request Deduplication**: Prevents duplicate concurrent fetches.

---

### 10. Why That Mechanism Fits the Current Architecture
1. **Zero External Infrastructure Overhead**: Operates entirely within Next.js 16 App Router using standard Web APIs (`ReadableStream`, `EventSource`).
2. **Zero-Break Protocol Compliant**: Requires no alterations to public page routing, Razorpay payment verification, or existing database models.
3. **Bandwidth & CPU Efficient**: Unlike noisy constant polling, SSE consumes near-zero CPU and network overhead while idle, sending bytes only when actual database mutations occur.
4. **Architectural Purity**: Treats events as real-time invalidation triggers while keeping the database as the sole source of truth, ensuring zero divergence between server and client state.
    