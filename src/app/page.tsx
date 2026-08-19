'use client';

import React, { useState } from 'react';
import { DroneHero } from '@/components/property/DroneHero';
import { EmotionalFamilyStory } from '@/components/property/EmotionalFamilyStory';
import { ValuesAndVision } from '@/components/property/ValuesAndVision';
import { LocationConnectivity } from '@/components/property/LocationConnectivity';
import { AvailabilityMatrix } from '@/components/property/AvailabilityMatrix';
import { BuildingCGIViewer } from '@/components/property/BuildingCGIViewer';
import { ResidenceUnitExplorer } from '@/components/property/ResidenceUnitExplorer';
import { EcosystemShowcase } from '@/components/property/EcosystemShowcase';
import { WhySeniorLivingBenefits } from '@/components/property/WhySeniorLivingBenefits';
import { FinancePaymentPlans } from '@/components/property/FinancePaymentPlans';
import { ArchitectSection } from '@/components/property/ArchitectSection';
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
  Compass
} from 'lucide-react';

export default function HomePage() {
  const [selectedFloor, setSelectedFloor] = useState<FloorLevel>('ground');
  const { openWhatsApp, openLeadDrawer } = useModal();

  const handleFloorSelectFromCGI = (floorId: FloorLevel) => {
    setSelectedFloor(floorId);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#0D2329] selection:bg-[#2C5E50] selection:text-white">
      {/* 1. WARM EMOTIONAL HERO WITH INDIAN SENIOR GRANDPARENTS */}
      <DroneHero />

      {/* 2. EMOTIONAL FAMILY STORY & SUKOON PROMISE */}
      <EmotionalFamilyStory />

      {/* 3. FOUNDATION VALUES & VISION STATEMENT */}
      <ValuesAndVision />

      {/* 4. REAL LOCATION & CONNECTIVITY (KHERI ASRA / RELIANCE MET CITY / SH-22) */}
      <LocationConnectivity />

      {/* 5. 64 FREEHOLD RESIDENTIAL PLOTS MASTER PLAN (BLOCKS A TO F) */}
      <AvailabilityMatrix />

      {/* 6. 9-UNIT SENIOR RESIDENCES ELEVATION (UNITS 01-03 CURRENT RELEASE) */}
      <BuildingCGIViewer onSelectFloor={handleFloorSelectFromCGI} />

      {/* 7. 1 BHK & 1 RK RESIDENCE VISUALIZER (ROOM DIMENSIONS, SENIOR SPECS & PRICING) */}
      <ResidenceUnitExplorer />

      {/* 8. HEALTHCARE AT YOUR DOORSTEP (6 SIMPLIFIED HIGHLIGHTS + HOSPITAL CAD ACCESS) */}
      <EcosystemShowcase />

      {/* 9. NOT A RETIREMENT HOME: 8 DEEP BENEFITS & COMPARISON */}
      <WhySeniorLivingBenefits />

      {/* 10. FINANCE, HOME LOANS & 3 PAYMENT PLANS */}
      <FinancePaymentPlans />

      {/* 11. ARCHITECT CREDENTIALS & THE VISION ARCHITECTS */}
      <ArchitectSection />

      {/* 12. PROPERTY SPECIFIC FAQS */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-normal text-[#0D2329]">
              Everything You Need to <span className="italic font-serif text-[#C58F58]">Know.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#53676E]">
              Clear answers for sons, daughters, and families planning for their parents&apos; future home.
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

      {/* 13. FINAL CONVERSION & SITE WALKTHROUGH BANNER */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0D2329] via-[#14353E] to-[#071519] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#C58F58] uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            Phase 1 Pre-Launch Allotments Open
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal text-[#FAF8F5] tracking-tight leading-tight">
            Give Your Parents the <br className="hidden sm:block" />
            <span className="italic font-serif text-[#C58F58]">Sanctuary They Deserve.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Freehold registered land, proposed on-site Ayurvedic hospital, daily mandir, and like-minded companions at the same stage of life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to book a private site visit to Kheri Asra with my family...' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2.5"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              Book Site Walk on WhatsApp →
            </button>

            <button
              onClick={() => openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20 flex items-center justify-center gap-2"
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
