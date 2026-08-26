'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Award, ShieldCheck, HeartHandshake, Users } from 'lucide-react';

export const CommunityAdvocacyBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0D2329] via-[#091B20] to-[#071519] border border-[#C58F58]/30 p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C58F58]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2C5E50]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-xs font-mono font-bold text-[#E0AB77] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Community Advocacy & Referral Program
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
                Help Families Find Sanctuary. <span className="italic font-serif text-[#E0AB77]">Earn Guaranteed Rewards.</span>
              </h3>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl">
                Introduce parents, relatives, or friends looking for a peaceful elder-friendly environment with an on-site Ayurvedic hospital in Jhajjar. Earn an immediate <strong className="text-white">₹50 verified inquiry reward</strong> + <strong className="text-white">1% commission</strong> on confirmed registrations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-white/80">
                  <Award className="w-4 h-4 text-[#E0AB77] shrink-0" />
                  <span><strong>₹50</strong> per verified inquiry</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/80">
                  <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>1%</strong> booking commission</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/80">
                  <ShieldCheck className="w-4 h-4 text-[#E0AB77] shrink-0" />
                  <span><strong>30-Day</strong> lead protection</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col gap-3.5 w-full">
              <Link
                href="/referrals"
                className="w-full py-4 px-6 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 group text-center cursor-pointer"
              >
                <span>Generate Partner Link</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/portal/referral"
                className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all text-center flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-[#E0AB77]" />
                <span>Existing Partner Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
