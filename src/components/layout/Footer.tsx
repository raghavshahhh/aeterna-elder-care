'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import { servicesData } from '@/data/servicesData';
import { locationsData } from '@/data/locationsData';
import { carePlansData } from '@/data/plansData';
import {
  Heart,
  Siren,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageSquare
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const { openEmergency, openWhatsApp } = useModal();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        title: 'Valid Email Required',
        description: 'Please enter a valid email address for our newsletter.',
        type: 'warning'
      });
      return;
    }

    showToast({
      title: 'Subscribed to Aeterna Senior Health Insights!',
      description: 'You will receive our weekly clinical care guides and longevity tips.',
      type: 'success'
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#071519] text-[#FBF9F5] pt-16 sm:pt-20 pb-24 sm:pb-16 border-t border-[#163942] relative z-20">
      {/* Top Pre-Footer Accreditation Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#163942]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-white/80">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">NABH Standards</h5>
              <p className="text-white/60 text-[11px] mt-0.5">Clinical protocols audited by geriatric boards</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">7-Stage Vetting</h5>
              <p className="text-white/60 text-[11px] mt-0.5">100% Police & Biometric verified attendants</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Siren className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Avg. 15-Min Response</h5>
              <p className="text-white/60 text-[11px] mt-0.5">GPS-tracked emergency cardiac ambulances</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#C58F58]/20 text-[#C58F58] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">12,000+ Happy Seniors</h5>
              <p className="text-white/60 text-[11px] mt-0.5">Trusted by families in India and overseas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C58F58] text-white flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-serif-heading font-extrabold text-white">
                Aeterna<span className="text-[#C58F58]">.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              The gold standard in elder healthcare, clinical home nursing, and 24/7 emergency response. Designed to give aging parents dignity at home and children total peace of mind.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C58F58] shrink-0" />
                <span>24/7 Helpline: <strong>+91 11 4084 9900</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C58F58] shrink-0" />
                <span>care@aeternacare.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C58F58] shrink-0 mt-0.5" />
                <span>National HQ: B-4 Vasant Vihar, New Delhi 110057</span>
              </div>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="pt-3">
              <span className="block text-xs font-semibold text-white/90 mb-2">
                Subscribe to Elder Health & Caregiving Journal
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#C58F58] flex-1"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-[#C58F58] hover:bg-[#b37c45] text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Clinical Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              {servicesData.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-[#C58F58] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>All 10 Services →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Ecosystem */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58] mb-3">
                Elder Safety & Ecosystem
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                <li>
                  <Link href="/devices" className="hover:text-white transition-colors">
                    AI Fall Radars & 4G SOS Pendants
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Club Aeterna Daily Live Shows
                  </Link>
                </li>
                <li>
                  <Link href="/services/companion-concierge-care" className="hover:text-white transition-colors">
                    Daughter on Demand™ Concierge
                  </Link>
                </li>
                <li>
                  <Link href="/services/emergency-ambulance-support" className="hover:text-white transition-colors text-red-400 font-semibold">
                    24/7 ACLS Ambulance SLA (&lt; 15m)
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    In-Home Emergency Mock Drills
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58] mb-3">
                Major City Hubs
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-white/70">
                {locationsData.slice(0, 8).map((city) => (
                  <Link
                    key={city.id}
                    href={`/locations/${city.slug}`}
                    className="hover:text-white transition-colors truncate"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Platform & Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Platform & Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/find-care" className="hover:text-white font-medium text-emerald-400">
                  ✨ Find Right Care (60s)
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white flex items-center justify-between">
                  <span>Club Aeterna</span>
                  <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
                </Link>
              </li>
              <li>
                <Link href="/devices" className="hover:text-white">
                  Smart IoT & Safety Devices
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white">
                  Book Instant Service
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Clinical Board
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white">
                  Senior Health Articles
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white flex items-center gap-1">
                  <span>Family Portal</span>
                  <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded">Demo</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white flex items-center gap-1">
                  <span>Admin CRM</span>
                  <span className="text-[9px] bg-[#C58F58]/30 text-[#C58F58] px-1.5 py-0.2 rounded">Demo</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact & Branch Hubs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright and Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#163942] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <p>
          © 2026 Aeterna Care Healthtech Private Limited. All rights reserved. Hospital partnerships subject to regional terms.
        </p>

        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            Terms of Care
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            Clinical Quality Charter
          </Link>
        </div>
      </div>
    </footer>
  );
};
