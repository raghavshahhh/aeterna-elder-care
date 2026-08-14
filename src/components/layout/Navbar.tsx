'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/servicesData';
import { carePlansData } from '@/data/plansData';
import { locationsData } from '@/data/locationsData';
import {
  Heart,
  Siren,
  ChevronDown,
  Menu,
  X,
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Stethoscope,
  Activity,
  Brain,
  BedDouble,
  Clock,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openEmergency, openWhatsApp } = useModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [locationsDropdown, setLocationsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setLocationsDropdown(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'glass-header shadow-[0_4px_24px_rgba(13,35,41,0.06)] py-3'
          : 'bg-[#FBF9F5] border-b border-[#E8E2D8] py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-2xl bg-[#0D2329] text-[#FBF9F5] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-[#C58F58] text-[#C58F58]" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-serif-heading font-extrabold tracking-tight text-[#0D2329]">
              Aeterna<span className="text-[#C58F58]">.</span>
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] font-semibold text-[#5C6F75] -mt-1">
              Senior Healthcare
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <Link
              href="/services"
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
                pathname.startsWith('/services')
                  ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                  : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
              )}
            >
              <span>Services</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  servicesDropdown && 'rotate-180'
                )}
              />
            </Link>

            {/* Services Mega Dropdown */}
            {servicesDropdown && (
              <div className="absolute top-full left-0 w-[580px] bg-white rounded-3xl p-6 shadow-2xl border border-[#E8E2D8] mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {servicesData.slice(0, 6).map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="p-3 rounded-2xl hover:bg-[#FBF9F5] border border-transparent hover:border-[#E8E2D8] transition-all group/item"
                    >
                      <h4 className="text-xs font-bold text-[#0D2329] group-hover/item:text-[#3D685A] transition-colors line-clamp-1">
                        {service.title}
                      </h4>
                      <p className="text-[11px] text-[#5C6F75] mt-0.5 line-clamp-1">
                        {service.shortDescription}
                      </p>
                      <span className="text-[10px] text-[#C58F58] font-semibold mt-1 inline-block">
                        From {service.startingPrice}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                  <span className="text-[#5C6F75]">100% Background-Verified Clinical Team</span>
                  <Link
                    href="/services"
                    className="font-bold text-[#0D2329] hover:text-[#C58F58] inline-flex items-center gap-1"
                  >
                    <span>View All 10 Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Care Plans */}
          <Link
            href="/plans"
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
              pathname === '/plans'
                ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
            )}
          >
            Care Plans
          </Link>

          {/* How it Works */}
          <Link
            href="/how-it-works"
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
              pathname === '/how-it-works'
                ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
            )}
          >
            How It Works
          </Link>

          {/* Locations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLocationsDropdown(true)}
            onMouseLeave={() => setLocationsDropdown(false)}
          >
            <Link
              href="/locations"
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
                pathname.startsWith('/locations')
                  ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                  : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
              )}
            >
              <span>Locations</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  locationsDropdown && 'rotate-180'
                )}
              />
            </Link>

            {/* Locations Dropdown Menu */}
            {locationsDropdown && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-3xl p-5 shadow-2xl border border-[#E8E2D8] mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5C6F75] mb-3 px-2">
                  Operational in 12 Metros
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto pr-1">
                  {locationsData.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.slug}`}
                      className="px-2.5 py-2 rounded-xl text-xs font-medium text-[#0D2329] hover:bg-[#EAF2EE] hover:text-[#3D685A] transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#E8E2D8]">
                  <Link
                    href="/locations"
                    className="text-xs font-bold text-[#C58F58] hover:underline flex items-center justify-between px-2"
                  >
                    <span>View All Cities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
          <Link
            href="/resources"
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
              pathname.startsWith('/resources')
                ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
            )}
          >
            Resources
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
              pathname === '/about'
                ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
            )}
          >
            About
          </Link>
        </nav>

        {/* Desktop CTA Action Group */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Emergency SOS Button */}
          <Button
            variant="emergency"
            size="sm"
            onClick={() => openEmergency()}
            leftIcon={<Siren className="w-4 h-4" />}
            className="px-3"
            title="Immediate Emergency Ambulance & Doctor Dispatch"
          >
            Emergency SOS
          </Button>

          {/* WhatsApp Direct */}
          <button
            onClick={() => openWhatsApp()}
            className="p-2.5 rounded-full bg-[#EAF2EE] hover:bg-emerald-100 text-emerald-800 transition-colors"
            title="Chat with Care Manager on WhatsApp"
            aria-label="WhatsApp Care Desk"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Book Service */}
          <Link href="/book">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              Book Service
            </Button>
          </Link>

          {/* Primary "Find Care" CTA */}
          <Link href="/find-care">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#0D2329] hover:bg-[#163942] text-white shadow-sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Find Care
            </Button>
          </Link>
        </div>

        {/* Mobile Burger Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="emergency"
            size="sm"
            onClick={() => openEmergency()}
            className="px-3 py-1 text-xs"
          >
            <Siren className="w-3.5 h-3.5" />
            <span>SOS</span>
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-2xl bg-[#F6F1E8] text-[#0D2329] hover:bg-[#EAF2EE] transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#FBF9F5] border-t border-[#E8E2D8] p-6 overflow-y-auto z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            <Link
              href="/find-care"
              className="block w-full p-4 rounded-2xl bg-[#0D2329] text-white font-bold text-center text-sm shadow-md"
            >
              ✨ Find Right Care in 60 Seconds →
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/book"
                className="p-3.5 rounded-2xl bg-white border border-[#E2D7C5] text-center text-xs font-bold text-[#0D2329]"
              >
                📅 Book Service
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </button>
            </div>

            <div className="border-t border-[#E8E2D8] pt-4 space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#5C6F75] px-3 mb-2">
                Navigation
              </div>
              <Link
                href="/services"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                All Services & Clinical Care
              </Link>
              <Link
                href="/plans"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Care Plans & Pricing
              </Link>
              <Link
                href="/how-it-works"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                How It Works & Safety
              </Link>
              <Link
                href="/locations"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Cities & Coverage Areas
              </Link>
              <Link
                href="/resources"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Health Resources & Blog
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                About Our Clinical Board
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Contact & Helplines
              </Link>
            </div>

            <div className="border-t border-[#E8E2D8] pt-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#5C6F75] px-3 mb-1">
                Portals & Demos
              </div>
              <Link
                href="/portal"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#1D4B57] bg-white border border-[#E8E2D8]"
              >
                <span>Family Care Portal</span>
                <ShieldCheck className="w-4 h-4 text-[#C58F58]" />
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#1D4B57] bg-white border border-[#E8E2D8]"
              >
                <span>Admin & CRM Pipeline</span>
                <UserCheck className="w-4 h-4 text-[#3D685A]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
