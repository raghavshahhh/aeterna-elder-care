'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { testimonialsData } from '@/data/testimonialsData';
import { Badge } from '@/components/ui/Badge';
import { Star, ChevronLeft, ChevronRight, Play, CheckCircle2, Pause } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const current = testimonialsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div className="relative bg-[#0D2329] text-[#FBF9F5] rounded-3xl p-8 sm:p-12 border border-[#1C4550] shadow-2xl overflow-hidden">
      {/* Subtle gold luxury glow background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3D685A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="gold" size="md">
              Verified Family Stories
            </Badge>
            <span className="text-xs text-white/60">
              Story {currentIndex + 1} of {testimonialsData.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={isPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main quote & details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
              <span className="text-sm font-semibold text-white ml-2">5.0 / 5.0 Rating</span>
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif-heading italic leading-relaxed text-white/95">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              {current.fullStory}
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-white">{current.authorName}</h4>
                  {current.verified && (
                    <span title="Verified Customer">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#C58F58]">{current.authorRelation}</p>
                <p className="text-xs text-white/50 mt-0.5">{current.authorLocation}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-right">
                <span className="text-[11px] text-white/50 block">Care Recipient:</span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {current.elderName} ({current.elderAge} yrs)
                </span>
                <span className="text-[11px] text-emerald-400 block mt-0.5">{current.serviceUsed}</span>
              </div>
            </div>
          </div>

          {/* Media / Video Card Simulator */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/5 aspect-square sm:aspect-4/3 lg:aspect-square flex items-center justify-center group shadow-xl">
              {current.videoThumb ? (
                <>
                  <Image
                    src={current.videoThumb}
                    alt={current.authorName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <button
                    onClick={() => {
                      showToast({
                        title: 'Playing Video Story',
                        description: `Watching ${current.authorName}'s family documentary (${current.videoDuration}).`,
                        type: 'info'
                      });
                    }}
                    className="relative z-10 w-16 h-16 rounded-full bg-white/90 text-[#0D2329] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                    aria-label="Play video testimony"
                  >
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-white flex justify-between">
                    <span>Watch Video Story</span>
                    <span className="bg-black/60 px-2 py-0.5 rounded text-[11px] font-mono">
                      {current.videoDuration}
                    </span>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center space-y-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-[#C58F58]">
                    <Image
                      src={current.authorImage}
                      alt={current.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{current.authorName}</h5>
                    <p className="text-xs text-white/60 mt-1">{current.serviceUsed}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[#C58F58]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
