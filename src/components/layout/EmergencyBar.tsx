'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';
import { Siren, PhoneCall, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';

export const EmergencyBar: React.FC = () => {
  const { openEmergency, openWhatsApp } = useModal();

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 flex items-center gap-2 pointer-events-auto">
      {/* WhatsApp quick circular launcher */}
      <button
        onClick={() => openWhatsApp()}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Chat with Care Manager on WhatsApp"
        aria-label="WhatsApp Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Floating Emergency Pill */}
      <button
        onClick={() => openEmergency()}
        className="flex-1 sm:flex-initial flex items-center gap-3 bg-[#0D2329] hover:bg-[#163942] text-white border-2 border-red-500/80 rounded-full px-4 sm:px-5 py-3 shadow-[0_8px_30px_rgba(217,56,58,0.35)] transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400 group"
      >
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 animate-sos-pulse">
          <Siren className="w-4 h-4" />
        </div>
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">
              24/7 Ambulance SOS
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white block">
            Emergency Dispatch & Call
          </span>
        </div>
      </button>
    </div>
  );
};
