'use client';

import React from 'react';
import { AvailabilityMatrix } from '@/components/property/AvailabilityMatrix';
import { plotsSummary } from '@/data/propertyData';
import { Compass, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PlotsPage() {
  return (
    <div className="space-y-16 pb-20 bg-[#FAF8F5]">
      {/* Page Hero */}
      <section className="bg-[#0D2329] text-white py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            Plot Availability &amp; Inventory
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Find <span className="italic font-serif text-[#C58F58]">Your</span> Plot.
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            64 residential freehold plots across 6 blocks (Blocks A to F) — from compact 120 sq. yd. homes to generous 425 sq. yd. corner plots. Phase 1 priority allotment and site visit booking open.
          </p>
        </div>
      </section>

      {/* Plot Matrix Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AvailabilityMatrix />
      </div>
    </div>
  );
}
