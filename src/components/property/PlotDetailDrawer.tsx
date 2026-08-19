'use client';

import React from 'react';
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

  if (!isOpen || !plot) return null;

  const isAvail = plot.status === 'available';
  const isHold = plot.status === 'on_hold';
  const isSold = plot.status === 'sold';

  const handleWhatsAppEnquiry = () => {
    const message = `Hello, I am interested in ${plot.plotNumber}.
Block: ${plot.block}
Size: ${plot.sizeSqYd} sq. yd. (${plot.dimensions})
Facing: ${plot.facing}
Road: ${plot.roadWidth}
Indicative Price: ${plot.priceEstimate}
Please share pricing, payment milestones, and plot layout.`;

    openWhatsApp({
      actionType: 'reserve-unit',
      unitName: `${plot.plotNumber} (${plot.block})`,
      unitType: `${plot.sizeSqYd} sq. yd. Freehold Plot`,
      message
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-lg bg-white border-l border-[#E8E2D8] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center font-bold font-serif-heading text-base">
                  {plot.number}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C58F58] font-mono block">
                    FREEHOLD RESIDENTIAL PLOT
                  </span>
                  <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                    {plot.plotNumber} • {plot.block}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#53676E] hover:text-[#0D2329] hover:bg-[#F5EFE6] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Pill & Key Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isAvail
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : isHold
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isAvail ? 'bg-emerald-500' : isHold ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                />
                {isAvail ? 'Available for Booking' : isHold ? 'Currently On Hold' : 'Sold Out'}
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
                  Indicative Pre-Launch Price
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
                <strong className="text-xs font-semibold text-[#2C5E50] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> {plot.facing}
                </strong>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Road Access Width</span>
                <strong className="text-xs font-semibold text-[#0D2329]">{plot.roadWidth}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#53676E]">Township Sector</span>
                <strong className="text-xs font-semibold text-[#0D2329]">{plot.block} (Residential Sanctuary)</strong>
              </div>
            </div>

            {/* Township Highlights */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D2329] block">
                Township Infrastructure Included:
              </span>
              <div className="space-y-2 text-xs text-[#53676E]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>3-minute walk to on-site proposed 30,000 sq. ft. Ayurvedic Hospital</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>5-minute stroll to Community Mandir at the western boundary</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>5ft &amp; 6ft perimeter green buffer belts for pure unpolluted AQI</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Underground utilities, water connection &amp; wide pedestrian sidewalks</span>
                </div>
              </div>
            </div>

            {/* Location Note */}
            <div className="p-4 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] text-xs text-[#14353E] space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[#2C5E50]">
                <MapPin className="w-3.5 h-3.5" /> Project Location:
              </div>
              <p className="text-[11px] text-[#2C5E50]/80">
                Near Reliance MET City, SH-22, Kheri Asra, Jhajjar, Haryana 124104
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-[#E8E2D8] space-y-2.5">
            {isAvail ? (
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-sm font-bold transition-all shadow-lg shadow-[#2C5E50]/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Enquire About {plot.plotNumber} on WhatsApp →
              </button>
            ) : isHold ? (
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Register for Waitlist on {plot.plotNumber} →
              </button>
            ) : (
              <div className="text-center py-3 text-xs text-[#53676E] bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8]">
                This plot has already been alloted. Please check adjacent plots in {plot.block}.
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                openLeadDrawer({
                  title: `Schedule Site Visit for ${plot.plotNumber} (${plot.block})`,
                  actionType: 'book-site-visit',
                  unitName: plot.plotNumber
                });
              }}
              className="w-full py-3.5 rounded-2xl bg-white border border-[#E8E2D8] hover:bg-[#FAF8F5] text-[#0D2329] text-xs font-bold transition-all text-center"
            >
              Schedule Site Walk in Kheri Asra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
