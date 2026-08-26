// src/components/leadership/OwnerFeatureSection.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LeadershipProfile } from "@/types/leadership";
import { SocialLinksRow } from "./SocialLinksRow";
import { OwnerTimelineSection } from "./OwnerTimelineSection";
import { CompanyAssociationsSection } from "./CompanyAssociationsSection";
import {
  ShieldCheck,
  Building2,
  Award,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Maximize2,
  X
} from "lucide-react";

interface OwnerFeatureSectionProps {
  owner: LeadershipProfile;
}

export const OwnerFeatureSection: React.FC<OwnerFeatureSectionProps> = ({ owner }) => {
  const [fullscreenImage, setFullscreenImage] = useState(false);

  const hasPortrait = Boolean(owner.portrait && owner.portrait.trim().length > 0);
  const hasTimeline = Boolean(owner.careerTimeline && owner.careerTimeline.length > 0);
  const hasCompanies = Boolean(owner.companies && owner.companies.length > 0);
  const hasAchievements = Boolean(owner.achievements && owner.achievements.length > 0);
  const hasAwards = Boolean(owner.awards && owner.awards.length > 0);

  return (
    <section id="founder-feature" className="py-16 sm:py-24 bg-white text-[#0D2329] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-[#2C5E50] text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FOUNDER &amp; CHIEF PATRON</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] tracking-tight">
            Institutional Leadership
          </h2>
          <p className="text-sm text-[#53676E] max-w-2xl font-light">
            Guiding the governance, institutional ethics, and holistic development standards of the Senior Living Citizens Foundation.
          </p>
        </div>

        {/* Large Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Portrait Frame (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#0D2329] border border-[#E8E2D8] shadow-2xl group flex items-center justify-center">
              {hasPortrait ? (
                <>
                  <Image
                    src={owner.portrait!}
                    alt={owner.portraitAlt || owner.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <button
                    onClick={() => setFullscreenImage(true)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-[#0D2329]/80 backdrop-blur-md text-white/90 hover:text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
                    aria-label="View portrait fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="p-8 text-center space-y-4 text-white/80">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-[#14323A] border border-[#C58F58]/40 flex items-center justify-center shadow-xl">
                    <img
                      src="/project-assets/brand/logo-icon-clean.png"
                      alt="Senior Living Citizens Foundation Crest"
                      className="w-12 h-12 object-contain drop-shadow"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-serif-heading font-bold text-[#E0AB77]">
                      Senior Living Citizens Foundation
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                      Founder Profile Slot
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 text-[10px] font-mono">
                      <ShieldCheck className="w-3 h-3 text-[#C58F58]" />
                      <span>Official Portrait Pending Clearance</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Verification & Secretariat Note */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-[#53676E] space-y-1.5 font-light">
              <div className="flex items-center gap-2 text-[#2C5E50] font-bold text-[11px] font-mono uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Foundation Trust Governance</span>
              </div>
              <p>
                Leadership credentials and institutional registrations are documented under Section 8 NPO bylaws.
              </p>
            </div>
          </div>

          {/* Right Column: Profile & Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header / Name / Designation */}
            <div className="space-y-2 pb-6 border-b border-[#E8E2D8]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
                  {owner.name}
                </h3>
                {owner.verificationBadge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/10 border border-emerald-500/30 text-emerald-800 text-[11px] font-bold">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{owner.verificationBadge.label}</span>
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                <div className="text-sm sm:text-base font-semibold text-[#C58F58] font-serif-heading">
                  {owner.designation}
                </div>
                {owner.subDesignation && (
                  <div className="text-xs text-[#53676E] font-mono">
                    {owner.subDesignation}
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="pt-2">
                <SocialLinksRow socialLinks={owner.socialLinks} personName={owner.name} />
              </div>
            </div>

            {/* Short Bio */}
            {owner.shortBio && (
              <p className="text-base text-[#0D2329] font-medium leading-relaxed">
                {owner.shortBio}
              </p>
            )}

            {/* Detailed Multi-paragraph Biography */}
            {owner.biography && owner.biography.length > 0 && (
              <div className="space-y-3 text-sm text-[#53676E] font-light leading-relaxed">
                {owner.biography.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}

            {/* Current Role */}
            {owner.currentRole && (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#53676E]">
                  Current Executive Focus
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0D2329]">
                  {owner.currentRole}
                </p>
              </div>
            )}

            {/* Areas of Expertise */}
            {owner.expertise && owner.expertise.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C58F58] block">
                  Core Competencies &amp; Domain Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {owner.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-semibold text-[#2C5E50]"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements & Recognitions (if populated) */}
            {hasAchievements && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C58F58] block">
                  Key Achievements
                </span>
                <ul className="space-y-1.5 text-xs text-[#53676E]">
                  {owner.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2C5E50] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Awards (if populated) */}
            {hasAwards && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C58F58] block">
                  Honors &amp; Recognitions
                </span>
                <ul className="space-y-1.5 text-xs text-[#53676E]">
                  {owner.awards.map((aw, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Award className="w-3.5 h-3.5 text-[#C58F58] shrink-0 mt-0.5" />
                      <span>{aw}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Conditional Sub-sections */}
        {hasTimeline && (
          <OwnerTimelineSection timeline={owner.careerTimeline} personName={owner.name} />
        )}

        {hasCompanies && (
          <CompanyAssociationsSection companies={owner.companies} />
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && hasPortrait && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenImage(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close portrait view"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-3xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={owner.portrait!}
              alt={owner.portraitAlt || owner.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};
