'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { projectOverview } from '@/data/propertyData';
import {
  FolderLock,
  KeyRound,
  FileText,
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  Eye,
  Download,
  Building2,
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface PublicDocItem {
  id: string;
  title: string;
  category: 'foundation' | 'legal' | 'architecture' | 'location' | 'commercial' | 'technical';
  categoryNumber: string;
  categoryLabel: string;
  docType: 'Official License' | 'Tax Order' | 'CAD Blueprint' | 'Revenue Map' | 'Commercial Note' | 'Technical Report';
  date: string;
  version: string;
  authority: string;
  description: string;
  isProtected: boolean;
  publicPreviewAvailable: boolean;
  actionUrl?: string;
  downloadUrl?: string;
  tags: string[];
}

const PUBLIC_TRUST_DOCUMENTS: PublicDocItem[] = [
  // 01 PROJECT & FOUNDATION
  {
    id: 'doc-pub-01',
    title: 'Senior Living Citizens Foundation — Master Project Prospectus',
    category: 'foundation',
    categoryNumber: '01',
    categoryLabel: 'Project & Foundation',
    docType: 'Official License',
    date: 'August 2026',
    version: 'v2.4',
    authority: 'Senior Living Citizens Foundation',
    description: 'Comprehensive overview of the 64-plot sanctuary, proposed G+2 senior residences, and on-site 30,000 sqft Ayurvedic Hospital in Kheri Asra, Jhajjar.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Overview', '64 Plots', 'Hospital', 'Vision']
  },
  {
    id: 'doc-pub-02',
    title: 'NITI Aayog NGO-DARPAN Unique Registration Certificate',
    category: 'foundation',
    categoryNumber: '01',
    categoryLabel: 'Project & Foundation',
    docType: 'Official License',
    date: 'August 2026',
    version: 'v1.0',
    authority: 'NITI Aayog, Government of India',
    description: 'Statutory registration validating non-profit foundation standing with the Government of India portal.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['NITI Aayog', 'DARPAN', 'NGO Registry']
  },

  // 02 LEGAL / STATUTORY
  {
    id: 'doc-pub-03',
    title: 'Section 8 Licence Certificate (Licence No. 172654)',
    category: 'legal',
    categoryNumber: '02',
    categoryLabel: 'Legal & Statutory',
    docType: 'Official License',
    date: 'August 2026',
    version: 'v1.0',
    authority: 'Ministry of Corporate Affairs (CRC Manesar)',
    description: 'Statutory licence granted under Section 8(1) of the Companies Act, 2013, mandating non-profit operations dedicated to senior living welfare.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Section 8', 'MCA', 'Companies Act']
  },
  {
    id: 'doc-pub-04',
    title: 'Income Tax Department 80G Provisional Approval (Form 10AC)',
    category: 'legal',
    categoryNumber: '02',
    categoryLabel: 'Legal & Statutory',
    docType: 'Tax Order',
    date: 'August 2026',
    version: 'AY 2026–29',
    authority: 'Income Tax Department (CPC Bengaluru)',
    description: 'Official Form 10AC provisional approval order under Section 80G (PAN: ABRCS1487J) for philanthropic elder-care and community facilities.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['80G', 'Form 10AC', 'Income Tax']
  },
  {
    id: 'doc-pub-05',
    title: 'Unencumbered Freehold Title Chain & Mutation Extract',
    category: 'legal',
    categoryNumber: '02',
    categoryLabel: 'Legal & Statutory',
    docType: 'Revenue Map',
    date: 'August 2026',
    version: 'Official Extract',
    authority: 'Tehsil Revenue Records, Haryana',
    description: 'Tehsil Jamabandi mutation extracts and unencumbered freehold registry records. Full 16-page title chain accessible in Owner Vault.',
    isProtected: true,
    publicPreviewAvailable: false,
    tags: ['Title Deed', 'Jamabandi', 'Freehold']
  },

  // 03 ARCHITECTURE
  {
    id: 'doc-pub-06',
    title: '64-Plot Plotted Township Master Layout by The Vision Architects',
    category: 'architecture',
    categoryNumber: '03',
    categoryLabel: 'Architecture & CAD',
    docType: 'CAD Blueprint',
    date: 'August 2026',
    version: 'v1.2 Released',
    authority: 'The Vision Architects & Consultants',
    description: 'Dimensional master plan showing 64 plots across Blocks A–F (120 to 425 sq. yd.), 33ft internal roads, hospital footprint, and community mandir.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Master Plan', '64 Plots', 'CAD Blueprint']
  },
  {
    id: 'doc-pub-07',
    title: 'G+2 + Stilt Senior Residence Floor Plans & Elevations',
    category: 'architecture',
    categoryNumber: '03',
    categoryLabel: 'Architecture & CAD',
    docType: 'CAD Blueprint',
    date: 'August 2026',
    version: 'Phase 1 CAD',
    authority: 'The Vision Architects & Consultants',
    description: 'Stilt parking layout (Plots 63 & 64) and Ground Floor residential layout for Units 01, 02, and 03 with senior accessibility specs.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Floor Plans', 'Units 01-03', 'Stilt Parking']
  },
  {
    id: 'doc-pub-08',
    title: '30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital Layout',
    category: 'architecture',
    categoryNumber: '03',
    categoryLabel: 'Architecture & CAD',
    docType: 'CAD Blueprint',
    date: 'August 2026',
    version: 'v1.8',
    authority: 'The Vision Architects & Consultants',
    description: 'L-shaped 117\'-10" × 138\' G+2 hospital blueprint detailing 6 OPD suites, emergency triage bay, diagnostic lab, and 8 Panchakarma therapy rooms.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Hospital', 'Panchakarma', 'Medical CAD']
  },

  // 04 LOCATION & SITE
  {
    id: 'doc-pub-09',
    title: 'Kheri Asra Village Revenue Survey & Cadastral Map',
    category: 'location',
    categoryNumber: '04',
    categoryLabel: 'Location & Site',
    docType: 'Revenue Map',
    date: 'August 2026',
    version: 'Official Cadastral',
    authority: 'Haryana Revenue & Land Records',
    description: 'Official revenue map showing the 11+ acres boundary demarcation and direct road frontage along State Highway 22 (SH-22).',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Revenue Map', 'Kheri Asra', 'SH-22']
  },
  {
    id: 'doc-pub-10',
    title: 'SH-22 Corridor Right-of-Way & Connectivity Assessment',
    category: 'location',
    categoryNumber: '04',
    categoryLabel: 'Location & Site',
    docType: 'Technical Report',
    date: 'August 2026',
    version: 'v1.0',
    authority: 'Infrastructure & Transit Cell',
    description: 'Road connectivity study detailing direct access to Reliance MET City (10 min), AIIMS Jhajjar (20 min), and Gurugram Sector-45 (45 min).',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Transit', 'Reliance MET', 'Connectivity']
  },

  // 05 COMMERCIAL INFORMATION
  {
    id: 'doc-pub-11',
    title: 'Phase 1 Priority Allotment & Payment Milestones Guide',
    category: 'commercial',
    categoryNumber: '05',
    categoryLabel: 'Commercial Information',
    docType: 'Commercial Note',
    date: 'August 2026',
    version: 'v1.1 Indicative',
    authority: 'Foundation Commercial Desk',
    description: 'Pre-launch price schedule for 64 plots (from ₹28.8L*) and Ground Floor senior residences (from ₹25L*). Explains Flexi & CLP options.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Pricing', 'Payment Plans', 'Phase 1']
  },
  {
    id: 'doc-pub-12',
    title: 'Pre & Post Possession Rental Returns Policy & Disclaimers',
    category: 'commercial',
    categoryNumber: '05',
    categoryLabel: 'Commercial Information',
    docType: 'Commercial Note',
    date: 'August 2026',
    version: 'v1.0',
    authority: 'Foundation Advisory Desk',
    description: 'Detailed terms for ₹6,250 / ₹12,500 monthly rental returns, post-registry handover criteria, and statutory disclosures.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Rental Policy', 'Returns Disclaimer', 'Possession']
  },

  // 06 OTHER VERIFIED DOCUMENTS
  {
    id: 'doc-pub-13',
    title: 'Geotechnical Soil Investigation & Borehole Test Report',
    category: 'technical',
    categoryNumber: '06',
    categoryLabel: 'Other Verified Records',
    docType: 'Technical Report',
    date: 'August 2026',
    version: 'v1.0 Laboratory',
    authority: 'National Soil Testing Laboratory',
    description: 'Soil bearing capacity and water table depth tests across 5 borehole locations on the property confirming structural safety.',
    isProtected: true,
    publicPreviewAvailable: false,
    tags: ['Soil Test', 'Geotechnical', 'Foundation']
  },
  {
    id: 'doc-pub-14',
    title: 'Senior Citizen Barrier-Free Architectural Specifications',
    category: 'technical',
    categoryNumber: '06',
    categoryLabel: 'Other Verified Records',
    docType: 'Technical Report',
    date: 'August 2026',
    version: 'v1.0 Guidelines',
    authority: 'The Vision Architects',
    description: 'Summary of barrier-free design standards including zero-skid flooring, 36-inch wide doorways, 5x6ft dual elevators, and SOS pull cords.',
    isProtected: false,
    publicPreviewAvailable: true,
    tags: ['Accessibility', 'Senior Living', 'Safety Specs']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Documents (14)' },
  { id: 'foundation', label: '01 Project & Foundation' },
  { id: 'legal', label: '02 Legal & Statutory' },
  { id: 'architecture', label: '03 Architecture & CAD' },
  { id: 'location', label: '04 Location & Site' },
  { id: 'commercial', label: '05 Commercial Information' },
  { id: 'technical', label: '06 Other Verified Records' }
];

export default function PublicDocumentsPage() {
  const { openWhatsApp, openLeadDrawer } = useModal();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<PublicDocItem | null>(null);

  const filteredDocs = useMemo(() => {
    return PUBLIC_TRUST_DOCUMENTS.filter((doc) => {
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-20 sm:py-28 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-xs font-bold text-[#2C5E50] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            06 • Project Trust &amp; Document Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-heading font-normal text-[#0D2329] tracking-tight">
            Verified Project Records &amp; <span className="italic font-serif text-[#C58F58]">Trust Center.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#53676E] leading-relaxed">
            Every claim on this website is anchored in verifiable legal certificates, architectural CAD drawings, revenue mutations, and statutory NGO licenses. Explore our public document summaries or log in to the Owner Vault for full records.
          </p>
        </div>

        {/* Owner Vault Secure Gate Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D2329] text-white shadow-2xl border border-[#163942] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono uppercase tracking-widest text-[#E0AB77]">
                <Lock className="w-3.5 h-3.5 text-[#C58F58]" />
                Confidential Document Repository
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#FAF8F5]">
                Restricted Owner &amp; Buyer Vault
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Complete unencumbered title deeds, certified Tehsil Jamabandi mutation extracts, full 4K drone orthomosaic surveys, and confidential structural blueprints are maintained in an authenticated vault with audit logs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
              <Link
                href="/owner/login"
                className="px-6 py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-[#C58F58]" />
                Owner Vault Login →
              </Link>
              <button
                onClick={() => openLeadDrawer({ title: 'Request Physical Document Set at Gurugram Office', actionType: 'request-trust-docs' })}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all text-center cursor-pointer"
              >
                Request In-Person File Review
              </button>
            </div>
          </div>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#53676E] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents by title, authority, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E8E2D8] bg-white text-xs sm:text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50] focus:ring-1 focus:ring-[#2C5E50] shadow-sm"
              />
            </div>

            {/* Document Count Badge */}
            <div className="text-xs text-[#53676E] font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Showing <strong>{filteredDocs.length}</strong> verified project records</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0D2329] text-white shadow-md'
                    : 'bg-white text-[#53676E] border border-[#E8E2D8] hover:border-[#0D2329] hover:text-[#0D2329]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-5"
            >
              <div className="space-y-4">
                {/* Card Top Metadata */}
                <div className="flex items-start justify-between gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EAF2EE] text-[#2C5E50] border border-[#CDE0D7]">
                    {doc.categoryNumber} • {doc.categoryLabel}
                  </span>

                  {doc.isProtected ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                      <Lock className="w-3 h-3 text-amber-600" /> Owner Only
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Public Summary
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif-heading font-bold text-[#0D2329] leading-snug group-hover:text-[#2C5E50] transition-colors">
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#53676E] leading-relaxed line-clamp-3">
                  {doc.description}
                </p>

                {/* Authority & Date Metadata */}
                <div className="pt-3 border-t border-[#E8E2D8] space-y-1 text-[11px] text-[#53676E]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C9B9F]">Issuing Authority:</span>
                    <strong className="text-[#0D2329] font-medium truncate max-w-[180px] text-right">
                      {doc.authority}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C9B9F]">Date / Version:</span>
                    <span className="font-mono text-[#0D2329]">{doc.date} ({doc.version})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C9B9F]">Document Format:</span>
                    <span className="font-semibold text-[#2C5E50]">{doc.docType}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {doc.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#53676E] border border-[#E8E2D8] text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8E2D8] flex items-center gap-2">
                {doc.isProtected ? (
                  <Link
                    href="/owner/login"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0D2329] hover:bg-[#1A3B45] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-[#C58F58]" />
                    <span>Owner Login to View Full Record</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#EAF2EE] border border-[#E8E2D8] text-[#0D2329] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#2C5E50]" />
                      <span>Inspect Summary</span>
                    </button>
                    <button
                      onClick={() => {
                        openWhatsApp({
                          actionType: 'request-trust-docs',
                          message: `Hello, I would like to request the verified document copy of: ${doc.title} (${doc.authority}). Please share with me.`
                        });
                      }}
                      className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="Request via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D8] space-y-4">
            <FolderLock className="w-12 h-12 text-[#8C9B9F] mx-auto" />
            <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              No Documents Matching Your Filter
            </h4>
            <p className="text-xs text-[#53676E] max-w-sm mx-auto">
              Try adjusting your search keywords or select &quot;All Documents&quot; to view all 14 verified project records.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-full bg-[#0D2329] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Physical File Inspection Card */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              Prefer to Inspect Original Revenue &amp; Architecture Files in Person?
            </h4>
            <p className="text-xs sm:text-sm text-[#53676E] leading-relaxed">
              We maintain physical red-ribbon folders with original Tehsil registry stamp papers, Section 8 certificates, Form 10AC tax orders, and full A0-size architectural CAD sets at our Gurugram Corporate Office.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0D2329] pt-1">
              <MapPin className="w-4 h-4 text-[#C58F58]" />
              <span>{projectOverview.siteOfficeAddress}</span>
            </div>
          </div>

          <button
            onClick={() => openLeadDrawer({ title: 'Schedule Document Review at Gurugram Office', actionType: 'request-trust-docs' })}
            className="px-6 py-3.5 rounded-2xl bg-[#0D2329] hover:bg-[#1A3B45] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
          >
            Schedule Office File Review →
          </button>
        </div>
      </div>

      {/* Document Summary Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-[#071519]/75 backdrop-blur-sm" onClick={() => setSelectedDoc(null)} />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E2D8] space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E2D8]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold">
                  {selectedDoc.categoryNumber} • {selectedDoc.categoryLabel}
                </span>
                <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-1">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 rounded-full text-[#53676E] hover:text-[#0D2329] hover:bg-[#FAF8F5] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#53676E] leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2">
                <strong className="text-sm font-semibold text-[#0D2329] block">Document Summary:</strong>
                <p>{selectedDoc.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="text-[#8C9B9F] block">Authority:</span>
                  <strong className="text-[#0D2329]">{selectedDoc.authority}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="text-[#8C9B9F] block">Date / Version:</span>
                  <strong className="text-[#0D2329]">{selectedDoc.date} ({selectedDoc.version})</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="text-[#8C9B9F] block">Category:</span>
                  <strong className="text-[#0D2329]">{selectedDoc.categoryLabel}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E2D8]">
                  <span className="text-[#8C9B9F] block">Format:</span>
                  <strong className="text-[#2C5E50]">{selectedDoc.docType}</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  const docTitle = selectedDoc.title;
                  setSelectedDoc(null);
                  openWhatsApp({
                    actionType: 'request-trust-docs',
                    message: `Hello, I would like to request the verified document copy of: ${docTitle}. Please send to me.`
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Request Complete Record on WhatsApp
              </button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#E8E2D8] text-[#0D2329] text-xs font-semibold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
