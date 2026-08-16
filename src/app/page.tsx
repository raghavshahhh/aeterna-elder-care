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
import { useToast } from '@/context/ToastContext';
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
  UserCheck,
  Search,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
  Sliders,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const { openEmergency, openWhatsApp, openLeadDrawer } = useModal();
  const { showToast } = useToast();

  // 1. Service Filter Category State
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // 2. Interactive Vitals Simulator State (Hero Section)
  const [vitalsState, setVitalsState] = useState({
    bp: '120/80',
    pulse: '72 bpm',
    sugar: '110 mg/dL',
    spo2: '99%',
    radarStatus: 'Active & Safe',
    lastSync: 'Just Now'
  });
  const [isSimulatingVitals, setIsSimulatingVitals] = useState(false);

  // 3. Interactive In-Page Care Cost & Assessment Calculator State
  const [calcWho, setCalcWho] = useState<'both' | 'father' | 'mother'>('both');
  const [calcNeed, setCalcNeed] = useState<string>('attendant');
  const [calcShift, setCalcShift] = useState<'12hr-day' | '12hr-night' | '24hr-livein' | 'per-visit'>('12hr-day');
  const [calcCity, setCalcCity] = useState<string>('Delhi NCR');

  // 4. Interactive Smart IoT Radar Fall Simulator State
  const [radarSimStatus, setRadarSimStatus] = useState<'monitoring' | 'fall_detected' | 'dispatched'>('monitoring');

  // 5. Club Aeterna Live Event RSVP State
  const [rsvpdEvents, setRsvpdEvents] = useState<Record<string, boolean>>({});

  // 6. FAQ Search & Category Filter
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('all');

  // Service categories
  const categoryOptions = [
    { id: 'all', label: 'All 10 Specialized Services' },
    { id: 'critical-care', label: 'ICU & Clinical Nursing' },
    { id: 'daily-living', label: 'Attendants & Caregivers' },
    { id: 'medical-rehab', label: 'Senior MD Doctors & Physio' },
    { id: 'dementia-memory', label: 'Dementia & Memory Care' },
    { id: 'companionship', label: 'Daughter on Demand™' }
  ];

  const filteredServices = servicesData.filter((srv) => {
    if (activeCategory === 'all') return true;
    return srv.category === activeCategory;
  });

  // Calculate instant care estimation
  const getCalculatedPrice = () => {
    let baseRate = 1200;
    if (calcNeed === 'icu-nursing') baseRate = 1800;
    if (calcNeed === 'attendant') baseRate = 1100;
    if (calcNeed === 'doctor-physio') baseRate = 1500;
    if (calcNeed === 'dementia') baseRate = 1400;
    if (calcNeed === 'daughter-concierge') baseRate = 650;

    let multiplier = 1;
    if (calcShift === '12hr-day') multiplier = 1;
    if (calcShift === '12hr-night') multiplier = 1.1;
    if (calcShift === '24hr-livein') multiplier = 1.85;
    if (calcShift === 'per-visit') multiplier = 0.6;

    if (calcWho === 'both') multiplier *= 1.35;

    const perShift = Math.round(baseRate * multiplier);
    const perMonth = perShift * 30;

    return { perShift, perMonth };
  };

  const currentEstimate = getCalculatedPrice();

  // Simulate Vitals Telemetry Ping
  const handleSimulateVitals = () => {
    setIsSimulatingVitals(true);
    showToast({
      title: 'Syncing Maa-Bauji Live Vitals...',
      description: 'Pinging bedside clinical monitor & AI ceiling radar.',
      type: 'info'
    });

    setTimeout(() => {
      const pulseRates = ['68 bpm', '72 bpm', '74 bpm', '70 bpm'];
      const bps = ['118/78', '122/80', '120/82', '124/80'];
      const sugars = ['108 mg/dL', '112 mg/dL', '115 mg/dL', '106 mg/dL'];
      const randomPulse = pulseRates[Math.floor(Math.random() * pulseRates.length)];
      const randomBp = bps[Math.floor(Math.random() * bps.length)];
      const randomSugar = sugars[Math.floor(Math.random() * sugars.length)];

      setVitalsState({
        bp: randomBp,
        pulse: randomPulse,
        sugar: randomSugar,
        spo2: '99%',
        radarStatus: 'Active & Safe',
        lastSync: 'Synced 1s ago'
      });
      setIsSimulatingVitals(false);
      showToast({
        title: 'Vitals Normal & Stable',
        description: `Heart Rate: ${randomPulse} | BP: ${randomBp} | SpO2: 99% (All parameters normal).`,
        type: 'success'
      });
    }, 800);
  };

  // Simulate Fall Radar Emergency
  const handleSimulateFallAlert = () => {
    setRadarSimStatus('fall_detected');
    showToast({
      title: '🚨 Slip / Fall Anomaly Detected!',
      description: 'Contactless millimeter-wave radar detected zero motion on bedroom floor.',
      type: 'warning'
    });

    setTimeout(() => {
      setRadarSimStatus('dispatched');
      showToast({
        title: 'Ambulance & Doctor Pre-Alerted!',
        description: '24/7 Command Center is live voice-connecting to room & dispatching nearest ACLS unit.',
        type: 'success'
      });
    }, 1800);
  };

  const handleResetFallAlert = () => {
    setRadarSimStatus('monitoring');
    showToast({
      title: 'Radar Calibrated to Normal Standby',
      description: 'Continuous non-optical monitoring active.',
      type: 'info'
    });
  };

  // RSVP for Club Aeterna Event
  const handleEventRsvp = (eventId: string, title: string) => {
    setRsvpdEvents((prev) => ({ ...prev, [eventId]: true }));
    showToast({
      title: 'RSVP Confirmed!',
      description: `You & your parents have been registered for "${title}". WhatsApp invite link sent.`,
      type: 'success'
    });
  };

  // Filtered FAQs
  const filteredFaqs = faqsData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory = faqCategory === 'all' || faq.category === faqCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 sm:space-y-28 pb-20">
      {/* ========================================================================= */}
      {/* 1. TOP LIVE DISPATCH & TRUST SLA TICKER                                   */}
      {/* ========================================================================= */}
      <div className="bg-[#0D2329] text-white py-2.5 px-4 text-xs border-b border-[#1C4550]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-300">Live Clinical Command Active:</span>
            <span className="text-white/80 hidden sm:inline">12 Metros On Standby • Avg. Ambulance SLA: 11.4 Mins</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium text-white/90">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" /> 100% Police Verified Staff
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#C58F58]" /> NABH Compliant Protocols
            </span>
            <span className="text-white/30">•</span>
            <a href="tel:+911140849900" className="text-[#C58F58] font-bold hover:underline">
              24/7 Helpline: +91 11 4084 9900
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Deeply Emotional, Dignified Indian Elder Healthcare)      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-4 sm:pt-10 pb-12 sm:pb-20 bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Column (Copy + Direct Conversion Triggers) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2D7C5] shadow-xs text-xs font-semibold text-[#0D2329]">
                <Heart className="w-3.5 h-3.5 fill-[#C58F58] text-[#C58F58] animate-heart-beat" />
                <span>Beti Jaisa Apnapan • Doctor Jaisi Dekhbhal</span>
                <span className="text-[#C58F58] font-bold">★ 4.96/5 (12,000+ Families)</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-extrabold text-[#0D2329] tracking-tight leading-[1.14]">
                Jab Aap Door Hain, Hum Hain Maa-Bauji Ka Sahara.
              </h1>

              {/* Emotional Subtitle */}
              <p className="text-base sm:text-lg text-[#2C5E50] font-normal leading-relaxed max-w-2xl">
                Ek bache ke pyaar aur ek senior doctor ke vishwas ke saath. 24/7 cardiac ambulances, certified ICU nurses, dementia caregivers, non-intrusive AI fall radars, aur rozana ki khushiyan.
              </p>

              {/* Primary Conversion CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link href="#care-calculator" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-bold text-sm sm:text-base px-8 py-4 shadow-lg hover:shadow-xl group"
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
                  className="w-full sm:w-auto text-[#0D2329] border-red-300 bg-red-50/80 hover:bg-red-100 hover:border-red-400 text-sm sm:text-base font-bold shadow-xs"
                >
                  24/7 Emergency Ambulance (&lt; 15m)
                </Button>
              </div>

              {/* Quick WhatsApp & Call Micro-actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#53676E]">
                <button
                  onClick={() => openWhatsApp({ service: 'General Elder Care Inquiry' })}
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp par Doctor se baat karein →</span>
                </button>

                <span className="text-[#E8E2D8] hidden sm:inline">•</span>

                <a
                  href="tel:+911140849900"
                  className="inline-flex items-center gap-1.5 font-bold text-[#0D2329] hover:text-[#C58F58] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>Direct Doctor Triage: +91 11 4084 9900</span>
                </a>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-5 border-t border-[#E8E2D8] grid grid-cols-3 gap-3 sm:gap-4">
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
                  <span className="text-xs text-[#53676E]">ACLS Ambulance Arrival</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-serif-heading font-extrabold text-[#C58F58]">
                    100%
                  </span>
                  <span className="text-xs text-[#53676E]">Biometric & Police Verified</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column (Authentic Indian 3-Generation Family Photo & Interactive Telemetry) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#F5EFE6] group">
                <Image
                  src="/images/indian-family-hero.jpg"
                  alt="Dignified Indian grandfather and grandmother with their loving daughter at home"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/95 via-black/25 to-transparent" />

                {/* Floating Top Rapid SOS Badge */}
                <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-[#E8E2D8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center animate-sos-pulse">
                      <Siren className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0D2329] block">24/7 Rapid SOS Command</span>
                      <span className="text-[10px] text-emerald-700 font-bold">12 Metro Emergency Desks Active</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                    SLA &lt; 15m
                  </span>
                </div>

                {/* Floating Bottom Interactive Telemetry Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D2329]/95 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white space-y-3 shadow-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#C58F58] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" /> Maa-Bauji Live Health Vitals
                    </span>
                    <button
                      onClick={handleSimulateVitals}
                      disabled={isSimulatingVitals}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                      title="Click to simulate live vitals reading"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSimulatingVitals ? 'animate-spin' : ''}`} />
                      <span>{vitalsState.lastSync}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white/10 p-2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-white/60 block">Blood Pressure</span>
                      <span className="font-bold text-white text-xs sm:text-sm">{vitalsState.bp}</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-white/60 block">Heart Pulse</span>
                      <span className="font-bold text-emerald-400 text-xs sm:text-sm">{vitalsState.pulse}</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-white/60 block">AI Fall Radar</span>
                      <span className="font-bold text-emerald-400 text-[11px] block truncate">{vitalsState.radarStatus}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-white/70">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> All Vitals Synchronized with Family App
                    </span>
                    <button
                      onClick={handleSimulateVitals}
                      className="underline text-xs text-[#C58F58] hover:text-white font-medium cursor-pointer"
                    >
                      Test Ping →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE IN-PAGE CARE ESTIMATION CALCULATOR                         */}
      {/* ========================================================================= */}
      <section id="care-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-gradient-to-br from-[#0D2329] via-[#112E36] to-[#0D2329] text-white rounded-3xl p-6 sm:p-12 border border-[#1C4550] shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C58F58] text-xs font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>Instant Care Assessment & Transparent Cost Estimator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold text-white">
                Find the Perfect Care Roadmap for Your Parents
              </h2>
              <p className="text-xs sm:text-sm text-white/75">
                Customize shifts, medical requirements, and city to calculate exact per-shift rates with zero hidden charges.
              </p>
            </div>

            <div className="text-left md:text-right bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-xs text-white/60 block">Estimated Investment</span>
              <div className="text-2xl sm:text-3xl font-serif-heading font-extrabold text-[#C58F58]">
                {formatINR(currentEstimate.perShift)}
                <span className="text-xs font-normal text-white/70 ml-1">/ shift</span>
              </div>
              <span className="text-[11px] text-emerald-400 block mt-0.5">
                ~ {formatINR(currentEstimate.perMonth)} per month (30 shifts)
              </span>
            </div>
          </div>

          {/* 3 Steps Control Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* Step 1: Who is care for? */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] block">
                Step 1 • Who Needs Care?
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCalcWho('father')}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    calcWho === 'father'
                      ? 'bg-[#C58F58] text-[#0D2329] border-[#C58F58]'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  Father (Bauji)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcWho('mother')}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    calcWho === 'mother'
                      ? 'bg-[#C58F58] text-[#0D2329] border-[#C58F58]'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  Mother (Mataji)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcWho('both')}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    calcWho === 'both'
                      ? 'bg-[#C58F58] text-[#0D2329] border-[#C58F58]'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  Both Parents
                </button>
              </div>
            </div>

            {/* Step 2: Primary Care Requirement */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] block">
                Step 2 • Primary Requirement
              </span>
              <select
                value={calcNeed}
                onChange={(e) => setCalcNeed(e.target.value)}
                className="w-full bg-[#0D2329] border border-white/20 text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C58F58]"
              >
                <option value="attendant">24x7 Attendant (Hygiene, Bathing, Mobility)</option>
                <option value="icu-nursing">ICU Clinical Nursing (Tracheostomy, IV, Ryle&apos;s Tube)</option>
                <option value="dementia">Dementia & Alzheimer&apos;s Memory Companion</option>
                <option value="doctor-physio">Senior Doctor Home Visits & Neuro Physio</option>
                <option value="daughter-concierge">Daughter on Demand™ (Outings & Errands)</option>
              </select>
            </div>

            {/* Step 3: Shift Preference & City */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] block">
                Step 3 • Shift Duration & City
              </span>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={calcShift}
                  onChange={(e) => setCalcShift(e.target.value as any)}
                  className="w-full bg-[#0D2329] border border-white/20 text-white rounded-xl px-2.5 py-2.5 text-xs focus:outline-none focus:border-[#C58F58]"
                >
                  <option value="12hr-day">12-Hr Day Shift</option>
                  <option value="12hr-night">12-Hr Night Shift</option>
                  <option value="24hr-livein">24-Hr Live-in</option>
                  <option value="per-visit">Per Visit / Procedure</option>
                </select>

                <select
                  value={calcCity}
                  onChange={(e) => setCalcCity(e.target.value)}
                  className="w-full bg-[#0D2329] border border-white/20 text-white rounded-xl px-2.5 py-2.5 text-xs focus:outline-none focus:border-[#C58F58]"
                >
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Noida">Noida</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Chandigarh">Chandigarh</option>
                </select>
              </div>
            </div>
          </div>

          {/* Calculator Output CTA Bar */}
          <div className="p-5 bg-white/10 rounded-2xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-white/90">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white text-sm">Included in every plan:</strong>
                <span>100% Police verification • Free backup replacement • Weekly doctor case audit • 24/7 SOS desk</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="gold"
                size="md"
                className="w-full md:w-auto font-bold"
                onClick={() =>
                  openLeadDrawer({
                    title: `Care Request for ${calcWho} in ${calcCity}`,
                    service: `${calcNeed} (${calcShift})`
                  })
                }
              >
                Book Free In-Home Doctor Assessment →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRE-INTEGRATED HOSPITAL NETWORK STRIP                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-xs text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#53676E]">
            Pre-Integrated with 120+ Top Indian Hospital Emergency Trauma Rooms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-90">
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
      {/* 5. THE 4 FOUNDATIONAL PILLARS OF CARE                                     */}
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
      {/* 6. INTERACTIVE 10 CLINICAL SERVICES EXPLORER                              */}
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
      {/* 7. SMART IOT RADAR & FALL SAFETY SHOWCASE (Interactive Simulation Demo)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFE6] rounded-3xl p-6 sm:p-12 border border-[#E2D7C5] space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Smart Radar Tech Demo */}
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="gold" size="sm">
                Non-Optical AI Senior Safety
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold text-[#0D2329] leading-tight">
                Zero-Camera AI Fall Radars & 4G SOS Smart Pendants
              </h2>
              <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                Elderly parents value privacy above all else. Our millimeter-wave radar sensors detect falls, slips, and breathing abnormalities in washrooms and bedrooms without any cameras or microphones.
              </p>

              {/* Interactive Simulation Panel */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D2329] flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-[#C58F58]" /> Live Radar Sensor Status:
                  </span>
                  {radarSimStatus === 'monitoring' && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ● Active & Monitoring (Safe)
                    </span>
                  )}
                  {radarSimStatus === 'fall_detected' && (
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 animate-pulse">
                      🚨 Fall Event Triggered
                    </span>
                  )}
                  {radarSimStatus === 'dispatched' && (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      🚑 Ambulance Dispatched (&lt; 15m)
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleSimulateFallAlert}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer"
                  >
                    Simulate Slip / Fall Anomaly →
                  </button>
                  <button
                    type="button"
                    onClick={handleResetFallAlert}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF8F5] hover:bg-[#EAF2EE] text-[#0D2329] border border-[#E2D7C5] transition-colors cursor-pointer"
                  >
                    Reset to Normal Standby
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <Link href="/devices">
                  <Button variant="primary" size="md">
                    Order / Rent Safety Devices →
                  </Button>
                </Link>
                <button
                  onClick={() => openWhatsApp({ service: 'Smart Radar & Fall Device Setup' })}
                  className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  Ask Doctor about Device Specs →
                </button>
              </div>
            </div>

            {/* Right: High-Res Real Indian Elder with Radar Sensor Photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-[#F5EFE6] group">
                <Image
                  src="/images/indian-radar-safety.jpg"
                  alt="Dignified Indian grandfather peacefully reading newspaper with discrete AI ceiling radar mounted above"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8E2D8] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0D2329]">
                    100% Optical-Free • Zero Video Recording
                  </span>
                  <span className="text-emerald-700 font-bold">Privacy Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLUB AETERNA COMMUNITY & LIVE DAILY SESSIONS SCHEDULE                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-6 sm:p-12 border border-[#1C4550] shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Community Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white/10 aspect-4/3 bg-[#112E36]">
                <Image
                  src="/images/indian-club-seniors.jpg"
                  alt="Joyful Indian seniors participating in morning chair yoga and laughing club"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                  <Radio className="w-3 h-3" /> Live Show Active
                </div>
              </div>
            </div>

            {/* Right: Today's Live Schedule */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <Badge variant="gold" size="sm">
                  Club Aeterna Active Aging
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold text-white mt-1">
                  Loneliness Ka Ant: Daily Live TV Shows & Sangeet
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Free for all seniors. Connect on Zoom / Smart TV with hundreds of fellow Indian elders every morning and evening.
                </p>
              </div>

              {/* Schedule List */}
              <div className="space-y-3">
                {communityEventsData.slice(0, 3).map((event) => {
                  const isRsvpd = rsvpdEvents[event.id];
                  return (
                    <div
                      key={event.id}
                      className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#C58F58]">{event.time}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-xs text-emerald-400 font-semibold">{event.category}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{event.title}</h4>
                        <span className="text-[11px] text-white/60">Hosted by {event.hostName} ({event.attendeesCount} Elders Joining)</span>
                      </div>

                      <Button
                        variant={isRsvpd ? 'outline' : 'gold'}
                        size="sm"
                        onClick={() => handleEventRsvp(event.id, event.title)}
                        className="shrink-0 text-xs font-bold"
                      >
                        {isRsvpd ? '✓ RSVP Confirmed' : 'Join Free Live Show →'}
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <Link href="/community" className="text-[#C58F58] hover:underline font-bold">
                  Explore Full Monthly Calendar (30+ Shows) →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DEDICATED FOR NRI & OUTSTATION CHILDREN SAFETY HUB                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0D2329] via-[#112E36] to-[#0D2329] text-white rounded-3xl p-8 sm:p-14 border border-[#1C4550] shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold">
              <Globe className="w-4 h-4" />
              <span>For Children Living in USA, UK, Canada, UAE, Singapore & Across India</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-white leading-tight">
              Door Rehte Hain? Hum Hain Bharat Me Aapke Parents Ka Parivaar.
            </h2>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-normal">
              Samudra paar rehne ka dard aur chinta hum samajhte hain. Jab bhi koi achanak bimari ya midnight emergency ho, Aeterna Care on-ground hazir rehta hai.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dedicated WhatsApp group synced to US/UK timezones</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Daily shift vitals telemetry & biometric check-in reports</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Emergency hospital green-channel admission & insurance advocacy</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Multi-currency international cards & Wire transfers accepted</span>
              </div>
            </div>

            <div className="pt-3">
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
              &ldquo;Living in San Jose, my biggest fear was my father collapsing in South Delhi. Aeterna dispatched an ACLS ambulance within 12 minutes, admitted him to Max Healthcare, and their Care Manager stood by his bedside till I landed in Delhi.&rdquo;
            </p>
            <div className="text-[11px] text-[#C58F58] font-bold">
              — Siddharth Mehta, VP Engineering (San Jose, California)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. VERIFIED TESTIMONIALS CAROUSEL                                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialCarousel />
      </section>

      {/* ========================================================================= */}
      {/* 11. CITY LOCATIONS DIRECTORY WITH EMERGENCY SLAs                         */}
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
      {/* 12. SEARCHABLE FAQS & CONCERNS                                            */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="sage" size="md">
            Everything You Need to Know
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Frequently Asked Questions by Families
          </h2>
          <p className="text-sm text-[#53676E]">
            Have a question about attendant screening, medical emergencies, or NRI payments?
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#53676E] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. background check, emergency ambulance, replacement)..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E2D8] rounded-2xl text-xs sm:text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50] shadow-xs"
          />
        </div>

        {/* Accordion FAQ Items */}
        <div className="pt-2">
          <Accordion
            items={filteredFaqs.slice(0, 6).map((faq) => ({
              id: faq.id,
              title: faq.question,
              content: faq.answer
            }))}
          />
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => openWhatsApp({ service: 'FAQ Help' })}
            className="text-xs font-bold text-emerald-800 hover:underline"
          >
            Have a specific question not answered here? Chat on WhatsApp →
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FINAL EMOTIONAL CALL TO ACTION (Maa-Bauji Ki Muskaan)                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-14 border border-[#E2D7C5] shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8 fill-current text-[#C58F58]" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-serif-heading font-extrabold text-[#0D2329]">
              Maa-Bauji Ko Dein Wahi Pyaar aur Samman, Jo Unhone Hamein Diya.
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              Keval ek call ya WhatsApp message par humare senior care manager aapke ghar aakar free clinical assessment karenge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-bold px-8 py-4"
              onClick={() => openLeadDrawer({ title: 'Free Home Doctor Assessment' })}
            >
              Book Free In-Home Clinical Assessment →
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => openEmergency()}
              className="w-full sm:w-auto text-red-700 border-red-300 bg-red-50 hover:bg-red-100 font-bold"
            >
              🚨 24/7 Emergency Ambulance Desk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
