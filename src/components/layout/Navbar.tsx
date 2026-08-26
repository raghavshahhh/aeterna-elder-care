'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Calendar,
  ChevronDown,
  Building2,
  Home,
  MapPin,
  Sparkles,
  Award,
  Activity,
  Layers,
  ArrowRight,
  CreditCard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openLeadDrawer } = useModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setLocationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLocationsOpen(false);
  }, [pathname]);

  if (
    pathname?.startsWith('/owner') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/portal')
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 w-full px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300">
      {/* Floating Rounded Capsule Navbar Container */}
      <div
        ref={navRef}
        className={cn(
          'max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 border shadow-sm relative',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-[#E2D7C5] shadow-[0_10px_35px_-5px_rgba(13,35,41,0.12)]'
            : 'bg-white/90 backdrop-blur-md border-[#E8E2D8] shadow-[0_4px_20px_rgba(13,35,41,0.05)]'
        )}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <img
            src="/project-assets/brand/logo-icon.png"
            alt="Senior Living Citizen Foundation"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="leading-tight">
            <span className="text-base sm:text-xl font-serif-heading font-extrabold tracking-tight text-[#0D2329]">
              Senior Living<span className="text-[#C58F58]">.</span>
            </span>
            <span className="hidden md:block text-[8px] uppercase tracking-[0.18em] font-bold text-[#2C5E50]">
              Citizen Foundation · National
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-semibold text-[#0D2329]">
          <Link
            href="/"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Home
          </Link>

          {/* Locations Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className={cn(
                'px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer',
                pathname?.startsWith('/locations') || pathname?.startsWith('/projects')
                  ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]'
                  : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
              )}
            >
              <span>Sanctuaries</span>
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', locationsOpen && 'rotate-180')} />
            </button>

            {locationsOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 rounded-3xl bg-white border border-[#E8E2D8] shadow-2xl p-3 space-y-1 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-[#53676E] font-bold">
                  Active &amp; Upcoming Communities
                </div>

                <Link
                  href="/projects/kheri-asra"
                  onClick={() => setLocationsOpen(false)}
                  className="p-3 rounded-2xl hover:bg-[#FAF8F5] transition-colors flex items-start gap-3 group block"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#0D2329] group-hover:text-[#2C5E50]">
                        Haryana (Delhi NCR)
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-800 text-[8px] font-mono font-bold">
                        Pre-Launch
                      </span>
                    </div>
                    <p className="text-[11px] text-[#53676E]">64 Plots &amp; G+2 Senior Residences</p>
                  </div>
                </Link>

                <Link
                  href="/projects/goa-residence"
                  onClick={() => setLocationsOpen(false)}
                  className="p-3 rounded-2xl hover:bg-[#FAF8F5] transition-colors flex items-start gap-3 group block"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FAF2EB] text-[#C58F58] flex items-center justify-center shrink-0 mt-0.5">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#0D2329] group-hover:text-[#C58F58]">
                        Goa (Coastal Haven)
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 text-[8px] font-mono font-bold">
                        Ready to Move
                      </span>
                    </div>
                    <p className="text-[11px] text-[#53676E]">Assisted Suites &amp; Daily Nursing</p>
                  </div>
                </Link>

                <div className="pt-2 border-t border-[#E8E2D8]">
                  <Link
                    href="/locations"
                    onClick={() => setLocationsOpen(false)}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#EAF2EE] text-xs font-bold text-[#2C5E50] flex items-center justify-between transition-colors font-mono"
                  >
                    <span>View All Sanctuaries</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/apartments"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/apartments' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Residences
          </Link>

          <Link
            href="/plots"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/plots' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Plots
          </Link>

          <Link
            href="/amenities"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/amenities' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Care &amp; Wellness
          </Link>

          <Link
            href="/finance"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/finance' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Finance &amp; Returns
          </Link>

          <Link
            href="/documents"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/documents' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Trust Center
          </Link>

          <Link
            href="/referrals"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5',
              pathname === '/referrals' ? 'text-[#C58F58] font-bold bg-[#FAF2EB]' : 'text-[#C58F58] hover:bg-[#FAF2EB]'
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>Referrals (₹50)</span>
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+919999955847"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-bold text-[#0D2329] hover:border-[#2C5E50] transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-[#C58F58]" />
            <span>+91 99999 55847</span>
          </a>

          <Link
            href="/buyer"
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-mono font-bold text-[#0D2329] transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>Buyer Portal</span>
          </Link>

          <button
            onClick={() => openLeadDrawer({ actionType: 'site_visit' })}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E0AB77]" />
            <span>Book Visit</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-[#FAF8F5] text-[#0D2329] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-3 top-20 bg-white rounded-3xl border border-[#E8E2D8] shadow-2xl p-6 space-y-4 z-40 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="space-y-1 text-sm font-semibold text-[#0D2329]">
            <Link href="/" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5]">
              Home
            </Link>
            <Link href="/locations" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5] text-[#2C5E50] font-bold">
              Explore Sanctuaries (Haryana &amp; Goa)
            </Link>
            <Link href="/apartments" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5]">
              Residences (1 RK / 1 BHK)
            </Link>
            <Link href="/plots" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5]">
              Freehold Plots (64 Plots)
            </Link>
            <Link href="/amenities" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5]">
              Care &amp; Wellness
            </Link>
            <Link href="/finance" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5]">
              Finance &amp; Returns (₹25L Plan)
            </Link>
            <Link href="/documents" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5]">
              Trust Center &amp; Legal
            </Link>
            <Link href="/payment-terms" className="block py-2.5 px-4 rounded-xl hover:bg-[#FAF8F5] text-xs font-mono text-[#0D2329]/80">
              Commercial &amp; Payment Terms
            </Link>
            <Link href="/buyer" className="block py-2.5 px-4 rounded-xl bg-[#EAF2EE] text-[#2C5E50] font-bold">
              Buyer Portal &amp; Receipts
            </Link>
            <Link href="/referrals" className="block py-2.5 px-4 rounded-xl bg-[#FAF2EB] text-[#C58F58] font-bold">
              Referral Program (₹50 per Lead)
            </Link>
          </div>

          <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
            <a
              href="tel:+919999955847"
              className="w-full py-3 rounded-2xl bg-[#FAF8F5] text-[#0D2329] font-bold text-xs flex items-center justify-center gap-2 border border-[#E8E2D8]"
            >
              <PhoneCall className="w-4 h-4 text-[#C58F58]" />
              <span>Call Desk: +91 99999 55847</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
