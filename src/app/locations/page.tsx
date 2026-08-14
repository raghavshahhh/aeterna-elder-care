'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { locationsData } from '@/data/locationsData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, MapPin, Building2, Users, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LocationsPage() {
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredLocations = locationsData.filter((loc) => {
    const matchesRegion = selectedRegion === 'all' || loc.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesSearch =
      query.trim() === '' ||
      loc.name.toLowerCase().includes(query.toLowerCase()) ||
      loc.state.toLowerCase().includes(query.toLowerCase()) ||
      loc.coveredLocalities.some((l) => l.toLowerCase().includes(query.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="sage" size="md">
            Nationwide Presence
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif-heading font-bold text-[#0D2329]">
            Active Care Hubs Across 12+ Metro Cities
          </h1>
          <p className="text-base sm:text-lg text-[#5C6F75] font-light max-w-2xl mx-auto">
            Find certified nurses, geriatric attendants, doctor visits, and sub-15 minute emergency ambulances in your neighborhood.
          </p>

          {/* Search box */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#5C6F75] absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search city, state, or neighborhood (e.g. Indiranagar, Bandra, Gurgaon, GK-2)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-[#E2D7C5] rounded-full pl-12 pr-6 py-4 text-sm text-[#0D2329] placeholder:text-[#899B9F] shadow-sm focus:outline-none focus:border-[#3D685A]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
          {/* Region filter pills */}
          <div className="flex flex-wrap gap-2">
            {['all', 'North India', 'West India', 'South India', 'East India'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg === 'all' ? 'all' : reg)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  (selectedRegion === 'all' && reg === 'all') || selectedRegion === reg
                    ? 'bg-[#0D2329] border-[#0D2329] text-white shadow-sm'
                    : 'bg-white border-[#E8E2D8] text-[#5C6F75] hover:bg-[#F6F1E8]'
                }`}
              >
                {reg === 'all' ? 'All Metros (12)' : reg}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#5C6F75] font-medium">
            Showing <strong>{filteredLocations.length}</strong> active regional hubs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#F6F1E8]">
                <Image
                  src={loc.heroImage}
                  alt={loc.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="forest" size="sm">
                    {loc.region}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                  <div>
                    <h3 className="text-2xl font-serif-heading font-bold">{loc.name}</h3>
                    <span className="text-xs text-white/80">{loc.state}</span>
                  </div>
                  <span className="text-xs font-bold bg-red-600 px-3 py-1 rounded-full">
                    &lt; {loc.avgResponseTimeMin}m Emergency SLA
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-[#FBF9F5] rounded-2xl border border-[#E8E2D8]">
                    <div>
                      <span className="block font-bold text-[#0D2329] text-sm">{loc.activeCaregivers}+</span>
                      <span className="text-[10px] text-[#5C6F75]">Caregivers</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#0D2329] text-sm">{loc.partnerHospitals}</span>
                      <span className="text-[10px] text-[#5C6F75]">Hospitals</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#0D2329] text-sm">{loc.familiesServed}+</span>
                      <span className="text-[10px] text-[#5C6F75]">Families</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D685A] block mb-1">
                      Key Covered Neighborhoods:
                    </span>
                    <p className="text-xs text-[#5C6F75] line-clamp-2">
                      {loc.coveredLocalities.slice(0, 6).join(' • ')}...
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
                  <span className="text-xs text-[#5C6F75] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#3D685A]" /> Hub Active
                  </span>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0D2329] group-hover:text-[#C58F58]"
                  >
                    <span>View City Network</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
