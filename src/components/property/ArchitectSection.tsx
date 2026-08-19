'use client';

import React from 'react';
import { architectProfile, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Building2, Compass, PhoneCall, Mail, MapPin, CheckCircle2, MessageSquare } from 'lucide-react';

export const ArchitectSection: React.FC = () => {
  const { openWhatsApp } = useModal();

  return (
    <section id="architect" className="py-20 sm:py-28 bg-white border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Firm & Architect Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
              Master Architecture &amp; Planning
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-[#0D2329] tracking-tight">
              Drawn by <span className="italic font-serif text-[#C58F58]">{architectProfile.firmName}.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              The entire 64-plot master township plan, G+2 senior residences, and on-site 30,000 sq. ft. multi-speciality Ayurvedic hospital have been drawn by <strong>The Vision Architects &amp; Consultants, Farrukhnagar</strong>.
            </p>

            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              Led by <strong>{architectProfile.principalArchitect} ({architectProfile.credentials})</strong>, the practice brings extensive expertise across healthcare architecture, senior-friendly accessibility engineering, structural design, and Vastu compliance.
            </p>

            {/* Studio Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href={`tel:${architectProfile.phone}`}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#2C5E50] transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2C5E50] text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#53676E]">Studio Desk</div>
                  <div className="text-xs font-bold text-[#0D2329] group-hover:text-[#2C5E50]">{architectProfile.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${architectProfile.email}`}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#2C5E50] transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C58F58] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#53676E]">Inquiry Email</div>
                  <div className="text-xs font-bold text-[#0D2329] group-hover:text-[#C58F58]">{architectProfile.email}</div>
                </div>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center gap-3 text-xs text-[#53676E]">
              <MapPin className="w-4 h-4 text-[#C58F58] shrink-0" />
              <span><strong>Studio Location:</strong> {architectProfile.studioAddress}</span>
            </div>
          </div>

          {/* Right Column: Architectural Services Offered */}
          <div className="lg:col-span-5 bg-[#0D2329] text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77]">Practice Capabilities</span>
              <h3 className="text-2xl font-serif-heading font-bold text-[#FAF8F5] mt-1">
                Consultancy &amp; Design Services
              </h3>
            </div>

            <div className="space-y-3">
              {architectProfile.services.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-3 text-xs font-medium text-white/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/15">
              <button
                onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I would like to consult with The Vision Architects regarding plot customization...' })}
                className="w-full py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#B37E47] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Inquire with Architect on WhatsApp →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
