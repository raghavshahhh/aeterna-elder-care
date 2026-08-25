'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Clock,
  MapPin,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Car,
  Search,
  Filter
} from 'lucide-react';
import { SiteVisit, SiteVisitStatus } from '@/lib/db/schema';

export default function AdminSiteVisitsPage() {
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    loadVisits();
  }, []);

  async function loadVisits() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/site-visits');
      if (res.ok) {
        const data = await res.json();
        setVisits(data.siteVisits || []);
      }
    } catch (err) {
      console.error('Error loading site visits:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(visitId: string, status: SiteVisitStatus) {
    try {
      const res = await fetch('/api/site-visits', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: visitId, status })
      });
      if (res.ok) {
        const data = await res.json();
        setVisits((prev) => prev.map((v) => (v.id === visitId ? data.visit : v)));
      }
    } catch (err) {
      console.error('Error updating visit:', err);
    }
  }

  const filteredVisits = visits.filter((v) => {
    if (statusFilter !== 'ALL' && v.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Site Visits &amp; Inspections
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Coordinate family visits, chauffeured pickups, and on-ground walkthroughs.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-[#091B20] border border-white/10">
        {['ALL', 'REQUESTED', 'CONFIRMED', 'VISITED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              statusFilter === st
                ? 'bg-[#2C5E50] text-white shadow-md'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Visits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVisits.map((visit) => (
          <div
            key={visit.id}
            className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{visit.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    visit.status === 'CONFIRMED'
                      ? 'bg-blue-500/20 text-blue-300'
                      : visit.status === 'VISITED'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : visit.status === 'REQUESTED'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {visit.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-white/70 font-mono">
                <div className="flex items-center gap-2 text-white">
                  <PhoneCall className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>{visit.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>{visit.preferredDate} ({visit.preferredTime})</span>
                </div>
                <div>Visitors: {visit.numberOfVisitors} Person(s)</div>
                {visit.pickupRequired && (
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-1.5 text-[11px]">
                    <Car className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Pickup: {visit.pickupAddress || 'Address to be confirmed'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus(visit.id, 'CONFIRMED')}
                className="flex-1 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-bold transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(visit.id, 'VISITED')}
                className="flex-1 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors"
              >
                Mark Visited
              </button>
              <button
                onClick={() => updateStatus(visit.id, 'CANCELLED')}
                className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
