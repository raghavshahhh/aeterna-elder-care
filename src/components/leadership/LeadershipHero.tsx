// src/components/leadership/LeadershipHero.tsx
"use client";

import React from "react";
import { useModal } from "@/context/ModalContext";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Award,
  Sparkles,
  Calendar,
  ChevronDown,
  ArrowDown,
  Lock
} from "lucide-react";

interface LeadershipHeroProps {
  badge: string;
  headline: string;
  subheading: string;
}

export const LeadershipHero: React.FC<LeadershipHeroProps> = ({
  badge,
  headline,
  subheading
}) => {
  const { openLeadDrawer } = useModal();

  const handleScrollToFounder = () => {
    const el = document.getElementById("founder-feature");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#071519] via-[#0A1D23] to-[#071519] text-[#FAF8F5] pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden border-b border-[#163942]">
      {/* Subtle Architectural Grid Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,143,88,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16394215_1px,transparent_1px),linear-gradient(to_bottom,#16394215_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D2329]/90 border border-[#C58F58]/30 text-[#E0AB77] text-[11px] font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>{badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-heading font-bold text-white tracking-tight leading-[1.1]">
            {headline}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl">
            {subheading}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={handleScrollToFounder}
              className="px-6 py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#D9A74A] text-[#071519] font-bold text-xs sm:text-sm transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer font-serif-heading"
            >
              <span>Explore the Leadership</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                openLeadDrawer({
                  title: "Book a Private Site Walk at Kheri Asra",
                  actionType: "book-site-visit"
                })
              }
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4 text-[#C58F58]" />
              <span>Book a Site Visit</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars of Institutional Trust */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-16 sm:pt-20">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#C58F58]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm font-serif-heading">
              Section 8 Non-Profit
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Structured strictly for community welfare, healthcare governance, and elder safety.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#C58F58]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm font-serif-heading">
              Architectural Oversight
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Certified blueprints by Ar. Yash Garg (The Vision Architects & Consultant).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#C58F58]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm font-serif-heading">
              Certified Freehold Title
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              64 registry plots with clear revenue demarcations in Kheri Asra (Delhi NCR).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#C58F58]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-[#C58F58]/20 text-[#C58F58] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm font-serif-heading">
              Integrated Health Core
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Proposed 30,000 sq. ft. G+2 Ayurvedic & Multi-Speciality Hospital on site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
