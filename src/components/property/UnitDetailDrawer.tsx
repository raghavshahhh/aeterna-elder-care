'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BuildingUnit } from '@/types';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
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
  Clock
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
  const { openWhatsApp, openLeadDrawer } = useModal();
  const [activeTab, setActiveTab] = useState<'3d-interiors' | 'dimensions' | 'safety'>('3d-interiors');
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);

  if (!isOpen || !unit) return null;

  const isAvail = unit.status === 'available';
  const isFuture = unit.status === 'future_release';
  const activeRoom = unit.rooms[activeRoomIndex] || unit.rooms[0];

  const handleWhatsAppEnquiry = () => {
    const message = isAvail
      ? `Hello, I am interested in ${unit.unitNumber}.
Floor: ${unit.floorName}
Type: ${unit.typeName}
Area: ~${unit.superAreaSqFt} sq. ft. Built (~${unit.carpetAreaSqFt} sq. ft. Carpet)
Facing: ${unit.facing}
Please share the pre-launch pricing, payment milestones, and floor plan.`
      : `Hello, I would like to register my interest for ${unit.unitNumber} (${unit.typeName}, ${unit.floorName}) for future release. Please notify me when bookings open.`;

    openWhatsApp({
      actionType: isAvail ? 'reserve-unit' : 'general',
      unitName: `${unit.unitNumber} (${unit.floorName})`,
      unitType: unit.typeName,
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
        <div className="w-screen max-w-xl bg-white border-l border-[#E8E2D8] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center font-bold font-serif-heading text-base">
                  {unit.code}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C58F58] font-mono">
                      {unit.floorName.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#53676E]">• {unit.typeName}</span>
                  </div>
                  <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                    {unit.unitNumber}
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

            {/* Status Pill */}
            <div className="flex items-center gap-2">
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
                {isAvail ? '🟢 Available • Phase 1 Launch' : '⏳ Future Release • Coming Soon'}
              </span>

              <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#2C5E50] border border-[#E8E2D8] text-xs font-semibold">
                {unit.facing}
              </span>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
              <button
                onClick={() => setActiveTab('3d-interiors')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === '3d-interiors'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                Proposed 3D View
              </button>
              <button
                onClick={() => setActiveTab('dimensions')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'dimensions'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                Room Dimensions
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'safety'
                    ? 'bg-[#2C5E50] text-white shadow-sm'
                    : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                Senior Design
              </button>
            </div>

            {/* TAB 1: 3D Proposed Interiors */}
            {activeTab === '3d-interiors' && (
              <div className="space-y-3.5">
                {/* Room selector pills */}
                {unit.rooms.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {unit.rooms.map((rm, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveRoomIndex(idx)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
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
                <div className="relative rounded-2xl overflow-hidden bg-[#0D2329] min-h-[260px] sm:min-h-[300px] border border-[#E8E2D8] shadow-md flex items-end p-5">
                  <Image
                    src={activeRoom.cgiImage}
                    alt={`${unit.unitNumber} - ${activeRoom.name}`}
                    fill
                    className="object-cover object-center opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <div className="relative z-10 space-y-1 text-white max-w-md">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#C58F58]">
                      <span>{activeRoom.dimensions}</span>
                      <span>•</span>
                      <span>Indicative 3D Visualization</span>
                    </div>
                    <h4 className="text-lg font-serif-heading font-bold text-white">
                      {activeRoom.name}
                    </h4>
                    <p className="text-xs text-white/80 leading-snug">
                      {activeRoom.highlight}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-[#899B9F] italic text-right">
                  *Artist impression &amp; indicative interior visualization. Final turnkey fittings as per approved specification.
                </div>
              </div>
            )}

            {/* TAB 2: Room-by-Room Measured Dimensions */}
            {activeTab === 'dimensions' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#53676E]">Super Built-Up Area</span>
                    <strong className="text-sm font-bold text-[#0D2329]">~{unit.superAreaSqFt} sq. ft.</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#53676E]">Carpet Usable Area</span>
                    <strong className="text-sm font-bold text-[#0D2329]">~{unit.carpetAreaSqFt} sq. ft.</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#53676E]">Floor Level</span>
                    <strong className="text-xs font-semibold text-[#2C5E50]">{unit.floorName}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D2329] block">
                    Exact Room Measurements:
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

            {/* TAB 3: Senior Safety Specs */}
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
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-4 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-sm font-bold transition-all shadow-lg shadow-[#2C5E50]/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Enquire About {unit.unitNumber} on WhatsApp →
              </button>
            ) : (
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-4 rounded-2xl bg-[#C58F58] hover:bg-[#B07A46] text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
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
              className="w-full py-3 rounded-2xl text-xs text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-all font-medium text-center"
            >
              Book Site Walkthrough at Kheri Asra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
