import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  return (
    <article
      className="group bg-white rounded-3xl border border-[#E8E2D8] hover:border-[#D4A373]/60 shadow-[0_2px_12px_-2px_rgba(13,35,41,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(13,35,41,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[#F6F1E8]">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="sage" size="sm">
            {article.category}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-[#5C6F75] mb-2.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span>{formatDate(article.publishDate)}</span>
          </div>

          <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] group-hover:text-[#3D685A] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#5C6F75] mt-2 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-emerald-800 bg-[#EAF2EE] px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Medically Reviewed</span>
          </div>

          <Link
            href={`/resources/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0D2329] group-hover:text-[#C58F58] transition-colors"
          >
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
