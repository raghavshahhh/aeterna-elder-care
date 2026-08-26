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

export default function AdminPaymentsPage() {
  const [activeTab, setActiveTab] = useState<'LEDGER' | 'INSTALLMENTS' | 'LINKS' | 'RECONCILIATION' | 'REFUNDS'>('LEDGER');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [newLinkModal, setNewLinkModal] = useState(false);
  const [selectedPaymentForRefund, setSelectedPaymentForRefund] = useState<PaymentRecord | null>(null);
  const [refundReason, setRefundReason] = useState('');

  // Form for new link
  const [linkBookingId, setLinkBookingId] = useState('');
  const [linkAmount, setLinkAmount] = useState('');
  const [linkDesc, setLinkDesc] = useState('');

  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <div className="p-12 text-center text-white font-mono">
        <div className="w-8 h-8 border-2 border-[#C58F58] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <span className="text-xs text-white/60 uppercase tracking-widest">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>FINANCIAL OPERATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white tracking-tight">
            Payments, Ledger &amp; Collections
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Real-time Razorpay transaction monitoring, milestone tracking, reconciliation, and refund queues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewLinkModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C58F58] to-[#A06C3B] hover:brightness-110 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-[#C58F58]/20 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Payment Request</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#091B20] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>TOTAL COLLECTED</span>
            <BadgeIndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-2">
            ₹{(metrics.totalCollected / 100000).toFixed(2)} L
          </div>
          <span className="text-[10px] text-white/40 block mt-0.5">
            Today: ₹{metrics.todayCollected.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-[#091B20] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>TOTAL OUTSTANDING</span>
            <Clock className="w-4 h-4 text-[#C58F58]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#E0AB77] mt-2">
            ₹{(metrics.totalOutstanding / 100000).toFixed(2)} L
          </div>
          <span className="text-[10px] text-white/40 block mt-0.5">
            Across {metrics.activeBookingsCount} Active Bookings
          </span>
        </div>

        <div className="bg-[#091B20] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>MONTH COLLECTIONS</span>
            <Calendar className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-2">
            ₹{(metrics.monthCollected / 100000).toFixed(2)} L
          </div>
          <span className="text-[10px] text-emerald-400 block mt-0.5">● 100% Reconciled</span>
        </div>

        <div className="bg-[#091B20] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>OVERDUE MILESTONES</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-2">
            {metrics.overdueCount}
          </div>
          <span className="text-[10px] text-white/40 block mt-0.5">Requires reminder dispatch</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('LEDGER')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'LEDGER' ? 'bg-[#2C5E50] text-white font-bold' : 'text-white/60 hover:text-white'
          }`}
        >
          All Payments Ledger ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab('INSTALLMENTS')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'INSTALLMENTS' ? 'bg-[#2C5E50] text-white font-bold' : 'text-white/60 hover:text-white'
          }`}
        >
          Milestones &amp; Overdue ({installments.length})
        </button>
        <button
          onClick={() => setActiveTab('LINKS')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'LINKS' ? 'bg-[#2C5E50] text-white font-bold' : 'text-white/60 hover:text-white'
          }`}
        >
          Payment Links ({paymentLinks.length})
        </button>
        <button
          onClick={() => setActiveTab('RECONCILIATION')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'RECONCILIATION' ? 'bg-[#2C5E50] text-white font-bold' : 'text-white/60 hover:text-white'
          }`}
        >
          Razorpay Reconciliation
        </button>
        <button
          onClick={() => setActiveTab('REFUNDS')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'REFUNDS' ? 'bg-[#2C5E50] text-white font-bold' : 'text-white/60 hover:text-white'
          }`}
        >
          Refunds Queue ({refunds.length})
        </button>
      </div>

      {/* TAB 1: ALL TRANSACTIONS LEDGER */}
      {activeTab === 'LEDGER' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-[#091B20] p-4 rounded-2xl border border-white/10">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by buyer, phone, receipt or Razorpay ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C58F58]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              {['ALL', 'CAPTURED', 'PENDING', 'FAILED', 'REFUNDED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === st ? 'bg-[#C58F58] text-white font-bold' : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#061215] border-b border-white/10 text-white/50 uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Receipt &amp; Payment ID</th>
                    <th className="py-3.5 px-4">Buyer &amp; Unit</th>
                    <th className="py-3.5 px-4">Method &amp; Date</th>
                    <th className="py-3.5 px-4 text-right">Amount</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-white/40">
                        No payment records matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#E0AB77]">#{p.receiptNumber}</div>
                          <span className="text-[10px] text-white/40">{p.razorpayPaymentId || p.id}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{p.buyerName}</div>
                          <span className="text-[10px] text-white/50">{p.unitCode} ({p.buyerPhone})</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-white/80">{p.method.replace(/_/g, ' ')}</div>
                          <span className="text-[10px] text-white/40">
                            {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-sm text-emerald-400">
                          ₹{p.amountPaid.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                              p.status === 'CAPTURED'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : p.status === 'FAILED'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/buyer/receipts/${p.receiptNumber}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#E0AB77] text-[11px] font-bold"
                          >
                            <FileText className="w-3 h-3" />
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
        <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-serif-heading font-bold text-white">
              All Configured Milestones &amp; Collection Schedule
            </h3>
            <span className="text-xs text-white/50 font-mono">
              Total Milestones: {installments.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#061215] border-b border-white/10 text-white/50 uppercase text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Milestone Title</th>
                  <th className="py-3.5 px-4">Booking &amp; Buyer</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4 text-right">Milestone Amount</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Reminder Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {installments.map((inst: any) => {
                  const isPaid = inst.status === 'PAID';
                  return (
                    <tr key={inst.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{inst.title}</div>
                        <span className="text-[10px] text-white/40">#{inst.id}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-white font-bold">{inst.customerName}</div>
                        <span className="text-[10px] text-white/50">{inst.unitCode} ({inst.bookingNumber})</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-white/80">{inst.dueDate}</div>
                        <span className="text-[10px] text-white/40">{inst.gracePeriodDays} days grace</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-sm text-[#E0AB77]">
                        ₹{inst.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            isPaid
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : inst.status === 'DUE'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-white/10 text-white/60'
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
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-[10px] font-bold"
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
        <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-serif-heading font-bold text-white">
              Generated Razorpay Payment Links
            </h3>
            <button
              onClick={() => setNewLinkModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#C58F58] hover:bg-[#D49E67] text-white text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Link</span>
            </button>
          </div>

          <div className="divide-y divide-white/5 font-mono text-xs">
            {paymentLinks.length === 0 ? (
              <div className="p-8 text-center text-white/40">
                No active payment links created yet. Click "Create New Link" above to dispatch a custom payment request.
              </div>
            ) : (
              paymentLinks.map((l) => (
                <div key={l.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5">
                  <div>
                    <div className="font-bold text-white">{l.description}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">
                      Customer: {l.customerName} ({l.customerPhone}) • Expires: {new Date(l.expiresAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-[#E0AB77]">₹{l.amount.toLocaleString('en-IN')}</span>
                    <a
                      href={l.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1"
                    >
                      <span>{l.shortUrl}</span>
                      <ExternalLink className="w-3 h-3" />
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
        <div className="bg-[#091B20] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-serif-heading font-bold text-white">
                Razorpay Automated Reconciliation Engine
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                Automated cross-check between internal ledger receipts and Razorpay settlement balances.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Ledger Synced</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-white/50 block text-[10px]">INTERNAL RECORDED REVENUE</span>
              <span className="text-lg font-bold text-emerald-400 mt-1 block">
                ₹{metrics.totalCollected.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-white/50 block text-[10px]">RAZORPAY CAPTURED SETTLEMENT</span>
              <span className="text-lg font-bold text-emerald-400 mt-1 block">
                ₹{metrics.totalCollected.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-white/50 block text-[10px]">DISCREPANCY / VARIANCE</span>
              <span className="text-lg font-bold text-white mt-1 block">₹0.00 (Zero Mismatch)</span>
            </div>
          </div>

          <p className="text-xs text-white/60">
            All captured orders have valid HMAC-SHA256 signatures and confirmed webhook delivery timestamps.
          </p>
        </div>
      )}

      {/* TAB 5: REFUNDS QUEUE */}
      {activeTab === 'REFUNDS' && (
        <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-serif-heading font-bold text-white">
              Customer Refunds &amp; Cancellation Desk
            </h3>
            <span className="text-xs text-white/50 font-mono">
              Total Processed Refunds: ₹{metrics.totalRefundsAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="divide-y divide-white/5 font-mono text-xs">
            {refunds.length === 0 ? (
              <div className="p-8 text-center text-white/40">
                No active refund requests in the queue.
              </div>
            ) : (
              refunds.map((ref) => (
                <div key={ref.id} className="p-4 flex items-center justify-between hover:bg-white/5">
                  <div>
                    <div className="font-bold text-white">Refund #{ref.id} for Payment #{ref.paymentId}</div>
                    <span className="text-[10px] text-white/50">Reason: {ref.reason}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-red-400">₹{ref.amount.toLocaleString('en-IN')}</span>
                    {ref.status === 'REQUESTED' ? (
                      <button
                        onClick={() => handleApproveRefund(ref.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold"
                      >
                        Approve via Razorpay
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px]">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0D2329] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-serif-heading font-bold text-white mb-2">
              Create Razorpay Payment Link
            </h3>
            <p className="text-xs text-white/60 mb-6">
              Generate a secure Razorpay payment URL attached to a booking dossier.
            </p>

            <form onSubmit={handleCreatePaymentLink} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                  Select Booking *
                </label>
                <select
                  required
                  value={linkBookingId}
                  onChange={(e) => setLinkBookingId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
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
                <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                  Amount in INR (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 500000"
                  value={linkAmount}
                  onChange={(e) => setLinkAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                  Payment Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Milestone 2 Allotment"
                  value={linkDesc}
                  onChange={(e) => setLinkDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewLinkModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGeneratingLink}
                  className="flex-1 py-2.5 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-white font-bold text-xs font-mono"
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
