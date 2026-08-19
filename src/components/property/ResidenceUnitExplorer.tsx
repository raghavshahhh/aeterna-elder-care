'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { residenceUnits } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { ResidenceUnit } from '@/types';
import {
  Home,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  Layers,
  ArrowRight,
  Maximize2,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface ResidenceUnitExplorerProps {
  initialUnitId?: string;
}

export const ResidenceUnitExplorer: React.FC<ResidenceUnitExplorerProps> = ({
  initialUnitId = '1bhk-apt'
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);
  const [activeTab, setActiveTab] = useState<'overview' | 'room-sizes' | 'senior-features'>('overview');

  const { openWhatsApp, openLeadDrawer } = useModal();

  const activeUnit = residenceUnits.find((u) => u.id === selectedUnitId) || residenceUnits[0];

  return (
    <section id="unit-explorer" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Senior Residences Visualizer
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              1 RK &amp; 1 BHK — <span className="italic font-serif text-[#C58F58]">Compact, Considered, Complete.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              G+2 residential buildings with stilt car parking, two lifts, and gradual stairs (10&quot; tread, 6&quot; rise). Single-floor living inside each home — built for the body, not the brochure.
            </p>
          </div>

          {/* Unit Switcher */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm">
            {residenceUnits.map((unit) => {
              const isSelected = unit.id === activeUnit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {unit.unitNumber} (~{unit.superAreaSqFt} sq.ft.)
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Clean Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual & Architectural Dimensions */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E2D8] shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
            {/* Unit Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
                    {activeUnit.typeName}
                  </span>
                  <span className="text-xs text-[#53676E]">• {activeUnit.floorName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                  {activeUnit.unitNumber}
                </h3>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Proposed 3D View
                </button>
                <button
                  onClick={() => setActiveTab('room-sizes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'room-sizes'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Room Dimensions
                </button>
                <button
                  onClick={() => setActiveTab('senior-features')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'senior-features'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Senior Safety Design
                </button>
              </div>
            </div>

            {/* TAB 1: 3D Interior Preview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-[#0D2329] min-h-[340px] sm:min-h-[400px] border border-[#E8E2D8] shadow-md flex items-end p-6">
                  <Image
                    src={activeUnit.interior3dCgi}
                    alt={`${activeUnit.unitNumber} Interior View`}
                    fill
                    className="object-cover object-center opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <div className="relative z-10 space-y-1.5 text-white max-w-xl">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[#C58F58] font-mono text-[11px]">
                      <span>~{activeUnit.superAreaSqFt} Sqft Built • ~{activeUnit.carpetAreaSqFt} Sqft Carpet</span>
                      <span>•</span>
                      <span>Indicative 3D Visualization</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-serif-heading font-bold">
                      {activeUnit.typeName}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      Single-floor barrier-free residence designed with dual lifts, gradual 6&quot; rise stairs, and wide doorways for seniors.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {activeUnit.rooms.map((rm, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-center">
                      <div className="text-xs font-bold text-[#0D2329]">{rm.name}</div>
                      <div className="text-[11px] font-mono text-[#2C5E50] font-semibold mt-0.5">{rm.dimensions}</div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-[#899B9F] italic text-right">
                  *Artist impression &amp; indicative interior visualization. Final turnkey fittings as per approved specification.
                </div>
              </div>
            )}

            {/* TAB 2: Room-by-Room Measured Sizes */}
            {activeTab === 'room-sizes' && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
                      Exact Room Measurements
                    </span>
                    <span className="text-xs font-mono text-[#53676E]">
                      ~{activeUnit.carpetAreaSqFt} sq. ft. Carpet Area
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeUnit.rooms.map((rm, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#0D2329]">{rm.name}</div>
                          <div className="text-[11px] text-[#53676E] mt-0.5">{rm.highlight}</div>
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#C58F58] shrink-0 px-3 py-1 rounded bg-[#FAF8F5] border border-[#E8E2D8]">
                          {rm.dimensions}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Senior First Features */}
            {activeTab === 'senior-features' && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2C5E50]">
                    <ShieldCheck className="w-5 h-5" />
                    Built for the Body that Lives Here
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeUnit.seniorSafetyFeatures.map((feat, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-[#CDE0D7] text-xs text-[#0D2329] flex items-start gap-2.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary & WhatsApp Reservation */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C58F58] block">
                  Configuration Details
                </span>
                <h4 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                  {activeUnit.unitNumber}
                </h4>
                <div className="text-xs text-[#53676E] mt-0.5">
                  {activeUnit.typeName}
                </div>
              </div>

              {/* Area Breakdown */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Built-Up Area</span>
                  <strong className="text-sm font-bold text-[#0D2329]">~{activeUnit.superAreaSqFt} sq. ft.</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Carpet Usable Area</span>
                  <strong className="text-sm font-bold text-[#0D2329]">~{activeUnit.carpetAreaSqFt} sq. ft.</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Building Height</span>
                  <strong className="text-xs font-semibold text-[#2C5E50]">G+2 Floors + Stilt Parking</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#53676E]">Lifts &amp; Stairs</span>
                  <strong className="text-xs font-semibold text-[#0D2329]">2 Lifts + 6&quot; Rise Stairs</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() =>
                    openWhatsApp({
                      actionType: 'reserve-unit',
                      unitName: activeUnit.unitNumber,
                      unitType: activeUnit.typeName
                    })
                  }
                  className="w-full py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-sm font-semibold transition-all shadow-lg shadow-[#2C5E50]/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Enquire on WhatsApp (+91 99999558447) →
                </button>

                <button
                  onClick={() =>
                    openLeadDrawer({
                      title: `Schedule Site Walk for ${activeUnit.unitNumber}`,
                      unitName: activeUnit.unitNumber,
                      unitType: activeUnit.typeName,
                      actionType: 'book-site-visit'
                    })
                  }
                  className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C58F58]" />
                  Book Site Visit to Kheri Asra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
