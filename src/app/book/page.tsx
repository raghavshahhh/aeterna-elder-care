'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { servicesData } from '@/data/servicesData';
import { carePlansData } from '@/data/plansData';
import { locationsData } from '@/data/locationsData';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Building,
  ArrowRight,
  Sparkles,
  Download,
  PhoneCall
} from 'lucide-react';

function BookingContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const preService = searchParams.get('service');
  const prePlan = searchParams.get('plan');
  const preBilling = searchParams.get('billing') || 'annual';
  const preCity = searchParams.get('city') || 'Delhi NCR';

  const [bookingType, setBookingType] = useState<'service' | 'plan'>(prePlan ? 'plan' : 'service');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(preService || 'home-nursing');
  const [selectedPlanSlug, setSelectedPlanSlug] = useState(prePlan || 'gold-essential');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>((preBilling as any) || 'annual');

  const [city, setCity] = useState(preCity);
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('Morning (8:00 AM – 12:00 PM)');

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Female');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'pay-later'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Calculate pricing
  const currentService = servicesData.find((s) => s.slug === selectedServiceSlug) || servicesData[0];
  const currentPlan = carePlansData.find((p) => p.slug === selectedPlanSlug) || carePlansData[1];

  const basePrice = bookingType === 'service'
    ? 1800
    : billingCycle === 'annual'
    ? currentPlan.priceAnnual
    : currentPlan.priceMonthly;

  const gstTax = Math.round(basePrice * 0.05);
  const totalAmount = basePrice + gstTax;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !contactPhone || !address) {
      showToast({
        title: 'Missing Required Information',
        description: 'Please provide Patient Name, Phone Number, and Address.',
        type: 'warning'
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `AET-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setIsConfirmed(true);
      showToast({
        title: 'Booking Confirmed!',
        description: `Booking Reference #${generatedId} registered successfully.`,
        type: 'success'
      });
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {!isConfirmed ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Booking Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-8">
            <div>
              <Badge variant="sage" size="sm">
                Instant Scheduling Engine
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] mt-2">
                Book Clinical Care & Memberships
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6F75] mt-1">
                Fast-track onboarding with zero delay. Direct coordination with supervising medical officer.
              </p>
            </div>

            {/* Type Selector (Service vs Plan) */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-[#F6F1E8] rounded-2xl border border-[#E2D7C5]">
              <button
                type="button"
                onClick={() => setBookingType('service')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  bookingType === 'service'
                    ? 'bg-[#0D2329] text-white shadow-sm'
                    : 'text-[#5C6F75] hover:text-[#0D2329]'
                }`}
              >
                Single Clinical Service
              </button>
              <button
                type="button"
                onClick={() => setBookingType('plan')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  bookingType === 'plan'
                    ? 'bg-[#0D2329] text-white shadow-sm'
                    : 'text-[#5C6F75] hover:text-[#0D2329]'
                }`}
              >
                Care Membership Plan
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Item Selection */}
              {bookingType === 'service' ? (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D2329] mb-2">
                    Select Clinical Service
                  </label>
                  <select
                    value={selectedServiceSlug}
                    onChange={(e) => setSelectedServiceSlug(e.target.value)}
                    className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.title} ({s.startingPrice} {s.priceUnit})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D2329]">
                    Select Membership Plan
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {carePlansData.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlanSlug(p.slug)}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                          selectedPlanSlug === p.slug
                            ? 'border-[#0D2329] bg-[#EAF2EE] text-[#0D2329] font-bold'
                            : 'border-[#E8E2D8] text-[#5C6F75] hover:bg-[#F6F1E8]'
                        }`}
                      >
                        <span className="block font-bold text-sm text-[#0D2329]">{p.name}</span>
                        <span>₹{p.priceMonthly}/mo</span>
                      </button>
                    ))}
                  </div>

                  {/* Billing switch for plans */}
                  <div className="flex items-center gap-4 pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={billingCycle === 'annual'}
                        onChange={() => setBillingCycle('annual')}
                        className="text-[#0D2329]"
                      />
                      <span>Annual (Save 20%)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={billingCycle === 'monthly'}
                        onChange={() => setBillingCycle('monthly')}
                        className="text-[#0D2329]"
                      />
                      <span>Monthly</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Location & Scheduling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
                  >
                    {locationsData.map((l) => (
                      <option key={l.id} value={l.name}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Preferred Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Preferred Time Slot / Shift</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
                >
                  <option value="Morning (8:00 AM – 12:00 PM)">Morning (8:00 AM – 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                  <option value="12-Hour Day Shift (8:00 AM – 8:00 PM)">12-Hour Day Shift (8:00 AM – 8:00 PM)</option>
                  <option value="12-Hour Night Shift (8:00 PM – 8:00 AM)">12-Hour Night Shift (8:00 PM – 8:00 AM)</option>
                  <option value="24-Hour Live-in Shift">24-Hour Live-in Shift</option>
                  <option value="Immediate Emergency Dispatch">🚨 Immediate Emergency Dispatch</option>
                </select>
              </div>

              <Input
                label="Complete Street Address & Apartment Details"
                placeholder="e.g. Flat 402, Tower 3, Palm Meadows, Whitefield"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              {/* Patient Details */}
              <div className="pt-4 border-t border-[#E8E2D8] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D2329]">
                  Patient / Parent Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <Input
                      label="Patient's Full Name"
                      placeholder="e.g. Smt. Kamala Devi"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>
                  <Input
                    label="Age"
                    placeholder="e.g. 78"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                </div>

                <Input
                  label="Primary Medical Conditions / Doctor Notes (Optional)"
                  placeholder="e.g. Post-stroke left hemiplegia, diabetes, hypertensive"
                  value={medicalConditions}
                  onChange={(e) => setMedicalConditions(e.target.value)}
                />
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-[#E8E2D8] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D2329]">
                  Primary Contact (Son / Daughter / Family)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Your Name"
                    placeholder="e.g. Rajesh Sharma"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+91 98765 43210"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D2329]">
                  Payment Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-4 rounded-2xl border text-left text-xs transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#0D2329] bg-[#EAF2EE] text-[#0D2329] font-bold'
                        : 'border-[#E8E2D8] text-[#5C6F75]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-sm text-[#0D2329]">Razorpay / UPI / Cards</span>
                    </div>
                    <span>Instant digital payment receipt & confirmation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pay-later')}
                    className={`p-4 rounded-2xl border text-left text-xs transition-all ${
                      paymentMethod === 'pay-later'
                        ? 'border-[#0D2329] bg-[#EAF2EE] text-[#0D2329] font-bold'
                        : 'border-[#E8E2D8] text-[#5C6F75]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="w-4 h-4 text-[#3D685A]" />
                      <span className="font-bold text-sm text-[#0D2329]">Pay After In-Home Triage</span>
                    </div>
                    <span>Pay during supervisor orientation visit</span>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isProcessing}
                className="w-full text-base font-bold"
              >
                Confirm Booking & Proceed ({formatINR(totalAmount)}) →
              </Button>
            </form>
          </div>

          {/* Order Summary & Safety Guarantee (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F9F6F0] rounded-3xl p-6 sm:p-7 border border-[#E2D7C5] space-y-5">
              <h3 className="text-lg font-serif-heading font-bold text-[#0D2329]">
                Booking Summary
              </h3>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] space-y-2 text-xs">
                <div className="flex justify-between font-bold text-[#0D2329] text-sm">
                  <span>{bookingType === 'service' ? currentService.title : currentPlan.name}</span>
                </div>
                <div className="text-[#5C6F75]">
                  City: <strong>{city}</strong>
                </div>
                <div className="text-[#5C6F75]">
                  Date: <strong>{startDate}</strong> • {timeSlot}
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#5C6F75] pt-2 border-t border-[#E8E2D8]">
                <div className="flex justify-between">
                  <span>Base Care Fee:</span>
                  <strong className="text-[#0D2329]">{formatINR(basePrice)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>GST & Clinical Audit (5%):</span>
                  <strong className="text-[#0D2329]">{formatINR(gstTax)}</strong>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#E8E2D8] text-sm font-bold text-[#0D2329]">
                  <span>Total Amount:</span>
                  <span className="text-xl text-[#0D2329]">{formatINR(totalAmount)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] text-xs text-[#1B4550] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#3D685A] shrink-0 mt-0.5" />
                <span>
                  100% Satisfaction Guarantee: If you are unsatisfied after the first day, we provide a full refund or instant caregiver replacement.
                </span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3 text-xs text-[#5C6F75]">
              <h4 className="font-bold text-[#0D2329] text-sm">Need immediate assistance?</h4>
              <p>Our Care Desk is available 24 hours a day to answer questions or arrange priority ambulance dispatch.</p>
              <span className="block font-bold text-[#0D2329] text-sm">+91 11 4084 9900</span>
            </div>
          </div>
        </div>
      ) : (
        /* CONFIRMATION SCREEN */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D8] shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <Badge variant="gold" size="md">
              Booking Confirmed
            </Badge>
            <h2 className="text-3xl font-serif-heading font-bold text-[#0D2329] mt-3">
              We Have Scheduled Your Care!
            </h2>
            <p className="text-sm text-[#5C6F75] mt-1">
              Reference ID: <strong className="text-[#0D2329] font-mono text-base">{bookingId}</strong>
            </p>
          </div>

          <div className="bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl p-6 text-left text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">Patient Name:</span>
              <strong className="text-[#0D2329]">{patientName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">Scheduled Service:</span>
              <strong className="text-[#0D2329]">{bookingType === 'service' ? currentService.title : currentPlan.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">Date & Time:</span>
              <strong className="text-[#0D2329]">{startDate} ({timeSlot})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">Address:</span>
              <strong className="text-[#0D2329]">{address}, {city}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E8E2D8]">
              <span className="text-[#5C6F75]">Amount Paid / Status:</span>
              <strong className="text-emerald-700 font-bold">{formatINR(totalAmount)} (Confirmed)</strong>
            </div>
          </div>

          <p className="text-xs text-[#5C6F75] leading-relaxed">
            A confirmation receipt has been sent to your phone ({contactPhone}). Senior Care Specialist Sister Ananya Varghese has been assigned to your case and will call you within 30 minutes for the clinical orientation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/portal" className="flex-1">
              <Button variant="primary" size="md" className="w-full">
                Go to Family Health Portal →
              </Button>
            </Link>

            <Link href="/" className="flex-1">
              <Button variant="outline" size="md" className="w-full">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#5C6F75]">Loading Booking Engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}
