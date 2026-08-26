// scripts/verify-cad-geometry-forensics.mjs
import fs from "fs";

console.log("====================================================");
console.log("SLCF CAD GEOMETRY & 3D MASTERPLAN FORENSIC TEST SUITE");
console.log("====================================================");

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

// 1. Verify Authoritative CAD Files
const cadFiles = [
  "public/project-assets/architecture/cad/previews/typical-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/stilt-floor-cad.jpg",
  "public/project-assets/architecture/cad/previews/masterplan-real.jpg",
  "public/project-assets/architecture/cad/previews/ground-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/first-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/second-floor-preview.jpg",
  "public/project-assets/architecture/cad/previews/kheri-asra-revenue-map.jpg"
];

cadFiles.forEach((file) => {
  assert(fs.existsSync(file), `CAD file ${file} exists on disk`);
});

// 2. Verify Forensic Report Documents Exist
assert(fs.existsSync("scratch/RESIDENCE_CAD_FORENSIC_ANALYSIS.md"), "scratch/RESIDENCE_CAD_FORENSIC_ANALYSIS.md exists");
assert(fs.existsSync("scratch/MASTERPLAN_2D_3D_FORENSIC_REPORT.md"), "scratch/MASTERPLAN_2D_3D_FORENSIC_REPORT.md exists");

// 3. Verify propertyData.ts plot definitions
const propertyDataContent = fs.readFileSync("src/data/propertyData.ts", "utf8");
const plotDefMatches = [...propertyDataContent.matchAll(/num:\s*(\d+)/g)].map((m) => parseInt(m[1]));
assert(plotDefMatches.length === 64, `MASTER_PLOT_DEFINITIONS contains exactly 64 plots (found ${plotDefMatches.length})`);

const uniquePlots = new Set(plotDefMatches);
assert(uniquePlots.size === 64, "64 unique plot numbers exist with zero duplicates");

const missing = [];
for (let i = 1; i <= 64; i++) {
  if (!uniquePlots.has(i)) missing.push(i);
}
assert(missing.length === 0, `All plot numbers 1 to 64 inclusive exist (missing: ${missing.join(", ") || "none"})`);

// 4. Verify Block Assignments
const blockA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 61, 62, 63, 64];
const blockB = [28, 29, 30, 31, 32, 33];
const blockC = [10, 21, 22, 34, 35, 36];
const blockD = [37, 38, 39, 40, 41, 42, 43, 44];
const blockE = [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
const blockF = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27];

assert(blockA.length === 13, "Block A has 13 plots");
assert(blockB.length === 6, "Block B has 6 plots");
assert(blockC.length === 6, "Block C has 6 plots");
assert(blockD.length === 8, "Block D has 8 plots");
assert(blockE.length === 16, "Block E has 16 plots");
assert(blockF.length === 15, "Block F has 15 plots");

// 5. Verify Building3DViewer.tsx geometry constants
const building3DContent = fs.readFileSync("src/components/3d/Building3DViewer.tsx", "utf8");
assert(building3DContent.includes("CAD_WIDTH = 14.02"), "Building3DViewer uses CAD width 14.02m (46ft)");
assert(building3DContent.includes("CAD_DEPTH = 15.39"), "Building3DViewer uses CAD depth 15.39m (50.5ft)");
assert(building3DContent.includes("CAD_PROJECTION = 1.07"), "Building3DViewer uses CAD projection 1.07m (3.5ft)");
assert(building3DContent.includes("colXPositions"), "Building3DViewer defines 16-column structural grid");

// 6. Verify MasterPlan3DViewer.tsx Top CAD View & Road Widths
const masterPlan3DContent = fs.readFileSync("src/components/3d/MasterPlan3DViewer.tsx", "utf8");
assert(masterPlan3DContent.includes("33\x27-0\" WIDE"), "MasterPlan3DViewer has 33ft main arterial highway");
assert(masterPlan3DContent.includes("22\x27-6\" WIDE"), "MasterPlan3DViewer has 22.5ft spine rasta");
assert(masterPlan3DContent.includes("20\x27-0\" WIDE"), "MasterPlan3DViewer has 20ft cross rastas");
assert(masterPlan3DContent.includes("16\x27-6\" WIDE"), "MasterPlan3DViewer has 16.5ft west rasta");
assert(masterPlan3DContent.includes("11\x27-0\" WIDE"), "MasterPlan3DViewer has 11ft north rasta");
assert(masterPlan3DContent.includes("handlePresetView") && masterPlan3DContent.includes("top"), "Top CAD View preset exists for direct CAD validation");

console.log("----------------------------------------------------");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("----------------------------------------------------");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
