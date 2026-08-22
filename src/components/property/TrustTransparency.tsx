'use client';

import React from 'react';
import Link from 'next/link';
import { projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { ShieldCheck, FileCheck2, Landmark, MessageSquare, BadgeCheck } from 'lucide-react';

const credentials = [
  {
    icon: Landmark,
    title: 'Section 8 Non-Profit',
    authority: 'Ministry of Corporate Affairs',
    description: 'Senior Living Citizen Foundation is incorporated as a Company Limited by Guarantee under Section 8 of the Companies Act, 2013.'
  },
  {
    icon: FileCheck2,
    title: '80G Provisional Approval',
    authority: 'Income Tax Department',
    description: 'Holds provisional approval under Section 80G (Form 10AC) valid AY 2026-27 to 2028-29 for eligible donations and contributions.'
  },
  {
    icon: BadgeCheck,
    title: 'DARPAN Registered NPO',
    authority: 'NITI Aayog (Govt. of India)',
    description: 'Registered on the NITI Aayog NGO-DARPAN portal under Health & Family Welfare and Aged/Elderly working sectors.'
  },
  {
    icon: ShieldCheck,
    title: 'Freehold Clear Title',
    authority: 'Revenue Dept. Haryana',
    description: 'All 64 plots and residences are sold with direct legal registration and individual title ownership — never a leasehold.'
  }
];

export const TrustTransparency: React.FC = () => {
  const { openWhatsApp } = useModal();

  return (
    <section id="trust" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            17 • Trust &amp; Statutory Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329]">
            An Organisation You Can <span className="italic font-serif text-[#C58F58]">Verify.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#53676E] max-w-2xl mx-auto leading-relaxed">
            Registration certificates and freehold title chains are available for review on request at our Gurugram site office or directly via WhatsApp. Government tax/banking IDs are protected against unauthorized web scraping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl border border-[#E8E2D8] p-6 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C58F58]">{item.authority}</span>
                    <h3 className="text-base font-serif-heading font-bold text-[#0D2329] mt-0.5">{item.title}</h3>
                  </div>
                  <p className="text-xs text-[#53676E] leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-3 border-t border-[#E8E2D8] text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Legal Entity</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Owner Vault Trust Signal Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#0D2329] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-[#C58F58] font-bold uppercase tracking-widest">
                SECURE ARCHIVE REPOSITORY
              </span>
            </div>
            <h3 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
              Project Documentation &amp; Owner Vault
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Selected project documents, architectural CAD blueprints, and Tehsil revenue records are securely maintained in the Owner Document Vault. Contact the project desk for authorized access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/owner/login"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all text-center"
            >
              🔒 Owner Vault Login →
            </Link>

            <button
              onClick={() => openWhatsApp({ actionType: 'request-trust-docs', message: `Hello, I would like to review the Section 8, Form 10AC/80G, and Freehold Title verification documents for ${projectOverview.legalName}.` })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold shadow-xl transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              Request Docs on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

