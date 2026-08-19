'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';
import { MessageSquare, PhoneCall, Calendar } from 'lucide-react';
import { projectOverview } from '@/data/propertyData';

export const EmergencyBar: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pointer-events-auto">
      {/* Schedule Site Visit Pill */}
      <button
        onClick={() => openLeadDrawer({ title: 'Schedule Free Private Site Walk', actionType: 'book-site-visit' })}
        className="hidden md:flex items-center gap-2 bg-[#0D2329] hover:bg-[#1A3B45] text-white border border-[#C58F58]/50 rounded-full px-4 py-2.5 shadow-xl transition-all hover:scale-105 active:scale-95 text-xs font-semibold"
      >
        <Calendar className="w-3.5 h-3.5 text-[#C58F58]" />
        <span>Book Site Visit</span>
      </button>

      {/* WhatsApp quick circular launcher */}
      <button
        onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' })}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus:outline-none ring-4 ring-white/20"
        title="Chat on WhatsApp (+91 99999558447)"
        aria-label="WhatsApp Desk"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
      </button>
    </div>
  );
};
