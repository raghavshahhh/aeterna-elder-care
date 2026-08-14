'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/servicesData';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Search, Siren, ShieldCheck, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function ServicesPage() {
  const { openEmergency, openLeadDrawer } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryOptions = [
    { id: 'all', label: 'All Services', count: servicesData.length },
    { id: 'critical-care', label: 'Critical Nursing', count: servicesData.filter((s) => s.category === 'critical-care').length },
    { id: 'daily-living', label: 'Daily Living Attendants', count: servicesData.filter((s) => s.category === 'daily-living').length },
    { id: 'medical-rehab', label: 'Doctor Visits & Physio', count: servicesData.filter((s) => s.category === 'medical-rehab').length },
    { id: 'dementia-memory', label: 'Dementia & Memory Care', count: servicesData.filter((s) => s.category === 'dementia-memory').length },
    { id: 'diagnostics-meds', label: 'Diagnostics & Equipment', count: servicesData.filter((s) => s.category === 'diagnostics-meds').length },
    { id: 'companionship', label: 'Companionship', count: servicesData.filter((s) => s.category === 'companionship').length }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="sage" size="md">
            Clinical Services Catalog
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif-heading font-bold text-[#0D2329] max-w-3xl mx-auto">
            Comprehensive Healthcare, Nursing & Assistance at Home
          </h1>
          <p className="text-base sm:text-lg text-[#5C6F75] max-w-2xl mx-auto font-light">
            Every service is managed under direct clinical supervision of our Chief Medical Officer. 100% background-verified professionals available across 12 metro cities.
          </p>

          {/* Search bar & quick filters */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#5C6F75] absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search services (e.g. ICU nurse, tracheostomy, physio, hospital bed)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E2D7C5] rounded-full pl-12 pr-6 py-4 text-sm text-[#0D2329] placeholder:text-[#899B9F] shadow-sm focus:outline-none focus:border-[#3D685A] focus:ring-4 focus:ring-[#3D685A]/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-[#5C6F75] hover:text-[#0D2329]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
          <Tabs
            options={categoryOptions}
            activeId={selectedCategory}
            onChange={(id) => setSelectedCategory(id)}
            variant="pills"
          />

          <div className="text-xs text-[#5C6F75] shrink-0 font-medium">
            Showing <strong>{filteredServices.length}</strong> of {servicesData.length} clinical services
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D8] p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#0D2329]">No Services Found</h3>
            <p className="text-sm text-[#5C6F75] max-w-md mx-auto">
              We couldn&apos;t find any service matching &quot;{searchQuery}&quot;. Try adjusting your keywords or category filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Need Guidance Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-12 border border-[#1C4550] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C58F58]">
              Unsure Which Care Your Parent Needs?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
              Take Our 60-Second Clinical Assessment
            </h3>
            <p className="text-sm text-white/70">
              Answer 7 simple questions to get a customized care recommendation and cost estimate.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/find-care">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Find Right Care Wizard →
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => openLeadDrawer({ title: 'Speak to a Clinical Advisor' })}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Talk to Specialist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
