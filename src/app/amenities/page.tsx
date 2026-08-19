'use client';

import React from 'react';
import { EcosystemShowcase } from '@/components/property/EcosystemShowcase';
import { MasterPlanExplorer } from '@/components/property/MasterPlanExplorer';
import { useModal } from '@/context/ModalContext';
import { Sparkles, Activity, ShieldCheck, Heart, Compass, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AmenitiesPage() {
  const { openWhatsApp } = useModal();

  return (
    <div className="space-y-16 pb-20 bg-[#FAF8F5]">
      {/* Page Hero */}
      <section className="bg-[#0D2329] text-white py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            On-Site Facilities &amp; Wellness
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Healing, Faith, and a <span className="italic font-serif text-[#C58F58]">Walkable Daily Life.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Healthcare, spiritual sanctuary, wide tree-lined roads, and green buffers — everything you need, thoughtfully integrated within the township gates.
          </p>
        </div>
      </section>

      {/* 3-Pillar Ecosystem Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EcosystemShowcase />
      </div>

      {/* CAD Master Plan Explorer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MasterPlanExplorer selectedFloorId="ground" onSelectUnit={() => {}} />
      </div>

      {/* Quick Amenities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3">
            <div className="text-3xl">🕌</div>
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">Community Mandir</h3>
            <p className="text-xs text-[#53676E] leading-relaxed">
              Sited at the western edge — within a gentle 5-minute walk from every plot for daily morning aarti and evening satsang.
            </p>
          </div>
          <div className="p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3">
            <div className="text-3xl">⚡</div>
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">Utility Services Block</h3>
            <p className="text-xs text-[#53676E] leading-relaxed">
              Dedicated 289 sq. yd. infrastructure zone for power management, clean water treatment, and 24x7 estate security.
            </p>
          </div>
          <div className="p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3">
            <div className="text-3xl">🛣️</div>
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">11ft to 33ft Wide Roads</h3>
            <p className="text-xs text-[#53676E] leading-relaxed">
              Designed for senior walkers with shaded paths, zero traffic congestion, and full emergency ambulance clearance.
            </p>
          </div>
          <div className="p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3">
            <div className="text-3xl">🌳</div>
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">Boundary Green Belts</h3>
            <p className="text-xs text-[#53676E] leading-relaxed">
              Continuous 5ft (North) and 6ft (South) green buffer belts filled with native trees providing fresh, unpolluted air.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
