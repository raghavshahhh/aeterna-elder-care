'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { allPlots, plotsSummary, projectOverview } from '@/data/propertyData';
import { PlotItem } from '@/types';
import { PlotDetailDrawer } from '@/components/property/PlotDetailDrawer';

const MasterPlan3DViewer = dynamic(
  () => import('@/components/3d/MasterPlan3DViewer').then((mod) => mod.MasterPlan3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[580px] bg-[#071519] rounded-3xl flex flex-col items-center justify-center gap-3 border border-white/10 text-white">
        <div className="w-8 h-8 border-2 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-white/60">Loading Interactive 64-Plot 3D Master Plan...</span>
      </div>
    )
  }
);

import { PlotStickyContextBar } from '@/components/property/PlotStickyContextBar';
import { Cad3DToggle } from '@/components/ui/Cad3DToggle';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import {
  Layers,
  Home,
  Sparkles,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  Calendar,
  Compass,
  Trees,
  Maximize2,
  ArrowRight,
  ShieldCheck,
  Rotate3d,
  Grid,
  FileText
} from 'lucide-react';

export const AvailabilityMatrix: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // Drawer & Selection State
  const [selectedPlot, setSelectedPlot] = useState<PlotItem | null>(null);
  const [isPlotDrawerOpen, setIsPlotDrawerOpen] = useState(false);

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

  const handleFocus3D = (plotNumber?: number) => {
    setViewMode('3d');
  };

  return (
    <section id="plots-masterplan" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
            12 &amp; 13 • 64-Plot Master Plan &amp; Availability
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Find Your Plot in the <span className="italic font-serif text-[#C58F58]">Master Plan.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            64 Freehold residential plots across Blocks A to F (120 to 425 sq. yd.). Explore the 3D isometric layout below, click any plot to inspect dimensions and pricing, or switch to the 2D grid.
          </p>

          {/* 3D / 2D View Switch */}
          <div className="pt-2 flex items-center justify-center">
            <Cad3DToggle
              viewMode={viewMode}
              onToggle={(mode) => setViewMode(mode)}
              label3D="Interactive 3D Master Plan"
              label2D="2D Inventory Grid"
            />
          </div>
        </div>

        {viewMode === '3d' ? (
          <div className="mb-8">
            <MasterPlan3DViewer
              onSelectPlot={(plot) => handlePlotClick(plot)}
              onToggle2DView={() => setViewMode('2d')}
            />
          </div>
        ) : (
        /* Master Plan Container Card */
        <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-6">
          {/* Top Bar with Status Counts & Filters */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                  64 Freehold Plots Inventory
                </h3>
                <span className="text-xs font-mono text-[#53676E]">({plotsSummary.blocks.length} Blocks)</span>
              </div>
              <p className="text-xs text-[#53676E] mt-0.5">
                120–425 sq. yd. plots • 33ft main road access • 5ft–6ft boundary green buffers
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Phase 1 Allotment Open • 64 Plots
              </span>
              <span className="text-[11px] text-[#53676E] hidden sm:inline">
                (Individual demarcation verified on-site)
              </span>
            </div>
          </div>

          {/* Architectural 2D Masterplan Drawing Callout */}
          <div className="rounded-2xl border border-[#E8E2D8] bg-[#FAF8F5] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#0D2329] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center relative">
                <img
                  src="/project-assets/architecture/cad/previews/masterplan-real.jpg"
                  alt="Architectural Masterplan CAD Drawing Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C58F58] font-bold uppercase tracking-wider block">
                  APPROVED 2D ARCHITECTURAL MASTERPLAN // THE VISION ARCHITECTS
                </span>
                <h4 className="text-sm font-bold text-[#0D2329]">
                  64-Plot Site Demarcation &amp; 33ft/24ft Road Network Drawing
                </h4>
                <p className="text-[11px] text-[#53676E] mt-0.5">
                  Source: Client-Supplied Architectural CAD • Scale: 1:500
                </p>
              </div>
            </div>
            <a
              href="/project-assets/architecture/cad/slcf-masterplan-site-layout.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#0D2329] hover:bg-[#1D4B57] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#C58F58]" />
              Open Scaled CAD PDF ↗
            </a>
          </div>

          {/* Block Switcher Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[#53676E] font-semibold text-[11px] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Select Block:
            </span>
            <button
              onClick={() => setSelectedBlock('all')}
              className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
                selectedBlock === 'all'
                  ? 'bg-[#2C5E50] text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#EAF2EE]'
              }`}
            >
              All 6 Blocks
            </button>
            {plotsSummary.blocks.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBlock(b)}
                className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
                  selectedBlock === b
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#EAF2EE]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Interactive Grid of 64 Plots */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredPlots.map((p) => {
              const isSelected = selectedPlot?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handlePlotClick(p)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md hover:scale-[1.02] ${
                    isSelected
                      ? 'border-[#2C5E50] bg-emerald-50/70 ring-2 ring-[#2C5E50]'
                      : 'border-[#E8E2D8] bg-[#FAF8F5] hover:bg-white hover:border-[#2C5E50]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#53676E] font-mono">
                      <span>{p.block}</span>
                      <span className="font-bold text-[#0D2329]">{p.sizeSqYd} sq.yd.</span>
                    </div>

                    <div className="text-sm font-bold font-serif-heading text-[#0D2329] group-hover:text-[#2C5E50]">
                      {p.plotNumber}
                    </div>

                    <div className="text-[10px] text-[#53676E] truncate">
                      {p.facing} • {p.roadWidth.split(' ')[0]}ft
                    </div>

                    <div className="text-[11px] font-bold text-[#C58F58] pt-1">
                      {p.priceEstimate}
                    </div>
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-wider block mt-2 px-1.5 py-0.5 rounded bg-[#EAF2EE] text-[#2C5E50]">
                    Inspect CAD →
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Footer Action inside Master Plan Card */}
          <div className="pt-6 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#53676E] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Freehold registered title in your name with clear municipal demarcations.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, please share the full 64 Plots Master Plan PDF and current price list...' })}
                className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EAF2EE] text-[#0D2329] text-xs font-bold transition-all border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                Get Price List (PDF) →
              </button>

              <Button
                size="sm"
                className="bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs font-bold py-2.5 px-4"
                onClick={() => openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
              >
                Schedule Site Walk
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Plot Detail Drawer */}
      <PlotDetailDrawer
        plot={selectedPlot}
        isOpen={isPlotDrawerOpen}
        onClose={() => setIsPlotDrawerOpen(false)}
        onFocus3D={(num) => handleFocus3D(num)}
      />

      {/* Sticky Context Bar for Selected Plot */}
      <PlotStickyContextBar
        selectedPlot={selectedPlot}
        onClear={() => setSelectedPlot(null)}
        onFocus3D={() => handleFocus3D(selectedPlot?.number)}
        onOpenDetails={() => setIsPlotDrawerOpen(true)}
      />
    </section>
  );
};
