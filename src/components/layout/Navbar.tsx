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
  BadgePercent,
  Activity,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openLeadDrawer } = useModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'project' | 'info' | null>(null);

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
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: 'project' | 'info') => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  if (pathname?.startsWith('/owner')) return null;

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300">
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
              Citizen Foundation · Haryana
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
            href="/gallery"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/gallery' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Gallery
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
            href="/location"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/location' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Location
          </Link>

          <Link
            href="/finance"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              pathname === '/finance' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            Finance
          </Link>

          <Link
            href="/documents"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5',
              pathname === '/documents' ? 'text-[#2C5E50] font-bold bg-[#EAF2EE]' : 'text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]'
            )}
          >
            <span>Trust Center</span>
          </Link>

          <Link
            href="/contact"
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
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
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#0D2329] hover:bg-[#FAF8F5] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 bg-white/98 backdrop-blur-2xl border border-[#E8E2D8] rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-[#C58F58] text-[#C58F58]" />
              <span className="font-serif-heading font-bold text-sm text-[#0D2329]">
                Senior Living Citizen Foundation
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-2 text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              Home
            </Link>

            <Link
              href="/apartments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              <Home className="w-4 h-4 text-[#C58F58]" />
              <span>Residences (1 BHK &amp; 1 RK)</span>
            </Link>

            <Link
              href="/plots"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              <Layers className="w-4 h-4 text-[#2C5E50]" />
              <span>Plots (64 Freehold Plots)</span>
            </Link>

            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              <MapPin className="w-4 h-4 text-[#C58F58]" />
              <span>Gallery (Real Drone &amp; Site Evidence)</span>
            </Link>

            <Link
              href="/amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Care &amp; Wellness (Hospital &amp; Mandir)</span>
            </Link>

            <Link
              href="/location"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              <MapPin className="w-4 h-4 text-[#C58F58]" />
              <span>Location &amp; Map (SH-22 Jhajjar)</span>
            </Link>

            <Link
              href="/finance"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              <BadgePercent className="w-4 h-4 text-[#2C5E50]" />
              <span>Finance &amp; Payment Plans</span>
            </Link>

            <Link
              href="/documents"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#C58F58]" />
              <span>Trust Center (Public Records)</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] text-xs text-[#53676E]"
            >
              About the Foundation
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-[#0D2329] hover:bg-[#FAF8F5] text-xs text-[#53676E]"
            >
              Contact &amp; Site Office
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
            <a
              href={`tel:${projectOverview.siteOfficePhone}`}
              className="w-full py-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#0D2329] text-xs font-mono font-bold text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#C58F58]" />
              Call: {projectOverview.siteOfficePhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
