'use client';

const REFERRAL_STORAGE_KEY = 'slcf_active_ref_code';
const REFERRAL_EXPIRY_DAYS = 30;

export function captureReferralCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref') || params.get('referral') || params.get('r');

    if (refParam && refParam.trim().length >= 3) {
      const cleanCode = refParam.trim().toUpperCase();
      const expiry = Date.now() + REFERRAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      const data = { code: cleanCode, expiresAt: expiry };
      localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(data));
      return cleanCode;
    }

    // Check existing stored code
    const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
        return parsed.code;
      } else {
        localStorage.removeItem(REFERRAL_STORAGE_KEY);
      }
    }
  } catch {
    // Graceful fallback
  }

  return null;
}

export function getActiveReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
        return parsed.code;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function getUtmParameters(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};

  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  keys.forEach((key) => {
    const val = params.get(key);
    if (val) utms[key] = val;
  });

  return utms;
}
