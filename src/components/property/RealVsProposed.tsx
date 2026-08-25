'use client';

import React from 'react';
import Link from 'next/link';
import { realVsProposedItems, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  MapPin,
  Building2,
  FileText,
  Stethoscope,
  Trees,
  Navigation,
  Heart,
  Layers,
  ShieldCheck,
  ArrowRight,
  Eye,
  Calendar,
  MessageSquare,
  Video,
  ExternalLink
} from 'lucide-react';

export const RealVsProposed: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  return (
    <section id="reality-vs-vision" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5 text-[#C58F58]" />
            05 • Full Transparency &amp; Real Status
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#0D2329]">
            What Exists Today vs. <span className="italic font-serif text-[#C58F58]">What We Are Building.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            We believe luxury starts with complete honesty. The physical building is currently in the pre-launch planning and land-demarcation stage. Here is a transparent breakdown of ground reality versus our approved master vision.
          </p>
        </div>

        {/* Visual Real Land vs Proposed Vision Split Banner */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* REAL SITE PHOTO */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[380px] border border-[#E8E2D8] shadow-lg group">
            <img
              src={projectOverview.heroPosterImage}
              alt="Real Jhajjar Site Land — Drone Footage"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md">
              Real Site Today (Kheri Asra)
            </div>
            <Link
              href="/gallery"
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-black/80 transition-colors"
            >
              <Video className="w-3.5 h-3.5 text-[#C58F58]" /> Watch Full Drone Video →
            </Link>
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <h4 className="font-serif-heading text-xl font-bold text-[#FAF8F5]">
                11+ Acres Demarcated Freehold Farmland
              </h4>
              <p className="text-xs text-white/80 font-light">
                Direct State Highway 22 frontage, boundary stones placed, ready for scheduled physical on-site visits.
              </p>
            </div>
          </div>

          {/* PROPOSED DEVELOPMENT — REAL ARCHITECT CAD, NOT STOCK IMAGERY */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[380px] border border-[#14353E] shadow-lg group bg-white">
            <img
              src={projectOverview.images.masterPlanCad}
              alt="Proposed Masterplan — Architectural CAD Drawing by The Vision Architects"
              className="absolute inset-0 w-full h-full object-contain opacity-95 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#C58F58] text-[#071519] text-xs font-mono font-bold uppercase tracking-wider shadow-md">
              Proposed Development (Architect CAD)
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <h4 className="font-serif-heading text-xl font-bold text-[#FAF8F5]">
                Integrated Vedic Senior Living Community
              </h4>
              <p className="text-xs text-white/80 font-light">
                64 Freehold plots, G+2 residence building with stilt parking, and 30k sq. ft. Ayurvedic Hospital &amp; Mandir.
              </p>
            </div>
          </div>
        </div>

        {/* Official YouTube Walkthrough Video Player */}
        <div className="mb-14 bg-[#071519] border border-[#163942] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5 text-red-400" /> Official Site Drone &amp; Ground Walkthrough
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-white mt-2">
                Watch the Land, SH-22 Frontage &amp; Ground Video on YouTube
              </h3>
            </div>
            <a
              href={projectOverview.droneYoutubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-lg self-start sm:self-auto cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> Watch on YouTube (HD) ↗
            </a>
          </div>

          <div className="w-full h-[260px] sm:h-[440px] lg:h-[540px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative">
            <iframe
              src="https://www.youtube.com/embed/jiEwQ6RA2HI?rel=0&modestbranding=1"
              title="Senior Living Citizen Foundation — Official Site Drone & Ground Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 pt-2 border-t border-white/10">
            <span>Demarcated freehold land &amp; SH-22 highway entrance • Kheri Asra, Jhajjar</span>
            <span className="font-mono text-[#C58F58]">1080p Full HD • Verified Ground Evidence</span>
          </div>
        </div>

        {/* 2-Column Split: TODAY vs PROPOSED */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* Column 1: WHAT EXISTS TODAY (REALITY) */}
          <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-7 sm:p-9 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-700 text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-bl-2xl">
              REALITY TODAY
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  Physical Land &amp; Architectural Stage
                </div>
                <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  Demarcated Land &amp; Verified Highway Access
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#53676E]">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-1.5">
                  <strong className="text-[#0D2329] block text-sm">Freehold Land in Kheri Asra, Haryana</strong>
                  <p className="text-xs text-[#53676E] leading-relaxed">
                    Physical plot boundaries and township perimeter clearly demarcated on ground. Ready for physical on-site walkthroughs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-1.5">
                  <strong className="text-[#0D2329] block text-sm">Direct State Highway 22 (SH-22) Access</strong>
                  <p className="text-xs text-[#53676E] leading-relaxed">
                    Existing wide paved highway connectivity connecting smoothly to Farrukhnagar, Reliance MET City, Gurugram, and Jhajjar.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-1.5">
                  <strong className="text-[#0D2329] block text-sm">Architectural Blueprints by The Vision Architects</strong>
                  <p className="text-xs text-[#53676E] leading-relaxed">
                    Complete CAD master plans, floor layouts, soil testing reports, and structural drawings finalized for municipal submissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8E2D8] flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ground Demarcation Complete
              </span>
              <button
                onClick={() => openLeadDrawer({ title: 'Schedule Site Walk to Walk the Land', actionType: 'book-site-visit' })}
                className="text-xs font-bold text-[#2C5E50] hover:underline flex items-center gap-1"
              >
                Walk the Land →
              </button>
            </div>
          </div>

          {/* Column 2: WHAT WE ARE BUILDING (THE PROPOSED MASTER VISION) */}
          <div className="bg-[#0D2329] text-white rounded-3xl border border-white/15 p-7 sm:p-9 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#C58F58] text-[#0D2329] text-[10px] font-mono font-bold uppercase tracking-widest rounded-bl-2xl">
              THE PROPOSED VISION
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#E0AB77]">
                  <Building2 className="w-4 h-4 text-[#C58F58]" />
                  Proposed Development &amp; Ecosystem
                </div>
                <h3 className="text-2xl font-serif-heading font-bold text-white">
                  64 Plotted Township &amp; 30k Sqft Hospital
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-white/80">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <strong className="text-[#FAF8F5] block text-sm">64 Freehold Residential Plots (Blocks A–F)</strong>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Gated community with 33ft paved arterial roads, underground utility ducts, continuous 5ft–6ft tree buffer belts, and individual registered titles.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <strong className="text-[#FAF8F5] block text-sm">9 Senior Residences (G+2 Building with Stilt)</strong>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Single-floor barrier-free living, dual wheelchair lifts, gradual 6&quot; rise stairs, covered stilt car parking bays, and 1 BHK / 1 RK senior suites.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <strong className="text-[#FAF8F5] block text-sm">On-Site Ayurvedic Hospital &amp; Mandir</strong>
                  <p className="text-xs text-white/70 leading-relaxed">
                    30,000 sq. ft. planned hospital with 6 OPDs, 9 Panchakarma suites, emergency triage bay, and a western-perimeter community temple.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#E0AB77] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C58F58]" /> Phase 1 Pre-Launch Allotments Open
              </span>
              <button
                onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, please send the complete Master Plan and Architectural Blueprint Dossier...' })}
                className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1"
              >
                Get CAD Dossier →
              </button>
            </div>
          </div>
        </div>

        {/* Reassuring Transparency Callout */}
        <div className="p-6 rounded-3xl bg-[#EAF2EE] border border-[#CDE0D7] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2C5E50] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0D2329]">
                All Architectural CGI Renders are Labeled as &quot;Proposed Visualization&quot;
              </h4>
              <p className="text-xs text-[#53676E]">
                We invite every prospective family to schedule a private on-site visit to inspect the physical location and surroundings in person.
              </p>
            </div>
          </div>

          <button
            onClick={() => openLeadDrawer({ title: 'Schedule Free Private Site Walk', actionType: 'book-site-visit' })}
            className="px-5 py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#C58F58]" />
            Book Site Walk in Kheri Asra
          </button>
        </div>
      </div>
    </section>
  );
};

