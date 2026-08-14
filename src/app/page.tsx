'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { servicesData } from '@/data/servicesData';
import { carePlansData } from '@/data/plansData';
import { locationsData } from '@/data/locationsData';
import { resourcesData } from '@/data/resourcesData';
import { faqsData } from '@/data/faqsData';
import { communityEventsData } from '@/data/communityData';
import { safetyDevicesData } from '@/data/devicesData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Accordion } from '@/components/ui/Accordion';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { TestimonialCarousel } from '@/components/shared/TestimonialCarousel';
import { formatINR } from '@/lib/utils';
import {
  Heart,
  Siren,
  ShieldCheck,
  Award,
  Clock,
  Star,
  ArrowRight,
  Check,
  CheckCircle2,
  Users,
  Building2,
  PhoneCall,
  Sparkles,
  MapPin,
  Stethoscope,
  Activity,
  Brain,
  HelpCircle,
  Play,
  Radio,
  Tv,
  Cpu,
  Globe,
  Smile,
  Zap,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function HomePage() {
  const { openEmergency, openWhatsApp, openLeadDrawer } = useModal();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const categoryOptions = [
    { id: 'all', label: 'All Services (10)' },
    { id: 'critical-care', label: 'ICU & Clinical Nursing' },
    { id: 'daily-living', label: 'Attendants & Caregivers' },
    { id: 'medical-rehab', label: 'Doctor & Physio Rehab' },
    { id: 'dementia-memory', label: 'Dementia Care' },
    { id: 'companionship', label: 'Daughter on Demand' }
  ];

  const filteredServices = servicesData.filter((srv) => {
    if (activeCategory === 'all') return true;
    return srv.category === activeCategory;
  });

  const featuredLiveEvent = communityEventsData[0];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-gradient-to-b from-[#F6F1E8] via-[#FBF9F5] to-[#FBF9F5] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Column (Copy + High-Conversion CTAs) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2D7C5] shadow-xs text-xs font-semibold text-[#0D2329]">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>India&apos;s #1 Comprehensive Elder Healthcare Platform</span>
                <span className="text-[#C58F58] font-bold">★ 4.96/5</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-serif-heading font-extrabold text-[#0D2329] tracking-tight leading-[1.12]">
                Hospital-Grade Care, 24/7 Emergency Safety, & Daily Joy at Home.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-xl text-[#3D685A] font-light leading-relaxed max-w-2xl">
                From sub-15 minute cardiac ambulances to verified ICU nurses, daily live yoga, and a dedicated &ldquo;Care Daughter&rdquo; for hospital visits — we protect your aging parents like our own.
              </p>

              {/* Dual Primary Conversion CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link href="/find-care" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-bold text-base shadow-lg hover:shadow-xl group"
                    rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  >
                    Find the Right Care in 60s
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => openEmergency()}
                  leftIcon={<Siren className="w-4 h-4 text-red-600 animate-bounce" />}
                  className="w-full sm:w-auto text-[#0D2329] border-red-200 bg-red-50/60 hover:bg-red-100 hover:border-red-300"
                >
                  24/7 Emergency Ambulance
                </Button>
              </div>

              {/* Quick WhatsApp & Call Micro-actions */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#5C6F75]">
                <button
                  onClick={() => openWhatsApp()}
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:underline"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Chat with Doctor on WhatsApp</span>
                </button>

                <span className="text-[#E8E2D8]">•</span>

                <a
                  href="tel:+911140849900"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0D2329] hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>Helpline: +91 11 4084 9900</span>
                </a>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-4 border-t border-[#E8E2D8] grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0D2329]">
                    12,000+
                  </span>
                  <span className="text-xs text-[#5C6F75] font-normal">Seniors Protected</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#3D685A]">
                    &lt; 15 Mins
                  </span>
                  <span className="text-xs text-[#5C6F75] font-normal">Emergency Ambulance SLA</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#C58F58]">
                    100%
                  </span>
                  <span className="text-xs text-[#5C6F75] font-normal">Biometric Verified Staff</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column (Interactive Visual Card Deck) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#F6F1E8]">
                <Image
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80"
                  alt="Senior doctor with elder patient"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-transparent to-transparent" />

                {/* Floating Top Card: Emergency SOS Active */}
                <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#E8E2D8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center animate-sos-pulse">
                      <Siren className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0D2329] block">24/7 Rapid SOS Response</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">12 Metro Nodes Active</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                    SLA &lt; 15m
                  </span>
                </div>

                {/* Floating Bottom Card: Real-time Family Care Telemetry */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D2329]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#C58F58] flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Live Family App Sync
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Synced 2m ago</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white/10 p-2 rounded-xl">
                      <span className="text-[10px] text-white/60 block">Blood Pressure</span>
                      <span className="font-bold">120/80</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl">
                      <span className="text-[10px] text-white/60 block">Blood Sugar</span>
                      <span className="font-bold">110 mg</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl">
                      <span className="text-[10px] text-white/60 block">SpO2 Rate</span>
                      <span className="font-bold text-emerald-400">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 4 FOUNDATIONAL PILLARS (Emoha-Style Holistic Architecture)          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="sage" size="md">
            The 360° Care Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Four Pillars That Protect Your Parents Every Single Day
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Elder care is much more than medical treatment. We cover health, safety, daily companionship, and active social joy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Emergency & First Responders */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Siren className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">24/7 Emergency & First Responders</h3>
              <p className="text-xs text-[#5C6F75] leading-relaxed font-light">
                Sub-15 minute GPS cardiac ambulance dispatch, ex-defense first responders on ground, emergency mock drills at home, and hospital green channel ER admissions.
              </p>
            </div>
            <Link href="/services/emergency-ambulance-support" className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Emergency Protocols</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: Clinical Health at Home */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">Clinical Health & Home Nursing</h3>
              <p className="text-xs text-[#5C6F75] leading-relaxed font-light">
                B.Sc. ICU nurses, 24/7 live-in geriatric attendants, doctor bedside visits, neuro-physiotherapy rehab, lab collections, and medical equipment rental.
              </p>
            </div>
            <Link href="/services" className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Explore All 10 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: Daughter on Demand / Family Concierge */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#C58F58] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">Daughter on Demand™ Concierge</h3>
              <p className="text-xs text-[#5C6F75] leading-relaxed font-light">
                A dedicated Care Manager who visits parents weekly, accompanies them to hospitals and banks, assists with smartphones, and coordinates home tasks.
              </p>
            </div>
            <Link href="/services/companion-concierge-care" className="text-xs font-bold text-[#C58F58] hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Learn About Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 4: Club Aeterna / Active Aging */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">Club Aeterna Active Aging</h3>
              <p className="text-xs text-[#5C6F75] leading-relaxed font-light">
                Daily live interactive shows: Morning Chair Yoga, Retro Sangeet & Antakshari, Doctor Live AMAs, and Memory Chess clubs so seniors never feel lonely.
              </p>
            </div>
            <Link href="/community" className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Join Free Live Shows</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LIVE SHOW / CLUB AETERNA PREVIEW STRIP                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-6 sm:p-8 border border-[#1C4550] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center animate-pulse shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C58F58] block">
                Today on Club Aeterna Live TV (Daily 8 AM & 5:30 PM)
              </span>
              <h4 className="font-bold text-base sm:text-lg text-white">
                {featuredLiveEvent.title}
              </h4>
              <p className="text-xs text-white/70">
                Hosted by {featuredLiveEvent.hostName} • {featuredLiveEvent.attendeesCount} Seniors RSVPed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/community">
              <Button variant="gold" size="md" className="font-bold">
                Watch Live & RSVP Free →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE SERVICE EXPLORER                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="sage" size="md">
              Comprehensive Clinical Offerings
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] mt-2">
              Everything Your Parent Needs to Thrive at Home
            </h2>
            <p className="text-sm sm:text-base text-[#5C6F75] mt-1 max-w-xl">
              From critical ICU nursing to gentle daily assistance, physiotherapy, and emergency hospitalization advocacy.
            </p>
          </div>

          <Link href="/services">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 10 Services
            </Button>
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="pt-2">
          <Tabs
            options={categoryOptions}
            activeId={activeCategory}
            onChange={(id) => setActiveCategory(id)}
            variant="pills"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SMART IOT & SENIOR SAFETY TECH (AI Fall Radar & 4G SOS Pendant)        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F1E8] rounded-3xl p-8 sm:p-14 border border-[#E2D7C5] space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="gold" size="sm">
                Smart Home Protection
              </Badge>
              <h2 className="text-3xl font-serif-heading font-bold text-[#0D2329]">
                Zero-Camera AI Fall Radars & 4G Panic Pendants
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6F75] max-w-xl">
                Keep elders safe in bathrooms and bedrooms without privacy-invading optical cameras. Connected directly to our 24/7 Emergency Command Center.
              </p>
            </div>

            <Link href="/devices">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All Safety Hardware →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safetyDevicesData.slice(0, 3).map((dev) => (
              <div
                key={dev.id}
                className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-[#FBF9F5] mb-4">
                    <Image
                      src={dev.image}
                      alt={dev.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="forest" size="sm">
                        {dev.category}
                      </Badge>
                    </div>
                  </div>
                  <h4 className="font-bold text-base text-[#0D2329]">{dev.name}</h4>
                  <p className="text-xs text-[#5C6F75] mt-1 line-clamp-2">{dev.tagline}</p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D2329]">
                    Rent from {formatINR(dev.priceRentPerMonth)}/mo
                  </span>
                  <Link href="/devices" className="text-xs font-bold text-[#C58F58] hover:underline">
                    Order →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DEDICATED FOR NRI & LONG-DISTANCE FAMILIES                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-14 border border-[#1C4550] shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold">
              <Globe className="w-4 h-4" />
              <span>Specialized Care for Children Living Overseas / Other Cities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-white leading-tight">
              Living in the US, UK, or UAE? Your Parents Are in Safe Hands.
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              We act as your proxy family on the ground. When you are thousands of miles away, you don&apos;t have to rely on neighbors during sudden medical panics or hospital admissions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dedicated WhatsApp family group synced to US/UK timezones</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Shift-by-shift vitals telemetry & GPS attendance on mobile app</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Emergency hospital admission & cashless insurance advocacy</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Multi-currency international cards & Wire payments accepted</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                variant="gold"
                size="lg"
                onClick={() => openLeadDrawer({ title: 'NRI Family Care Consultation', service: 'Overseas Children Elder Support' })}
              >
                Schedule NRI Consultation Call →
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                🇺🇸 🇬🇧
              </div>
              <div>
                <strong className="text-sm text-white block">Over 4,500+ NRI Families</strong>
                <span className="text-xs text-white/60">Trust Aeterna Care for their parents in India</span>
              </div>
            </div>
            <p className="text-xs text-white/80 italic leading-relaxed pt-2 border-t border-white/10">
              &ldquo;Living in San Jose, my biggest fear was my father collapsing in Gurgaon. Aeterna dispatched an ACLS ambulance within 12 minutes, admitted him to Max Healthcare, and their Care Manager stood by his bedside till I landed in Delhi.&rdquo;
            </p>
            <div className="text-[11px] text-[#C58F58] font-bold">
              — Siddharth Mehta, VP Engineering (San Jose, California)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CARE PLANS & MEMBERSHIP PREVIEW                                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="sage" size="md">
            Transparent Memberships
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Comprehensive Care Plans for Every Stage of Aging
          </h2>
          <p className="text-sm sm:text-base text-[#5C6F75]">
            Predictable monthly or annual memberships with zero hidden charges and guaranteed emergency ambulance coverage.
          </p>

          {/* Monthly vs Annual Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={billingCycle === 'monthly' ? 'text-[#0D2329] font-bold' : 'text-[#5C6F75]'}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-8 rounded-full bg-[#0D2329] p-1 transition-colors relative focus:outline-none"
              aria-label="Toggle annual billing"
            >
              <div
                className={`w-6 h-6 rounded-full bg-[#C58F58] transition-transform duration-200 ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={billingCycle === 'annual' ? 'text-[#0D2329] font-bold' : 'text-[#5C6F75]'}>
              Annual Plan <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">Save 20%</span>
            </span>
          </div>
        </div>

        {/* 4 Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carePlansData.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#C58F58] shadow-xl relative scale-102 lg:-translate-y-2'
                    : 'bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C58F58] text-white text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3D685A]">
                      {plan.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-2">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-[#5C6F75] mt-1 min-h-[32px]">
                    {plan.description}
                  </p>

                  <div className="mt-5 pb-5 border-b border-[#E8E2D8]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-[#0D2329]">
                        {formatINR(price)}
                      </span>
                      <span className="text-xs text-[#5C6F75]">
                        /{billingCycle === 'annual' ? 'year' : 'mo'}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-xs text-[#1D4B57]">
                    {plan.keyDeliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8E2D8] space-y-2">
                  <Link href={`/book?plan=${plan.slug}&billing=${billingCycle}`}>
                    <Button
                      variant={plan.popular ? 'gold' : 'primary'}
                      size="md"
                      className="w-full text-xs font-bold"
                    >
                      Choose {plan.name}
                    </Button>
                  </Link>

                  <Link
                    href={`/plans/${plan.slug}`}
                    className="block text-center text-xs font-medium text-[#5C6F75] hover:text-[#0D2329] py-1"
                  >
                    View Complete Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link href="/plans">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Compare All 25+ Plan Parameters in Detail
            </Button>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. VERIFIED TESTIMONIALS CAROUSEL                                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialCarousel />
      </section>

      {/* ========================================================================= */}
      {/* 9. CITY LOCATIONS DIRECTORY                                               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="sage" size="md">
              Nationwide Presence
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] mt-2">
              Clinical Support Across 12+ Major Metros
            </h2>
            <p className="text-sm sm:text-base text-[#5C6F75] mt-1">
              Active caregiver hubs and GPS standby ambulances positioned for rapid local deployment.
            </p>
          </div>

          <Link href="/locations">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore City Directory
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {locationsData.map((loc) => (
            <Link
              key={loc.id}
              href={`/locations/${loc.slug}`}
              className="p-5 rounded-3xl bg-white border border-[#E8E2D8] hover:border-[#3D685A] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0D2329] group-hover:text-[#3D685A] transition-colors">
                  {loc.name}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  &lt; {loc.avgResponseTimeMin}m SLA
                </span>
              </div>
              <p className="text-[11px] text-[#5C6F75]">
                {loc.familiesServed}+ Families • {loc.partnerHospitals} Partner Hospitals
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C58F58] mt-3 group-hover:underline">
                <span>Local Details</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. LATEST CLINICAL RESOURCES & GUIDES                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="sage" size="md">
              Evidence-Based Insights
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] mt-2">
              Clinical Advice for Adult Children
            </h2>
            <p className="text-sm sm:text-base text-[#5C6F75] mt-1">
              Authored by senior geriatricians, psychologists, and rehabilitation directors.
            </p>
          </div>

          <Link href="/resources">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Read All Articles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {resourcesData.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. INTERACTIVE FAQ ACCORDION                                             */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="sage" size="md">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Everything You Need to Know About Aeterna Care
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Have a question not answered here? Speak with our 24/7 care desk anytime.
          </p>
        </div>

        <Accordion
          items={faqsData.slice(0, 6).map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: faq.answer,
            badge: faq.category.toUpperCase()
          }))}
        />
      </section>

      {/* ========================================================================= */}
      {/* 12. FINAL HIGH-CONVERSION CTA                                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0D2329] via-[#112E36] to-[#071519] text-white rounded-3xl p-8 sm:p-16 border border-[#1C4550] shadow-2xl relative overflow-hidden text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#C58F58]">
              <Sparkles className="w-3.5 h-3.5" /> Start Your Family’s Care Journey Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white leading-tight">
              Give Your Parents the Care, Safety, & Dignity They Deserve
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
              Join 12,000+ families who sleep peacefully knowing their aging parents have certified nurses, regular doctor checkups, daily live activities, and 24/7 emergency response.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/find-care">
              <Button
                variant="gold"
                size="lg"
                className="font-bold text-base px-8 py-4 shadow-xl"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Find Right Care (60 Seconds)
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => openWhatsApp()}
              leftIcon={<PhoneCall className="w-4 h-4 text-[#C58F58]" />}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Chat on WhatsApp Desk
            </Button>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Free Clinical Consultation
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> No Obligation
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> 100% Confidential
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
