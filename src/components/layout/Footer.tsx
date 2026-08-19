'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageSquare,
  Building2,
  Compass,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const { openWhatsApp, openLeadDrawer } = useModal();
  const [email, setEmail] = useState('');

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
      title: 'Subscribed to Senior Living Citizen Updates!',
      description: 'You will receive monthly construction progress reports and plot allocation notices.',
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
              <p className="text-white/60 text-[11px] mt-0.5">Sacred temple within walking distance</p>
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
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-[#C58F58] text-[#C58F58]" />
              </div>
              <div>
                <span className="text-xl font-serif-heading font-bold text-white">
                  Senior Living Citizen Foundation<span className="text-[#C58F58]">.</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#C58F58] font-bold">
                  A Plotted Sanctuary · Haryana
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
                onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' })}
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

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              The Project
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/#location" className="hover:text-white transition-colors">
                  Location &amp; Map
                </Link>
              </li>
              <li>
                <Link href="/#master-plan" className="hover:text-white transition-colors">
                  Hospital CAD Blueprints
                </Link>
              </li>
              <li>
                <Link href="/#unit-explorer" className="hover:text-white transition-colors">
                  1BHK &amp; 2BHK Apartments
                </Link>
              </li>
              <li>
                <Link href="/#availability" className="hover:text-white transition-colors">
                  64 Plots Inventory
                </Link>
              </li>
              <li>
                <Link href="/#ecosystem" className="hover:text-white transition-colors">
                  Ayurvedic Hospital
                </Link>
              </li>
              <li>
                <Link href="/#roadmap" className="hover:text-white transition-colors">
                  Development Milestones
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Township Infrastructure */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Key Infrastructure
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center justify-between">
                <span>30,000 Sqft Ayurvedic Hospital</span>
                <span className="text-[10px] text-emerald-400 font-mono">G+2</span>
              </li>
              <li className="flex items-center justify-between">
                <span>64 Residential Plots</span>
                <span className="text-[10px] text-emerald-400 font-mono">Blocks A–F</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Senior Apartments</span>
                <span className="text-[10px] text-emerald-400 font-mono">1 &amp; 2 BHK</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Community Mandir</span>
                <span className="text-[10px] text-amber-400 font-mono">Western Edge</span>
              </li>
              <li className="flex items-center justify-between">
                <span>50-Seat Amphitheater</span>
                <span className="text-[10px] text-amber-400 font-mono">Rooftop</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Dossier Request */}
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
              Architecture by <strong>The Vision Architects</strong>, Farrukhnagar, Gurugram 122506
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
