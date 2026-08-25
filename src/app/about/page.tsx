'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectOverview, coreValues, architectProfile } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import {
  Compass,
  Building2,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function AboutPage() {
  const { openLeadDrawer, openWhatsApp } = useModal();

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 bg-[#FAF8F5]">
      {/* Editorial Hero */}
      <section className="bg-gradient-to-b from-[#0D2329] to-[#071519] text-white py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            About Senior Living Citizen Foundation
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5] leading-tight">
            The <span className="italic font-serif text-[#C58F58]">Story</span> Behind the Project.
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
            A community built from a simple conviction — that India&apos;s seniors deserve a township designed for them, not one they have to make do with.
          </p>
        </div>
      </section>

      {/* The Foundation Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              The Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-[#0D2329]">
              Why <span className="italic font-serif text-[#C58F58]">Senior Living Citizen Foundation?</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#53676E] leading-relaxed">
              <p>
                The Senior Living Citizen Foundation was conceived with one question: where do India&apos;s seniors go when their city becomes too fast, too loud, and too far from the doctor?
              </p>
              <p>
                The answer was not another apartment tower. It was a plotted community — land in your name, a home built to your body, and neighbours living the same chapter of life as you.
              </p>
              <p>
                Set on the SH-22 corridor between Jhajjar and Bahadurgarh, close to Reliance MET City and Village Chhudani, the project sits at the intersection of accessibility and quiet.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#2C5E50]">64</div>
                <div className="text-[10px] font-mono uppercase text-[#53676E] mt-0.5">Total Plots</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#2C5E50]">6</div>
                <div className="text-[10px] font-mono uppercase text-[#53676E] mt-0.5">Blocks A–F</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#C58F58]">30k</div>
                <div className="text-[10px] font-mono uppercase text-[#53676E] mt-0.5">Sqft Hospital</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#2C5E50]">425</div>
                <div className="text-[10px] font-mono uppercase text-[#53676E] mt-0.5">Max Sq. Yds.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0D2329] text-white shadow-2xl space-y-6">
              <div className="font-serif italic text-xl sm:text-2xl text-[#F2EADA] leading-relaxed">
                &ldquo;{projectOverview.visionStatement}&rdquo;
              </div>
              <div className="pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-widest text-[#E0AB77]">
                Project Vision Statement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
            What We Stand For
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Four Values That Shape <span className="italic font-serif text-[#C58F58]">Every Decision</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) => (
            <div
              key={val.num}
              className="bg-white rounded-3xl p-7 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="text-4xl font-serif font-bold text-[#C58F58]/60">
                  {val.num}
                </div>
                <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                  {val.description}
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-[#E8E2D8]/60 flex items-center gap-1.5 text-xs text-[#2C5E50] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Non-Negotiable Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#FAF8F5]">
              Ready to Walk the Land in Kheri Asra?
            </h3>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Book a private site walkthrough with your parents. We arrange comfortable car pick-and-drop from Delhi NCR.
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5">
            <button
              onClick={() => openLeadDrawer({ title: 'Book Site Walkthrough', actionType: 'book-site-visit' })}
              className="px-6 py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#B37E47] text-white text-xs font-bold transition-all shadow-lg"
            >
              Book a Site Visit
            </button>
            <button
              onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I would like to schedule a site visit to Senior Living Citizen Foundation...' })}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
