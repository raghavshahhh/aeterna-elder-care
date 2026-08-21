'use client';

import React from 'react';
import { projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import {
  Compass,
  Building2,
  Layers,
  Sparkles,
  Stethoscope,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const ProjectIntroduction: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  return (
    <section id="project-overview" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
              02 • Project Overview &amp; Master Vision
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#0D2329] leading-[1.15]">
              A Purpose-Built <span className="italic font-serif text-[#C58F58]">Senior Sanctuary</span> Near Reliance MET City.
            </h2>

            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed font-normal">
              <strong>Senior Living Citizen Foundation</strong> is an upcoming pre-launch township in <strong>Kheri Asra, Jhajjar</strong>, positioned right along the State Highway 22 (SH-22) corridor. Conceived as a peaceful, plotted sanctuary where India&apos;s elders can live with dignity, independence, and immediate clinical peace of mind.
            </p>

            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              Designed around <strong>64 freehold residential plots</strong> (120–425 sq. yd.) and a proposed <strong>9-unit senior residence building</strong>, the community is anchored by a planned <strong>30,000 sq. ft. G+2 Multi-Speciality Ayurvedic Hospital</strong> and sacred <strong>Community Mandir</strong> within its own gates.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0D2329] text-white shadow-2xl space-y-6 relative overflow-hidden border border-white/10">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#C58F58]/10 blur-3xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77]">
                  Master Architectural Concept
                </span>
                <div className="font-serif italic text-xl sm:text-2xl text-[#F2EADA] leading-relaxed">
                  &ldquo;{projectOverview.visionStatement}&rdquo;
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Freehold Title
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[#E0AB77]">
                  Haryana · 124104
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Cornerstone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#2C5E50]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C58F58]">Plotted Township</span>
              <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] mt-0.5">64 Freehold Plots</h3>
            </div>
            <p className="text-xs text-[#53676E] leading-relaxed">
              Blocks A to F (120 to 425 sq. yd.) with individual legal registry, 33ft wide arterial roads, and 5ft–6ft tree buffer belts.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#C58F58]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C58F58]">Senior Residences</span>
              <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] mt-0.5">9-Unit G+2 Building</h3>
            </div>
            <p className="text-xs text-[#53676E] leading-relaxed">
              Stilt parking, dual wheelchair-sized lifts, gradual 6&quot; rise stairs, and 1 BHK / 1 RK senior barrier-free suites.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-emerald-700">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C58F58]">Clinical Ecosystem</span>
              <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] mt-0.5">30k Sq. Ft. Hospital</h3>
            </div>
            <p className="text-xs text-[#53676E] leading-relaxed">
              Planned G+2 Ayurvedic &amp; Multi-Speciality Hospital with 6 OPDs, 9 Panchakarma suites, diagnostics, and emergency bay.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-rose-700">
              <Heart className="w-6 h-6 fill-rose-700/20" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C58F58]">Daily Faith</span>
              <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] mt-0.5">Community Mandir</h3>
            </div>
            <p className="text-xs text-[#53676E] leading-relaxed">
              A peaceful sacred temple located on the western boundary within a 5-minute stroll for daily morning and evening aarti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

