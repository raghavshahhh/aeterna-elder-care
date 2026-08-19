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
  Home,
  MapPin
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
            <span className="text-base sm:text-xl font-serif-heading font-extrabold tracking-tight text-[#0D2329]">
              Senior Living<span className="text-[#C58F58]">.</span>
            </span>
            <span className="hidden md:block text-[8px] uppercase tracking-[0.18em] font-bold text-[#2C5E50]">
              Citizen Foundation · Haryana
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-[#0D2329]">
          <Link
            href="/#location"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Location &amp; Map
          </Link>
          <Link
            href="/#building-vision"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Building Explorer
          </Link>
          <Link
            href="/#master-plan"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Hospital CAD Plans
          </Link>
          <Link
            href="/#availability"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#2C5E50] hover:text-[#1D4B57] transition-colors font-bold flex items-center gap-1"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            64 Plots Map
          </Link>
          <Link
            href="/#unit-explorer"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#0D2329] hover:text-[#2C5E50] transition-colors font-bold flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-[#C58F58]" />
            1 RK &amp; 1 BHK
          </Link>
          <Link
            href="/#ecosystem"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#FAF8F5] text-[#53676E] hover:text-[#0D2329] transition-colors"
          >
            Ayurveda &amp; Mandir
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' })}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2C5E50]/10 hover:bg-[#2C5E50]/20 text-[#2C5E50] text-xs font-bold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Desk</span>
          </button>

          <Button
            size="sm"
            className="bg-[#2C5E50] hover:bg-[#1D4B57] text-white shadow-md text-xs py-2 px-3.5 sm:px-4 font-bold"
            onClick={() => openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
            leftIcon={<Calendar className="w-3.5 h-3.5 text-[#C58F58]" />}
          >
            Book Site Walk
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#0D2329] hover:bg-[#FAF8F5] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 bg-white/95 backdrop-blur-xl border border-[#E8E2D8] rounded-3xl shadow-2xl p-6 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-[#C58F58] text-[#C58F58]" />
              <span className="font-serif-heading font-bold text-sm text-[#0D2329]">
                Senior Living Citizen Foundation
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full text-[#53676E] hover:bg-[#FAF8F5]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-4 space-y-3 text-sm font-semibold text-[#0D2329]">
            <Link
              href="/#location"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5]"
            >
              <span>Real Location &amp; Connectivity</span>
              <span className="text-xs text-[#53676E]">Kheri Asra</span>
            </Link>
            <Link
              href="/#building-vision"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5]"
            >
              <span>Building Explorer (G+2 + Stilt)</span>
              <span className="text-xs text-[#C58F58]">9 Residences</span>
            </Link>
            <Link
              href="/#master-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5]"
            >
              <span>Hospital CAD Floor Plans</span>
              <span className="text-xs text-[#53676E]">30k sq.ft.</span>
            </Link>
            <Link
              href="/#availability"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5] text-[#2C5E50] font-bold"
            >
              <span>64 Plots Master Plan Map</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Available</span>
            </Link>
            <Link
              href="/#unit-explorer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5]"
            >
              <span>1 RK &amp; 1 BHK Residences</span>
              <span className="text-xs text-[#53676E]">Floor Plans</span>
            </Link>
            <Link
              href="/#ecosystem"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5]"
            >
              <span>Healthcare, Ayurveda &amp; Mandir</span>
              <span className="text-xs text-[#53676E]">Pillars</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' });
              }}
              className="w-full py-3.5 rounded-2xl bg-[#2C5E50] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (+91 99999558447)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' });
              }}
              className="w-full py-3 rounded-2xl bg-[#FAF8F5] text-[#0D2329] text-xs font-bold border border-[#E8E2D8] text-center"
            >
              Schedule Private Site Walk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
