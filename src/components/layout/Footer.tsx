'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import { projectOverview, architectProfile } from '@/data/propertyData';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Building2,
  Compass,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { showToast } = useToast();
  const { openWhatsApp, openLeadDrawer } = useModal();
  const [email, setEmail] = useState('');

  if (
    pathname?.startsWith('/owner') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/portal')
  ) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        title: 'Valid Email Required',
        description: 'Please enter a valid email address for priority project updates.',
        type: 'warning'
      });
      return;
    }

    showToast({
      title: 'Subscribed to Senior Living Citizens Updates!',
      description: 'You will receive construction progress reports and plot allotment notices.',
      type: 'success'
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#071519] text-[#FBF9F5] pt-16 sm:pt-20 pb-24 sm:pb-16 border-t border-[#163942] relative z-20">
      {/* Top Pre-Footer Project Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#163942]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-white/80">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">64 Freehold Plots</h5>
              <p className="text-white/60 text-[11px] mt-0.5">120 to 425 sq. yd. across 6 Blocks</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">30k Sqft Hospital</h5>
              <p className="text-white/60 text-[11px] mt-0.5">G+2 Multi-Speciality Ayurvedic Hospital</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#C58F58]/20 text-[#C58F58] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Community Mandir</h5>
              <p className="text-white/60 text-[11px] mt-0.5">Sacred temple within 5-min walk</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Near Reliance MET City</h5>
              <p className="text-white/60 text-[11px] mt-0.5">Kheri Asra, off SH-22 Jhajjar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Project Vision */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#14323A] border border-[#C58F58]/40 flex items-center justify-center p-2 shrink-0 shadow-lg">
                <img
                  src="/project-assets/brand/logo-icon-clean.png"
                  alt="Senior Living Citizens Foundation"
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div>
                <span className="text-xl font-serif-heading font-bold text-white">
                  Senior Living<span className="text-[#C58F58]">.</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#C58F58] font-bold">
                  Citizens Foundation · National
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {projectOverview.subtitle}
            </p>

            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C58F58] shrink-0 mt-0.5" />
                <div>
                  <strong>Project Site:</strong> {projectOverview.locationShort}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#C58F58] shrink-0 mt-0.5" />
                <div>
                  <strong>Corporate / Sales Office:</strong> {projectOverview.siteOfficeAddress}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C58F58] shrink-0" />
                <a href={`tel:${projectOverview.siteOfficePhone}`} className="hover:text-white font-mono font-bold">
                  {projectOverview.siteOfficePhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C58F58] shrink-0" />
                <a href={`mailto:${projectOverview.inquiryEmail}`} className="hover:text-white font-mono">
                  {projectOverview.inquiryEmail}
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizens Foundation...' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-semibold shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp Desk →
              </button>
              <a
                href={projectOverview.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
                Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Project Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Project
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/plots" className="hover:text-white transition-colors">
                  Residential Plots (64 Plots)
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="hover:text-white transition-colors">
                  Residences (1 BHK / 1 RK)
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-white transition-colors">
                  Care &amp; Wellness Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-white transition-colors">
                  Location &amp; Connectivity
                </Link>
              </li>
              <li>
                <Link href="/#building-vision" className="hover:text-white transition-colors">
                  3D Building Model
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Foundation
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  Trust Center (Public Records)
                </Link>
              </li>
              <li>
                <Link href="/finance" className="hover:text-white transition-colors">
                  Finance &amp; Payment Plans
                </Link>
              </li>
              <li>
                <Link href="/buyer" className="hover:text-[#E0AB77] font-semibold text-[#C58F58] flex items-center gap-1.5 transition-colors">
                  <span>Buyer Portal &amp; Receipts</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 font-semibold text-white/90 flex items-center gap-1.5 transition-colors">
                  <span>Admin CRM &amp; Operations</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-mono font-bold">STAFF</span>
                </Link>
              </li>
              <li>
                <Link href="/owner/login" className="hover:text-white transition-colors">
                  Secretariat &amp; Trustee Login
                </Link>
              </li>
              <li>
                <Link href="/portal/referral" className="hover:text-white transition-colors">
                  Partner Referral Portal (₹50)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Township Dossier
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Get the latest CAD blueprints, plot availability, and construction progress in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C58F58]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#2C5E50] hover:bg-[#3D7363] text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Join
                </button>
              </div>
            </form>

            <div className="pt-2">
              <button
                onClick={() => openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white/80 font-medium transition-colors text-center"
              >
                Schedule Private Site Walk
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Architectural Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#163942] space-y-3 text-[11px] text-white/50 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> {projectOverview.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-white/40">
            <div>
              © {new Date().getFullYear()} {projectOverview.legalName}. All rights reserved.
            </div>
            <div>
              Architecture by <strong>The Vision Architects &amp; Consultants</strong>, Farrukhnagar, Gurugram 122506
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
