'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  Calendar,
  Clock,
  Download,
  FileText,
  ShieldCheck,
  CreditCard,
  PhoneCall,
  User,
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Booking, Project, PaymentPlan, PaymentRecord, PaymentReceipt, BuyerDocument, InventoryUnit } from '@/lib/db/schema';

interface AggregatedBooking {
  booking: Booking;
  project: Project;
  unit: InventoryUnit;
  paymentPlan: PaymentPlan;
  payments: PaymentRecord[];
  receipts: PaymentReceipt[];
  documents: BuyerDocument[];
  nextInstallment?: any;
  progressPercentage: number;
}

function BuyerPortalInner() {
  const searchParams = useSearchParams();
  const phoneParam = searchParams.get('phone') || searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(phoneParam || '+91 98112 34567');
  const [buyerData, setBuyerData] = useState<{
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    bookings: AggregatedBooking[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookingIndex, setSelectedBookingIndex] = useState(0);

  const fetchBuyerData = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/buyer/dashboard?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (res.ok && json.data) {
        setBuyerData(json.data);
      } else {
        setError(json.error || 'No matching booking or resident profile found.');
        setBuyerData(null);
      }
    } catch (err) {
      console.error('Error fetching buyer data:', err);
      setError('Failed to connect to Buyer Portal server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerData(searchQuery);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchBuyerData(searchQuery.trim());
    }
  };

  const activeItem = buyerData?.bookings[selectedBookingIndex];

  const formatINR = (val: number | undefined | null) => (Number(val) || 0).toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-[#071519] text-[#FAF8F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Identification Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#091B20] border border-white/10 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#14323A] border border-[#C58F58]/40 p-2 flex items-center justify-center shrink-0 shadow-md">
              <img
                src="/project-assets/brand/logo-icon-clean.png"
                alt="Senior Living Citizen Foundation Logo"
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#C58F58] font-bold block">
                SENIOR LIVING ALLOTTEE PORTAL
              </span>
              <h1 className="text-xl sm:text-2xl font-serif-heading font-bold text-white tracking-tight">
                {buyerData ? `Welcome, ${buyerData.buyerName}` : 'Resident & Buyer Dashboard'}
              </h1>
            </div>
          </div>

          {/* Quick Lookup Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Mobile / Booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#C58F58] w-56 sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-white font-bold text-xs font-mono transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {/* Loading / Error States */}
        {isLoading ? (
          <div className="p-12 text-center text-white">
            <div className="w-10 h-10 border-3 border-[#C58F58] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Retrieving Allotment Ledger &amp; Statutory Records...
            </span>
          </div>
        ) : error || !activeItem ? (
          <div className="bg-[#091B20] border border-white/10 p-8 rounded-3xl text-center max-w-lg mx-auto">
            <ShieldCheck className="w-12 h-12 text-[#C58F58] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">No Records Found</h3>
            <p className="text-xs text-white/60 mb-6">
              We couldn't locate any active booking records for <span className="font-mono text-white font-bold">{searchQuery}</span>. Try searching with your 10-digit registered mobile number or booking ID.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => fetchBuyerData('+91 98112 34567')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-mono"
              >
                Load Demo (Col. Rajesh Bakshi)
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Multiple Bookings Switcher Tabs if customer has > 1 property */}
            {buyerData.bookings.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {buyerData.bookings.map((b, idx) => (
                  <button
                    key={b.booking.id}
                    onClick={() => setSelectedBookingIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedBookingIndex === idx
                        ? 'bg-[#2C5E50] text-white shadow-md'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {b.booking.unitCode} ({b.booking.bookingNumber})
                  </button>
                ))}
              </div>
            )}

            {/* Answer 1, 2, 3, 4: Executive Hero Card */}
            <div className="bg-gradient-to-br from-[#0D2329] via-[#091B20] to-[#061215] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Allotment Status: {activeItem.booking.status || 'CONFIRMED'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white tracking-tight">
                    {activeItem.booking.unitCode} — {activeItem.booking.projectTitle}
                  </h2>
                  <p className="text-xs font-mono text-white/60 mt-1">
                    Booking Reference: <span className="text-[#E0AB77] font-bold">{activeItem.booking.bookingNumber}</span> | Allotted on {activeItem.booking.createdAt ? new Date(activeItem.booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recent'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/pay/${activeItem.booking.id}`}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C58F58] to-[#A06C3B] hover:brightness-110 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-[#C58F58]/20 transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Next Installment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Progress Bar & Key Financial Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono mb-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-white/50 block text-[10px]">TOTAL AGREED VALUE</span>
                  <span className="text-lg font-bold text-white mt-1 block">
                    ₹{formatINR(activeItem.booking.totalAgreedPrice)}
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-white/50 block text-[10px]">TOTAL PAID TO DATE</span>
                  <span className="text-lg font-bold text-emerald-400 mt-1 block">
                    ₹{formatINR(activeItem.booking.totalPaidAmount)}
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-white/50 block text-[10px]">REMAINING OUTSTANDING</span>
                  <span className="text-lg font-bold text-[#E0AB77] mt-1 block">
                    ₹{formatINR(activeItem.booking.remainingBalance)}
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-white/50 block text-[10px]">NEXT DUE DATE</span>
                  <span className="text-lg font-bold text-white mt-1 block">
                    {activeItem.nextInstallment ? activeItem.nextInstallment.dueDate : 'All Milestones Met'}
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/70">
                  <span>Payment Progress ({activeItem.progressPercentage || 0}% Completed)</span>
                  <span className="text-emerald-400 font-bold">
                    ₹{formatINR(activeItem.booking.totalPaidAmount)} / ₹{formatINR(activeItem.booking.totalAgreedPrice)}
                  </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-[#C58F58] to-[#E0AB77] rounded-full transition-all duration-500"
                    style={{ width: `${activeItem.progressPercentage || 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Two-Column Grid: Payment Schedule & Documents/Support */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Milestone Schedule & Payment History */}
              <div className="lg:col-span-2 space-y-8">
                {/* Milestone Schedule */}
                <div className="bg-[#091B20] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                  <h3 className="text-lg font-serif-heading font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#C58F58]" />
                    <span>Payment Plan &amp; Milestone Schedule</span>
                  </h3>

                  <div className="space-y-3">
                    {activeItem.paymentPlan.installments.map((inst: any) => {
                      const isPaid = inst.status === 'PAID';
                      return (
                        <div
                          key={inst.id}
                          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                            isPaid
                              ? 'bg-emerald-500/5 border-emerald-500/20'
                              : inst.status === 'DUE'
                              ? 'bg-[#0D2329] border-[#C58F58]'
                              : 'bg-white/5 border-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                                isPaid
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-white/10 text-white/80'
                              }`}
                            >
                              {inst.installmentNumber}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{inst.title}</div>
                              <div className="text-[10px] font-mono text-white/50">
                                Due: {inst.dueDate} {inst.paidAt ? `• Paid on ${new Date(inst.paidAt).toLocaleDateString('en-IN')}` : ''}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-mono font-bold text-[#E0AB77]">
                              ₹{(inst.amount / 100000).toFixed(2)} Lakh
                            </div>
                            <span
                              className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-md font-bold ${
                                isPaid
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {inst.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Receipts History */}
                <div className="bg-[#091B20] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                  <h3 className="text-lg font-serif-heading font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#C58F58]" />
                    <span>Official Receipts &amp; Payment History</span>
                  </h3>

                  {activeItem.receipts.length === 0 ? (
                    <p className="text-xs text-white/50 font-mono">No receipts issued yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {activeItem.receipts.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{rec.installmentTitle || 'Milestone Payment'}</div>
                            <div className="text-[10px] font-mono text-white/50 mt-0.5">
                              Receipt #{rec.receiptNumber} • {rec.paymentDate} • Ref: {rec.transactionReference}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm font-mono font-bold text-emerald-400">
                              ₹{formatINR(rec.amountPaid)}
                            </span>
                            <Link
                              href={`/buyer/receipts/${rec.receiptNumber}`}
                              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-[#E0AB77] font-mono flex items-center gap-1.5 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>View Receipt</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Statutory Documents & Dedicated Advisor */}
              <div className="space-y-6">
                {/* Documents Vault */}
                <div className="bg-[#091B20] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="text-sm font-serif-heading font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Allotment Documents</span>
                  </h3>

                  <div className="space-y-2.5">
                    {activeItem.documents.map((doc) => (
                      <Link
                        key={doc.id}
                        href={doc.downloadUrl}
                        target="_blank"
                        className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-xs transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-4 h-4 text-[#C58F58] shrink-0" />
                          <span className="text-white truncate font-medium">{doc.title}</span>
                        </div>
                        <Download className="w-3.5 h-3.5 text-white/40 group-hover:text-white shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/documents"
                    target="_blank"
                    className="block text-center text-xs font-mono text-[#E0AB77] font-bold hover:underline pt-2"
                  >
                    View Foundation Statutory Vault →
                  </Link>
                </div>

                {/* Dedicated Relationship Manager */}
                <div className="bg-[#0D2329] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C58F58] font-bold block">
                    DEDICATED ADVISOR
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#2C5E50]/40 border border-[#2C5E50] flex items-center justify-center text-[#E0AB77] font-bold">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{activeItem.booking.assignedAdvisorName || 'Capt. R. S. Bhatia'}</h4>
                      <p className="text-xs text-white/60">Senior Living Relationship Officer</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <a
                      href={`tel:${activeItem.booking.assignedAdvisorPhone || '+919999955847'}`}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white font-mono transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#C58F58]" />
                      <span>{activeItem.booking.assignedAdvisorPhone || '+91 99999 55847'}</span>
                    </a>
                    <a
                      href="https://wa.me/919999955847"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-[#25D366] text-xs font-bold font-mono transition-colors"
                    >
                      <span>Direct WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function BuyerPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Connecting to Resident Portal...
            </span>
          </div>
        </div>
      }
    >
      <BuyerPortalInner />
    </React.Suspense>
  );
}
