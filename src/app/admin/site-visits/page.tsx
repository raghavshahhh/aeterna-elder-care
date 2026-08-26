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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>FIELD LOGISTICS &amp; CHAUFFEUR DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Site Visits &amp; Inspections
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Coordinate family visits, chauffeured pickups, and on-ground walkthroughs.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
        {['ALL', 'REQUESTED', 'CONFIRMED', 'VISITED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              statusFilter === st
                ? 'bg-[#2C5E50] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
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
            className="p-5 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{visit.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    visit.status === 'CONFIRMED'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : visit.status === 'VISITED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : visit.status === 'REQUESTED'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {visit.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 font-mono">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <PhoneCall className="w-3.5 h-3.5 text-[#2C5E50]" />
                  <span>{visit.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{visit.preferredDate} ({visit.preferredTime})</span>
                </div>
                <div>Visitors: {visit.numberOfVisitors} Person(s)</div>
                {visit.pickupRequired && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-1.5 text-[11px] font-sans font-medium">
                    <Car className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-700" />
                    <span>Pickup: {visit.pickupAddress || 'Dwarka Sec-21 Metro Station'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus(visit.id, 'CONFIRMED')}
                className="flex-1 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(visit.id, 'VISITED')}
                className="flex-1 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Mark Visited
              </button>
              <button
                onClick={() => updateStatus(visit.id, 'CANCELLED')}
                className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors cursor-pointer"
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

