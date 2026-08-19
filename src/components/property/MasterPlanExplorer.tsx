'use client';

import React, { useState } from 'react';
import { propertyFloors, residenceUnits } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { FloorId, ResidenceUnit } from '@/types';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Maximize2,
  Compass,
  FileText,
  Activity,
  Heart
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
  const floorUnits = residenceUnits.filter((u) => u.floor === activeFloor);

  const handleUnitClick = (unit: ResidenceUnit) => {
    if (onSelectUnit) {
      onSelectUnit(unit);
    }
    const unitExplorerEl = document.getElementById('unit-explorer');
    if (unitExplorerEl) {
      unitExplorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="master-plan" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Interactive Master Plan & Zoning
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              Explore the <span className="italic font-serif text-[#C58F58]">Architectural Layout.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              Select any floor level to inspect the architectural CAD blueprints, clinical buffer zones, and private residence locations.
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
                  <span>{floor.level === 0 ? 'Ground Floor' : floor.level === 3 ? 'Rooftop Sky Deck' : `Level ${floor.level}`}</span>
                  {floor.id === 'ground' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Plan Interactive Layout View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Architectural Blueprint Visual Card */}
          <div className="lg:col-span-8 bg-[#142126] text-white rounded-3xl p-6 sm:p-8 border border-[#294B57] shadow-xl relative overflow-hidden">
            {/* Blueprint Grid Watermark */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#C58F58 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Header info inside blueprint */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 relative z-10">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C58F58] tracking-widest block">
                  CAD ARCHITECTURAL BLUEPRINT
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-white mt-0.5">
                  {currentFloor.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 font-mono">
                  Scale 1:100 • {currentFloor.totalAreaSqFt.toLocaleString()} Sq. Ft.
                </span>
              </div>
            </div>

            {/* Schematic CAD Representation of Floor Zones */}
            <div className="my-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Wing / Clinical & Infrastructure */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Wing A — Support & Care
                  </span>
                  <span className="text-[10px] text-white/50">Ground / Triage Area</span>
                </div>

                <div className="space-y-2">
                  {currentFloor.zones
                    .filter((z) => z.category !== 'residential')
                    .map((zone, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-400/40 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-white">
                          <span>{zone.name}</span>
                          {zone.badge && (
                            <span className="text-[10px] text-white/60 font-mono px-1.5 py-0.5 rounded bg-white/10">
                              {zone.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/60 mt-1 leading-snug">
                          {zone.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Wing / Residential Suites Allocation */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> Wing B — Private Suites
                  </span>
                  <span className="text-[10px] text-white/50">
                    {floorUnits.length > 0 ? `${floorUnits.length} Suites on this Level` : 'Recreation Level'}
                  </span>
                </div>

                {floorUnits.length > 0 ? (
                  <div className="space-y-2.5">
                    {floorUnits.map((unit) => {
                      const isAvailable = unit.status === 'available';
                      return (
                        <div
                          key={unit.id}
                          onClick={() => handleUnitClick(unit)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isAvailable
                              ? 'bg-emerald-950/40 border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-900/40 shadow-sm'
                              : 'bg-white/5 border-white/10 opacity-75 hover:opacity-100 hover:border-[#C58F58]/50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white font-serif-heading">
                                {unit.unitNumber}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  isAvailable
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {isAvailable ? '🟢 Available' : '🟡 Phase 2'}
                              </span>
                            </div>
                            <span className="text-xs text-white/70 block mt-0.5">
                              {unit.typeName} • {unit.superAreaSqFt} sq. ft. ({unit.facing})
                            </span>
                          </div>

                          <div className="shrink-0 flex items-center gap-1 text-xs text-[#C58F58] font-semibold">
                            <span>Inspect</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center space-y-2 text-white/70">
                    <Sparkles className="w-8 h-8 text-[#C58F58] mx-auto opacity-70" />
                    <h4 className="text-sm font-bold text-white">Full Panoramic Rooftop Level</h4>
                    <p className="text-xs text-white/60">
                      This level is entirely dedicated to community wellness, hydrotherapy pool, and open amphitheater.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Blueprint Callout */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Threshold Barrier-Free Flooring Standard Across All Zones</span>
              </div>
              <button
                onClick={() => openLeadDrawer({ title: 'Request Full High-Res Blueprint Set', actionType: 'inquire-residence' })}
                className="text-[#C58F58] hover:text-white font-semibold flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                Download Architectural Dossier (PDF)
              </button>
            </div>
          </div>

          {/* Side Context & Priority Action Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
                  Level Breakdown
                </span>
                <span className="text-xs text-[#53676E]">9 Suites Planned</span>
              </div>

              <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                {currentFloor.name.split('—')[0]}
              </h4>
              <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                {currentFloor.description}
              </p>

              {/* Status Note */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E2D7C5] space-y-2">
                <span className="text-[11px] font-bold uppercase text-[#A8733E] tracking-wider block">
                  Inventory Release Note
                </span>
                <p className="text-xs text-[#14353E] leading-relaxed">
                  {activeFloor === 'ground'
                    ? 'Ground Floor Suites (01, 02, 03) are currently in active pre-launch allocation with early-bird pricing privileges.'
                    : 'Suites on this floor are reserved for Phase 2 release. You can register your advance priority interest to get notified before general launch.'}
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                {activeFloor === 'ground' ? (
                  <button
                    onClick={() => openWhatsApp({ actionType: 'reserve-unit', unitName: 'Residence 01 (Ground Floor)' })}
                    className="w-full py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#2C5E50]/20 flex items-center justify-center gap-2"
                  >
                    Reserve Ground Floor Suite (01–03) →
                  </button>
                ) : (
                  <button
                    onClick={() => openLeadDrawer({ title: `Register Interest for ${currentFloor.name.split('—')[0]}`, actionType: 'inquire-residence' })}
                    className="w-full py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#2C5E50] text-[#2C5E50] hover:bg-[#2C5E50] hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    Register Priority Interest (Phase 2) →
                  </button>
                )}

                <button
                  onClick={() => openLeadDrawer({ title: 'Schedule Blueprint Walkthrough with Architect', actionType: 'book-site-visit' })}
                  className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center"
                >
                  Request Blueprint Consultation with Architect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
