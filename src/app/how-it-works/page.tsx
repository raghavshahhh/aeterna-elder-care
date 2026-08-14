'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { useModal } from '@/context/ModalContext';
import {
  Heart,
  ShieldCheck,
  Activity,
  PhoneCall,
  Clock,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Siren,
  Smartphone
} from 'lucide-react';

export default function HowItWorksPage() {
  const { openLeadDrawer } = useModal();
  const [activePerspective, setActivePerspective] = useState('family');

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="sage" size="md">
            The Care Journey
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif-heading font-bold text-[#0D2329]">
            How Aeterna Care Works From Day One
          </h1>
          <p className="text-base sm:text-lg text-[#5C6F75] font-light max-w-2xl mx-auto">
            A seamless, dignified transition that replaces hospital anxiety with the safety and comfort of your own home.
          </p>
        </div>
      </section>

      {/* 4-Stage Interactive Visual Walkthrough */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* STAGE 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C58F58]">
              Stage 01 • Day 0
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              In-Depth Clinical & Lifestyle Diagnostics
            </h2>
            <p className="text-sm text-[#5C6F75] leading-relaxed">
              We never send random staff without understanding the patient. Our Geriatric Clinical Lead conducts a 45-minute bedside assessment to evaluate mobility, review hospital discharge notes, audit polypharmacy risks, and map dietary needs.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0D2329]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Standardized MMSE Cognitive & Berg Balance Testing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Home Environment & Fall-Risk Audit</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-[#F6F1E8]">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                alt="Stage 1 Assessment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* STAGE 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:flex-row-reverse">
          <div className="lg:col-span-6 lg:order-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3D685A]">
              Stage 02 • Day 1
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              Caregiver Matching & Guided Handover
            </h2>
            <p className="text-sm text-[#5C6F75] leading-relaxed">
              Based on the diagnostic profile, we match candidate profiles with specific competencies (e.g. tracheostomy, stroke rehab, dementia validation) and cultural compatibility. On Day 1, our Care Supervisor personally conducts the on-site briefing.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0D2329]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Police and Biometric Verified Staff with Photo ID</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Emergency protocol and emergency numbers calibrated</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-[#F6F1E8]">
              <Image
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80"
                alt="Stage 2 Handover"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* STAGE 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Stage 03 • Daily Routine
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              Supervised Daily Execution with Vitals Sync
            </h2>
            <p className="text-sm text-[#5C6F75] leading-relaxed">
              Every morning and evening, the caregiver logs blood pressure, pulse, blood sugar, and medication compliance into our clinical tablet. Real-time algorithms flag any vitals abnormalities to our central medical desk.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0D2329]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Shift logs viewable on Family Portal anywhere in the world</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Weekly supervision call by Senior Nursing Superintendent</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-[#F6F1E8]">
              <Image
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                alt="Stage 3 Vitals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* STAGE 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:flex-row-reverse">
          <div className="lg:col-span-6 lg:order-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Stage 04 • Continuous Safety
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              24/7 Monitored Protection & Priority Hospital SOS
            </h2>
            <p className="text-sm text-[#5C6F75] leading-relaxed">
              In any sudden medical crisis, pressing the SOS button alerts our 24/7 Command Center. The nearest ACLS cardiac ambulance is dispatched in under 15 minutes, the receiving hospital ER is pre-booked, and our Care Advocate meets the patient at the hospital gates.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0D2329]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Average 14.8-minute emergency response time</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Complete hospital admission advocacy and paperwork support</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-[#F6F1E8]">
              <Image
                src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80"
                alt="Stage 4 Emergency"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Guarantees Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-12 border border-[#1C4550] shadow-2xl text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Our Zero-Compromise Quality Commitment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-emerald-400 font-bold text-sm block">100% Replacement Guarantee</span>
              <p className="text-xs text-white/70">
                If your parent does not feel comfortable with the attendant, we replace them within 24-48 hours with zero fees.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[#C58F58] font-bold text-sm block">Biometric Shift Punctuality</span>
              <p className="text-xs text-white/70">
                All staff check in digitally via geo-fenced mobile attendance so you are never left guessing shift timings.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-blue-400 font-bold text-sm block">24/7 Supervising Doctor Call</span>
              <p className="text-xs text-white/70">
                Our central medical officer is available on instant hotline to adjust prescriptions or review sudden vitals changes.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/find-care">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Your Family’s Care Assessment →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
