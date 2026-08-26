# SLCF ADMIN PANEL — COMPREHENSIVE FORENSIC AUDIT & STATUS MATRIX

**Date of Audit**: February 26, 2026  
**Auditor**: Antigravity Assistant (DeepMind Agentic Engine)  
**System**: Senior Living Citizens Foundation (SLCF) Operations & Admin Command Center  
**Protocol**: Zero-Break Real-Time Database-Backed Production Protocol  

---

## 1. Executive Summary

The SLCF administrative suite consists of **12 primary admin routes** and **28 backend API endpoints** providing full operational control over CRM leads, chauffeured site visits, 64-plot & residence inventory matrices, 24-hour allotment holds, Razorpay collections, ₹50 referral advocacy rewards, statutory document vaults, system governance settings, and immutable security audit logs.

This audit maps every admin route, UI component, button action, data flow, authorization guard, and database repository model.

---

## 2. Admin Routes, Feature Classification & Current Status

| # | Route | Feature Scope | DB Model Involved | Current Status | Button Actions & Classification | Missing / Disconnected Functionality | Risk Level |
|---|---|---|---|---|---|---|---|
| 1 | `/admin` | Executive Command Center & Inflow Analytics | `Lead`, `SiteVisit`, `Booking`, `ReferralReward`, `PaymentRecord` | **Partially Operational** | 1. Quick Links (Functional)<br>2. Metrics Cards (Functional)<br>3. Monthly Revenue Bar Chart (Hardcoded mock dataset) | Monthly revenue was using a static 6-month array instead of dynamic aggregation from real payments/bookings. | **Medium** |
| 2 | `/admin/leads` | CRM & Lead Pipeline (New, Contacted, Qualified, Site Visit, Booked) | `Lead`, `LeadEvent`, `Referrer` | **Fully Operational** | 1. Status Filter Pills (Functional)<br>2. Search Bar (Functional)<br>3. View Dossier (Functional)<br>4. Update Status (Functional)<br>5. Add Timeline Note (Functional) | Missing direct "Add Walk-in Lead" modal from Admin UI. | **Low** |
| 3 | `/admin/site-visits` | Field Logistics & Chauffeur Scheduling | `SiteVisit`, `Lead` | **Fully Operational** | 1. Status Filter Pills (Functional)<br>2. Confirm Visit (Functional)<br>3. Mark Visited (Functional)<br>4. Cancel Visit (Functional) | Missing direct "Schedule New Visit" modal from Admin UI. | **Low** |
| 4 | `/admin/inventory` | 64-Plot & Residence Availability Matrix | `InventoryUnit`, `Plot`, `Booking` | **Fully Operational** | 1. Type & Status Filters (Functional)<br>2. Search Unit (Functional)<br>3. Quick Status Toggle (Functional)<br>4. Inline Price Editor (Functional) | Automatic inventory status synchronization upon booking confirmation/cancellation needed hardening. | **Medium** |
| 5 | `/admin/bookings` | 24-Hour Priority Holds & Allotments | `Booking`, `PaymentRecord`, `InventoryUnit` | **Fully Operational** | 1. Search & Status Filters (Functional)<br>2. +24h Hold Extension (Functional)<br>3. Checkout Payment Link (Functional)<br>4. Customer One-View Dossier (Functional) | Direct "Create Allotment / Hold" button from admin UI was missing. | **Medium** |
| 6 | `/admin/payments` | Escrow Ledger, Razorpay Webhooks, Refunds | `PaymentRecord`, `PaymentReceipt`, `RefundRecord`, `PaymentLinkRecord` | **Fully Operational** | 1. Create Payment Request (Functional)<br>2. Approve Refund (Functional)<br>3. View/Download Receipt (Functional)<br>4. Filter by Status/Search (Functional) | Ensure sensitive Razorpay keys are never leaked to client side. | **High** |
| 7 | `/admin/referrals` | Partner Advocacy & ₹50 Lead Rewards | `Referrer`, `ReferralReward`, `Commission` | **Fully Operational** | 1. Generate Partner Code Modal (Fully Functional with Multi-State UX)<br>2. Verify/Reject ₹50 Reward (Functional)<br>3. Approve 1% Commission (Functional)<br>4. Copy Link / WhatsApp (Functional) | Fully hardened and verified in previous phase. | **Low** |
| 8 | `/admin/locations` | Multi-Location Sanctuary CMS | `Location`, `Project` | **Fully Operational** | 1. Add Location Modal (Functional)<br>2. Toggle Published (Functional)<br>3. Edit Fields (Functional) | Full CRUD validation on server-side. | **Low** |
| 9 | `/admin/projects` | Development Masterplans & Blueprints CMS | `Project`, `InventoryUnit` | **Fully Operational** | 1. Toggle Published (Functional)<br>2. Public Page Link (Functional) | Server-side validation and edit capabilities. | **Low** |
| 10 | `/admin/documents` | Statutory Document Vault & Aks Shajra | `DocumentRecord`, `DocumentVersion` | **Fully Operational** | 1. Category Filters (Functional)<br>2. Search Vault (Functional)<br>3. View PDF in Secure Tab (Functional) | Add document upload/registration modal for admins. | **Medium** |
| 11 | `/admin/audit-logs` | Security & Compliance Audit Trail | `AuditLog` | **Backend Missing Route** | 1. Table Render (Static Fallback when route 404s) | `/api/audit-logs` route.ts was missing. | **Medium** |
| 12 | `/admin/settings` | Portal Configuration & Business Governance | `SystemSettings` | **Frontend Disconnected** | 1. Save Settings Button (Simulated with setTimeout) | `/api/settings` route was missing; frontend did not fetch or save to database. | **High** |

---

## 3. Database Models & Canonical Sources of Truth

All business entities are managed in `src/lib/db/schema.ts` and persisted through transactional operations in `src/lib/db/repository.ts`:

1. `User` — Role-based access control (`SUPER_ADMIN`, `ADMIN`, `SALES_MANAGER`, `REFERRAL_PARTNER`, `BUYER`).
2. `Lead` & `LeadEvent` — Complete prospect lifecycle, interest, budget, referral attribution, and timeline events.
3. `SiteVisit` — Chauffeur logistics, Dwarka Sec-21 pickup points, visitor counts, status.
4. `InventoryUnit` & `Plot` — Masterplan 64 freehold plots + 3 floors of senior residences, facing, super/carpet area, price, and availability status (`AVAILABLE`, `HOLD`, `RESERVED`, `SOLD`).
5. `Booking` — Allotment holds, customer dossier, agreed price, installment schedule, and payment reconciliation.
6. `PaymentRecord`, `PaymentReceipt`, `RefundRecord`, `PaymentLinkRecord` — Verified Razorpay transaction orders, webhook logs, and automated receipt generation.
7. `Referrer`, `ReferralReward`, `Commission` — Partner advocacy directory, unique `SLFXXXX` attribution codes, ₹50 verified lead verification queue, and 1% sales commissions.
8. `Location` & `Project` — Multi-location expansion CMS (Kheri Asra Jhajjar, North Goa, Dehradun).
9. `DocumentRecord` & `DocumentVersion` — Statutory Aks Shajra registry records, Jamabandi, and architectural blueprints.
10. `AuditLog` — Immutable compliance log of all admin logins, mutations, status changes, and reward approvals.
11. `SystemSettings` — Dynamic lead reward amounts (₹50), commission rates (1%), cookie attribution days (30), hold expiry hours (24), and notification routing.

---

## 4. Remediation Plan

1. **Implement `/api/audit-logs/route.ts`**:
   - `GET /api/audit-logs` with session authorization, returning live `db.getAuditLogs()`.
2. **Implement `/api/settings/route.ts`**:
   - `GET /api/settings` and `PATCH /api/settings` to load and mutate real system settings with audit logging.
3. **Upgrade `/admin/page.tsx` (Dashboard)**:
   - Compute real revenue aggregates from `db.getPayments()` and `db.getBookings()`. Remove all hardcoded dummy revenue arrays.
4. **Upgrade `/admin/settings/page.tsx`**:
   - Connect to `/api/settings` with loading, saving, error state, and confirmed database persistence.
5. **Upgrade `/admin/leads/page.tsx` & `/admin/site-visits/page.tsx`**:
   - Add "Create New Lead" and "Schedule New Site Visit" modal workflows for manual administrative entry.
6. **Upgrade `/admin/inventory/page.tsx` & `/admin/bookings/page.tsx`**:
   - Ensure bidirectional synchronization: changing booking status updates unit availability automatically.
7. **Security & RBAC Enforcement**:
   - Verify that all administrative routes validate session tokens and role permissions.
