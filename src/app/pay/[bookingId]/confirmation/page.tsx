'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
  Home,
  ArrowRight,
  Printer,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Booking, PaymentReceipt } from '@/lib/db/schema';

function PaymentConfirmationInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = (params?.bookingId as string) || '';
  const paymentId = searchParams.get('paymentId') || 'pay_verified';
  const receiptNumber = searchParams.get('receipt') || 'RCP-2026-001';

  const [booking, setBooking] = useState<Booking | null>(null);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        if (res.ok) {
          const data = await res.json();
          setBooking(data.booking);
        }

        const recRes = await fetch(`/api/receipts/${receiptNumber}`);
        if (recRes.ok) {
          const recData = await recRes.json();
          setReceipt(recData.receipt);
        }
      } catch (err) {
        console.error('Failed to load confirmation details:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [bookingId, receiptNumber]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#E8E2D8]/70 uppercase tracking-widest">
            Generating Statutory Allotment Confirmation...
          </span>
        </div>
      </div>
    );
  }

  const amountPaid = receipt?.amountPaid || booking?.totalPaidAmount || 500000;

  return (
    <div className="min-h-screen bg-[#071519] text-[#FAF8F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header Card */}
        <div className="bg-gradient-to-b from-[#0D2329] to-[#091B20] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Verification Emblem */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-2">
            TRANSACTION CONFIRMED &amp; CAPTURED
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif-heading font-bold text-white tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-sm text-white/70 mt-2 max-w-md mx-auto">
            Your payment for <span className="text-white font-bold">{booking?.unitCode || 'Senior Residence'}</span> in{' '}
            <span className="text-white font-bold">{booking?.projectTitle || 'Senior Living Community'}</span> has been confirmed and verified.
          </p>

          {/* Amount Pill */}
          <div className="my-6 inline-block px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase text-white/50 block">AMOUNT CAPTURED</span>
            <span className="text-3xl font-serif-heading font-bold text-[#E0AB77]">
              ₹{amountPaid.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Transaction Metadata Grid */}
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/5 text-left text-xs font-mono space-y-3 mb-8">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Receipt Number:</span>
              <span className="text-[#E0AB77] font-bold">{receiptNumber}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Razorpay Payment ID:</span>
              <span className="text-white font-bold">{paymentId}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Booking Reference:</span>
              <span className="text-white font-bold">{booking?.bookingNumber}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Primary Allottee:</span>
              <span className="text-white font-bold">{booking?.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Remaining Balance:</span>
              <span className="text-white font-bold">
                ₹{(booking?.remainingBalance || 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/buyer/receipts/${receiptNumber}`}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <FileText className="w-4 h-4 text-[#C58F58]" />
              <span>View &amp; Print Official Receipt</span>
            </Link>

            <Link
              href={`/buyer?phone=${encodeURIComponent(booking?.customerPhone || '')}`}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C58F58] to-[#A06C3B] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#C58F58]/20 transition-all"
            >
              <span>Access My Buyer Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Next Steps & Support Advisory */}
        <div className="mt-8 bg-[#091B20] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 text-xs text-white/70">
          <h3 className="text-sm font-serif-heading font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Next Steps in Your Allotment Journey</span>
          </h3>
          <ol className="list-decimal list-inside space-y-2 pl-1 leading-relaxed">
            <li>
              Our Foundation Legal Officer is preparing your stamped Allotment Certificate and Registered Agreement draft.
            </li>
            <li>
              Your assigned Senior Living Relationship Manager (Capt. R. S. Bhatia: +91 99999 55847) will connect via phone and WhatsApp within 24 hours.
            </li>
            <li>
              You can track ongoing progress, upcoming milestone due dates, and all title records directly in your self-serve Buyer Portal.
            </li>
          </ol>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-white/50">Need immediate help?</span>
            <a
              href="https://wa.me/919999955847"
              target="_blank"
              rel="noreferrer"
              className="text-[#E0AB77] font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Legal Desk: +91 99999 55847</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentConfirmationPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white font-mono text-xs">
          Loading Payment Confirmation...
        </div>
      }
    >
      <PaymentConfirmationInner />
    </React.Suspense>
  );
}
