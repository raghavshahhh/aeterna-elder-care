'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { resourcesData } from '@/data/resourcesData';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Clock, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const featured = resourcesData[0];

  const filteredArticles = resourcesData.filter((art) => {
    const matchesTag = selectedTag === 'all' || art.tags.includes(selectedTag);
    const matchesSearch =
      search.trim() === '' ||
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase()) ||
      art.category.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const allTags = ['all', 'Dementia', 'Alzheimers', 'Fall Prevention', 'Home Safety', 'Diabetes', 'Hypertension', 'Home Care'];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="sage" size="md">
            Clinical Health & Caregiving Journal
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif-heading font-bold text-[#0D2329]">
            Evidence-Based Care Guides for Aging Parents
          </h1>
          <p className="text-base sm:text-lg text-[#5C6F75] font-light max-w-2xl mx-auto">
            Practical medical advice, home safety checklists, and dementia management strategies written and reviewed by senior geriatricians.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#5C6F75] absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by topic (e.g. dementia, fall safety, diabetes, home care)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#E2D7C5] rounded-full pl-12 pr-6 py-4 text-sm text-[#0D2329] placeholder:text-[#899B9F] shadow-sm focus:outline-none focus:border-[#3D685A]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Showcase */}
      {!search && selectedTag === 'all' && featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative h-72 sm:h-96 w-full bg-[#F6F1E8]">
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="gold" size="sm">
                  Featured Clinical Guide
                </Badge>
                <span className="text-xs text-[#5C6F75]">
                  {featured.readTimeMinutes} min read • {formatDate(featured.publishDate)}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] leading-tight">
                {featured.title}
              </h2>

              <p className="text-sm text-[#5C6F75] leading-relaxed">
                {featured.summary}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Medically Reviewed by {featured.medicallyReviewedBy.name}</span>
              </div>

              <div className="pt-4">
                <Link href={`/resources/${featured.slug}`}>
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Read Full Article
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Library */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E8E2D8]">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                selectedTag === tag
                  ? 'bg-[#0D2329] border-[#0D2329] text-white shadow-sm'
                  : 'bg-white border-[#E8E2D8] text-[#5C6F75] hover:bg-[#F6F1E8]'
              }`}
            >
              {tag === 'all' ? 'All Topics' : tag}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>
    </div>
  );
}
