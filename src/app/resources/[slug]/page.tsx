'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { resourcesData } from '@/data/resourcesData';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { formatDate } from '@/lib/utils';
import {
  Clock,
  ShieldCheck,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  ArrowRight,
  User,
  MessageSquare
} from 'lucide-react';

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const resolvedParams = use(params);
  const { showToast } = useToast();

  const article = resourcesData.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const related = resourcesData.filter((a) => a.slug !== article.slug);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        title: 'Link Copied to Clipboard!',
        description: 'Share this clinical guide with family members or caregivers.',
        type: 'success'
      });
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Read this helpful elder care guide: "${article.title}" — ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F6F1E8] border-b border-[#E8E2D8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#5C6F75]">
          <Link href="/" className="hover:text-[#0D2329]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/resources" className="hover:text-[#0D2329]">
            Resources
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#0D2329] truncate">{article.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="sage" size="md">
            {article.category}
          </Badge>
          <span className="text-xs text-[#5C6F75] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} min read
          </span>
          <span className="text-xs text-[#5C6F75]">•</span>
          <span className="text-xs text-[#5C6F75]">{formatDate(article.publishDate)}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#0D2329] leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#5C6F75] font-light leading-relaxed">
          {article.summary}
        </p>

        {/* Author & Reviewer Strip */}
        <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAF2EE] text-[#3D685A] flex items-center justify-center font-bold text-sm">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold text-[#0D2329] block">{article.author.name}</span>
              <span className="text-[11px] text-[#5C6F75]">{article.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-[#EAF2EE] px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Medically Reviewed by <strong>{article.medicallyReviewedBy.name}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-[#F6F1E8] hover:bg-[#E8E2D8] text-[#0D2329] transition-colors"
              title="Copy Article URL"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md bg-[#F6F1E8]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      </header>

      {/* Main Body & Key Takeaways */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Key Takeaways Callout Box */}
        <div className="bg-[#F9F6F0] rounded-3xl p-6 sm:p-8 border border-[#E2D7C5] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C58F58]">
            <Bookmark className="w-4 h-4" />
            <span>Key Clinical Takeaways</span>
          </div>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0D2329] font-medium leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-[#182226] leading-relaxed">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-[#475569] leading-relaxed font-light">
                  {p}
                </p>
              ))}

              {section.bulletPoints && (
                <ul className="space-y-2 my-4 pl-2">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#0D2329]">
                      <span className="text-[#3D685A] font-bold">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.calloutBox && (
                <div
                  className={`p-5 rounded-2xl border text-xs sm:text-sm my-4 ${
                    section.calloutBox.type === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : section.calloutBox.type === 'clinical-note'
                      ? 'bg-blue-50 border-blue-200 text-blue-900'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <strong className="block font-bold mb-1">{section.calloutBox.title}</strong>
                  <p className="whitespace-pre-line leading-relaxed font-light">{section.calloutBox.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0D2329] text-white flex items-center justify-center font-bold text-lg shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-base text-[#0D2329]">{article.author.name}</h4>
            <p className="text-xs text-[#3D685A] font-semibold">{article.author.role}</p>
            <p className="text-xs text-[#5C6F75] mt-1">{article.author.credentials}</p>
          </div>
        </div>
      </main>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-10 border-t border-[#E8E2D8]">
        <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
          Related Clinical Articles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.slice(0, 3).map((r) => (
            <ArticleCard key={r.id} article={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
