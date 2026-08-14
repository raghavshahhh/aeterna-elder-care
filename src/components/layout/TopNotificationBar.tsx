'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { Phone, Siren, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const TopNotificationBar: React.FC = () => {
  const { openEmergency, openWhatsApp } = useModal();

  return (
    <aside aria-label="Announcement & Helpline Bar" className="bg-[#071519] text-[#FBF9F5] text-[11px] sm:text-xs py-2 px-4 border-b border-[#163942] relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left side notice */}
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-white/90 truncate">
            Serving 12+ Metro Cities across India • NABH Certified Clinical Care
          </span>
          <Link
            href="/find-care"
            className="hidden md:inline-flex items-center gap-1 text-[#C58F58] hover:text-[#e0ab77] font-semibold underline underline-offset-2 ml-2"
          >
            Find Right Care in 60 Seconds →
          </Link>
        </div>

        {/* Right side quick contact hotline */}
        <div className="flex items-center gap-4 shrink-0 text-white/80">
          <button
            onClick={() => openEmergency()}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold transition-colors"
          >
            <Siren className="w-3.5 h-3.5 animate-sos-pulse" />
            <span className="hidden sm:inline">24x7 SOS:</span>
            <span>+91 11 4084 9900</span>
          </button>

          <span className="text-white/20 hidden sm:inline">|</span>

          <button
            onClick={() => openWhatsApp({ service: 'Elder Care Consultation' })}
            className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <span className="text-white/20 hidden lg:inline">|</span>

          <Link href="/portal" className="hidden lg:flex items-center gap-1 hover:text-white transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>Family Portal</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
