'use client';

import React from 'react';
import { residenceUnits } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  Sparkles,
  Lock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  MessageSquare
} from 'lucide-react';

export const AvailabilityMatrix: React.FC = () => {
  const { openWhatsApp, openLeadDrawer } = useModal();

  return (
    <section id="availability" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Live Unit Inventory & Allocation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Select Your <span className="italic font-serif text-[#C58F58]">Residence Suite.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            Strict phase control is maintained to ensure dedicated medical attention. Units 01, 02, and 03 on the Ground Floor are currently open for pre-launch reservation.
          </p>
        </div>

        {/* Inventory Table / Cards */}
        <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl overflow-hidden mb-12">
          <div className="p-6 sm:p-8 border-b border-[#E8E2D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                9-Unit Master Inventory
              </h3>
              <p className="text-xs sm:text-sm text-[#53676E] mt-0.5">
                Phase 1: 3 Suites Released • Phase 2: 6 Suites in Pipeline
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Phase 1 Available (01–03)
              </span>
              <span className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Phase 2 Pipeline (04–09)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E8E2D8] text-[11px] uppercase font-bold text-[#53676E] tracking-wider">
                  <th className="py-4 px-6">Unit ID</th>
                  <th className="py-4 px-6">Type & Configuration</th>
                  <th className="py-4 px-6">Floor Level</th>
                  <th className="py-4 px-6">Super Area</th>
                  <th className="py-4 px-6">Facing</th>
                  <th className="py-4 px-6">Current Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]">
                {residenceUnits.map((unit) => {
                  const isAvail = unit.status === 'available';
                  return (
                    <tr
                      key={unit.id}
                      className={`transition-colors ${
                        isAvail ? 'hover:bg-emerald-50/40' : 'hover:bg-amber-50/30'
                      }`}
                    >
                      <td className="py-4 px-6 font-serif-heading font-bold text-[#0D2329] whitespace-nowrap">
                        {unit.unitNumber}
                      </td>
                      <td className="py-4 px-6">
                        <strong className="text-[#0D2329] block">{unit.typeName}</strong>
                        <span className="text-[11px] text-[#53676E]">Senior-Safe Layout</span>
                      </td>
                      <td className="py-4 px-6 font-medium text-[#0D2329]">
                        {unit.floorName}
                      </td>
                      <td className="py-4 px-6 font-mono text-[#0D2329]">
                        {unit.superAreaSqFt} sq. ft.
                      </td>
                      <td className="py-4 px-6 text-[#53676E]">
                        {unit.facing}
                      </td>
                      <td className="py-4 px-6">
                        {isAvail ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                            <Lock className="w-3 h-3" />
                            Phase 2 Release
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {isAvail ? (
                          <Button
                            size="sm"
                            className="bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs font-semibold py-2 px-4 shadow-sm"
                            onClick={() =>
                              openWhatsApp({
                                actionType: 'reserve-unit',
                                unitName: unit.unitNumber,
                                unitType: unit.typeName,
                                floorName: unit.floorName
                              })
                            }
                          >
                            Reserve Now →
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#E8E2D8] text-[#53676E] hover:bg-[#FAF8F5] hover:text-[#0D2329] text-xs"
                            onClick={() =>
                              openLeadDrawer({
                                title: `Register Interest for ${unit.unitNumber}`,
                                unitName: unit.unitNumber,
                                unitType: unit.typeName,
                                actionType: 'inquire-residence'
                              })
                            }
                          >
                            Notify Me
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp Conversion CTA Banner */}
        <div className="p-8 rounded-3xl bg-[#0D2329] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#C58F58] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct WhatsApp Sales Desk
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
              Need Assistance Picking Between 1 RK & 1 BHK?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Connect directly with our Senior Project Advisor to discuss your parents&apos; clinical requirements, wheelchair accessibility, and personalized payment schedules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              size="lg"
              className="bg-[#2C5E50] hover:bg-[#3D7363] text-white py-4 px-6 text-sm font-semibold shadow-lg"
              onClick={() => openWhatsApp({ actionType: 'reserve-unit', unitName: 'General Residence Inquiry' })}
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Chat on WhatsApp Now →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 text-sm font-medium"
              onClick={() => openLeadDrawer({ title: 'Schedule Full Site & Floor Walkthrough', actionType: 'book-site-visit' })}
              leftIcon={<Calendar className="w-4 h-4 text-[#C58F58]" />}
            >
              Book Site Visit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
