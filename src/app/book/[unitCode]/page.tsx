'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  MapPin,
  FileText,
  PhoneCall,
  UserCheck,
  BadgeIndianRupee
} from 'lucide-react';
import { getActiveReferralCode } from '@/lib/referral';
import { InventoryUnit, Project } from '@/lib/db/schema';

function UnitBookingInner() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const unitCode = (params?.unitCode as string) || '';

  const [unit, setUnit] = useState<InventoryUnit | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentPlanType, setPaymentPlanType] = useState<'DOWN_PAYMENT' | 'TWO_INSTALLMENTS' | 'FULL_PAYMENT'>('DOWN_PAYMENT');
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    // Detect referral code from URL or persistent storage
    const urlRef = searchParams.get('ref');
    const storedRef = getActiveReferralCode();
    if (urlRef) {
      setReferralCode(urlRef);
    } else if (storedRef) {
      setReferralCode(storedRef);
    }

    async function loadUnit() {
      try {
        const res = await fetch('/api/inventory');
        if (res.ok) {
          const data = await res.json();
          const found = data.inventory.find(
            (u: InventoryUnit) => u.id.toLowerCase() === unitCode.toLowerCase() || u.unitCode.toLowerCase() === unitCode.toLowerCase()
          );
          if (found) {
            setUnit(found);
            // Fetch project
            const projRes = await fetch(`/api/projects`);
            if (projRes.ok) {
              const projData = await projRes.json();
              const p = projData.projects.find((pr: Project) => pr.id === found.projectId);
              setProject(p || projData.projects[0]);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load unit:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUnit();
  }, [unitCode, searchParams]);

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      setError('Please provide your full name and 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: unit?.id || unitCode,
          customerName,
          customerPhone,
          customerEmail,
          customerAddress,
          paymentPlanType,
          referrerCode: referralCode || undefined,
          holdHours: 24
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Booking reservation failed');
      }

      // Redirect to Payment Checkout
      router.push(`/pay/${data.booking.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Reservation failed');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#E8E2D8]/70 uppercase tracking-widest">
            Loading Unit Dossier...
          </span>
        </div>
      </div>
    );
  }

  const propertyPrice = unit?.price || 2700000;
  const isPlot = unit?.type === 'PLOT';

  return (
    <div className="min-h-screen bg-[#071519] text-[#FAF8F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-6">
          <Link href="/apartments" className="hover:text-white transition-colors">Residences</Link>
          <span>/</span>
          <span className="text-[#C58F58]">{unit?.unitCode || unitCode}</span>
          <span>/</span>
          <span>Priority Reservation</span>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#0D2329] via-[#091B20] to-[#061215] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-xs font-mono font-bold mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>24-Hour Priority Unit Hold Guarantee</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white tracking-tight">
                Reserve {unit?.unitCode || unitCode}
              </h1>
              <p className="text-sm text-white/70 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C58F58]" />
                <span>{project?.name || 'Kheri Asra Senior Plotted Sanctuary, Delhi NCR'}</span>
              </p>
            </div>

            <div className="text-left md:text-right bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-white/50 tracking-wider block">Agreed Property Value</span>
              <span className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#E0AB77]">
                {unit?.priceDisplay || `₹${(propertyPrice / 100000).toFixed(2)} Lakh`}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                ● Freehold Title &amp; Registry Inclusive
              </span>
            </div>
          </div>

          {/* Unit Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/50 block text-[10px]">UNIT TYPE</span>
              <span className="font-bold text-white mt-1 block">{unit?.type.replace(/_/g, ' ') || 'Freehold Plot'}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/50 block text-[10px]">DIMENSIONS</span>
              <span className="font-bold text-white mt-1 block">{unit?.areaSqYd ? `${unit.areaSqYd} Sq. Yd.` : `${unit?.areaSqFt || 400} Sq. Ft.`}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/50 block text-[10px]">ORIENTATION</span>
              <span className="font-bold text-white mt-1 block">{unit?.facing || 'North-East Vastu'}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/50 block text-[10px]">AVAILABILITY</span>
              <span className="font-bold text-emerald-400 mt-1 block">AVAILABLE FOR HOLD</span>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <form onSubmit={handleSubmitBooking} className="bg-[#091B20] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div>
            <h2 className="text-lg font-serif-heading font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#C58F58]" />
              <span>Step 1: Primary Buyer Information</span>
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Please enter the allotment details as they will appear on the statutory booking receipt &amp; registered agreement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div>
                <label className="block text-xs font-mono text-white/70 uppercase mb-1.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Col. Rajesh Bakshi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C58F58] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 uppercase mb-1.5">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98112 34567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C58F58] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C58F58] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 uppercase mb-1.5">
                  Permanent Residential Address
                </label>
                <input
                  type="text"
                  placeholder="City, State, Pin Code"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C58F58] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Plan Selection */}
          <div className="border-t border-white/10 pt-6">
            <h2 className="text-lg font-serif-heading font-bold text-white flex items-center gap-2">
              <BadgeIndianRupee className="w-5 h-5 text-[#C58F58]" />
              <span>Step 2: Select Preferred Payment Structure</span>
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Choose your preferred installment milestone schedule. You can pay in full or in verified milestones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              {/* Option 1 */}
              <div
                onClick={() => setPaymentPlanType('DOWN_PAYMENT')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentPlanType === 'DOWN_PAYMENT'
                    ? 'bg-[#2C5E50]/30 border-[#2C5E50] shadow-lg shadow-[#2C5E50]/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#E0AB77] font-bold">
                    {isPlot ? '₹25L Down Payment' : 'Milestone Plan'}
                  </span>
                  {paymentPlanType === 'DOWN_PAYMENT' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-sm font-bold text-white mt-2">
                  {isPlot ? '₹1,00,000 Token Hold' : '₹5,00,000 Token (50%)'}
                </div>
                <p className="text-[11px] text-white/70 mt-1">
                  {isPlot
                    ? 'Followed by ₹24L down payment with ₹25,000/mo assured return until registry (per Foundation booking agreement).'
                    : 'Balanced 50% booking and 50% on key handover & possession.'}
                </p>
              </div>

              {/* Option 2 */}
              <div
                onClick={() => setPaymentPlanType('TWO_INSTALLMENTS')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentPlanType === 'TWO_INSTALLMENTS'
                    ? 'bg-[#2C5E50]/30 border-[#2C5E50] shadow-lg shadow-[#2C5E50]/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#E0AB77] font-bold">50-50 Split</span>
                  {paymentPlanType === 'TWO_INSTALLMENTS' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-sm font-bold text-white mt-2">
                  ₹{((propertyPrice * 0.5) / 100000).toFixed(2)} Lakh First Milest.
                </div>
                <p className="text-[11px] text-white/70 mt-1">
                  50% at booking confirmation, remaining 50% at possession and registered sale deed.
                </p>
              </div>

              {/* Option 3 */}
              <div
                onClick={() => setPaymentPlanType('FULL_PAYMENT')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentPlanType === 'FULL_PAYMENT'
                    ? 'bg-[#2C5E50]/30 border-[#2C5E50] shadow-lg shadow-[#2C5E50]/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#E0AB77] font-bold">Pay In Full</span>
                  {paymentPlanType === 'FULL_PAYMENT' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-sm font-bold text-white mt-2">
                  {unit?.priceDisplay || `₹${(propertyPrice / 100000).toFixed(2)} Lakh`}
                </div>
                <p className="text-[11px] text-white/70 mt-1">
                  Complete 100% settlement with priority document dispatch and fastest registry execution.
                </p>
              </div>
            </div>
          </div>

          {/* Referral Partner Code Attribution */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-mono text-white/70 uppercase block">
                  Referral Partner Code (Optional)
                </label>
                <span className="text-[11px] text-white/50">
                  If referred by a foundation member or partner, enter their code for ₹50 lead bonus &amp; 1% commission attribution.
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. SLF8K2"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="w-36 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[#E0AB77] text-xs font-mono font-bold tracking-wider uppercase text-center focus:outline-none focus:border-[#C58F58]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Action CTA Button */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Razorpay 256-Bit SSL Encrypted Transaction Platform</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C58F58] to-[#A06C3B] hover:from-[#D49E67] hover:to-[#B37B46] text-white font-bold text-sm shadow-xl shadow-[#C58F58]/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Locking Unit &amp; Generating Dossier...</span>
                </>
              ) : (
                <>
                  <span>Confirm Hold &amp; Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Trust & Statutory Transparency Footer */}
        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#C58F58] shrink-0" />
            <span>
              All transactions are strictly governed by our published{' '}
              <Link href="/payment-terms" className="text-[#E0AB77] underline font-bold" target="_blank">
                Payment Terms
              </Link>{' '}
              and statutory registration policies.
            </span>
          </div>
          <Link
            href="/documents"
            className="text-xs font-mono text-[#E0AB77] font-bold hover:underline shrink-0"
            target="_blank"
          >
            View Trust Center Documents →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UnitBookingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Initializing Unit Allotment Engine...
            </span>
          </div>
        </div>
      }
    >
      <UnitBookingInner />
    </React.Suspense>
  );
}
