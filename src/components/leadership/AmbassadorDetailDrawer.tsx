// src/components/leadership/AmbassadorDetailDrawer.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LeadershipProfile } from "@/types/leadership";
import { SocialLinksRow } from "./SocialLinksRow";
import { YoutubeIcon } from "./BrandIcons";
import { useModal } from "@/context/ModalContext";
import {
  X,
  UserCheck,
  ShieldCheck,
  Building2,
  Calendar,
  Award,
  Globe,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Briefcase
} from "lucide-react";

interface AmbassadorDetailDrawerProps {
  ambassador: LeadershipProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AmbassadorDetailDrawer: React.FC<AmbassadorDetailDrawerProps> = ({
  ambassador,
  isOpen,
  onClose
}) => {
  const { openWhatsApp, openLeadDrawer } = useModal();
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "companies" | "media">("overview");

  if (!isOpen || !ambassador) return null;

  const hasPortrait = Boolean(ambassador.portrait && ambassador.portrait.trim().length > 0);
  const hasTimeline = Boolean(ambassador.careerTimeline && ambassador.careerTimeline.length > 0);
  const hasCompanies = Boolean(ambassador.companies && ambassador.companies.length > 0);
  const hasMedia = Boolean(ambassador.media && ambassador.media.length > 0);
  const hasAchievements = Boolean(
    (ambassador.achievements && ambassador.achievements.length > 0) ||
    (ambassador.awards && ambassador.awards.length > 0)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/75 backdrop-blur-sm transition-opacity cursor-pointer animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-2xl bg-white border-l border-[#E8E2D8] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="space-y-6">
            {/* Drawer Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-4">
                {/* Avatar / Portrait */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#0D2329] border border-[#E8E2D8] shrink-0 relative flex items-center justify-center shadow-md">
                  {hasPortrait ? (
                    <Image
                      src={ambassador.portrait!}
                      alt={ambassador.portraitAlt || ambassador.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <img
                      src="/project-assets/brand/logo-icon-clean.png"
                      alt="SLCF Emblem"
                      className="w-9 h-9 object-contain opacity-80"
                    />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                      {ambassador.name}
                    </h3>
                    {ambassador.verificationBadge && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {ambassador.verificationBadge.label}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-[#C58F58] font-serif-heading mt-0.5">
                    {ambassador.designation}
                  </div>
                  {ambassador.subDesignation && (
                    <div className="text-[11px] text-[#53676E]">
                      {ambassador.subDesignation}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors cursor-pointer"
                aria-label="Close profile drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Social Links */}
            <SocialLinksRow socialLinks={ambassador.socialLinks} personName={ambassador.name} />

            {/* Navigation Tabs */}
            {(hasTimeline || hasCompanies || hasMedia) && (
              <div className="flex items-center gap-2 border-b border-[#E8E2D8] pb-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-[#2C5E50] text-white"
                      : "text-[#53676E] hover:bg-[#FAF8F5]"
                  }`}
                >
                  Overview
                </button>

                {hasTimeline && (
                  <button
                    onClick={() => setActiveTab("timeline")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "timeline"
                        ? "bg-[#2C5E50] text-white"
                        : "text-[#53676E] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    Track Record
                  </button>
                )}

                {hasCompanies && (
                  <button
                    onClick={() => setActiveTab("companies")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "companies"
                        ? "bg-[#2C5E50] text-white"
                        : "text-[#53676E] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    Companies
                  </button>
                )}

                {hasMedia && (
                  <button
                    onClick={() => setActiveTab("media")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "media"
                        ? "bg-[#2C5E50] text-white"
                        : "text-[#53676E] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    Media &amp; Talks
                  </button>
                )}
              </div>
            )}

            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-5 text-sm text-[#0D2329]">
                {ambassador.shortBio && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold">
                      Profile Summary
                    </span>
                    <p className="text-xs sm:text-sm text-[#0D2329] leading-relaxed">
                      {ambassador.shortBio}
                    </p>
                  </div>
                )}

                {ambassador.biography && ambassador.biography.length > 0 && (
                  <div className="space-y-2.5 text-xs sm:text-sm text-[#53676E] font-light leading-relaxed">
                    {ambassador.biography.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                )}

                {ambassador.currentRole && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#53676E] font-bold">
                      Institutional Role
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#0D2329]">
                      {ambassador.currentRole}
                    </p>
                  </div>
                )}

                {ambassador.expertise && ambassador.expertise.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold">
                      Areas of Advisory
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {ambassador.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-semibold text-[#2C5E50]"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements & Awards */}
                {hasAchievements && (
                  <div className="pt-3 border-t border-[#E8E2D8] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold">
                      Honors &amp; Milestones
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#53676E]">
                      {ambassador.achievements?.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Award className="w-3.5 h-3.5 text-[#C58F58] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                      {ambassador.awards?.map((aw, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#2C5E50] shrink-0 mt-0.5" />
                          <span>{aw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Career Timeline */}
            {activeTab === "timeline" && hasTimeline && (
              <div className="space-y-4">
                {ambassador.careerTimeline.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#0D2329]">
                        {item.organization}
                      </h4>
                      {item.year && (
                        <span className="text-[10px] font-mono text-[#2C5E50] font-bold">
                          {item.year}
                        </span>
                      )}
                    </div>
                    {item.role && (
                      <div className="text-xs text-[#C58F58] font-medium">{item.role}</div>
                    )}
                    {item.description && (
                      <p className="text-xs text-[#53676E] leading-relaxed font-light">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Companies */}
            {activeTab === "companies" && hasCompanies && (
              <div className="space-y-3">
                {ambassador.companies.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#0D2329]">{comp.name}</h4>
                      {comp.period && (
                        <span className="text-[10px] font-mono text-[#2C5E50] font-bold">
                          {comp.period}
                        </span>
                      )}
                    </div>
                    {comp.role && (
                      <div className="text-xs text-[#C58F58] font-medium">{comp.role}</div>
                    )}
                    {comp.description && (
                      <p className="text-xs text-[#53676E] font-light">{comp.description}</p>
                    )}
                    {comp.website && (
                      <a
                        href={comp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#2C5E50] font-bold hover:underline pt-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Media */}
            {activeTab === "media" && hasMedia && (
              <div className="space-y-3">
                {ambassador.media.map((med) => (
                  <a
                    key={med.id}
                    href={med.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 block hover:border-[#C58F58] transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#0D2329] group-hover:text-[#2C5E50]">
                      <span className="flex items-center gap-2">
                        <YoutubeIcon className="w-4 h-4 text-red-600" />
                        <span>{med.title}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#53676E]" />
                    </div>
                    {med.channel && (
                      <div className="text-[11px] text-[#53676E]">{med.channel}</div>
                    )}
                    {med.description && (
                      <p className="text-xs text-[#53676E] font-light">{med.description}</p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Bottom Actions */}
          <div className="pt-6 border-t border-[#E8E2D8] flex flex-col gap-2.5">
            <button
              onClick={() => {
                openWhatsApp({
                  actionType: "general",
                  message: `Hello, I would like to connect with the Senior Living Citizens Foundation team regarding institutional programs and ambassador initiatives.`
                });
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#C58F58]" />
              <span>Inquire via Secretariat WhatsApp Desk →</span>
            </button>

            <button
              onClick={() => {
                openLeadDrawer({
                  title: `Schedule Site Walk with SLCF Advisory Team`,
                  actionType: "book-site-visit"
                });
                onClose();
              }}
              className="w-full py-2.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#EAF2EE] border border-[#E8E2D8] text-xs font-semibold text-[#0D2329] transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>Book Guided Site Walk at Kheri Asra</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
