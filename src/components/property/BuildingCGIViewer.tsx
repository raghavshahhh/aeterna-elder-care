'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { propertyFloors, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { FloorId } from '@/types';
import {
  Building2,
  Layers,
  Sparkles,
  ChevronRight,
  Eye,
  Info,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface BuildingCGIViewerProps {
  onSelectFloor?: (floorId: FloorId) => void;
}

export const BuildingCGIViewer: React.FC<BuildingCGIViewerProps> = ({ onSelectFloor }) => {
  const [activeHoverFloor, setActiveHoverFloor] = useState<FloorId>('ground');
  const { openWhatsApp } = useModal();

  const floorMeta = propertyFloors.find((f) => f.id === activeHoverFloor) || propertyFloors[0];

  const handleFloorClick = (floorId: FloorId) => {
    setActiveHoverFloor(floorId);
    if (onSelectFloor) {
      onSelectFloor(floorId);
    }
    const masterPlanEl = document.getElementById('master-plan');
    if (masterPlanEl) {
      masterPlanEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="building-vision" className="py-20 sm:py-28 bg-[#0D2329] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2C5E50]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#C58F58] font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Proposed Architectural Elevation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Designed for the <span className="italic font-serif text-[#C58F58]">Life Ahead.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Explore the multi-tier architectural layout. Every level is intentionally segregated to deliver clinical safety on the lower floors and serene residential living on the upper tiers.
          </p>
        </div>

        {/* 3D CGI Interactive Elevation Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Architectural CGI Elevation with Hotspots */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/15 bg-[#071519] shadow-2xl group min-h-[420px] sm:min-h-[520px] flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
              alt="Proposed Ayurvedic Hospital and Senior Residences Architectural 3D CGI"
              fill
              className="object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071519] via-transparent to-[#071519]/40" />

            {/* Disclaimer Badge */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white/80 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#C58F58]" />
              <span>Architectural 3D Render • Artist Impression</span>
            </div>

            {/* Interactive Elevation Floor Levels Overlaid */}
            <div className="absolute inset-y-8 right-4 sm:right-8 z-20 flex flex-col justify-between py-2">
              {propertyFloors.slice().reverse().map((floor) => {
                const isActive = activeHoverFloor === floor.id;
                return (
                  <button
                    key={floor.id}
                    onClick={() => handleFloorClick(floor.id)}
                    className={`px-3 sm:px-4 py-2.5 rounded-2xl backdrop-blur-md transition-all duration-300 text-left flex items-center gap-3 border shadow-lg ${
                      isActive
                        ? 'bg-[#2C5E50] text-white border-emerald-400 scale-105 shadow-emerald-900/40'
                        : 'bg-black/60 text-white/70 border-white/15 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold">
                      {floor.level === 0 ? 'G' : floor.level}
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-bold font-serif-heading leading-tight">{floor.name.split('—')[0]}</div>
                      <div className="text-[10px] text-white/60">
                        {floor.level === 1 ? '🟢 Clinical & ICU' : floor.level === 2 ? '🟢 OPD & Ayurveda' : '🟢 Rooftop & Pool'}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-white/40'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Level Detail & Quick Jump Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C58F58]">
                  <Layers className="w-4 h-4" />
                  Level {floorMeta.level === 0 ? 'Ground' : floorMeta.level} Blueprint
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                  {floorMeta.totalAreaSqFt.toLocaleString()} sq. ft.
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-white">
                  {floorMeta.name}
                </h3>
                <p className="text-xs text-[#C58F58] mt-1 font-medium italic font-serif">
                  {floorMeta.tagline}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                  {floorMeta.description}
                </p>
              </div>

              {/* Functional Zones in this Level */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] uppercase font-bold text-white/60 tracking-wider block">
                  Functional Zones & Infrastructure:
                </span>
                <div className="space-y-2">
                  {floorMeta.zones.map((zone, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="text-white font-medium block">{zone.name}</strong>
                        <span className="text-[11px] text-white/60 leading-snug block mt-0.5">
                          {zone.description}
                        </span>
                      </div>
                      {zone.badge && (
                        <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-[#FAF8F5] border border-white/10">
                          {zone.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleFloorClick(floorMeta.id)}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#2C5E50]/20"
              >
                <Eye className="w-4 h-4" />
                View Detailed Floor CAD Plan →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
