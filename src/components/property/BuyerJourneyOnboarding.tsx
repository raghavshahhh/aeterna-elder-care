'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import {
  Compass,
  CalendarCheck,
  Lock,
  CreditCard,
  FileCheck,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

interface Stage {
  number: string;
  title: string;
  subtitle: string;
  timeframe: string;
  icon: React.ReactNode;
  description: string;
  actionLabel: string;
  actionType: 'scroll' | 'whatsapp' | 'drawer' | 'link';
  actionTarget: string;
}

export const BuyerJourneyOnboarding: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  const stages: Stage[] = [
    {
      number: '01',
      title: 'Explore & Select',
      subtitle: '2D & 3D Masterplan Exploration',
      timeframe: 'Day 1',
      icon: <Compass className="w-5 h-5 text-[#C58F58]" />,
      description: 'Explore the 64 freehold plots and G+2 senior residences with certified CAD dimensions, road access, and pricing.',
      actionLabel: 'Explore Masterplan',
      actionType: 'scroll',
      actionTarget: 'availability-matrix'
    },
    {
      number: '02',
      title: 'Guided Site Visit',
      subtitle: 'Private Chauffeur Ground Walk',
      timeframe: 'Days 2–4',
      icon: <CalendarCheck className="w-5 h-5 text-emerald-600" />,
      description: 'Walk the actual site along SH-22 Jhajjar with our Senior Living Advisor, inspect landmarks, and review soil/survey reports.',
      actionLabel: 'Schedule Site Visit',
      actionType: 'drawer',
      actionTarget: 'book-site-visit'
    },
    {
      number: '03',
      title: '24-Hour Unit Hold',
      subtitle: 'Temporary Unit Reservation',
      timeframe: 'Day 5',
      icon: <Lock className="w-5 h-5 text-blue-600" />,
      description: 'Place a temporary 24-hour hold on your chosen plot number to lock pricing and prevent concurrent allocation while reviewing docs.',
      actionLabel: 'View Plots to Hold',
      actionType: 'scroll',
      actionTarget: 'availability-matrix'
    },
    {
      number: '04',
      title: 'Booking & Down Payment',
      subtitle: 'Cryptographic Razorpay Milestone',
      timeframe: 'Day 6',
      icon: <CreditCard className="w-5 h-5 text-amber-600" />,
      description: 'Pay booking token (10%) securely via Razorpay with instant digitally-signed receipt and automated ledger reconciliation.',
      actionLabel: 'View Payment Plans',
      actionType: 'scroll',
      actionTarget: 'payment-plans'
    },
    {
      number: '05',
      title: 'Buyer Portal & Legal Dossier',
      subtitle: 'Section 8 Agreement & Bank Loans',
      timeframe: 'Days 7–14',
      icon: <FileCheck className="w-5 h-5 text-teal-600" />,
      description: 'Access your private Buyer Portal to view payment schedules, download formal allotment letters, and process bank loans.',
      actionLabel: 'Preview Buyer Portal',
      actionType: 'link',
      actionTarget: '/buyer'
    },
    {
      number: '06',
      title: 'Registry & Lifetime Care',
      subtitle: 'Freehold Deed & Care Membership',
      timeframe: 'Possession',
      icon: <KeyRound className="w-5 h-5 text-rose-600" />,
      description: 'Receive 100% freehold land registry deed at the Sub-Registrar Jhajjar office and lifelong access to Ayurvedic healthcare facilities.',
      actionLabel: 'Ask Advisor Details',
      actionType: 'whatsapp',
      actionTarget: 'possession-details'
    }
  ];

  const handleAction = (stage: Stage) => {
    if (stage.actionType === 'scroll') {
      const el = document.getElementById(stage.actionTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (stage.actionType === 'drawer') {
      openLeadDrawer({
        title: 'Schedule Private Ground Site Walk in Kheri Asra',
        actionType: 'book-site-visit'
      });
    } else if (stage.actionType === 'whatsapp') {
      openWhatsApp({
        actionType: 'general',
        message: 'Hello, I would like to understand the freehold registry process and timeline for Senior Living Citizens Foundation...'
      });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]" id="buyer-journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            Complete Buyer Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329]">
            The Journey from <span className="italic font-serif text-[#C58F58]">Discovery to Ownership.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#53676E] max-w-2xl mx-auto leading-relaxed">
            Every step is connected, transparent, and legally documented. Here is exactly what happens from your first inquiry to freehold possession.
          </p>
        </div>

        {/* 6-Stage Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {stage.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E8E2D8] text-[#53676E]">
                      {stage.timeframe}
                    </span>
                    <span className="text-2xl font-serif-heading font-bold text-[#C58F58]/40 group-hover:text-[#C58F58] transition-colors">
                      {stage.number}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] group-hover:text-[#2C5E50] transition-colors">
                    {stage.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#C58F58] font-bold block mt-0.5">
                    {stage.subtitle}
                  </span>
                  <p className="text-xs text-[#53676E] mt-2.5 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E8E2D8]/70">
                {stage.actionType === 'link' ? (
                  <Link
                    href={stage.actionTarget}
                    className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#2C5E50] text-[#0D2329] hover:text-white border border-[#E8E2D8] hover:border-[#2C5E50] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{stage.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAction(stage)}
                    className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#2C5E50] text-[#0D2329] hover:text-white border border-[#E8E2D8] hover:border-[#2C5E50] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{stage.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Footer Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0D2329] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2C5E50] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Have a specific question about title or payment?</div>
              <div className="text-xs text-white/70">Our Senior Living Advisor is available 7 days a week from 9 AM to 7 PM IST.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I would like to speak to an advisor regarding SLCF...' })}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
