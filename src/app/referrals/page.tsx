'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  Share2,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  MessageSquare,
  Users
} from 'lucide-react';

export default function ReferralProgramPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', upiId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedCode(data.referrer.code);
      }
    } catch (err) {
      console.error('Failed to register partner:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [origin, setOrigin] = useState('https://aeterna-elder-care.vercel.app');

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const referralUrl = generatedCode
    ? `${origin}/?ref=${generatedCode}`
    : '';

  const copyToClipboard = () => {
    if (referralUrl) {
      navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="pt-28 sm:pt-36 pb-16 bg-[#0D2329] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-xs font-mono font-bold text-[#E0AB77] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Foundation Community Advocacy Program
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            Help Families Find <span className="italic font-serif text-[#E0AB77]">Sanctuary.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Join the Senior Living Citizens Foundation advocacy network. Earn guaranteed rewards for verified family connections and meaningful sales commissions.
          </p>
        </div>
      </section>

      {/* 3 Pillar Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              ₹50 per Verified Lead
            </h3>
            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              Earn an immediate ₹50 bonus for every genuine, unique inquiry you introduce to the Foundation. Paid directly via UPI.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF2EB] text-[#C58F58] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              1% Sales Commission
            </h3>
            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              Earn up to ₹25,000–₹50,000 on every confirmed residential unit or freehold plot booking made by your referral.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0D2329] text-white flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              30-Day Attribution
            </h3>
            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              Your unique link stays linked to the prospect for 30 full days, ensuring you get full credit even if they book later.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Registration Form & Instant Code Generator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0D2329] text-white shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E0AB77] font-bold">
              GET STARTED IN 30 SECONDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#FAF8F5]">
              Generate Your Unique Partner Link
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              No complex registration. Fill your details to unlock your partner dashboard and custom sharing link.
            </p>
          </div>

          {!generatedCode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#C58F58]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98101 23456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#C58F58]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. partner@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#C58F58]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">UPI ID for Payouts</label>
                  <input
                    type="text"
                    placeholder="e.g. yourname@okaxis"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#C58F58]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#C58F58] hover:bg-[#B37E47] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Generating Partner Link...' : 'Generate My Referral Link →'}</span>
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-white/10 border border-white/10 space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#E0AB77] font-bold block">YOUR UNIQUE REFERRAL CODE</span>
                <span className="text-3xl font-mono font-extrabold text-white tracking-widest">{generatedCode}</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2 text-xs font-mono text-white/90">
                <span className="truncate">{referralUrl}</span>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-[#2C5E50] text-white text-xs font-bold flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Explore Senior Living Citizens Foundation's master sanctuary and senior residences: ${referralUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </a>

                <Link
                  href="/portal/referral"
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Open Partner Dashboard</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
