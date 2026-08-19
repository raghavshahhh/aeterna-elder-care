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
  Heart,
  Trees,
  Sun,
  Activity
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
    <section className="relative overflow-hidden bg-[#FAF8F5] text-[#0D2329] pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-[#E8E2D8]">
      {/* Background Soft Warm Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#EAF2EE] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#F5EFE6] rounded-full blur-3xl opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Top Status & Location Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E8E2D8] text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-[#2C5E50] font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider">UPCOMING SENIOR LIVING SANCTUARY</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[#53676E] text-xs">
            <a
              href={projectOverview.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#2C5E50] font-medium transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>Near Reliance MET City, SH-22 Jhajjar</span>
            </a>
            <span className="hidden sm:inline text-[#D2C8BA]">•</span>
            <span className="hidden sm:flex items-center gap-1 text-[#2C5E50] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 30,000 Sqft Planned Hospital
            </span>
          </div>
        </div>

        {/* Hero Main Grid: Emotional Headline on Left, Indian Grandparents Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Emotional Story & Simplicity */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C58F58]/15 border border-[#C58F58]/30 text-[#A66D38] text-xs font-bold uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 text-[#C58F58] fill-[#C58F58]" />
                Senior Living Citizen Foundation
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif-heading font-bold text-[#0D2329] leading-[1.15] tracking-tight">
                A Peaceful, Safe &amp; Blessed Home for <span className="italic font-serif text-[#C58F58]">Your Parents.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#53676E] leading-relaxed">
              Give your parents the peace, clean air, and dignity they deserve. A thoughtfully planned senior community with <strong>64 freehold plots</strong>, <strong>senior apartments</strong>, an <strong>on-site 30,000 sq. ft. Ayurvedic hospital</strong>, and a <strong>sacred Mandir</strong> — just 35 mins from Gurugram in Kheri Asra, Jhajjar.
            </p>

            {/* 4 Super Simple Key Highlights with Icons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Trees className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2329]">Pristine Green Air</h4>
                  <p className="text-[11px] text-[#53676E] mt-0.5">Zero traffic &amp; clean AQI</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2329]">Doctor Next Door</h4>
                  <p className="text-[11px] text-[#53676E] mt-0.5">30k sqft on-site hospital</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2329]">Mandir 5-Min Walk</h4>
                  <p className="text-[11px] text-[#53676E] mt-0.5">Daily aarti &amp; satsang</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2329]">64 Freehold Plots</h4>
                  <p className="text-[11px] text-[#53676E] mt-0.5">120 to 425 sq. yd. (Blocks A–F)</p>
                </div>
              </div>
            </div>

            {/* Clear, Big Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                size="lg"
                className="bg-[#2C5E50] hover:bg-[#1D4B57] text-white py-4 px-6 text-sm sm:text-base font-bold shadow-lg shadow-[#2C5E50]/20"
                onClick={() => scrollToSection('availability')}
                leftIcon={<Home className="w-4 h-4" />}
              >
                View 64 Plots &amp; Homes →
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#2C5E50] text-[#2C5E50] hover:bg-[#2C5E50] hover:text-white py-4 px-6 text-sm font-semibold"
                onClick={() => openLeadDrawer({ title: 'Book Free Private Site Walk in Kheri Asra', actionType: 'book-site-visit' })}
                leftIcon={<Calendar className="w-4 h-4 text-[#C58F58]" />}
              >
                Book a Site Visit
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-[#2C5E50] hover:bg-[#EAF2EE] py-4 px-4 text-sm font-bold flex items-center gap-2"
                onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' })}
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                WhatsApp Us
              </Button>
            </div>
          </div>

          {/* Right Column: Heartwarming Indian Grandparents Imagery & Live Phase 1 Card */}
          <div className="lg:col-span-6 space-y-4">
            {/* Emotional Image Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0D2329] min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 group">
              <Image
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=85"
                alt="Happy Indian Senior Grandparents enjoying peaceful green retirement life"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071519]/90 via-[#071519]/35 to-transparent" />

              {/* Floating Quality of Life Pill */}
              <div className="relative z-10 flex items-center justify-between mb-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2C5E50] text-xs font-bold shadow-md">
                  <Sun className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>Sukoon, Suraksha &amp; Seva</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-700/90 text-white text-xs font-semibold backdrop-blur-md">
                  Phase 1 Launch
                </span>
              </div>

              {/* Bottom Emotional Quote */}
              <div className="relative z-10 space-y-2 text-white">
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-white leading-snug">
                  &ldquo;Bacchon ki chinta khatam, mata-pita ka sukoon shuru.&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  No high-rise elevators getting stuck. No noisy highways. Pure morning walks, fresh satvik food, temple bells, and round-the-clock doctor care on-site.
                </p>
              </div>
            </div>

            {/* Quick Live Status Strip */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#0D2329]">Live Inventory:</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  {plotsSummary.availableCount} Plots Available
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  Ground Units 01–03 Open
                </span>
              </div>

              <button
                onClick={() => openWhatsApp({ actionType: 'request-pricing', message: 'Please share the price list for plots and residences at Senior Living Citizen...' })}
                className="font-bold text-[#2C5E50] hover:underline flex items-center gap-1"
              >
                Request Price List (PDF) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
