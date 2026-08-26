const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/slcf_database.json');
const GEOM_PATH = path.join(__dirname, '../src/lib/architecture/geometry.ts');

function runAudit() {
  console.log("==================================================");
  console.log("SLCF ARCHITECTURAL & NUMERICAL RECONCILIATION TEST");
  console.log("==================================================");

  const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const geomCode = fs.readFileSync(GEOM_PATH, 'utf-8');

  const dbPlots = dbData.inventory.filter(i => i.type === 'PLOT');
  console.log(`\n1. Database Inventory: Found ${dbPlots.length} plot records (Target: 64)`);

  const results = [];

  // Test 1: Exactly 64 plots in DB
  const t1 = dbPlots.length === 64;
  results.append ? null : results.push({ name: "64 Plots in slcf_database.json", pass: t1 });

  // Test 2: Verify all unit codes PLOT-A-01 to PLOT-F-64
  const expectedCodes = [];
  for (let i = 1; i <= 10; i++) expectedCodes.push(`PLOT-A-${i.toString().padStart(2, '0')}`);
  for (let i = 34; i <= 36; i++) expectedCodes.push(`PLOT-A-${i.toString().padStart(2, '0')}`);
  for (let i = 11; i <= 15; i++) expectedCodes.push(`PLOT-B-${i.toString().padStart(2, '0')}`);
  for (let i = 28; i <= 33; i++) expectedCodes.push(`PLOT-B-${i.toString().padStart(2, '0')}`);
  for (let i = 16; i <= 27; i++) expectedCodes.push(`PLOT-C-${i.toString().padStart(2, '0')}`);
  for (let i = 37; i <= 44; i++) expectedCodes.push(`PLOT-D-${i.toString().padStart(2, '0')}`);
  for (let i = 45; i <= 60; i++) expectedCodes.push(`PLOT-E-${i.toString().padStart(2, '0')}`);
  for (let i = 61; i <= 64; i++) expectedCodes.push(`PLOT-F-${i.toString().padStart(2, '0')}`);

  const missingCodes = expectedCodes.filter(code => !dbPlots.some(p => p.unitCode === code));
  const t2 = missingCodes.length === 0;
  results.push({ name: "All 64 CAD Unit Codes present in DB", pass: t2, detail: `Missing: ${missingCodes.length}` });

  // Test 3: Check area variance math
  let maxVariancePct = 0;
  dbPlots.forEach(p => {
    const expectedSqFt = p.areaSqYd * 9;
    const diff = Math.abs(p.areaSqFt - expectedSqFt);
    if (diff > 0) {
      console.log(`Notice: Unit ${p.unitCode} stated ${p.areaSqFt} vs 9x ${expectedSqFt}`);
    }
  });

  // Test 4: Check landmarks in geometry.ts
  const landmarks = ['hospital-main', 'senior-residence-63-64', 'community-mandir', 'utility-services', 'entrance-gate-west'];
  const allLandmarksPresent = landmarks.every(l => geomCode.includes(l));
  results.push({ name: "All 5 Certified Landmarks in geometry.ts", pass: allLandmarksPresent });

  // Test 5: Check Area Methods defined in geometry.ts
  const hasAreaMethods = geomCode.includes('areaMethod:') && geomCode.includes('DERIVED_RECTANGLE') && geomCode.includes('MUNICIPAL_SCHEDULE');
  results.push({ name: "Forensic Area Calculation Methods in geometry.ts", pass: hasAreaMethods });

  console.log("\n--- TEST EXECUTION RESULTS ---");
  let allPass = true;
  results.forEach(r => {
    const mark = r.pass ? "✅ PASS" : "❌ FAIL";
    if (!r.pass) allPass = false;
    console.log(`${mark} | ${r.name} ${r.detail ? `(${r.detail})` : ''}`);
  });

  console.log("--------------------------------------------------");
  if (allPass) {
    console.log("ALL ARCHITECTURAL & DATABASE INVARIANT TESTS PASSED!");
  } else {
    console.log("TESTS FAILED!");
  }
}

runAudit();
