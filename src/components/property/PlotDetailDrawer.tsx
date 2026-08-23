'use client';

import React, { useEffect } from 'react';
import { PlotItem } from '@/types';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
import {
  X,
  MapPin,
  Compass,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building2,
  Trees,
  Navigation,
  BadgePercent
} from 'lucide-react';

interface PlotDetailDrawerProps {
  plot: PlotItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlotDetailDrawer: React.FC<PlotDetailDrawerProps> = ({
  plot,
  isOpen,
  onClose
}) => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !plot) return null;

  const handleWhatsAppEnquiry = () => {
    const message = `Hello, I am interested in ${plot.plotNumber}.
Block: ${plot.block}
Size: ${plot.sizeSqYd} sq. yd. (${plot.dimensions})
Facing: ${plot.facing}
Road: ${plot.roadWidth}
Indicative Price: ${plot.priceEstimate}
Please share pricing, payment milestones, and plot layout.`;

    openWhatsApp({
      actionType: 'reserve-plot',
      plotNumber: plot.plotNumber,
      plotBlock: plot.block,
      message
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Plot Details">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#E8E2D8] flex flex-col justify-between overflow-y-auto">
          {/* Top Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2C5E50] text-[#FAF8F5] flex items-center justify-center font-bold text-lg font-serif">
                  {plot.number}
                </div>
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#C58F58] font-bold">
                    Freehold Residential Plot
                  </span>
                  <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                    {plot.plotNumber} • {plot.block}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#53676E] hover:text-[#0D2329] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Pill & Key Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Phase 1 Priority Enquiry
              </span>

              {plot.isCorner && (
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#2C5E50] border border-[#CDE0D7] text-xs font-semibold">
                  Corner Plot
                </span>
              )}
              {plot.isParkFacing && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                  <Trees className="w-3 h-3" /> Park Facing
                </span>
              )}
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-[#0D2329] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#C58F58]">
                  Indicative Pre-Launch Range
                </span>
                <div className="text-xl font-bold font-serif-heading text-white">
                  {plot.priceEstimate}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/60 block">Registration Ready</span>
                <span className="text-xs font-bold text-emerald-400">Clear Title Freehold</span>
              </div>
            </div>

            {/* Plot Specifications Matrix */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Plot Area</span>
                <strong className="text-sm font-bold text-[#0D2329] font-serif-heading">
                  {plot.sizeSqYd} sq. yd. (~{(plot.sizeSqYd * 9).toLocaleString()} sq. ft.)
                </strong>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Exact Dimensions</span>
                <strong className="text-xs font-mono font-bold text-[#0D2329]">{plot.dimensions}</strong>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Orientation / Facing</span>
                <strong className="text-xs font-semibold text-[#0D2329] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
                  {plot.facing}
                </strong>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Front Road Width</span>
                <strong className="text-xs font-semibold text-[#0D2329]">{plot.roadWidth}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#53676E]">Ownership Structure</span>
                <strong className="text-xs font-semibold text-emerald-700">100% Freehold Title</strong>
              </div>
            </div>

            {/* Senior Township Highlights */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-[#53676E] tracking-wider font-semibold">
                Plot Location Privileges
              </span>
              <ul className="space-y-1.5 text-xs text-[#53676E]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>5-minute flat walking distance to Community Mandir</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct pedestrian connectivity to proposed 30k sqft Hospital</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>33ft wide paved road with tree-lined green buffer strips</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Fixed Action Buttons */}
          <div className="p-6 bg-[#FAF8F5] border-t border-[#E8E2D8] space-y-2.5">
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Inquire {plot.plotNumber} on WhatsApp →
            </button>

            <button
              onClick={() => {
                onClose();
                openLeadDrawer({
                  title: `Schedule Site Walk for ${plot.plotNumber} (${plot.block})`,
                  plotNumber: plot.plotNumber,
                  plotBlock: plot.block,
                  actionType: 'book-site-visit'
                });
              }}
              className="w-full py-3 rounded-2xl bg-[#0D2329] hover:bg-[#1A3B45] text-white text-xs font-semibold transition-all text-center cursor-pointer"
            >
              Book Ground Site Walk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
