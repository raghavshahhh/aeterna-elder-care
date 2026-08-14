'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { servicesData } from '@/data/servicesData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { useModal } from '@/context/ModalContext';
import {
  Star,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Clock,
  UserCheck,
  Calendar,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const resolvedParams = use(params);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const service = servicesData.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = servicesData.filter((s) =>
    service.relatedServiceSlugs.includes(s.slug)
  );

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#F6F1E8] border-b border-[#E8E2D8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#5C6F75]">
          <Link href="/" className="hover:text-[#0D2329]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-[#0D2329]">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#0D2329] truncate">{service.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="forest" size="md">
                {service.categoryName}
              </Badge>
              {service.badge && (
                <Badge variant="gold" size="md">
                  {service.badge}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-[#0D2329] leading-tight">
              {service.title}
            </h1>

            <p className="text-lg text-[#3D685A] font-medium">
              {service.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#5C6F75] leading-relaxed font-light">
              {service.shortDescription}
            </p>

            {/* Ratings and starting price */}
            <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-sm font-bold text-[#0D2329]">{service.rating} / 5.0</span>
                <span className="text-xs text-[#5C6F75]">({service.reviewCount} Verified Reviews)</span>
              </div>

              <div className="h-6 w-px bg-[#E8E2D8] hidden sm:block" />

              <div>
                <span className="text-xs text-[#5C6F75] block">Starting From</span>
                <span className="text-lg font-bold text-[#0D2329]">
                  {service.startingPrice}{' '}
                  <span className="text-xs font-normal text-[#5C6F75]">/{service.priceUnit}</span>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href={`/book?service=${service.slug}`} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-[#0D2329] hover:bg-[#163942] text-white font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Book This Service
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => openLeadDrawer({ title: `Inquire about ${service.title}`, service: service.title })}
                leftIcon={<PhoneCall className="w-4 h-4 text-[#3D685A]" />}
                className="w-full sm:w-auto"
              >
                Request Callback
              </Button>

              <button
                onClick={() => openWhatsApp({ service: service.title })}
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center justify-center gap-2 text-xs font-bold sm:rounded-full"
                title="Inquire on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span className="sm:hidden">Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square bg-[#F6F1E8]">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-lg text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Clinical Lead Supervising This Service:</span>
                </div>
                <p className="font-bold text-[#0D2329] text-sm">{service.clinicalLead.name}</p>
                <p className="text-[#5C6F75]">{service.clinicalLead.qualification} • {service.clinicalLead.experience}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-10 border border-[#1C4550] shadow-xl">
          <h3 className="text-xl font-serif-heading font-bold text-white mb-6">
            Clinical Quality & Execution Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white/85 leading-snug">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is Included (Deep-Dive Sections) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Badge variant="sage" size="md">
            Full Service Scope
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] mt-2">
            What Is Included in {service.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {service.whatIsIncluded.map((group, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm space-y-4"
            >
              <h3 className="font-bold text-base sm:text-lg text-[#0D2329] pb-3 border-b border-[#E8E2D8]">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5C6F75]">
                    <Check className="w-4 h-4 text-[#3D685A] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Who Is This For & Clinical Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Who is this for */}
          <div className="lg:col-span-5 bg-[#F6F1E8] rounded-3xl p-8 border border-[#E2D7C5] space-y-6">
            <div>
              <Badge variant="gold" size="sm">
                Patient Profiles
              </Badge>
              <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-2">
                Who Is This Service Ideal For?
              </h3>
            </div>

            <ul className="space-y-3.5">
              {service.whoIsThisFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0D2329]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] space-y-2">
              <span className="text-xs font-bold text-[#0D2329] block">
                Need customized care planning?
              </span>
              <p className="text-xs text-[#5C6F75]">
                Our geriatric clinicians formulate individualized care roadmaps tailored to your parent’s medical history.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs mt-2"
                onClick={() => openLeadDrawer({ title: `Customized Plan for ${service.title}`, service: service.title })}
              >
                Schedule Clinical Assessment
              </Button>
            </div>
          </div>

          {/* 4-Step Clinical Protocol */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#E8E2D8] shadow-sm space-y-6">
            <div>
              <Badge variant="sage" size="sm">
                Care Roadmap
              </Badge>
              <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-2">
                The 4-Step Clinical Protocol
              </h3>
            </div>

            <div className="space-y-4">
              {service.clinicalProtocol.map((proto) => (
                <div
                  key={proto.step}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8]"
                >
                  <span className="w-8 h-8 rounded-full bg-[#0D2329] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {proto.step}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0D2329]">{proto.title}</h4>
                    <p className="text-xs sm:text-sm text-[#5C6F75] mt-1 leading-relaxed">
                      {proto.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Service Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="gold" size="md">
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl font-serif-heading font-bold text-[#0D2329]">
            Service Packages & Shift Rates
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Transparent pricing with zero hidden fees. Includes continuous medical supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {service.pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                tier.recommended
                  ? 'bg-white border-2 border-[#C58F58] shadow-xl relative -translate-y-2'
                  : 'bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {tier.recommended && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C58F58] text-white mb-3 inline-block">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">{tier.name}</h3>
                <p className="text-xs text-[#5C6F75] mt-1 min-h-[32px]">{tier.description}</p>

                <div className="mt-5 pb-5 border-b border-[#E8E2D8]">
                  <span className="text-3xl font-extrabold text-[#0D2329]">{tier.price}</span>
                  <span className="text-xs text-[#5C6F75] block mt-0.5">{tier.period}</span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-[#1D4B57]">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E2D8]">
                <Link href={`/book?service=${service.slug}&tier=${encodeURIComponent(tier.name)}`}>
                  <Button
                    variant={tier.recommended ? 'gold' : 'primary'}
                    size="md"
                    className="w-full text-xs font-bold"
                  >
                    Select {tier.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="sage" size="md">
            Common Questions
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            Frequently Asked About {service.title}
          </h2>
        </div>

        <Accordion
          items={service.faqs.map((faq, idx) => ({
            id: `srv-faq-${idx}`,
            title: faq.question,
            content: faq.answer
          }))}
        />
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
              Related Clinical Services
            </h3>
            <Link
              href="/services"
              className="text-xs font-bold text-[#3D685A] hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedServices.map((rel) => (
              <ServiceCard key={rel.id} service={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
