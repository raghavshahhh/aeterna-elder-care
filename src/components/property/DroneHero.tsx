'use client';

import React from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { projectOverview, plotsSummary } from '@/data/propertyData';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Building2,
  Sparkles,
  Calendar,
  MessageSquare,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  Home,
  Heart
} from 'lucide-react';

export const DroneHero: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#071519] text-white pt-24 pb-12">
      {/* Background Drone Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
          alt="Senior Living Citizen Foundation Actual Drone Location, Kheri Asra, Haryana"
          fill
          priority
          className="object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071519] via-[#071519]/65 to-[#071519]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/25 via-transparent to-[#071519]/90" />
      </div>

      {/* Top Location & Project Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 sm:pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest">UPCOMING PRE-LAUNCH PROJECT</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-white/75 text-xs">
            <a
              href={projectOverview.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#C58F58] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>Near Reliance MET City, SH-22 Jhajjar</span>
            </a>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 30,000 Sqft Planned Hospital
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Visual Presentation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-14 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Emotional Family Message */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C58F58]/15 border border-[#C58F58]/30 text-[#E0AB77] text-xs font-bold uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 text-[#C58F58] fill-[#C58F58]" />
                Senior Living Citizen Foundation
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5] leading-[1.12]">
                A Better Place for the <span className="italic font-serif text-[#C58F58]">People Who Raised You.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl">
              An upcoming senior-living community designed around comfort, accessibility, wellness, and peace of mind. Offering 64 residential plots and senior apartments with an on-site 30,000 sq. ft. Ayurvedic hospital and Mandir near Reliance MET City, SH-22 Jhajjar.
            </p>

            {/* 3 Key Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">64</div>
                <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Residential Plots</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-emerald-400">30k</div>
                <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Sqft Hospital (G+2)</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#C58F58]">G+2</div>
                <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Senior Residences</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Button
                size="lg"
                className="bg-[#2C5E50] hover:bg-[#3D7363] text-white py-4 px-7 text-sm sm:text-base font-semibold shadow-xl shadow-[#2C5E50]/30"
                onClick={() => scrollToSection('building-vision')}
                leftIcon={<Building2 className="w-5 h-5" />}
              >
                Explore the Project ↓
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 py-4 px-6 text-sm font-medium"
                onClick={() => openLeadDrawer({ title: 'Book Free Private Site Walkthrough', actionType: 'book-site-visit' })}
                leftIcon={<Calendar className="w-4 h-4 text-[#C58F58]" />}
              >
                Book a Site Visit
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-emerald-400 hover:text-white hover:bg-white/5 py-4 px-4 text-sm font-semibold"
                onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' })}
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Right: Live Township Snapshot */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C58F58] tracking-widest block font-mono">
                  CURRENT RELEASE STATUS
                </span>
                <h3 className="text-xl font-serif-heading font-bold text-white mt-0.5">
                  Phase 1 Allotments Open
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                Active Phase
              </span>
            </div>

            {/* Inventory Status Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="text-xl font-bold text-emerald-400">{plotsSummary.availableCount}</div>
                <div className="text-[10px] text-emerald-200/70 uppercase tracking-wider mt-0.5 font-medium">Plots Avail.</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="text-xl font-bold text-emerald-400">01–03</div>
                <div className="text-[10px] text-emerald-200/70 uppercase tracking-wider mt-0.5 font-medium">Ground Units</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
                <div className="text-xl font-bold text-amber-400">04–09</div>
                <div className="text-[10px] text-amber-200/70 uppercase tracking-wider mt-0.5 font-medium">Future Release</div>
              </div>
            </div>

            {/* Key Assurance Points */}
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>64 Freehold Plots:</strong> 120–425 sq. yd. across Blocks A to F</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Building:</strong> G+2 with 2 Lifts, Stilt Parking &amp; 6" Rise Stairs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Healthcare:</strong> On-site G+2 Ayurvedic hospital &amp; 9 Panchakarma suites</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Sacred Space:</strong> Community Mandir sited within 5-min walk</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => scrollToSection('availability')}
                className="text-xs font-semibold text-[#C58F58] hover:text-white flex items-center gap-1 transition-colors"
              >
                Browse 64 Plots Master Plan <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => openWhatsApp({ actionType: 'request-pricing', message: 'Please share the price list and payment plan for plots and apartments...' })}
                className="text-xs font-bold text-white hover:underline"
              >
                Get Price List (PDF) →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/10">
        <span>📍 Kheri Asra, Near Reliance MET City, SH-22 Jhajjar, Haryana 124104</span>
        <button
          onClick={() => scrollToSection('location')}
          className="flex items-center gap-1.5 text-[#C58F58] hover:text-white transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
