// src/components/leadership/OwnerTimelineSection.tsx
"use client";

import React from "react";
import { CareerMilestone } from "@/types/leadership";
import { Briefcase, Calendar, Award, ExternalLink, Building2 } from "lucide-react";

interface OwnerTimelineSectionProps {
  timeline: CareerMilestone[];
  personName: string;
}

export const OwnerTimelineSection: React.FC<OwnerTimelineSectionProps> = ({
  timeline,
  personName
}) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="pt-10 border-t border-[#E8E2D8] space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C58F58]">
          Leadership Track Record
        </span>
        <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
          Professional History &amp; Milestone Timeline
        </h3>
      </div>

      <div className="relative border-l-2 border-[#E8E2D8] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        {timeline.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#2C5E50] group-hover:scale-125 transition-transform" />

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-3 hover:border-[#C58F58]/50 transition-colors shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item.companyLogo ? (
                    <img
                      src={item.companyLogo}
                      alt={item.organization || "Company"}
                      className="w-6 h-6 object-contain rounded"
                    />
                  ) : (
                    <Building2 className="w-4 h-4 text-[#2C5E50]" />
                  )}
                  <h4 className="font-bold text-sm text-[#0D2329] font-serif-heading">
                    {item.organization}
                  </h4>
                </div>

                {item.year && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF2EE] text-[#2C5E50] text-[10px] font-mono font-bold">
                    <Calendar className="w-3 h-3" />
                    <span>{item.year}</span>
                  </span>
                )}
              </div>

              {item.role && (
                <div className="text-xs font-semibold text-[#C58F58]">{item.role}</div>
              )}

              {item.description && (
                <p className="text-xs text-[#53676E] leading-relaxed font-light">
                  {item.description}
                </p>
              )}

              {item.achievement && (
                <div className="pt-2 flex items-start gap-2 text-xs font-medium text-[#2C5E50] border-t border-[#E8E2D8]">
                  <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C58F58]" />
                  <span>Key Result: {item.achievement}</span>
                </div>
              )}

              {item.supportingLink && (
                <div className="pt-1">
                  <a
                    href={item.supportingLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C5E50] hover:text-[#0D2329] transition-colors"
                  >
                    <span>{item.supportingLink.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
