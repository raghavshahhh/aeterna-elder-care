'use client';

import React from 'react';
import { projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { ShieldCheck, FileCheck2, Landmark, MessageSquare } from 'lucide-react';

const credentials = [
  {
    icon: Landmark,
    title: 'Section 8 Registered Organisation',
    description: 'Senior Living Citizen Foundation is incorporated as a Company Limited by Guarantee under Section 8 of the Companies Act, 2013.'
  },
  {
    icon: FileCheck2,
    title: '80G Tax Exemption (Provisional)',
    description: 'Holds provisional approval under Section 80G of the Income Tax Act for eligible charitable contributions to the Foundation.'
  },
  {
    icon: ShieldCheck,
    title: 'Freehold, Registered Title',
    description: 'Plots and residences are sold as freehold property with clear, registered title — not a leasehold or society-managed unit.'
  }
];

export const TrustTransparency: React.FC = () => {
  const { openWhatsApp } = useModal();

  return (
    <section id="trust" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trust &amp; Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-normal text-[#0D2329]">
            An Organisation You Can <span className="italic font-serif text-[#C58F58]">Verify.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#53676E] max-w-2xl mx-auto">
            Registration certificates are available for review on request at our sales office. We do not publish government identity documents (PAN, CIN, registration certificates) publicly to protect the organisation from document misuse.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {credentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-[#E8E2D8] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0D2329]">{item.title}</h3>
                <p className="text-xs text-[#53676E] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openWhatsApp({ actionType: 'general', message: `Hello, I would like to review the Section 8 and 80G registration documents for ${projectOverview.legalName}.` })}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            Request Registration Documents on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};
