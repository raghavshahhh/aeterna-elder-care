// src/components/leadership/CompanyAssociationsSection.tsx
"use client";

import React from "react";
import { CompanyAssociation } from "@/types/leadership";
import { Building2, ExternalLink, Globe, ShieldCheck } from "lucide-react";

interface CompanyAssociationsSectionProps {
  companies: CompanyAssociation[];
  title?: string;
  subtitle?: string;
}

export const CompanyAssociationsSection: React.FC<CompanyAssociationsSectionProps> = ({
  companies,
  title = "Professional Associations & Ventures",
  subtitle = "Associated enterprises, institutional partnerships, and past leadership affiliations."
}) => {
  if (!companies || companies.length === 0) return null;

  return (
    <div className="pt-10 border-t border-[#E8E2D8] space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C58F58]">
          Institutional Associations
        </span>
        <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
          {title}
        </h3>
        <p className="text-xs text-[#53676E] max-w-2xl font-light">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((comp) => (
          <div
            key={comp.id}
            className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-3 hover:border-[#C58F58]/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D8] p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                  {comp.logo ? (
                    <img
                      src={comp.logo}
                      alt={`${comp.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-5 h-5 text-[#2C5E50]" />
                  )}
                </div>

                {comp.period && (
                  <span className="px-2 py-0.5 rounded-md bg-[#EAF2EE] text-[#2C5E50] text-[10px] font-mono font-bold">
                    {comp.period}
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#0D2329] font-serif-heading">
                  {comp.name}
                </h4>
                {comp.role && (
                  <p className="text-xs font-semibold text-[#C58F58]">
                    {comp.role}
                  </p>
                )}
              </div>

              {comp.description && (
                <p className="text-xs text-[#53676E] leading-relaxed font-light line-clamp-3">
                  {comp.description}
                </p>
              )}
            </div>

            {comp.website && (
              <div className="pt-2 border-t border-[#E8E2D8]">
                <a
                  href={comp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2C5E50] hover:text-[#0D2329] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Company Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
