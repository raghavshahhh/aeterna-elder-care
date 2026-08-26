// scripts/verify-admin-referrals-regression.mjs
import fs from "fs";

console.log("================================================================");
console.log("SLCF ADMIN REFERRALS & ISSUE CODE FORENSIC REGRESSION TEST SUITE");
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

// 1. Check file existence
assert(fs.existsSync("src/app/admin/referrals/page.tsx"), "src/app/admin/referrals/page.tsx exists");
assert(fs.existsSync("src/app/api/referrals/route.ts"), "src/app/api/referrals/route.ts exists");
assert(fs.existsSync("src/lib/db/repository.ts"), "src/lib/db/repository.ts exists");
assert(fs.existsSync("src/lib/db/schema.ts"), "src/lib/db/schema.ts exists");

// 2. Inspect API POST Route Contract & Validation Logic
const apiRoute = fs.readFileSync("src/app/api/referrals/route.ts", "utf8");

assert(apiRoute.includes("if (!name)"), "API validates required name");
assert(apiRoute.includes("if (!phone)"), "API validates required phone");
assert(apiRoute.includes("name.length < 2"), "API validates min name length");
assert(apiRoute.includes("cleanDigits.length < 7"), "API validates min phone digits");
assert(apiRoute.includes("const emailRegex = /"), "API validates email format with regex if provided");
assert(apiRoute.includes("Please enter a valid email address"), "API returns clear error message on invalid email");
assert(apiRoute.includes("isNew: false"), "API flags existing partner gracefully as isNew: false");
assert(apiRoute.includes("isNew: true"), "API flags new partner as isNew: true");
assert(apiRoute.includes("REFERRER_REGISTERED"), "API writes audit log for referral registration");

// 3. Inspect Repository createReferrer Uniqueness Logic
const repoCode = fs.readFileSync("src/lib/db/repository.ts", "utf8");

assert(repoCode.includes("createReferrer: (name: string, phone: string, email: string, upiId?: string)"), "Repository createReferrer has correct signature");
assert(repoCode.includes("SLF${randomPart}"), "Referral codes are uppercase SLF prefixed");
assert(repoCode.includes("state.referrers.some((r) => r.code.toUpperCase() === code)"), "Repository prevents code collisions via uniqueness check");

// 4. Inspect Admin Referrals Frontend UX & States
const pageCode = fs.readFileSync("src/app/admin/referrals/page.tsx", "utf8");

assert(pageCode.includes("createdPartnerResult"), "Page manages createdPartnerResult for in-modal success view");
assert(pageCode.includes("formError &&"), "Page renders inline formError in red alert box");
assert(pageCode.includes("disabled={isSubmitting}"), "Page disables inputs & buttons during submission");
assert(pageCode.includes("animate-spin"), "Page displays loading spinner during submission");
assert(pageCode.includes("Partner Name *"), "Modal has Partner Name required label");
assert(pageCode.includes("Phone Number *"), "Modal has Phone Number required label");
assert(pageCode.includes("Email Address (Optional / Portal Login)"), "Modal has Email Address optional input");
assert(pageCode.includes("UPI ID for Auto-Payouts (Optional)"), "Modal has UPI ID optional input");
assert(pageCode.includes("copyPartnerLink"), "Page has copyPartnerLink handler");
assert(pageCode.includes("Copied"), "Page provides clear copied feedback");
assert(pageCode.includes("wa.me/?text="), "Page has WhatsApp share action");

// 5. Inspect Admin Layout Branding
const layoutCode = fs.readFileSync("src/app/admin/layout.tsx", "utf8");
assert(layoutCode.includes("Senior Living"), "Admin sidebar header includes Senior Living");
assert(layoutCode.includes("Citizens Foundation · Admin"), "Admin sidebar header includes Citizens Foundation · Admin");

// 6. Zero Stale Domain Check
const allSrcFiles = [
  "src/app/admin/referrals/page.tsx",
  "src/app/api/referrals/route.ts",
  "src/app/admin/layout.tsx",
  "src/app/portal/referral/page.tsx",
  "src/app/referrals/page.tsx",
  "src/app/layout.tsx",
  "src/lib/db/repository.ts"
];

allSrcFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  assert(!content.includes("aeterna-elder-care.vercel.app"), `${file} has zero stale aeterna domain references`);
});

console.log("----------------------------------------------------------------");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("----------------------------------------------------------------");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
