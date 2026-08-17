'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Radio,
  Cpu,
  Tv,
  Stethoscope,
  Activity,
  UserCheck,
  BookOpen,
  HelpCircle,
  Clock,
  Compass,
  Users,
  Building2,
  Lock,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openEmergency, openWhatsApp, openLeadDrawer } = useModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuKey: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
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
              Elder Care & Dignity
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Rich Dropdowns */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* 1. SERVICES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer',
                pathname.startsWith('/services') || activeDropdown === 'services'
                  ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                  : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
              )}
            >
              <span>Services</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  activeDropdown === 'services' && 'rotate-180'
                )}
              />
            </button>

            {/* Mega Dropdown Menu: Services */}
            {activeDropdown === 'services' && (
              <div className="absolute top-full left-0 w-[640px] bg-white rounded-3xl p-6 shadow-2xl border border-[#E8E2D8] mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-2 gap-3 mb-4 max-h-[380px] overflow-y-auto pr-1">
                  {servicesData.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="p-3 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E2D7C5] transition-all group/item flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center shrink-0 group-hover/item:bg-[#0D2329] group-hover/item:text-white transition-colors">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0D2329] group-hover/item:text-[#2C5E50] transition-colors truncate">
                          {service.title}
                        </h4>
                        <p className="text-[11px] text-[#53676E] line-clamp-1 mt-0.5">
                          {service.shortDescription}
                        </p>
                        <span className="text-[10px] text-[#C58F58] font-bold mt-1 inline-block">
                          From {service.startingPrice} {service.priceUnit}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#53676E]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Police Verified & NABH Standard Care</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/book"
                      className="font-bold text-[#0D2329] hover:underline"
                    >
                      Book Service →
                    </Link>
                    <Link
                      href="/services"
                      className="font-bold text-[#C58F58] hover:underline flex items-center gap-1"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. ECOSYSTEM & SAFETY DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('safety')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'safety' ? null : 'safety')}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer',
                pathname === '/devices' || pathname === '/how-it-works' || activeDropdown === 'safety'
                  ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                  : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
              )}
            >
              <span>Safety & Tech</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  activeDropdown === 'safety' && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown Menu: Safety & Tech */}
            {activeDropdown === 'safety' && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-3xl p-5 shadow-2xl border border-[#E8E2D8] mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-2">
                <Link
                  href="/devices"
                  className="p-3 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E2D7C5] transition-all flex items-start gap-3 group/item"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#C58F58] flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0D2329] group-hover/item:text-[#2C5E50] block">
                      Smart Fall Radars & SOS
                    </strong>
                    <span className="text-[11px] text-[#53676E] block mt-0.5">
                      Zero-camera millimeter wave ceiling sensors
                    </span>
                  </div>
                </Link>

                <Link
                  href="/how-it-works"
                  className="p-3 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E2D7C5] transition-all flex items-start gap-3 group/item"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0D2329] group-hover/item:text-[#2C5E50] block">
                      4-Stage Clinical Protocol
                    </strong>
                    <span className="text-[11px] text-[#53676E] block mt-0.5">
                      Diagnostic matching, biometric audit, & vitals sync
                    </span>
                  </div>
                </Link>

                <Link
                  href="/find-care"
                  className="p-3 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E2D7C5] transition-all flex items-start gap-3 group/item"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0D2329] group-hover/item:text-[#2C5E50] block">
                      Find Right Care (60s)
                    </strong>
                    <span className="text-[11px] text-[#53676E] block mt-0.5">
                      Interactive care matching wizard
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 3. CLUB AETERNA (DAILY LIVE SHOWS) */}
          <Link
            href="/community"
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5',
              pathname === '/community'
                ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
            )}
          >
            <span>Club Aeterna</span>
            <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded-full animate-pulse">
              LIVE
            </span>
          </Link>

          {/* 4. 12 CITIES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('locations')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer',
                pathname.startsWith('/locations') || activeDropdown === 'locations'
                  ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                  : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
              )}
            >
              <span>12 Cities</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  activeDropdown === 'locations' && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown Menu: Locations */}
            {activeDropdown === 'locations' && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-3xl p-5 shadow-2xl border border-[#E8E2D8] mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#53676E] mb-2 px-2">
                  Active Emergency Metro Hubs
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-56 overflow-y-auto pr-1">
                  {locationsData.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.slug}`}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#0D2329] hover:bg-[#EAF2EE] hover:text-[#2C5E50] transition-colors"
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
                    <span>View All 12 Metro Hubs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 5. ABOUT & MORE DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('more')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer',
                pathname === '/about' || pathname === '/resources' || pathname === '/contact' || activeDropdown === 'more'
                  ? 'text-[#0D2329] font-bold bg-[#EAF2EE]'
                  : 'text-[#1D4B57] hover:text-[#0D2329] hover:bg-[#F6F1E8]'
              )}
            >
              <span>About & More</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  activeDropdown === 'more' && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown Menu: More */}
            {activeDropdown === 'more' && (
              <div className="absolute top-full right-0 w-72 bg-white rounded-3xl p-4 shadow-2xl border border-[#E8E2D8] mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">
                <Link
                  href="/about"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5 text-[#2C5E50]" />
                  <span>About Us & Medical Board</span>
                </Link>
                <Link
                  href="/resources"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#2C5E50]" />
                  <span>Elder Health Guides & Blog</span>
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#2C5E50]" />
                  <span>Contact & 24/7 Helplines</span>
                </Link>
                <Link
                  href="/portal"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0D2329] hover:bg-[#EAF2EE] flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#2C5E50]" />
                  <span>Family Portal Login</span>
                </Link>
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#53676E] hover:bg-[#F6F1E8] flex items-center gap-2 border-t border-[#E8E2D8] mt-1 pt-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#53676E]" />
                  <span>Admin Management Desk</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Action Button Group */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* WhatsApp Desk Button */}
          <button
            onClick={() => openWhatsApp({ service: 'General Elder Care Inquiry' })}
            className="px-3 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Chat with Doctor Desk on WhatsApp"
            aria-label="WhatsApp Care Desk"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xl:inline">WhatsApp</span>
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={() => openEmergency()}
            className="px-3.5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer animate-sos-pulse"
            title="Immediate Emergency Ambulance & Doctor Dispatch"
          >
            <Siren className="w-3.5 h-3.5" />
            <span>Emergency SOS</span>
          </button>

          {/* Primary Find Care (60s) Button */}
          <Link href="/find-care">
            <button className="px-4 py-2 rounded-full bg-[#0D2329] hover:bg-[#163942] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:shadow-md cursor-pointer">
              <span>Find Care (60s)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>

        {/* Mobile Burger Menu Button */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            onClick={() => openEmergency()}
            className="px-2.5 py-1.5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center gap-1"
          >
            <Siren className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-[#F6F1E8] text-[#0D2329] hover:bg-[#EAF2EE] transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full Screen Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-3 top-16 max-h-[85vh] bg-white rounded-3xl border border-[#E8E2D8] shadow-2xl p-5 overflow-y-auto z-50 pointer-events-auto animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-4">
            <Link
              href="/find-care"
              className="block w-full p-3.5 rounded-2xl bg-[#0D2329] text-white font-bold text-center text-xs shadow-md"
            >
              ✨ Find Right Care in 60 Seconds →
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/book"
                className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E2D7C5] text-center text-xs font-bold text-[#0D2329]"
              >
                📅 Book Service
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            </div>

            <div className="border-t border-[#E8E2D8] pt-3 space-y-1 text-xs">
              <div className="font-bold uppercase tracking-wider text-[#53676E] px-2 mb-1">
                Explore Care
              </div>
              <Link
                href="/services"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                All 10 Clinical Services
              </Link>
              <Link
                href="/community"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE] flex items-center justify-between"
              >
                <span>Club Aeterna (Daily Live TV)</span>
                <span className="text-[9px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">LIVE</span>
              </Link>
              <Link
                href="/devices"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Smart IoT Fall Radars & SOS
              </Link>
              <Link
                href="/how-it-works"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                How It Works & Safety
              </Link>
              <Link
                href="/locations"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                12 Metro Operational Hubs
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                About Us & Medical Board
              </Link>
              <Link
                href="/resources"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Elder Health Blog & Guides
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-xl font-semibold text-[#0D2329] hover:bg-[#EAF2EE]"
              >
                Contact & 24/7 Helplines
              </Link>
              <Link
                href="/portal"
                className="block px-3 py-2 rounded-xl font-semibold text-[#2C5E50] hover:bg-[#EAF2EE]"
              >
                Family Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
