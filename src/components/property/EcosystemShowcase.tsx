'use client';

import React, { useState } from 'react';
import { ecosystemPillars } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import {
  Stethoscope,
  Sparkles,
  Heart,
  Siren,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  Tv,
  Radio,
  Users,
  Smile,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const EcosystemShowcase: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<'healthcare' | 'ayurveda' | 'lifestyle'>('healthcare');
  const { openLeadDrawer } = useModal();

  const currentPillar = ecosystemPillars.find((p) => p.id === activePillarId) || ecosystemPillars[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Siren': return <Siren className="w-5 h-5 text-rose-600" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-[#2C5E50]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#1D4B57]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#C58F58]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-emerald-500" />;
      case 'Tv': return <Tv className="w-5 h-5 text-indigo-500" />;
      case 'Radio': return <Radio className="w-5 h-5 text-cyan-500" />;
      case 'Users': return <Users className="w-5 h-5 text-[#2C5E50]" />;
      case 'Smile': return <Smile className="w-5 h-5 text-orange-500" />;
      default: return <Sparkles className="w-5 h-5 text-[#C58F58]" />;
    }
  };

  return (
    <section id="ecosystem" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Everything You Need, Thoughtfully Planned
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            An Integrated <span className="italic font-serif text-[#C58F58]">Living Ecosystem.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            Move beyond ordinary senior care. Experience the perfect synergy of clinical safety, ancient Ayurvedic longevity, and rich intellectual culture.
          </p>
        </div>

        {/* 3-Pillar Tabbed Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ecosystemPillars.map((pillar) => {
            const isActive = activePillarId === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#0D2329] text-white shadow-lg scale-105'
                    : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:border-[#C58F58]/50 hover:text-[#0D2329]'
                }`}
              >
                <span>{pillar.title}</span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${isActive ? 'bg-white/20 text-[#FAF8F5]' : 'bg-[#FAF8F5] text-[#899B9F]'}`}>
                  {pillar.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Banner */}
        <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
                {currentPillar.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
                {currentPillar.title}
              </h3>
              <p className="text-sm text-[#53676E] max-w-2xl mt-1">
                {currentPillar.description}
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => openLeadDrawer({ title: `Inquire About ${currentPillar.title}`, actionType: 'inquire-residence' })}
                className="px-5 py-3 rounded-xl bg-[#FAF8F5] border border-[#2C5E50] text-[#2C5E50] hover:bg-[#2C5E50] hover:text-white text-xs font-bold transition-all"
              >
                Inquire Details & Protocols →
              </button>
            </div>
          </div>

          {/* 4 Feature Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPillar.items.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#2C5E50]/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center shadow-sm">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EAF2EE] text-[#2C5E50] border border-[#CDE0D7]">
                    {item.highlight}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[#0D2329] font-serif-heading">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#53676E] mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D8]/60 flex items-center justify-between text-[11px] text-[#53676E]">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Proposed On-Site Facility
                  </span>
                  <span className="italic text-[#899B9F]">Groundwork Stage</span>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer Note */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[11px] text-[#899B9F] flex items-center gap-2">
            <span className="font-bold text-[#53676E]">Note:</span>
            <span>{currentPillar.disclaimer}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
