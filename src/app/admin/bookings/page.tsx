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
import { useAdminRealtime } from '@/hooks/useAdminRealtime';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availableUnits, setAvailableUnits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // New Booking Modal State
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    unitId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    totalAgreedPrice: 2700000,
    bookingAmount: 25000,
    paymentPlanType: 'DOWN_PAYMENT_PLAN',
    referrerCode: '',
    holdHours: 24,
    notes: ''
  });
  const [createError, setCreateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBookings = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const [bookRes, invRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/inventory')
      ]);

      if (bookRes.ok) {
        const json = await bookRes.json();
        setBookings(json.bookings || []);
      }
      if (invRes.ok) {
        const iJson = await invRes.json();
        const av = (iJson.inventory || []).filter((u: any) => u.status === 'AVAILABLE');
        setAvailableUnits(av);
        if (av.length > 0 && !bookingForm.unitId) {
          setBookingForm((prev) => ({ ...prev, unitId: av[0].id, totalAgreedPrice: av[0].price || 2700000 }));
        }
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setIsLoading(false);
    }
  }, [bookingForm.unitId]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Connect live Server-Sent Events real-time sync for allotments & holds
  useAdminRealtime({
    eventTypes: ['BOOKING_CREATED', 'BOOKING_UPDATED', 'BOOKING_EXPIRED', 'PAYMENT_CAPTURED', 'INVENTORY_UPDATED'],
    onRefresh: loadBookings
  });

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCreateError(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsCreatingBooking(false);
        setBookingForm({
          unitId: '',
          customerName: '',
          customerPhone: '',
          customerEmail: '',
          totalAgreedPrice: 2700000,
          bookingAmount: 25000,
          paymentPlanType: 'DOWN_PAYMENT_PLAN',
          referrerCode: '',
          holdHours: 24,
          notes: ''
        });
        await loadBookings();
      } else {
        setCreateError(data.error || 'Failed to create booking.');
      }
    } catch (err: any) {
      console.error('Error creating booking:', err);
      setCreateError(err.message || 'Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        await loadBookings();
        if (selectedBooking?.id === bookingId) {
          const updated = await res.json();
          setSelectedBooking(updated.booking);
        }
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

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

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreatingBooking(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C58F58]" />
            <span>+ Create Allotment / Hold</span>
          </button>
          <Link
            href="/admin/payments"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono flex items-center gap-2 transition-colors border border-slate-200"
          >
            <CreditCard className="w-4 h-4 text-[#2C5E50]" />
            <span>Collections Ledger</span>
          </Link>
        </div>
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

            {/* Status Transition Actions */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase text-[#2C5E50] font-bold block">UPDATE ALLOTMENT STATUS</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUpdateBookingStatus(selectedBooking.id, 'CONFIRMED')}
                  className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-colors cursor-pointer"
                >
                  ✓ Mark Confirmed
                </button>
                <button
                  onClick={() => handleUpdateBookingStatus(selectedBooking.id, 'COMPLETED')}
                  className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold transition-colors cursor-pointer"
                >
                  ★ Complete Registry
                </button>
                <button
                  onClick={() => handleExtendHold(selectedBooking.id)}
                  className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold transition-colors cursor-pointer"
                >
                  +24h Extend Hold
                </button>
                <button
                  onClick={() => handleUpdateBookingStatus(selectedBooking.id, 'CANCELLED')}
                  className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold transition-colors cursor-pointer"
                >
                  ✕ Cancel &amp; Release
                </button>
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

      {/* Modal: Create Booking / Hold */}
      {isCreatingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-serif-heading font-bold text-slate-900">
                  Create Unit Allotment / Hold
                </h3>
                <p className="text-xs text-slate-500">
                  Direct unit reservation with 24h payment gateway token link.
                </p>
              </div>
              <button
                onClick={() => setIsCreatingBooking(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {createError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateBooking} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                  Select Unit / Plot *
                </label>
                {availableUnits.length === 0 ? (
                  <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-mono">
                    No units currently marked as AVAILABLE. Release a hold or add new inventory.
                  </p>
                ) : (
                  <select
                    required
                    value={bookingForm.unitId}
                    onChange={(e) => {
                      const u = availableUnits.find((unit) => unit.id === e.target.value);
                      setBookingForm({
                        ...bookingForm,
                        unitId: e.target.value,
                        totalAgreedPrice: u?.price || bookingForm.totalAgreedPrice
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  >
                    {availableUnits.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.unitCode} — {u.type.replace(/_/g, ' ')} ({u.priceDisplay || `₹${u.price}`})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Primary Buyer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={bookingForm.customerName}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Buyer Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98111 44556"
                    value={bookingForm.customerPhone}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. buyer@example.com"
                    value={bookingForm.customerEmail}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerEmail: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Agreed Sale Value (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={bookingForm.totalAgreedPrice}
                    onChange={(e) => setBookingForm({ ...bookingForm, totalAgreedPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Booking Hold Token (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={bookingForm.bookingAmount}
                    onChange={(e) => setBookingForm({ ...bookingForm, bookingAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Hold Duration (Hours)
                  </label>
                  <select
                    value={bookingForm.holdHours}
                    onChange={(e) => setBookingForm({ ...bookingForm, holdHours: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  >
                    <option value={24}>24 Hours (Standard)</option>
                    <option value={48}>48 Hours (Weekend Hold)</option>
                    <option value={72}>72 Hours (Executive Priority)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Payment Plan
                  </label>
                  <select
                    value={bookingForm.paymentPlanType}
                    onChange={(e) => setBookingForm({ ...bookingForm, paymentPlanType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2C5E50]"
                  >
                    <option value="DOWN_PAYMENT_PLAN">Down Payment Plan (Full)</option>
                    <option value="CONSTRUCTION_LINKED_PLAN">Construction Linked Plan (CLP)</option>
                    <option value="RENTAL_RETURN_PLAN">Sanctuary Rental Return Plan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-700 font-bold mb-1">
                    Partner Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SLF8K2"
                    value={bookingForm.referrerCode}
                    onChange={(e) => setBookingForm({ ...bookingForm, referrerCode: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsCreatingBooking(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || availableUnits.length === 0}
                  className="flex-1 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold font-mono cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Allotment...</span>
                    </>
                  ) : (
                    <span>Create &amp; Lock Unit</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

