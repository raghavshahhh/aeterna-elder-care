'use client';

import React from 'react';
import { FinancePaymentPlans } from '@/components/property/FinancePaymentPlans';
import { BadgePercent } from 'lucide-react';

export default function FinancePage() {
  return (
    <div className="space-y-16 pb-20 bg-[#FAF8F5]">
      {/* Page Hero */}
      <section className="bg-[#0D2329] text-white py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <BadgePercent className="w-3.5 h-3.5" />
            Home Loans &amp; Finance Available
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Home Loans, <span className="italic font-serif text-[#C58F58]">Made Straightforward.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            We&apos;ve structured financing to be as transparent as ownership. Plotted development loans up to 75–80% LTV, 3 structured payment plans, and tax deductions.
          </p>
        </div>
      </section>

      {/* Finance Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FinancePaymentPlans />
      </div>
    </div>
  );
}
