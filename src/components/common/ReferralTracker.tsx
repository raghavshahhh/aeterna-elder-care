'use client';

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function ReferralTracker() {
  const searchParams = useSearchParams();
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!searchParams) return;
    const refCode = searchParams.get("ref") || searchParams.get("referral") || searchParams.get("r");

    if (refCode && refCode.trim().length >= 3) {
      const cleanCode = refCode.trim().toUpperCase();
      
      // Prevent duplicate tracking in the same browser session
      const sessionKey = `slcf_tracked_${cleanCode}`;
      if (typeof window !== "undefined" && !sessionStorage.getItem(sessionKey) && trackedRef.current !== cleanCode) {
        trackedRef.current = cleanCode;
        sessionStorage.setItem(sessionKey, "1");

        // Fire beacon / fetch to track link open / visit
        fetch(`/api/referrals/click?code=${encodeURIComponent(cleanCode)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: cleanCode })
        }).catch((err) => {
          console.warn("[ReferralTracker] Click tracking skipped:", err);
        });
      }
    }
  }, [searchParams]);

  return null;
}
