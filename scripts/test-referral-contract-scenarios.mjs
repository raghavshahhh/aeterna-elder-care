// scripts/test-referral-contract-scenarios.mjs
import fs from "fs";

console.log("================================================================");
console.log("TESTING REFERRAL API CONTRACT SCENARIOS (A through J)");
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

// Logic replicate of POST /api/referrals contract
function validateAndProcessReferral(body, existingList = []) {
  let { name, phone, email, upiId } = body;
  name = typeof name === "string" ? name.trim() : "";
  phone = typeof phone === "string" ? phone.trim() : "";
  email = typeof email === "string" ? email.trim() : "";
  upiId = typeof upiId === "string" ? upiId.trim() : "";

  if (!name) return { status: 400, body: { success: false, error: "Partner full name is required." } };
  if (!phone) return { status: 400, body: { success: false, error: "Phone number is required." } };
  if (name.length < 2) return { status: 400, body: { success: false, error: "Partner name must be at least 2 characters." } };
  
  const cleanDigits = phone.replace(/\D/g, "");
  if (cleanDigits.length < 7) return { status: 400, body: { success: false, error: "Please enter a valid phone number." } };
  const normPhone = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let finalEmail = "";

  if (email) {
    if (!emailRegex.test(email)) {
      return { status: 400, body: { success: false, error: "Please enter a valid email address." } };
    }
    finalEmail = email.toLowerCase();
  } else {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "") || "partner";
    finalEmail = `${cleanName}.${cleanDigits.slice(-4)}@partner.slcf.in`;
  }

  const existingRef = existingList.find((r) => {
    const rDigits = r.phone.replace(/\D/g, "");
    const rNorm = rDigits.length >= 10 ? rDigits.slice(-10) : rDigits;
    const phoneMatch = Boolean(rNorm && rNorm === normPhone);
    const emailMatch = Boolean(r.email && r.email.toLowerCase() === finalEmail.toLowerCase());
    return phoneMatch || emailMatch;
  });

  if (existingRef) {
    return {
      status: 200,
      body: {
        success: true,
        isNew: false,
        referrer: existingRef,
        message: `Partner is already registered with referral code ${existingRef.code}.`
      }
    };
  }

  const generatedCode = "SLF" + Math.random().toString(36).substring(2, 6).toUpperCase();
  const newRef = {
    id: "REF-TEST-01",
    code: generatedCode,
    name,
    phone,
    email: finalEmail,
    upiId: upiId || undefined,
    isActive: true
  };

  return {
    status: 200,
    body: {
      success: true,
      isNew: true,
      referrer: newRef,
      message: `Partner referral code ${newRef.code} generated successfully!`
    }
  };
}

// Scenario A: Name + Phone + UPI ID
const resA = validateAndProcessReferral({ name: "Dr. Rajesh Verma", phone: "+91 98765 43210", upiId: "rajesh@okhdfcbank" });
assert(resA.status === 200 && resA.body.success && resA.body.referrer.code.startsWith("SLF"), "Scenario A: Name + Phone + UPI ID generates code");

// Scenario B: Name + Phone + Email
const resB = validateAndProcessReferral({ name: "Aarav Sharma", phone: "9811122233", email: "aarav@gmail.com" });
assert(resB.status === 200 && resB.body.referrer.email === "aarav@gmail.com", "Scenario B: Name + Phone + Email uses provided email");

// Scenario C: Name + Phone + Email + UPI ID
const resC = validateAndProcessReferral({ name: "Pooja Mehta", phone: "9822233344", email: "pooja@mehta.org", upiId: "pooja@paytm" });
assert(resC.status === 200 && resC.body.referrer.email === "pooja@mehta.org" && resC.body.referrer.upiId === "pooja@paytm", "Scenario C: Name + Phone + Email + UPI ID preserves both");

// Scenario D: Existing Partner (by phone with country code vs local)
const existingList = [{ id: "REF-001", code: "SLFX89", name: "Raghav Shah", phone: "+91 87000 48490", email: "raghav@ragspro.com" }];
const resD = validateAndProcessReferral({ name: "Raghav Shah", phone: "8700048490" }, existingList);
assert(resD.status === 200 && resD.body.isNew === false && resD.body.referrer.code === "SLFX89", "Scenario D: Existing partner returns code without crash");

// Scenario E: Duplicate Phone
const resE = validateAndProcessReferral({ name: "Another Name", phone: "8700048490" }, existingList);
assert(resE.status === 200 && resE.body.isNew === false && resE.body.referrer.code === "SLFX89", "Scenario E: Duplicate phone handled deterministically");

// Scenario F: Empty Required Fields
const resF1 = validateAndProcessReferral({ name: "", phone: "9876543210" });
assert(resF1.status === 400 && resF1.body.error.includes("name is required"), "Scenario F1: Empty name returns 400 error");
const resF2 = validateAndProcessReferral({ name: "Valid Name", phone: "" });
assert(resF2.status === 400 && resF2.body.error.includes("Phone number is required"), "Scenario F2: Empty phone returns 400 error");

// Scenario G: Invalid Email
const resG = validateAndProcessReferral({ name: "Valid Name", phone: "9876543210", email: "not-an-email" });
assert(resG.status === 400 && resG.body.error.includes("valid email address"), "Scenario G: Invalid email returns 400 error");

// Scenario H: UPI ID that is NOT an email (e.g. 8700048490@paytm)
const resH = validateAndProcessReferral({ name: "Suresh Gupta", phone: "9876543210", upiId: "8700048490@paytm" });
assert(resH.status === 200 && resH.body.referrer.upiId === "8700048490@paytm" && resH.body.referrer.email.endsWith("@partner.slcf.in"), "Scenario H: Standard UPI handle does not overwrite generated email");

// Scenario I: UPI field containing email (e.g. raghav@ragspro.com) + no email provided
const resI = validateAndProcessReferral({ name: "Raghav Shah", phone: "8700048490", upiId: "raghav@ragspro.com" });
assert(resI.status === 200 && resI.body.referrer.upiId === "raghav@ragspro.com", "Scenario I: UPI field preserved cleanly");

// Scenario J: Error Structure Check
assert(resF1.body.success === false && typeof resF1.body.error === "string", "Scenario J: API error structure is consistent JSON");

console.log("----------------------------------------------------------------");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("----------------------------------------------------------------");

if (failed > 0) process.exit(1);
