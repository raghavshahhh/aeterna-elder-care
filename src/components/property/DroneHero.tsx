'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  ArrowDown,
  Building,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  Video
} from 'lucide-react';

export const DroneHero: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#071519] text-white pt-24 pb-12">
      {/* Background Drone Visual / Atmosphere Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
          alt="Aerial Drone View of Location & Surrounding Green Belt"
          fill
          priority
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Gradients to create luxury depth and vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071519] via-[#071519]/60 to-[#071519]/80" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#071519]/40 to-[#071519]/90" />
      </div>

      {/* Floating Aerial Metadata Badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#FAF8F5]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide uppercase text-[11px]">
              Real Location Groundwork • Pre-Launch Architecture
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>{projectOverview.locationShort}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{projectOverview.levels}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>Phase 1: 3 Exclusive Suites</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Narrative Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-16 my-auto">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C58F58] block">
              The Next Evolution of Elder Living & Longevity
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5] leading-[1.12]">
              A New Standard of Living, <span className="italic font-serif text-[#C58F58]">Wellness & Care.</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl">
            An upcoming private sanctuary integrating luxury 1 RK & 1 BHK residences with an on-premise Ayurvedic hospital wing, 24×7 ICU triage, and vibrant senior community living.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-2">
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">9</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Planned Suites</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-emerald-400">01–03</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Phase 1 Release</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#C58F58]">24×7</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Clinical Care</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">35k</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Sq. Ft. Campus</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
            <Button
              size="lg"
              className="bg-[#2C5E50] hover:bg-[#3D7363] text-white shadow-xl shadow-[#2C5E50]/30 py-4 px-7 font-semibold text-sm sm:text-base"
              onClick={() => scrollToSection('master-plan')}
              leftIcon={<Compass className="w-5 h-5" />}
            >
              Explore Master Plan & Suites ↓
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/25 text-white hover:bg-white/10 backdrop-blur-md py-4 px-6 text-sm sm:text-base font-medium"
              onClick={() => openLeadDrawer({ title: 'Schedule Private Site & Blueprint Walkthrough', actionType: 'book-site-visit' })}
              leftIcon={<Calendar className="w-4 h-4 text-[#C58F58]" />}
            >
              Schedule Site Visit
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white hover:bg-white/5 py-4 px-4 text-sm"
              onClick={() => openWhatsApp({ actionType: 'reserve-unit', unitName: 'Residence 01' })}
            >
              Reserve Priority Unit →
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Teaser Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-white/80">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase text-[10px] tracking-wider border border-emerald-500/30">
              Live Phase Status
            </span>
            <span>
              Ground Floor Suites (01, 02, 03) currently open for early reservation. Suites 04–09 reserved for Phase 2 release.
            </span>
          </div>
          <button
            onClick={() => scrollToSection('location')}
            className="text-[#C58F58] hover:text-white flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px] shrink-0"
          >
            Location & Connectivity <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
