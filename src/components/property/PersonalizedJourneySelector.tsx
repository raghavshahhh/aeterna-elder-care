'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import {
  Heart,
  Home,
  Compass,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type JourneyIntent =
  | 'PARENTS'
  | 'MYSELF'
  | 'PLOT'
  | 'RESIDENCE'
  | 'TRUST';

interface JourneyStep {
  step: string;
  label: string;
  targetId: string;
}

interface IntentOption {
  id: JourneyIntent;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  targetSectionId: string;
  highlightText: string;
  steps: JourneyStep[];
}

export const PersonalizedJourneySelector: React.FC = () => {
  const [selectedIntent, setSelectedIntent] = useState<JourneyIntent>('PARENTS');
  const { openLeadDrawer } = useModal();

  const options: IntentOption[] = [
    {
      id: 'PARENTS',
      title: 'For My Parents',
      subtitle: '24/7 Healthcare, Daily Mandir & Safety',
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      badge: 'Most Popular',
      targetSectionId: 'family-story',
      highlightText: 'A safe, peaceful sanctuary with on-site Ayurvedic hospital, barrier-free design, and like-minded companions.',
      steps: [
        { step: '01', label: 'Healthcare & Safety', targetId: 'family-story' },
        { step: '02', label: 'SH-22 Location', targetId: 'location-connectivity' },
        { step: '03', label: '64-Plot Masterplan', targetId: 'availability-matrix' }
      ]
    },
    {
      id: 'MYSELF',
      title: 'For My Retirement',
      subtitle: 'Unhurried Living, Wellness & Nature',
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
      badge: 'Independent Living',
      targetSectionId: 'why-senior-living',
      highlightText: 'Spacious green sanctuary near Delhi NCR with clean air, reflection kund, and active senior community.',
      steps: [
        { step: '01', label: 'Senior-First Living', targetId: 'why-senior-living' },
        { step: '02', label: 'Ayurvedic Ecosystem', targetId: 'building-vision' },
        { step: '03', label: 'Plot & Villa Pricing', targetId: 'payment-plans' }
      ]
    },
    {
      id: 'PLOT',
      title: 'Freehold Residential Plot',
      subtitle: '64 Demarcated Plots (120 to 425 Sq. Yd.)',
      icon: <Home className="w-5 h-5 text-[#C58F58]" />,
      badge: 'Clear Title',
      targetSectionId: 'availability-matrix',
      highlightText: 'Direct registry land parcels with 33ft/22.5ft road access, underground utilities, and park frontage.',
      steps: [
        { step: '01', label: 'Interactive 3D CAD', targetId: 'availability-matrix' },
        { step: '02', label: 'Forensic Dimensions', targetId: 'availability-matrix' },
        { step: '03', label: 'Book 24h Hold', targetId: 'payment-plans' }
      ]
    },
    {
      id: 'RESIDENCE',
      title: 'Senior Care Residence',
      subtitle: 'G+2 Barrier-Free 1 BHK & 1 RK Suites',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      badge: 'Fully Serviced',
      targetSectionId: 'residences-explorer',
      highlightText: 'Stilt parking, stretcher elevator, emergency call points, and attached caregiver support.',
      steps: [
        { step: '01', label: 'G+2 Elevation CGI', targetId: 'residences-explorer' },
        { step: '02', label: 'Measured Floor Plans', targetId: 'residences-explorer' },
        { step: '03', label: 'Milestone Plans', targetId: 'payment-plans' }
      ]
    },
    {
      id: 'TRUST',
      title: 'Trust & Legal Records',
      subtitle: 'Section 8 NPO, Title Deeds & Bank Loans',
      icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
      badge: 'Verified Records',
      targetSectionId: 'trust-transparency',
      highlightText: 'Audited Section 8 non-profit foundation, Form 10AC/80G status, and national bank home loan eligibility.',
      steps: [
        { step: '01', label: 'Section 8 Registry', targetId: 'trust-transparency' },
        { step: '02', label: '10AC / 80G Tax Exemption', targetId: 'trust-transparency' },
        { step: '03', label: 'Buyer Legal Roadmap', targetId: 'buyer-journey' }
      ]
    }
  ];

  const handleSelect = (option: IntentOption) => {
    setSelectedIntent(option.id);
    const target = document.getElementById(option.targetSectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStepJump = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeOption = options.find((o) => o.id === selectedIntent) || options[0];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl sm:rounded-4xl border border-[#E8E2D8] shadow-2xl p-5 sm:p-7 backdrop-blur-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E8E2D8]/70">
          <div>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C58F58] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
              Personalized Senior Living Navigator
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329] tracking-tight">
              What are you exploring today?
            </h2>
          </div>
          <p className="text-xs text-[#53676E] max-w-md">
            Select your goal to automatically highlight relevant features, masterplan details, and pricing.
          </p>
        </div>

        {/* Intent Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {options.map((opt) => {
            const isSelected = selectedIntent === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className={cn(
                  'p-3 sm:p-4 rounded-2xl text-left transition-all relative flex flex-col justify-between border cursor-pointer group',
                  isSelected
                    ? 'bg-[#0D2329] text-white border-[#0D2329] shadow-lg scale-[1.02]'
                    : 'bg-[#FAF8F5] text-[#0D2329] border-[#E8E2D8] hover:border-[#C58F58]/50 hover:bg-white'
                )}
              >
                <div className="flex items-center justify-between gap-1 w-full mb-2">
                  <div className={cn('p-2 rounded-xl', isSelected ? 'bg-white/10' : 'bg-white shadow-sm')}>
                    {opt.icon}
                  </div>
                  <span
                    className={cn(
                      'text-[9px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider',
                      isSelected
                        ? 'bg-[#C58F58] text-white'
                        : 'bg-[#EAF2EE] text-[#2C5E50]'
                    )}
                  >
                    {opt.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xs sm:text-sm font-serif-heading line-clamp-1">
                    {opt.title}
                  </h3>
                  <p
                    className={cn(
                      'text-[10px] mt-0.5 line-clamp-1',
                      isSelected ? 'text-white/70' : 'text-[#53676E]'
                    )}
                  >
                    {opt.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Selection Guided Pathway Progression */}
        <div className="p-4 rounded-2xl bg-[#EAF2EE]/60 border border-[#CDE0D7] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#2C5E50] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#2C5E50] shrink-0" />
              <span>Recommended Guided Path for {activeOption.title}:</span>
            </div>
            <p className="text-[#0D2329] font-medium text-[11px] max-w-xl">
              {activeOption.highlightText}
            </p>
          </div>

          {/* 3 Step Breadcrumbs */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {activeOption.steps.map((st, i) => (
              <button
                key={i}
                onClick={() => handleStepJump(st.targetId)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#2C5E50] hover:text-white text-[#0D2329] border border-[#CDE0D7] text-[11px] font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-[#EAF2EE] text-[#2C5E50] font-mono text-[9px] font-bold flex items-center justify-center">
                  {st.step}
                </span>
                <span>{st.label}</span>
                {i < activeOption.steps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-[#53676E]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
