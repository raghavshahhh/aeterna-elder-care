'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import { projectOverview } from '@/data/propertyData';
import { cn } from '@/lib/utils';
import {
  Heart,
  Menu,
  X,
  PhoneCall,
  MessageSquare,
  Calendar,
  Compass,
  Building2,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Home
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300 pointer-events-none">
      {/* Floating Rounded Capsule Navbar Container */}
      <div
        className={cn(
          'max-w-7xl mx-auto rounded-full transition-all duration-300 pointer-events-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 border shadow-sm',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-[#E2D7C5] shadow-[0_10px_35px_-5px_rgba(13,35,41,0.12)]'
            : 'bg-white/90 backdrop-blur-md border-[#E8E2D8] shadow-[0_4px_20px_rgba(13,35,41,0.05)]'
        )}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D2329] text-[#FBF9F5] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C58F58] text-[#C58F58] animate-heart-beat" />
          </div>
          <div className="leading-tight">
            <span className="text-lg sm:text-2xl font-serif-heading font-extrabold tracking-tight text-[#0D2329]">
              Aeterna<span className="text-[#C58F58]">.</span>
            </span>
            <span className="hidden md:block text-[8px] uppercase tracking-[0.18em] font-bold text-[#2C5E50]">
              Sanctuary Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-[#0D2329]">
          <Link
            href="/#location"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Location & Nature
          </Link>
          <Link
            href="/#building-vision"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Architecture
          </Link>
          <Link
            href="/#master-plan"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Master Plan
          </Link>
          <Link
            href="/#unit-explorer"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#0D2329] hover:text-[#2C5E50] transition-colors font-bold flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-[#C58F58]" />
            Residences (1 RK / 1 BHK)
          </Link>
          <Link
            href="/#ecosystem"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Healthcare & Ayurveda
          </Link>
          <Link
            href="/#availability"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#2C5E50] hover:text-[#1D4B57] transition-colors font-bold"
          >
            Suites (01–03)
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Site Visit Trigger */}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex border-[#2C5E50] text-[#2C5E50] hover:bg-[#EAF2EE] text-xs font-semibold px-3.5 py-2 rounded-full"
            onClick={() => openLeadDrawer({ title: 'Schedule Private Site & CAD Walkthrough', actionType: 'book-site-visit' })}
            leftIcon={<Calendar className="w-3.5 h-3.5" />}
          >
            Book Site Visit
          </Button>

          {/* Reserve / WhatsApp CTA */}
          <Button
            size="sm"
            className="bg-[#2C5E50] hover:bg-[#1D4B57] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md shadow-[#2C5E50]/20 flex items-center gap-1.5"
            onClick={() => openWhatsApp({ actionType: 'reserve-unit', unitName: 'Residence 01' })}
            leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
          >
            <span className="hidden xs:inline">Reserve</span> Suite (01–03)
          </Button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#0D2329] hover:bg-[#F6F1E8] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto mt-2 max-w-7xl mx-auto rounded-3xl bg-white/98 backdrop-blur-2xl border border-[#E8E2D8] shadow-2xl p-5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-3">
            <div className="pb-3 border-b border-[#E8E2D8] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E50]">
                Property Explorer
              </span>
              <span className="text-[11px] text-[#53676E]">Phase 1 Booking Open</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/#location"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-[#FAF8F5] text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#2C5E50]" /> Location
              </Link>
              <Link
                href="/#building-vision"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-[#FAF8F5] text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[#C58F58]" /> Architecture
              </Link>
              <Link
                href="/#master-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-[#FAF8F5] text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#1D4B57]" /> Master Plan
              </Link>
              <Link
                href="/#unit-explorer"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-[#FAF8F5] text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
              >
                <Home className="w-4 h-4 text-[#2C5E50]" /> 1 RK / 1 BHK
              </Link>
              <Link
                href="/#ecosystem"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-[#FAF8F5] text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C58F58]" /> Healthcare
              </Link>
              <Link
                href="/#availability"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-[#EAF2EE] text-[#2C5E50] font-bold flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Suites (01–03)
              </Link>
            </div>

            <div className="pt-3 border-t border-[#E8E2D8] flex flex-col gap-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-[#2C5E50] hover:bg-[#1D4B57] text-white py-3.5 text-xs font-bold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp({ actionType: 'reserve-unit', unitName: 'Residence 01' });
                }}
              >
                Reserve Unit 01 / 02 / 03 on WhatsApp →
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-[#2C5E50] text-[#2C5E50] py-3 text-xs font-semibold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLeadDrawer({ title: 'Schedule Private Site & CAD Walkthrough', actionType: 'book-site-visit' });
                }}
              >
                Schedule Site Visit Walkthrough
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
