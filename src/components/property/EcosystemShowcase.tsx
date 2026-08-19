'use client';

import React, { useState } from 'react';
import { ecosystemPillars, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
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
  Calendar,
  Building2,
  MessageSquare
} from 'lucide-react';

export const EcosystemShowcase: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<'healthcare' | 'ayurveda' | 'lifestyle'>('healthcare');
  const { openLeadDrawer, openWhatsApp } = useModal();

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Care When It Matters
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            An Integrated <span className="italic font-serif text-[#C58F58]">Living Ecosystem.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            A thoughtfully planned harmony of proposed clinical healthcare, authentic Kerala Ayurveda, and enriching community lifestyle within the township gates.
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
                <span
                  className={`text-[10px] uppercase px-2 py-0.5 rounded font-mono ${
                    isActive ? 'bg-white/20 text-[#FAF8F5]' : 'bg-[#FAF8F5] text-[#899B9F]'
                  }`}
                >
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] font-mono">
                {currentPillar.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
                {currentPillar.title}
              </h3>
              <p className="text-sm text-[#53676E] max-w-2xl mt-1 leading-relaxed">
                {currentPillar.description}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => openWhatsApp({ actionType: 'general', message: `I want to understand the planned ${currentPillar.title} facilities...` })}
                className="px-5 py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Ask Health Advisor on WhatsApp →
              </button>
            </div>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentPillar.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#2C5E50]/40 transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  {getIcon(item.iconName)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-serif-heading font-bold text-[#0D2329]">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#EAF2EE] text-[#2C5E50] font-semibold">
                      {item.highlight}
                    </span>
                  </div>
                  <p className="text-xs text-[#53676E] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer Note */}
          <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#899B9F] italic">
            <span>*Disclaimer: {currentPillar.disclaimer}</span>
            <button
              onClick={() => openLeadDrawer({ title: `Request Clinical Dossier for ${currentPillar.title}`, actionType: 'inquire-residence' })}
              className="text-[#2C5E50] font-bold hover:underline not-italic"
            >
              Request Architectural Dossier (PDF) →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
