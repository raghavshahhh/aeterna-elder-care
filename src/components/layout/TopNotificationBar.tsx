'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
import { Phone, MapPin, MessageSquare, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const TopNotificationBar: React.FC = () => {
  const pathname = usePathname();
  const { openWhatsApp, openLeadDrawer } = useModal();

  if (
    pathname?.startsWith('/owner') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/portal')
  ) {
    return null;
  }

  return (
    <aside aria-label="Announcement & Hotline Bar" className="bg-[#071519] text-[#FBF9F5] text-[11px] sm:text-xs py-2 px-4 border-b border-[#163942] relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left side notice */}
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-white/90 truncate">
            Senior Living Citizen Foundation · 64 Plots &amp; 30,000 Sqft Ayurvedic Hospital
          </span>
          <a
            href={projectOverview.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-[#C58F58] hover:text-[#e0ab77] font-semibold underline underline-offset-2 ml-2"
          >
            Near Reliance MET City, SH-22 Jhajjar →
          </a>
        </div>

        {/* Right side quick contact hotline */}
        <div className="flex items-center gap-4 shrink-0 text-white/80">
          <a
            href="tel:+919999955847"
            className="flex items-center gap-1.5 text-white hover:text-[#C58F58] font-bold font-mono transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C58F58]" />
            <span className="hidden sm:inline">Desk:</span>
            <span>+91 99999 55847</span>
          </a>

          <span className="text-white/20 hidden sm:inline">|</span>

          <button
            onClick={() => openWhatsApp({ actionType: 'general', message: 'I want to inquire about plot and apartment availability...' })}
            className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Desk</span>
          </button>

          <span className="text-white/20 hidden lg:inline">|</span>

          <button
            onClick={() => openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
            className="hidden lg:flex items-center gap-1 text-[#C58F58] hover:text-white transition-colors font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Site Walk</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
