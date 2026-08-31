# SLCF ADMIN & DATABASE DATA INTEGRITY AUDIT
**Date**: 2026-08-31 13:23:38 UTC
**Database File**: `data/slcf_database.json`
**Total Storage Size**: 92392 bytes

---

## 1. Database Entity Volume Summary

| Entity Collection | Record Count | Status |
|---|---|---|
| `users` | 5 | Clean |
| `franchises` | 2 | Clean |
| `locations` | 3 | Clean |
| `projects` | 2 | Clean |
| `inventory` | 73 | Clean (64 Plots + 9 Residences) |
| `leads` | 13 | Active |
| `leadEvents` | 2 | Active |
| `siteVisits` | 11 | Active |
| `bookings` | 15 | Needs Cleanup (Test entries found) |
| `paymentPlans` | 6 | Active |
| `payments` | 1 | Active |
| `receipts` | 11 | Active |
| `referrers` | 2 | Active |
| `referralRewards` | 1 | Active |
| `commissions` | 1 | Active |
| `documents` | 5 | Active (5 Statutory Blueprints) |
| `auditLogs` | 3 | Incomplete coverage |

---

## 2. Integrity Findings & Foreign Key Audits

### Finding 1: Orphan Bookings (1 Found)
[
  {
    "bookingId": "BK-2026-001",
    "unitId": "PLOT-A-12"
  }
]

### Finding 2: Orphan Payments (0 Found)
None. All payments map to valid bookings.

### Finding 3: Orphan Referral Commissions (0 Found)
None. All commissions map to valid bookings.

### Finding 4: Booking vs Inventory Status Inconsistencies (10 Found)
[
  {
    "bookingId": "BK-E2E-1666",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-4598",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-7752",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-9927",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-3142",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-7414",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-3569",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-0455",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-9369",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  },
  {
    "bookingId": "BK-E2E-4022",
    "bookingStatus": "CONFIRMED",
    "unitId": "PLOT-A-01",
    "unitStatus": "HOLD"
  }
]

---

## 3. Recommended Data Repairs
1. Clean up automated test bookings (`BK-E2E-*`) that were left in `slcf_database.json`.
2. Resynchronize `PLOT-A-01` and `PLOT-A-12` inventory status to match canonical booking states.
3. Ensure every future booking mutation synchronously updates the corresponding unit status and records an audit log.
