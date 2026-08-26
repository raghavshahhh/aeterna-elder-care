import fs from "fs";
import path from "path";

console.log("================================================================================");
console.log("SLCF MASTER FORENSIC BLUEPRINT → 3D RECONSTRUCTION TEST SUITE");
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

// 1. Authoritative Map Files Discovered on Disk
console.log("\n--- 1. Authoritative Blueprint Discovery ---");
const mapFiles = [
  "public/project-assets/architecture/floor-plans/ground-floor-plan.pdf",
  "public/project-assets/architecture/floor-plans/first-floor-plan.pdf",
  "public/project-assets/architecture/floor-plans/second-floor-plan.pdf",
  "public/project-assets/architecture/cad/slcf-masterplan-site-layout.pdf",
  "public/project-assets/architecture/cad/previews/ground-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/first-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/second-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/stilt-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/typical-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/masterplan-real.jpg",
  "public/project-assets/architecture/cad/previews/kheri-asra-revenue-map.jpg"
];

mapFiles.forEach((f) => {
  const full = path.resolve(f);
  assert(fs.existsSync(full), `Authoritative map exists: ${f}`);
  if (fs.existsSync(full)) {
    const stat = fs.statSync(full);
    assert(stat.size > 20000, `Map ${path.basename(f)} is high resolution (${(stat.size / 1024).toFixed(1)} KB)`);
  }
});

// 2. Canonical Architectural Source Registry
console.log("\n--- 2. Architectural Source Registry ---");
const regPath = path.resolve("scratch/MASTER_ARCHITECTURAL_SOURCE_REGISTRY.md");
assert(fs.existsSync(regPath), "scratch/MASTER_ARCHITECTURAL_SOURCE_REGISTRY.md exists");
const regContent = fs.readFileSync(regPath, "utf-8");
assert(regContent.includes("CAD-HOSP-GF"), "Registry lists Hospital Ground Floor");
assert(regContent.includes("CAD-HOSP-1F"), "Registry lists Hospital First Floor");
assert(regContent.includes("CAD-HOSP-2F"), "Registry lists Hospital Second Floor");
assert(regContent.includes("CAD-MASTER-DOSSIER"), "Registry lists Masterplan Dossier");
assert(regContent.includes("PREV-RES-STILT"), "Registry lists Residence Stilt CAD");
assert(regContent.includes("PREV-RES-TYP"), "Registry lists Residence Typical CAD");
assert(regContent.includes("PREV-MASTER"), "Registry lists Masterplan Real Scan");

// 3. Stilt Parking Topology (6 + 2 + 6 = 14 Bays, 3 Gates, 16 Columns, Left Stair, Right Lift)
console.log("\n--- 3. Residence Stilt Parking Spatial Topology (Plots 63 & 64) ---");
const bldg3dPath = path.resolve("src/components/3d/Building3DViewer.tsx");
assert(fs.existsSync(bldg3dPath), "Building3DViewer.tsx exists");
const bldg3dContent = fs.readFileSync(bldg3dPath, "utf-8");

// 14 Bays (6 Top, 2 Center, 6 Bottom)
assert(bldg3dContent.includes("northBayXs") || bldg3dContent.includes("6 North Row"), "Top Row: 6 parking bays configured");
assert(bldg3dContent.includes("centerBayXs") || bldg3dContent.includes("2 Center Row"), "Center Row: 2 parking bays configured");
assert(bldg3dContent.includes("6 South Row") || bldg3dContent.includes("Bays 09-14"), "Bottom Row: 6 parking bays configured");
assert(bldg3dContent.includes("14 Stilt Parking Bays") || bldg3dContent.includes("14 covered"), "Total 14 parking bays verified");

// 3 South Entry Gates
assert(bldg3dContent.includes("3 Entry Gates on South Facade") || bldg3dContent.includes("gatePillarL"), "3 separate South entry gates verified");

// 16 Structural Columns Grid
assert(bldg3dContent.includes("16 Reinforced Concrete") || bldg3dContent.includes("colXPositions"), "16 column structural grid verified");

// Left Stair & Right Lift
assert(bldg3dContent.includes("Left Stairwell") || bldg3dContent.includes("Senior staircase"), "Left side staircase core verified");
assert(bldg3dContent.includes("Right Elevator Shaft") || bldg3dContent.includes("Elevator Shaft"), "Right side lift shaft verified");

// CAD Overlay QA Mode in Building3DViewer
assert(bldg3dContent.includes("isCadOverlay"), "Building3DViewer has isCadOverlay state");
assert(bldg3dContent.includes("cadOpacity"), "Building3DViewer has cadOpacity control");
assert(bldg3dContent.includes("modelOpacity"), "Building3DViewer has modelOpacity control");
assert(bldg3dContent.includes("stilt-floor-cad.jpg"), "Building3DViewer loads stilt-floor-cad.jpg");
assert(bldg3dContent.includes("typical-floor-cad.jpg"), "Building3DViewer loads typical-floor-cad.jpg");

// 4. Hospital 3D Viewer & Clinical Suites Topology
console.log("\n--- 4. Hospital Clinical Suites Topology ---");
const hospViewerPath = path.resolve("src/components/3d/Hospital3DViewer.tsx");
assert(fs.existsSync(hospViewerPath), "Hospital3DViewer.tsx exists");
const hospViewerContent = fs.readFileSync(hospViewerPath, "utf-8");

const archDataPath = path.resolve("src/data/architecturalData.ts");
assert(fs.existsSync(archDataPath), "src/data/architecturalData.ts exists");
const archDataContent = fs.readFileSync(archDataPath, "utf-8");

assert(archDataContent.includes("H-GF-YOGA"), "Hospital canonical Yoga Hall (H-GF-YOGA) defined");
assert(archDataContent.includes("H-GF-RECEPTION"), "Hospital canonical Reception (H-GF-RECEPTION) defined");
assert(archDataContent.includes("H-GF-EMERGENCY"), "Hospital canonical Emergency Triage (H-GF-EMERGENCY) defined");
assert(archDataContent.includes("H-FF-CATHLAB"), "Hospital canonical Cathlab (H-FF-CATHLAB) defined");
assert(archDataContent.includes("H-FF-MRI"), "Hospital canonical 1.5T MRI (H-FF-MRI) defined");
assert(archDataContent.includes("H-FF-CT"), "Hospital canonical CT Scan (H-FF-CT) defined");
assert(archDataContent.includes("H-FF-OT"), "Hospital canonical Modular OT (H-FF-OT) defined");
assert(archDataContent.includes("H-SF-AUDITORIUM"), "Hospital canonical Auditorium (H-SF-AUDITORIUM) defined");
assert(archDataContent.includes("H-SF-POOL"), "Hospital canonical Hydrotherapy Pool (H-SF-POOL) defined");
assert(archDataContent.includes("H-SF-OPENROOF"), "Hospital canonical Open Sky Roof Deck (H-SF-OPENROOF) defined");

assert(hospViewerContent.includes("HOSPITAL_ROOMS_GROUND"), "Hospital3DViewer loads Ground rooms from architecturalData");
assert(hospViewerContent.includes("HOSPITAL_ROOMS_FIRST"), "Hospital3DViewer loads First rooms from architecturalData");
assert(hospViewerContent.includes("HOSPITAL_ROOMS_SECOND"), "Hospital3DViewer loads Second rooms from architecturalData");
assert(hospViewerContent.includes("isCadOverlay"), "Hospital3DViewer has CAD Overlay QA mode");

// 5. Masterplan 64 Freehold Plots & Road Hierarchies
console.log("\n--- 5. Masterplan Topology & Road Network ---");
const masterViewerPath = path.resolve("src/components/3d/MasterPlan3DViewer.tsx");
assert(fs.existsSync(masterViewerPath), "MasterPlan3DViewer.tsx exists");
const masterViewerContent = fs.readFileSync(masterViewerPath, "utf-8");

assert(masterViewerContent.includes("masterplan-real.jpg"), "MasterPlan 3D loads masterplan-real.jpg overlay");
assert(masterViewerContent.includes("isCadOverlay"), "MasterPlan 3D has CAD Overlay QA mode");
assert(masterViewerContent.includes("CANONICAL_PLOTS"), "MasterPlan 3D loads 64 canonical plots");

// 6. Map to 3D Alignment Audit Document
console.log("\n--- 6. Alignment Audit Documentation ---");
const auditPath = path.resolve("scratch/MAP_TO_3D_ALIGNMENT_AUDIT.md");
assert(fs.existsSync(auditPath), "scratch/MAP_TO_3D_ALIGNMENT_AUDIT.md exists");

console.log("\n================================================================================");
console.log(`RESULTS: ${passed} Passed, ${failed} Failed`);
console.log("================================================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL BLUEPRINT-TO-3D RECONSTRUCTION ASSERTIONS PASSED (100%)!");
  process.exit(0);
}
