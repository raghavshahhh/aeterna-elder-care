'use client';

import React, { useState } from 'react';
import { propertyFloors, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { FloorId, ResidenceUnit } from '@/types';
import {
  Building2,
  Activity,
  Heart,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Stethoscope,
  Maximize2
} from 'lucide-react';

interface MasterPlanExplorerProps {
  selectedFloorId?: FloorId;
  onSelectUnit?: (unit: ResidenceUnit) => void;
}

export const MasterPlanExplorer: React.FC<MasterPlanExplorerProps> = ({
  selectedFloorId = 'ground',
  onSelectUnit
}) => {
  const [activeFloor, setActiveFloor] = useState<FloorId>(selectedFloorId);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const currentFloor = propertyFloors.find((f) => f.id === activeFloor) || propertyFloors[0];

  return (
    <section id="master-plan" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              G+2 Hospital Architectural CAD Blueprints
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              Hospital Master Plan <span className="italic font-serif text-[#C58F58]">(117&apos;-10&quot; × 138&apos;)</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              Designed by <em>The Vision Architects</em>. Explore the exact room-by-room CAD specifications, critical care units, doctor OPDs, and authentic Panchakarma suites across all 3 floors.
            </p>
          </div>

          {/* Floor Switcher Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm">
            {propertyFloors.map((floor) => {
              const isActive = activeFloor === floor.id;
              return (
                <button
                  key={floor.id}
                  onClick={() => setActiveFloor(floor.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#2C5E50] text-white shadow-md'
                      : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span>{floor.level === 1 ? 'Floor 1: ICU & Diagnostics' : floor.level === 2 ? 'Floor 2: OPD & Ayurveda' : 'Floor 3: Pool & Rooftop Deck'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Plan Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Blueprint Visual Card */}
          <div className="lg:col-span-8 bg-[#101D22] text-white rounded-3xl p-6 sm:p-8 border border-[#1E3740] shadow-xl relative overflow-hidden">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#C58F58 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 relative z-10">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C58F58] tracking-widest block font-mono">
                  APPROVED ARCHITECTURAL CAD PLAN // THE VISION ARCHITECTS
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-white mt-0.5">
                  {currentFloor.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 font-mono text-xs">
                Footprint: 117&apos;-10&quot; × 138&apos; L-Shape
              </span>
            </div>

            {/* Room Breakdown Grid */}
            <div className="my-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Wing */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Wing A — Specialized Rooms
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">10&apos;-0&quot; Corridors</span>
                </div>

                <div className="space-y-2">
                  {currentFloor.zones
                    .slice(0, Math.ceil(currentFloor.zones.length / 2))
                    .map((zone, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-400/40 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-white">
                          <span>{zone.name}</span>
                          {zone.badge && (
                            <span className="text-[10px] text-[#C58F58] font-mono px-2 py-0.5 rounded bg-white/10">
                              {zone.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/65 mt-1 leading-snug">
                          {zone.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Secondary Wing */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> Wing B — Care &amp; Community
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">NABH Standards</span>
                </div>

                <div className="space-y-2">
                  {currentFloor.zones
                    .slice(Math.ceil(currentFloor.zones.length / 2))
                    .map((zone, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#C58F58]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-white">
                          <span>{zone.name}</span>
                          {zone.badge && (
                            <span className="text-[10px] text-[#C58F58] font-mono px-2 py-0.5 rounded bg-white/10">
                              {zone.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/65 mt-1 leading-snug">
                          {zone.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Footer Specifications Callout */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Equipped with 2 Lifts (7&apos;0&quot;×9&apos;4&quot;) and 7&apos;4&quot; wide gradual stairs on every floor</span>
              </div>
              <button
                onClick={() => openLeadDrawer({ title: `Request CAD Floor Plans for ${currentFloor.name.split('—')[0]}`, actionType: 'inquire-residence' })}
                className="text-[#C58F58] hover:text-white font-bold flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                Request Scaled CAD PDF →
              </button>
            </div>
          </div>

          {/* Side Context & Priority Action Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
                  Level Overview
                </span>
                <span className="text-xs text-[#53676E]">{currentFloor.totalAreaSqFt.toLocaleString()} sq. ft.</span>
              </div>

              <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                {currentFloor.name.split('—')[0]}
              </h4>
              <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                {currentFloor.description}
              </p>

              {/* On-Site Benefit Banner */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-[#2C5E50] tracking-wider block">
                  Integrated Care for Residents
                </span>
                <p className="text-xs text-[#53676E] leading-relaxed">
                  Residents of the 64 plots and senior apartments have direct on-foot access to this 30,000 sq. ft. hospital without having to step outside the township gates.
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => openWhatsApp({ actionType: 'general', message: `I want to understand the facilities on ${currentFloor.name.split('—')[0]} of the Ayurvedic Hospital...` })}
                  className="w-full py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#2C5E50]/20 flex items-center justify-center gap-2"
                >
                  Ask Architect / Advisor on WhatsApp →
                </button>

                <button
                  onClick={() => openLeadDrawer({ title: 'Schedule Site & Blueprint Walkthrough', actionType: 'book-site-visit' })}
                  className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center"
                >
                  Book Site Walkthrough at Kheri Asra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
