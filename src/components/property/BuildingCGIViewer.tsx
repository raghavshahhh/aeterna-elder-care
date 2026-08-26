'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { buildingUnits, projectOverview } from '@/data/propertyData';
import { BuildingUnit, FloorLevel } from '@/types';
import { UnitDetailDrawer } from '@/components/property/UnitDetailDrawer';

const Building3DViewer = dynamic(
  () => import('@/components/3d/Building3DViewer').then((mod) => mod.Building3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[580px] bg-[#071519] rounded-2xl flex flex-col items-center justify-center gap-3 border border-white/10 text-white">
        <div className="w-8 h-8 border-2 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-white/60">Rendering G+2 Residence Elevation 3D Model...</span>
      </div>
    )
  }
);

import { Cad3DToggle } from '@/components/ui/Cad3DToggle';
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
  Lock,
  MessageSquare,
  Eye,
  Rotate3d,
  Box
} from 'lucide-react';

interface BuildingCGIViewerProps {
  onSelectFloor?: (floorId: FloorLevel) => void;
}

export const BuildingCGIViewer: React.FC<BuildingCGIViewerProps> = ({ onSelectFloor }) => {
  const [selectedFloor, setSelectedFloor] = useState<FloorLevel>('ground');
  const [selectedUnitForDrawer, setSelectedUnitForDrawer] = useState<BuildingUnit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  const { openWhatsApp } = useModal();

  const handleFloorSelect = (floor: FloorLevel) => {
    setSelectedFloor(floor);
    if (onSelectFloor) {
      onSelectFloor(floor);
    }
  };

  const handleUnitClick = (unit: BuildingUnit) => {
    if (unit.status === 'available') {
      setSelectedUnitForDrawer(unit);
      setIsDrawerOpen(true);
    } else {
      openWhatsApp({
        actionType: 'reserve-unit',
        unitName: unit.unitNumber,
        unitType: unit.typeName,
        floorLevel: unit.floorName,
        message: `Hello, I want to join the Priority Waitlist for ${unit.unitNumber} (${unit.typeName} on ${unit.floorName}) in Senior Living Citizens Foundation...`
      });
    }
  };

  // Filter units by currently selected floor
  const currentUnits = buildingUnits.filter((u) => u.floorLevel === selectedFloor);

  return (
    <section id="building-vision" className="py-20 sm:py-28 bg-[#0B1A1E] text-white relative overflow-hidden">
      {/* Subtle Glow Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2C5E50]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 06: Proposed Building Visual & Architecture Overview */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#C58F58] font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            06 &amp; 07 • 9-Unit Senior Residence Building
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            4-Tier Building Explorer: <span className="italic font-serif text-[#C58F58]">Stilt + G+2 Elevation.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed">
            Architecturally engineered by <strong>The Vision Architects</strong> with zero-barrier internal floors, gradual 6&quot; risers, dual lifts, and covered stilt parking. Ground floor units are currently available for Phase 1 allotment.
          </p>

          {/* 3D vs 2D Toggle Switch */}
          <div className="pt-2 flex items-center justify-center">
            <Cad3DToggle
              viewMode={viewMode}
              onToggle={(mode) => setViewMode(mode)}
              label3D="Interactive 3D Orbit"
              label2D="2D Elevation Matrix"
            />
          </div>
        </div>

        {/* Render 3D Building Viewer when in 3D mode */}
        {viewMode === '3d' ? (
          <div className="mb-12">
            <Building3DViewer
              initialFloor={selectedFloor}
              onSelectUnit={(unitId) => {
                const u = buildingUnits.find((item) => item.id === unitId);
                if (u) handleUnitClick(u);
              }}
              onToggle2DFallback={() => setViewMode('2d')}
            />
          </div>
        ) : (
          <>
          {/* 2D 4-Tier Interactive Elevation Matrix */}
          <div className="max-w-4xl mx-auto mb-12 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
          {/* Second Floor (Phase 3 - Locked) */}
          <div
            onClick={() => handleFloorSelect('second')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
              selectedFloor === 'second'
                ? 'bg-[#2C5E50]/50 border-[#C58F58] ring-1 ring-[#C58F58]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs font-mono">
                2F
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">Second Floor (Units 07, 08, 09)</h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C58F58]/20 text-[#C58F58] border border-[#C58F58]/40 font-mono flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Phase 3 • Waitlist
                  </span>
                </div>
                <p className="text-xs text-white/60">Top-floor sky suites with open horizon views</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <span>Waitlist Only →</span>
            </div>
          </div>

          {/* First Floor (Phase 2 - Locked) */}
          <div
            onClick={() => handleFloorSelect('first')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
              selectedFloor === 'first'
                ? 'bg-[#2C5E50]/50 border-[#C58F58] ring-1 ring-[#C58F58]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs font-mono">
                1F
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">First Floor (Units 04, 05, 06)</h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C58F58]/20 text-[#C58F58] border border-[#C58F58]/40 font-mono flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Phase 2 • Waitlist
                  </span>
                </div>
                <p className="text-xs text-white/60">Elevated residences overlooking tree canopy</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <span>Waitlist Only →</span>
            </div>
          </div>

          {/* Ground Floor (ACTIVE LAUNCH - Units 01, 02, 03 Available) */}
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
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">Ground Floor (Units 01, 02, 03)</h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2C5E50] text-emerald-300 border border-emerald-500/40 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Phase 1 • Priority Release
                  </span>
                </div>
                <p className="text-xs text-white/80 mt-0.5">Barrier-free ground access straight from garden walkway</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <span>Explore 3 Available Units →</span>
            </div>
          </div>

          {/* Stilt Level */}
          <div
            onClick={() => handleFloorSelect('stilt')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
              selectedFloor === 'stilt'
                ? 'bg-[#2C5E50]/50 border-[#C58F58] ring-1 ring-[#C58F58]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs font-mono">
                ST
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Stilt Parking &amp; Dual Elevators Level</h4>
                <p className="text-xs text-white/60">14 Covered car bays, 3 vehicle gates, 2 wheelchair lifts</p>
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
                      : 'bg-white/5 border-white/10 opacity-75 hover:opacity-100 hover:border-amber-400/40'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-[#C58F58] font-bold">
                        {unit.typeName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isAvail ? 'bg-emerald-500 text-white' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {!isAvail && <Lock className="w-2.5 h-2.5" />}
                        {isAvail ? 'Available' : 'Waitlist Only'}
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
                      <div className="text-[10px] text-white/60 uppercase font-mono">
                        {isAvail ? 'Pre-Launch Price' : 'Release Status'}
                      </div>
                      <div className="text-lg font-bold text-white font-serif-heading">
                        {isAvail ? unit.priceDisplay : 'Future Release Phase'}
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
                    <span>{isAvail ? 'Inspect Unit Layout & Blueprints' : 'Join Phase Priority Waitlist'}</span>
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
              14 Dedicated covered car parking bays with 3 separate vehicle ingress/egress gates, 2 wheelchair-accessible elevators connecting directly to all residential floors.
            </p>
          </div>
        )}
        </>
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

