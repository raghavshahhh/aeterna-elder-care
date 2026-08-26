// src/components/leadership/LeadershipTrustSystem.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import {
  ShieldCheck,
  Building2,
  FileText,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award,
  Layers
} from "lucide-react";

interface LeadershipTrustSystemProps {
  trustAssurance: {
    section8Registration: string;
    architecturalAuthority: string;
    landTitleStatus: string;
    secretariatNotice: string;
  };
}

export const LeadershipTrustSystem: React.FC<LeadershipTrustSystemProps> = ({
  trustAssurance
}) => {
  const { openWhatsApp, openLeadDrawer, openFloorPlan } = useModal();

  return (
    <section className="py-16 sm:py-24 bg-[#071519] text-[#FAF8F5] relative overflow-hidden border-t border-[#163942]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(44,94,80,0.25),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 border border-[#C58F58]/30 text-[#E0AB77] text-[10px] font-mono uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>INSTITUTIONAL CREDIBILITY &amp; GOVERNANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-white tracking-tight">
            Governance &amp; Trust Framework
          </h2>

          <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
            Senior Living Citizens Foundation operates under statutory non-profit governance, verified architectural blueprints, and absolute land title transparency.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 hover:border-emerald-400/40 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base font-serif-heading">
              Section 8 NPO Structure
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              {trustAssurance.section8Registration}
            </p>
            <div className="pt-2">
              <Link
                href="/documents"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
              >
                <span>View Trust Records</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 hover:border-amber-400/40 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base font-serif-heading">
              Architectural Blueprints
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              {trustAssurance.architecturalAuthority}
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  openFloorPlan({
                    floorPlanType: "residences",
                    title: "Typical CAD Floor Plan (Plots 63 & 64)"
                  })
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E0AB77] hover:text-[#FAF8F5] font-mono transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Inspect CAD Plans</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 hover:border-blue-400/40 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base font-serif-heading">
              Freehold Land Registry
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              {trustAssurance.landTitleStatus}
            </p>
            <div className="pt-2">
              <Link
                href="/plots"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 font-mono transition-colors"
              >
                <span>Explore 64 Plots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 hover:border-[#C58F58]/40 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#C58F58]/20 text-[#C58F58] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base font-serif-heading">
              Secretariat Oversight
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              {trustAssurance.secretariatNotice}
            </p>
            <div className="pt-2">
              <Link
                href="/owner/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C58F58] hover:text-white font-mono transition-colors"
              >
                <span>Trustee Portal Login</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#14323A] to-[#1F483D] border border-[#2C5E50] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif-heading font-bold text-white">
              Connect Directly with the Foundation Secretariat
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl font-light">
              For institutional inquiries, patron advisory briefings, or scheduling a guided site walk across Kheri Asra township.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() =>
                openWhatsApp({
                  actionType: "general",
                  message:
                    "Hello, I am inquiring through the Leadership page at Senior Living Citizens Foundation. Please connect me with the Foundation Secretariat."
                })
              }
              className="px-6 py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs sm:text-sm font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#C58F58]" />
              <span>WhatsApp Secretariat Desk</span>
            </button>

            <button
              onClick={() =>
                openLeadDrawer({
                  title: "Book Guided Site Walk with SLCF Team",
                  actionType: "book-site-visit"
                })
              }
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#E0AB77]" />
              <span>Book Site Visit Walk</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
