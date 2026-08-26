'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText,
  CreditCard,
  Building2,
  Calendar,
  X
} from 'lucide-react';
import { Booking } from '@/lib/db/schema';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const json = await res.json();
        setBookings(json.bookings || []);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleExtendHold = async (bookingId: string) => {
    try {
      const newExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holdExpiresAt: newExpiry,
          status: 'HOLD'
        })
      });
      loadBookings();
    } catch (err) {
      console.error('Error extending hold:', err);
    }
  };

  const formatINR = (val: number | undefined | null) => (Number(val) || 0).toLocaleString('en-IN');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      searchTerm === '' ||
      (b.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.customerPhone || '').includes(searchTerm) ||
      (b.bookingNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.unitCode || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>ALLOTMENT OPERATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900 tracking-tight">
            Bookings &amp; Unit Holds
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage unit reservation holds, active allotments, payment plan progress, and customer dossiers.
          </p>
        </div>

        <Link
          href="/admin/payments"
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono flex items-center gap-2 transition-colors self-start sm:self-auto border border-slate-200"
        >
          <CreditCard className="w-4 h-4 text-[#2C5E50]" />
          <span>View Collections Ledger</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by buyer, phone, unit or booking ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2C5E50]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          {['ALL', 'HOLD', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'EXPIRED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === st ? 'bg-[#2C5E50] text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Booking Ref &amp; Unit</th>
                <th className="py-3.5 px-4 font-bold">Primary Buyer</th>
                <th className="py-3.5 px-4 font-bold">Total / Paid</th>
                <th className="py-3.5 px-4 font-bold">Outstanding</th>
                <th className="py-3.5 px-4 font-bold text-center">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading booking records...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No bookings found matching selected criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const agreed = Number(b.totalAgreedPrice) || 0;
                  const paid = Number(b.totalPaidAmount) || 0;
                  const remaining = Number(b.remainingBalance) || Math.max(0, agreed - paid);

                  return (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#2C5E50]">{b.bookingNumber}</div>
                        <span className="text-[10px] text-slate-500">
                          {b.unitCode} ({(b.unitType || 'RESIDENCE').replace(/_/g, ' ')})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{b.customerName}</div>
                        <span className="text-[10px] text-slate-500">{b.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-800 font-bold">₹{(agreed / 100000).toFixed(2)} L</div>
                        <span className="text-[10px] text-emerald-700 font-bold">
                          Paid: ₹{(paid / 100000).toFixed(2)} L
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-amber-800">
                        ₹{(remaining / 100000).toFixed(2)} L
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            b.status === 'CONFIRMED' || b.status === 'COMPLETED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : b.status === 'HOLD'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {b.status === 'HOLD' && (
                          <button
                            onClick={() => handleExtendHold(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold cursor-pointer"
                            title="Extend Priority Hold by 24h"
                          >
                            +24h Hold
                          </button>
                        )}
                        <Link
                          href={`/pay/${b.id}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold inline-flex items-center gap-1 border border-slate-200"
                        >
                          <CreditCard className="w-3 h-3 text-[#2C5E50]" />
                          <span>Checkout</span>
                        </Link>
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="px-2.5 py-1 rounded-lg bg-[#2C5E50] hover:bg-[#234b40] text-white text-[10px] font-bold cursor-pointer"
                        >
                          One-View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer "One-View" Drawer Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border-l border-slate-200 w-full max-w-xl h-full p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#2C5E50] font-bold block">
                  CUSTOMER ONE-VIEW DOSSIER
                </span>
                <h3 className="text-lg font-serif-heading font-bold text-slate-900">
                  {selectedBooking.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Mobile:</span>
                <span className="text-slate-900 font-bold">{selectedBooking.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-800">{selectedBooking.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unit Allotment:</span>
                <span className="text-[#2C5E50] font-bold">{selectedBooking.unitCode} ({selectedBooking.projectTitle || 'Sanctuary'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Referral Partner:</span>
                <span className="text-slate-800">{selectedBooking.referrerCode || 'Direct Organic'}</span>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase text-[#2C5E50] font-bold block">FINANCIAL LEDGER</span>
              <div className="flex justify-between text-slate-700">
                <span>Agreed Total Value:</span>
                <span>₹{formatINR(selectedBooking.totalAgreedPrice)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Total Paid to Date:</span>
                <span>₹{formatINR(selectedBooking.totalPaidAmount)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-amber-800 font-bold">
                <span>Remaining Balance:</span>
                <span>₹{formatINR(selectedBooking.remainingBalance)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <Link
                href={`/buyer?phone=${encodeURIComponent(selectedBooking.customerPhone)}`}
                target="_blank"
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono flex items-center justify-center gap-2 border border-slate-200"
              >
                <FileText className="w-4 h-4 text-[#2C5E50]" />
                <span>Open in Buyer Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/pay/${selectedBooking.id}`}
                target="_blank"
                className="w-full py-3 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold text-xs font-mono flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Open Direct Payment Gateway</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

