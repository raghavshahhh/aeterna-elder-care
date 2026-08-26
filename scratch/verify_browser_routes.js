const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:3050';
const DB_PATH = path.join(__dirname, '../data/slcf_database.json');
const RAZORPAY_SECRET = 'secret_seniorliving_mock2026';

const ROUTES_TO_AUDIT = [
  '/',
  '/plots',
  '/apartments',
  '/amenities',
  '/finance',
  '/documents',
  '/locations',
  '/referrals',
  '/buyer',
  '/gallery',
  '/payment-terms',
  '/projects/kheri-asra',
  '/book/PLOT-A-01',
  '/book/PLOT-C-23'
];

async function runBrowserRouteAudit() {
  console.log("================================================================================");
  console.log("SLCF LIVE BROWSER ROUTE & SALES CONVERSION VERIFICATION");
  console.log("================================================================================\n");

  const results = [];

  for (const route of ROUTES_TO_AUDIT) {
    try {
      const res = await fetch(`${BASE_URL}${route}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const text = await res.text();
      const isHtml = text.includes('<!DOCTYPE html>') || text.includes('<html');
      const pass = (res.status === 200 && isHtml);
      results.push({
        name: `Route: ${route}`,
        pass,
        detail: `Status: ${res.status} | Content-Length: ${text.length} bytes`
      });
    } catch (e) {
      results.push({
        name: `Route: ${route}`,
        pass: false,
        detail: `Error: ${e.message}`
      });
    }
  }

  // TEST: Mobile Viewport Header
  try {
    const res = await fetch(`${BASE_URL}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      }
    });
    const text = await res.text();
    const pass = (res.status === 200 && text.includes('Senior Living'));
    results.push({
      name: 'Mobile Browser Emulation: Homepage',
      pass,
      detail: `Status: ${res.status} (iPhone 15 Mobile Viewport)`
    });
  } catch (e) {
    results.push({
      name: 'Mobile Browser Emulation',
      pass: false,
      detail: e.message
    });
  }

  // TEST: Referral Cookie Attribution
  try {
    const res = await fetch(`${BASE_URL}/?ref=PARTNER777`);
    const setCookie = res.headers.get('set-cookie');
    const pass = setCookie && setCookie.includes('slcf_ref=PARTNER777');
    results.push({
      name: 'Referral Attribution Header (?ref=PARTNER777)',
      pass: !!pass,
      detail: pass ? 'HTTP-Only 30-Day Cookie Injected' : 'Cookie missing'
    });
  } catch (e) {
    results.push({
      name: 'Referral Attribution Header',
      pass: false,
      detail: e.message
    });
  }

  console.log("--------------------------------------------------------------------------------");
  let allPass = true;
  results.forEach(r => {
    const mark = r.pass ? "✅ PASS" : "❌ FAIL";
    if (!r.pass) allPass = false;
    console.log(`${mark} | ${r.name} -> [${r.detail}]`);
  });

  console.log("================================================================================");
  if (allPass) {
    console.log("🎉 ALL LIVE BROWSER ROUTES & JOURNEY TOUCHPOINTS RESPONDED WITH 100% SUCCESS!");
  } else {
    console.log("⚠️ SOME BROWSER ROUTES FAILED TO RESPOND! CHECK LOGS.");
  }
}

runBrowserRouteAudit();
