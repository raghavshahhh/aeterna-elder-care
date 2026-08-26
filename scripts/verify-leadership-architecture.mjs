// scripts/verify-leadership-architecture.mjs
import fs from "fs";
import path from "path";

console.log("====================================================");
console.log("SLCF LEADERSHIP & AMBASSADORS ARCHITECTURE TEST SUITE");
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

// 1. Verify Types & Data Layer Files
assert(fs.existsSync("src/types/leadership.ts"), "src/types/leadership.ts exists");
assert(fs.existsSync("src/data/leadershipData.ts"), "src/data/leadershipData.ts exists");

// 2. Verify Component Files Exist
const components = [
  "src/components/leadership/LeadershipHero.tsx",
  "src/components/leadership/SocialLinksRow.tsx",
  "src/components/leadership/OwnerFeatureSection.tsx",
  "src/components/leadership/OwnerTimelineSection.tsx",
  "src/components/leadership/CompanyAssociationsSection.tsx",
  "src/components/leadership/AmbassadorSection.tsx",
  "src/components/leadership/AmbassadorDetailDrawer.tsx",
  "src/components/leadership/LeadershipMediaSection.tsx",
  "src/components/leadership/LeadershipTrustSystem.tsx"
];

components.forEach((comp) => {
  assert(fs.existsSync(comp), `${comp} exists`);
});

// 3. Verify Page Route
assert(fs.existsSync("src/app/leadership/page.tsx"), "src/app/leadership/page.tsx exists");

// 4. Verify Content Data Structure
const dataContent = fs.readFileSync("src/data/leadershipData.ts", "utf8");

assert(dataContent.includes("id: \"owner-founder\""), "ownerProfile has id \"owner-founder\"");
assert(dataContent.includes("name: \"[OWNER DETAILS PENDING]\""), "ownerProfile has clean pending placeholder name");
assert(dataContent.includes("ambassadors: LeadershipProfile[]"), "ambassadors array is typed LeadershipProfile[]");
assert(dataContent.includes("id: \"ambassador-01\""), "ambassador 01 defined");
assert(dataContent.includes("id: \"ambassador-02\""), "ambassador 02 defined");
assert(dataContent.includes("id: \"ambassador-03\""), "ambassador 03 defined");

// Count ambassador objects
const ambMatches = [...dataContent.matchAll(/id:\s*"ambassador-\d+"/g)];
assert(ambMatches.length === 3, `Exactly 3 ambassadors defined in data (found ${ambMatches.length})`);

// 5. Verify Navigation Links
const navbarContent = fs.readFileSync("src/components/layout/Navbar.tsx", "utf8");
assert(navbarContent.includes("href=\"/leadership\""), "Navbar contains /leadership links");

const navLeadershipCount = (navbarContent.match(/href="\/leadership"/g) || []).length;
assert(navLeadershipCount >= 2, `Navbar includes /leadership across desktop & mobile menus (${navLeadershipCount} links found)`);

const footerContent = fs.readFileSync("src/components/layout/Footer.tsx", "utf8");
assert(footerContent.includes("href=\"/leadership\""), "Footer includes /leadership link");

// 6. Verify Conditional Rendering Protections
const socialRowContent = fs.readFileSync("src/components/leadership/SocialLinksRow.tsx", "utf8");
assert(socialRowContent.includes("if (!socialLinks) return null;"), "SocialLinksRow checks for null socialLinks");
assert(socialRowContent.includes("if (!hasAnyLink) return null;"), "SocialLinksRow hides completely if no links exist");

const timelineContent = fs.readFileSync("src/components/leadership/OwnerTimelineSection.tsx", "utf8");
assert(timelineContent.includes("if (!timeline || timeline.length === 0) return null;"), "OwnerTimelineSection hides when timeline is empty");

const companyContent = fs.readFileSync("src/components/leadership/CompanyAssociationsSection.tsx", "utf8");
assert(companyContent.includes("if (!companies || companies.length === 0) return null;"), "CompanyAssociationsSection hides when companies array is empty");

const mediaSectionContent = fs.readFileSync("src/components/leadership/LeadershipMediaSection.tsx", "utf8");
assert(mediaSectionContent.includes("if (!mediaItems || mediaItems.length === 0) return null;"), "LeadershipMediaSection hides when mediaItems array is empty");

console.log("----------------------------------------------------");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("----------------------------------------------------");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
