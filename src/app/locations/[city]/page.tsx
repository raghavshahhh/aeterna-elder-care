'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { locationsData } from '@/data/locationsData';
import { servicesData } from '@/data/servicesData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { useModal } from '@/context/ModalContext';
import {
  MapPin,
  Phone,
  Building2,
  Clock,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ChevronRight,
  Siren
} from 'lucide-react';

interface LocationDetailPageProps {
  params: Promise<{ city: string }>;
}

export default function LocationDetailPage({ params }: LocationDetailPageProps) {
  const resolvedParams = use(params);
  const { openWhatsApp, openEmergency, openLeadDrawer } = useModal();

  const location = locationsData.find((l) => l.slug === resolvedParams.city);

  if (!location) {
    notFound();
  }

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F6F1E8] border-b border-[#E8E2D8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#5C6F75]">
          <Link href="/" className="hover:text-[#0D2329]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/locations" className="hover:text-[#0D2329]">
            Locations
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#0D2329]">{location.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-14 border border-[#1C4550] shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold" size="md">
                {location.region} Zonal Hub
              </Badge>
              <span className="text-xs bg-red-600 px-3 py-1 rounded-full font-bold">
                &lt; {location.avgResponseTimeMin} Mins Emergency Response
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white">
              Elder Care & Home Nursing in {location.name}
            </h1>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
              {location.familiesServed}+ families across {location.name} rely on Aeterna Care for certified ICU nurses, live-in attendants, doctor visits, and 24/7 cardiac ambulance support.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-xl sm:text-2xl font-bold text-white">{location.activeCaregivers}+</span>
                <span className="text-white/60 text-[11px]">Active Staff</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-xl sm:text-2xl font-bold text-white">{location.partnerHospitals}</span>
                <span className="text-white/60 text-[11px]">Partner Hospitals</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-xl sm:text-2xl font-bold text-white">{location.familiesServed}+</span>
                <span className="text-white/60 text-[11px]">Happy Elders</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href={`/book?city=${encodeURIComponent(location.name)}`}>
                <Button variant="gold" size="lg" className="font-bold">
                  Book Care in {location.name} →
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => openWhatsApp({ city: location.name })}
                leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
                className="text-white border-white/30 hover:bg-white/10"
              >
                Chat on {location.name} Desk
              </Button>
            </div>
          </div>

          {/* Lead Coordinator Box */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C58F58] block">
              Zonal Clinical Operations Head
            </span>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-[#C58F58]">
                <Image
                  src={location.leadCoordinator.photo}
                  alt={location.leadCoordinator.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">{location.leadCoordinator.name}</h4>
                <p className="text-xs text-white/70">{location.leadCoordinator.title}</p>
                <span className="text-xs text-[#C58F58] font-mono mt-1 block">
                  Direct Line: {location.leadCoordinator.phone}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs text-white/80 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C58F58] shrink-0 mt-0.5" />
                <span>{location.localHubAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Local Helpline: <strong>{location.helpline}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Covered Localities / Sectors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <Badge variant="sage" size="sm">
            Coverage Map
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            Covered Localities & Neighborhoods in {location.name}
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Our caregivers and ambulances provide complete doorstep coverage across these zones:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {location.coveredLocalities.map((loc, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-[#E8E2D8] text-xs font-medium text-[#0D2329] flex items-center gap-2 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{loc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Hospitals in this City */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <Badge variant="gold" size="sm">
            Emergency Network
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            Partner Tertiary Hospitals in {location.name}
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Seamless bed reservations and green-channel ER admissions via Aeterna Care Advocates:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {location.partnerHospitalList.map((hosp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EAF2EE] text-[#285244]">
                {hosp.accreditation}
              </span>
              <h4 className="font-bold text-sm text-[#0D2329]">{hosp.name}</h4>
              <p className="text-xs text-[#5C6F75]">{hosp.speciality}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
          What Families in {location.name} Say
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {location.localTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F9F6F0] rounded-3xl p-6 sm:p-8 border border-[#E2D7C5] space-y-4"
            >
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[#0D2329] italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-2 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#0D2329] block">{t.author}</strong>
                  <span className="text-[#5C6F75]">{t.locality}</span>
                </div>
                <span className="text-emerald-700 font-semibold bg-[#EAF2EE] px-2.5 py-1 rounded-full">
                  {t.serviceUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local City FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329] text-center">
          Frequently Asked Questions in {location.name}
        </h3>

        <Accordion
          items={location.faqs.map((f, idx) => ({
            id: `city-faq-${idx}`,
            title: f.question,
            content: f.answer
          }))}
        />
      </section>

      {/* Final City CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Need Immediate Care Assistance in {location.name}?
          </h3>
          <p className="text-sm text-white/70 max-w-lg mx-auto">
            Our {location.name} command hub operates 24/7. Request a callback or book an in-home clinical triage visit.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href={`/book?city=${encodeURIComponent(location.name)}`}>
              <Button variant="gold" size="lg">
                Schedule Care in {location.name} →
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => openLeadDrawer({ title: `Inquire for ${location.name}`, service: `Care in ${location.name}` })}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Request 5-Min Callback
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
