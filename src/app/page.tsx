'use client';

import React, { useState } from 'react';
import { DroneHero } from '@/components/property/DroneHero';
import { ProjectIntroduction } from '@/components/property/ProjectIntroduction';
import { EmotionalFamilyStory } from '@/components/property/EmotionalFamilyStory';
import { WhySeniorLivingBenefits } from '@/components/property/WhySeniorLivingBenefits';
import { LocationConnectivity } from '@/components/property/LocationConnectivity';
import { RealVsProposed } from '@/components/property/RealVsProposed';
import { FutureHomeJourney } from '@/components/3d/FutureHomeJourney';
import { BuildingCGIViewer } from '@/components/property/BuildingCGIViewer';
import { ResidenceUnitExplorer } from '@/components/property/ResidenceUnitExplorer';
import { WhatYouGetPillars } from '@/components/property/WhatYouGetPillars';
import { EcosystemShowcase } from '@/components/property/EcosystemShowcase';
import { AvailabilityMatrix } from '@/components/property/AvailabilityMatrix';
import { FinancePaymentPlans } from '@/components/property/FinancePaymentPlans';
import { TrustTransparency } from '@/components/property/TrustTransparency';
import { PersonalizedJourneySelector } from '@/components/property/PersonalizedJourneySelector';
import { BuyerJourneyOnboarding } from '@/components/property/BuyerJourneyOnboarding';
import { propertyFaqs, projectOverview } from '@/data/propertyData';

import { Accordion } from '@/components/ui/Accordion';
import { useModal } from '@/context/ModalContext';
import { FloorLevel } from '@/types';
import {
  HelpCircle,
  MessageSquare,
  Building2,
  Calendar,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [selectedFloor, setSelectedFloor] = useState<FloorLevel>('ground');
  const { openWhatsApp, openLeadDrawer } = useModal();

  const handleFloorSelectFromCGI = (floorId: FloorLevel) => {
    setSelectedFloor(floorId);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#0D2329] selection:bg-[#2C5E50] selection:text-white">
      {/* 01 — REAL DRONE HERO (WITH VIDEO SLOT, BADGES & ELEVATED TYPOGRAPHY) */}
      <DroneHero />

      {/* PERSONALIZED DISCOVERY SELECTOR (FOR PARENTS / RETIREMENT / PLOT / RESIDENCE / TRUST) */}
      <PersonalizedJourneySelector />

      {/* 02 — PROJECT INTRODUCTION (MASTER PLOTTED SANCTUARY & HOSPITAL OVERVIEW) */}
      <ProjectIntroduction />

      {/* 03 — WHY THIS KIND OF LIVING / WHY SENIOR LIVING (FAMILY PERSPECTIVE) */}
      <div id="family-story">
        <EmotionalFamilyStory />
      </div>
      <div id="why-senior-living">
        <WhySeniorLivingBenefits />
      </div>

      {/* 04 — REAL LOCATION & SURROUNDINGS (KHERI ASRA / RELIANCE MET CITY / SH-22) */}
      <div id="location-connectivity">
        <LocationConnectivity />
      </div>

      {/* 05 — WHAT EXISTS TODAY VS. WHAT WE ARE BUILDING (TRANSPARENT PRE-LAUNCH STAGING) */}
      <RealVsProposed />

      {/* GUIDED 3D JOURNEY — WALK INTO YOUR FUTURE HOME */}
      <FutureHomeJourney />

      {/* 06 & 07 — PROPOSED BUILDING VISUAL & INTERACTIVE 4-TIER FLOOR EXPLORER */}
      <BuildingCGIViewer onSelectFloor={handleFloorSelectFromCGI} />

      {/* 08 & 09 — RESIDENCE UNIT EXPLORER & MEASURED FLOOR PLAN VISUALIZER */}
      <div id="residences-explorer">
        <ResidenceUnitExplorer />
      </div>

      {/* 10 — WHAT YOU GET (5 CONCISE BENEFIT PILLARS: HOME, CARE, WELLNESS, COMMUNITY, CONVENIENCE) */}
      <WhatYouGetPillars />

      {/* 11 — HEALTHCARE, AYURVEDA & MANDIR ECOSYSTEM (ON-SITE HOSPITAL & CAD ACCESS) */}
      <EcosystemShowcase />

      {/* 12 & 13 — 64-PLOT MASTER PLAN & PLOT-BY-PLOT INVENTORY EXPLORER */}
      <div id="availability-matrix">
        <AvailabilityMatrix />
      </div>

      {/* 14, 15 & 16 — TRANSPARENT PRICING, 3 PAYMENT OPTIONS & RENTAL PROPOSITION */}
      <div id="payment-plans">
        <FinancePaymentPlans />
      </div>

      {/* 17 — TRUST & TRANSPARENCY (SECTION 8 / FORM 10AC/80G / DARPAN NPO / FREEHOLD TITLE) */}
      <div id="trust-transparency">
        <TrustTransparency />
      </div>

      {/* 18 — 6-STAGE BUYER ONBOARDING ROADMAP & TIMELINE */}
      <BuyerJourneyOnboarding />


      {/* 18 — FREQUENTLY ASKED QUESTIONS (FAMILY-TAILORED Q&AS) */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5 text-[#C58F58]" />
              18 • Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329]">
              Everything You Need to <span className="italic font-serif text-[#C58F58]">Know.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#53676E] max-w-2xl mx-auto leading-relaxed">
              Clear, transparent answers for sons, daughters, and families planning for their parents&apos; future sanctuary.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-8 shadow-sm">
            <Accordion
              items={propertyFaqs.map((faq, i) => ({
                id: `faq-${i}`,
                title: faq.question,
                content: faq.answer
              }))}
            />
          </div>
        </div>
      </section>

      {/* 19 & 20 — BOOK SITE VISIT & FINAL WHATSAPP CONVERSION ENGINE */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0D2329] via-[#14353E] to-[#071519] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#C58F58] uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            19 &amp; 20 • Phase 1 Pre-Launch Allotments Open
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal text-[#FAF8F5] tracking-tight leading-tight">
            Give Your Parents the <br className="hidden sm:block" />
            <span className="italic font-serif text-[#C58F58]">Sanctuary They Deserve.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Freehold registered land, proposed on-site Ayurvedic hospital, daily community mandir, and like-minded companions living at the same unhurried pace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openWhatsApp({ actionType: 'book-site-visit', message: 'Hello, I want to book a private site visit to Kheri Asra with my family...' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              Book Site Walk on WhatsApp →
            </button>

            <button
              onClick={() => openLeadDrawer({ title: 'Schedule Private Site Walk in Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#C58F58]" />
              Request Car Pickup &amp; Visit
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Freehold Registered Title
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bank Home Loan Support
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#C58F58]" /> Architecture by The Vision Architects
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

