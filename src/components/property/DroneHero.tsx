'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Building2,
  CalendarCheck,
  MessageSquare,
  ArrowDown,
  ShieldCheck,
  Heart,
  Video,
  Sparkles
} from 'lucide-react';

export const DroneHero: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser policy; fallback poster remains active
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-[94vh] flex flex-col justify-between overflow-hidden bg-[#071519] text-white pt-24 pb-12">
      {/* Cinematic Full-Bleed Video Slot with Image Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {projectOverview.droneVideoUrl ? (
          <video
            ref={videoRef}
            src={projectOverview.droneVideoUrl}
            poster={projectOverview.heroPosterImage}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <Image
            src={projectOverview.heroPosterImage || '/images/indian-grandparents-hero.jpg'}
            alt="Indian Grandparents enjoying peaceful senior living sanctuary at Senior Living Citizen Foundation"
            fill
            priority
            className="object-cover object-center sm:object-right scale-100 transition-transform duration-1000"
          />
        )}

        {/* Soft directional gradients for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071519]/95 via-[#071519]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071519]/95 via-transparent to-[#071519]/60" />
      </div>

      {/* Top Location & Project Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 sm:pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest">01 • UPCOMING PRE-LAUNCH PROJECT</span>
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
            An upcoming senior-living community designed around comfort, accessibility, wellness, and peace of mind. Offering <strong>64 residential freehold plots</strong> and <strong>senior care residences</strong> with an on-site proposed <strong>30,000 sq. ft. Ayurvedic hospital</strong> and <strong>Community Mandir</strong> near Reliance MET City, SH-22 Jhajjar.
          </p>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
            <div className="p-3.5 rounded-2xl bg-[#0D2329]/80 border border-white/15 backdrop-blur-md text-center sm:text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">64</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5 font-medium">Freehold Plots</div>
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

          {/* Structured Action Decision Grid */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {/* PRIMARY: Explore Sanctuary */}
            <Button
              size="lg"
              className="bg-[#2C5E50] hover:bg-[#3D7363] text-white py-4 px-6 text-sm sm:text-base font-semibold shadow-xl shadow-[#2C5E50]/40 cursor-pointer"
              onClick={() => scrollToSection('why-senior-living')}
              leftIcon={<Building2 className="w-5 h-5" />}
            >
              Explore the Sanctuary ↓
            </Button>

            {/* SECONDARY: Book Guided Site Visit */}
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-black/40 backdrop-blur-md text-white hover:bg-white/15 py-4 px-5 text-sm font-medium cursor-pointer"
              onClick={() => openLeadDrawer({ title: 'Book a Guided Site Visit in Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
              leftIcon={<CalendarCheck className="w-4 h-4 text-[#C58F58]" />}
            >
              Book a Guided Site Visit
            </Button>

            {/* TERTIARY: Drone Video */}
            <Button
              variant="outline"
              size="lg"
              className="border-red-500/40 bg-red-950/40 backdrop-blur-md text-white hover:bg-red-900/50 py-4 px-4 text-xs font-medium cursor-pointer hidden md:flex"
              onClick={() => scrollToSection('reality-vs-vision')}
              leftIcon={<Video className="w-4 h-4 text-red-400" />}
            >
              Watch Video
            </Button>

            {/* TERTIARY: WhatsApp Advisor */}
            <Button
              variant="ghost"
              size="lg"
              className="text-emerald-300 hover:text-white hover:bg-white/10 py-4 px-4 text-xs font-semibold backdrop-blur-sm cursor-pointer"
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I would like to speak to an advisor about Senior Living Citizen Foundation...' })}
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
          className="flex items-center gap-1.5 text-[#C58F58] hover:text-white transition-colors cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
