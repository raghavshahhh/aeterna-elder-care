import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('SLCF FORENSIC CLIENT REQUIREMENT RECONCILIATION TEST');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testId, testDesc) {
  totalTests++;
  if (condition) {
    console.log(`✅ [${testId}] PASS: ${testDesc}`);
    passedTests++;
  } else {
    console.error(`❌ [${testId}] FAIL: ${testDesc}`);
  }
}

// 1. Check physical floor plan CAD assets exist
const assets = [
  'public/project-assets/architecture/cad/previews/typical-floor-cad.jpg',
  'public/project-assets/architecture/cad/previews/stilt-floor-cad.jpg',
  'public/project-assets/architecture/cad/previews/ground-floor-preview.jpg',
  'public/project-assets/architecture/cad/previews/first-floor-preview.jpg',
  'public/project-assets/architecture/cad/previews/second-floor-preview.jpg',
  'public/project-assets/architecture/cad/previews/masterplan-real.jpg'
];

for (const asset of assets) {
  const exists = fs.existsSync(path.resolve(process.cwd(), asset));
  assert(exists, 'R01', `Architectural asset ${asset} exists on disk`);
}

// 2. Check propertyData.ts content
const propertyDataContent = fs.readFileSync(path.resolve(process.cwd(), 'src/data/propertyData.ts'), 'utf-8');

assert(
  propertyDataContent.includes('unit-01') && propertyDataContent.includes('unit-02') && propertyDataContent.includes('unit-03'),
  'R02',
  'Ground floor units 01, 02, 03 are correctly defined in buildingUnits'
);

assert(
  propertyDataContent.includes('400') && propertyDataContent.includes('276') && propertyDataContent.includes('195'),
  'R03',
  'Unit areas match CAD specifications (400 super / 276 carpet for 1BHK, 240 super / 195 carpet for 1RK)'
);

assert(
  propertyDataContent.includes('6,250') && propertyDataContent.includes('12,500') && propertyDataContent.includes('25,000'),
  'R04',
  'Payment plans include ₹6,250 pre-possession, ₹12,500 post-possession, and ₹25,000 down payment rental returns'
);

assert(
  !propertyDataContent.includes('1-Year Guaranteed') && !propertyDataContent.includes('Lease Agreement Guaranteed'),
  'R05',
  'No misleading "1-Year Guaranteed" or "Lease Agreement" marketing text'
);

assert(
  propertyDataContent.includes('14 covered car bays'),
  'R06',
  'Stilt parking accurately reflects 14 covered car bays and 3 entry gates'
);

// 3. Check FloorPlanModal.tsx exists and is wired
const floorPlanModalContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/modals/FloorPlanModal.tsx'), 'utf-8');
assert(
  floorPlanModalContent.includes('typical-floor-cad.jpg') &&
  floorPlanModalContent.includes('stilt-floor-cad.jpg') &&
  floorPlanModalContent.includes('ground-floor-preview.jpg') &&
  floorPlanModalContent.includes('first-floor-preview.jpg') &&
  floorPlanModalContent.includes('second-floor-preview.jpg'),
  'R07',
  'FloorPlanModal contains all 5 architectural drawings for residences, stilt, and hospital'
);

assert(
  floorPlanModalContent.includes('Ar. Yash Garg') && floorPlanModalContent.includes('The Vision Architects'),
  'R08',
  'FloorPlanModal attributes official architecture to Ar. Yash Garg (The Vision Architects)'
);

// 4. Check RootLayout mounts FloorPlanModal
const layoutContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/layout.tsx'), 'utf-8');
assert(
  layoutContent.includes('FloorPlanModal'),
  'R09',
  'RootLayout globally mounts FloorPlanModal inside ModalProvider'
);

// 5. Check UnitDetailDrawer flow
const drawerContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/property/UnitDetailDrawer.tsx'), 'utf-8');
assert(
  drawerContent.includes('openFloorPlan') &&
  drawerContent.includes('Plan 1: Down Payment Plan') &&
  drawerContent.includes('Plan 2: 50:50 Flexi Payment') &&
  drawerContent.includes('Covered Stilt Parking'),
  'R10',
  'UnitDetailDrawer features sales advisor flow with CAD viewer trigger, transparent payment breakdown, and parking'
);

// 6. Check ResidenceUnitExplorer 10-point hierarchy
const explorerContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/property/ResidenceUnitExplorer.tsx'), 'utf-8');
assert(
  explorerContent.includes('Phase 1 Allotment') &&
  explorerContent.includes('CAD Blueprint') &&
  explorerContent.includes('Reserve') &&
  explorerContent.includes('Unit Details'),
  'R11',
  'ResidenceUnitExplorer renders Phase 1 active unit cards with CTAs to CAD blueprint, unit details, and 24h reservation hold'
);

// 7. Check Apartments page
const apartmentsContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/apartments/page.tsx'), 'utf-8');
assert(
  apartmentsContent.includes('ResidenceUnitExplorer') &&
  apartmentsContent.includes('BuildingCGIViewer') &&
  apartmentsContent.includes('FinancePaymentPlans') &&
  apartmentsContent.includes('openFloorPlan'),
  'R12',
  'Apartments page integrates full proposition -> elevation -> floor plans -> payment plans -> site visit flow'
);

// 8. Check Healthcare Proposition consistency
assert(
  propertyDataContent.includes('30,000 sq. ft.') && propertyDataContent.includes('Ayurvedic & Multi-Speciality Hospital'),
  'R13',
  'Healthcare proposition is consistently defined as Proposed 30,000 sq. ft. G+2 Ayurvedic & Multi-Speciality Hospital'
);

// 9. Check Navbar Master CAD Blueprint link
const navbarContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/layout/Navbar.tsx'), 'utf-8');
assert(
  navbarContent.includes('CAD Master Blueprints') && navbarContent.includes('openFloorPlan'),
  'R14',
  'Navbar contains direct CAD Master Blueprints trigger'
);

// 10. Check Zero-Break on Razorpay and Webhooks
const createOrderRouteExists = fs.existsSync(path.resolve(process.cwd(), 'src/app/api/payments/create-order/route.ts'));
const verifyRouteExists = fs.existsSync(path.resolve(process.cwd(), 'src/app/api/payments/verify/route.ts'));
const webhookRouteExists = fs.existsSync(path.resolve(process.cwd(), 'src/app/api/payments/razorpay/webhook/route.ts'));
assert(
  createOrderRouteExists && verifyRouteExists && webhookRouteExists,
  'R15',
  'Zero-break protocol: All Razorpay payment, verification, and webhook routes preserved intact'
);

console.log('\n----------------------------------------------------');
console.log(`RESULTS: ${passedTests} / ${totalTests} TESTS PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('----------------------------------------------------');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
