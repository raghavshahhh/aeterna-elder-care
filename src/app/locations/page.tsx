'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Compass
} from 'lucide-react';
import { Location } from '@/lib/db/schema';
import { useModal } from '@/context/ModalContext';

export default function LocationsDirectoryPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { openLeadDrawer } = useModal();

  useEffect(() => {
    async function loadLocs() {
      try {
        const res = await fetch('/api/locations?published=true');
        if (res.ok) {
          const data = await res.json();
          setLocations(data.locations || []);
        }
      } catch (err) {
        console.error('Error loading locations:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLocs();
  }, []);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="pt-28 sm:pt-36 pb-16 bg-[#0D2329] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#C58F58]" />
            National Sanctuary Directory
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Find a Community That Feels <span className="italic font-serif text-[#E0AB77]">Like Home.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            From the expansive plotted plains of Delhi NCR to the gentle palm groves of North Goa, discover communities purpose-built for senior health, dignity, and independence.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Haryana (Delhi NCR) */}
          <div className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xl flex flex-col justify-between group hover:shadow-2xl transition-all">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-[#0D2329]">
              <img
                src="/project-assets/real/drone-aerial.jpg"
                alt="Haryana Sanctuary Aerial"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0D2329]/90 backdrop-blur-md text-[#E0AB77] font-mono text-xs font-bold border border-white/10">
                  HARYANA · DELHI NCR
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white font-mono text-xs font-bold">
                  Pre-Launch
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
                  Kheri Asra Senior Plotted Sanctuary
                </h2>
                <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                  A master-planned 64-plot sanctuary with G+2 senior residences, community mandir, and an on-site proposed 30,000 sq. ft. Ayurvedic hospital on SH-22 near Reliance MET City, Jhajjar.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8]">
                    <span className="text-[10px] text-[#53676E] block uppercase">Inventory Scope</span>
                    <span className="font-bold text-[#0D2329]">64 Freehold Plots + 9 Apts</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8]">
                    <span className="text-[10px] text-[#53676E] block uppercase">Down Payment Plan</span>
                    <span className="font-bold text-[#C58F58]">₹25 Lakh Upfront</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row gap-3">
                <Link
                  href="/projects/kheri-asra"
                  className="flex-1 py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 font-mono"
                >
                  <span>Explore 3D Masterplan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => openLeadDrawer({ actionType: 'site_visit' })}
                  className="py-3.5 px-5 rounded-2xl bg-[#FAF8F5] hover:bg-[#EAF2EE] text-[#0D2329] text-xs font-bold border border-[#E8E2D8] transition-colors cursor-pointer"
                >
                  Book Walkthrough
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Goa (Coastal Haven — Planned) */}
          <div className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xl flex flex-col justify-between group hover:shadow-2xl transition-all">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-[#0D2329] flex items-center justify-center">
              <div className="text-center px-8">
                <span className="text-6xl opacity-30">🌴</span>
                <p className="text-white/40 text-xs font-mono mt-3 uppercase tracking-widest">Site Photography Pending</p>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0D2329]/90 backdrop-blur-md text-[#E0AB77] font-mono text-xs font-bold border border-white/10">
                  GOA · CANDOLIM
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-600/90 text-white font-mono text-xs font-bold">
                  Coming Soon
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
                  Goa Coastal Serene Living
                </h2>
                <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
                  A planned boutique senior retreat in the peaceful green foothills of North Goa. Designed to offer fully furnished suites, professional care services, and coastal tranquillity. Details will be updated as the franchise plan progresses.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8]">
                    <span className="text-[10px] text-[#53676E] block uppercase">Current Status</span>
                    <span className="font-bold text-amber-700">Planning Stage</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8]">
                    <span className="text-[10px] text-[#53676E] block uppercase">Location</span>
                    <span className="font-bold text-[#C58F58]">North Goa</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row gap-3">
                <Link
                  href="/projects/goa-residence"
                  className="flex-1 py-3.5 rounded-2xl bg-[#0D2329] hover:bg-[#1a3a42] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 font-mono"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => openLeadDrawer({ actionType: 'site_visit' })}
                  className="py-3.5 px-5 rounded-2xl bg-[#FAF8F5] hover:bg-[#EAF2EE] text-[#0D2329] text-xs font-bold border border-[#E8E2D8] transition-colors cursor-pointer"
                >
                  Register Interest
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
