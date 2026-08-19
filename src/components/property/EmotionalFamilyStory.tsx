'use client';

import React from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import {
  Heart,
  CheckCircle2,
  Trees,
  Activity,
  Sparkles,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const EmotionalFamilyStory: React.FC = () => {
  const { openWhatsApp } = useModal();

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-[#C58F58] fill-[#C58F58]" />
            Peace of Mind for the Family
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-[#0D2329] tracking-tight">
            Why Every Parent Deserves a <span className="italic font-serif text-[#C58F58]">Sanctuary Like This.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            As children working in Gurugram, Delhi, or abroad, our biggest fear is our parents&apos; safety, medical emergencies, and loneliness. Here is how Senior Living Citizen Foundation solves each of those worries.
          </p>
        </div>

        {/* 3 Emotional Solution Cards with Generated Photorealistic Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Clean Air & Walking */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-60 w-full bg-[#0D2329] overflow-hidden">
              <Image
                src="/images/indian-garden-walking.jpg"
                alt="Indian elderly couple walking peacefully on green garden pathway"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-1 rounded-md bg-emerald-700/90 text-white text-[11px] font-bold shadow-sm">
                  Zero Traffic &bull; Pure Air
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                  No High-Rise Confinement
                </h3>
                <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                  Instead of being trapped in 14th-floor apartment towers, your parents walk on wide 33ft tree-lined streets with fresh countryside air in Kheri Asra.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] text-xs text-[#2C5E50] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5ft &amp; 6ft perimeter green walking buffers</span>
              </div>
            </div>
          </div>

          {/* Card 2: Doctor Next Door */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-60 w-full bg-[#0D2329] overflow-hidden">
              <Image
                src="/images/indian-hospital-care.jpg"
                alt="Senior Indian doctor attending to elderly parents in hospital"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-1 rounded-md bg-rose-700/90 text-white text-[11px] font-bold shadow-sm">
                  30,000 Sq. Ft. Hospital On-Site
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                  Immediate Medical Care
                </h3>
                <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                  No panicking in city traffic for emergency medical help. The on-site G+2 hospital has ICU, Dialysis, CT/MRI, 6 OPDs, and 24x7 pharmacies right inside the gates.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] text-xs text-[#2C5E50] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>The doctor and emergency bay are your neighbors</span>
              </div>
            </div>
          </div>

          {/* Card 3: Mandir & Sacred Peace */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-60 w-full bg-[#0D2329] overflow-hidden">
              <Image
                src="/images/indian-mandir-prayer.jpg"
                alt="Indian senior couple praying peacefully inside community Mandir"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-1 rounded-md bg-amber-700/90 text-white text-[11px] font-bold shadow-sm">
                  Community Mandir
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                  Spiritual Fulfillment &amp; Friends
                </h3>
                <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                  A sacred community Mandir is sited just a 5-minute gentle stroll from every plot. Daily morning aarti, bhajan satsang, and like-minded companions of the same generation.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] text-xs text-[#2C5E50] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>50-Seat open amphitheater for festivals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reassuring WhatsApp Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#EAF2EE] border border-[#CDE0D7] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-serif-heading font-bold text-[#0D2329]">
              Would you like to bring your parents for a site visit?
            </h4>
            <p className="text-xs sm:text-sm text-[#2C5E50]">
              We arrange comfortable car pick-and-drop from Gurugram / Delhi NCR for family site visits.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to book a family site visit with my parents to Kheri Asra...' })}
              className="px-5 py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Book Family Visit on WhatsApp →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
