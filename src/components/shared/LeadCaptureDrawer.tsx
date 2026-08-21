'use client';

import React, { useState } from 'react';
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

  if (!isLeadDrawerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
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
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast({
        title: 'Site Visit / Priority Interest Registered!',
        description: 'Our Senior Project Advisor will contact you to confirm your private walkthrough.',
        type: 'success'
      });
    }, 700);
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/70 backdrop-blur-sm transition-opacity"
        onClick={closeLeadDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-lg bg-white border-l border-[#E8E2D8] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
                    Official Project Desk
                  </span>
                  <p className="text-[11px] text-[#53676E]">{projectOverview.name}</p>
                </div>
              </div>
              <button
                onClick={closeLeadDrawer}
                className="p-2 rounded-full text-[#53676E] hover:text-[#0D2329] hover:bg-[#F5EFE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  {leadDrawerContext.title || 'Schedule Private Site & Blueprint Visit'}
                </h3>
                <p className="text-sm text-[#53676E] mt-1.5 leading-relaxed">
                  Experience the tranquil location, review architectural CAD blueprints, and reserve your priority residence.
                </p>

                {leadDrawerContext.unitName && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] text-xs text-[#14353E] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#2C5E50] tracking-wider block">Target Residence</span>
                      <strong className="text-sm text-[#0D2329]">{leadDrawerContext.unitName}</strong>
                      <span className="text-[#53676E] ml-1.5">({leadDrawerContext.unitType})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-[#2C5E50] border border-[#CDE0D7]">
                      Phase 1 Locked
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <Input
                    label="Your Full Name"
                    placeholder="e.g. Sh. Arvind Nair"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Phone / WhatsApp Number"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="arvind@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Preferred Visit Date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                    />
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
                        Location / City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
                      >
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Noida">Noida</option>
                        <option value="NRI / Overseas">NRI / Overseas</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={loading}
                    className="w-full mt-4 bg-[#2C5E50] hover:bg-[#1D4B57] py-4"
                  >
                    Confirm Private Walkthrough Request →
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  Request Confirmed, {name}!
                </h4>
                <p className="text-sm text-[#53676E] leading-relaxed max-w-sm mx-auto">
                  Your priority inquiry has been received. Our Senior Project Advisor will reach out via WhatsApp & call within 15 minutes to share the architectural dossier and coordinate your visit.
                </p>

                <div className="pt-6">
                  <Button variant="secondary" onClick={handleReset} className="w-full">
                    Close Window
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[#E8E2D8] flex items-center gap-2.5 text-xs text-[#53676E]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Official Senior Living Citizen Foundation Desk • 100% Privacy Assured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

