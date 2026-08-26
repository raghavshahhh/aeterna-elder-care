'use client';

import React from 'react';
import Link from 'next/link';
import { PlotItem } from '@/types';
import { useModal } from '@/context/ModalContext';
import {
  Rotate3d,
  CalendarCheck,
  MessageSquare,
  Lock,
  X,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PlotStickyContextBarProps {
  selectedPlot: PlotItem | null;
  onClear: () => void;
  onFocus3D?: () => void;
  onOpenDetails?: () => void;
}

export const PlotStickyContextBar: React.FC<PlotStickyContextBarProps> = ({
  selectedPlot,
  onClear,
  onFocus3D,
  onOpenDetails
}) => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  if (!selectedPlot) return null;

  const handleWhatsApp = () => {
    const msg = `Hello, I am inquiring about ${selectedPlot.plotNumber}, ${selectedPlot.block} (${selectedPlot.sizeSqYd} sq. yd., ${selectedPlot.dimensions}, ${selectedPlot.facing} facing). Please share availability, cost breakdown, and site visit options.`;
    openWhatsApp({
      actionType: 'reserve-plot',
      plotNumber: selectedPlot.plotNumber,
      plotBlock: selectedPlot.block,
      plotSize: `${selectedPlot.sizeSqYd} sq. yd.`,
      message: msg
    });
  };

  const handleSiteVisit = () => {
    openLeadDrawer({
      title: `Schedule Ground Site Visit for ${selectedPlot.plotNumber} (${selectedPlot.block})`,
      plotNumber: selectedPlot.plotNumber,
      plotBlock: selectedPlot.block,
      plotSize: `${selectedPlot.sizeSqYd} sq. yd.`,
      actionType: 'book-site-visit'
    });
  };

  return (
    <aside aria-label="Selected Plot Context Bar" className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:left-6 max-w-5xl sm:mx-auto z-40 animate-fade-in">
      <div className="bg-[#0D2329]/95 backdrop-blur-xl border border-white/20 text-white rounded-3xl p-3.5 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left: Plot Specifications Summary */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-[#2C5E50] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0 border border-emerald-400/30">
            {selectedPlot.number}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#FAF8F5] truncate">
                {selectedPlot.plotNumber} • {selectedPlot.block}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-[10px] font-mono font-bold shrink-0">
                {selectedPlot.sizeSqYd} Sq. Yd.
              </span>
            </div>
            <p className="text-[11px] text-white/70 truncate flex items-center gap-1.5 mt-0.5">
              <span>{selectedPlot.dimensions}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Compass className="w-3 h-3 text-[#C58F58]" />
                {selectedPlot.facing}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">{selectedPlot.priceEstimate}</span>
            </p>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onClear}
            className="sm:hidden p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10"
            title="Clear Selection"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Instant Decision CTAs */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          {onFocus3D && (
            <button
              onClick={onFocus3D}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Focus in 3D Masterplan"
            >
              <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
              <span className="hidden md:inline">Focus</span> 3D
            </button>
          )}

          <button
            onClick={handleWhatsApp}
            className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleSiteVisit}
            className="px-3.5 py-2 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#E0AB77]" />
            <span>Book Visit</span>
          </button>

          <Link
            href={`/book/${selectedPlot.id.toUpperCase()}`}
            className="px-4 py-2 rounded-xl bg-[#C58F58] hover:bg-[#b07d48] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reserve</span> (24h Hold)
          </Link>

          {/* Close button on desktop */}
          <button
            onClick={onClear}
            className="hidden sm:flex p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1"
            title="Clear Selected Plot Context"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
