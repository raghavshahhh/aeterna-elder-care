'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProposedBadgeProps {
  label?: string;
  sublabel?: string;
  className?: string;
}

export const ProposedBadge: React.FC<ProposedBadgeProps> = ({
  label = 'PROPOSED / INDICATIVE ARTIST IMPRESSION',
  sublabel = 'CAD-DERIVED SPATIAL VISUALIZATION',
  className = ''
}) => {
  return (
    <div
      className={`inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3.5 py-1.5 rounded-2xl bg-[#071519]/90 backdrop-blur-md border border-[#C58F58]/40 text-white shadow-lg ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[#C58F58] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-[#C58F58] shrink-0" />
        {label}
      </div>
      {sublabel && (
        <span className="text-[9px] sm:text-[10px] text-white/60 font-mono hidden md:inline">
          • {sublabel}
        </span>
      )}
    </div>
  );
};
