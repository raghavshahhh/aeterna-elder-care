import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heart, ArrowRight, Search, PhoneCall } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center space-y-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D8] shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-[#EAF2EE] text-[#3D685A] flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 fill-[#C58F58] text-[#C58F58]" />
        </div>

        <div className="space-y-2">
          <Badge variant="gold" size="md">
            404 Page Not Found
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Looking for Elder Care Support?
          </h1>
          <p className="text-sm text-[#5C6F75] font-light leading-relaxed">
            The page you are looking for may have been moved or updated. Let us help you find the right clinical service or care plan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link href="/">
            <Button variant="primary" size="md" className="w-full">
              Back to Homepage
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="md" className="w-full">
              Explore All Services
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-[#E8E2D8] text-xs text-[#5C6F75] flex items-center justify-center gap-2">
          <span>Need immediate assistance?</span>
          <a href="tel:+911140849900" className="font-bold text-[#0D2329] hover:underline flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span>+91 11 4084 9900</span>
          </a>
        </div>
      </div>
    </div>
  );
}
