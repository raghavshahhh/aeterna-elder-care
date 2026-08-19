'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { buildingUnits, projectOverview } from '@/data/propertyData';
import { BuildingUnit, FloorLevel } from '@/types';
import { UnitDetailDrawer } from '@/components/property/UnitDetailDrawer';
import { useModal } from '@/context/ModalContext';
import {
  Building2,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowRight,
  Car,
  Home,
  MessageSquare
} from 'lucide-react';

interface BuildingCGIViewerProps {
  onSelectFloor?: (floorId: FloorLevel) => void;
}

export const BuildingCGIViewer: React.FC<BuildingCGIViewerProps> = ({ onSelectFloor }) => {
  const [selectedFloor, setSelectedFloor] = useState<FloorLevel>('ground');
  const [selectedUnitForDrawer, setSelectedUnitForDrawer] = useState<BuildingUnit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { openWhatsApp } = useModal();

  const handleFloorSelect = (floor: FloorLevel) => {
    setSelectedFloor(floor);
    if (onSelectFloor) {
      onSelectFloor(floor);
    }
  };

  const handleUnitClick = (unit: BuildingUnit) => {
    setSelectedUnitForDrawer(unit);
    setIsDrawerOpen(true);
  };

  // Filter units by currently selected floor
  const currentUnits = buildingUnits.filter((u) => u.floorLevel === selectedFloor);

  return (
    <section id="building-vision" className="py-20 sm:py-28 bg-[#0B1A1E] text-white relative overflow-hidden">
      {/* Subtle Glow Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2C5E50]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#C58F58] font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            Interactive Building Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            See What We&apos;re <span className="italic font-serif text-[#C58F58]">Building.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed">
            Explore the 4-level senior residential building. Select a floor below to inspect the 9 residences, stilt car parking, dual elevators, and proposed layouts.
          </p>
        </div>

        {/* 4-Tier Floor Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => handleFloorSelect('second')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedFloor === 'second'
                  ? 'bg-[#2C5E50] text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Second Floor (07–09)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80">Coming Soon</span>
            </button>

            <button
              onClick={() => handleFloorSelect('first')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedFloor === 'first'
                  ? 'bg-[#2C5E50] text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>First Floor (04–06)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80">Coming Soon</span>
            </button>

            <button
              onClick={() => handleFloorSelect('ground')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedFloor === 'ground'
                  ? 'bg-[#2C5E50] text-white shadow-lg ring-2 ring-emerald-400/40'
                  : 'text-emerald-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ground Floor (01–03)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">🟢 Available</span>
            </button>

            <button
              onClick={() => handleFloorSelect('stilt')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedFloor === 'stilt'
                  ? 'bg-[#2C5E50] text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Stilt Parking Level</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Elevation + Floor Plan Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Proposed Architectural 3D Render Display */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-white/15 bg-[#071519] shadow-2xl min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-8 group">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
              alt="Proposed G+2 Senior Residences Architectural 3D Render"
              fill
              className="object-cover object-center opacity-80 group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071519] via-transparent to-[#071519]/50" />

            {/* Top Label */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[11px] text-[#C58F58] font-mono">
                <Sparkles className="w-3 h-3 text-[#C58F58]" />
                <span>Proposed Design • Artist Impression</span>
              </div>
              <span className="text-xs font-mono text-white/70 bg-black/50 px-2.5 py-1 rounded">
                Structure: G+2 + Stilt
              </span>
            </div>

            {/* Bottom Visual Highlights */}
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono block">
                {selectedFloor === 'ground' ? 'CURRENT FOCUS // GROUND FLOOR' : selectedFloor === 'first' ? 'UPCOMING // FIRST FLOOR' : selectedFloor === 'second' ? 'UPCOMING // SECOND FLOOR' : 'GROUND INFRASTRUCTURE // STILT PARKING'}
              </span>
              <h3 className="text-2xl font-serif-heading font-bold text-white">
                {selectedFloor === 'ground' ? 'Ground Level Residences (01, 02, 03)' : selectedFloor === 'first' ? 'First Floor Residences (04, 05, 06)' : selectedFloor === 'second' ? 'Second Floor Sky Suites (07, 08, 09)' : 'Stilt Parking & Dual Lifts'}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {selectedFloor === 'ground'
                  ? 'Zero-step barrier-free access. Direct pedestrian connection to the on-site hospital and Mandir.'
                  : selectedFloor === 'first'
                  ? 'Elevated quiet suites with dual lift access and open countryside views.'
                  : selectedFloor === 'second'
                  ? 'Top-tier floor with direct access to rooftop recreation, pool, and open amphitheater.'
                  : 'Open, ventilated ground level with 10+ covered car parks, dual elevator lobbies, and gradual stairs.'}
              </p>
            </div>
          </div>

          {/* Right: Floor Units & Interactive Unit Selector */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {selectedFloor === 'stilt' ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] flex items-center gap-1.5">
                      <Car className="w-4 h-4" /> Stilt Infrastructure
                    </span>
                    <span className="text-xs text-white/60 font-mono">10+ Covered Bays</span>
                  </div>

                  <h4 className="text-2xl font-serif-heading font-bold text-white">
                    Breathing Room Below
                  </h4>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    The ground level is open, shaded, and ventilated. Three entry gates allow smooth vehicular entry while leaving walking paths 100% pedestrian-safe.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Two 5×6ft Lifts
                      </div>
                      <p className="text-[11px] text-white/60 mt-1">Accommodates wheelchairs, walkers, and attendants comfortably.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gradual Senior Stairs
                      </div>
                      <p className="text-[11px] text-white/60 mt-1">10" tread, 6" rise for easy, knee-safe climbing.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/60">Ready to explore residences?</span>
                  <button
                    onClick={() => handleFloorSelect('ground')}
                    className="text-[#C58F58] font-bold hover:underline flex items-center gap-1"
                  >
                    View Ground Floor (01–03) →
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      {selectedFloor === 'ground' ? 'Ground Floor (Phase 1 Release)' : `${selectedFloor.charAt(0).toUpperCase() + selectedFloor.slice(1)} Floor (Future Release)`}
                    </span>
                    <span className="text-xs text-white/60 font-mono">3 Units on Floor</span>
                  </div>

                  <p className="text-xs text-white/70">
                    Click any residence below to inspect measured room dimensions, 2D floor plans, and proposed 3D interior renderings.
                  </p>

                  {/* 3 Unit Cards */}
                  <div className="space-y-3">
                    {currentUnits.map((unit) => {
                      const isAvail = unit.status === 'available';
                      return (
                        <div
                          key={unit.id}
                          onClick={() => handleUnitClick(unit)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                            isAvail
                              ? 'bg-white/10 hover:bg-white/15 border-emerald-500/40 hover:border-emerald-400 shadow-md'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#C58F58]/40'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-serif-heading text-sm ${
                                isAvail ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/70'
                              }`}
                            >
                              {unit.code}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-white text-sm group-hover:text-[#C58F58] transition-colors">
                                  {unit.unitNumber}
                                </h5>
                                <span
                                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                    isAvail
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  }`}
                                >
                                  {isAvail ? '🟢 Available' : '⏳ Coming Soon'}
                                </span>
                              </div>
                              <div className="text-[11px] text-white/60 mt-0.5">
                                {unit.typeName} • ~{unit.superAreaSqFt} sq. ft. • {unit.facing}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs text-[#C58F58] group-hover:text-white font-semibold flex items-center gap-1">
                              View Specs <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Helper */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <span>💡 <em>Units 01–03 currently open for booking. Units 04–09 are future release.</em></span>
                  <button
                    onClick={() => openWhatsApp({ actionType: 'general', message: 'Please share the complete 9-unit residential building brochure...' })}
                    className="text-[#C58F58] font-bold hover:underline"
                  >
                    Request Brochure (PDF) →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unit Detail Modal / Drawer */}
      <UnitDetailDrawer
        unit={selectedUnitForDrawer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
};
