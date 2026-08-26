'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { PlotItem } from '@/types';
import { useModal } from '@/context/ModalContext';
import { CANONICAL_PLOT_MAP } from '@/lib/architecture/geometry';
import {
  X,
  Compass,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Lock,
  MessageSquare,
  Trees,
  FileText,
  Rotate3d,
  Layers,
  Info
} from 'lucide-react';

interface PlotDetailDrawerProps {
  plot: PlotItem | null;
  isOpen: boolean;
  onClose: () => void;
  onFocus3D?: (plotNumber: number) => void;
}

export const PlotDetailDrawer: React.FC<PlotDetailDrawerProps> = ({
  plot,
  isOpen,
  onClose,
  onFocus3D
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

  // Retrieve canonical geometry for forensic calculations
  const canonical = CANONICAL_PLOT_MAP.get(plot.number);

  const handleWhatsAppEnquiry = () => {
    const message = `Hello, I am inquiring about ${plot.plotNumber} (${plot.block}).
Scheduled Area: ${plot.sizeSqYd} sq. yd. (${plot.dimensions})
CAD Orientation: ${plot.facing} facing
Demarcated Road: ${plot.roadWidth}
Indicative Cost-Plus Price: ${plot.priceEstimate}

Please share the certified CAD allotment sheet and arrange a guided ground site visit.`;

    openWhatsApp({
      actionType: 'reserve-plot',
      plotNumber: plot.plotNumber,
      plotBlock: plot.block,
      plotSize: `${plot.sizeSqYd} sq. yd.`,
      message
    });
  };

  const handleSiteVisit = () => {
    onClose();
    openLeadDrawer({
      title: `Schedule Guided Site Visit for ${plot.plotNumber} (${plot.block})`,
      plotNumber: plot.plotNumber,
      plotBlock: plot.block,
      plotSize: `${plot.sizeSqYd} sq. yd.`,
      actionType: 'book-site-visit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label={`Plot Dossier for ${plot.plotNumber}`}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-[#E8E2D8] flex flex-col justify-between overflow-y-auto">
          {/* Main Content Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header: Identity & Source Classification */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2C5E50] text-[#FAF8F5] flex items-center justify-center font-bold text-lg font-serif shrink-0 border border-emerald-400/30">
                  {plot.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C58F58] font-bold">
                      Demarcated CAD Parcel
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                      SOURCE_VERIFIED
                    </span>
                  </div>
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

            {/* Architectural Status Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Phase 1 Priority Allotment
              </span>

              {plot.isCorner && (
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#2C5E50] border border-[#CDE0D7] font-semibold">
                  Corner Demarcation (2-Side Road Access)
                </span>
              )}
              {canonical?.greenBeltAdjacent && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
                  <Trees className="w-3 h-3 text-emerald-600" /> Bordering 5ft/6ft Green Buffer Strip
                </span>
              )}
            </div>

            {/* Price & Legal Tenure Banner */}
            <div className="p-4 rounded-2xl bg-[#0D2329] text-white flex items-center justify-between shadow-md">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#C58F58] block">
                  Indicative Pre-Launch Cost-Plus Range
                </span>
                <div className="text-xl font-bold font-serif-heading text-white">
                  {plot.priceEstimate}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/60 block">Statutory Title</span>
                <span className="text-xs font-bold text-emerald-400">100% Freehold Ownership</span>
              </div>
            </div>

            {/* Approved CAD Plot Attributes & Site Context */}
            <div className="p-4 rounded-2xl bg-[#EAF2EE]/60 border border-[#CDE0D7] space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#2C5E50] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2C5E50]" />
                Approved CAD Plot Attributes
              </span>
              <ul className="space-y-2 text-xs text-[#0D2329]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Facing Orientation:</strong> Certified CAD orientation is <strong>{plot.facing}</strong>, fronting the {plot.roadWidth} corridor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Road Right-of-Way:</strong> Direct vehicular access via <strong>{plot.roadWidth}</strong> connected to internal circulation spines and State Highway 22.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Sector Layout:</strong> Situated in <strong>{plot.block}</strong> of the 64-plot master plan drawn by The Vision Architects (Ar. Yash Garg).</span>
                </li>
              </ul>
            </div>

            {/* Forensic Area & Dimension Breakdown */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Stated Scheduled Area</span>
                <strong className="text-sm font-bold text-[#0D2329] font-serif-heading">
                  {plot.sizeSqYd} sq. yd. ({(plot.sizeSqYd * 9).toLocaleString()} sq. ft.)
                </strong>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Annotated CAD Dimensions</span>
                <strong className="text-xs font-mono font-bold text-[#0D2329]">
                  {canonical ? `${canonical.cadDimensionA} × ${canonical.cadDimensionB}` : plot.dimensions}
                </strong>
              </div>

              {canonical && (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#53676E]">Raw Mathematical Product</span>
                    <strong className="text-xs font-mono text-[#0D2329]">
                      {canonical.derivedRectangularSqFt.toLocaleString()} sq. ft. (~{(canonical.derivedRectangularSqFt / 9).toFixed(1)} sq. yd.)
                    </strong>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#53676E]">Area Calculation Method</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E8E2D8] text-[#2C5E50]">
                      {canonical.areaMethod}
                    </span>
                  </div>

                  <div className="pb-2 border-b border-[#E8E2D8] text-[11px] text-[#53676E] leading-relaxed bg-white/80 p-2.5 rounded-xl border border-[#E8E2D8]">
                    <span className="font-bold text-[#0D2329] block mb-0.5">Forensic Sizing Note:</span>
                    {canonical.varianceNotes}
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#53676E]">Orientation / Facing</span>
                <strong className="text-xs font-semibold text-[#0D2329] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
                  {plot.facing}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#53676E]">Demarcated Access Corridor</span>
                <strong className="text-xs font-semibold text-[#0D2329]">{plot.roadWidth}</strong>
              </div>
            </div>

            {/* Synchronized 2D CAD Blueprint Alignment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#53676E] font-mono font-bold uppercase text-[10px]">
                  Architectural CAD Alignment ({plot.block})
                </span>
                <span className="text-[#C58F58] font-bold text-[10px]">Scale 1:500 (The Vision Architects)</span>
              </div>

              <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E8E2D8] bg-[#0D2329] shadow-inner group">
                <img
                  src="/project-assets/architecture/cad/previews/masterplan-real.jpg"
                  alt={`CAD Blueprint for ${plot.plotNumber}`}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full border-2 border-[#C58F58] animate-ping opacity-75" />
                  <div className="w-3 h-3 rounded-full bg-[#C58F58] text-[7px] font-bold text-black flex items-center justify-center shadow-lg absolute">
                    ★
                  </div>
                </div>
                <div className="absolute bottom-1.5 left-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] text-white flex items-center justify-between">
                  <span>CAD Unit Code: {canonical?.unitCode || plot.id.toUpperCase()}</span>
                  <span className="font-mono text-[#C58F58]">Approved Layout</span>
                </div>
              </div>
            </div>

            {/* 3-Step Guided On-Site Inspection Protocol */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#53676E] font-bold block">
                Guided On-Site Verification Protocol:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                <div className="p-2 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="font-bold text-[#2C5E50] block">1. Schedule Date</span>
                  <span className="text-[10px] text-[#53676E]">Pick morning slot</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="font-bold text-[#2C5E50] block">2. Chauffeur Car</span>
                  <span className="text-[10px] text-[#53676E]">Dwarka / Delhi NCR</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="font-bold text-[#2C5E50] block">3. Ground Inspect</span>
                  <span className="text-[10px] text-[#53676E]">Stones &amp; Mutation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Clear Decision CTAs */}
          <div className="p-6 bg-[#FAF8F5] border-t border-[#E8E2D8] space-y-2.5">
            {/* PRIMARY: Book Site Visit */}
            <button
              onClick={handleSiteVisit}
              className="w-full py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#E0AB77]" />
              <span>Book Guided Ground Site Visit for {plot.plotNumber} →</span>
            </button>

            {/* SECONDARY: Inquire on WhatsApp */}
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Inquire About {plot.plotNumber} on WhatsApp</span>
            </button>

            {/* TERTIARY: 24h Hold Reservation */}
            <div className="flex items-center gap-2">
              <Link
                href={`/book/${plot.id.toUpperCase()}`}
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#C58F58] text-[#0D2329] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#C58F58]" />
                <span>Reserve (24-Hour Hold)</span>
              </Link>

              {onFocus3D && (
                <button
                  onClick={() => {
                    onClose();
                    onFocus3D(plot.number);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#2C5E50] text-[#2C5E50] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>3D View</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
