'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { residenceUnits, twoPlotOneBlockConfig } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { ResidenceUnit } from '@/types';
import { Interior3DViewer } from '@/components/3d/Interior3DViewer';
import { Unit2DCadBlueprint } from '@/components/property/Unit2DCadBlueprint';
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
  Calendar,
  Rotate3d,
  FileText
} from 'lucide-react';

interface ResidenceUnitExplorerProps {
  initialUnitId?: string;
}

export const ResidenceUnitExplorer: React.FC<ResidenceUnitExplorerProps> = ({
  initialUnitId = '1bhk-apt'
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);
  const [activeTab, setActiveTab] = useState<'3d-interior' | '2d-blueprint' | 'overview' | 'room-sizes' | 'senior-features'>('3d-interior');

  const { openWhatsApp, openLeadDrawer } = useModal();

  const activeUnit = residenceUnits.find((u) => u.id === selectedUnitId) || residenceUnits[0];

  return (
    <section id="unit-explorer" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5 text-[#C58F58]" />
              08 &amp; 09 • Residence &amp; 3D Interior Visualizer
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              1 RK &amp; 1 BHK — <span className="italic font-serif text-[#C58F58]">Compact, Considered, Complete.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              Experience the 360° interactive 3D rooms below. Single-floor living inside each residence with zero-threshold bathrooms, grab rails, and wheelchair-wide hallways.
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
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-6">
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
                <p className="text-[10px] text-[#53676E]/80 italic mt-0.5">Unit configuration subject to final architectural allocation.</p>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                <button
                  onClick={() => setActiveTab('3d-interior')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === '3d-interior'
                      ? 'bg-[#C58F58] text-[#071519] shadow-sm font-bold'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  3D Room Orbit
                </button>
                <button
                  onClick={() => setActiveTab('2d-blueprint')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === '2d-blueprint'
                      ? 'bg-[#2C5E50] text-white shadow-sm font-bold'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
                  2D CAD Blueprint
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Photo Render
                </button>
                <button
                  onClick={() => setActiveTab('room-sizes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'room-sizes'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Room Dimensions
                </button>
                <button
                  onClick={() => setActiveTab('senior-features')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'senior-features'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Safety Specs
                </button>
              </div>
            </div>

            {/* TAB 0: 3D Interior Interactive Canvas */}
            {activeTab === '3d-interior' && (
              <div className="space-y-4">
                <Interior3DViewer
                  unitType={activeUnit.type === '1-rk' ? '1-rk' : '1-bhk'}
                  onToggle2DBlueprint={() => setActiveTab('2d-blueprint')}
                  onToggle2DPlans={() => setActiveTab('room-sizes')}
                />
              </div>
            )}

            {/* TAB 1: 2D CAD Blueprint */}
            {activeTab === '2d-blueprint' && (
              <div className="space-y-4">
                <Unit2DCadBlueprint
                  unitType={activeUnit.type === '1-rk' ? '1-rk' : '1-bhk'}
                  onSelectRoom={() => setActiveTab('3d-interior')}
                  interactive={true}
                />
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs">
                  <span className="text-[#53676E]">
                    Click any room on the 2D CAD floor plan to inspect in 3D orbit.
                  </span>
                  <button
                    onClick={() => setActiveTab('3d-interior')}
                    className="font-bold text-[#2C5E50] hover:text-[#C58F58] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Launch 3D Room Orbit →
                  </button>
                </div>
              </div>
            )}

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
                  *Artist impression &amp; indicative interior visualization. Unit configuration subject to final architectural allocation. Final turnkey fittings as per approved specification.
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
                  Enquire on WhatsApp (+91 99999 55847) →
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

        {/* 2-Plot, 1-Block Premium Configuration */}
        <div className="mt-14 rounded-3xl bg-[#0D2329] border border-white/15 p-7 sm:p-9">
          <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#E0AB77] mb-2">
            <Layers className="w-4 h-4 text-[#C58F58]" />
            {twoPlotOneBlockConfig.headline}
          </div>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl mb-6">
            {twoPlotOneBlockConfig.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                {twoPlotOneBlockConfig.standard.label}
              </div>
              <div className="text-sm text-white/85 font-semibold">{twoPlotOneBlockConfig.standard.plots}</div>
              <div className="text-xs text-white/60">{twoPlotOneBlockConfig.standard.units}</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#C58F58]/10 border border-[#C58F58]/30 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77]">
                {twoPlotOneBlockConfig.premium.label}
              </div>
              <div className="text-sm text-white font-semibold">{twoPlotOneBlockConfig.premium.plots}</div>
              <div className="text-xs text-white/70">{twoPlotOneBlockConfig.premium.units}</div>
              <div className="text-[11px] text-[#E0AB77] pt-1 leading-relaxed">{twoPlotOneBlockConfig.premium.advantage}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
