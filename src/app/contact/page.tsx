'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Siren,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useToast();
  const { openEmergency, openWhatsApp } = useModal();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Delhi NCR');
  const [category, setCategory] = useState('Home Nursing & Caregiver');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast({
        title: 'Missing Details',
        description: 'Please provide your name and phone number.',
        type: 'warning'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast({
        title: 'Message Received',
        description: 'Our Senior Care Specialist will contact you within 15 minutes.',
        type: 'success'
      });
    }, 900);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="sage" size="md">
            24/7 Care Helplines & Hubs
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif-heading font-bold text-[#0D2329]">
            We Are Always Here for Your Family
          </h1>
          <p className="text-base sm:text-lg text-[#5C6F75] font-light max-w-2xl mx-auto">
            Whether you need rapid ambulance dispatch, a home nurse consultation, or general elder care advice, our clinical team is on standby 24 hours a day.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm space-y-6">
            {!submitted ? (
              <>
                <div>
                  <h2 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C6F75] mt-1">
                    Fill out your parent&apos;s details below and a Geriatric Care Specialist will call you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="e.g. Rahul Sharma"
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3.5 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
                    >
                      <option value="Home Nursing & Caregiver">Home Nursing & Caregiver</option>
                      <option value="Doctor Home Visit">Doctor Home Visit</option>
                      <option value="Dementia & Memory Care">Dementia & Memory Care</option>
                      <option value="Care Membership Plans">Care Membership Plans</option>
                      <option value="Medical Equipment Rental">Medical Equipment Rental</option>
                      <option value="General Question">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
                      Medical Condition or Notes (Optional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please describe your parent's age, medical history, and specific requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl p-4 text-sm text-[#0D2329] focus:bg-white focus:border-[#3D685A] focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={loading}
                    className="w-full font-bold"
                  >
                    Submit Care Inquiry →
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  Thank You, {name}!
                </h3>
                <p className="text-sm text-[#5C6F75] max-w-md mx-auto leading-relaxed">
                  Your inquiry has been assigned to our Senior Clinical Supervisor. We will call you at {phone} within 15 minutes.
                </p>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Direct Hotlines & Regional Offices */}
          <div className="lg:col-span-5 space-y-6">
            {/* Emergency Hotline Box */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center animate-sos-pulse">
                  <Siren className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
                    24x7 Emergency Desk
                  </span>
                  <strong className="text-lg text-red-950 font-mono">+91 11 4084 9900</strong>
                </div>
              </div>
              <p className="text-xs text-red-900 leading-relaxed">
                For sudden cardiac arrest, acute breathlessness, or severe stroke symptoms, tap below for instant ambulance dispatch.
              </p>
              <Button
                variant="emergency"
                size="md"
                className="w-full"
                onClick={() => openEmergency()}
              >
                Trigger Emergency SOS
              </Button>
            </div>

            {/* WhatsApp Support Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    Instant WhatsApp Support
                  </span>
                  <strong className="text-sm text-emerald-950">Avg. Reply &lt; 2 Minutes</strong>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
                onClick={() => openWhatsApp()}
              >
                Chat on WhatsApp Desk →
              </Button>
            </div>

            {/* Regional HQ Offices */}
            <div className="bg-[#F9F6F0] border border-[#E2D7C5] rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-[#0D2329] uppercase tracking-wider">
                National Headquarters & Regional Hubs
              </h3>
              <div className="space-y-3 text-xs text-[#5C6F75]">
                <div>
                  <strong className="text-[#0D2329] block">National HQ (New Delhi):</strong>
                  <span>B-4/12 Vasant Vihar, South Delhi, New Delhi 110057</span>
                </div>
                <div>
                  <strong className="text-[#0D2329] block">Gurugram Hub:</strong>
                  <span>Sector 54, Golf Course Road, Gurugram 122002</span>
                </div>
                <div>
                  <strong className="text-[#0D2329] block">Mumbai Hub:</strong>
                  <span>Maker Chambers V, Nariman Point & Bandra West, Mumbai 400021</span>
                </div>
                <div>
                  <strong className="text-[#0D2329] block">Bengaluru Hub:</strong>
                  <span>100 Feet Road, Indiranagar, Bengaluru 560038</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
