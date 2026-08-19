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
  ChevronDown,
  Building2,
  Home,
  MapPin,
  Sparkles,
  BadgePercent,
  Activity,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);

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
    setProjectDropdownOpen(false);
    setInfoDropdownOpen(false);
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
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C58F58] text-[#C58F58]" />
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
            href="/"
            className={cn(
              'px-3.5 py-1.5 rounded-full transition-colors',
              pathname === '/' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={cn(
              'px-3.5 py-1.5 rounded-full transition-colors',
              pathname === '/about' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            About Us
          </Link>

          {/* Project Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProjectDropdownOpen(true)}
            onMouseLeave={() => setProjectDropdownOpen(false)}
          >
            <button
              className={cn(
                'px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1',
                ['/plots', '/apartments', '/amenities', '/location'].includes(pathname)
                  ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]'
                  : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
              )}
            >
              <span>Project</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {projectDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl border border-[#E8E2D8] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/plots"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#0D2329] hover:bg-[#FAF8F5] hover:text-[#2C5E50] transition-colors"
                >
                  <span>🏡</span>
                  <span>Plots &amp; Inventory</span>
                </Link>
                <Link
                  href="/apartments"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#0D2329] hover:bg-[#FAF8F5] hover:text-[#2C5E50] transition-colors"
                >
                  <span>🏢</span>
                  <span>Apartments (1 BHK/1 RK)</span>
                </Link>
                <Link
                  href="/amenities"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#0D2329] hover:bg-[#FAF8F5] hover:text-[#2C5E50] transition-colors"
                >
                  <span>🏥</span>
                  <span>Amenities &amp; Hospital</span>
                </Link>
                <Link
                  href="/location"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#0D2329] hover:bg-[#FAF8F5] hover:text-[#2C5E50] transition-colors"
                >
                  <span>📍</span>
                  <span>Location &amp; Connectivity</span>
                </Link>
              </div>
            )}
          </div>

          {/* Info Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setInfoDropdownOpen(true)}
            onMouseLeave={() => setInfoDropdownOpen(false)}
          >
            <button
              className={cn(
                'px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1',
                ['/finance', '/benefits'].includes(pathname)
                  ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]'
                  : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
              )}
            >
              <span>Info</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {infoDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl border border-[#E8E2D8] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/finance"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#0D2329] hover:bg-[#FAF8F5] hover:text-[#2C5E50] transition-colors"
                >
                  <span>💰</span>
                  <span>Finance Available</span>
                </Link>
                <Link
                  href="/benefits"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#0D2329] hover:bg-[#FAF8F5] hover:text-[#2C5E50] transition-colors"
                >
                  <span>✨</span>
                  <span>8 Core Benefits</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={cn(
              'px-3.5 py-1.5 rounded-full transition-colors',
              pathname === '/contact' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${projectOverview.siteOfficePhone}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#EAF2EE] text-[#0D2329] text-xs font-mono font-bold transition-colors border border-[#E8E2D8]"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>{projectOverview.siteOfficePhone}</span>
          </a>

          <Button
            size="sm"
            className="bg-[#2C5E50] hover:bg-[#1D4B57] text-white shadow-md text-xs py-2 px-3.5 sm:px-4 font-bold"
            onClick={() => openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' })}
            leftIcon={<Calendar className="w-3.5 h-3.5 text-[#C58F58]" />}
          >
            Book Visit
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
              className="p-1 rounded-lg text-[#53676E] hover:text-[#0D2329]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-2 text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              About Us
            </Link>
            <div className="pt-2 border-t border-[#E8E2D8] text-[10px] font-mono uppercase tracking-widest text-[#53676E] px-3">
              Project
            </div>
            <Link
              href="/plots"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              🏡 Plots &amp; Inventory (64 Plots)
            </Link>
            <Link
              href="/apartments"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              🏢 Apartments (1 BHK / 1 RK)
            </Link>
            <Link
              href="/amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              🏥 Amenities &amp; 30k Sqft Hospital
            </Link>
            <Link
              href="/location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              📍 Location (Reliance MET City, SH-22)
            </Link>

            <div className="pt-2 border-t border-[#E8E2D8] text-[10px] font-mono uppercase tracking-widest text-[#53676E] px-3">
              Information
            </div>
            <Link
              href="/finance"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              💰 Finance &amp; Home Loans
            </Link>
            <Link
              href="/benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              ✨ 8 Core Benefits
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-[#E8E2D8] flex flex-col gap-2">
            <Button
              className="w-full bg-[#2C5E50] hover:bg-[#1D4B57] text-white py-3 text-xs font-bold"
              onClick={() => {
                setMobileMenuOpen(false);
                openLeadDrawer({ title: 'Schedule Site Visit to Kheri Asra, Jhajjar', actionType: 'book-site-visit' });
              }}
            >
              Book a Site Visit
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#2C5E50] text-[#2C5E50] py-3 text-xs font-bold"
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp({ actionType: 'general', message: 'Hello, I want to inquire about Senior Living Citizen Foundation...' });
              }}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
