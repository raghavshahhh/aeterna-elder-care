'use client';

import React from 'react';
import { coreValues, projectOverview } from '@/data/propertyData';
import { Sparkles, Shield, Heart, Users, Compass, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

export const ValuesAndVision: React.FC = () => {
  return (
    <section id="vision" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Vision Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
              Our Foundation Vision
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-[#0D2329] tracking-tight leading-tight">
              Built for the years when <span className="italic font-serif text-[#C58F58]">life begins again.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#53676E] leading-relaxed">
              Most Indian cities weren&apos;t designed with the elderly in mind — crowded lanes, no walkable space, and hospitals across town. We set out to build the opposite.
            </p>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              A plotted community where the land is in your name, the home is built to your body, and neighbours share the same chapter of life as you.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0D2329] text-white shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-[#C58F58]/10 blur-2xl pointer-events-none" />
              <div className="font-serif italic text-xl sm:text-2xl text-[#F2EADA] leading-relaxed">
                &ldquo;{projectOverview.visionStatement}&rdquo;
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono tracking-widest text-[#E0AB77] uppercase">
                <span>Project Vision Statement</span>
                <span>Haryana · 124104</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Values Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C58F58]">
              WHAT WE STAND FOR
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              Four values that shape <span className="italic font-serif text-[#2C5E50]">every decision.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val) => (
              <div
                key={val.num}
                className="bg-white rounded-3xl p-7 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="text-4xl font-serif font-bold text-[#C58F58]/60 group-hover:text-[#C58F58] transition-colors">
                    {val.num}
                  </div>
                  <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#E8E2D8]/60 flex items-center gap-1.5 text-xs text-[#2C5E50] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Integrated from Day 1</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Key Metric Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14">
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center">
            <div className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#2C5E50]">64</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#53676E] mt-1 font-medium">Total Residential Plots</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center">
            <div className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#2C5E50]">6</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#53676E] mt-1 font-medium">Residential Blocks (A–F)</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center">
            <div className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#C58F58]">30k</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#53676E] mt-1 font-medium">Sqft Ayurvedic Hospital</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center">
            <div className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#2C5E50]">33 ft</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#53676E] mt-1 font-medium">Main Arterial Road Width</div>
          </div>
        </div>
      </div>
    </section>
  );
};
