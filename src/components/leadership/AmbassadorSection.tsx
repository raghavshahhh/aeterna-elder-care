// src/components/leadership/AmbassadorSection.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LeadershipProfile } from "@/types/leadership";
import { AmbassadorDetailDrawer } from "./AmbassadorDetailDrawer";
import { SocialLinksRow } from "./SocialLinksRow";
import {
  Award,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Sparkles,
  UserCheck
} from "lucide-react";

interface AmbassadorSectionProps {
  ambassadors: LeadershipProfile[];
}

export const AmbassadorSection: React.FC<AmbassadorSectionProps> = ({ ambassadors }) => {
  const [selectedAmbassador, setSelectedAmbassador] = useState<LeadershipProfile | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenProfile = (amb: LeadershipProfile) => {
    setSelectedAmbassador(amb);
    setDrawerOpen(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] text-[#0D2329] border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-[#2C5E50] text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <Award className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>FOUNDATION AMBASSADORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] tracking-tight">
            Distinguished Patrons &amp; Ambassadors
          </h2>
          <p className="text-sm text-[#53676E] max-w-2xl font-light">
            Eminent domain leaders and community patrons advising on senior healthcare, active ageing, and cultural fellowship.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ambassadors.map((amb) => {
            const hasPortrait = Boolean(amb.portrait && amb.portrait.trim().length > 0);

            return (
              <div
                key={amb.id}
                className="rounded-3xl bg-white border border-[#E8E2D8] p-6 sm:p-7 space-y-5 hover:border-[#C58F58]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Portrait / Avatar Slot */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0D2329] border border-[#E8E2D8] flex items-center justify-center shadow-inner group-hover:border-[#C58F58]/40 transition-colors">
                    {hasPortrait ? (
                      <Image
                        src={amb.portrait!}
                        alt={amb.portraitAlt || amb.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="p-6 text-center space-y-2 text-white/80">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#14323A] border border-[#C58F58]/40 flex items-center justify-center">
                          <img
                            src="/project-assets/brand/logo-icon-clean.png"
                            alt="SLCF Emblem"
                            className="w-7 h-7 object-contain opacity-90"
                          />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77] block">
                          Ambassador Slot
                        </span>
                      </div>
                    )}

                    {amb.verificationBadge && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0D2329]/85 backdrop-blur-md border border-white/20 text-white text-[9px] font-mono font-bold flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-[#C58F58]" />
                        <span>{amb.verificationBadge.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Ambassador Info */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-serif-heading font-bold text-[#0D2329] group-hover:text-[#2C5E50] transition-colors">
                      {amb.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#C58F58] font-serif-heading">
                      {amb.designation}
                    </div>
                    {amb.subDesignation && (
                      <div className="text-[11px] text-[#53676E]">
                        {amb.subDesignation}
                      </div>
                    )}
                  </div>

                  {/* Short Introduction */}
                  {amb.shortBio && (
                    <p className="text-xs text-[#53676E] leading-relaxed font-light line-clamp-3">
                      {amb.shortBio}
                    </p>
                  )}

                  {/* Expertise Tags */}
                  {amb.expertise && amb.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {amb.expertise.slice(0, 3).map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E8E2D8] text-[10px] font-medium text-[#2C5E50]"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Socials + View Full Profile CTA */}
                <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
                  <SocialLinksRow socialLinks={amb.socialLinks} personName={amb.name} />

                  <button
                    onClick={() => handleOpenProfile(amb)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#2C5E50] text-[#0D2329] hover:text-white border border-[#E8E2D8] hover:border-[#2C5E50] text-xs font-bold transition-all flex items-center justify-between cursor-pointer group/btn"
                  >
                    <span>View Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ambassador Detailed Profile Slide-over Drawer */}
      <AmbassadorDetailDrawer
        ambassador={selectedAmbassador}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  );
};
