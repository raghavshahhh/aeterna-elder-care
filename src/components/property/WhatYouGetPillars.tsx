'use client';

import React from 'react';
import { whatYouGetPillars } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import {
  Home,
  Stethoscope,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const WhatYouGetPillars: React.FC = () => {
  const { openWhatsApp } = useModal();

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-6 h-6 text-[#2C5E50]" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-emerald-700" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#C58F58]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#14353E]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#2C5E50]" />;
      default: return <Sparkles className="w-6 h-6 text-[#C58F58]" />;
    }
  };

  return (
    <section id="what-you-get" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
            10 • What You Actually Get
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#0D2329]">
            Everything Included. <span className="italic font-serif text-[#C58F58]">Five Clear Pillars.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            No ambiguous promises or complex real-estate jargon. Here is exactly what is engineered into your parents&apos; future home, health, and daily community.
          </p>
        </div>

        {/* 5-Column Grid of Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {whatYouGetPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getPillarIcon(pillar.iconName)}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold">
                    Pillar: {pillar.id.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#2C5E50] font-medium mt-1">
                    {pillar.tagline}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#E8E2D8]">
                  {pillar.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#53676E]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#E8E2D8]/60 flex items-center justify-between text-[11px] font-bold text-[#2C5E50]">
                <span>Standard Inclusion</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassuring Action Bar */}
        <div className="p-6 rounded-3xl bg-[#0D2329] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">
              Want the full specification dossier with room dimensions and architectural blueprints?
            </h4>
            <p className="text-xs text-white/70">
              Download our complete pre-launch brochure or request direct clarification on WhatsApp.
            </p>
          </div>

          <button
            onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, please send the complete 5-Pillar Project Specifications and Architectural Dossier (PDF)...' })}
            className="px-6 py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            Request Specifications on WhatsApp →
          </button>
        </div>
      </div>
    </section>
  );
};

