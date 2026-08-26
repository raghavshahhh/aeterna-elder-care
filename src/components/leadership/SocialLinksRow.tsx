// src/components/leadership/SocialLinksRow.tsx
"use client";

import React from "react";
import { SocialLinks } from "@/types/leadership";
import { Globe, ExternalLink } from "lucide-react";
import {
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
  FacebookIcon,
  XTwitterIcon
} from "./BrandIcons";

interface SocialLinksRowProps {
  socialLinks?: SocialLinks;
  personName: string;
  className?: string;
  variant?: "light" | "dark";
}

export const SocialLinksRow: React.FC<SocialLinksRowProps> = ({
  socialLinks,
  personName,
  className = "",
  variant = "dark"
}) => {
  if (!socialLinks) return null;

  const {
    linkedin,
    youtube,
    instagram,
    facebook,
    x,
    website,
    wikipedia,
    otherLinks = []
  } = socialLinks;

  const hasAnyLink =
    Boolean(linkedin) ||
    Boolean(youtube) ||
    Boolean(instagram) ||
    Boolean(facebook) ||
    Boolean(x) ||
    Boolean(website) ||
    Boolean(wikipedia) ||
    otherLinks.length > 0;

  if (!hasAnyLink) return null;

  const isLight = variant === "light";
  const btnBase = isLight
    ? "bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border-white/15"
    : "bg-[#FAF8F5] hover:bg-[#EAF2EE] text-[#0D2329] hover:text-[#2C5E50] border-[#E8E2D8]";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-xl border transition-all hover:scale-105 shadow-xs flex items-center justify-center ${btnBase}`}
          aria-label={`${personName} on LinkedIn (opens in new tab)`}
          title="LinkedIn Profile"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>
      )}

      {youtube && (
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-xl border transition-all hover:scale-105 shadow-xs flex items-center justify-center text-red-600 hover:text-red-700 ${btnBase}`}
          aria-label={`${personName} on YouTube (opens in new tab)`}
          title="YouTube Channel / Talks"
        >
          <YoutubeIcon className="w-4 h-4" />
        </a>
      )}

      {x && (
        <a
          href={x}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-xl border transition-all hover:scale-105 shadow-xs flex items-center justify-center ${btnBase}`}
          aria-label={`${personName} on X (opens in new tab)`}
          title="X (Twitter) Profile"
        >
          <XTwitterIcon className="w-4 h-4" />
        </a>
      )}

      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-xl border transition-all hover:scale-105 shadow-xs flex items-center justify-center text-pink-600 hover:text-pink-700 ${btnBase}`}
          aria-label={`${personName} on Instagram (opens in new tab)`}
          title="Instagram Profile"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
      )}

      {facebook && (
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-xl border transition-all hover:scale-105 shadow-xs flex items-center justify-center text-blue-600 hover:text-blue-700 ${btnBase}`}
          aria-label={`${personName} on Facebook (opens in new tab)`}
          title="Facebook Profile"
        >
          <FacebookIcon className="w-4 h-4" />
        </a>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-xl border transition-all hover:scale-105 shadow-xs flex items-center justify-center ${btnBase}`}
          aria-label={`Official Website of ${personName} (opens in new tab)`}
          title="Personal / Organization Website"
        >
          <Globe className="w-4 h-4" />
        </a>
      )}

      {otherLinks.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-all hover:scale-105 shadow-xs flex items-center gap-1.5 ${btnBase}`}
          aria-label={`${link.label} for ${personName} (opens in new tab)`}
          title={link.label}
        >
          <span>{link.label}</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      ))}
    </div>
  );
};
