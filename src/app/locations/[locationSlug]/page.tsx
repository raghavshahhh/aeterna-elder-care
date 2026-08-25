'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DynamicLocationPage() {
  const params = useParams();
  const router = useRouter();
  const locationSlug = params?.locationSlug as string;

  useEffect(() => {
    if (locationSlug === 'haryana') {
      router.replace('/projects/kheri-asra');
    } else if (locationSlug === 'goa') {
      router.replace('/projects/goa-residence');
    } else {
      router.replace('/locations');
    }
  }, [locationSlug, router]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#2C5E50] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-[#53676E]">Connecting to Sanctuary Location...</span>
      </div>
    </div>
  );
}
