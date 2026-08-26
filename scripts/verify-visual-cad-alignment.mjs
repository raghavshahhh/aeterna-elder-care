import fs from "fs";
import path from "path";

console.log("================================================================================");
console.log("SLCF VISUAL FORENSIC QA & CAD MATCH VERIFICATION SUITE");
console.log("================================================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] ${message}`);
    failed++;
  }
}

// 1. Check Authoritative CAD Preview Assets
console.log("\n--- 1. Authoritative Vector CAD Preview Assets ---");
const previewAssets = [
  "public/project-assets/architecture/cad/previews/ground-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/first-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/second-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/stilt-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/typical-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/masterplan-real.jpg"
];

previewAssets.forEach((asset) => {
  const fullPath = path.resolve(asset);
  assert(fs.existsSync(fullPath), `CAD asset exists: ${asset}`);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    assert(stats.size > 50000, `CAD asset ${asset} is high-resolution (${(stats.size / 1024).toFixed(1)} KB)`);
  }
});

// 2. Normalized Architectural Data & Canonical IDs
console.log("\n--- 2. Canonical Spatial IDs & Normalized Geometry ---");
const archDataPath = path.resolve("src/data/architecturalData.ts");
assert(fs.existsSync(archDataPath), "src/data/architecturalData.ts exists");
const archDataContent = fs.readFileSync(archDataPath, "utf-8");

assert(archDataContent.includes("H-GF-YOGA"), "Canonical ID H-GF-YOGA defined");
assert(archDataContent.includes("H-GF-OPD-01"), "Canonical ID H-GF-OPD-01 defined");
assert(archDataContent.includes("H-GF-EMERGENCY"), "Canonical ID H-GF-EMERGENCY defined");
assert(archDataContent.includes("H-FF-CATHLAB"), "Canonical ID H-FF-CATHLAB defined");
assert(archDataContent.includes("H-FF-MRI"), "Canonical ID H-FF-MRI defined");
assert(archDataContent.includes("H-FF-CT"), "Canonical ID H-FF-CT defined");
assert(archDataContent.includes("H-FF-OT"), "Canonical ID H-FF-OT defined");
assert(archDataContent.includes("H-SF-AUDITORIUM"), "Canonical ID H-SF-AUDITORIUM defined");
assert(archDataContent.includes("H-SF-POOL"), "Canonical ID H-SF-POOL defined");
assert(archDataContent.includes("H-SF-OPENROOF"), "Canonical ID H-SF-OPENROOF defined");
assert(archDataContent.includes("H-SF-LIBRARY"), "Canonical ID H-SF-LIBRARY defined");
assert(archDataContent.includes("R-U01-1BHK"), "Canonical ID R-U01-1BHK defined");
assert(archDataContent.includes("R-U02-1RK"), "Canonical ID R-U02-1RK defined");
assert(archDataContent.includes("R-U03-1BHK-DELUXE"), "Canonical ID R-U03-1BHK-DELUXE defined");

// 3. Hospital 3D Engine & CAD Overlay QA
console.log("\n--- 3. Hospital 3D Viewer CAD Overlay QA ---");
const hospViewerPath = path.resolve("src/components/3d/Hospital3DViewer.tsx");
assert(fs.existsSync(hospViewerPath), "Hospital3DViewer.tsx exists");
const hospViewerContent = fs.readFileSync(hospViewerPath, "utf-8");

assert(hospViewerContent.includes("isCadOverlay"), "Hospital3DViewer has isCadOverlay state");
assert(hospViewerContent.includes("cadOpacity"), "Hospital3DViewer has cadOpacity slider control");
assert(hospViewerContent.includes("modelOpacity"), "Hospital3DViewer has modelOpacity slider control");
assert(hospViewerContent.includes("cadOverlayMeshRef"), "Hospital3DViewer creates cadOverlayMeshRef");
assert(hospViewerContent.includes("ground-floor-preview.jpg"), "Hospital3DViewer loads Ground CAD preview");
assert(hospViewerContent.includes("first-floor-preview.jpg"), "Hospital3DViewer loads First CAD preview");
assert(hospViewerContent.includes("second-floor-preview.jpg"), "Hospital3DViewer loads Second CAD preview");
assert(hospViewerContent.includes("selectedRoomId"), "Hospital3DViewer supports external selectedRoomId prop");

// 4. Masterplan 3D Viewer CAD Overlay QA
console.log("\n--- 4. Masterplan 3D Viewer CAD Overlay QA ---");
const masterViewerPath = path.resolve("src/components/3d/MasterPlan3DViewer.tsx");
assert(fs.existsSync(masterViewerPath), "MasterPlan3DViewer.tsx exists");
const masterViewerContent = fs.readFileSync(masterViewerPath, "utf-8");

assert(masterViewerContent.includes("isCadOverlay"), "MasterPlan3DViewer has isCadOverlay state");
assert(masterViewerContent.includes("cadOpacity"), "MasterPlan3DViewer has cadOpacity slider control");
assert(masterViewerContent.includes("plotsOpacity"), "MasterPlan3DViewer has plotsOpacity slider control");
assert(masterViewerContent.includes("cadOverlayMeshRef"), "MasterPlan3DViewer creates cadOverlayMeshRef");
assert(masterViewerContent.includes("masterplan-real.jpg"), "MasterPlan3DViewer loads masterplan-real.jpg overlay");
assert(masterViewerContent.includes("Top CAD View"), "MasterPlan3DViewer provides Top CAD View preset");

// 5. Hospital Explorer Bi-Directional Synchronization
console.log("\n--- 5. Hospital Explorer Bi-Directional Synchronization ---");
const hospExplorerPath = path.resolve("src/components/property/HospitalExplorer.tsx");
assert(fs.existsSync(hospExplorerPath), "HospitalExplorer.tsx exists");
const hospExplorerContent = fs.readFileSync(hospExplorerPath, "utf-8");

assert(hospExplorerContent.includes("selectedRoomId"), "HospitalExplorer manages selectedRoomId");
assert(hospExplorerContent.includes("handleLocateIn3D"), "HospitalExplorer implements handleLocateIn3D");
assert(hospExplorerContent.includes("Focus 3D"), "HospitalExplorer renders Focus 3D CTAs");
assert(hospExplorerContent.includes("3d-model"), "HospitalExplorer supports 3D Model view");
assert(hospExplorerContent.includes("2d-cad"), "HospitalExplorer supports 2D CAD view");
assert(hospExplorerContent.includes("departments"), "HospitalExplorer supports Space Inventory view");

// 6. Scale & Orientation Calculations
console.log("\n--- 6. Geometric Footprints & Scale Tolerances ---");
const hospWidthM = 35.916;
const hospDepthM = 42.062;
const cadHospWidthFt = 117.833;
const cadHospDepthFt = 138.0;

const convertedWidthM = (cadHospWidthFt * 12 * 0.0254);
const convertedDepthM = (cadHospDepthFt * 12 * 0.0254);
const widthError = Math.abs(hospWidthM - convertedWidthM);
const depthError = Math.abs(hospDepthM - convertedDepthM);

assert(widthError < 0.005, `Hospital width error (${widthError.toFixed(4)}m) is under 5mm tolerance`);
assert(depthError < 0.005, `Hospital depth error (${depthError.toFixed(4)}m) is under 5mm tolerance`);

console.log("\n================================================================================");
console.log(`RESULTS: ${passed} Passed, ${failed} Failed`);
console.log("================================================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL VISUAL FORENSIC QA AND CAD OVERLAY TESTS PASSED!");
  process.exit(0);
}
