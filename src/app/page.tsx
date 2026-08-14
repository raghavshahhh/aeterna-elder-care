'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { servicesData } from '@/data/servicesData';
import { carePlansData } from '@/data/plansData';
import { locationsData } from '@/data/locationsData';
import { resourcesData } from '@/data/resourcesData';
import { faqsData } from '@/data/faqsData';
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
  Play
} from 'lucide-react';

export default function HomePage() {
  const { openEmergency, openWhatsApp, openLeadDrawer } = useModal();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  const categoryOptions = [
    { id: 'all', label: 'All Services', count: servicesData.length },
    { id: 'critical-care', label: 'Critical Nursing & ICU', count: servicesData.filter((s) => s.category === 'critical-care').length },
    { id: 'daily-living', label: 'Daily Attendants', count: servicesData.filter((s) => s.category === 'daily-living').length },
    { id: 'medical-rehab', label: 'Doctor Visits & Physio', count: servicesData.filter((s) => s.category === 'medical-rehab').length },
    { id: 'dementia-memory', label: 'Dementia Care', count: servicesData.filter((s) => s.category === 'dementia-memory').length },
    { id: 'diagnostics-meds', label: 'Diagnostics & Equipment', count: servicesData.filter((s) => s.category === 'diagnostics-meds').length },
    { id: 'companionship', label: 'Companionship', count: servicesData.filter((s) => s.category === 'companionship').length }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#F6F1E8]/60 to-[#FBF9F5]">
        {/* Soft background luxury glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#EAF2EE] rounded-full blur-3xl opacity-70 -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column — Value Proposition & Actions */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D8] shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-[#0D2329]">
                  NABH Compliant Protocols • Rated 4.96/5 by 12,000+ Families
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-heading font-bold text-[#0D2329] leading-[1.12] tracking-tight">
                Hospital-grade clinical warmth for your parents.{' '}
                <span className="italic font-normal text-[#3D685A] block mt-1">
                  In the comfort of home.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-[#5C6F75] leading-relaxed max-w-2xl font-light">
                India’s premier senior healthcare platform. Certified ICU nurses, quarterly geriatrician visits, dementia specialists, and an average <strong>14.8-minute emergency response</strong> across 12 metro cities.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link href="/find-care">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-[#0D2329] hover:bg-[#163942] text-white shadow-lg shadow-[#0D2329]/15"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Find Care in 60 Seconds
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => openLeadDrawer({ title: 'Speak with Senior Geriatric Specialist' })}
                  leftIcon={<PhoneCall className="w-4 h-4 text-[#3D685A]" />}
                >
                  Request Callback (5 Mins)
                </Button>

                <button
                  onClick={() => openEmergency()}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  <Siren className="w-4 h-4 text-red-600 animate-sos-pulse" />
                  <span>24/7 Ambulance SOS</span>
                </button>
              </div>

              {/* Trust mini-stats */}
              <div className="pt-4 border-t border-[#E8E2D8] grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-[#0D2329]">12,000+</span>
                  <span className="text-[11px] sm:text-xs text-[#5C6F75]">Seniors Protected</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-[#0D2329]">&lt; 15 Mins</span>
                  <span className="text-[11px] sm:text-xs text-[#5C6F75]">Avg. Emergency SLA</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-[#0D2329]">100%</span>
                  <span className="text-[11px] sm:text-xs text-[#5C6F75]">Police-Verified Staff</span>
                </div>
              </div>
            </div>

            {/* Right Column — Visual Editorial Collage with Interactive Live Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 sm:aspect-square lg:aspect-4/5 bg-[#F6F1E8]">
                <Image
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
                  alt="Senior care nurse assisting an elderly parent with warmth and compassion"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-transparent to-black/20" />

                {/* Live Pill 1: Floating Caregiver Status */}
                <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-emerald-500">
                      <Image
                        src="https://images.unsplash.com/photo-1594824813590-78174548842d?auto=format&fit=crop&w=150&q=80"
                        alt="Sister Ananya"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-[#0D2329]">Sister Ananya (B.Sc. RN)</span>
                      </div>
                      <p className="text-[10px] text-[#5C6F75]">Checked-in • South Delhi GK-2</p>
                    </div>
                  </div>
                </div>

                {/* Live Pill 2: Daily Vitals Synchronized */}
                <div className="absolute bottom-6 left-4 right-4 bg-[#0D2329]/95 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-2xl">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10 mb-2">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Live Vitals Synced
                    </span>
                    <span className="text-white/60 text-[10px]">Today, 8:30 AM</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/10 rounded-xl p-1.5">
                      <span className="text-[10px] text-white/60 block">BP</span>
                      <span className="text-xs font-bold text-white">124/82</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-1.5">
                      <span className="text-[10px] text-white/60 block">Sugar</span>
                      <span className="text-xs font-bold text-white">118 mg</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-1.5">
                      <span className="text-[10px] text-white/60 block">SpO2</span>
                      <span className="text-xs font-bold text-emerald-400">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST PARTNERS & ACCREDITATIONS                                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#5C6F75] mb-6">
            Trusted By Clinical Leaders & Networked With 120+ Tertiary Hospital Chains
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
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
              Lilavati Hospital
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE SERVICE EXPLORER                                           */}
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
              From critical ICU nursing to gentle daily assistance and emergency hospitalization advocacy.
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
      {/* 4. THE 4 PILLARS OF CLINICAL DIFFERENTIATION                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-14 border border-[#1C4550] shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 mb-10">
            <Badge variant="gold" size="md">
              The Aeterna Quality Standard
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-white">
              Why Discerning Families Choose Aeterna Over Local Agencies
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light">
              Elder care is not domestic maid placement. It is a clinical responsibility requiring medical oversight, continuous monitoring, and absolute trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading font-bold text-lg text-white">
                Chief Medical Officer Oversight
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                Every nursing shift and caregiver routine is audited by our senior MD Geriatricians. Not unsupervised domestic staff.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading font-bold text-lg text-white">
                7-Stage Rigorous Vetting
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                Aadhaar biometric scan, court criminal history check, medical fitness, and 120 hours of geriatric training.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading font-bold text-lg text-white">
                Real-Time Family App Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                Children living in the USA, UK, or other cities receive daily vitals charts, GPS attendance logs, and doctor summaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading font-bold text-lg text-white">
                Guaranteed 2-4 Hr Standby Bench
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                If an attendant falls sick, our backup certified bench ensures immediate handover without leaving parents alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 4-STEP CARE JOURNEY                                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="sage" size="md">
            Simple 4-Step Onboarding
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            How We Onboard & Protect Your Parents
          </h2>
          <p className="text-sm sm:text-base text-[#5C6F75]">
            A structured, dignified transition designed to establish immediate trust and clinical safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-[#0D2329] text-white font-serif-heading font-bold flex items-center justify-center text-sm">
              01
            </span>
            <h3 className="font-bold text-lg text-[#0D2329]">Tell Us Your Requirements</h3>
            <p className="text-xs sm:text-sm text-[#5C6F75] leading-relaxed">
              Complete our 60-second diagnostic wizard or speak to a Senior Care Specialist about your parent’s clinical conditions.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-[#3D685A] text-white font-serif-heading font-bold flex items-center justify-center text-sm">
              02
            </span>
            <h3 className="font-bold text-lg text-[#0D2329]">In-Home Clinical Triage</h3>
            <p className="text-xs sm:text-sm text-[#5C6F75] leading-relaxed">
              Our Geriatric Care Manager visits the home to audit mobility, medication charts, dietary habits, and room ergonomics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-[#C58F58] text-white font-serif-heading font-bold flex items-center justify-center text-sm">
              03
            </span>
            <h3 className="font-bold text-lg text-[#0D2329]">Caregiver Matching & Trial</h3>
            <p className="text-xs sm:text-sm text-[#5C6F75] leading-relaxed">
              We match 2-3 verified profiles based on language, dietary preferences, and temperament. A trial orientation is conducted.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-emerald-700 text-white font-serif-heading font-bold flex items-center justify-center text-sm">
              04
            </span>
            <h3 className="font-bold text-lg text-[#0D2329]">24/7 Supervised Care & App</h3>
            <p className="text-xs sm:text-sm text-[#5C6F75] leading-relaxed">
              Care begins with automated daily vitals logs, weekly doctor reviews, and continuous 24/7 emergency ambulance standby.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/find-care">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start 60-Second Care Assessment →
            </Button>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CARE PLANS & PRICING PREVIEW                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="gold" size="md">
            Transparent Memberships
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Comprehensive Care Plans for Every Family Need
          </h2>
          <p className="text-sm sm:text-base text-[#5C6F75]">
            Predictable monthly or annual memberships with doctor home visits, nursing hours, and emergency ambulance included.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-[#F6F1E8] rounded-full border border-[#E2D7C5] mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#0D2329] text-white shadow-sm'
                  : 'text-[#5C6F75] hover:text-[#0D2329]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#0D2329] text-white shadow-sm'
                  : 'text-[#5C6F75] hover:text-[#0D2329]'
              }`}
            >
              <span>Annual Membership</span>
              <span className="bg-[#C58F58] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 4 Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carePlansData.map((plan) => {
            const price = billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#C58F58] shadow-xl relative -translate-y-2'
                    : 'bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3D685A]">
                      {plan.badge}
                    </span>
                    {plan.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C58F58] text-white">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">{plan.name}</h3>
                  <p className="text-xs text-[#5C6F75] mt-1 min-h-[36px] line-clamp-2">
                    {plan.tagline}
                  </p>

                  <div className="mt-5 pb-5 border-b border-[#E8E2D8]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0D2329]">
                        {formatINR(price)}
                      </span>
                      <span className="text-xs text-[#5C6F75]">/ month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <span className="text-[11px] font-semibold text-emerald-700 block mt-1">
                        Billed annually ({formatINR(plan.priceAnnual)}/yr) • Save {formatINR(plan.annualSavings)}
                      </span>
                    )}
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
      {/* 7. VERIFIED TESTIMONIALS CAROUSEL                                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialCarousel />
      </section>

      {/* ========================================================================= */}
      {/* 8. CITY LOCATIONS DIRECTORY                                               */}
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
      {/* 9. LATEST CLINICAL RESOURCES & GUIDES                                      */}
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
      {/* 10. INTERACTIVE FAQ ACCORDION                                             */}
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
      {/* 11. FINAL HIGH-CONVERSION CTA                                             */}
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
              Join 12,000+ families who sleep peacefully knowing their aging parents have certified nurses, regular doctor checkups, and 24/7 emergency response.
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
