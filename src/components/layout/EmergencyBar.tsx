'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';
import { Siren, MessageSquare } from 'lucide-react';

export const EmergencyBar: React.FC = () => {
  const { openEmergency, openWhatsApp } = useModal();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 pointer-events-auto">
      {/* WhatsApp quick circular launcher */}
      <button
        onClick={() => openWhatsApp()}
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus:outline-none"
        title="Chat on WhatsApp Desk"
        aria-label="WhatsApp Assistant"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Floating Emergency SOS Pill */}
      <button
        onClick={() => openEmergency()}
        className="flex items-center gap-2.5 bg-[#0D2329] hover:bg-[#163942] text-white border border-red-500/80 rounded-full pl-2 pr-4 py-2 shadow-xl transition-all hover:scale-105 active:scale-95 focus:outline-none group"
      >
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 animate-sos-pulse">
          <Siren className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-red-400 block leading-none">
            24/7 SOS
          </span>
          <span className="text-xs font-bold text-white block mt-0.5">
            Ambulance & ER
          </span>
        </div>
      </button>
    </div>
  );
};
