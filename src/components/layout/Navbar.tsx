'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { servicesData } from '@/data/servicesData';
import { locationsData } from '@/data/locationsData';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  Heart,
  Siren,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Sparkles,
  Radio
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openEmergency, openWhatsApp, openLeadDrawer } = useModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [locationsDropdown, setLocationsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setLocationsDropdown(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 w-full',
        isScrolled
          ? 'glass-header shadow-[0_4px_24px_rgba(13,35,41,0.06)] py-2.5'
          : 'bg-[#FBF9F5] border-b border-[#E8E2D8] py-3.5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-[#0D2329] text-[#FBF9F5] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-[#C58F58] text-[#C58F58] animate-heart-beat" />
          </div>
          <div className="leading-tight">
            <span className="text-xl sm:text-2xl font-serif-heading font-extrabold tracking-tight text-[#0D2329]">
              Aeterna<span className="text-[#C58F58]">.</span>
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.16em] font-bold text-[#2C5E50]">
              Elder Care & Dignity
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <Link
              href="/services"
              className={cn(
                'flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
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
              <div className="absolute top-full left-0 w-[580px] bg-white rounded-3xl p-6 shadow-2xl border border-[#E8E2D8] mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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

                <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                  <span className="text-[#5C6F75]">100% Verified Indian Doctors & B.Sc. Nurses</span>
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

          {/* Club Aeterna (Daily Live Shows) */}
          <Link
            href="/community"
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5',
              pathname === '/community'
                ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
            )}
          >
            <span>Club Aeterna</span>
            <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded-full">
              LIVE
            </span>
          </Link>

          {/* Smart Safety Devices */}
          <Link
            href="/devices"
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
              pathname === '/devices'
                ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
            )}
          >
            Smart Safety
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
                'flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
                pathname.startsWith('/locations')
                  ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                  : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
              )}
            >
              <span>12 Cities</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  locationsDropdown && 'rotate-180'
                )}
              />
            </Link>

            {/* Locations Dropdown Menu */}
            {locationsDropdown && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-3xl p-5 shadow-2xl border border-[#E8E2D8] mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5C6F75] mb-2 px-2">
                  Active Regional Hubs
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto pr-1">
                  {locationsData.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.slug}`}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#0D2329] hover:bg-[#EAF2EE] hover:text-[#3D685A] transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-[#E8E2D8]">
                  <Link
                    href="/locations"
                    className="text-xs font-bold text-[#C58F58] hover:underline flex items-center justify-between px-2"
                  >
                    <span>View All 12 Hubs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

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
            About Us
          </Link>
        </nav>

        {/* Desktop CTA Action Group */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* WhatsApp Direct */}
          <button
            onClick={() => openWhatsApp()}
            className="p-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-bold px-3.5"
            title="Chat on WhatsApp Desk"
            aria-label="WhatsApp Care Desk"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">WhatsApp</span>
          </button>

          {/* Emergency SOS Button */}
          <Button
            variant="emergency"
            size="sm"
            onClick={() => openEmergency()}
            leftIcon={<Siren className="w-4 h-4" />}
            className="px-3 text-xs"
            title="Immediate Emergency Ambulance & Doctor Dispatch"
          >
            Emergency SOS
          </Button>

          {/* Primary "Find Care" CTA */}
          <Link href="/find-care">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#0D2329] hover:bg-[#163942] text-white shadow-sm font-bold text-xs px-4"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Find Care (60s)
            </Button>
          </Link>
        </div>

        {/* Mobile Burger Menu Button */}
        <div className="flex items-center gap-2 xl:hidden">
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
        <div className="xl:hidden fixed inset-x-0 top-[68px] bottom-0 bg-[#FBF9F5] border-t border-[#E8E2D8] p-6 overflow-y-auto z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            <Link
              href="/find-care"
              className="block w-full p-4 rounded-2xl bg-[#0D2329] text-white font-bold text-center text-sm shadow-md"
            >
              ✨ Find Right Care in 60 Seconds →
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-1">
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
                Care Directory
              </div>
              <Link
                href="/services"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                All 10 Clinical Services
              </Link>
              <Link
                href="/community"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE] flex items-center justify-between"
              >
                <span>Club Aeterna (Daily Live Shows)</span>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">LIVE</span>
              </Link>
              <Link
                href="/devices"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Smart IoT & Fall Safety Devices
              </Link>
              <Link
                href="/how-it-works"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                How It Works & Safety Protocols
              </Link>
              <Link
                href="/locations"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                12 Major Metro Cities
              </Link>
              <Link
                href="/resources"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Senior Health Guides
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                About Clinical Advisory Board
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Contact & Helplines
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
