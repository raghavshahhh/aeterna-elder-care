'use client';

import React, { useState } from 'react';
import { plotsSummary, residenceUnits } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  Sparkles,
  Lock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  MessageSquare,
  Home,
  MapPin
} from 'lucide-react';

export const AvailabilityMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'plots' | 'apartments' | 'hospital-rooms'>('plots');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const { openWhatsApp, openLeadDrawer } = useModal();

  // Mock interactive 64 plots generator across 6 blocks
  const plots = Array.from({ length: 64 }, (_, i) => {
    const num = i + 1;
    const blockIndex = Math.floor(i / 11);
    const block = ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'][blockIndex] || 'Block A';
    const isSold = [4, 12, 19, 27, 33, 41, 48, 52, 59, 63].includes(num);
    const isHold = [8, 15, 23, 31, 38, 46, 50, 56, 61].includes(num);
    const status = isSold ? 'sold' : isHold ? 'hold' : 'available';
    const size = [120, 150, 180, 220, 250, 300, 425][i % 7];
    return {
      id: `P-${num}`,
      number: `Plot ${num}`,
      block,
      sizeSqYd: size,
      facing: ['North', 'East', 'North-East', 'Park Facing', 'Corner'][i % 5],
      status
    };
  });

  const filteredPlots = plots.filter((p) => {
    if (selectedBlock === 'all') return true;
    return p.block === selectedBlock;
  });

  return (
    <section id="availability" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Live Township & Hospital Inventory
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Find Your Space at <span className="italic font-serif text-[#C58F58]">Senior Living Citizen.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            Choose between 64 freehold residential plots to build your custom home, compact 1BHK/2BHK senior apartments, or hospital inpatient recovery suites.
          </p>
        </div>

        {/* Category Switcher Tabs (Plots vs Apartments vs Hospital Suites) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory('plots')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'plots'
                ? 'bg-[#2C5E50] text-white shadow-lg'
                : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:text-[#0D2329]'
            }`}
          >
            <Home className="w-4 h-4" />
            64 Residential Plots (Blocks A–F)
          </button>
          <button
            onClick={() => setSelectedCategory('apartments')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'apartments'
                ? 'bg-[#2C5E50] text-white shadow-lg'
                : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:text-[#0D2329]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            1BHK &amp; 2BHK Senior Apartments
          </button>
          <button
            onClick={() => setSelectedCategory('hospital-rooms')}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'hospital-rooms'
                ? 'bg-[#2C5E50] text-white shadow-lg'
                : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:text-[#0D2329]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Hospital Inpatient Suites (9 Rooms)
          </button>
        </div>

        {/* 1. PLOTS INVENTORY VIEW */}
        {selectedCategory === 'plots' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                  64 Residential Plots · Real-Time Map
                </h3>
                <p className="text-xs text-[#53676E] mt-0.5">
                  120 to 425 sq. yd. along 33ft main arterial roads and 5ft-6ft green belts
                </p>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {plotsSummary.availableCount} Available
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {plotsSummary.onHoldCount} On Hold
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  {plotsSummary.soldCount} Sold
                </span>
              </div>
            </div>

            {/* Block Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBlock('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBlock === 'all' ? 'bg-[#0D2329] text-white' : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#EAF2EE]'
                }`}
              >
                All 6 Blocks
              </button>
              {plotsSummary.blocks.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBlock(b)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedBlock === b ? 'bg-[#0D2329] text-white' : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#EAF2EE]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Interactive Grid of Plots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredPlots.map((p) => {
                const isAvail = p.status === 'available';
                const isHold = p.status === 'hold';
                return (
                  <div
                    key={p.id}
                    onClick={() =>
                      openWhatsApp({
                        actionType: 'reserve-unit',
                        unitName: `${p.number} (${p.block}, ${p.sizeSqYd} sq.yd.)`,
                        unitType: 'Residential Plot'
                      })
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isAvail
                        ? 'bg-emerald-50/50 border-emerald-300 hover:bg-emerald-100 hover:scale-105 shadow-sm'
                        : isHold
                        ? 'bg-amber-50/50 border-amber-300 opacity-80'
                        : 'bg-rose-50/40 border-rose-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-xs font-bold font-serif-heading text-[#0D2329]">{p.number}</div>
                    <div className="text-[10px] text-[#53676E] font-mono">{p.sizeSqYd} sq.yd.</div>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider block mt-1 ${
                        isAvail ? 'text-emerald-700' : isHold ? 'text-amber-700' : 'text-rose-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#53676E]">
              <span>💡 Click any plot to enquire about pricing, exact dimensions, and payment milestones.</span>
              <button
                onClick={() => openLeadDrawer({ title: 'Request Complete 64-Plot Layout PDF', actionType: 'inquire-residence' })}
                className="text-[#2C5E50] font-bold hover:underline"
              >
                Download Plotted Township Master Plan (PDF) →
              </button>
            </div>
          </div>
        )}

        {/* 2. APARTMENTS VIEW */}
        {selectedCategory === 'apartments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {residenceUnits.slice(0, 2).map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
                      G+2 Floors + Stilt Parking
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {apt.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                    {apt.unitNumber}
                  </h3>
                  <p className="text-xs text-[#53676E]">
                    {apt.typeName} • ~{apt.superAreaSqFt} sq. ft. Built (~{apt.carpetAreaSqFt} sq. ft. Carpet)
                  </p>

                  <div className="space-y-2 pt-2">
                    {apt.rooms.map((rm, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-[#F0EBE1]">
                        <span className="font-medium text-[#0D2329]">{rm.name}</span>
                        <span className="font-mono text-[#2C5E50] font-bold">{rm.dimensions}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button
                    size="lg"
                    className="w-full bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs font-bold py-3.5"
                    onClick={() =>
                      openWhatsApp({
                        actionType: 'reserve-unit',
                        unitName: apt.unitNumber,
                        unitType: apt.typeName
                      })
                    }
                  >
                    Enquire on WhatsApp →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. HOSPITAL ROOMS VIEW */}
        {selectedCategory === 'hospital-rooms' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                  Hospital Floor 1 Inpatient Accommodations
                </h3>
                <p className="text-xs text-[#53676E] mt-0.5">
                  9 Private Rooms (9&apos;4&quot; × 10&apos;8&quot;) + 4 Semi-Private Rooms (12&apos;6&quot; × 14&apos;8&quot;) + General Wards
                </p>
              </div>
              <span className="text-xs font-bold text-[#2C5E50] px-3 py-1 rounded-full bg-[#EAF2EE]">
                On-Premise G+2 Hospital
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

        {/* Direct Contact Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-[#0D2329] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#C58F58] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct Sales &amp; Site Visit Desk
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
              Ready to Walk the Land in Kheri Asra?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Photographs only carry so much. Book a private site visit to experience the tranquil surroundings and review full architectural drawings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              size="lg"
              className="bg-[#2C5E50] hover:bg-[#3D7363] text-white py-4 px-6 text-sm font-semibold shadow-lg"
              onClick={() => openWhatsApp({ actionType: 'general', message: 'I want to book a site visit to Senior Living Citizen Foundation at Kheri Asra...' })}
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
    </section>
  );
};
