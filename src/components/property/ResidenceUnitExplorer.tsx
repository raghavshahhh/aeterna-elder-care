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
  Maximize2,
  Compass,
  Layers,
  ArrowRight,
  Eye,
  Sliders,
  Heart,
  Building2
} from 'lucide-react';

interface ResidenceUnitExplorerProps {
  initialUnitId?: string;
}

export const ResidenceUnitExplorer: React.FC<ResidenceUnitExplorerProps> = ({
  initialUnitId = '1bhk-apt'
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);
  const [activeTab, setActiveTab] = useState<'3d-interiors' | '2d-blueprint' | 'safety-specs'>('3d-interiors');
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);

  const { openWhatsApp, openLeadDrawer } = useModal();

  const activeUnit = residenceUnits.find((u) => u.id === selectedUnitId) || residenceUnits[0];
  const activeRoom = activeUnit.rooms[activeRoomIndex] || activeUnit.rooms[0];

  return (
    <section id="unit-explorer" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              Apartment & Suite Configurations
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              1BHK &amp; 2BHK — <span className="italic font-serif text-[#C58F58]">Compact, Considered, Complete.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              G+2 apartment buildings with stilt parking, two lifts, and gradual stairs (10&quot; tread, 6&quot; rise). Single-floor living inside each home — built for the body, not the brochure.
            </p>
          </div>

          {/* Unit Selection Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm">
            {residenceUnits.map((unit) => {
              const isSelected = unit.id === activeUnit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => {
                    setSelectedUnitId(unit.id);
                    setActiveRoomIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {unit.unitNumber} ({unit.superAreaSqFt} sq. ft.)
                </button>
              );
            })}
          </div>
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
                    {activeUnit.typeName}
                  </span>
                  <span className="text-xs text-[#53676E]">• {activeUnit.floorName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                  {activeUnit.unitNumber}
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
                  3D Proposed View
                </button>
                <button
                  onClick={() => setActiveTab('2d-blueprint')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === '2d-blueprint'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  2D Room Sizing
                </button>
                <button
                  onClick={() => setActiveTab('safety-specs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'safety-specs'
                      ? 'bg-[#2C5E50] text-white shadow-sm'
                      : 'text-[#53676E] hover:text-[#0D2329]'
                  }`}
                >
                  Senior-First Features
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
                  *Architectural 3D concept. Standard turnkey fittings designed by The Vision Architects.
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: 2D Blueprint Room Sizing */}
            {activeTab === '2d-blueprint' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-[#071519] min-h-[380px] sm:min-h-[440px] border border-[#294B57] p-6 flex flex-col justify-between text-white">
                  <Image
                    src={activeUnit.blueprint2d}
                    alt={`${activeUnit.unitNumber} Blueprint`}
                    fill
                    className="object-cover object-center opacity-30"
                  />
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono font-bold text-[#C58F58]">
                      ROOM-BY-ROOM DIMENSIONS // {activeUnit.unitNumber.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      ~{activeUnit.carpetAreaSqFt} Sqft Carpet | ~{activeUnit.superAreaSqFt} Sqft Built
                    </span>
                  </div>

                  <div className="relative z-10 bg-black/60 backdrop-blur-md p-5 rounded-xl border border-white/15 space-y-3 max-w-lg my-auto">
                    <h4 className="text-lg font-serif-heading font-bold text-white">
                      Exact Measured Dimensions:
                    </h4>
                    <div className="space-y-2 text-xs text-white/80">
                      {activeUnit.rooms.map((rm, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/10">
                          <span className="font-medium text-white">{rm.name}</span>
                          <span className="font-mono text-[#C58F58] font-bold">{rm.dimensions}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs text-white/60 pt-3 border-t border-white/10">
                    <span>Orientation: {activeUnit.facing}</span>
                    <button
                      onClick={() => openLeadDrawer({ title: `Request Scaled CAD Drawings for ${activeUnit.unitNumber}`, actionType: 'inquire-residence' })}
                      className="text-[#C58F58] hover:underline font-bold"
                    >
                      Download Scaled Architectural PDF →
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
                    Designed for the Body that Lives Here
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeUnit.seniorSafetyFeatures.map((feat, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-[#CDE0D7] text-xs text-[#0D2329] flex items-start gap-2.5 shadow-sm">
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
                  Configuration Summary
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
                  <span className="text-[#53676E]">Built-Up Area</span>
                  <strong className="text-sm font-bold text-[#0D2329]">~{activeUnit.superAreaSqFt} sq. ft.</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Carpet Usable Area</span>
                  <strong className="text-sm font-bold text-[#0D2329]">~{activeUnit.carpetAreaSqFt} sq. ft.</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[#53676E]">Building Structure</span>
                  <strong className="text-xs font-semibold text-[#2C5E50]">G+2 Floors + Stilt Parking</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#53676E]">Vertical Transit</span>
                  <strong className="text-xs font-semibold text-[#0D2329]">2 Lifts (5×6ft) + Gradual Stairs</strong>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-bold text-[#0D2329] tracking-wider block">
                  Home Highlights:
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
                  Enquire About {activeUnit.unitNumber} on WhatsApp →
                </button>

                <button
                  onClick={() =>
                    openLeadDrawer({
                      title: `Schedule Site & Sample Walkthrough for ${activeUnit.unitNumber}`,
                      unitName: activeUnit.unitNumber,
                      unitType: activeUnit.typeName,
                      actionType: 'book-site-visit'
                    })
                  }
                  className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center"
                >
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
