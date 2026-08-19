'use client';

import React from 'react';
import Image from 'next/image';
import { locationLandmarks, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Car,
  Trees,
  Siren,
  Plane,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Building2
} from 'lucide-react';

export const LocationConnectivity: React.FC = () => {
  const { openLeadDrawer } = useModal();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hospital':
        return <Siren className="w-5 h-5 text-rose-600" />;
      case 'expressway':
        return <Car className="w-5 h-5 text-[#C58F58]" />;
      case 'nature':
        return <Trees className="w-5 h-5 text-emerald-600" />;
      case 'transit':
        return <Building2 className="w-5 h-5 text-[#1D4B57]" />;
      default:
        return <MapPin className="w-5 h-5 text-[#2C5E50]" />;
    }
  };

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Strategic Location & Connectivity
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              Near Reliance MET City, <span className="italic font-serif text-[#C58F58]">SH-22 Jhajjar.</span>
            </h2>
            <p className="text-base text-[#53676E] leading-relaxed">
              Located in Kheri Asra, Haryana — surrounded by quiet green fields and fresh air, while situated directly off State Highway 22 for fast, signal-free transit to Gurugram and Farrukhnagar.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={projectOverview.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#0D2329] text-white hover:bg-[#1D4B57] text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              <MapPin className="w-4 h-4 text-[#C58F58]" />
              Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Button
              variant="outline"
              size="lg"
              className="border-[#2C5E50] text-[#2C5E50] hover:bg-[#2C5E50] hover:text-white text-xs font-semibold"
              onClick={() => openLeadDrawer({ title: 'Book On-Site Location Walkthrough', actionType: 'book-site-visit' })}
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book Site Walk
            </Button>
          </div>
        </div>

        {/* Location Grid: Visual Story + Interactive Landmark Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Grounding Card */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8] bg-[#0D2329] min-h-[380px] lg:min-h-full flex flex-col justify-end p-6 sm:p-8 group">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
              alt="Kheri Asra, Jhajjar Natural Surroundings"
              fill
              className="object-cover object-center opacity-65 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071519] via-[#071519]/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Pure Air & Zero City Congestion
              </div>
              <h3 className="text-2xl font-serif-heading font-bold text-white leading-snug">
                Pristine Environment with On-Site Hospital & Mandir
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Most Indian cities lack walkable space and quiet air. Senior Living Citizen Foundation provides 64 plots and senior apartments where the hospital and mandir are five minutes away.
              </p>
            </div>
          </div>

          {/* Landmarks & Proximity Matrix */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locationLandmarks.map((landmark, index) => (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E2D8] hover:border-[#C58F58]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center">
                        {getCategoryIcon(landmark.category)}
                      </div>
                      <div className="text-right">
                        <span className="text-sm sm:text-base font-bold text-[#0D2329] block">
                          {landmark.travelTime}
                        </span>
                        <span className="text-[11px] text-[#53676E] block font-medium">
                          {landmark.distance}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#0D2329] font-serif-heading">
                        {landmark.name}
                      </h4>
                      <p className="text-xs text-[#53676E] mt-1.5 leading-relaxed">
                        {landmark.significance}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] text-[#2C5E50] font-semibold">
                    <span>Direct Access</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              ))}
            </div>

            {/* Travel Summary Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#14353E]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#2C5E50] shrink-0" />
                <span>
                  <strong>Project Location:</strong> {projectOverview.locationShort} (Plus Code: {projectOverview.googleMapsPlusCode})
                </span>
              </div>
              <a
                href={projectOverview.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2C5E50] font-bold hover:underline flex items-center gap-1 shrink-0"
              >
                Open Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
