'use client';

import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

interface RealityBadgeProps {
  label?: string;
  className?: string;
}

export const RealityBadge: React.FC<RealityBadgeProps> = ({
  label = 'REAL SITE TODAY • DEMARCATED LAND',
  className = ''
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-md ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
      {label}
    </span>
  );
};
