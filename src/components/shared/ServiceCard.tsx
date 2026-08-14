import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Star, Check } from 'lucide-react';

export interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  return (
    <div
      className="group relative bg-white rounded-3xl border border-[#E8E2D8] hover:border-[#D4A373]/60 shadow-[0_2px_12px_-2px_rgba(13,35,41,0.04)] hover:shadow-[0_16px_40px_-8px_rgba(13,35,41,0.09)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Image header */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#F6F1E8]">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2329]/80 via-[#0D2329]/20 to-transparent" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant="forest" size="sm">
            {service.categoryName}
          </Badge>
          {service.badge && (
            <Badge variant="gold" size="sm">
              {service.badge}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{service.rating}</span>
            <span className="text-white/60">({service.reviewCount})</span>
          </div>
          <span className="text-xs font-medium text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            From {service.startingPrice}
          </span>
        </div>
      </div>

      {/* Body content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-serif-heading font-semibold text-[#0D2329] group-hover:text-[#3D685A] transition-colors line-clamp-1">
            {service.title}
          </h3>
          <p className="text-sm text-[#5C6F75] mt-2 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>

          <ul className="mt-4 space-y-2">
            {service.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#1D4B57]">
                <Check className="w-3.5 h-3.5 text-[#3D685A] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-5 border-t border-[#E8E2D8] flex items-center justify-between">
          <div className="text-xs text-[#5C6F75]">
            <span className="block font-semibold text-[#0D2329]">{service.startingPrice}</span>
            <span>{service.priceUnit}</span>
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D2329] group-hover:text-[#C58F58] transition-colors"
          >
            <span>Explore Service</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
