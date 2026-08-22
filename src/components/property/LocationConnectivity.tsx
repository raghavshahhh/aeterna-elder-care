'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { locationLandmarks, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import { RealityBadge } from '@/components/ui/RealityBadge';
import { ProposedBadge } from '@/components/ui/ProposedBadge';
import {
  MapPin,
  Car,
  Trees,
  Siren,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Building2,
  Navigation,
  Globe,
  Layers,
  Map as MapIcon
} from 'lucide-react';

export const LocationConnectivity: React.FC = () => {
  const { openLeadDrawer } = useModal();
  const [mapTab, setMapTab] = useState<'map' | 'corridor' | 'satellite' | 'boundary'>('map');

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
    <section id="location" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
              04 • Real Location &amp; Highway Connectivity
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
              Near Reliance MET City, <span className="italic font-serif text-[#C58F58]">SH-22 Jhajjar.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
              Positioned in <strong>Kheri Asra, Haryana</strong> right on State Highway 22 (SH-22). Clean country air, wide arterial connectivity to Gurugram &amp; Delhi, and zero city congestion.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={projectOverview.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#0D2329] text-white hover:bg-[#1D4B57] text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#C58F58]" />
              Open Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Button
              variant="outline"
              size="lg"
              className="border-[#2C5E50] text-[#2C5E50] hover:bg-[#2C5E50] hover:text-white text-xs font-semibold cursor-pointer"
              onClick={() => openLeadDrawer({ title: 'Schedule Free Site Walkthrough', actionType: 'book-site-visit' })}
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book Site Walk
            </Button>
          </div>
        </div>

        {/* Interactive Map / Satellite / Corridor / Boundary Switcher */}
        <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
            <div className="flex items-center gap-2">
              <RealityBadge label="VERIFIED PHYSICAL COORDINATES" />
              <span className="text-xs font-mono text-[#53676E] hidden sm:inline">
                ({projectOverview.googleMapsPlusCode})
              </span>
            </div>

            <div className="inline-flex items-center bg-[#FAF8F5] p-1 rounded-2xl border border-[#E8E2D8] text-xs font-bold shadow-sm">
              <button
                onClick={() => setMapTab('map')}
                className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapTab === 'map' ? 'bg-[#2C5E50] text-white shadow-md' : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                Live Map
              </button>
              <button
                onClick={() => setMapTab('corridor')}
                className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapTab === 'corridor' ? 'bg-[#2C5E50] text-white shadow-md' : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Highway Corridor
              </button>
              <button
                onClick={() => setMapTab('satellite')}
                className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapTab === 'satellite' ? 'bg-[#2C5E50] text-white shadow-md' : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Satellite View
              </button>
              <button
                onClick={() => setMapTab('boundary')}
                className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapTab === 'boundary' ? 'bg-[#2C5E50] text-white shadow-md' : 'text-[#53676E] hover:text-[#0D2329]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                11+ Acres Boundary
              </button>
            </div>
          </div>

          {/* Map Tab: Interactive Google Map */}
          {mapTab === 'map' && (
            <div className="relative h-[420px] rounded-2xl overflow-hidden border border-[#E8E2D8] bg-[#0A1C22]">
              <iframe
                title="Project Location on Google Maps - Kheri Asra, Jhajjar"
                src="https://maps.google.com/maps?q=Kheri%20Asra,%20Jhajjar,%20Haryana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="border-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#0D2329]/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pointer-events-auto">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C58F58] shrink-0" />
                  <span>State Highway 22 (SH-22), Kheri Asra, Jhajjar, Haryana 124104</span>
                </div>
                <a
                  href={projectOverview.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] font-bold text-[11px] flex items-center gap-1 transition-all shrink-0"
                >
                  Open in Google Maps App <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Map Tab: Highway Corridor */}
          {mapTab === 'corridor' && (
            <div className="bg-[#071519] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="max-w-3xl space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-[#C58F58] font-bold uppercase tracking-widest block">
                    Direct Highway Connectivity Route
                  </span>
                  <h3 className="text-2xl font-serif-heading font-bold text-[#FAF8F5]">
                    Delhi &amp; Gurugram to Senior Living Foundation (SH-22)
                  </h3>
                </div>

                {/* Corridor Flow Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                    <span className="text-[10px] text-white/50 block font-mono">START</span>
                    <strong className="text-sm text-[#FAF8F5] block">Delhi / IGI</strong>
                    <span className="text-[10px] text-white/60">~45 km</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                    <span className="text-[10px] text-white/50 block font-mono">VIA</span>
                    <strong className="text-sm text-[#FAF8F5] block">Gurugram / Sec-45</strong>
                    <span className="text-[10px] text-white/60">~35 km</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                    <span className="text-[10px] text-white/50 block font-mono">VIA</span>
                    <strong className="text-sm text-[#FAF8F5] block">Farrukhnagar</strong>
                    <span className="text-[10px] text-white/60">~18 km</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#C58F58]/20 border border-[#C58F58]/40 text-center space-y-1">
                    <span className="text-[10px] text-[#C58F58] block font-mono font-bold">NEARBY HUB</span>
                    <strong className="text-sm text-[#FAF8F5] block">Reliance MET City</strong>
                    <span className="text-[10px] text-[#C58F58]">~8 km</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#2C5E50] border border-emerald-400 text-center space-y-1 shadow-lg">
                    <span className="text-[10px] text-emerald-200 block font-mono font-bold">PROJECT SITE</span>
                    <strong className="text-sm text-white block">Kheri Asra (SH-22)</strong>
                    <span className="text-[10px] text-emerald-200">11+ Acres Land</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/70 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C58F58]" />
                    <span>State Highway 22 (SH-22) Frontage with 33ft Main Entrance Gate</span>
                  </div>
                  <a
                    href={projectOverview.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C58F58] hover:underline font-bold flex items-center gap-1"
                  >
                    Open Live Navigation on Phone →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Map Tab: Satellite Context */}
          {mapTab === 'satellite' && (
            <div className="relative h-[380px] rounded-2xl overflow-hidden border border-[#E8E2D8]">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
                alt="Satellite View of Kheri Asra Farmlands"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <RealityBadge label="SATELLITE REFERENCE • KHERI ASRA SH-22" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="font-serif-heading font-bold text-base text-[#FAF8F5]">
                    Surrounded by Expansive Open Fields &amp; Clean Air Corridors
                  </p>
                  <p className="text-white/75 text-xs">
                    Plus Code: {projectOverview.googleMapsPlusCode} • Jhajjar District, Haryana
                  </p>
                </div>
                <a
                  href={projectOverview.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#2C5E50] text-white font-bold text-xs hover:bg-[#3D7363] transition-all shrink-0"
                >
                  View on Google Satellite Maps →
                </a>
              </div>
            </div>
          )}

          {/* Map Tab: 11+ Acres Boundary & Layout Map */}
          {mapTab === 'boundary' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D2329] text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#C58F58] font-bold tracking-widest block">
                    Verified Boundary Demarcation
                  </span>
                  <h4 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
                    11+ Acres Freehold Agricultural to Plotted Township
                  </h4>
                </div>
                <RealityBadge label="CORNER STONES IN PLACE" />
              </div>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                The land parcel perimeter is demarcated with physical concrete markers. The approved layout by <em>The Vision Architects</em> reserves zones for the proposed 30,000 sq. ft. Ayurvedic hospital, sacred mandir, 64 residential freehold plots, and 4-tier senior residence building.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">North Boundary</span>
                  <strong className="text-sm text-white">Green Buffer Belt</strong>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">South Boundary</span>
                  <strong className="text-sm text-white">SH-22 Main Access</strong>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">East Sector</span>
                  <strong className="text-sm text-[#C58F58]">30k Sqft Hospital</strong>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">West Sector</span>
                  <strong className="text-sm text-[#C58F58]">Community Mandir</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Transit & Landmark Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <span className="text-sm sm:text-base font-bold text-[#0D2329] block font-serif-heading">
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
      </div>
    </section>
  );
};
