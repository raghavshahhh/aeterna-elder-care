# FORENSIC 2D ↔ 3D MASTERPLAN RECONCILIATION REPORT
## Senior Living Citizens Foundation (SLCF) — Kheri Asra, Jhajjar, Haryana
**Document Reference**: scratch/MASTERPLAN_2D_3D_FORENSIC_REPORT.md  
**Date**: 2026-08-26  
**Status**: 100% CANONICAL SYNCHRONIZATION AUDITED

---

## 1. Executive Summary

This report documents the forensic reconciliation between the 2D CAD Masterplan (masterplan-real.jpg) and the interactive Three.js 3D Masterplan (MasterPlan3DViewer.tsx), the 2D Availability Matrix (AvailabilityMatrix.tsx), the canonical dataset (propertyData.ts), and the architectural geometry system (geometry.ts).

---

## 2. Block-by-Block Plot Registry & Verification

| Block Name | Color / CAD Hatch | CAD Plot Count | Plot Numbers List | Area Range | Road Width Connectivity | Verification Status |
|---|---|---|---|---|---|---|
| **Block A** | Cyan / Light Blue | 13 Plots | 1, 2, 3, 4, 5, 6, 7, 8, 9, 61, 62, 63, 64 | 126 to 425 Sq. Yds. | 33ft Main Road, 22.5ft Central Rasta, 20ft South Rasta, 11ft North Road | **100% VERIFIED** |
| **Block B** | Pink Crosshatch | 6 Plots | 28, 29, 30, 31, 32, 33 | 130 to 163 Sq. Yds. | 33ft Main Road (5ft Green Belt), 22.5ft Spine, 20ft Cross Rasta | **100% VERIFIED** |
| **Block C** | Yellow / Amber | 6 Plots | 10, 21, 22, 34, 35, 36 | 130 to 227 Sq. Yds. | 22.5ft Spine, 20ft Cross Rastas, 33ft Main Road | **100% VERIFIED** |
| **Block D** | Green Crosshatch | 8 Plots | 37, 38, 39, 40, 41, 42, 43, 44 | 120.1 to 130.5 Sq. Yds. | 22.5ft Spine Rasta (South-East boundary) | **100% VERIFIED** |
| **Block E** | Light Blue Hatch | 16 Plots | 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60 | 129 to 130.5 Sq. Yds. | 22.5ft Spine, 20ft Hospital Rasta, 16.5ft West Rasta | **100% VERIFIED** |
| **Block F** | Purple / Lavender | 15 Plots | 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27 | 122 to 128 Sq. Yds. | 20ft Internal Rasta, 33ft Road (6ft Green Belt), 11ft North Road | **100% VERIFIED** |
| **TOTAL** | — | **64 Plots** | **Plots 1 to 64 inclusive (Zero gaps, zero duplicates)** | **120.1 to 425 Sq. Yds.** | **Full Surveyed Land Parcel** | **100% VERIFIED** |

---

## 3. Site Masterplan Landmarks & Orientation

1. **North-South True Alignment**:
   - Masterplan drawing orientation: North points UP.
   - East: Towards Chhudani / SH-22 Jhajjar-Bahadurgarh & Reliance MET City.
   - West: Towards Rewari Khera / Chhara & NH-71.
2. **Key Landmarks**:
   - **Proposed Multi-Speciality Ayurvedic Hospital (G+2, 30,000 SQFT)**: Situated in the South-West sector (117ft-6in x 138ft-0in).
   - **Community Mandir**: Sited in Block A south of Plot 3 along the 33ft road with continuous 6ft green buffer.
   - **Plots 63 & 64 (Senior Residences)**: Sited directly adjacent to the hospital along the 22.5ft central rasta.
   - **Township Utility Services (289 SQYD)**: Sited in the North-East perimeter corner.

---

## 4. 2D ↔ 3D Synchronization Mechanics
- When a plot is clicked in 3D (MasterPlan3DViewer.tsx), it executes onSelectPlot(plot) which immediately updates selectedPlot state across the sticky bar, detail drawer, and highlights the corresponding cell in the 2D Availability Matrix.
- When a plot is clicked in 2D (AvailabilityMatrix.tsx), it sets selectedPlot and switches or focuses the 3D camera onto the exact plot centroid.
- All components consume the canonical allPlots array from src/data/propertyData.ts and CANONICAL_PLOTS from src/lib/architecture/geometry.ts.
