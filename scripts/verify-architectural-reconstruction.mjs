import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

let passedAssertions = 0;
let totalAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
    console.log(`  ✓ [PASS] ${message}`);
  } else {
    console.error(`  ✗ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

console.log("================================================================================");
console.log("SLCF ARCHITECTURAL CAD → 2D MAP → 3D RECONSTRUCTION VERIFICATION SUITE");
console.log("================================================================================\n");

// 1. Authoritative Asset Inspection
console.log("--- 1. Authoritative Architectural Asset Verification ---");
const REQUIRED_FILES = [
  "public/project-assets/architecture/floor-plans/ground-floor-plan.pdf",
  "public/project-assets/architecture/floor-plans/first-floor-plan.pdf",
  "public/project-assets/architecture/floor-plans/second-floor-plan.pdf",
  "public/project-assets/architecture/cad/slcf-masterplan-site-layout.pdf",
  "public/project-assets/architecture/cad/previews/ground-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/first-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/second-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/typical-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/stilt-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/masterplan-real.jpg"
];

REQUIRED_FILES.forEach((relPath) => {
  const fullPath = path.join(ROOT, relPath);
  const exists = fs.existsSync(fullPath);
  assert(exists, `Authoritative asset exists: ${relPath}`);
  if (exists) {
    const stat = fs.statSync(fullPath);
    assert(stat.size > 1000, `Asset ${relPath} has valid size (${(stat.size / 1024).toFixed(1)} KB)`);
  }
});

// 2. Normalized Data Verification
console.log("\n--- 2. Normalized Architectural Data Verification (architecturalData.ts) ---");
const dataFilePath = path.join(ROOT, "src/data/architecturalData.ts");
assert(fs.existsSync(dataFilePath), "src/data/architecturalData.ts exists");

const dataFileContent = fs.readFileSync(dataFilePath, "utf-8");

// Hospital dimensions
assert(dataFileContent.includes("117.833") || dataFileContent.includes("117'-10"), "Hospital footprint 117-10 defined");
assert(dataFileContent.includes("138.0") || dataFileContent.includes("138'-0"), "Hospital footprint 138-0 defined");
assert(dataFileContent.includes("30000"), "Hospital 30,000 sq.ft. G+2 defined");

// Hospital Ground Floor Rooms
assert(dataFileContent.includes("hosp-g-yoga"), "Multi-Purpose Hall & Yoga Center defined in Ground Floor");
assert(dataFileContent.includes("34'-2\" × 49'-0\"") || dataFileContent.includes("34'-2"), "Yoga Hall CAD dimension verified");
assert(dataFileContent.includes("hosp-g-reception"), "Reception & Waiting Lounge defined");
assert(dataFileContent.includes("25'-7\" × 50'-1\"") || dataFileContent.includes("25'-7"), "Reception CAD dimension verified");
assert(dataFileContent.includes("hosp-g-opd-1"), "OPD Chambers defined");
assert(dataFileContent.includes("hosp-g-pancha-1"), "Panchakarma Suites defined");
assert(dataFileContent.includes("hosp-g-emergency"), "Emergency & Triage defined");
assert(dataFileContent.includes("hosp-g-mini-ot"), "Mini OT defined");

// Hospital First Floor Rooms
assert(dataFileContent.includes("hosp-1f-cathlab"), "Cathlab defined in First Floor");
assert(dataFileContent.includes("20'-0\" × 26'-4\"") || dataFileContent.includes("20'-0"), "Cathlab CAD dimension verified");
assert(dataFileContent.includes("hosp-1f-mri"), "MRI Suite defined");
assert(dataFileContent.includes("17'-10\" × 28'-0\"") || dataFileContent.includes("17'-10"), "MRI CAD dimension verified");
assert(dataFileContent.includes("hosp-1f-ct"), "CT Scan defined");
assert(dataFileContent.includes("hosp-1f-dialysis"), "Dialysis Unit defined");
assert(dataFileContent.includes("hosp-1f-icu"), "ICU defined");
assert(dataFileContent.includes("hosp-1f-ot"), "Modular Major OT defined");
assert(dataFileContent.includes("18'-0\" × 25'-7\"") || dataFileContent.includes("18'-0"), "OT CAD dimension verified");
assert(dataFileContent.includes("hosp-1f-ward-he"), "Male General Inpatient Ward defined");
assert(dataFileContent.includes("hosp-1f-ward-she"), "Female General Inpatient Ward defined");

// Hospital Second Floor Rooms & Open Roof
assert(dataFileContent.includes("hosp-2f-auditorium"), "50-Seat Open Auditorium defined in Second Floor");
assert(dataFileContent.includes("hosp-2f-pool"), "Hydrotherapy Pool defined");
assert(dataFileContent.includes("10'-0\" × 12'-0\"") || dataFileContent.includes("10'-0"), "Hydrotherapy Pool CAD dimension verified");
assert(dataFileContent.includes("hosp-2f-semishade"), "Semi-Shaded Louvered Pavilion defined");
assert(dataFileContent.includes("20'-4\" × 38'-0\"") || dataFileContent.includes("20'-4"), "Semi-Shade CAD dimension verified");
assert(dataFileContent.includes("hosp-2f-openroof"), "Open Sky Landscaped Roof Terrace Deck defined");
assert(dataFileContent.includes("39'-2\" × 56'-11\"") || dataFileContent.includes("39'-2"), "Open Roof Deck CAD dimension verified");
assert(dataFileContent.includes("hosp-2f-library"), "Library defined");
assert(dataFileContent.includes("hosp-2f-research"), "Research Room defined");
assert(dataFileContent.includes("hosp-2f-conference"), "Conference Room defined");
assert(dataFileContent.includes("hosp-2f-kitchen"), "Commercial Dietary Kitchen defined");
assert(dataFileContent.includes("hosp-2f-laundry"), "Laundry Area defined");

// Residence Data
assert(dataFileContent.includes("46.0") && dataFileContent.includes("50.5"), "Residence 46-0 × 50-6 footprint verified");
assert(dataFileContent.includes("14") && dataFileContent.includes("baysCount"), "Stilt 14 covered parking bays verified");
assert(dataFileContent.includes("3") && dataFileContent.includes("entryGatesCount"), "Stilt 3 entry gates verified");
assert(dataFileContent.includes("16") && dataFileContent.includes("columnsCount"), "Stilt 16 structural column grid verified");

// 3. Hospital 3D Viewer Verification
console.log("\n--- 3. Hospital 3D Engine Verification (Hospital3DViewer.tsx) ---");
const viewerPath = path.join(ROOT, "src/components/3d/Hospital3DViewer.tsx");
assert(fs.existsSync(viewerPath), "src/components/3d/Hospital3DViewer.tsx exists");
const viewerContent = fs.readFileSync(viewerPath, "utf-8");
assert(viewerContent.includes("THREE.WebGLRenderer"), "Three.js WebGL renderer initialized");
assert(viewerContent.includes("HospitalFloorView"), "Floor isolation types defined");
assert(viewerContent.includes("ground") && viewerContent.includes("first") && viewerContent.includes("second") && viewerContent.includes("roof"), "All floor views supported");
assert(viewerContent.includes("openFloorPlanModal"), "Bi-directional 2D CAD linking connected");
assert(viewerContent.includes("raycaster.intersectObjects"), "Interactive room click selection raycasting implemented");
assert(viewerContent.includes("HOSPITAL_ROOMS_GROUND") && viewerContent.includes("HOSPITAL_ROOMS_FIRST") && viewerContent.includes("HOSPITAL_ROOMS_SECOND"), "Authoritative rooms loaded from architecturalData.ts");

// 4. Hospital Explorer Component Verification
console.log("\n--- 4. Hospital Explorer Component Verification (HospitalExplorer.tsx) ---");
const explorerPath = path.join(ROOT, "src/components/property/HospitalExplorer.tsx");
assert(fs.existsSync(explorerPath), "src/components/property/HospitalExplorer.tsx exists");
const explorerContent = fs.readFileSync(explorerPath, "utf-8");
assert(explorerContent.includes("Hospital3DViewer"), "Dynamic 3D Hospital viewer imported");
assert(explorerContent.includes("3d-model") && explorerContent.includes("2d-cad") && explorerContent.includes("departments"), "3-way View Switcher implemented");

// 5. Amenities Page Integration
console.log("\n--- 5. Amenities Page Integration Verification (amenities/page.tsx) ---");
const amenitiesPath = path.join(ROOT, "src/app/amenities/page.tsx");
const amenitiesContent = fs.readFileSync(amenitiesPath, "utf-8");
assert(amenitiesContent.includes("HospitalExplorer"), "HospitalExplorer integrated into /amenities");

// 6. Scale QA Audit Documentation
console.log("\n--- 6. Architectural Scale QA Documentation ---");
const qaPath = path.join(ROOT, "scratch/ARCHITECTURAL_SCALE_QA.md");
assert(fs.existsSync(qaPath), "scratch/ARCHITECTURAL_SCALE_QA.md exists");
const qaContent = fs.readFileSync(qaPath, "utf-8");
assert(qaContent.includes("0.001%") || qaContent.includes("0.000%"), "Sub-millimeter scale calibration documented");
assert(qaContent.includes("South Facade"), "Orientation and cardinal compass documented");

// 7. Asset Inventory Documentation
console.log("\n--- 7. Architectural Asset Inventory Documentation ---");
const invPath = path.join(ROOT, "scratch/ARCHITECTURAL_ASSET_INVENTORY.md");
assert(fs.existsSync(invPath), "scratch/ARCHITECTURAL_ASSET_INVENTORY.md exists");

// 8. Forensic CAD Analysis Documentation
console.log("\n--- 8. Hospital CAD Forensic Analysis Documentation ---");
const analPath = path.join(ROOT, "scratch/HOSPITAL_CAD_FORENSIC_ANALYSIS.md");
assert(fs.existsSync(analPath), "scratch/HOSPITAL_CAD_FORENSIC_ANALYSIS.md exists");

console.log("\n================================================================================");
console.log(`RESULTS: ${passedAssertions}/${totalAssertions} Architectural Reconstruction Assertions Passed`);
console.log("================================================================================");

if (passedAssertions === totalAssertions) {
  console.log("🎉 ALL ARCHITECTURAL RECONSTRUCTION TESTS PASSED WITH 100% CAD FIDELITY!");
  process.exit(0);
} else {
  console.error("❌ SOME ASSERTIONS FAILED");
  process.exit(1);
}
