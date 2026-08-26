'use client';

import React from 'react';
import Link from 'next/link';
import { BuildingCGIViewer } from '@/components/property/BuildingCGIViewer';
import { ResidenceUnitExplorer } from '@/components/property/ResidenceUnitExplorer';
import { FinancePaymentPlans } from '@/components/property/FinancePaymentPlans';
import { useModal } from '@/context/ModalContext';
import {
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Footprints,
  Home,
  Car,
  ArrowUpDown,
  Layers,
  MessageSquare,
  BadgePercent,
  Download,
  Lock
} from 'lucide-react';

export default function ApartmentsPage() {
  const { openWhatsApp, openLeadDrawer, openFloorPlan } = useModal();

  const handleOpenMasterCAD = () => {
    openFloorPlan({
      floorPlanType: 'residences',
      title: 'Typical Floor Plan (Plots 63 & 64) — 1 BHK & 1 RK Senior Residences'
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0D2329] to-[#071519] text-white py-16 sm:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5 text-[#C58F58]" />
            Plots 63 &amp; 64 • 9-Unit G+2 Residential Building
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            1 RK &amp; 1 BHK <span className="italic font-serif text-[#C58F58]">Senior Residences</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            Architecturally engineered by <strong>The Vision Architects (Ar. Yash Garg)</strong> for the body you have at 65, 75, and beyond. Single-floor barrier-free living, dual elevators, gradual 6&quot; risers, covered stilt parking, and structured rental return plans starting at ₹25 Lakhs.
          </p>

          {/* Quick Action Navigation Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleOpenMasterCAD}
              className="px-6 py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#B37E47] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Inspect CAD Floor Plan (Plots 63 &amp; 64) →</span>
            </button>

            <button
              onClick={() =>
                openLeadDrawer({
                  title: 'Schedule Private Site Walk for Senior Residences',
                  unitType: '1 BHK / 1 RK Senior Residences',
                  actionType: 'book-site-visit'
                })
              }
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#C58F58]" />
              <span>Book Guided Site Walk at Kheri Asra</span>
            </button>
          </div>
        </div>
      </section>

      {/* Building CGI Elevation Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BuildingCGIViewer />
      </div>

      {/* 1 BHK / 1 RK Visualizer & Phase 1 Available Cards */}
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
              Every doorway, riser, bathroom threshold, and hallway is drawn for physical ease and knee preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C58F58]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C58F58]">
                <ArrowUpDown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Two Lifts — Always One Working</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Dual stretcher-sized elevator shafts (5&apos;6&quot; × 8&apos;0&quot;) accommodating wheelchairs, walkers, and medical attendants seamlessly from stilt parking to roof.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C58F58]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C58F58]">
                <Footprints className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Gradual Stairs — 10&quot; Tread, 6&quot; Rise</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Standard builder stairs use steep 7&quot; risers. Ours use gentle 6&quot; risers and 4&apos;6&quot; wide treads with safety handrails to spare knees over decades.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C58F58]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C58F58]">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Single-Floor Living Inside</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Once on your floor, the entire home is on one level. Zero internal steps, flush bathroom drainage channels, and anti-skid vitrified flooring.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C58F58]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C58F58]">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">Stilt Parking — 14 Covered Bays</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Ground level features 14 covered parking bays (optional dedicated allotment at ₹3 Lakhs) and 3 independent entry gates with zero traffic pinch-points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Finance & Payment Plans Section */}
      <FinancePaymentPlans />
    </div>
  );
}
