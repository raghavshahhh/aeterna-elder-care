'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { residenceUnits, buildingUnits, twoPlotOneBlockConfig } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { BuildingUnit, ResidenceUnit } from '@/types';
import { UnitDetailDrawer } from '@/components/property/UnitDetailDrawer';

const Interior3DViewer = dynamic(
  () => import('@/components/3d/Interior3DViewer').then((mod) => mod.Interior3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[580px] bg-[#071519] rounded-2xl flex flex-col items-center justify-center gap-3 border border-white/10 text-white">
        <div className="w-8 h-8 border-2 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-white/60">Loading 360° Senior Living Walkthrough...</span>
      </div>
    )
  }
);

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
  FileText,
  Car,
  BadgePercent,
  Compass,
  Lock,
  ChevronRight,
  Eye
} from 'lucide-react';

interface ResidenceUnitExplorerProps {
  initialUnitId?: string;
}

import { usePublicRealtime } from '@/hooks/usePublicRealtime';

export const ResidenceUnitExplorer: React.FC<ResidenceUnitExplorerProps> = ({
  initialUnitId = '1bhk-apt'
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);
  const [activeTab, setActiveTab] = useState<'3d-interior' | '2d-blueprint' | 'overview' | 'room-sizes' | 'senior-features'>('3d-interior');
  const [selectedUnitForDrawer, setSelectedUnitForDrawer] = useState<BuildingUnit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [liveInventory, setLiveInventory] = useState<any[]>([]);

  const { openWhatsApp, openLeadDrawer, openFloorPlan } = useModal();

  const loadLiveInventory = React.useCallback(async () => {
    try {
      const res = await fetch('/api/inventory');
      if (res.ok) {
        const data = await res.json();
        setLiveInventory(data.inventory || []);
      }
    } catch (err) {
      console.error('Failed to load live residence inventory:', err);
    }
  }, []);

  React.useEffect(() => {
    loadLiveInventory();
  }, [loadLiveInventory]);

  usePublicRealtime({
    eventTypes: ['INVENTORY_UPDATED', 'BOOKING_CREATED', 'BOOKING_EXPIRED', 'BOOKING_UPDATED'],
    onRefresh: loadLiveInventory
  });

  const activeUnit = residenceUnits.find((u) => u.id === selectedUnitId) || residenceUnits[0];

  // Ground Floor Active Units from buildingUnits merged with live DB status
  const groundUnits = React.useMemo(() => {
    const baseGround = buildingUnits.filter((u) => u.floorLevel === 'ground');
    if (liveInventory.length === 0) return baseGround;
    return baseGround.map((u) => {
      const dbMatch = liveInventory.find(
        (inv) =>
          inv.unitCode?.toUpperCase() === u.unitNumber?.toUpperCase() ||
          inv.id?.toLowerCase() === u.id?.toLowerCase()
      );
      if (dbMatch) {
        return {
          ...u,
          status: (dbMatch.status === 'AVAILABLE' ? 'AVAILABLE' : dbMatch.status === 'HOLD' ? 'HOLD' : 'SOLD') as any
        };
      }
      return u;
    });
  }, [liveInventory]);

  const handleOpenDrawer = (unit: BuildingUnit) => {
    setSelectedUnitForDrawer(unit);
    setIsDrawerOpen(true);
  };

  const handleOpenCADModal = () => {
    openFloorPlan({
      floorPlanType: 'residences',
      unitName: activeUnit.unitNumber,
      unitType: activeUnit.typeName,
      title: 'Typical Floor Plan (Plots 63 & 64) — 1 BHK & 1 RK Senior Residences'
    });
  };

  return (
    <section id="unit-explorer" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5 text-[#C58F58]" />
              08 &amp; 09 • Senior Residences &amp; Architectural Blueprints
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              1 RK &amp; 1 BHK — <span className="italic font-serif text-[#C58F58]">Compact, Considered, Complete.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              Drawn by <strong>The Vision Architects (Ar. Yash Garg)</strong> for senior comfort on Plots 63 &amp; 64. Ground floor units available for Phase 1 allotment with dual lifts, gradual 6&quot; risers, and covered stilt parking.
            </p>
          </div>

          {/* Quick CTA to Full CAD Blueprint */}
          <button
            onClick={handleOpenCADModal}
            className="px-5 py-3 rounded-2xl bg-[#0D2329] hover:bg-[#163942] text-[#E0AB77] border border-[#C58F58]/40 text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#C58F58]" />
            <span>Open CAD Master Floor Plan →</span>
          </button>
        </div>

        {/* 3 Active Ground Floor Residence Cards Grid (Phase 1 Allotment) */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {groundUnits.map((u) => {
            const is1BHK = u.type === '1-bhk';
            return (
              <div
                key={u.id}
                className="bg-white rounded-3xl border border-[#E8E2D8] p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 relative group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Facing */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Phase 1 Allotment
                    </span>
                    <span className="text-xs font-semibold text-[#53676E] flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
                      {u.facing.split('/')[0]}
                    </span>
                  </div>

                  {/* Unit Title & Floor */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C58F58] font-mono">
                      {u.typeName}
                    </span>
                    <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                      {u.unitNumber}
                    </h3>
                    <div className="text-xs text-[#53676E] mt-0.5">
                      Ground Floor • Plots 63 &amp; 64
                    </div>
                  </div>

                  {/* Area Specification Pills */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs">
                    <div>
                      <span className="text-[10px] text-[#53676E] uppercase font-mono block">Built-Up Area</span>
                      <strong className="text-sm font-bold text-[#0D2329]">~{u.superAreaSqFt} sq. ft.</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#53676E] uppercase font-mono block">Carpet Area</span>
                      <strong className="text-sm font-bold text-[#2C5E50]">~{u.carpetAreaSqFt} sq. ft.</strong>
                    </div>
                  </div>

                  {/* Senior-First Inclusions */}
                  <div className="space-y-1.5 text-xs text-[#0D2329]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Zero-threshold bathroom &amp; anti-skid vitrified floors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Dual stretcher-sized elevators &amp; 6&quot; riser stairs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Stilt Covered Parking: ₹3 Lakhs (Uncovered: Free)</span>
                    </div>
                  </div>

                  {/* Pricing & Rental Return */}
                  <div className="p-3.5 rounded-2xl bg-[#0D2329] text-white border border-[#C58F58]/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77]">
                        Down Payment Plan
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {is1BHK ? '₹25 Lakhs' : 'Price on Request'}
                      </span>
                    </div>
                    <div className="text-[11px] text-white/80 leading-snug">
                      {is1BHK ? (
                        <>
                          <strong className="text-emerald-400">₹25,000/mo</strong> till possession • <strong className="text-emerald-400">₹12,500/mo</strong> post-possession
                        </>
                      ) : (
                        '50:50 Flexi with ₹6,250/mo pre-possession rental return'
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenDrawer(u)}
                      className="py-2.5 px-3 rounded-xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Unit Details</span>
                    </button>

                    <button
                      onClick={handleOpenCADModal}
                      className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EBE1] text-[#0D2329] border border-[#E8E2D8] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
                      <span>CAD Blueprint</span>
                    </button>
                  </div>

                  <Link
                    href={`/book/${encodeURIComponent(u.unitNumber)}`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C58F58] to-[#A06C3B] hover:brightness-110 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 text-center"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Reserve {u.unitNumber} (24h Hold) →</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Interactive 3D Walkthrough & CAD Visualizer */}
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
                  2D CAD Layout
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs">
                  <span className="text-[#53676E]">
                    Ar. Yash Garg • The Vision Architects · Plots 63 &amp; 64
                  </span>
                  <button
                    onClick={handleOpenCADModal}
                    className="font-bold text-[#2C5E50] hover:text-[#C58F58] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Launch Fullscreen CAD Viewer →
                  </button>
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
                  Active Configuration
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
                  className="w-full py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-sm font-semibold transition-all shadow-lg shadow-[#2C5E50]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp (+91 99999 55847) →</span>
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
                  className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>Book Site Visit to Kheri Asra</span>
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

      {/* Embedded Unit Detail Drawer */}
      <UnitDetailDrawer
        unit={selectedUnitForDrawer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
};
