'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { carePlansData } from '@/data/plansData';
import { PlanComparisonTable } from '@/components/shared/PlanComparisonTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { formatINR } from '@/lib/utils';
import { Check, Sparkles, ShieldCheck, PhoneCall, ArrowRight, Star } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const { openLeadDrawer, openWhatsApp } = useModal();

  const planFaqs = [
    {
      id: 'pf-1',
      title: 'Can we switch or upgrade our membership plan midway?',
      content: 'Yes! You can upgrade your plan at any time. Any remaining balance from your current billing cycle is credited pro-rata toward your new tier.'
    },
    {
      id: 'pf-2',
      title: 'How are emergency ambulance dispatches handled under the plan?',
      content: 'When an emergency occurs, your dedicated SOS button or call connects to our 24/7 Command Center. The nearest ACLS cardiac ambulance is dispatched immediately with zero paperwork delay. The dispatch costs are covered per your tier limits.'
    },
    {
      id: 'pf-3',
      title: 'Are medicines and medical equipment rental covered in the membership fee?',
      content: 'Members enjoy exclusive 15% to 20% flat discounts on all medicines, consumables, and medical equipment rentals. Under Diamond Concierge, routine daily diagnostics and telemetry kits are included.'
    },
    {
      id: 'pf-4',
      title: 'What if we need to pause our membership when our parents visit us abroad?',
      content: 'You can pause your active membership for up to 90 consecutive days in a calendar year without any cancellation penalty. Your tenure and accumulated benefits will be extended automatically.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold" size="md">
            Complete Elder Protection Plans
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif-heading font-bold text-[#0D2329] max-w-3xl mx-auto">
            Transparent Memberships for Every Stage of Aging
          </h1>
          <p className="text-base sm:text-lg text-[#5C6F75] max-w-2xl mx-auto font-light">
            Doctor home visits, nursing hours, health vitals telemetry, and guaranteed emergency ambulance coverage in one simple membership.
          </p>

          {/* Billing Switch */}
          <div className="pt-6">
            <div className="inline-flex items-center gap-3 p-1.5 bg-white rounded-full border border-[#E2D7C5] shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#0D2329] text-white shadow-sm'
                    : 'text-[#5C6F75] hover:text-[#0D2329]'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-[#0D2329] text-white shadow-sm'
                    : 'text-[#5C6F75] hover:text-[#0D2329]'
                }`}
              >
                <span>Annual Membership</span>
                <span className="bg-[#C58F58] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Plan Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {carePlansData.map((plan) => {
            const price = billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#C58F58] shadow-2xl relative -translate-y-2'
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
                  <p className="text-xs text-[#5C6F75] mt-1.5 min-h-[40px] leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 pb-6 border-b border-[#E8E2D8]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0D2329]">
                        {formatINR(price)}
                      </span>
                      <span className="text-xs text-[#5C6F75]">/ month</span>
                    </div>
                    {billingCycle === 'annual' ? (
                      <span className="text-[11px] font-semibold text-emerald-700 block mt-1">
                        Billed annually ({formatINR(plan.priceAnnual)}/yr) • Save {formatINR(plan.annualSavings)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#5C6F75] block mt-1">
                        Billed monthly • Pause anytime
                      </span>
                    )}
                  </div>

                  <div className="py-4 border-b border-[#E8E2D8] text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#5C6F75]">Doctor Visits / Yr:</span>
                      <strong className="text-[#0D2329]">{plan.doctorVisitsPerYear} Visits</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C6F75]">Ambulance Cover:</span>
                      <strong className="text-[#0D2329]">{plan.ambulanceCover}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C6F75]">Care Manager:</span>
                      <strong className="text-[#0D2329]">{plan.dedicatedCareManager ? 'Dedicated' : 'Shared Pool'}</strong>
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
                      Join {plan.name}
                    </Button>
                  </Link>

                  <Link
                    href={`/plans/${plan.slug}`}
                    className="block text-center text-xs font-medium text-[#5C6F75] hover:text-[#0D2329] py-1"
                  >
                    View Plan Deep-Dive →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Side-by-Side Detailed Feature Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="sage" size="md">
            Granular Comparison
          </Badge>
          <h2 className="text-3xl font-serif-heading font-bold text-[#0D2329]">
            Compare All 25+ Deliverables Side-by-Side
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Everything is included transparently. Zero surprise bills.
          </p>
        </div>

        <PlanComparisonTable billingCycle={billingCycle} />
      </section>

      {/* Optional Add-On Care Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="gold" size="md">
            Specialized Enhancements
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            Optional Add-On Care Packages
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Can be attached to any membership plan based on specific clinical needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm space-y-4">
            <span className="text-xs font-bold text-[#3D685A] bg-[#EAF2EE] px-3 py-1 rounded-full">
              Rehab Module
            </span>
            <h3 className="text-lg font-bold text-[#0D2329]">Post-Surgery Rehab Pack</h3>
            <p className="text-xs sm:text-sm text-[#5C6F75]">
              15 In-Home Physiotherapy sessions + portable electrotherapy + surgeon progress coordination.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-base font-bold text-[#0D2329]">₹10,500</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openLeadDrawer({ title: 'Add-on: Post-Surgery Rehab Pack', service: 'Rehab Module' })}
              >
                Add to Plan
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm space-y-4">
            <span className="text-xs font-bold text-[#C58F58] bg-[#FBF4EB] px-3 py-1 rounded-full">
              Cognitive Module
            </span>
            <h3 className="text-lg font-bold text-[#0D2329]">Dementia Sensory & Memory Box</h3>
            <p className="text-xs sm:text-sm text-[#5C6F75]">
              Monthly memory stimulation kit, aromatherapy diffuser, tactile calming blankets & neuropsychologist review.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-base font-bold text-[#0D2329]">₹3,200 / mo</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openLeadDrawer({ title: 'Add-on: Dementia Sensory Kit', service: 'Dementia Module' })}
              >
                Add to Plan
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm space-y-4">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              Safety Module
            </span>
            <h3 className="text-lg font-bold text-[#0D2329]">Complete Bathroom Fall-Proofing</h3>
            <p className="text-xs sm:text-sm text-[#5C6F75]">
              Stainless steel wall-mounted grab bars, anti-skid floor treatment, and motion sensor night lighting.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-base font-bold text-[#0D2329]">₹6,500 one-time</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openLeadDrawer({ title: 'Add-on: Bathroom Fall-Proofing', service: 'Safety Module' })}
              >
                Add to Plan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="sage" size="md">
            Membership Details
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            Membership FAQs
          </h2>
        </div>

        <Accordion items={planFaqs} />
      </section>
    </div>
  );
}
