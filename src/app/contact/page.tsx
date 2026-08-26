'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import { projectOverview, architectProfile } from '@/data/propertyData';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useToast();
  const { openWhatsApp } = useModal();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Residential Plot (64 Plots)');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast({
        title: 'Missing Required Fields',
        description: 'Please enter your name and phone number.',
        type: 'warning'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast({
        title: 'Site Walkthrough Request Received',
        description: 'Our senior real estate advisory team will contact you within 30 minutes.',
        type: 'success'
      });
    }, 800);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0D2329] to-[#071519] text-white py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#E0AB77] uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            Connect With Advisory Desk
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Book a Private <span className="italic font-serif text-[#C58F58]">Site Walkthrough</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            Visit the project land in Kheri Asra, near Reliance MET City, SH-22 Jhajjar, or visit our corporate office at Sector-45 Gurugram.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-md space-y-6">
            {!submitted ? (
              <>
                <div>
                  <h2 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                    Schedule Your Visit or Request Blueprint Dossier
                  </h2>
                  <p className="text-xs sm:text-sm text-[#53676E] mt-1">
                    Fill out your details below and a senior relationship manager will coordinate your car pickup and visit.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Full Name"
                      placeholder="e.g. Vikram Malhotra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <Input
                      label="Phone / WhatsApp Number"
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
                      placeholder="vikram@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
                        Interest Area
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
                      >
                        <option value="Residential Plot (64 Plots)">Residential Plot (120–425 sq. yd.)</option>
                        <option value="1 BHK Senior Apartment">1 BHK Senior Residence (~330 sq. ft.)</option>
                        <option value="1 RK Senior Studio">1 RK Senior Studio Suite (~240 sq. ft.)</option>
                        <option value="Full CAD Blueprint Dossier">Full Architectural CAD Dossier (PDF)</option>
                        <option value="Home Loan & Finance Support">Home Loan &amp; Finance Guidance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
                      Preferred Date for Site Walk (Optional)
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
                      Specific Requirements or Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us if you are inquiring for your parents, preferred plot facing, or specific medical needs..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl p-4 text-xs sm:text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-[#2C5E50] hover:bg-[#1D4B57] py-4 text-sm font-bold shadow-lg"
                    disabled={loading}
                  >
                    {loading ? 'Submitting Request...' : 'Confirm Site Visit Request →'}
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
                  Thank You, {name}!
                </h3>
                <p className="text-xs sm:text-sm text-[#53676E] max-w-md mx-auto leading-relaxed">
                  We have received your site walkthrough request. Our senior relationship officer will contact you shortly on <strong>{phone}</strong> with confirmation.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="text-xs font-bold text-[#2C5E50] hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Office & Site Locations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Hotline Card */}
            <div className="p-7 rounded-3xl bg-[#0D2329] text-white shadow-xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#C58F58]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77]">Direct Advisory Desk</span>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">{projectOverview.siteOfficePhone}</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizens Foundation...' })}
                  className="w-full py-3 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  Chat on WhatsApp Desk
                </button>
                <a
                  href={`tel:${projectOverview.siteOfficePhone}`}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors text-center border border-white/15"
                >
                  Call: {projectOverview.siteOfficePhone}
                </a>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#2C5E50]">
                <Building2 className="w-4 h-4 text-[#C58F58]" />
                Corporate &amp; Sales Office
              </div>
              <p className="text-xs sm:text-sm text-[#0D2329] font-medium leading-relaxed">
                {projectOverview.siteOfficeAddress}
              </p>
              <p className="text-xs text-[#53676E]">
                Email: <a href={`mailto:${projectOverview.inquiryEmail}`} className="text-[#2C5E50] font-semibold">{projectOverview.inquiryEmail}</a>
              </p>
            </div>

            {/* Project Site Location */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#2C5E50]">
                <MapPin className="w-4 h-4 text-[#C58F58]" />
                Project Site (Land &amp; Proposed Hospital)
              </div>
              <p className="text-xs sm:text-sm text-[#0D2329] font-medium leading-relaxed">
                {projectOverview.locationShort}
              </p>
              <a
                href={projectOverview.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#C58F58] hover:underline"
              >
                Open in Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Architect Office */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#53676E]">
                Architect &amp; Master Planning Practice
              </div>
              <div className="text-xs font-bold text-[#0D2329]">
                {architectProfile.firmName}
              </div>
              <div className="text-xs text-[#53676E]">
                {architectProfile.studioAddress}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
