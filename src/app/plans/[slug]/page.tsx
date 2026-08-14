'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { carePlansData } from '@/data/plansData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatINR } from '@/lib/utils';
import { useModal } from '@/context/ModalContext';
import {
  Check,
  ShieldCheck,
  Star,
  ArrowRight,
  PhoneCall,
  ChevronRight,
  AlertCircle,
  Siren,
  Sparkles
} from 'lucide-react';

interface PlanDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function PlanDetailPage({ params }: PlanDetailPageProps) {
  const resolvedParams = use(params);
  const { openLeadDrawer, openWhatsApp } = useModal();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plan = carePlansData.find((p) => p.slug === resolvedParams.slug);

  if (!plan) {
    notFound();
  }

  const price = billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly;
  const otherPlans = carePlansData.filter((p) => p.slug !== plan.slug);

  return (
    <div className="space-y-16 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F6F1E8] border-b border-[#E8E2D8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#5C6F75]">
          <Link href="/" className="hover:text-[#0D2329]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/plans" className="hover:text-[#0D2329]">
            Care Plans
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#0D2329]">{plan.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="gold" size="md">
                {plan.badge}
              </Badge>
              {plan.popular && (
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C58F58] text-white">
                  Most Chosen by Families
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#0D2329]">
              {plan.name}
            </h1>

            <p className="text-base sm:text-lg text-[#3D685A] font-medium leading-relaxed">
              {plan.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#5C6F75] font-light leading-relaxed">
              {plan.description}
            </p>

            {/* Ideal for box */}
            <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E2D7C5] text-xs sm:text-sm text-[#0D2329] space-y-1">
              <strong className="block text-[#3D685A] uppercase tracking-wider text-[11px]">
                Recommended Candidate Profile:
              </strong>
              <p className="text-[#5C6F75]">{plan.idealFor}</p>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="lg:col-span-5 bg-[#F9F6F0] rounded-3xl p-6 sm:p-8 border border-[#E2D7C5] space-y-6">
            {/* Billing switch */}
            <div className="flex items-center justify-between p-1 bg-white rounded-full border border-[#E2D7C5]">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === 'monthly' ? 'bg-[#0D2329] text-white shadow-sm' : 'text-[#5C6F75]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === 'annual' ? 'bg-[#0D2329] text-white shadow-sm' : 'text-[#5C6F75]'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#0D2329]">
                {formatINR(price)}
              </span>
              <span className="text-sm text-[#5C6F75] block mt-1">/ month</span>

              {billingCycle === 'annual' ? (
                <span className="text-xs font-bold text-emerald-700 block mt-2">
                  Total Annual Fee: {formatINR(plan.priceAnnual)} (Saved {formatINR(plan.annualSavings)})
                </span>
              ) : (
                <span className="text-xs text-[#5C6F75] block mt-2">
                  Billed monthly • Pause or cancel anytime
                </span>
              )}
            </div>

            <div className="space-y-3">
              <Link href={`/book?plan=${plan.slug}&billing=${billingCycle}`}>
                <Button variant="gold" size="lg" className="w-full font-bold">
                  Activate {plan.name} Membership →
                </Button>
              </Link>

              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => openLeadDrawer({ title: `Inquire about ${plan.name}`, service: plan.name })}
                leftIcon={<PhoneCall className="w-4 h-4 text-[#3D685A]" />}
              >
                Speak to Care Manager
              </Button>
            </div>

            <p className="text-[11px] text-center text-[#5C6F75]">
              Includes 24x7 Emergency Command Desk & Health Locker Storage.
            </p>
          </div>
        </div>
      </section>

      {/* Full Deliverables Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="sage" size="md">
            Complete Entitlements
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            Everything Included Under {plan.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.fullFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm"
            >
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#0D2329] font-medium leading-relaxed">
                {feat}
              </span>
            </div>
          ))}
        </div>

        {plan.limitations.length > 0 && (
          <div className="p-6 rounded-3xl bg-[#F6F1E8] border border-[#E2D7C5] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7C6E5F]">
              <AlertCircle className="w-4 h-4" />
              <span>Scope Clarity & Limitations</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#5C6F75]">
              {plan.limitations.map((lim, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Explore Other Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
          Explore Other Membership Options
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherPlans.map((other) => (
            <div
              key={other.id}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-lg text-[#0D2329]">{other.name}</h4>
                <p className="text-xs text-[#5C6F75] mt-1">{other.tagline}</p>
                <div className="mt-4 text-xl font-bold text-[#0D2329]">
                  {formatINR(other.priceMonthly)} <span className="text-xs font-normal text-[#5C6F75]">/mo</span>
                </div>
              </div>
              <Link href={`/plans/${other.slug}`} className="mt-6">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View {other.name} →
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
