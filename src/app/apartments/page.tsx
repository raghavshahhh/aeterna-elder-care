'use client';

import React, { useState } from 'react';
import { BuildingCGIViewer } from '@/components/property/BuildingCGIViewer';
import { ResidenceUnitExplorer } from '@/components/property/ResidenceUnitExplorer';
import { useModal } from '@/context/ModalContext';
import { FloorId } from '@/types';
import { Building2, Sparkles, ShieldCheck, CheckCircle2, MessageSquare, Calendar } from 'lucide-react';

export default function ApartmentsPage() {
  const [selectedFloor, setSelectedFloor] = useState<FloorId>('ground');
  const { openWhatsApp, openLeadDrawer } = useModal();

  return (
    <div className="space-y-16 pb-20 bg-[#FAF8F5]">
      {/* Page Hero */}
      <section className="bg-[#0D2329] text-white py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            Senior Residences
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            1 BHK &amp; 1 RK — <span className="italic font-serif text-[#C58F58]">Compact, Considered,</span> Complete.
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            G+2 apartment buildings with stilt parking, two lifts, and gradual 6&quot; rise stairs. Single-floor living inside each home — built for the body, not the brochure.
          </p>
        </div>
      </section>

      {/* Building Overview Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
            <div className="text-3xl font-serif-heading font-bold text-[#2C5E50]">G+2</div>
            <div className="text-xs font-mono uppercase text-[#53676E] mt-1">Floors + Stilt Parking</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
            <div className="text-3xl font-serif-heading font-bold text-[#2C5E50]">3</div>
            <div className="text-xs font-mono uppercase text-[#53676E] mt-1">Apartments / Floor</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
            <div className="text-3xl font-serif-heading font-bold text-[#C58F58]">2</div>
            <div className="text-xs font-mono uppercase text-[#53676E] mt-1">Lifts per Building</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
            <div className="text-3xl font-serif-heading font-bold text-[#2C5E50]">10+</div>
            <div className="text-xs font-mono uppercase text-[#53676E] mt-1">Stilt Covered Car Parks</div>
          </div>
        </div>
      </div>

      {/* 3D CGI Floor Explorer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BuildingCGIViewer onSelectFloor={(fl) => setSelectedFloor(fl)} />
      </div>

      {/* 1 BHK & 1 RK Blueprints & Interior CGI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResidenceUnitExplorer />
      </div>

      {/* Senior-First Features Section */}
      <section className="bg-[#0D2329] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E0AB77]">
              DESIGNED FOR THE BODY THAT LIVES HERE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#FAF8F5]">
              Senior-First <span className="italic font-serif text-[#C58F58]">By Design.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Most apartments assume a 30-year-old will live in them. These are drawn for the body you have at 65, 75, and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/10 border border-white/10 space-y-3">
              <div className="text-3xl">🛗</div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Two Lifts — Always One Working</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                One lift can break down. Two cannot simultaneously. 5×6ft cabins fit a wheelchair, walker, and attendant with plenty of room.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 border border-white/10 space-y-3">
              <div className="text-3xl">🪜</div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Gradual Stairs — 10&quot; Tread, 6&quot; Rise</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Standard Indian stairs use a 7&quot; rise. Ours use 6&quot; — a gentle difference that spares knees over decades. 4ft wide for an accompanying walker.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 border border-white/10 space-y-3">
              <div className="text-3xl">🏠</div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Single-Floor Living Inside</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Once on your floor, the entire home is on one level. Zero internal steps, no split levels, and zero trip hazards in the dark.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 border border-white/10 space-y-3">
              <div className="text-3xl">🚗</div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Stilt Parking — Shaded &amp; Ventilated</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                The ground level is open, shaded, and ventilated with 3 entry gates and 10+ covered parking bays.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
