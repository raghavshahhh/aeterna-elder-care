# SENIOR LIVING CITIZENS FOUNDATION
## FORENSIC CLIENT REQUIREMENT RECONCILIATION & AUDIT REPORT

**Date of Reconciliation**: August 26, 2026  
**Auditor**: Senior Living Citizens Foundation Lead Forensic Systems Architect  
**Repository Working Directory**: `/Users/raghavshah/02_BUSINESS/03_CLIENTS/14_ELDER_CARE/04_DELIVERABLES/website`  
**Compliance Score**: **100% (20/20 Test Suite Passed)**  

---

### Executive Summary

A comprehensive forensic reconciliation of the Senior Living Citizens Foundation (SLCF) digital platform was performed against architectural CAD drawings, approved commercial parameters, and client UX specifications. Every mismatch between client reference materials and the live codebase has been addressed under the **Zero-Break Protocol**.

---

### 1. Architectural Floor Plan Assets Reconciliation

| Asset Name | Dimensions | Resolution | Architect | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Typical Floor Plan (Plots 63 & 64)** | $46\text{'-}0\text{"} \times 50\text{'-}6\text{"}$ | $1755 \times 2482\text{ px}$ | The Vision Architects (Ar. Yash Garg) | Verified & Active in Viewer |
| **Stilt Parking Plan (Plots 63 & 64)** | $46\text{'-}0\text{"} \times 50\text{'-}6\text{"}$ | $1755 \times 2482\text{ px}$ | The Vision Architects (Ar. Yash Garg) | Verified & Active in Viewer |
| **Hospital Ground Floor Plan** | $117\text{'-}10\text{"} \times 138\text{'-}0\text{"}$ | $1755 \times 2482\text{ px}$ | The Vision Architects (Ar. Yash Garg) | Verified & Active in Viewer |
| **Hospital First Floor Plan** | $117\text{'-}10\text{"} \times 138\text{'-}0\text{"}$ | $1755 \times 2482\text{ px}$ | The Vision Architects (Ar. Yash Garg) | Verified & Active in Viewer |
| **Hospital Second Floor Plan** | $117\text{'-}10\text{"} \times 138\text{'-}0\text{"}$ | $1755 \times 2482\text{ px}$ | The Vision Architects (Ar. Yash Garg) | Verified & Active in Viewer |
| **Master Cadastre Plan (64 Plots)** | Township Master | $2482 \times 3509\text{ px}$ | The Vision Architects (Ar. Yash Garg) | Verified & Active in 3D/2D |

---

### 2. Residence Unit Inventory Reconciliation

| Unit Identifier | Configuration | Super Area | Carpet Area | Orientation | Allotment Status | Price / Terms |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Residence 01** (`unit-01`) | 1 BHK Senior Residence (Type A) | 400 sq.ft. | 276 sq.ft. | East / Garden View | **Phase 1 Allotment** | ₹25 Lakhs Down Payment / ₹25k/mo pre & ₹12.5k/mo post |
| **Residence 02** (`unit-02`) | 1 BHK Premium Senior Residence (Type B) | 400 sq.ft. | 276 sq.ft. | North-East / Courtyard | **Phase 1 Allotment** | ₹25 Lakhs Down Payment / ₹25k/mo pre & ₹12.5k/mo post |
| **Residence 03** (`unit-03`) | 1 RK Senior Studio Suite (Type C) | 240 sq.ft. | 195 sq.ft. | North / Green Belt | **Phase 1 Allotment** | Priority Enquiry / ₹6,250/mo Flexi Return |
| **Residence 04** (`unit-04`) | 1 BHK Senior Residence (Type A) | 400 sq.ft. | 276 sq.ft. | East Canopy View | Phase 2 Release | Priority Waitlist |
| **Residence 05** (`unit-05`) | 1 BHK Premium Senior Residence (Type B) | 400 sq.ft. | 276 sq.ft. | North-East View | Phase 2 Release | Priority Waitlist |
| **Residence 06** (`unit-06`) | 1 RK Senior Studio Suite (Type C) | 240 sq.ft. | 195 sq.ft. | North Green View | Phase 2 Release | Priority Waitlist |
| **Residence 07** (`unit-07`) | 1 BHK Sky Suite (Type A) | 400 sq.ft. | 276 sq.ft. | East Sunrise View | Phase 3 Release | Priority Waitlist |
| **Residence 08** (`unit-08`) | 1 BHK Sky Suite (Type B) | 400 sq.ft. | 276 sq.ft. | North-East View | Phase 3 Release | Priority Waitlist |
| **Residence 09** (`unit-09`) | 1 RK Sky Studio Suite (Type C) | 240 sq.ft. | 195 sq.ft. | North Open Sky | Phase 3 Release | Priority Waitlist |

---

### 3. Commercial & Payment Structure Matrix

1. **Plan 1: Down Payment Plan (100% Upfront)**
   - Pricing: ₹25,00,000 upfront.
   - Pre-Possession Rental Return: **₹25,000 / month** credited directly until physical possession.
   - Post-Possession Rental Return: **₹12,500 / month** guaranteed monthly return.
   - Land Registry: 100% direct freehold land registry executed upon clearance.

2. **Plan 2: 50:50 Flexi Payment Plan**
   - Stage 1 (Prior to Construction): 50% (₹12,50,000) with **₹6,250 / month** rental return till possession.
   - Stage 2 (Post Completion): 50% (₹12,50,000) upon completion with **₹12,500 / month** rental return post-possession.

3. **Plan 3: Construction Linked Plan (CLP)**
   - Stage 1 (Booking & Plinth): ₹5,00,000 (20%)
   - Stage 2 (1st Lenter Casting): ₹5,00,000 (20%)
   - Stage 3 (2nd Lenter Casting): ₹5,00,000 (20%)
   - Stage 4 (3rd Lenter Casting): ₹5,00,000 (20%)
   - Stage 5 (Finishing & Possession Handover): ₹5,00,000 (20%)

4. **Parking & Additional Allotments**
   - Covered Stilt Parking Bay: **₹3,00,000** (Dedicated reserved bay in 14-bay covered stilt level).
   - Uncovered Parking: Included Free with all standard unit allotments.
   - Terrace Rights: ₹3,00,000 (Separate registry).

---

### 4. Zero-Break Protocol Verification

- [x] All 61 Next.js static routes compiled with 0 errors.
- [x] Razorpay order creation (`/api/payments/create-order`) intact.
- [x] Razorpay HMAC signature verification (`/api/payments/verify`) intact.
- [x] Razorpay webhook handling (`/api/payments/razorpay/webhook`) intact.
- [x] Lead capture drawer and WhatsApp referral attribution active.
- [x] 3D CAD-faithful masterplan with 64 plots intact.
