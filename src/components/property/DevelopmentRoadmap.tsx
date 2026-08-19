'use client';

import React from 'react';
import { developmentRoadmap } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DevelopmentRoadmap: React.FC = () => {
  const { openLeadDrawer } = useModal();

  return (
    <section id="roadmap" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            From Vision to Reality
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Our Development <span className="italic font-serif text-[#C58F58]">Milestones.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            We believe in 100% transparency. Follow our structured engineering phases from active foundation piling to turnkey senior possession.
          </p>
        </div>

        {/* Milestone Cards / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {developmentRoadmap.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in-progress';
            return (
              <div
                key={idx}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isInProgress
                    ? 'bg-[#0D2329] text-white border-[#2C5E50] shadow-xl scale-[1.03] ring-2 ring-emerald-500/30'
                    : isCompleted
                    ? 'bg-white text-[#0D2329] border-[#E8E2D8]'
                    : 'bg-[#FAF8F5] text-[#53676E] border-[#E8E2D8]/80 opacity-85'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isInProgress
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : isCompleted
                          ? 'bg-[#EAF2EE] text-[#2C5E50]'
                          : 'bg-[#EFE6D8] text-[#53676E]'
                      }`}
                    >
                      {milestone.phase}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isInProgress ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#899B9F] shrink-0" />
                    )}
                  </div>

                  <div>
                    <h4 className={`text-sm font-bold font-serif-heading leading-snug ${isInProgress ? 'text-white' : 'text-[#0D2329]'}`}>
                      {milestone.title}
                    </h4>
                    <div className={`text-[11px] font-mono mt-1 ${isInProgress ? 'text-[#C58F58]' : 'text-[#53676E]'}`}>
                      {milestone.timeline}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isInProgress ? 'text-white/70' : 'text-[#53676E]'}`}>
                    {milestone.description}
                  </p>
                </div>

                <div className={`pt-3 mt-3 border-t text-[11px] space-y-1.5 ${isInProgress ? 'border-white/10' : 'border-[#F0EBE1]'}`}>
                  {milestone.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 leading-tight">
                      <span className={isInProgress ? 'text-emerald-400' : 'text-[#2C5E50]'}>•</span>
                      <span className={isInProgress ? 'text-white/80' : 'text-[#53676E]'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Guarantee Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
              Pre-Launch Early Advantage
            </span>
            <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              Lock In Preferred Ground Floor Allocation Today
            </h4>
            <p className="text-xs sm:text-sm text-[#53676E]">
              Early registration secures your preferred unit layout, locked pre-launch pricing, and complimentary health checkup passes.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              size="lg"
              className="bg-[#2C5E50] hover:bg-[#1D4B57] text-white py-4 px-6 text-sm font-semibold"
              onClick={() => openLeadDrawer({ title: 'Register Pre-Launch Priority Allotment', actionType: 'reserve-unit' })}
            >
              Register Priority Allotment →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
