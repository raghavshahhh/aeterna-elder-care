'use client';

import React from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Building2,
  Calendar,
  MessageSquare,
  ArrowDown,
  ShieldCheck,
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
    <section className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#071519] text-white pt-24 pb-12">
      {/* Full-Bleed Background Image of Indian Grandparents with Home & Garden */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/indian-grandparents-hero.jpg"
          alt="Indian Grandparents enjoying peaceful retirement home and garden at Senior Living Citizen Foundation"
          fill
          priority
          className="object-cover object-center sm:object-right scale-100 transition-transform duration-1000"
        />
        {/* Soft directional gradient: rich on the left for text legibility, crystal clear on the right to show grandparents */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071519]/95 via-[#071519]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071519]/90 via-transparent to-[#071519]/60" />
      </div>

      {/* Top Location & Project Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 sm:pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-semibold tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest">UPCOMING PRE-LAUNCH PROJECT</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-white/85 text-xs">
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

      {/* Main Hero Content: Left-Aligned & Unobstructed */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16 my-auto">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Heart className="w-3.5 h-3.5 text-[#C58F58] fill-[#C58F58]" />
              Senior Living Citizen Foundation
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5] leading-[1.12]">
              A Better Place for the <span className="italic font-serif text-[#C58F58]">People Who Raised You.</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
            An upcoming senior-living community designed around comfort, accessibility, wellness, and peace of mind. Offering <strong>64 residential plots</strong> and <strong>senior apartments</strong> with an on-site <strong>30,000 sq. ft. Ayurvedic hospital</strong> and <strong>Mandir</strong> near Reliance MET City, SH-22 Jhajjar.
          </p>

          {/* 3 Clean Metric Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
            <div className="p-3.5 rounded-2xl bg-[#0D2329]/80 border border-white/15 backdrop-blur-md text-center sm:text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">64</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5 font-medium">Residential Plots</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0D2329]/80 border border-white/15 backdrop-blur-md text-center sm:text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-emerald-400">30k</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5 font-medium">Sqft Hospital (G+2)</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0D2329]/80 border border-white/15 backdrop-blur-md text-center sm:text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#C58F58]">G+2</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5 font-medium">Senior Residences</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <Button
              size="lg"
              className="bg-[#2C5E50] hover:bg-[#3D7363] text-white py-4 px-7 text-sm sm:text-base font-semibold shadow-xl shadow-[#2C5E50]/40"
              onClick={() => scrollToSection('building-vision')}
              leftIcon={<Building2 className="w-5 h-5" />}
            >
              Explore the Project ↓
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-black/40 backdrop-blur-md text-white hover:bg-white/15 py-4 px-6 text-sm font-medium"
              onClick={() => openLeadDrawer({ title: 'Book Free Private Site Walkthrough', actionType: 'book-site-visit' })}
              leftIcon={<Calendar className="w-4 h-4 text-[#C58F58]" />}
            >
              Book a Site Visit
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-emerald-300 hover:text-white hover:bg-white/10 py-4 px-4 text-sm font-semibold backdrop-blur-sm"
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' })}
              leftIcon={<MessageSquare className="w-4 h-4 text-[#25D366]" />}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Status & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-xs text-white/70 pt-2 border-t border-white/10">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
          Kheri Asra, Near Reliance MET City, SH-22 Jhajjar, Haryana 124104
        </span>
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
