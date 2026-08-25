'use client';

import { useEffect } from 'react';
import { captureReferralCodeFromUrl } from '@/lib/referral';

export function ReferralTracker() {
  useEffect(() => {
    captureReferralCodeFromUrl();
  }, []);

  return null;
}
