'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BuildingUnit } from '@/types';
import { useModal } from '@/context/ModalContext';
import {
  X,
  Building2,
  Maximize2,
  Compass,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Sparkles,
  Home,
  Layers,
  Clock,
  Lock,
  Car,
  BadgePercent,
  FileText,
  ChevronRight,
  Eye,
  RotateCcw
} from 'lucide-react';

interface UnitDetailDrawerProps {
  unit: BuildingUnit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UnitDetailDrawer: React.FC<UnitDetailDrawerProps> = ({
  unit,
  isOpen,
  onClose
}) => {
  const { openWhatsApp, openLeadDrawer, openFloorPlan } = useModal();
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'dimensions' | 'finance' | 'safety'>('overview');
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);

  if (!isOpen || !unit) return null;

  const isAvail = unit.status === 'available';
  const activeRoom = unit.rooms[activeRoomIndex] || unit.rooms[0];

  const handleWhatsAppEnquiry = () => {
    const message = isAvail
      ? `Hello, I am interested in ${unit.unitNumber} (${unit.typeName}).
Floor: ${unit.floorName}
Super Area: ~${unit.superAreaSqFt} sq. ft. | Carpet: ~${unit.carpetAreaSqFt} sq. ft.
Facing: ${unit.facing}
Please share payment schedule (₹25k/mo or ₹6,250/mo rental plan), parking options (₹3L covered), and floor plan.`
      : `Hello, I would like to register my interest for ${unit.unitNumber} (${unit.typeName}, ${unit.floorName}) for future release. Please notify me when bookings open.`;

    openWhatsApp({
      actionType: isAvail ? 'reserve-unit' : 'general',
      unitName: `${unit.unitNumber} (${unit.floorName})`,
      unitType: unit.typeName,
      message
    });
    onClose();
  };

  const handleOpenFloorPlan = () => {
    openFloorPlan({
      floorPlanType: 'residences',
      unitId: unit.id,
      unitName: unit.unitNumber,
      unitType: unit.typeName,
      title: `${unit.unitNumber} (${unit.typeName}) CAD Architectural Blueprint`
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/70 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-2xl bg-white border-l border-[#E8E2D8] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF2EE] text-[#2C5E50] border border-[#CDE0D7] flex items-center justify-center font-bold font-serif-heading text-lg">
                  {unit.code}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C58F58] font-mono">
                      {unit.floorName.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#53676E]">• {unit.typeName}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                    {unit.unitNumber}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full text-[#53676E] hover:text-[#0D2329] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Orientation Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isAvail
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${isAvail ? 'bg-emerald-500' : 'bg-amber-500'}`}
                />
                {isAvail ? 'Available • Phase 1 Allotment' : 'Phase 2 / Phase 3 • Priority Waitlist'}
              </span>

              <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#2C5E50] border border-[#E8E2D8] text-xs font-semibold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
                {unit.facing}
              </span>

              <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#0D2329] border border-[#E8E2D8] text-xs font-mono font-semibold">
                Plots 63 &amp; 64
              </span>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                3D Visual
              </button>
              <button
                onClick={() => setActiveTab('floorplan')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1 ${
                  activeTab === 'floorplan'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
                CAD Blueprint
              </button>
              <button
                onClick={() => setActiveTab('dimensions')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'dimensions'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                Dimensions
              </button>
              <button
                onClick={() => setActiveTab('finance')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1 ${
                  activeTab === 'finance'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                <BadgePercent className="w-3.5 h-3.5 text-[#C58F58]" />
                Payment Plans
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'safety'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                Safety Specs
              </button>
            </div>

            {/* TAB 1: 3D Proposed Interiors */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Room selector pills */}
                {unit.rooms.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {unit.rooms.map((rm, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveRoomIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                          activeRoomIndex === idx
                            ? 'bg-[#0D2329] text-white shadow-sm'
                            : 'bg-[#FAF8F5] text-[#53676E] hover:bg-[#F0EBE1]'
                        }`}
                      >
                        {rm.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* 3D Visual Box */}
                <div className="relative rounded-2xl overflow-hidden bg-[#0D2329] min-h-[280px] sm:min-h-[320px] border border-[#E8E2D8] shadow-md flex items-end p-5">
                  <Image
                    src={activeRoom.cgiImage}
                    alt={`${unit.unitNumber} - ${activeRoom.name}`}
                    fill
                    className="object-cover object-center opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <div className="relative z-10 space-y-1 text-white max-w-md">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#C58F58]">
                      <span>{activeRoom.dimensions}</span>
                      <span>•</span>
                      <span>Indicative 3D Room Walkthrough</span>
                    </div>
                    <h4 className="text-xl font-serif-heading font-bold text-white">
                      {activeRoom.name}
                    </h4>
                    <p className="text-xs text-white/85 leading-snug">
                      {activeRoom.highlight}
                    </p>
                  </div>
                </div>

                {/* Quick Area Summary Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-center">
                    <div className="text-[10px] text-[#53676E] uppercase font-mono">Super Built-Up</div>
                    <div className="text-sm font-bold text-[#0D2329] mt-0.5">~{unit.superAreaSqFt} sq. ft.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-center">
                    <div className="text-[10px] text-[#53676E] uppercase font-mono">Carpet Usable</div>
                    <div className="text-sm font-bold text-[#2C5E50] mt-0.5">~{unit.carpetAreaSqFt} sq. ft.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-center">
                    <div className="text-[10px] text-[#53676E] uppercase font-mono">Stair Rise</div>
                    <div className="text-sm font-bold text-[#0D2329] mt-0.5">Gentle 6&quot; Riser</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-center">
                    <div className="text-[10px] text-[#53676E] uppercase font-mono">Elevators</div>
                    <div className="text-sm font-bold text-[#0D2329] mt-0.5">2 Lifts (Stilt-Top)</div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C5E50] block">
                    Residence Highlights
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {unit.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-[#0D2329] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Architectural CAD Blueprint */}
            {activeTab === 'floorplan' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-[#071519] border border-[#E8E2D8] p-4 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px]">
                  <img
                    src="/project-assets/architecture/cad/previews/typical-floor-cad.jpg"
                    alt="Typical CAD Floor Plan Plots 63 & 64"
                    className="max-h-[300px] w-auto object-contain rounded-lg border border-white/10"
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 w-full pt-3 border-t border-white/10 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Ar. Yash Garg • The Vision Architects</span>
                    </div>
                    <button
                      onClick={handleOpenFloorPlan}
                      className="px-4 py-2 rounded-xl bg-[#C58F58] hover:bg-[#B37E47] text-[#071519] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Open Zoomable CAD Viewer →</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs">
                  <div className="font-bold text-[#0D2329]">Plots 63 &amp; 64 Architectural Layout:</div>
                  <ul className="space-y-1 text-[#53676E] list-disc list-inside">
                    <li>Total Footprint: 46&apos;-0&quot; × 50&apos;-6&quot; across double plot demarcation</li>
                    <li>Stilt Floor: 14 covered car bays + 3 separate entry gates</li>
                    <li>Typical Floor: 6 senior suites with common lobby 9&apos;8&quot; × 25&apos;1&quot;</li>
                    <li>Senior stairwell: 4&apos;6&quot; wide with 10&quot; tread and gentle 6&quot; riser</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: Room-by-Room Measured Dimensions */}
            {activeTab === 'dimensions' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#53676E]">Super Built-Up Area</span>
                    <strong className="text-sm font-bold text-[#0D2329]">~{unit.superAreaSqFt} sq. ft.</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#53676E]">Carpet Usable Area</span>
                    <strong className="text-sm font-bold text-[#2C5E50]">~{unit.carpetAreaSqFt} sq. ft.</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#53676E]">Floor Level</span>
                    <strong className="text-xs font-semibold text-[#0D2329]">{unit.floorName}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#53676E]">Elevation Structure</span>
                    <strong className="text-xs font-semibold text-[#2C5E50]">Stilt Parking + G+2 Residential</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D2329] block">
                    Exact Measured Room Dimensions:
                  </span>
                  {unit.rooms.map((rm, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#0D2329]">{rm.name}</div>
                        <div className="text-[11px] text-[#53676E] mt-0.5">{rm.highlight}</div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#C58F58] px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E8E2D8]">
                        {rm.dimensions}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Transparent Pricing & Payment Structure */}
            {activeTab === 'finance' && (
              <div className="space-y-4">
                {/* 3 Payment Plans Breakdown */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#0D2329] text-white border border-[#C58F58]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#E0AB77] font-bold">
                        Plan 1: Down Payment Plan
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ₹25 Lakhs
                      </span>
                    </div>
                    <div className="text-xs text-white/80">
                      • <strong>₹25,000 / month</strong> rental return credited till physical possession handover.<br />
                      • <strong>₹12,500 / month</strong> assured monthly rental return post-possession (as per Foundation booking agreement).<br />
                      • 100% direct freehold land registry executed upon clearance.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0D2329]">Plan 2: 50:50 Flexi Payment</span>
                      <span className="font-mono font-bold text-[#2C5E50]">₹12.5L + ₹12.5L</span>
                    </div>
                    <div className="text-[#53676E]">
                      • 50% prior to construction with <strong>₹6,250 / month</strong> rental return till possession.<br />
                      • 50% post-completion of construction with <strong>₹12,500 / month</strong> rental return after possession.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0D2329]">Plan 3: Construction Linked (CLP)</span>
                      <span className="font-mono font-bold text-[#2C5E50]">5 Slabs @ ₹5 Lakh</span>
                    </div>
                    <div className="text-[#53676E]">
                      • Linked to 5 physical construction milestones (Plinth, 1st Lenter, 2nd Lenter, 3rd Lenter, Finishing).
                    </div>
                  </div>
                </div>

                {/* Parking & Terrace Specifications */}
                <div className="p-4 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#2C5E50]">
                    <Car className="w-4 h-4 text-[#C58F58]" />
                    Parking &amp; Additional Allotments
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#0D2329]">
                    <div className="p-2.5 rounded-xl bg-white border border-[#CDE0D7]">
                      <div className="font-bold">Covered Stilt Parking:</div>
                      <div className="text-[11px] text-[#53676E]">₹3,00,000 (Dedicated bay in 14-bay stilt)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#CDE0D7]">
                      <div className="font-bold">Uncovered Parking:</div>
                      <div className="text-[11px] text-[#53676E]">Included free in standard allotment</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Senior Safety Specs */}
            {activeTab === 'safety' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Senior-First Architectural Planning
                  </span>
                  <div className="space-y-2 text-xs text-[#0D2329]">
                    {unit.seniorFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-[#E8E2D8] space-y-2.5">
            {isAvail ? (
              <div className="space-y-2">
                <Link
                  href={`/book/${encodeURIComponent(unit.unitNumber)}`}
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C58F58] to-[#A06C3B] hover:brightness-110 text-white text-sm font-bold transition-all shadow-lg shadow-[#C58F58]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Reserve &amp; Book {unit.unitNumber} (24h Hold) →</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full py-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#EAF2EE] text-[#2C5E50] border border-[#2C5E50]/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Pricing</span>
                  </button>

                  <button
                    onClick={handleOpenFloorPlan}
                    className="w-full py-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#F0EBE1] text-[#0D2329] border border-[#E8E2D8] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-[#C58F58]" />
                    <span>Inspect CAD Plan</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-4 rounded-2xl bg-[#C58F58] hover:bg-[#B07A46] text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                Register Priority Interest for Future Release →
              </button>
            )}

            <button
              onClick={() => {
                openLeadDrawer({
                  title: `Schedule Site & Sample Walkthrough for ${unit.unitNumber}`,
                  unitName: `${unit.unitNumber} (${unit.typeName})`,
                  unitType: unit.floorName,
                  actionType: 'book-site-visit'
                });
                onClose();
              }}
              className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>Book Site Walkthrough at Kheri Asra</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
