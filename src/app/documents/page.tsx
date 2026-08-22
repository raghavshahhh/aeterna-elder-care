import React from 'react';
import Link from 'next/link';
import { RealityBadge } from '@/components/ui/RealityBadge';
import { FolderLock, KeyRound } from 'lucide-react';

export default function PublicDocumentsPage() {
  return (
    <div className="py-20 sm:py-28 bg-[#FAF8F5] min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <FolderLock className="w-3.5 h-3.5 text-[#C58F58]" />
            Project Transparency &amp; Title Verification
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Project Documentation &amp; <span className="italic font-serif text-[#C58F58]">Owner Vault.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            Official title chains, Tehsil revenue mutation records, architectural CAD blueprints, and statutory NGO approvals are maintained in a secure, authenticated document repository.
          </p>
        </div>

        {/* Secure Access Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D2329] text-white space-y-8 shadow-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#C58F58] font-bold uppercase tracking-widest">
                RESTRICTED REPOSITORY
              </span>
              <h2 className="text-2xl font-serif-heading font-bold text-[#FAF8F5]">
                Owner &amp; Authorized Buyer Access
              </h2>
            </div>

            <RealityBadge label="VERIFIED RECORDS ARCHIVE" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <strong className="text-sm font-serif-heading text-[#FAF8F5] block">
                1. Land &amp; Title Deeds
              </strong>
              <p className="text-white/70 font-light">
                Unencumbered freehold registry chain, Jamabandi mutation records, and boundary survey certificates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <strong className="text-sm font-serif-heading text-[#FAF8F5] block">
                2. Architectural CAD Sets
              </strong>
              <p className="text-white/70 font-light">
                64-plot township master plan, G+2 residential elevations, and 30k sqft hospital blueprints.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <strong className="text-sm font-serif-heading text-[#FAF8F5] block">
                3. Statutory NGO Approvals
              </strong>
              <p className="text-white/70 font-light">
                MCA Section 8 license, Income Tax 80G Form 10AC order, and NITI Aayog NGO-DARPAN ID.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <strong className="text-sm font-serif-heading text-[#FAF8F5] block">
                4. Site &amp; Drone Evidence
              </strong>
              <p className="text-white/70 font-light">
                4K drone orthomosaic aerial photographic records and geotechnical borehole soil test results.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <p className="text-xs text-white/60 font-light">
              Authorized buyers and foundation stakeholders can log in with their assigned credentials.
            </p>

            <Link
              href="/owner/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <KeyRound className="w-4 h-4 text-[#C58F58]" />
              Owner Vault Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
