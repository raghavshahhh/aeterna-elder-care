'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import { MessageSquare, Calendar } from 'lucide-react';

export const QuickContactBar: React.FC = () => {
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
    <div className="fixed bottom-6 right-6 z-30 flex items-center gap-3 pointer-events-auto">
      {/* Schedule Site Visit Pill */}
      <button
        onClick={() => openLeadDrawer({ title: 'Schedule Free Private Site Walk', actionType: 'book-site-visit' })}
        className="hidden md:flex items-center gap-2 bg-[#0D2329] hover:bg-[#1A3B45] text-white border border-[#C58F58]/50 rounded-full px-5 py-3 shadow-2xl transition-all hover:scale-105 active:scale-95 text-xs font-bold tracking-wide cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-[#C58F58]" />
        <span>Book Site Visit</span>
      </button>

      {/* WhatsApp quick circular launcher */}
      <button
        onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizens Foundation plots and residences...' })}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus:outline-none ring-4 ring-white/30 cursor-pointer"
        title="Chat on WhatsApp (+91 99999 55847)"
        aria-label="WhatsApp Sales Desk"
      >
        <MessageSquare className="w-7 h-7 fill-white text-white" />
      </button>
    </div>
  );
};

