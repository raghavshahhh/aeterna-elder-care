'use client';

import React from 'react';
import { Box, Sparkles } from 'lucide-react';

interface SceneLoadingFallbackProps {
  title?: string;
  subtitle?: string;
}

export const SceneLoadingFallback: React.FC<SceneLoadingFallbackProps> = ({
  title = 'Initializing 3D Architectural Scene...',
  subtitle = 'Loading CAD-proportioned geometry and lighting'
}) => {
  return (
    <div className="w-full h-full min-h-[480px] bg-gradient-to-br from-[#0D2329] via-[#14353E] to-[#071519] rounded-3xl flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      {/* Background ambient pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,143,88,0.12)_0%,transparent_70%)] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-sm">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#C58F58] shadow-2xl backdrop-blur-md">
            <Box className="w-8 h-8 animate-spin duration-3000" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C58F58] flex items-center justify-center text-[#0D2329]">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h4 className="font-serif-heading text-lg font-medium text-[#FAF8F5]">
            {title}
          </h4>
          <p className="text-xs text-white/65 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
          <div className="w-1/2 h-full bg-gradient-to-r from-[#C58F58] to-[#E0AB77] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
