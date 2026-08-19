'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { residenceUnits } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { ResidenceUnit, UnitType } from '@/types';
import {
  Home,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Maximize2,
  Compass,
  Layers,
  ArrowRight,
  Eye,
  Sliders,
  Heart
} from 'lucide-react';

interface ResidenceUnitExplorerProps {
  initialUnitId?: string;
}

export const ResidenceUnitExplorer: React.FC<ResidenceUnitExplorerProps> = ({ initialUnitId = '01' }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);
  const [activeTab, setActiveTab] = useState<'3d-interiors' | '2d-blueprint' | 'safety-specs'>('3d-interiors');
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const [typeFilter, setTypeFilter] = useState<'all' | '1-bhk' | '1-rk'>('all');

  const { openWhatsApp, openLeadDrawer } = useModal();

  const filteredUnits = residenceUnits.filter((u) => {
    if (typeFilter === 'all') return true;
    return u.type === typeFilter;
  });

  const activeUnit = residenceUnits.find((u) => u.id === selectedUnitId) || residenceUnits[0];
  const activeRoom = activeUnit.rooms[activeRoomIndex] || activeUnit.rooms[0];
  const isUnitAvailable = activeUnit.status === 'available';

  return (
    <section id="unit-explorer" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              Future Residence Explorer
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              Choose Your <span className="italic font-serif text-[#C58F58]">Sanctuary Suite.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              Every residence is crafted specifically for elder dignity — zero floor barriers, expansive natural sunlight, hospital-grade acoustic dampening, and direct nurse connectivity.
            </p>
          </div>

          {/* Type Filter Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === 'all'
                  ? 'bg-[#2C5E50] text-white shadow-sm'
                  : 'text-[#53676E] hover:text-[#0D2329]'
              }`}
            >
              All 9 Suites
            </button>
            <button
              onClick={() => setTypeFilter('1-bhk')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === '1-bhk'
                  ? 'bg-[#2C5E50] text-white shadow-sm'
                  : 'text-[#53676E] hover:text-[#0D2329]'
              }`}
            >
              1 BHK Care Suites (885–980 sq. ft.)
            </button>
            <button
              onClick={() => setTypeFilter('1-rk')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === '1-rk'
                  ? 'bg-[#2C5E50] text-white shadow-sm'
                  : 'text-[#53676E] hover:text-[#0D2329]'
              }`}
            >
              1 RK Wellness Studios (540–560 sq. ft.)
            </button>
          </div>
        </div>

        {/* Unit Horizontal Selector Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filteredUnits.map((unit) => {
            const isSelected = unit.id === activeUnit.id;
            const isAvail = unit.status === 'available';
            return (
              <button
                key={unit.id}
                onClick={() => {
                  setSelectedUnitId(unit.id);
                  setActiveRoomIndex(0);
                }}
                className={`p-4 rounded-2xl border text-left shrink-0 min-w-[220px] transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#0D2329] text-white border-[#0D2329] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#0D2329] border-[#E8E2D8] hover:border-[#C58F58]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-bold font-serif-heading">{unit.unitNumber}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isAvail
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isSelected
                        ? 'bg-white/10 text-white/70'
                        : 'bg-[#F0EBE1] text-[#53676E]'
                    }`}
                  >
                    {isAvail ? '🟢 Available' : '🟡 Phase 2'}
                  </span>
                </div>
                <div className={`text-xs ${isSelected ? 'text-white/70' : 'text-[#53676E]'}`}>
                  {unit.typeName.split(' ')[0]} {unit.typeName.split(' ')[1]} • {unit.superAreaSqFt} sq. ft.
                </div>
                <div className={`text-[11px] mt-1 font-mono ${isSelected ? 'text-[#C58F58]' : 'text-[#2C5E50]'} font-semibold`}>
                  {unit.floorName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Unit Detail Card & Interactive Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visualizer & Interior 3D Views */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E2D8] shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
            {/* Unit Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
                    {activeUnit.releasePhase}
                  </span>
                  <span className="text-xs text-[#53676E]">• {activeUnit.floorName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                  {activeUnit.unitNumber} — {activeUnit.typeName}
                </h3>
              </div>

              {/* View Switcher Tabs (3D Interior vs 2D Blueprint vs Safety) */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                <button
                  onClick={() => setActiveTab('3d-interiors')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === '3d-interiors'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  3D Proposed Interiors
                </button>
                <button
                  onClick={() => setActiveTab('2d-blueprint')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === '2d-blueprint'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  2D Architectural CAD
                </button>
                <button
                  onClick={() => setActiveTab('safety-specs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'safety-specs'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Senior Safety Specs
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: 3D Proposed Interiors */}
            {activeTab === '3d-interiors' && (
              <div className="space-y-4">
                {/* Room Selector Carousel Pills */}
                {activeUnit.rooms.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {activeUnit.rooms.map((room, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveRoomIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                          activeRoomIndex === idx
                            ? 'bg-[#0D2329] text-white shadow-sm'
                            : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#F0EBE1]'
                        }`}
                      >
                        {room.name} ({room.dimensions})
                      </button>
                    ))}
                  </div>
                )}

                {/* Big 3D CGI Image Display */}
                <div className="relative rounded-2xl overflow-hidden bg-[#0D2329] min-h-[340px] sm:min-h-[440px] border border-[#E8E2D8] shadow-md flex items-end p-6">
                  <Image
                    src={activeRoom.cgiImage}
                    alt={`${activeUnit.unitNumber} - ${activeRoom.name}`}
                    fill
                    className="object-cover object-center opacity-90 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="relative z-10 space-y-1.5 text-white max-w-xl">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/50 backdrop-blur-md text-[11px] font-mono text-[#C58F58] border border-white/10">
                      <span>Dimensions: {activeRoom.dimensions}</span>
                      <span>•</span>
                      <span>{activeUnit.facing}</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-serif-heading font-bold">
                      {activeRoom.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {activeRoom.highlight}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-[#899B9F] italic text-right">
                  *Indicative 3D visualization. Furnishings & finishes subject to approved architectural specifications.
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: 2D Blueprint */}
            {activeTab === '2d-blueprint' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-[#071519] min-h-[380px] sm:min-h-[440px] border border-[#294B57] p-6 flex flex-col justify-between text-white">
                  <Image
                    src={activeUnit.blueprint2d}
                    alt={`${activeUnit.unitNumber} CAD Architectural Blueprint`}
                    fill
                    className="object-cover object-center opacity-30"
                  />
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono font-bold text-[#C58F58]">
                      STRUCTURAL BLUEPRINT // UNIT {activeUnit.id}
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      Carpet Area: {activeUnit.carpetAreaSqFt} sq. ft. | Super Built-up: {activeUnit.superAreaSqFt} sq. ft.
                    </span>
                  </div>

                  <div className="relative z-10 bg-black/60 backdrop-blur-md p-5 rounded-xl border border-white/15 space-y-3 max-w-lg my-auto">
                    <h4 className="text-lg font-serif-heading font-bold text-white">
                      Room-by-Room Architectural Sizing:
                    </h4>
                    <div className="space-y-1.5 text-xs text-white/80">
                      {activeUnit.rooms.map((rm, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-white/10">
                          <span className="font-medium text-white">{rm.name}</span>
                          <span className="font-mono text-[#C58F58]">{rm.dimensions}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs text-white/60 pt-3 border-t border-white/10">
                    <span>Orientation: {activeUnit.facing}</span>
                    <button
                      onClick={() => openLeadDrawer({ title: `Request High-Res CAD Blueprint for ${activeUnit.unitNumber}`, actionType: 'inquire-residence' })}
                      className="text-[#C58F58] hover:underline font-bold"
                    >
                      Download Scaled PDF Blueprint →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: Senior Safety Specs */}
            {activeTab === 'safety-specs' && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#2C5E50]">
                    <ShieldCheck className="w-5 h-5" />
                    Senior-Specific Universal Design Standards
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

          {/* Side Purchase & Priority Reservation Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C58F58] block">
                  Residence Specifications
                </span>
                <h4 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                  {activeUnit.unitNumber}
                </h4>
                <div className="text-xs text-[#53676E] mt-1">
                  {activeUnit.typeName} • {activeUnit.facing}
                </div>
              </div>

              {/* Area & Pricing Breakdown */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Super Built-up Area</span>
                  <strong className="text-sm font-bold text-[#0D2329]">{activeUnit.superAreaSqFt} sq. ft.</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Carpet Usable Area</span>
                  <strong className="text-sm font-bold text-[#0D2329]">{activeUnit.carpetAreaSqFt} sq. ft.</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Pre-Launch Valuation</span>
                  <strong className="text-sm font-bold text-[#2C5E50]">{activeUnit.startingPriceEstimate}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#53676E]">Monthly Care Package</span>
                  <strong className="text-xs font-semibold text-[#0D2329]">{activeUnit.monthlyCarePackageEstimate}</strong>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-bold text-[#0D2329] tracking-wider block">
                  Suite Highlights:
                </span>
                {activeUnit.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#53676E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                {isUnitAvailable ? (
                  <button
                    onClick={() =>
                      openWhatsApp({
                        actionType: 'reserve-unit',
                        unitName: activeUnit.unitNumber,
                        unitType: activeUnit.typeName,
                        floorName: activeUnit.floorName
                      })
                    }
                    className="w-full py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-sm font-semibold transition-all shadow-lg shadow-[#2C5E50]/20 flex items-center justify-center gap-2"
                  >
                    Reserve {activeUnit.unitNumber} (Phase 1) →
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      openLeadDrawer({
                        title: `Register Advance Interest for ${activeUnit.unitNumber}`,
                        unitName: activeUnit.unitNumber,
                        unitType: activeUnit.typeName,
                        actionType: 'inquire-residence'
                      })
                    }
                    className="w-full py-4 rounded-2xl bg-[#FAF8F5] border border-[#2C5E50] text-[#2C5E50] hover:bg-[#2C5E50] hover:text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    Register Priority Interest (Phase 2) →
                  </button>
                )}

                <button
                  onClick={() =>
                    openLeadDrawer({
                      title: `Schedule Site Visit for ${activeUnit.unitNumber}`,
                      unitName: activeUnit.unitNumber,
                      unitType: activeUnit.typeName,
                      actionType: 'book-site-visit'
                    })
                  }
                  className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center"
                >
                  Book Private Site & Floor Walkthrough
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
