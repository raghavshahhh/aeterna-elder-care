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
            9-Unit Senior Residence Building
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Choose Your <span className="italic font-serif text-[#C58F58]">Senior Residence.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed">
            G+2 residential building with stilt parking and two lifts. Units 01, 02, and 03 on the Ground Floor are currently open for Phase 1 booking.
          </p>
        </div>

        {/* 4-Tier Building Elevation Matrix */}
        <div className="max-w-4xl mx-auto mb-12 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
          {/* Second Floor */}
          <div
            onClick={() => handleFloorSelect('second')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
              selectedFloor === 'second'
                ? 'bg-[#2C5E50]/40 border-[#C58F58] ring-1 ring-[#C58F58]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs font-mono">
                2F
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Second Floor (Units 07, 08, 09)</h4>
                <p className="text-xs text-white/60">Top-floor sky suites with open horizon views</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-mono">
                Phase 3 Release
              </span>
            </div>
          </div>

          {/* First Floor */}
          <div
            onClick={() => handleFloorSelect('first')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
              selectedFloor === 'first'
                ? 'bg-[#2C5E50]/40 border-[#C58F58] ring-1 ring-[#C58F58]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs font-mono">
                1F
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">First Floor (Units 04, 05, 06)</h4>
                <p className="text-xs text-white/60">Elevated residences overlooking tree canopy</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-mono">
                Phase 2 Release
              </span>
            </div>
          </div>

          {/* Ground Floor (ACTIVE LAUNCH) */}
          <div
            onClick={() => handleFloorSelect('ground')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
              selectedFloor === 'ground'
                ? 'bg-[#2C5E50] border-emerald-400 shadow-xl ring-2 ring-emerald-400/40'
                : 'bg-emerald-950/40 border-emerald-500/40 hover:bg-emerald-900/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xs font-mono text-white">
                GF
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Ground Floor (Units 01, 02, 03)</h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-950" />
                    CURRENT RELEASE
                  </span>
                </div>
                <p className="text-xs text-white/80 mt-0.5">Barrier-free ground access straight from garden walkway</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <span>View 3 Units →</span>
            </div>
          </div>

          {/* Stilt Level */}
          <div
            onClick={() => handleFloorSelect('stilt')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
              selectedFloor === 'stilt'
                ? 'bg-[#2C5E50]/40 border-[#C58F58] ring-1 ring-[#C58F58]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs font-mono">
                ST
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Stilt Parking &amp; Dual Elevators Level</h4>
                <p className="text-xs text-white/60">10+ Covered car parks, 3 security entry gates, 2 wheelchair lifts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-mono">
                Included with Units
              </span>
            </div>
          </div>
        </div>

        {/* Units Grid for Selected Floor */}
        {selectedFloor !== 'stilt' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {currentUnits.map((unit) => {
              const isAvail = unit.status === 'available';
              return (
                <div
                  key={unit.id}
                  onClick={() => handleUnitClick(unit)}
                  className={`rounded-3xl border p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isAvail
                      ? 'bg-white/10 hover:bg-white/15 border-emerald-500/50 hover:border-emerald-400 hover:scale-[1.02] shadow-xl'
                      : 'bg-white/5 border-white/10 opacity-75'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-[#C58F58] font-bold">
                        {unit.typeName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isAvail ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {isAvail ? 'Available' : 'Future Phase'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif-heading font-bold text-white group-hover:text-[#C58F58] transition-colors">
                        {unit.unitNumber}
                      </h3>
                      <p className="text-xs text-white/60 mt-1">
                        ~{unit.superAreaSqFt} sq. ft. Built (~{unit.carpetAreaSqFt} sq. ft. Carpet)
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-[10px] text-white/60 uppercase font-mono">Pre-Launch Price</div>
                      <div className="text-lg font-bold text-white font-serif-heading">
                        {unit.priceDisplay}
                      </div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Includes Stilt Parking &amp; Lift Access
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-white/70">
                      <div className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
                        <span>Facing: {unit.facing}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Zero-threshold senior bath &amp; grab bars</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#C58F58] group-hover:translate-x-1 transition-transform">
                    <span>Inspect Unit Layout</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-4">
            <Car className="w-10 h-10 text-[#C58F58] mx-auto" />
            <h3 className="text-xl font-serif-heading font-bold text-white">
              Stilt Car Parking &amp; Dual Elevator Lobby
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
              10+ Dedicated covered car parking bays with 3 separate vehicle ingress/egress gates, 2 wheelchair-accessible elevators connecting directly to all residential floors.
            </p>
          </div>
        )}
      </div>

      {/* Unit Detail Drawer */}
      <UnitDetailDrawer
        unit={selectedUnitForDrawer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
};
