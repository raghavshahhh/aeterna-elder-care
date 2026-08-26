// src/components/leadership/LeadershipMediaSection.tsx
"use client";

import React from "react";
import { MediaItem } from "@/types/leadership";
import { ExternalLink, Play, Radio, FileText } from "lucide-react";
import { YoutubeIcon } from "./BrandIcons";

interface LeadershipMediaSectionProps {
  mediaItems: MediaItem[];
}

export const LeadershipMediaSection: React.FC<LeadershipMediaSectionProps> = ({ mediaItems }) => {
  if (!mediaItems || mediaItems.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white text-[#0D2329] border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <YoutubeIcon className="w-3.5 h-3.5" />
            <span>MEDIA &amp; APPEARANCES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            Interviews, Talks &amp; Public Discourses
          </h2>
          <p className="text-sm text-[#53676E] max-w-2xl font-light">
            Verified keynote addresses, senior living panel discussions, and institutional briefings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] p-5 space-y-4 hover:border-[#C58F58] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Thumbnail slot */}
                {item.thumbnail ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/5">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-red-100 text-red-700 w-fit flex items-center gap-2">
                    <YoutubeIcon className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      {item.platform}
                    </span>
                  </div>
                )}

                <h3 className="font-bold text-sm text-[#0D2329] font-serif-heading group-hover:text-[#2C5E50] transition-colors leading-snug">
                  {item.title}
                </h3>

                {item.channel && (
                  <p className="text-xs text-[#C58F58] font-medium font-mono">
                    {item.channel} {item.date && `• ${item.date}`}
                  </p>
                )}

                {item.description && (
                  <p className="text-xs text-[#53676E] font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-bold text-[#2C5E50]">
                <span>Watch on {item.platform === "youtube" ? "YouTube" : "Official Source"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
