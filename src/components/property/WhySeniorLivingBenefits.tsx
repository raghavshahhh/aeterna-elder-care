'use client';

import React from 'react';
import { deepBenefits, comparisonPoints } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { ShieldCheck, Check, X, Sparkles, MessageSquare, PhoneCall, ArrowRight } from 'lucide-react';

export const WhySeniorLivingBenefits: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  return (
    <section id="benefits" className="py-20 sm:py-28 bg-white border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
            03 • Why Plotted Senior Living for Parents
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-[#0D2329] tracking-tight">
            Not a retirement home. <span className="italic font-serif text-[#C58F58]">Your own land.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            A plotted senior community is a fundamentally different proposition from a retirement flat or old-age home. Here is what makes it the better choice — financially, physically, and emotionally.
          </p>
        </div>

        {/* Side-by-Side Comparison: City Flat vs Senior Living Foundation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Regular City Flat (Red / Muted) */}
          <div className="p-8 rounded-3xl bg-rose-50/60 border border-rose-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-rose-200">
              <span className="font-mono text-xs uppercase font-bold text-rose-800 tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                Regular City Flat / Apartment
              </span>
              <span className="text-xs text-rose-700 font-semibold">Typical City Life</span>
            </div>

            <ul className="space-y-3.5">
              {comparisonPoints.cityFlat.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#4A2018] leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Senior Living Foundation (Green / Luxury) */}
          <div className="p-8 rounded-3xl bg-[#EAF2EE]/80 border-2 border-[#2C5E50]/40 shadow-md space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#CDE0D7]">
              <span className="font-mono text-xs uppercase font-bold text-[#2C5E50] tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Senior Living Citizen Foundation
              </span>
              <span className="text-xs bg-[#2C5E50] text-white px-2.5 py-0.5 rounded-full font-bold">
                Purpose-Built
              </span>
            </div>

            <ul className="space-y-3.5">
              {comparisonPoints.seniorLiving.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0D2329] font-medium leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Eight Deep Benefits (The Full Picture) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C58F58]">
              THE FULL PICTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              Eight reasons this <span className="italic font-serif text-[#2C5E50]">changes everything.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {deepBenefits.map((benefit) => (
              <div
                key={benefit.num}
                className="p-7 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#2C5E50] hover:shadow-lg transition-all duration-300 flex items-start gap-5 group"
              >
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C58F58]/50 group-hover:text-[#C58F58] shrink-0 transition-colors">
                  {benefit.num}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg sm:text-xl font-serif-heading font-bold text-[#0D2329] group-hover:text-[#2C5E50] transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassuring CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#0D2329] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h4 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#FAF8F5]">
              Still have questions? <span className="italic font-serif text-[#E0AB77]">Come and see.</span>
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              A site visit answers more than any webpage can. Walk the land in Kheri Asra, inspect the architectural hospital blueprints, and meet the advisory team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openLeadDrawer({ title: 'Book Site Walkthrough', actionType: 'book-site-visit' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#B37E47] text-white text-xs font-bold transition-all shadow-lg text-center"
            >
              Book a Site Visit
            </button>
            <a
              href="tel:+9199999558447"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Call: +91 99999558447
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
