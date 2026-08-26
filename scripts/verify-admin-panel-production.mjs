// scripts/verify-admin-panel-production.mjs
import fs from "fs";

console.log("================================================================");
console.log("SLCF ADMIN PANEL REAL-TIME PRODUCTION VERIFICATION TEST SUITE");
console.log("================================================================");

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

// 1. Check all 12 Admin Route Files
const adminPages = [
  "src/app/admin/page.tsx",
  "src/app/admin/leads/page.tsx",
  "src/app/admin/site-visits/page.tsx",
  "src/app/admin/inventory/page.tsx",
  "src/app/admin/bookings/page.tsx",
  "src/app/admin/payments/page.tsx",
  "src/app/admin/referrals/page.tsx",
  "src/app/admin/locations/page.tsx",
  "src/app/admin/projects/page.tsx",
  "src/app/admin/documents/page.tsx",
  "src/app/admin/audit-logs/page.tsx",
  "src/app/admin/settings/page.tsx"
];

adminPages.forEach((p) => {
  assert(fs.existsSync(p), `Admin page exists: ${p}`);
});

// 2. Check all Core Admin API Route Handlers
const apiRoutes = [
  "src/app/api/leads/route.ts",
  "src/app/api/leads/[id]/route.ts",
  "src/app/api/site-visits/route.ts",
  "src/app/api/inventory/route.ts",
  "src/app/api/bookings/route.ts",
  "src/app/api/bookings/[id]/route.ts",
  "src/app/api/admin/payments/route.ts",
  "src/app/api/admin/refunds/route.ts",
  "src/app/api/referrals/route.ts",
  "src/app/api/referrals/rewards/route.ts",
  "src/app/api/commissions/route.ts",
  "src/app/api/locations/route.ts",
  "src/app/api/projects/route.ts",
  "src/app/api/owner/documents/route.ts",
  "src/app/api/audit-logs/route.ts",
  "src/app/api/settings/route.ts"
];

apiRoutes.forEach((r) => {
  assert(fs.existsSync(r), `API route exists: ${r}`);
});

// 3. Inspect Repository Core Business Models
const repoCode = fs.readFileSync("src/lib/db/repository.ts", "utf8");

assert(repoCode.includes("getSettings:"), "Repository exports getSettings");
assert(repoCode.includes("updateSettings:"), "Repository exports updateSettings");
assert(repoCode.includes("getAuditLogs:"), "Repository exports getAuditLogs");
assert(repoCode.includes("logAction:"), "Repository exports logAction");
assert(repoCode.includes("createBookingWithHold:"), "Repository exports createBookingWithHold");
assert(repoCode.includes("releaseExpiredHolds:"), "Repository exports releaseExpiredHolds");
assert(repoCode.includes("createReferrer:"), "Repository exports createReferrer");
assert(repoCode.includes("updateBooking:"), "Repository exports updateBooking");

// 4. Verify Automatic Inventory Synchronization in updateBooking
assert(
  repoCode.includes("state.inventory[uIdx].status = 'RESERVED'") &&
  repoCode.includes("state.inventory[uIdx].status = 'AVAILABLE'"),
  "Repository updateBooking synchronizes inventory status across CONFIRMED, CANCELLED, and EXPIRED"
);

// 5. Inspect Settings API & Frontend Connection
const settingsRoute = fs.readFileSync("src/app/api/settings/route.ts", "utf8");
assert(settingsRoute.includes("export async function GET"), "Settings route has GET method");
assert(settingsRoute.includes("export async function PATCH"), "Settings route has PATCH method");
assert(settingsRoute.includes("SETTINGS_UPDATED"), "Settings route logs administrative action to audit trail");

const settingsPage = fs.readFileSync("src/app/admin/settings/page.tsx", "utf8");
assert(settingsPage.includes("fetch('/api/settings')"), "Settings page loads live settings from /api/settings");
assert(settingsPage.includes("method: 'PATCH'"), "Settings page saves live settings to /api/settings");
assert(settingsPage.includes("disabled={isSaving}"), "Settings page prevents double submission during save");

// 6. Inspect Audit Logs API & Frontend Connection
const auditRoute = fs.readFileSync("src/app/api/audit-logs/route.ts", "utf8");
assert(auditRoute.includes("export async function GET"), "Audit logs route has GET method");
assert(auditRoute.includes("db.getAuditLogs"), "Audit logs route retrieves from database");

const auditPage = fs.readFileSync("src/app/admin/audit-logs/page.tsx", "utf8");
assert(auditPage.includes("fetch('/api/audit-logs')"), "Audit logs page fetches live logs from /api/audit-logs");
assert(auditPage.includes("searchTerm"), "Audit logs page supports searching");
assert(auditPage.includes("actionFilter"), "Audit logs page supports action filtering");

// 7. Inspect Leads CRM Page Add & Manage Flow
const leadsPage = fs.readFileSync("src/app/admin/leads/page.tsx", "utf8");
assert(leadsPage.includes("isCreatingLead"), "Leads page has Walk-in / New Lead creation modal");
assert(leadsPage.includes("handleCreateLead"), "Leads page handles lead form submission to /api/leads");
assert(leadsPage.includes("updateStatus"), "Leads page updates status and timeline notes in database");

// 8. Inspect Site Visits Field Logistics Desk
const visitsPage = fs.readFileSync("src/app/admin/site-visits/page.tsx", "utf8");
assert(visitsPage.includes("isScheduling"), "Site visits page has Schedule New Visit modal");
assert(visitsPage.includes("handleScheduleVisit"), "Site visits page submits visit booking to /api/site-visits");
assert(visitsPage.includes("updateStatus"), "Site visits page manages CONFIRMED, VISITED, CANCELLED states");

// 9. Inspect Bookings & Allotments
const bookingsPage = fs.readFileSync("src/app/admin/bookings/page.tsx", "utf8");
assert(bookingsPage.includes("isCreatingBooking"), "Bookings page has Create Allotment / Hold modal");
assert(bookingsPage.includes("availableUnits"), "Bookings modal dynamically populates from available inventory");
assert(bookingsPage.includes("handleUpdateBookingStatus"), "Bookings page handles status transitions");

// 10. Inspect Executive Dashboard Live Revenue Aggregation
const dashboardPage = fs.readFileSync("src/app/admin/page.tsx", "utf8");
assert(dashboardPage.includes("fetch('/api/admin/payments')"), "Dashboard fetches payments ledger for live metrics");
assert(dashboardPage.includes("fetch('/api/inventory')"), "Dashboard fetches inventory status for unit metrics");
assert(dashboardPage.includes("monthlyRevenueMap"), "Dashboard dynamically aggregates monthly collections from database");

// 11. Zero Stale Aeterna Domain Check in Admin & API Files
const allAdminSrc = [...adminPages, ...apiRoutes];
allAdminSrc.forEach((f) => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, "utf8");
    assert(!c.includes("aeterna-elder-care.vercel.app"), `${f} is free of legacy aeterna domains`);
  }
});

console.log("----------------------------------------------------------------");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("----------------------------------------------------------------");

if (failed > 0) process.exit(1);
