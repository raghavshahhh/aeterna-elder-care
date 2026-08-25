'use client';

import React from 'react';
import { UnitType } from '@/types';
import { ShieldCheck, Maximize2, Compass, Layers, CheckCircle2 } from 'lucide-react';

interface Unit2DCadBlueprintProps {
  unitType: UnitType;
  activeRoom?: string;
  onSelectRoom?: (room: 'bedroom' | 'living' | 'kitchen' | 'bathroom') => void;
  interactive?: boolean;
}

export const Unit2DCadBlueprint: React.FC<Unit2DCadBlueprintProps> = ({
  unitType,
  activeRoom,
  onSelectRoom,
  interactive = true
}) => {
  const is1RK = unitType === '1-rk';

  return (
    <div className="w-full bg-[#071519] border border-[#163942] rounded-2xl p-4 sm:p-6 text-white shadow-xl space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/15 text-xs">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] font-mono text-[11px] font-bold uppercase">
            {is1RK ? '1 RK STUDIO SUITE CAD' : '1 BHK SENIOR RESIDENCE CAD'}
          </div>
          <span className="text-white/60 font-mono text-[11px]">
            {is1RK ? '195 sq. ft. Carpet • 240 sq. ft. Super' : '276 sq. ft. Carpet • 400 sq. ft. Super'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Universal Barrier-Free Standard</span>
        </div>
      </div>

      {/* SVG Architectural Blueprint */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#0A1C22] rounded-xl border border-white/10 overflow-hidden p-2 sm:p-4 flex items-center justify-center">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #53676E 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {is1RK ? (
          /* ─── 1 RK STUDIO SUITE 2D CAD BLUEPRINT ─── */
          <svg
            viewBox="0 0 600 450"
            className="w-full h-full max-h-[380px] drop-shadow-md select-none font-sans"
          >
            {/* Outer Perimeter Walls */}
            <rect x="40" y="30" width="520" height="380" fill="#0D2329" stroke="#E0AB77" strokeWidth="4" rx="4" />
            <rect x="44" y="34" width="512" height="372" fill="none" stroke="#2C5E50" strokeWidth="2" />

            {/* Bathroom Partition Wall (Right Top Corner) */}
            <path d="M 360 34 L 360 210 L 556 210" fill="none" stroke="#E0AB77" strokeWidth="3" />
            {/* Door opening arc for bathroom */}
            <path d="M 360 140 A 60 60 0 0 1 420 200" fill="none" stroke="#25D366" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="360" y1="200" x2="420" y2="200" stroke="#25D366" strokeWidth="2" />

            {/* 1. STUDIO LIVING & SLEEPING SUITE (Left/Center area) */}
            <g
              onClick={() => onSelectRoom && onSelectRoom('bedroom')}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              <rect
                x="48"
                y="38"
                width="306"
                height="364"
                fill={activeRoom === 'bedroom' || activeRoom === 'living' ? 'rgba(197, 143, 88, 0.15)' : 'rgba(255,255,255,0.02)'}
                className="transition-colors group-hover:fill-amber-950/30"
              />
              
              {/* Senior Bed 12'0" x 14'0" placement */}
              <rect x="70" y="60" width="130" height="150" fill="#14353E" stroke="#E0AB77" strokeWidth="1.5" rx="3" />
              <rect x="75" y="65" width="55" height="35" fill="#2C5E50" rx="2" />
              <rect x="140" y="65" width="55" height="35" fill="#2C5E50" rx="2" />
              <text x="135" y="145" fill="#FAF8F5" fontSize="11" fontWeight="bold" textAnchor="middle">
                Senior Ortho Bed
              </text>
              <text x="135" y="160" fill="#E0AB77" fontSize="9" textAnchor="middle">
                (500mm Low-Rise)
              </text>

              {/* Bedside Nightstand & Panic Switch */}
              <rect x="205" y="60" width="35" height="35" fill="#14353E" stroke="#25D366" strokeWidth="1.5" rx="2" />
              <circle cx="222" cy="77" r="5" fill="#FF3B30" />
              <text x="222" y="110" fill="#FF3B30" fontSize="8" textAnchor="middle">SOS Switch</text>

              {/* Cozy Settee & Coffee Table */}
              <rect x="80" y="270" width="130" height="60" fill="#163E48" stroke="#FAF8F5" strokeWidth="1.2" rx="4" />
              <circle cx="145" cy="365" r="22" fill="#14353E" stroke="#E0AB77" strokeWidth="1.2" />
              <text x="145" y="305" fill="#FAF8F5" fontSize="10" textAnchor="middle">Reading Settee</text>

              {/* TV Media Console */}
              <rect x="270" y="270" width="18" height="100" fill="#14353E" stroke="#53676E" strokeWidth="1.5" />
              <text x="295" y="325" fill="#FAF8F5" fontSize="9">OLED TV</text>

              {/* Room Tag Label */}
              <rect x="90" y="225" width="220" height="26" fill="#071519" stroke="#E0AB77" strokeWidth="1" rx="4" />
              <text x="200" y="242" fill="#FAF8F5" fontSize="11" fontWeight="bold" textAnchor="middle">
                STUDIO LIVING &amp; BED (12&apos;0&quot; × 14&apos;0&quot;)
              </text>
            </g>

            {/* 2. ATTACHED BARRIER-FREE ACCESSIBLE BATHROOM (Right Top) */}
            <g
              onClick={() => onSelectRoom && onSelectRoom('bathroom')}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              <rect
                x="364"
                y="38"
                width="188"
                height="168"
                fill={activeRoom === 'bathroom' ? 'rgba(37, 211, 102, 0.15)' : 'rgba(255,255,255,0.03)'}
                className="transition-colors group-hover:fill-emerald-950/30"
              />

              {/* Wall-Hung Commode with Grab Bars */}
              <rect x="380" y="55" width="40" height="50" fill="#14353E" stroke="#FAF8F5" strokeWidth="1.5" rx="10" />
              <line x1="375" y1="48" x2="375" y2="115" stroke="#25D366" strokeWidth="3" />
              <line x1="425" y1="48" x2="425" y2="115" stroke="#25D366" strokeWidth="3" />
              <text x="400" y="125" fill="#25D366" fontSize="8" textAnchor="middle">32mm Rails</text>

              {/* Zero-Threshold Roll-In Shower Channel */}
              <rect x="450" y="55" width="85" height="85" fill="none" stroke="#25D366" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx="492" cy="97" r="14" fill="#14353E" stroke="#25D366" strokeWidth="1" />
              <text x="492" y="101" fill="#FAF8F5" fontSize="8" textAnchor="middle">Flush Drain</text>

              {/* Vanity & SOS Pull Cord */}
              <rect x="375" y="155" width="60" height="30" fill="#14353E" stroke="#E0AB77" strokeWidth="1.2" />
              <circle cx="510" cy="165" r="7" fill="#FF3B30" />
              <text x="510" y="185" fill="#FF3B30" fontSize="8" textAnchor="middle">SOS Cord</text>

              {/* Room Tag Label */}
              <rect x="375" y="115" width="165" height="22" fill="#071519" stroke="#25D366" strokeWidth="1" rx="4" />
              <text x="457" y="130" fill="#25D366" fontSize="10" fontWeight="bold" textAnchor="middle">
                BATHROOM (8&apos;0&quot; × 6&apos;0&quot;)
              </text>
            </g>

            {/* 3. INTEGRATED KITCHENETTE PANTRY CORNER (Right Bottom) */}
            <g
              onClick={() => onSelectRoom && onSelectRoom('kitchen')}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              <rect
                x="364"
                y="214"
                width="188"
                height="188"
                fill={activeRoom === 'kitchen' ? 'rgba(197, 143, 88, 0.15)' : 'rgba(255,255,255,0.02)'}
                className="transition-colors group-hover:fill-amber-950/30"
              />

              {/* L-Shape Low Quartz Countertop */}
              <path d="M 375 225 L 535 225 L 535 385 L 485 385 L 485 275 L 375 275 Z" fill="#14353E" stroke="#E0AB77" strokeWidth="1.5" />
              
              {/* Undermount Sink */}
              <rect x="390" y="235" width="40" height="30" fill="#2C5E50" stroke="#FAF8F5" strokeWidth="1" />
              <circle cx="410" cy="250" r="3" fill="#E0AB77" />

              {/* Induction Hob */}
              <circle cx="460" cy="250" r="12" fill="#071519" stroke="#FF3B30" strokeWidth="1.5" />
              <text x="460" y="253" fill="#FAF8F5" fontSize="7" textAnchor="middle">Induction</text>

              {/* Wheelchair Accessible Corridor */}
              <circle cx="420" cy="335" r="28" fill="none" stroke="#25D366" strokeWidth="1" strokeDasharray="3 3" />
              <text x="420" y="338" fill="#25D366" fontSize="8" textAnchor="middle">1200mm Turn</text>

              {/* Room Tag Label */}
              <rect x="380" y="285" width="155" height="22" fill="#071519" stroke="#E0AB77" strokeWidth="1" rx="4" />
              <text x="457" y="300" fill="#E0AB77" fontSize="10" fontWeight="bold" textAnchor="middle">
                KITCHENETTE (5&apos;0&quot; × 6&apos;0&quot;)
              </text>
            </g>

            {/* Entrance Doorway & Direction Marker */}
            <path d="M 40 370 A 50 50 0 0 0 90 410" fill="none" stroke="#25D366" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="40" y1="370" x2="40" y2="410" stroke="#25D366" strokeWidth="3" />
            <text x="65" y="430" fill="#25D366" fontSize="9" fontWeight="bold">Main Entry (1200mm)</text>
          </svg>
        ) : (
          /* ─── 1 BHK SENIOR RESIDENCE 2D CAD BLUEPRINT ─── */
          <svg
            viewBox="0 0 600 450"
            className="w-full h-full max-h-[380px] drop-shadow-md select-none font-sans"
          >
            {/* Outer Perimeter Walls */}
            <rect x="30" y="30" width="540" height="380" fill="#0D2329" stroke="#E0AB77" strokeWidth="4" rx="4" />
            <rect x="34" y="34" width="532" height="372" fill="none" stroke="#2C5E50" strokeWidth="2" />

            {/* Internal Central Dividing Wall (Left Living/Kitchen, Right Bedroom/Bath) */}
            <line x1="300" y1="34" x2="300" y2="406" stroke="#E0AB77" strokeWidth="3" />
            {/* Horizontal Partition Left (Kitchen vs Living) */}
            <line x1="34" y1="180" x2="300" y2="180" stroke="#E0AB77" strokeWidth="3" />
            {/* Horizontal Partition Right (Bathroom vs Bedroom) */}
            <line x1="300" y1="180" x2="566" y2="180" stroke="#E0AB77" strokeWidth="3" />

            {/* 1. MODULAR KITCHEN (Top Left, 5'0" x 9'0") */}
            <g
              onClick={() => onSelectRoom && onSelectRoom('kitchen')}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              <rect
                x="38"
                y="38"
                width="258"
                height="138"
                fill={activeRoom === 'kitchen' ? 'rgba(197, 143, 88, 0.15)' : 'rgba(255,255,255,0.02)'}
                className="transition-colors group-hover:fill-amber-950/30"
              />
              <rect x="45" y="45" width="240" height="40" fill="#14353E" stroke="#E0AB77" strokeWidth="1.2" />
              <rect x="60" y="50" width="45" height="28" fill="#2C5E50" stroke="#FAF8F5" strokeWidth="1" />
              <circle cx="160" cy="65" r="10" fill="#071519" stroke="#FF3B30" strokeWidth="1.2" />
              <circle cx="190" cy="65" r="10" fill="#071519" stroke="#FF3B30" strokeWidth="1.2" />
              
              <rect x="65" y="110" width="200" height="24" fill="#071519" stroke="#E0AB77" strokeWidth="1" rx="4" />
              <text x="165" y="126" fill="#E0AB77" fontSize="10" fontWeight="bold" textAnchor="middle">
                MODULAR KITCHEN (5&apos;0&quot; × 9&apos;0&quot;)
              </text>
            </g>

            {/* 2. LIVING SALON (Bottom Left, 9'0" x 9'10") */}
            <g
              onClick={() => onSelectRoom && onSelectRoom('living')}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              <rect
                x="38"
                y="184"
                width="258"
                height="222"
                fill={activeRoom === 'living' ? 'rgba(197, 143, 88, 0.15)' : 'rgba(255,255,255,0.02)'}
                className="transition-colors group-hover:fill-amber-950/30"
              />
              {/* 3-Seater Sofa */}
              <rect x="55" y="240" width="130" height="55" fill="#163E48" stroke="#FAF8F5" strokeWidth="1.2" rx="4" />
              <rect x="75" y="315" width="90" height="35" fill="#14353E" stroke="#E0AB77" strokeWidth="1.2" rx="2" />
              {/* TV Unit */}
              <rect x="250" y="230" width="15" height="110" fill="#14353E" stroke="#53676E" strokeWidth="1.2" />

              <rect x="55" y="365" width="220" height="24" fill="#071519" stroke="#E0AB77" strokeWidth="1" rx="4" />
              <text x="165" y="381" fill="#FAF8F5" fontSize="10" fontWeight="bold" textAnchor="middle">
                LIVING SALON (9&apos;0&quot; × 9&apos;10&quot;)
              </text>
            </g>

            {/* 3. SENIOR-SAFE TOILET (Top Right, 4'0" x 7'2") */}
            <g
              onClick={() => onSelectRoom && onSelectRoom('bathroom')}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              <rect
                x="304"
                y="38"
                width="258"
                height="138"
                fill={activeRoom === 'bathroom' ? 'rgba(37, 211, 102, 0.15)' : 'rgba(255,255,255,0.02)'}
                className="transition-colors group-hover:fill-emerald-950/30"
              />
              {/* Commode + Grab Bars */}
              <rect x="330" y="55" width="40" height="45" fill="#14353E" stroke="#FAF8F5" strokeWidth="1.2" rx="8" />
              <line x1="325" y1="48" x2="325" y2="105" stroke="#25D366" strokeWidth="3" />
              <line x1="375" y1="48" x2="375" y2="105" stroke="#25D366" strokeWidth="3" />
              {/* Shower channel */}
              <rect x="460" y="50" width="80" height="65" fill="none" stroke="#25D366" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="500" cy="80" r="10" fill="#14353E" stroke="#25D366" strokeWidth="1" />
              <circle cx="530" cy="135" r="6" fill="#FF3B30" />

              <rect x="335" y="110" width="200" height="24" fill="#071519" stroke="#25D366" strokeWidth="1" rx="4" />
              <text x="435" y="126" fill="#25D366" fontSize="10" fontWeight="bold" textAnchor="middle">
                SENIOR TOILET (4&apos;0&quot; × 7&apos;2&quot;)
              </text>
            </g>

            {/* 4. MASTER BEDROOM (Bottom Right, 10'0" x 10'10") */}
            <g
              onClick={() => onSelectRoom && onSelectRoom('bedroom')}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              <rect
                x="304"
                y="184"
                width="258"
                height="222"
                fill={activeRoom === 'bedroom' ? 'rgba(197, 143, 88, 0.15)' : 'rgba(255,255,255,0.02)'}
                className="transition-colors group-hover:fill-amber-950/30"
              />
              {/* Bed King */}
              <rect x="360" y="210" width="140" height="130" fill="#14353E" stroke="#E0AB77" strokeWidth="1.5" rx="3" />
              <rect x="365" y="215" width="60" height="30" fill="#2C5E50" rx="2" />
              <rect x="435" y="215" width="60" height="30" fill="#2C5E50" rx="2" />
              <text x="430" y="280" fill="#FAF8F5" fontSize="10" fontWeight="bold" textAnchor="middle">
                King Bed (500mm)
              </text>

              {/* Nightstands */}
              <rect x="325" y="210" width="28" height="28" fill="#14353E" stroke="#25D366" strokeWidth="1.2" />
              <rect x="508" y="210" width="28" height="28" fill="#14353E" stroke="#25D366" strokeWidth="1.2" />

              <rect x="330" y="365" width="210" height="24" fill="#071519" stroke="#E0AB77" strokeWidth="1" rx="4" />
              <text x="435" y="381" fill="#FAF8F5" fontSize="10" fontWeight="bold" textAnchor="middle">
                MASTER BEDROOM (10&apos;0&quot; × 10&apos;10&quot;)
              </text>
            </g>

            {/* Entrance Door */}
            <path d="M 30 360 A 50 50 0 0 0 80 410" fill="none" stroke="#25D366" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="30" y1="360" x2="30" y2="410" stroke="#25D366" strokeWidth="3" />
            <text x="55" y="430" fill="#25D366" fontSize="9" fontWeight="bold">Main Entry (1200mm)</text>
          </svg>
        )}
      </div>

      {/* Legend & Room Dimension Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 border-t border-white/10">
        <div className="p-2 rounded-lg bg-black/20 border border-white/5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E0AB77]" />
          <span className="text-white/80 text-[11px]">Plaster Wall CAD</span>
        </div>
        <div className="p-2 rounded-lg bg-black/20 border border-white/5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
          <span className="text-white/80 text-[11px]">32mm Grab Rails</span>
        </div>
        <div className="p-2 rounded-lg bg-black/20 border border-white/5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3B30]" />
          <span className="text-white/80 text-[11px]">Emergency SOS</span>
        </div>
        <div className="p-2 rounded-lg bg-black/20 border border-white/5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-white/80 text-[11px]">1200mm Doorway</span>
        </div>
      </div>
    </div>
  );
};
