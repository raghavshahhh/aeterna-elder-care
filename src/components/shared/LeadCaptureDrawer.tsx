'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, PhoneCall, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const LeadCaptureDrawer: React.FC = () => {
  const { isLeadDrawerOpen, leadDrawerContext, closeLeadDrawer } = useModal();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Delhi NCR');
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
        title: 'Callback Scheduled!',
        description: 'A Senior Care Specialist will call you within 5 minutes.',
        type: 'success'
      });
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    closeLeadDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/60 backdrop-blur-sm transition-opacity"
        onClick={closeLeadDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E8E2D8] shadow-2xl p-5 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#EAF2EE] text-[#3D685A] flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D685A]">
                  Priority Callback
                </span>
              </div>
              <button
                onClick={closeLeadDrawer}
                className="p-1.5 rounded-full text-[#5C6F75] hover:text-[#0D2329] hover:bg-[#F6F1E8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  {leadDrawerContext.title || 'Speak to a Senior Geriatric Care Advisor'}
                </h3>
                <p className="text-sm text-[#5C6F75] mt-1.5 leading-relaxed">
                  Get personalized guidance, caregiver profiles, and transparent cost estimates for your parents in 5 minutes.
                </p>

                <div className="mt-4 p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E2D7C5] text-xs text-[#1B4550] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#3D685A] shrink-0" />
                  <span>Free Clinical Assessment • Zero Sales Pressure</span>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Input
                    label="Your Name"
                    placeholder="e.g. Rahul Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <Input
                    label="Phone Number"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
                      City of Care
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3.5 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
                    >
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Noida">Noida & Gr. Noida</option>
                      <option value="Mumbai">Mumbai & MMR</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Chandigarh">Chandigarh Tricity</option>
                      <option value="Jaipur">Jaipur</option>
                    </select>
                  </div>

                  {leadDrawerContext.service && (
                    <div className="text-xs text-[#5C6F75] bg-[#EAF2EE] p-3 rounded-xl">
                      Inquiring for: <strong className="text-[#0D2329]">{leadDrawerContext.service}</strong>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={loading}
                    className="w-full mt-4"
                  >
                    Request Callback in 5 Mins →
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                  Thank You, {name}!
                </h4>
                <p className="text-sm text-[#5C6F75] leading-relaxed">
                  Your request has been prioritized. Senior Care Specialist Sister Ananya Varghese has received your case and is dialing your number ({phone}).
                </p>

                <div className="pt-6">
                  <Button variant="secondary" onClick={handleReset} className="w-full">
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[#E8E2D8] flex items-center gap-2 text-xs text-[#5C6F75]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>NABH Accredited Clinical Protocols & 100% Data Privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
