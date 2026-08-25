'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { projectOverview } from '@/data/propertyData';
import { X, Calendar, ShieldCheck, Clock, CheckCircle2, Building2, MapPin } from 'lucide-react';

export const LeadCaptureDrawer: React.FC = () => {
  const { isLeadDrawerOpen, leadDrawerContext, closeLeadDrawer } = useModal();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(leadDrawerContext.city || 'Delhi NCR');
  const [preferredDate, setPreferredDate] = useState('');
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
          source: leadDrawerContext.actionType === 'site_visit' ? 'SITE_VISIT_FORM' : 'WEBSITE_FORM',
          notes: `Interest in ${leadDrawerContext.unitCode || 'General Sanctuary'}`
        })
      });

      // 2. If site visit with date, book visit
      if (preferredDate) {
        await fetch('/api/site-visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email,
            preferredDate,
            referralCode: refCode,
            message: `Unit interest: ${leadDrawerContext.unitCode || 'General'}`
          })
        });
      }

      setLoading(false);
      setSubmitted(true);
      showToast({
        title: 'Inquiry Successfully Registered!',
        description: 'Our Senior Project Advisor will connect with you shortly.',
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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#E8E2D8] flex flex-col justify-between overflow-y-auto">
          {/* Top Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E2D8]">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#C58F58] font-bold">
                  Direct Foundation Desk
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
                  {leadDrawerContext.title || 'Schedule a Site Walk'}
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

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  We Look Forward to Welcoming You
                </h4>
                <p className="text-sm text-[#53676E] leading-relaxed max-w-sm mx-auto">
                  Our Senior Project Liaison will call you at <strong>{phone}</strong> within 4 working hours to arrange private transportation or coordinate directions to Kheri Asra, Jhajjar.
                </p>
                <div className="pt-4">
                  <Button variant="primary" onClick={handleReset} className="w-full">
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-[#53676E] leading-relaxed">
                  Experience the actual land parcels, inspect original revenue mutation copies, and walk through the architectural CAD models with our master planning team.
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

                  <Input
                    label="Current City of Residence"
                    placeholder="e.g. Gurugram / Delhi / Chandigarh"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#0D2329]">
                      Preferred Date for Site Visit
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs focus:outline-none focus:border-[#2C5E50] focus:ring-1 focus:ring-[#2C5E50] bg-white text-[#0D2329]"
                    />
                  </div>
                </div>

                {/* Property Context Badge */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#2C5E50] font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
                    <span>Project Location</span>
                  </div>
                  <p className="text-[#53676E] text-[11px] leading-relaxed">
                    State Highway 22 (SH-22), Kheri Asra, near Reliance MET City, Jhajjar, Haryana.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Confirm Private Walkthrough →'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Bottom Security Footer */}
          <div className="p-6 bg-[#FAF8F5] border-t border-[#E8E2D8] flex items-center justify-between text-[11px] text-[#53676E]">
            <div className="flex items-center gap-1.5 font-semibold text-[#0D2329]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Foundation Registry</span>
            </div>
            <span>No broker intermediaries</span>
          </div>
        </div>
      </div>
    </div>
  );
};
