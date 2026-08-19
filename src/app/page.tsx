'use client';

import React, { useState } from 'react';
import { DroneHero } from '@/components/property/DroneHero';
import { EmotionalFamilyStory } from '@/components/property/EmotionalFamilyStory';
import { LocationConnectivity } from '@/components/property/LocationConnectivity';
import { BuildingCGIViewer } from '@/components/property/BuildingCGIViewer';
import { MasterPlanExplorer } from '@/components/property/MasterPlanExplorer';
import { ResidenceUnitExplorer } from '@/components/property/ResidenceUnitExplorer';
import { EcosystemShowcase } from '@/components/property/EcosystemShowcase';
import { DevelopmentRoadmap } from '@/components/property/DevelopmentRoadmap';
import { AvailabilityMatrix } from '@/components/property/AvailabilityMatrix';
import { propertyFaqs, projectOverview } from '@/data/propertyData';
import { Accordion } from '@/components/ui/Accordion';
import { useModal } from '@/context/ModalContext';
import { FloorId, ResidenceUnit } from '@/types';
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
  const [selectedFloor, setSelectedFloor] = useState<FloorId>('ground');
  const [selectedUnit, setSelectedUnit] = useState<string>('01');
  const { openWhatsApp, openLeadDrawer } = useModal();

  const handleFloorSelectFromCGI = (floorId: FloorId) => {
    setSelectedFloor(floorId);
  };

  const handleUnitSelectFromMasterPlan = (unit: ResidenceUnit) => {
    setSelectedUnit(unit.id);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#0D2329] selection:bg-[#2C5E50] selection:text-white">
      {/* 1. WARM EMOTIONAL HERO WITH INDIAN SENIOR GRANDPARENTS */}
      <DroneHero />

      {/* 2. EMOTIONAL FAMILY STORY & SUKOON PROMISE */}
      <EmotionalFamilyStory />

      {/* 3. REAL LOCATION & CONNECTIVITY */}
      <LocationConnectivity />

      {/* 4. PROPOSED 3D ARCHITECTURAL EXTERIOR ELEVATION */}
      <BuildingCGIViewer onSelectFloor={handleFloorSelectFromCGI} />

      {/* 5. INTERACTIVE MASTER PLAN & CAD FLOOR EXPLORER */}
      <MasterPlanExplorer
        selectedFloorId={selectedFloor}
        onSelectUnit={handleUnitSelectFromMasterPlan}
      />

      {/* 6. 1 RK & 1 BHK RESIDENCE VISUALIZER (2D BLUEPRINT + 3D INTERIOR CGI) */}
      <ResidenceUnitExplorer initialUnitId={selectedUnit} />

      {/* 7. MODULAR 3-PILLAR ECOSYSTEM (HEALTHCARE, AYURVEDA, LIFESTYLE) */}
      <EcosystemShowcase />

      {/* 8. DEVELOPMENT ROADMAP (FROM VISION TO REALITY) */}
      <DevelopmentRoadmap />

      {/* 9. 64 PLOTS AVAILABILITY MATRIX & EARLY RESERVATION */}
      <AvailabilityMatrix />

      {/* 10. PROPERTY SPECIFIC FAQS */}
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
            <p className="text-xs sm:text-sm text-[#53676E] max-w-xl mx-auto">
              Clear answers regarding pre-launch booking, on-premise medical infrastructure, unit dimensions, and site visits.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
            <Accordion
              items={propertyFaqs.map((faq, index) => ({
                id: `faq-${index}`,
                title: faq.question,
                content: (
                  <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed pt-1">
                    {faq.answer}
                  </p>
                )
              }))}
            />
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#14353E]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#2C5E50] shrink-0" />
              <span>Have a specific architectural or clinical question?</span>
            </div>
            <button
              onClick={() => openWhatsApp({ actionType: 'general', message: 'I have a specific question about Senior Living Citizen Foundation...' })}
              className="font-bold text-[#2C5E50] hover:underline shrink-0"
            >
              Ask Senior Advisor on WhatsApp →
            </button>
          </div>
        </div>
      </section>

      {/* 11. FINAL CONVERSION BANNER */}
      <section className="py-20 bg-[#071519] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#C58F58] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Senior Living Citizen Foundation Desk
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-normal text-white max-w-3xl mx-auto leading-tight">
            Secure Your Plot or Home at <span className="italic font-serif text-[#C58F58]">Senior Living Citizen.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Phase 1 plot allotments and 1BHK/2BHK senior apartment bookings are open across Blocks A to F. Connect with our advisory desk to review full CAD blueprints and schedule your private site walkthrough in Kheri Asra, Jhajjar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to reserve a plot / apartment at Senior Living Citizen Foundation...' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white font-semibold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (+91 99999558447) →
            </button>
            <button
              onClick={() => openLeadDrawer({ title: 'Schedule Private Site & CAD Walkthrough', actionType: 'book-site-visit' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#C58F58]" />
              Schedule Private Site Walkthrough
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
