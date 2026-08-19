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
  Sparkles
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
      title: 'Subscribed to Aeterna Sanctuary Dossier!',
      description: 'You will receive monthly construction progress reports and blueprint updates.',
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
              <h5 className="font-bold text-white text-sm">Universal Senior Design</h5>
              <p className="text-white/60 text-[11px] mt-0.5">100% barrier-free zero threshold flooring</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">On-Premise Hospital</h5>
              <p className="text-white/60 text-[11px] mt-0.5">ICU triage, pharmacy & geriatric doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#C58F58]/20 text-[#C58F58] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Ayurvedic Rejuvenation</h5>
              <p className="text-white/60 text-[11px] mt-0.5">Panchakarma suites & Kerala Vaidya care</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Phase 1 Early Booking</h5>
              <p className="text-white/60 text-[11px] mt-0.5">Ground floor Suites 01–03 open now</p>
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
                <span className="text-2xl font-serif-heading font-bold text-white">
                  Aeterna<span className="text-[#C58F58]">.</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#C58F58] font-bold">
                  Sanjeevani Sanctuary
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {projectOverview.subtitle}
            </p>

            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C58F58] shrink-0" />
                <span>Sector 2, Sohna Valley Corridor, South Gurgaon, Haryana 122103</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C58F58] shrink-0" />
                <a href={`tel:${projectOverview.siteOfficePhone}`} className="hover:text-white font-mono">
                  {projectOverview.siteOfficePhone} (Project Concierge)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C58F58] shrink-0" />
                <a href={`mailto:${projectOverview.inquiryEmail}`} className="hover:text-white font-mono">
                  {projectOverview.inquiryEmail}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openWhatsApp({ actionType: 'reserve-unit', unitName: 'Residence 01' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-semibold shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on Sales WhatsApp Desk →
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              The Development
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/#location" className="hover:text-white transition-colors">
                  Location & Surroundings
                </Link>
              </li>
              <li>
                <Link href="/#building-vision" className="hover:text-white transition-colors">
                  Architectural Elevation
                </Link>
              </li>
              <li>
                <Link href="/#master-plan" className="hover:text-white transition-colors">
                  Interactive Master Plan
                </Link>
              </li>
              <li>
                <Link href="/#unit-explorer" className="hover:text-white transition-colors">
                  1 RK & 1 BHK Suites
                </Link>
              </li>
              <li>
                <Link href="/#roadmap" className="hover:text-white transition-colors">
                  Construction Milestones
                </Link>
              </li>
              <li>
                <Link href="/#availability" className="hover:text-white transition-colors">
                  Live Unit Inventory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Residences Matrix */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Residences (9 Units)
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center justify-between">
                <Link href="/#unit-explorer" className="hover:text-white font-medium">
                  Residence 01 (1 BHK)
                </Link>
                <span className="text-[10px] text-emerald-400 font-mono">🟢 Phase 1 Open</span>
              </li>
              <li className="flex items-center justify-between">
                <Link href="/#unit-explorer" className="hover:text-white font-medium">
                  Residence 02 (1 RK Studio)
                </Link>
                <span className="text-[10px] text-emerald-400 font-mono">🟢 Phase 1 Open</span>
              </li>
              <li className="flex items-center justify-between">
                <Link href="/#unit-explorer" className="hover:text-white font-medium">
                  Residence 03 (1 BHK Corner)
                </Link>
                <span className="text-[10px] text-emerald-400 font-mono">🟢 Phase 1 Open</span>
              </li>
              <li className="flex items-center justify-between text-white/40">
                <span>Residences 04–06 (Level 1)</span>
                <span className="text-[10px] text-amber-400/70 font-mono">🟡 Phase 2</span>
              </li>
              <li className="flex items-center justify-between text-white/40">
                <span>Residences 07–09 (Level 2)</span>
                <span className="text-[10px] text-amber-400/70 font-mono">🟡 Phase 2</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Dossier Request */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58F58]">
              Architectural Dossier
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Get the latest CAD blueprints, floor elevation updates, and early-bird priority windows in your inbox.
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
                onClick={() => openLeadDrawer({ title: 'Schedule Private Site Walkthrough', actionType: 'book-site-visit' })}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white/80 font-medium transition-colors text-center"
              >
                Schedule Private Site Visit
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Architectural Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#163942] space-y-3 text-[11px] text-white/50 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> {projectOverview.disclaimer} All medical claims, emergency response frameworks, and Ayurvedic doctor consultations are subject to final clinical licensing and statutory approvals before commencement of occupancy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-white/40">
            <div>
              © {new Date().getFullYear()} {projectOverview.legalName}. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Booking</a>
              <a href="#" className="hover:text-white">RERA Dossier</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
