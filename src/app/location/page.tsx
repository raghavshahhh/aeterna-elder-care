'use client';

import React from 'react';
import { LocationConnectivity } from '@/components/property/LocationConnectivity';
import { MapPin } from 'lucide-react';

export default function LocationPage() {
  return (
    <div className="space-y-16 pb-20 bg-[#FAF8F5]">
      {/* Page Hero */}
      <section className="bg-[#0D2329] text-white py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            Location &amp; Connectivity
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Near Reliance MET City, <span className="italic font-serif text-[#C58F58]">SH-22 Jhajjar.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Quiet enough for an unhurried morning stroll, connected enough for a quick drive to Gurugram and Delhi NCR. Set in the lush green fields of Kheri Asra.
          </p>
        </div>
      </section>

      {/* Location Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocationConnectivity />
      </div>
    </div>
  );
}
