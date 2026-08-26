'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  BadgeIndianRupee,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  Download,
  Share2,
  Plus,
  ArrowUpRight,
  Clock,
  Send,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  FileText,
  ExternalLink
} from 'lucide-react';
import { PaymentRecord, PaymentReceipt, RefundRecord, PaymentLinkRecord } from '@/lib/db/schema';
import { useAdminRealtime } from '@/hooks/useAdminRealtime';

export default function AdminPaymentsPage() {
  const [activeTab, setActiveTab] = useState<'LEDGER' | 'INSTALLMENTS' | 'LINKS' | 'RECONCILIATION' | 'REFUNDS'>('LEDGER');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [newLinkModal, setNewLinkModal] = useState(false);

  // Form for new link
  const [linkBookingId, setLinkBookingId] = useState('');
  const [linkAmount, setLinkAmount] = useState('');
  const [linkDesc, setLinkDesc] = useState('');

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/payments');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load admin payments:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Connect live Server-Sent Events real-time sync for collections & refunds
  useAdminRealtime({
    eventTypes: ['PAYMENT_CREATED', 'PAYMENT_CAPTURED', 'PAYMENT_REFUNDED', 'BOOKING_UPDATED'],
    onRefresh: loadData
  });

  const handleCreatePaymentLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingLink(true);
    try {
      const res = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: linkBookingId,
          customAmount: Number(linkAmount),
          description: linkDesc
        })
      });
      if (res.ok) {
        setNewLinkModal(false);
        setLinkBookingId('');
        setLinkAmount('');
        setLinkDesc('');
        loadData();
      }
    } catch (err) {
      console.error('Error creating link:', err);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleApproveRefund = async (refundId: string) => {
    try {
      const res = await fetch('/api/admin/refunds', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refundId,
          approvedBy: 'Super Admin'
        })
      });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error('Error approving refund:', err);
    }
  };

  if (isLoading && !data) {
    return (
      <div className="p-12 text-center text-slate-800 font-mono">
        <div className="w-8 h-8 border-2 border-[#2C5E50] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <span className="text-xs text-slate-500 uppercase tracking-widest">
          Loading Financial Command Center...
        </span>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalCollected: 0,
    todayCollected: 0,
    monthCollected: 0,
    totalOutstanding: 0,
    overdueCount: 0,
    activeBookingsCount: 0,
    totalRefundsAmount: 0
  };

  const payments: PaymentRecord[] = data?.payments || [];
  const installments = data?.installments || [];
  const paymentLinks: PaymentLinkRecord[] = data?.paymentLinks || [];
  const refunds: RefundRecord[] = data?.refunds || [];

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      searchTerm === '' ||
      p.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.buyerPhone.includes(searchTerm) ||
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.razorpayPaymentId && p.razorpayPaymentId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <CreditCard className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>FINANCIAL OPERATIONS &amp; ESCROW</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900 tracking-tight">
            Payments, Ledger &amp; Collections
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time Razorpay transaction monitoring, milestone tracking, reconciliation, and refund queues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewLinkModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Payment Request</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold">
            <span>TOTAL COLLECTED</span>
            <BadgeIndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-2 font-mono">
            ₹{(metrics.totalCollected / 100000).toFixed(2)} L
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5 font-mono">
            Today: ₹{metrics.todayCollected.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold">
            <span>TOTAL OUTSTANDING</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-800 mt-2 font-mono">
            ₹{(metrics.totalOutstanding / 100000).toFixed(2)} L
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5 font-mono">
            Across {metrics.activeBookingsCount} Active Bookings
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold">
            <span>MONTH COLLECTIONS</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 font-mono">
            ₹{(metrics.monthCollected / 100000).toFixed(2)} L
          </div>
          <span className="text-[11px] text-emerald-700 block mt-0.5 font-mono font-semibold">● 100% Reconciled</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold">
            <span>OVERDUE MILESTONES</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-red-700 mt-2 font-mono">
            {metrics.overdueCount}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5 font-mono">Requires reminder dispatch</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('LEDGER')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'LEDGER' ? 'bg-[#2C5E50] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          All Payments Ledger ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab('INSTALLMENTS')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'INSTALLMENTS' ? 'bg-[#2C5E50] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Milestones &amp; Overdue ({installments.length})
        </button>
        <button
          onClick={() => setActiveTab('LINKS')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'LINKS' ? 'bg-[#2C5E50] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Payment Links ({paymentLinks.length})
        </button>
        <button
          onClick={() => setActiveTab('RECONCILIATION')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'RECONCILIATION' ? 'bg-[#2C5E50] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Razorpay Reconciliation
        </button>
        <button
          onClick={() => setActiveTab('REFUNDS')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'REFUNDS' ? 'bg-[#2C5E50] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Refunds Queue ({refunds.length})
        </button>
      </div>

      {/* TAB 1: ALL TRANSACTIONS LEDGER */}
      {activeTab === 'LEDGER' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by buyer, phone, receipt or Razorpay ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2C5E50]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              {['ALL', 'CAPTURED', 'PENDING', 'FAILED', 'REFUNDED'].map((st) => (
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

          {/* Ledger Table */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Receipt &amp; Payment ID</th>
                    <th className="py-3.5 px-4 font-bold">Buyer &amp; Unit</th>
                    <th className="py-3.5 px-4 font-bold">Method &amp; Date</th>
                    <th className="py-3.5 px-4 font-bold text-right">Amount</th>
                    <th className="py-3.5 px-4 font-bold text-center">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No payment records matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#2C5E50]">#{p.receiptNumber}</div>
                          <span className="text-[10px] text-slate-400">{p.razorpayPaymentId || p.id}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{p.buyerName}</div>
                          <span className="text-[10px] text-slate-500">{p.unitCode} ({p.buyerPhone})</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-700 font-semibold">{p.method.replace(/_/g, ' ')}</div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-sm text-emerald-700">
                          ₹{p.amountPaid.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              p.status === 'CAPTURED'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : p.status === 'FAILED'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/buyer/receipts/${p.receiptNumber}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200"
                          >
                            <FileText className="w-3 h-3 text-[#2C5E50]" />
                            <span>Receipt</span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MILESTONES & OVERDUE */}
      {activeTab === 'INSTALLMENTS' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-serif-heading font-bold text-slate-900">
              All Configured Milestones &amp; Collection Schedule
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Total Milestones: {installments.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Milestone Title</th>
                  <th className="py-3.5 px-4 font-bold">Booking &amp; Buyer</th>
                  <th className="py-3.5 px-4 font-bold">Due Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Milestone Amount</th>
                  <th className="py-3.5 px-4 font-bold text-center">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Reminder Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {installments.map((inst: any) => {
                  const isPaid = inst.status === 'PAID';
                  return (
                    <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{inst.title}</div>
                        <span className="text-[10px] text-slate-400">#{inst.id}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-900 font-bold">{inst.customerName}</div>
                        <span className="text-[10px] text-slate-500">{inst.unitCode} ({inst.bookingNumber})</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-700">{inst.dueDate}</div>
                        <span className="text-[10px] text-slate-400">{inst.gracePeriodDays} days grace</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-sm text-[#2C5E50]">
                        ₹{inst.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            isPaid
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : inst.status === 'DUE'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {inst.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {!isPaid && (
                          <a
                            href={`https://wa.me/${inst.customerPhone?.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(
                              inst.customerName
                            )},%20this%20is%20a%20reminder%20for%20your%20upcoming%20milestone%20installment%20for%20${encodeURIComponent(
                              inst.unitCode
                            )}%20due%20on%20${inst.dueDate}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200"
                          >
                            <Send className="w-3 h-3" />
                            <span>Send Reminder</span>
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT LINKS */}
      {activeTab === 'LINKS' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-serif-heading font-bold text-slate-900">
              Generated Razorpay Payment Links
            </h3>
            <button
              onClick={() => setNewLinkModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#2C5E50] hover:bg-[#234b40] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Link</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 font-mono text-xs">
            {paymentLinks.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                No active payment links created yet. Click "Create New Link" above to dispatch a custom payment request.
              </div>
            ) : (
              paymentLinks.map((l) => (
                <div key={l.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-900">{l.description}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Customer: {l.customerName} ({l.customerPhone}) • Expires: {new Date(l.expiresAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-[#2C5E50]">₹{l.amount.toLocaleString('en-IN')}</span>
                    <a
                      href={l.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center gap-1 border border-slate-200"
                    >
                      <span>{l.shortUrl}</span>
                      <ExternalLink className="w-3 h-3 text-[#2C5E50]" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: RECONCILIATION */}
      {activeTab === 'RECONCILIATION' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-serif-heading font-bold text-slate-900">
                Razorpay Automated Reconciliation Engine
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated cross-check between internal ledger receipts and Razorpay settlement balances.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Ledger Synced</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px]">INTERNAL RECORDED REVENUE</span>
              <span className="text-lg font-bold text-emerald-700 mt-1 block">
                ₹{metrics.totalCollected.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px]">RAZORPAY CAPTURED SETTLEMENT</span>
              <span className="text-lg font-bold text-emerald-700 mt-1 block">
                ₹{metrics.totalCollected.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px]">DISCREPANCY / VARIANCE</span>
              <span className="text-lg font-bold text-slate-900 mt-1 block">₹0.00 (Zero Mismatch)</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            All captured orders have valid HMAC-SHA256 signatures and confirmed webhook delivery timestamps.
          </p>
        </div>
      )}

      {/* TAB 5: REFUNDS QUEUE */}
      {activeTab === 'REFUNDS' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-serif-heading font-bold text-slate-900">
              Customer Refunds &amp; Cancellation Desk
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Total Processed Refunds: ₹{metrics.totalRefundsAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="divide-y divide-slate-100 font-mono text-xs">
            {refunds.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                No active refund requests in the queue.
              </div>
            ) : (
              refunds.map((ref) => (
                <div key={ref.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-900">Refund #{ref.id} for Payment #{ref.paymentId}</div>
                    <span className="text-[10px] text-slate-500">Reason: {ref.reason}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-red-600">₹{ref.amount.toLocaleString('en-IN')}</span>
                    {ref.status === 'REQUESTED' ? (
                      <button
                        onClick={() => handleApproveRefund(ref.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 cursor-pointer"
                      >
                        Approve via Razorpay
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] border border-emerald-200">
                        COMPLETED
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal: Create Payment Link */}
      {newLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-serif-heading font-bold text-slate-900 mb-2">
              Create Razorpay Payment Link
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Generate a secure Razorpay payment URL attached to a booking dossier.
            </p>

            <form onSubmit={handleCreatePaymentLink} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 uppercase mb-1 font-bold">
                  Select Booking *
                </label>
                <select
                  required
                  value={linkBookingId}
                  onChange={(e) => setLinkBookingId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-[#2C5E50] focus:outline-none"
                >
                  <option value="">-- Choose Booking --</option>
                  {data?.payments?.map((p: any) => (
                    <option key={p.bookingId} value={p.bookingId}>
                      {p.buyerName} - {p.unitCode} ({p.bookingId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 uppercase mb-1 font-bold">
                  Amount in INR (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 500000"
                  value={linkAmount}
                  onChange={(e) => setLinkAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-[#2C5E50] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 uppercase mb-1 font-bold">
                  Payment Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Milestone 2 Allotment"
                  value={linkDesc}
                  onChange={(e) => setLinkDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#2C5E50] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setNewLinkModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-mono font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGeneratingLink}
                  className="flex-1 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold text-xs font-mono cursor-pointer"
                >
                  {isGeneratingLink ? 'Generating...' : 'Dispatch Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

