import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { projectOverview } from '@/data/propertyData';
import { Heart, ArrowRight, MapPin, PhoneCall, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-xl w-full text-center space-y-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D8] shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-8 h-8 fill-[#C58F58] text-[#C58F58]" />
        </div>

        <div className="space-y-2">
          <Badge variant="gold" size="md">
            404 • Page Not Found
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Looking for Senior Living Foundation?
          </h1>
          <p className="text-sm text-[#53676E] font-light leading-relaxed">
            The page you are looking for may have moved. Explore our 64 freehold plots, barrier-free residential apartments, or verified project documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link href="/">
            <Button variant="primary" size="md" className="w-full">
              Back to Master Overview
            </Button>
          </Link>
          <Link href="/plots">
            <Button variant="outline" size="md" className="w-full">
              64-Plot Master Plan
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-[#E8E2D8] text-xs text-[#53676E] flex items-center justify-center gap-2">
          <span>Direct Foundation Desk:</span>
          <a
            href={`tel:${projectOverview.siteOfficePhone.replace(/\s+/g, '')}`}
            className="font-bold text-[#0D2329] hover:underline flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>{projectOverview.siteOfficePhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
