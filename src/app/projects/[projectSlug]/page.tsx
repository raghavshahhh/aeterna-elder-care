'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Project } from '@/lib/db/schema';
import { useModal } from '@/context/ModalContext';
import {
  MapPin,
  Building2,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  Calendar,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Trees,
  Utensils,
  Sun,
  Activity,
  Layers
} from 'lucide-react';
import { FutureHomeJourney } from '@/components/3d/FutureHomeJourney';
import { BuildingCGIViewer } from '@/components/property/BuildingCGIViewer';
import { ResidenceUnitExplorer } from '@/components/property/ResidenceUnitExplorer';
import { AvailabilityMatrix } from '@/components/property/AvailabilityMatrix';
import { FinancePaymentPlans } from '@/components/property/FinancePaymentPlans';
import { TrustTransparency } from '@/components/property/TrustTransparency';
import { EcosystemShowcase } from '@/components/property/EcosystemShowcase';
import { FloorLevel } from '@/types';

export default function DynamicProjectPage() {
  const params = useParams();
  const slug = params?.projectSlug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState<FloorLevel>('ground');
  const { openLeadDrawer, openWhatsApp } = useModal();

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          const p = (data.projects || []).find((prj: Project) => prj.slug === slug);
          setProject(p || null);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setIsLoading(false);
      }
    }
    if (slug) loadProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#2C5E50] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#53676E]">Loading Sanctuary Masterplan...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return notFound();
  }

  // PRE-LAUNCH HARYANA EXPERIENCE
  if (project.slug === 'kheri-asra') {
    return (
      <main className="min-h-screen bg-[#FAF8F5] text-[#0D2329]">
        {/* Hero Header */}
        <section className="pt-28 sm:pt-36 pb-16 bg-[#0D2329] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EAF2EE] text-[#2C5E50] font-mono text-xs font-bold uppercase">
                {project.address}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                Pre-Launch Staging
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5] max-w-4xl">
              {project.headline}
            </h1>

            <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
              {project.subheadline}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openLeadDrawer({ actionType: 'site_visit' })}
                className="px-6 py-3.5 rounded-full bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-xl flex items-center gap-2 cursor-pointer font-mono"
              >
                <Calendar className="w-4 h-4 text-[#E0AB77]" />
                <span>Book Site Walkthrough</span>
              </button>

              <button
                onClick={() => openWhatsApp({ actionType: 'brochure', message: 'Hello, please share the Kheri Asra CAD masterplan dossier...' })}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-2 cursor-pointer font-mono"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Request CAD Dossier on WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3D Guided Journey */}
        <FutureHomeJourney />

        {/* 4-Tier Building Explorer */}
        <BuildingCGIViewer onSelectFloor={(fl) => setSelectedFloor(fl)} />

        {/* 1 RK / 1 BHK Unit Explorer & CAD Blueprints */}
        <ResidenceUnitExplorer />

        {/* Healthcare Ecosystem */}
        <EcosystemShowcase />

        {/* 64-Plot Availability Matrix */}
        <AvailabilityMatrix />

        {/* Commercial Pricing & Returns */}
        <FinancePaymentPlans />

        {/* Trust & Transparency */}
        <TrustTransparency />
      </main>
    );
  }

  // GOA EXPERIENCE — PLANNED STAGE (no real assets available yet)
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#0D2329]">
      {/* Hero Header */}
      <section className="pt-28 sm:pt-36 pb-16 bg-[#0D2329] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FAF2EB] text-[#C58F58] font-mono text-xs font-bold uppercase">
              {project.address}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              Coming Soon — Planning Stage
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5] max-w-4xl">
            {project.headline}
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            {project.subheadline}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => openLeadDrawer({ actionType: 'site_visit' })}
              className="px-6 py-3.5 rounded-full bg-[#C58F58] hover:bg-[#B37E47] text-white text-xs font-bold transition-all shadow-xl flex items-center gap-2 cursor-pointer font-mono"
            >
              <Calendar className="w-4 h-4" />
              <span>Register Your Interest</span>
            </button>

            <a
              href="tel:+919999955847"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-2 font-mono"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Speak to Goa Director: +91 99999 55847</span>
            </a>
          </div>
        </div>
      </section>

      {/* Planned Pillars Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C58F58] font-bold">
            PLANNED SANCTUARY FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            A Dignified Living Experience in Goa
          </h2>
          <p className="text-xs text-[#53676E] max-w-xl mx-auto">
            The following features are planned for this sanctuary. Details are subject to finalisation as the franchise plan progresses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(project.overview.features || []).map((f, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-md space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-heading font-bold text-[#0D2329]">{f.title}</h3>
              <p className="text-xs text-[#53676E] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planned Care & Wellness Services */}
      <section className="py-20 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2C5E50] font-bold">
              PLANNED CARE SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
              Planned Healthcare, Nutrition &amp; Care
            </h2>
            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              The following care services are planned for this sanctuary. All services are indicative and subject to finalisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(project.overview.healthcare || []).map((h, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0D2329]">
                  <HeartPulse className="w-4 h-4 text-[#C58F58]" />
                  <span>{h.name}</span>
                </div>
                <p className="text-xs text-[#53676E] leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <TrustTransparency />
    </main>
  );
}
