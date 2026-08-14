'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { servicesData } from '@/data/servicesData';
import { locationsData } from '@/data/locationsData';
import { resourcesData } from '@/data/resourcesData';
import { faqsData } from '@/data/faqsData';
import { communityEventsData } from '@/data/communityData';
import { safetyDevicesData } from '@/data/devicesData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
  MessageSquare,
  UserCheck
} from 'lucide-react';

export default function HomePage() {
  const { openEmergency, openWhatsApp, openLeadDrawer } = useModal();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categoryOptions = [
    { id: 'all', label: 'All Services (10)' },
    { id: 'critical-care', label: 'ICU & Home Nursing' },
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
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Deeply Emotional, Dignified Indian Elder Healthcare)      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-6 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Column (Copy + Direct CTAs) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2D7C5] shadow-xs text-xs font-semibold text-[#0D2329]">
                <Heart className="w-3.5 h-3.5 fill-[#C58F58] text-[#C58F58] animate-heart-beat" />
                <span>Beti Jaisa Apnapan • Doctor Jaisi Dekhbhal</span>
                <span className="text-[#C58F58] font-bold">★ 4.96/5</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-extrabold text-[#0D2329] tracking-tight leading-[1.15]">
                Unki Muskaan aur Suraksha, Ab Hamari Zimmedari.
              </h1>

              {/* Emotional Subtitle */}
              <p className="text-base sm:text-lg text-[#2C5E50] font-normal leading-relaxed max-w-2xl">
                Jab aap unke paas har pal nahi ho sakte, tab hum unka haath thaamte hain — ek bache ke pyaar aur ek senior doctor ke vishwas ke saath. 24/7 cardiac ambulances, certified ICU nurses, aur rozana ki khushiyan.
              </p>

              {/* Primary Conversion CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <Link href="/find-care" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-bold text-sm sm:text-base px-8 py-4 shadow-md hover:shadow-xl group"
                    rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />}
                  >
                    Maa-Bauji ke liye Care Plan Karein (60s)
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => openEmergency()}
                  leftIcon={<Siren className="w-4 h-4 text-red-600 animate-bounce" />}
                  className="w-full sm:w-auto text-[#0D2329] border-red-300 bg-red-50/70 hover:bg-red-100 hover:border-red-400 text-sm sm:text-base font-bold"
                >
                  24/7 Emergency Ambulance (&lt; 15m)
                </Button>
              </div>

              {/* Quick WhatsApp & Call Micro-actions */}
              <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#53676E]">
                <button
                  onClick={() => openWhatsApp()}
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp par Doctor se baat karein</span>
                </button>

                <span className="text-[#E8E2D8]">•</span>

                <a
                  href="tel:+911140849900"
                  className="inline-flex items-center gap-1.5 font-bold text-[#0D2329] hover:text-[#C58F58] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>24x7 Helpline: +91 11 4084 9900</span>
                </a>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-4 border-t border-[#E8E2D8] grid grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <span className="block text-2xl sm:text-3xl font-serif-heading font-extrabold text-[#0D2329]">
                    12,000+
                  </span>
                  <span className="text-xs text-[#53676E]">Families Who Sleep in Peace</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-serif-heading font-extrabold text-[#2C5E50]">
                    &lt; 15 Mins
                  </span>
                  <span className="text-xs text-[#53676E]">Cardiac Ambulance Dispatch</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-serif-heading font-extrabold text-[#C58F58]">
                    100%
                  </span>
                  <span className="text-xs text-[#53676E]">Biometric & Police Verified</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column (Authentic Indian Senior Healthcare Photo & Telemetry) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#F5EFE6] group">
                <Image
                  src="/images/indian-grandparents-hero.jpg"
                  alt="Dignified Indian grandfather and grandmother (Dadaji and Dadiji) smiling warmly at home"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/90 via-black/20 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-[#E8E2D8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center animate-sos-pulse">
                      <Siren className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0D2329] block">24/7 Rapid SOS Desk</span>
                      <span className="text-[10px] text-emerald-700 font-bold">12 Metro Networks Active</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    SLA &lt; 15m
                  </span>
                </div>

                {/* Floating Bottom Telemetry Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D2329]/95 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#C58F58] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> Maa-Bauji Live Health Vitals
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Synced Just Now</span>
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
                      <span className="text-[10px] text-white/60 block">Oxygen (SpO2)</span>
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
      {/* 2. TRUST PARTNERS & HOSPITAL NETWORK STRIP                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-xs text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#53676E]">
            Pre-Integrated with 120+ Top Indian Hospital Emergency Rooms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
            <span className="text-base sm:text-lg font-serif-heading font-extrabold text-[#0D2329]">
              Max Healthcare
            </span>
            <span className="text-base sm:text-lg font-serif-heading font-extrabold text-[#0D2329]">
              Apollo Hospitals
            </span>
            <span className="text-base sm:text-lg font-serif-heading font-extrabold text-[#0D2329]">
              Fortis Escorts
            </span>
            <span className="text-base sm:text-lg font-serif-heading font-extrabold text-[#0D2329]">
              Medanta — The Medicity
            </span>
            <span className="text-base sm:text-lg font-serif-heading font-extrabold text-[#0D2329]">
              Manipal Hospitals
            </span>
            <span className="text-base sm:text-lg font-serif-heading font-extrabold text-[#0D2329]">
              Narayana Health
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 4 FOUNDATIONAL PILLARS OF CARE                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="sage" size="md">
            The Complete Care Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Ghar Par Har Suvidha, Poore Pyar aur Vishwas ke Sath
          </h2>
          <p className="text-sm text-[#53676E]">
            Emergency ambulance se lekar daily doctor visits, certified attendants, aur khushnuma sangati tak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Emergency */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Siren className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">24/7 Emergency & First Responders</h3>
              <p className="text-xs text-[#53676E] leading-relaxed font-normal">
                Sub-15 minute GPS cardiac ambulance dispatch, ex-defense first responders on ground, emergency mock drills at home, and hospital green channel ER admissions.
              </p>
            </div>
            <Link href="/services/emergency-ambulance-support" className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Emergency Protocols →</span>
            </Link>
          </div>

          {/* Pillar 2: Clinical Care */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">Clinical Health & Home Nursing</h3>
              <p className="text-xs text-[#53676E] leading-relaxed font-normal">
                B.Sc. ICU nurses, 24/7 live-in geriatric attendants, doctor bedside visits, neuro-physiotherapy rehab, lab collections, and medical equipment rental.
              </p>
            </div>
            <Link href="/services" className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Explore All 10 Services →</span>
            </Link>
          </div>

          {/* Pillar 3: Daughter on Demand */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#C58F58] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">Daughter on Demand™ Concierge</h3>
              <p className="text-xs text-[#53676E] leading-relaxed font-normal">
                A dedicated Care Manager who visits parents weekly, accompanies them to hospitals and banks, assists with smartphones, and coordinates home tasks.
              </p>
            </div>
            <Link href="/services/companion-concierge-care" className="text-xs font-bold text-[#C58F58] hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Learn About Concierge →</span>
            </Link>
          </div>

          {/* Pillar 4: Club Aeterna */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0D2329]">Club Aeterna Active Aging</h3>
              <p className="text-xs text-[#53676E] leading-relaxed font-normal">
                Daily live interactive shows: Morning Chair Yoga, Retro Sangeet & Antakshari, Doctor Live AMAs, and Memory Chess clubs so seniors never feel lonely.
              </p>
            </div>
            <Link href="/community" className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 pt-2 border-t border-[#E8E2D8]">
              <span>Join Free Live Shows →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LIVE SHOW / CLUB AETERNA PREVIEW BANNER                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-6 sm:p-8 border border-[#1C4550] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center animate-pulse shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C58F58] block">
                Today on Club Aeterna Live TV (Daily 8:00 AM & 5:30 PM)
              </span>
              <h4 className="font-serif-heading font-bold text-base sm:text-lg text-white">
                {featuredLiveEvent.title}
              </h4>
              <p className="text-xs text-white/70">
                Hosted by {featuredLiveEvent.hostName} • {featuredLiveEvent.attendeesCount} Elders Joining Today
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/community">
              <Button variant="gold" size="md" className="font-bold">
                Watch Live & Join Free →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE SERVICE EXPLORER                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="sage" size="md">
              Clinical Offerings & Transparent Rates
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] mt-2">
              Explore Our 10 Specialized Clinical Services
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] mt-1 max-w-xl">
              Transparent per-shift and per-visit rates with zero hidden charges. Audited weekly by senior MD Geriatricians.
            </p>
          </div>

          <Link href="/find-care">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Find Right Care Wizard (60s) →
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SMART IOT & FALL SAFETY HARDWARE                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#E2D7C5] space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="gold" size="sm">
                Smart Home Senior Safety
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
                Zero-Camera AI Fall Radars & 4G SOS Pendants
              </h2>
              <p className="text-xs sm:text-sm text-[#53676E] max-w-xl">
                Keep elders safe in washrooms and bedrooms without privacy-invading optical cameras. Connected directly to our 24/7 Emergency Command Center.
              </p>
            </div>

            <Link href="/devices">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Safety Devices →
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
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-[#FAF8F5] mb-4">
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
                  <p className="text-xs text-[#53676E] mt-1 line-clamp-2">{dev.tagline}</p>
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
      {/* 7. DEDICATED FOR NRI & LONG-DISTANCE FAMILIES                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-14 border border-[#1C4550] shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold">
              <Globe className="w-4 h-4" />
              <span>For Children Living in USA, UK, Canada, UAE, or Other Indian Cities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-white leading-tight">
              Door Rehte Hain? Hum Hain Bharat Me Aapke Parents Ka Parivaar.
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
              Samudra paar rehne ka dard aur chinta hum samajhte hain. Jab bhi koi achanak bimari ya emergency ho, Aeterna Care on-ground hazir rehta hai.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dedicated WhatsApp group synced to US/UK timezones</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Daily shift vitals telemetry & GPS attendance reports</span>
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

            <div className="pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={() => openLeadDrawer({ title: 'NRI Family Care Consultation', service: 'Overseas Children Elder Support' })}
              >
                Schedule NRI Family Consultation →
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                ❤️
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
              Nationwide Network
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] mt-2">
              Active Caregiver Hubs Across 12+ Major Metros
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] mt-1">
              Active caregiver hubs and GPS standby ambulances positioned for rapid doorstep response.
            </p>
          </div>

          <Link href="/locations">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore City Directory →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {locationsData.map((loc) => (
            <Link
              key={loc.id}
              href={`/locations/${loc.slug}`}
              className="p-5 rounded-3xl bg-white border border-[#E8E2D8] hover:border-[#2C5E50] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0D2329] group-hover:text-[#2C5E50] transition-colors">
                  {loc.name}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  &lt; {loc.avgResponseTimeMin}m SLA
                </span>
              </div>
              <p className="text-[11px] text-[#53676E]">
                {loc.familiesServed}+ Families • {loc.partnerHospitals} Partner Hospitals
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C58F58] mt-3 group-hover:underline">
                <span>View Local Hub</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FREE IN-HOME EMERGENCY MOCK DRILL BANNER                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E2D7C5] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <Badge variant="gold" size="sm">
              Free Safety Protocol
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              Book a Free In-Home Emergency Mock Drill for Parents
            </h3>
            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              Our safety officer and paramedic will visit your parents&apos; home, test the SOS alarm button response with our 24/7 command desk, audit bathroom slip hazards, and train elders on how to call for emergency help in under 10 seconds.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => openLeadDrawer({ title: 'Schedule Free In-Home Emergency Mock Drill' })}
            >
              Book Free Mock Drill →
            </Button>
            <span className="text-center text-[11px] text-[#53676E]">
              100% Free in Delhi NCR, Mumbai & Bangalore
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. LATEST CLINICAL RESOURCES & ARTICLES                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="sage" size="md">
              Evidence-Based Insights
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] mt-2">
              Clinical Guides for Caring Children
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] mt-1">
              Authored by senior geriatricians, psychologists, and rehabilitation directors.
            </p>
          </div>

          <Link href="/resources">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Read All Guides →
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
      {/* 12. FAQ ACCORDION                                                         */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="sage" size="md">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Everything You Need to Know About Aeterna Care
          </h2>
          <p className="text-sm text-[#53676E]">
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
      {/* 13. FINAL HIGH-CONVERSION CTA                                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0D2329] via-[#112E36] to-[#071519] text-white rounded-3xl p-8 sm:p-16 border border-[#1C4550] shadow-2xl relative overflow-hidden text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#C58F58]">
              <Sparkles className="w-3.5 h-3.5" /> Maa-Bauji Ke Liye Aaj Hi Shuru Karein
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white leading-tight">
              Give Your Parents the Care, Safety, & Dignity They Deserve
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-normal max-w-2xl mx-auto leading-relaxed">
              Join 12,000+ families who sleep peacefully knowing their aging parents have certified nurses, regular doctor checkups, daily live activities, and 24/7 emergency response.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/find-care">
              <Button
                variant="gold"
                size="lg"
                className="font-bold text-base px-9 py-4 shadow-xl"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Find Right Care in 60 Seconds
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => openWhatsApp()}
              leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
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
