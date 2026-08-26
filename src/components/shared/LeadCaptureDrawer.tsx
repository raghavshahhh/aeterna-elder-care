'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { projectOverview } from '@/data/propertyData';
import { X, Calendar, ShieldCheck, Clock, CheckCircle2, Building2, MapPin, Car, Compass } from 'lucide-react';

export const LeadCaptureDrawer: React.FC = () => {
  const { isLeadDrawerOpen, leadDrawerContext, closeLeadDrawer } = useModal();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Delhi NCR');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('11:00 AM');
  const [transportNeeded, setTransportNeeded] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('Dwarka Sector 21 Metro Station, New Delhi');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLeadDrawer();
    };

    if (isLeadDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLeadDrawerOpen, closeLeadDrawer]);

  if (!isLeadDrawerOpen) return null;

  const unitDesc = leadDrawerContext.plotNumber
    ? `${leadDrawerContext.plotNumber} (${leadDrawerContext.plotBlock || 'Masterplan'}, ${leadDrawerContext.plotSize || ''})`
    : (leadDrawerContext.unitCode || 'General Senior Living Sanctuary');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast({
        title: 'Please fill required fields',
        description: 'Name and Phone number are required.',
        type: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      const activeRef = typeof window !== 'undefined' ? localStorage.getItem('slcf_active_ref_code') : null;
      let refCode = undefined;
      if (activeRef) {
        try { refCode = JSON.parse(activeRef).code; } catch {}
      }

      // 1. Ingest lead to CRM
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          referralCode: refCode,
          source: leadDrawerContext.actionType === 'book-site-visit' ? 'SITE_VISIT_DRAWER' : 'WEBSITE_FORM',
          notes: `Context: ${unitDesc}. City: ${city}. Transport: ${transportNeeded ? pickupLocation : 'Self Drive'}`
        })
      });

      // 2. Book site visit with date & transport details
      await fetch('/api/site-visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorName: name,
          visitorPhone: phone,
          visitorEmail: email,
          preferredDate: preferredDate || new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split('T')[0],
          preferredTimeSlot,
          transportNeeded,
          pickupLocation: transportNeeded ? pickupLocation : undefined,
          referralCode: refCode,
          notes: `Inspecting ${unitDesc}. Scheduled via Website Sales Advisor.`
        })
      });

      setLoading(false);
      setSubmitted(true);
      showToast({
        title: 'Site Visit Confirmed!',
        description: 'Our Senior Project Advisor will call you within 15 minutes.',
        type: 'success'
      });
    } catch {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setPreferredDate('');
    closeLeadDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label={leadDrawerContext.title || 'Schedule Consultation'}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/75 backdrop-blur-sm transition-opacity"
        onClick={closeLeadDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#E8E2D8] flex flex-col justify-between overflow-y-auto">
          {/* Top Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E2D8]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C58F58] font-bold">
                  Guided Ground Tour Desk
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                  {leadDrawerContext.title || 'Book Guided Site Walk'}
                </h3>
              </div>
              <button
                onClick={closeLeadDrawer}
                className="p-2 rounded-full text-[#53676E] hover:text-[#0D2329] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Plot Context Pill */}
            {leadDrawerContext.plotNumber && (
              <div className="p-3.5 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#2C5E50]" />
                  <span className="text-[#0D2329] font-bold">
                    Target: {leadDrawerContext.plotNumber} ({leadDrawerContext.plotBlock})
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#2C5E50]">
                  {leadDrawerContext.plotSize}
                </span>
              </div>
            )}

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  Site Visit Request Received
                </h4>
                <p className="text-xs text-[#53676E] leading-relaxed max-w-sm mx-auto">
                  Our Senior Project Liaison will call <strong>{phone}</strong> within 15 minutes to confirm chauffeur pickup timing from <strong>{pickupLocation}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#53676E]">Property:</span>
                    <strong className="text-[#0D2329]">{unitDesc}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#53676E]">Destination:</span>
                    <strong className="text-[#0D2329]">Kheri Asra, SH-22 Jhajjar</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#53676E]">Transport:</span>
                    <strong className="text-emerald-700">{transportNeeded ? 'Private Chauffeur Included' : 'Self-Drive'}</strong>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="primary" onClick={handleReset} className="w-full">
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-[#53676E] leading-relaxed">
                  Walk the 64-plot masterplan, inspect the proposed 30k sq. ft. Ayurvedic hospital site, and verify municipal demarcation on ground with our senior advisor.
                </p>

                <div className="space-y-3.5">
                  <Input
                    label="Full Name *"
                    required
                    placeholder="e.g. Brigadier S. K. Verma (Retd.)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Input
                    label="Contact Phone Number *"
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <Input
                    label="Email Address (Optional)"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#0D2329]">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDBD] text-xs focus:outline-none focus:border-[#2C5E50] bg-white text-[#0D2329]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#0D2329]">
                        Time Slot
                      </label>
                      <select
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDBD] text-xs focus:outline-none focus:border-[#2C5E50] bg-white text-[#0D2329]"
                      >
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Chauffeur Transportation Selector */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0D2329] flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-[#C58F58]" />
                        Complimentary Chauffeur Pickup
                      </span>
                      <input
                        type="checkbox"
                        checked={transportNeeded}
                        onChange={(e) => setTransportNeeded(e.target.checked)}
                        className="rounded border-[#D5CDBD] text-[#2C5E50] focus:ring-[#2C5E50] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    {transportNeeded && (
                      <Input
                        label="Pickup Location"
                        placeholder="e.g. Dwarka Sector 21 / Gurugram / Delhi"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Confirming...' : 'Confirm Guided Site Walk →'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Bottom Security Footer */}
          <div className="p-6 bg-[#FAF8F5] border-t border-[#E8E2D8] flex items-center justify-between text-[11px] text-[#53676E]">
            <div className="flex items-center gap-1.5 font-semibold text-[#0D2329]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Foundation Desk</span>
            </div>
            <span>No broker commission</span>
          </div>
        </div>
      </div>
    </div>
  );
};
