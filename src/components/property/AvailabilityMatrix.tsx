'use client';

import React, { useState } from 'react';
import { allPlots, plotsSummary, buildingUnits, projectOverview } from '@/data/propertyData';
import { PlotItem, BuildingUnit } from '@/types';
import { PlotDetailDrawer } from '@/components/property/PlotDetailDrawer';
import { UnitDetailDrawer } from '@/components/property/UnitDetailDrawer';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import {
  Layers,
  Home,
  Building2,
  Sparkles,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  Calendar,
  Compass,
  Trees,
  Maximize2,
  ArrowRight
} from 'lucide-react';

export const AvailabilityMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'plots' | 'apartments' | 'hospital-rooms'>('plots');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Drawer States
  const [selectedPlot, setSelectedPlot] = useState<PlotItem | null>(null);
  const [isPlotDrawerOpen, setIsPlotDrawerOpen] = useState(false);

  const [selectedUnit, setSelectedUnit] = useState<BuildingUnit | null>(null);
  const [isUnitDrawerOpen, setIsUnitDrawerOpen] = useState(false);

  const { openWhatsApp, openLeadDrawer } = useModal();

  // Filtered plots
  const filteredPlots = allPlots.filter((p) => {
    if (selectedBlock !== 'all' && p.block !== selectedBlock) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    return true;
  });

  const handlePlotClick = (plot: PlotItem) => {
    setSelectedPlot(plot);
    setIsPlotDrawerOpen(true);
  };

  const handleUnitClick = (unit: BuildingUnit) => {
    setSelectedUnit(unit);
    setIsUnitDrawerOpen(true);
  };

  return (
    <section id="availability" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            Township &amp; Residence Master Plan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Explore Availability at <span className="italic font-serif text-[#C58F58]">Senior Living Citizen.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            Select between 64 freehold residential plots across 6 blocks, 9 senior apartments (with Units 01–03 currently open for booking), or hospital inpatient suites.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('plots')}
            className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
              activeCategory === 'plots'
                ? 'bg-[#2C5E50] text-white shadow-lg scale-105'
                : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:text-[#0D2329]'
            }`}
          >
            <Home className="w-4 h-4" />
            64 Residential Plots (Blocks A–F)
          </button>
          <button
            onClick={() => setActiveCategory('apartments')}
            className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
              activeCategory === 'apartments'
                ? 'bg-[#2C5E50] text-white shadow-lg scale-105'
                : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:text-[#0D2329]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            9 Senior Residences (Units 01–09)
          </button>
          <button
            onClick={() => setActiveCategory('hospital-rooms')}
            className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
              activeCategory === 'hospital-rooms'
                ? 'bg-[#2C5E50] text-white shadow-lg scale-105'
                : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:text-[#0D2329]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Hospital Inpatient Suites (9 Units)
          </button>
        </div>

        {/* 1. 64-PLOT INTERACTIVE TOWNSHIP MASTER PLAN */}
        {activeCategory === 'plots' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-6">
            {/* Top Bar with Status Counts & Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                    64 Freehold Residential Plots
                  </h3>
                  <span className="text-xs font-mono text-[#53676E]">({plotsSummary.blocks.length} Blocks)</span>
                </div>
                <p className="text-xs text-[#53676E] mt-0.5">
                  120 to 425 sq. yd. plots along 33ft main arterial roads with 5ft-6ft boundary green belts
                </p>
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`px-3 py-1.5 rounded-full border transition-all ${
                    selectedStatus === 'all'
                      ? 'bg-[#0D2329] text-white border-[#0D2329]'
                      : 'bg-white text-[#53676E] border-[#E8E2D8]'
                  }`}
                >
                  All ({plotsSummary.totalPlots})
                </button>
                <button
                  onClick={() => setSelectedStatus('available')}
                  className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    selectedStatus === 'available'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {plotsSummary.availableCount} Available
                </button>
                <button
                  onClick={() => setSelectedStatus('on_hold')}
                  className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    selectedStatus === 'on_hold'
                      ? 'bg-amber-700 text-white border-amber-700'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {plotsSummary.onHoldCount} On Hold
                </button>
                <button
                  onClick={() => setSelectedStatus('sold')}
                  className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    selectedStatus === 'sold'
                      ? 'bg-rose-700 text-white border-rose-700'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  {plotsSummary.soldCount} Sold
                </button>
              </div>
            </div>

            {/* Block Switcher Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <span className="text-[#53676E] font-semibold text-[11px] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Select Block:
              </span>
              <button
                onClick={() => setSelectedBlock('all')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                  selectedBlock === 'all'
                    ? 'bg-[#2C5E50] text-white'
                    : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#EAF2EE]'
                }`}
              >
                All 6 Blocks
              </button>
              {plotsSummary.blocks.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBlock(b)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedBlock === b
                      ? 'bg-[#2C5E50] text-white'
                      : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#EAF2EE]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Interactive Grid of 64 Plots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredPlots.map((p) => {
                const isAvail = p.status === 'available';
                const isHold = p.status === 'on_hold';
                return (
                  <div
                    key={p.id}
                    onClick={() => handlePlotClick(p)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between group ${
                      isAvail
                        ? 'bg-emerald-50/60 hover:bg-emerald-100/80 border-emerald-300 hover:scale-105 shadow-sm'
                        : isHold
                        ? 'bg-amber-50/60 hover:bg-amber-100/80 border-amber-300 opacity-85'
                        : 'bg-rose-50/40 border-rose-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold font-serif-heading text-[#0D2329] group-hover:text-[#2C5E50]">
                        {p.plotNumber}
                      </div>
                      <div className="text-[10px] text-[#53676E] font-mono mt-0.5">
                        {p.sizeSqYd} sq.yd.
                      </div>
                      <div className="text-[9px] text-[#899B9F] truncate mt-0.5">
                        {p.facing}
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider block mt-2 px-1.5 py-0.5 rounded ${
                        isAvail
                          ? 'bg-emerald-200/70 text-emerald-900'
                          : isHold
                          ? 'bg-amber-200/70 text-amber-900'
                          : 'bg-rose-200/70 text-rose-900'
                      }`}
                    >
                      {isAvail ? 'Available' : isHold ? 'On Hold' : 'Sold'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer Plot Help Bar */}
            <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#53676E]">
              <span>💡 <em>Click any plot card above to view exact dimensions, facing, road access &amp; WhatsApp pricing.</em></span>
              <button
                onClick={() => openLeadDrawer({ title: 'Request 64-Plot Layout PDF Dossier', actionType: 'inquire-residence' })}
                className="text-[#2C5E50] font-bold hover:underline flex items-center gap-1"
              >
                Download Plotted Master Plan (PDF) →
              </button>
            </div>
          </div>
        )}

        {/* 2. 9 RESIDENTIAL BUILDING UNITS VIEW */}
        {activeCategory === 'apartments' && (
          <div className="space-y-8">
            {/* Ground Floor (01, 02, 03) - AVAILABLE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="text-lg font-serif-heading font-bold text-[#0D2329]">
                    Ground Floor Units (Phase 1 Launch — Available)
                  </h4>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  🟢 Currently Open for Booking
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {buildingUnits.slice(0, 3).map((unit) => (
                  <div
                    key={unit.id}
                    onClick={() => handleUnitClick(unit)}
                    className="bg-white rounded-3xl border border-emerald-300 shadow-md p-6 space-y-4 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C58F58]">
                          {unit.floorName}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          🟢 Available
                        </span>
                      </div>
                      <h5 className="text-xl font-serif-heading font-bold text-[#0D2329] group-hover:text-[#2C5E50] transition-colors">
                        {unit.unitNumber}
                      </h5>
                      <p className="text-xs text-[#53676E]">
                        {unit.typeName} • ~{unit.superAreaSqFt} sq. ft. Built (~{unit.carpetAreaSqFt} sq. ft. Carpet)
                      </p>
                      <div className="text-[11px] text-[#2C5E50] font-medium pt-1">
                        Orientation: {unit.facing}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-[#2C5E50] font-bold">
                      <span>View Specifications</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* First & Second Floors (04–09) - FUTURE RELEASE / COMING SOON */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h4 className="text-lg font-serif-heading font-bold text-[#0D2329]">
                    First &amp; Second Floor Units (Future Release / Coming Soon)
                  </h4>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  ⏳ Future Release (Not Yet Released)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {buildingUnits.slice(3).map((unit) => (
                  <div
                    key={unit.id}
                    onClick={() => handleUnitClick(unit)}
                    className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] p-5 space-y-3 hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#53676E]">
                          {unit.floorName}
                        </span>
                        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          ⏳ Coming Soon
                        </span>
                      </div>
                      <h5 className="text-lg font-serif-heading font-bold text-[#0D2329] group-hover:text-[#C58F58] transition-colors">
                        {unit.unitNumber}
                      </h5>
                      <p className="text-xs text-[#53676E]">
                        {unit.typeName} • ~{unit.superAreaSqFt} sq. ft.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E8E2D8] text-[11px] text-[#C58F58] font-semibold flex items-center justify-between">
                      <span>Register Interest</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. HOSPITAL ROOMS VIEW */}
        {activeCategory === 'hospital-rooms' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                  Hospital Floor 1 Inpatient Accommodations
                </h3>
                <p className="text-xs text-[#53676E] mt-0.5">
                  9 Private Inpatient Rooms (9&apos;4&quot; × 10&apos;8&quot;) + 4 Semi-Private Rooms (12&apos;6&quot; × 14&apos;8&quot;)
                </p>
              </div>
              <span className="text-xs font-bold text-[#2C5E50] px-3 py-1 rounded-full bg-[#EAF2EE]">
                On-Premise 30,000 Sqft G+2 Hospital
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2">
                <span className="text-xs font-bold uppercase text-[#2C5E50] tracking-wider block">Private Rooms (9 Units)</span>
                <div className="text-lg font-bold font-serif-heading text-[#0D2329]">9&apos;-4&quot; × 10&apos;-8&quot;</div>
                <p className="text-xs text-[#53676E]">Private recovery suite with attendant sofa and direct nurse console access.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2">
                <span className="text-xs font-bold uppercase text-[#2C5E50] tracking-wider block">Semi-Private Rooms (4 Units)</span>
                <div className="text-lg font-bold font-serif-heading text-[#0D2329]">12&apos;-6&quot; × 14&apos;-8&quot;</div>
                <p className="text-xs text-[#53676E]">Dual bed layout along the 10&apos;-0&quot; wide corridor with attached washroom.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2">
                <span className="text-xs font-bold uppercase text-[#2C5E50] tracking-wider block">General Wards (He &amp; She)</span>
                <div className="text-lg font-bold font-serif-heading text-[#0D2329]">19&apos;-0&quot; × 28&apos;-10&quot; Each</div>
                <p className="text-xs text-[#53676E]">Spacious gender-segregated wards with dedicated 6&apos;6&quot;×10&apos;0&quot; washrooms.</p>
              </div>
            </div>
          </div>
        )}

        {/* Direct WhatsApp Callout Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-[#0D2329] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#C58F58] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct Sales &amp; Site Visit Desk
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
              Ready to Walk the Land in Kheri Asra?
            </h3>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Book a private on-site walkthrough with our senior project advisors to review plot boundary markings and CAD hospital drawings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              size="lg"
              className="bg-[#2C5E50] hover:bg-[#3D7363] text-white py-4 px-6 text-sm font-bold shadow-lg"
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to book a site visit to Senior Living Citizen Foundation at Kheri Asra...' })}
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              WhatsApp: +91 99999558447 →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 text-sm font-medium"
              onClick={() => openLeadDrawer({ title: 'Schedule Private Site Walkthrough', actionType: 'book-site-visit' })}
              leftIcon={<Calendar className="w-4 h-4 text-[#C58F58]" />}
            >
              Book Site Walk
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Drawers */}
      <PlotDetailDrawer
        plot={selectedPlot}
        isOpen={isPlotDrawerOpen}
        onClose={() => setIsPlotDrawerOpen(false)}
      />

      <UnitDetailDrawer
        unit={selectedUnit}
        isOpen={isUnitDrawerOpen}
        onClose={() => setIsUnitDrawerOpen(false)}
      />
    </section>
  );
};
