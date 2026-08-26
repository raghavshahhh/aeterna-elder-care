'use client';

import React, { useState } from 'react';
import { paymentPlans, loanParameters, taxBenefits, additionalCharges, rentalProposition, buybackPolicy } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Calculator, CheckCircle2, FileText, BadgePercent, MessageSquare, ArrowRight, Shield, Car, Info, RotateCcw } from 'lucide-react';

export const FinancePaymentPlans: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(3000000); // 30 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20); // 20 Years

  // Calculate EMI
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = loanTenureYears * 12;
  const emi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <section id="finance" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <BadgePercent className="w-3.5 h-3.5 text-[#C58F58]" />
            14, 15 &amp; 16 • Pricing, Payment Options &amp; Rental Proposition
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-[#0D2329] tracking-tight">
            Transparent Pricing. <span className="italic font-serif text-[#C58F58]">Straightforward Plans.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            Down Payment Plan starting at <strong>₹25 Lakhs</strong> for senior residences with <strong>₹25,000/month rental return till possession</strong>, <strong>₹12,500/month rental return after possession</strong>, and <strong>100% direct freehold land registration</strong>.
          </p>
        </div>

        {/* 3 Structured Payment Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {paymentPlans.map((plan) => {
            const isFeatured = Boolean(plan.badge);
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#0D2329] text-white shadow-2xl ring-2 ring-[#C58F58] relative scale-[1.02]'
                    : 'bg-white text-[#0D2329] border border-[#E8E2D8] shadow-sm hover:shadow-xl'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#C58F58]">
                      {plan.code}
                    </span>
                    {plan.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-[11px] font-bold">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className={`text-2xl sm:text-3xl font-serif-heading font-bold tracking-tight ${isFeatured ? 'text-[#FAF8F5]' : 'text-[#0D2329]'}`}>
                      {plan.ratio}
                    </div>
                    <h3 className={`text-base sm:text-lg font-serif-heading font-bold mt-1 ${isFeatured ? 'text-[#F2EADA]' : 'text-[#0D2329]'}`}>
                      {plan.title}
                    </h3>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isFeatured ? 'text-white/85' : 'text-[#53676E]'}`}>
                    {plan.description}
                  </p>

                  {/* Payment Milestone Steps */}
                  <div className="space-y-2.5 pt-4 border-t border-current/15">
                    {plan.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-medium gap-2">
                        <span className={isFeatured ? 'text-white/80' : 'text-[#53676E]'}>
                          {step.milestone}
                        </span>
                        <span className="font-mono font-bold text-emerald-500 shrink-0">
                          {step.percentage}
                        </span>
                      </div>
                    ))}
                  </div>

                  {plan.highlight && (
                    <div className="p-3 rounded-xl bg-[#C58F58]/20 border border-[#C58F58]/40 text-xs text-[#E0AB77] font-semibold">
                      {plan.highlight}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => openWhatsApp({ actionType: 'request-pricing', message: `I want details on ${plan.title} (${plan.code}) for Senior Living Citizens Foundation...` })}
                  className={`mt-8 w-full py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFeatured
                      ? 'bg-[#C58F58] hover:bg-[#B37E47] text-[#071519] shadow-lg font-bold'
                      : 'bg-[#2C5E50] hover:bg-[#1D4B57] text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Select {plan.code} →
                </button>
              </div>
            );
          })}
        </div>

        {/* EOI Reservation via UPI */}
        <div className="mb-16 rounded-3xl bg-[#0D2329] border border-white/15 p-7 sm:p-9 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-7 items-center">
          <img
            src="/project-assets/commercial/payment-plans/eoi-payment-qr.jpeg"
            alt="Scan and Pay — Senior Living Citizens Foundation UPI QR (Collection Account ...0166)"
            className="w-40 h-auto rounded-xl border border-white/15 mx-auto sm:mx-0"
          />
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-[11px] font-bold uppercase tracking-widest">
              Reserve with ₹1 Lakh EOI
            </div>
            <h4 className="text-xl font-serif-heading font-bold text-white">
              Scan &amp; Pay via UPI — M/S. Senior Living Citizens Foundation
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Official ICICI Bank collection account (ending ...0166). We strongly recommend confirming your unit/plot selection with our sales desk on WhatsApp before paying, so we can send you a signed receipt and hold your allotment.
            </p>
            <button
              onClick={() => openWhatsApp({ actionType: 'request-pricing', message: 'Hello, I am ready to pay the ₹1 Lakh EOI to reserve a unit/plot at Senior Living Citizens Foundation. Please confirm the unit and send a payment receipt process.' })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#C58F58] hover:bg-[#B37E47] text-[#071519] text-xs font-bold transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" /> Confirm on WhatsApp Before Paying
            </button>
          </div>
        </div>

        {/* Assured Rental Return & Cash Flow Policy Showcase */}
        <div className="mb-16 bg-[#0D2329] rounded-3xl p-7 sm:p-10 border border-[#C58F58]/30 shadow-2xl text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C58F58]/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-xs font-mono font-bold uppercase tracking-wider">
                <BadgePercent className="w-3.5 h-3.5" /> Assured Commercial Terms
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white mt-2">
                Assured Monthly Rental Returns &amp; Capital Safety Policy
              </h3>
              <p className="text-xs sm:text-sm text-white/75 mt-1 max-w-2xl">
                Structured monthly returns credited directly to allottees during construction and post-possession.
              </p>
            </div>

            <button
              onClick={() =>
                openWhatsApp({
                  actionType: 'request-pricing',
                  message: 'Hello, I want to inquire about the rental return plans (₹25,000/mo pre-possession on Plan 1 and ₹6,250/mo on Plan 2) at Senior Living Citizens Foundation.'
                })
              }
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-lg shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" /> Get Rental Policy Terms →
            </button>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77] block font-bold">
                Plan 1: Pre-Possession
              </span>
              <div className="text-xl sm:text-2xl font-serif-heading font-bold text-emerald-400">
                ₹25,000 / mo
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Credited directly to your bank account every month until physical possession on ₹25L Down Payment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77] block font-bold">
                Plan 2: Pre-Possession
              </span>
              <div className="text-xl sm:text-2xl font-serif-heading font-bold text-emerald-400">
                ₹6,250 / mo
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Paid monthly on initial 50% payment (₹12.5L) from clearance until possession handover.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77] block font-bold">
                Post-Possession Return
              </span>
              <div className="text-xl sm:text-2xl font-serif-heading font-bold text-emerald-400">
                ₹12,500 / mo
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Guaranteed monthly rental income under Foundation senior occupancy management pool.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77] block font-bold">
                Capital Exit Safety
              </span>
              <div className="text-xl sm:text-2xl font-serif-heading font-bold text-emerald-400">
                ₹25L + FD Rate
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                100% buyback of down payment plus prevailing FD rate interest on exit or emergency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 leading-relaxed">
            <Info className="w-4 h-4 text-[#C58F58] mt-0.5 shrink-0" />
            <span>{rentalProposition.disclaimer}</span>
          </div>
        </div>

        {/* Parking, Terrace Rights & Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 border border-[#E8E2D8] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#2C5E50]">
              <Car className="w-4 h-4 text-[#C58F58]" />
              Parking &amp; Terrace Rights
            </div>
            <div className="divide-y divide-[#E8E2D8] text-xs">
              {additionalCharges.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-[#0D2329]">{item.item}</div>
                    <div className="text-[#53676E] mt-0.5">{item.note}</div>
                  </div>
                  <span className="font-mono font-bold text-[#2C5E50] whitespace-nowrap">{item.priceDisplay}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-7 border border-[#E8E2D8] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#2C5E50]">
              <RotateCcw className="w-4 h-4 text-[#C58F58]" />
              {buybackPolicy.headline}
            </div>
            <p className="text-xs text-[#53676E] leading-relaxed">
              {buybackPolicy.description}
            </p>
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0D2329]">Capital Interest Rate:</span>
              <span className="font-mono text-xs font-bold text-[#2C5E50]">{buybackPolicy.interestRange}</span>
            </div>
            <div className="text-[11px] text-[#899B9F] italic">
              *{buybackPolicy.disclaimer}
            </div>
          </div>
        </div>

        {/* EMI Calculator & Loan Parameters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Interactive EMI Calculator */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-9 border border-[#E8E2D8] shadow-md space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#2C5E50]">
              <Calculator className="w-4 h-4 text-[#C58F58]" />
              Interactive EMI Calculator
            </div>

            <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
              Estimate your <span className="italic font-serif text-[#C58F58]">monthly outflow.</span>
            </h3>

            {/* Sliders / Inputs */}
            <div className="space-y-5">
              {/* Loan Amount */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#0D2329]">
                  <span>Loan Amount</span>
                  <span className="font-mono text-emerald-700">{formatCurrency(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={15000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2C5E50]"
                />
                <div className="flex justify-between text-[10px] text-[#53676E] font-mono">
                  <span>₹5 Lakhs</span>
                  <span>₹1.5 Crores</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#0D2329]">
                  <span>Interest Rate (% per annum)</span>
                  <span className="font-mono text-emerald-700">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={12.0}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2C5E50]"
                />
                <div className="flex justify-between text-[10px] text-[#53676E] font-mono">
                  <span>7.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#0D2329]">
                  <span>Tenure (Years)</span>
                  <span className="font-mono text-emerald-700">{loanTenureYears} Years ({totalMonths} Months)</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2C5E50]"
                />
                <div className="flex justify-between text-[10px] text-[#53676E] font-mono">
                  <span>5 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="p-6 rounded-2xl bg-[#0D2329] text-white space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77]">Estimated Monthly EMI</div>
                <div className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#FAF8F5] mt-0.5">
                  {formatCurrency(emi)} <span className="text-xs font-normal text-white/60 font-sans">/ month</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15 text-xs">
                <div>
                  <div className="text-white/60 text-[10px] font-mono uppercase">Total Interest</div>
                  <div className="font-serif text-lg font-bold text-[#E0AB77]">{formatCurrency(totalInterest)}</div>
                </div>
                <div>
                  <div className="text-white/60 text-[10px] font-mono uppercase">Total Payment</div>
                  <div className="font-serif text-lg font-bold text-emerald-400">{formatCurrency(totalPayment)}</div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[#53676E] italic">
              * Indicative calculation. Actual loan rate depends on the applicant&apos;s credit score, bank guidelines, and down payment.
            </p>
          </div>

          {/* Right: Loan Parameters & Documents Required */}
          <div className="lg:col-span-6 space-y-6">
            {/* Parameters Table */}
            <div className="bg-white rounded-3xl p-7 border border-[#E8E2D8] shadow-sm space-y-4">
              <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                Loan Parameters &amp; Eligibility
              </h4>
              <div className="divide-y divide-[#E8E2D8] text-xs">
                {loanParameters.map((param, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="text-[#53676E]">{param.parameter}</span>
                    <span className={`font-semibold ${param.highlight ? 'text-[#2C5E50]' : 'text-[#0D2329]'}`}>
                      {param.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax Benefits Box */}
            <div className="bg-[#EAF2EE] rounded-3xl p-7 border border-[#CDE0D7] space-y-4">
              <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                Tax Deductions Under Indian IT Act
              </h4>
              <div className="space-y-3">
                {taxBenefits.map((tax, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/80 border border-[#CDE0D7] text-xs space-y-1">
                    <div className="font-bold text-[#2C5E50]">{tax.section} — {tax.title}</div>
                    <div className="text-[#53676E] leading-relaxed">{tax.benefit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banking & Home Loan Support */}
            <div className="bg-[#0D2329] text-white rounded-3xl p-7 border border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#E0AB77]">
                <Shield className="w-4 h-4 text-[#C58F58]" />
                Direct Banking &amp; Registry Assistance
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Our sales and finance desk provides end-to-end documentation assistance for home loans, registry drafting at Farrukhnagar Tehsil, and legal verification.
              </p>
              <div className="pt-2">
                <button
                  onClick={() =>
                    openWhatsApp({
                      actionType: 'request-pricing',
                      message: 'Hello, I would like assistance with home loans, bank eligibility, and registry documentation for Senior Living Citizens Foundation.'
                    })
                  }
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E0AB77] hover:text-white transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Speak with our Finance Desk →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
