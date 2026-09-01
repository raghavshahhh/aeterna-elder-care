# SLCF — Client Asset Forensic Registry
**Project:** Senior Living Citizen Foundation (SLCF) · Kheri Asra, SH-22, Jhajjar, Haryana  
**Authoritative Level:** Primary Forensic Master Record  
**Timestamp:** 2026-09-01T15:20:00+05:30  

---

## 1. Master Architectural & CAD Source Assets

| Asset Name | Relative Path | Type | Resolution / Size / Pages | Source & Authority | What It Represents | Website Integration Location | Integration Status | Missing / Required Integration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Masterplan Site Layout Dossier** | `public/project-assets/architecture/cad/slcf-masterplan-site-layout.pdf` | Vector PDF | 4.1 MB (5 Pages) | The Vision Architects (Ar. Yash Garg) | Comprehensive 64-plot plotted township masterplan, road hierarchy (33', 22'-6", 20', 16'-6", 11'), hospital massing, mandir, utility enclave | `/plots`, `/documents`, `MasterPlan3DViewer` | Integrated (Downloadable + 2D Modal) | None (Authoritative baseline locked) |
| **Masterplan High-Res Orthographic Raster** | `public/project-assets/architecture/cad/previews/masterplan-real.jpg` | High-Res JPEG | 2482 × 3509 px (1.1 MB) | The Vision Architects | Full color-coded block layout (Blocks A–F, Plots 1–64, hospital, mandir, utilities, green belts) | `/plots`, `MasterPlan3DViewer` overlay | Integrated as 3D ground texture & CAD Overlay | None |
| **Kheri Asra Khasra / Revenue Map** | `public/project-assets/architecture/cad/previews/kheri-asra-revenue-map.jpg` | High-Res JPEG | 4682 × 3312 px (1.3 MB) | Haryana Land Records Dept / Patwari | Official cadastral revenue map of Kheri Asra showing khasra numbers and parcel boundaries | `/gallery`, `/location`, `/documents` | Integrated with pan/zoom viewer | None |
| **Stilt Floor CAD Blueprint** | `public/project-assets/architecture/cad/previews/stilt-floor-cad.jpg` | High-Res JPEG | 1755 × 2482 px (324.7 KB) | The Vision Architects | Ground stilt parking layout on Plots 63 & 64 showing 14 parking bays, 16 column grid, 3 gates, lift & stairs | `Building3DViewer`, `/apartments`, `/gallery` | Integrated as CAD overlay & reference | None |
| **Typical Residence Floor Plan (PDF)** | `public/project-assets/architecture/cad/previews/typical-floor-cad.jpg` | High-Res JPEG | 1755 × 2482 px (361.8 KB) | The Vision Architects | 1 BHK & 1 RK floor layout on typical 1st/2nd/3rd residential floors with room dimensions | `Building3DViewer`, `Interior3DViewer`, `/apartments` | Integrated as CAD blueprint modal | Written confirmation of 1BHK vs 1RK unit allocation for Units 01/02/03 pending architect sign-off |
| **Hospital Ground Floor Plan (PDF)** | `public/project-assets/architecture/floor-plans/ground-floor-plan.pdf` | Vector PDF | 106.6 KB (1 Page) | The Vision Architects | 30,000 sq ft Hospital Ground Floor: Yoga Hall, 6 OPDs, Reception, Emergency, 10 Panchakarma suites | `/amenities`, `Hospital3DViewer` | Integrated as downloadable PDF & 2D CAD layer | None |
| **Hospital Ground Floor Preview** | `public/project-assets/architecture/cad/previews/ground-floor-preview.jpg` | High-Res JPEG | 1755 × 2482 px (174.9 KB) | The Vision Architects | High-res render of Ground Floor hospital blueprint | `Hospital3DViewer` QA Overlay | Integrated | None |
| **Hospital First Floor Plan (PDF)** | `public/project-assets/architecture/floor-plans/first-floor-plan.pdf` | Vector PDF | 106.0 KB (1 Page) | The Vision Architects | 30,000 sq ft Hospital First Floor: Cathlab, 1.5T MRI, 128-Slice CT, Modular OT, ICU, Wards | `/amenities`, `Hospital3DViewer` | Integrated as downloadable PDF & 2D CAD layer | None |
| **Hospital First Floor Preview** | `public/project-assets/architecture/cad/previews/first-floor-preview.jpg` | High-Res JPEG | 1755 × 2482 px (171.3 KB) | The Vision Architects | High-res render of First Floor hospital blueprint | `Hospital3DViewer` QA Overlay | Integrated | None |
| **Hospital Second Floor Plan (PDF)** | `public/project-assets/architecture/floor-plans/second-floor-plan.pdf` | Vector PDF | 105.1 KB (1 Page) | The Vision Architects | 30,000 sq ft Hospital Second Floor: 50-Seat Auditorium, Hydrotherapy Pool, Open Roof Terrace (39'-2" × 56'-11"), Library | `/amenities`, `Hospital3DViewer` | Integrated as downloadable PDF & 2D CAD layer | None |
| **Hospital Second Floor Preview** | `public/project-assets/architecture/cad/previews/second-floor-preview.jpg` | High-Res JPEG | 1755 × 2482 px (151.5 KB) | The Vision Architects | High-res render of Second Floor hospital blueprint | `Hospital3DViewer` QA Overlay | Integrated | None |

---

## 2. Real Drone & Site Media Assets

| Asset Name | Relative Path | Type | Resolution / Duration | Source & Authority | What It Represents | Website Integration Location | Integration Status | Missing / Required Integration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Drone Loop** | `public/project-assets/real-site/drone/hero-loop.mp4` | 1080p MP4 | 1.7 MB (Autoloop 15s) | Client On-Site Drone Flight | Low-altitude cinematic flyover of real demarcated farmland at Kheri Asra | Homepage Hero (`/`) | Integrated with auto-play, muted loop | None |
| **Full Real Drone Tour** | `public/project-assets/real-site/drone/full-tour.mp4` | 1080p MP4 | 41.2 MB (Full Flight) | Client On-Site Drone Flight | Comprehensive aerial survey showing SH-22 highway frontage, surrounding green fields, and access road | `/gallery`, Hero Video Modal | Integrated with custom video player | None |
| **Real Drone Poster Image** | `public/project-assets/real-site/drone/poster.jpg` | JPEG / WebP | 1280 × 720 px (81.8 KB) | Client Drone Footage Frame | Aerial perspective of real property perimeter | Video poster attribute across site | Integrated | None |
| **Real Land Aerial Stills (1 & 2)** | `public/project-assets/real-site/drone/real-land-aerial-1.jpg`, `2.jpg` | JPEG / WebP | 1280 × 720 px (110–128 KB) | Client Drone Footage | High-altitude overview showing Kheri Asra countryside and SH-22 | `/gallery`, `/location`, Real vs Proposed | Integrated | None |
| **Ground-Level Land Tour (1 & 2)** | `public/project-assets/real-site/drone/real-land-tour-1.jpg`, `2.jpg` | JPEG / WebP | 1280 × 720 px (103–136 KB) | Client Drone Stills | Mid-altitude angles of the project land parcel | `/gallery`, Real vs Proposed | Integrated | Ground-level eye-height road frontage and boundary pillar photos requested (Phase 1) |

---

## 3. Brand & Identity Assets

| Asset Name | Relative Path | Type | Resolution | Source & Authority | What It Represents | Website Integration Location | Integration Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Official Logo Full (Clean/Trimmed)** | `public/project-assets/brand/logo-full-trimmed.png` | PNG / WebP | 430 × 350 px | SLCF Brand Identity | Primary official logo with Senior Living Citizen Foundation emblem and typography | Navigation Bar, Footer, Documents | Integrated |
| **Transparent Brand Icon** | `public/project-assets/brand/logo-icon-transparent.png` | PNG / WebP | 512 × 512 px | SLCF Brand Identity | Standalone golden tree emblem | Mobile header, modals, badges | Integrated |
| **Gold Emblem Badge** | `public/project-assets/brand/logo-gold.png` | PNG / WebP | 512 × 512 px | SLCF Brand Identity | High-contrast gold edition for dark backgrounds | Hero badges, trust seals | Integrated |
| **Favicons (32, 192, 512)** | `public/project-assets/brand/favicon-512.png` | PNG / WebP | Multi-res | Standard Web Favicons | Browser tab icons & PWA icons | Global HTML Head | Integrated |

---

## 4. Legal & Trust Vault Documents (Section 8 / 80G / Corporate)

| Document Name | Relative Path | Type | Page Count / Size | Source & Authority | What It Represents | Website Integration Location | Integration Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Section 8 Incorporation License** | `private-assets/trust/section-8-license.pdf` | PDF | 1 Page (55.0 KB) | Ministry of Corporate Affairs, Govt of India | Official Section 8 License certifying non-profit foundation status | `/documents`, Admin Vault | Integrated via Authenticated Stream |
| **80G Provisional Approval (Form 10AC)** | `private-assets/trust/form-10ac-80g-approval.pdf` | PDF | 1 Page (54.5 KB) | Income Tax Dept, Govt of India | Form 10AC approval granting tax exemption under Section 80G (AY 2026-27 to 2028-29) | `/documents`, Admin Vault | Integrated via Authenticated Stream |
| **Electronic Memorandum of Association (e-MOA)** | `private-assets/trust/e-moa.pdf` | PDF | 1 Page (5.9 MB) | Registrar of Companies (ROC) | Official chartered constitution and objectives of Senior Living Citizen Foundation | `/documents`, Admin Vault | Integrated via Authenticated Stream |
| **Electronic Articles of Association (e-AOA)** | `private-assets/trust/e-aoa.pdf` | PDF | 1 Page (5.0 MB) | Registrar of Companies (ROC) | Internal bylaws and governance regulations of the foundation | `/documents`, Admin Vault | Integrated via Authenticated Stream |
| **Section 8 Approval Letter** | `private-assets/trust/section-8-approval-letter.pdf` | PDF | 1 Page (70.9 KB) | Ministry of Corporate Affairs | Formal ministerial approval letter for Section 8 status | `/documents`, Admin Vault | Integrated via Authenticated Stream |
| **MCA Company Registration Extract** | `private-assets/trust/company-registration-extract.pdf` | PDF | 1 Page (27.9 MB) | Ministry of Corporate Affairs Master Record | Official registration extract with CIN and registered office details | `/documents`, Admin Vault | Integrated via Authenticated Stream |

---

## 5. Commercial & Financial Assets

| Asset Name | Relative Path | Type | Resolution / Pages | Source & Authority | What It Represents | Website Integration Location | Integration Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **EOI Payment QR Code** | `public/project-assets/commercial/payment-plans/eoi-payment-qr.jpeg` | JPEG / WebP | 588 × 1280 px | Yoffices / SLCF Banking Desk | Official UPI QR code for ₹1 Lakh Expression of Interest payment | `/finance`, Payment Modal | Integrated behind WhatsApp confirmation step |
| **Commercial Rental Plan Source Document** | `private-assets/commercial/rental-plan-v1-source.pdf` | PDF | 1 Page (33.4 KB) | Yoffices Commercial Team | Original client rental schedule specifying Down Payment, Flexi, and CLP plans | `/finance`, `/admin/documents` | Reconciled & legal-safe language applied |
| **Client Website Brief Source** | `private-assets/commercial/website-brief-source.pdf` | PDF | 1 Page (44.2 KB) | Yoffices Leadership | Original project scope and feature requests | Documentation Pack | Reconciled |

---

## 6. Genuinely Missing Client Assets (Asset Request Checklist)

Per `07_SLCF_PROPOSAL_UPDATE_2026-08/01_Client_Asset_Request_List.pdf`:
1. **CRITICAL**: Eye-level photograph taken standing on SH-22 looking toward project land.
2. **CRITICAL**: Physical boundary marker / demarcation pillar photographs with measuring tape for scale.
3. **HIGH PRIORITY**: On-ground site signboard / project nameboard photograph (if installed).
4. **HIGH PRIORITY**: Ground-level site panorama (2–3 directions).
5. **HIGH PRIORITY**: Architect's final written confirmation on 1 BHK vs 1 RK allocation for Units 01, 02, and 03.
6. **OPTIONAL**: Detailed room-by-room CAD for Mandir elevation beyond masterplan massing.
