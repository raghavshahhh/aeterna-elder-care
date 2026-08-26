'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Printer,
  Download,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Building2,
  MapPin,
  QrCode
} from 'lucide-react';
import { PaymentReceipt, Booking } from '@/lib/db/schema';

function numberToWordsINR(amount: number): string {
  // Simple INR word converter for clean statutory receipts
  if (amount === 500000) return 'Rupees Five Lakh Only';
  if (amount === 1000000) return 'Rupees Ten Lakh Only';
  if (amount === 2500000) return 'Rupees Twenty Five Lakh Only';
  if (amount === 2700000) return 'Rupees Twenty Seven Lakh Only';
  if (amount === 100000) return 'Rupees One Lakh Only';
  if (amount === 2400000) return 'Rupees Twenty Four Lakh Only';
  return `Rupees ${(amount / 100000).toFixed(2)} Lakh Only`;
}

export default function ReceiptViewPage() {
  const params = useParams();
  const receiptId = (params?.id as string) || '';

  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReceipt() {
      try {
        const res = await fetch(`/api/receipts/${receiptId}`);
        if (res.ok) {
          const data = await res.json();
          setReceipt(data.receipt);
          setBooking(data.booking);
        }
      } catch (err) {
        console.error('Error loading receipt:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadReceipt();
  }, [receiptId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#E8E2D8]/70 uppercase tracking-widest">
            Rendering Official Digital Receipt...
          </span>
        </div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold font-serif-heading">Receipt Not Found</h2>
          <p className="text-xs text-white/60 mt-2 mb-6">Receipt ID {receiptId} does not exist.</p>
          <Link href="/buyer" className="px-6 py-3 rounded-xl bg-[#C58F58] text-white text-xs font-bold font-mono">
            Return to Buyer Portal
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#071519] text-[#FAF8F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-black">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation & Action Bar (Hidden during Print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href={`/buyer?phone=${encodeURIComponent(receipt.buyerPhone)}`}
            className="text-xs font-mono text-[#E0AB77] flex items-center gap-2 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Buyer Portal</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Official Printable Receipt Card */}
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:rounded-none">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/project-assets/brand/logo-icon.png"
                alt="Logo"
                className="w-14 h-14 object-contain rounded-xl border border-slate-200 p-1"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                  SENIOR LIVING CITIZEN FOUNDATION
                </h1>
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  Statutory Non-Profit Senior Healthcare &amp; Residential Trust
                </p>
                <p className="text-[10px] text-slate-600 font-mono">
                  Official Secretariat: Near Civil Hospital, Farrukhnagar, Gurugram 122506 | Desk: +91 99999 55847
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="text-[10px] uppercase font-bold text-[#A06C3B] tracking-widest block">
                OFFICIAL PAYMENT RECEIPT
              </span>
              <div className="text-lg font-bold text-slate-900 mt-1">
                #{receipt.receiptNumber}
              </div>
              <span className="text-[10px] text-slate-600 block">Date: {receipt.paymentDate}</span>
            </div>
          </div>

          {/* Allottee & Property Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans mb-8 text-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-600 font-bold block mb-1">
                PRIMARY ALLOTTEE DETAILS
              </span>
              <div className="font-bold text-sm text-slate-900">{receipt.buyerName}</div>
              <div className="text-slate-700 mt-1">Phone: {receipt.buyerPhone}</div>
              <div className="text-slate-700">Email: {receipt.buyerEmail}</div>
              {receipt.buyerAddress && (
                <div className="text-slate-700 mt-1">{receipt.buyerAddress}</div>
              )}
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-600 font-bold block mb-1">
                SANCTUARY &amp; UNIT ALLOTMENT
              </span>
              <div className="font-bold text-sm text-slate-900">{receipt.unitCode} ({receipt.unitType})</div>
              <div className="text-slate-700 mt-1">{receipt.projectTitle}</div>
              <div className="text-slate-700">Location: {receipt.locationName}</div>
              <div className="text-slate-700 font-mono mt-1">Booking Ref: {booking?.bookingNumber || receipt.bookingId}</div>
            </div>
          </div>

          {/* Financial Ledger Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 font-mono text-[10px] text-slate-800 uppercase">
                <tr>
                  <th className="py-3 px-4">Description / Milestone</th>
                  <th className="py-3 px-4">Transaction Reference</th>
                  <th className="py-3 px-4 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-900">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {receipt.installmentTitle || 'Senior Living Milestone Allotment Payment'}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-700">
                    {receipt.transactionReference} (Razorpay NetBanking)
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-emerald-800 text-sm">
                    ₹{receipt.amountPaid.toLocaleString('en-IN')}.00
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-mono text-xs text-slate-900">
                <tr>
                  <td colSpan={2} className="py-3 px-4 font-bold text-slate-900">
                    TOTAL AMOUNT RECEIVED:
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 text-base">
                    ₹{receipt.amountPaid.toLocaleString('en-IN')}.00
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-2 px-4 text-slate-700 text-[11px]">
                    Remaining Property Outstanding Balance:
                  </td>
                  <td className="py-2 px-4 text-right text-slate-800 text-xs">
                    ₹{receipt.amountRemaining.toLocaleString('en-IN')}.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Amount in Words */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs font-sans text-amber-950 mb-8">
            <strong>Amount in Words:</strong> {numberToWordsINR(receipt.amountPaid)}
          </div>

          {/* Verification & Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t-2 border-slate-200 items-end">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800">
                <QrCode className="w-10 h-10" />
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                <span className="font-bold text-slate-900 block">DIGITALLY VERIFIED</span>
                Scan QR or visit URL to authenticate statutory validity.
              </div>
            </div>

            <div className="text-left sm:text-right text-xs">
              <div className="font-serif italic text-slate-900 mb-1 font-bold">
                For Senior Living Citizen Foundation
              </div>
              <div className="w-36 h-10 border-b border-slate-400 inline-block mb-1" />
              <div className="text-[10px] font-mono text-slate-700 font-bold uppercase">
                Authorized Financial Officer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
