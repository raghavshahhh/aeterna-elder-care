'use client';

import React from 'react';
import Image from 'next/image';
import { healthcareHighlights, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import {
  Building2,
  Sparkles,
  Stethoscope,
  Activity,
  Heart,
  Trees,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const EcosystemShowcase: React.FC = () => {
  const { openLeadDrawer, openWhatsApp } = useModal();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6 text-[#2C5E50]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#C58F58]" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-emerald-700" />;
      case 'Activity': return <Activity className="w-6 h-6 text-rose-600" />;
      case 'Heart': return <Heart className="w-6 h-6 text-amber-600" />;
      case 'Trees': return <Trees className="w-6 h-6 text-emerald-600" />;
      default: return <Sparkles className="w-6 h-6 text-[#C58F58]" />;
    }
  };

  return (
    <section id="healthcare" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Stethoscope className="w-3.5 h-3.5 text-[#C58F58]" />
            11 • Healthcare, Wellness &amp; Mandir Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Care When It Matters. <span className="italic font-serif text-[#C58F58]">Inside the Gate.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            No 40-minute panic in city traffic. A proposed 30,000 sq. ft. G+2 Ayurvedic &amp; Multi-Speciality Hospital is planned right on the property — with doctors, panchakarma suites, and emergency response next door.
          </p>
        </div>

        {/* 6 Clean Healthcare & Lifestyle Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {healthcareHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EAF2EE] text-[#2C5E50] font-mono">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#53676E] mt-1.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] text-[11px] text-[#2C5E50] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Planned inside township boundary</span>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Blueprints & Site Visit Banner */}
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#C58F58]">
              <FileText className="w-3.5 h-3.5" />
              The Vision Architects · CAD Dossier
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
              Want to inspect the detailed Architectural Hospital CAD Plans?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              We have complete CAD layouts for the proposed Ground Floor OPDs, First Floor Panchakarma suites, and Second Floor private inpatient rooms.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, please send the complete Hospital CAD Blueprints & Architectural Dossier (PDF)...' })}
              className="px-5 py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              Request Hospital CAD (PDF) →
            </button>

            <button
              onClick={() => openLeadDrawer({ title: 'Book Site Walk to Kheri Asra Land', actionType: 'book-site-visit' })}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
            >
              Book Site Walk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
