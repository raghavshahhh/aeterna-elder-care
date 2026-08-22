'use client';

import React from 'react';
import { Rotate3d, Layers } from 'lucide-react';

interface Cad3DToggleProps {
  viewMode: '3d' | '2d';
  onToggle: (mode: '3d' | '2d') => void;
  label3D?: string;
  label2D?: string;
  className?: string;
}

export const Cad3DToggle: React.FC<Cad3DToggleProps> = ({
  viewMode,
  onToggle,
  label3D = '3D Spatial View',
  label2D = '2D CAD Blueprint',
  className = ''
}) => {
  return (
    <div
      className={`inline-flex items-center bg-[#071519]/90 p-1 rounded-2xl border border-white/15 backdrop-blur-md shadow-lg text-xs font-bold ${className}`}
    >
      <button
        type="button"
        onClick={() => onToggle('3d')}
        className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
          viewMode === '3d'
            ? 'bg-[#2C5E50] text-white shadow-md'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
        {label3D}
      </button>

      <button
        type="button"
        onClick={() => onToggle('2d')}
        className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
          viewMode === '2d'
            ? 'bg-[#C58F58] text-[#071519] shadow-md font-bold'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        {label2D}
      </button>
    </div>
  );
};
