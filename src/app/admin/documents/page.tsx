'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  ShieldCheck,
  UploadCloud,
  Eye,
  History,
  Lock,
  Plus,
  Sparkles
} from 'lucide-react';
import { DocumentRecord } from '@/lib/db/schema';

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/owner/documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents || []);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredDocs = documents.filter((doc) => {
    if (categoryFilter !== 'all' && doc.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!doc.title.toLowerCase().includes(q) && !doc.authority.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Document Vault &amp; Trust Repository
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Immutable document versioning, statutory certificates, Aks Shajra survey records, and MCA filings.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-[#091B20] border border-white/10">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by title, authority, or document number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#C58F58]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'legal', 'registry', 'approvals', 'architecture', 'financial'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                categoryFilter === cat ? 'bg-[#2C5E50] text-white shadow-md' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-3xl bg-[#091B20] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C58F58]/20 text-[#E0AB77] text-[10px] font-mono font-bold uppercase">
                  {doc.categoryLabel}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{doc.verificationBadgeText}</span>
                </span>
              </div>

              <h3 className="text-base font-serif-heading font-bold text-white leading-snug">{doc.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{doc.description}</p>

              <div className="pt-2 border-t border-white/10 text-xs font-mono text-white/50 space-y-1">
                <div>Authority: <span className="text-white/80">{doc.authority}</span></div>
                {doc.documentNumber && <div>Doc #: <span className="text-white/80">{doc.documentNumber}</span></div>}
                <div className="flex items-center justify-between pt-1">
                  <span>Version: v{doc.currentVersion}</span>
                  <span className="capitalize">{doc.visibility.toLowerCase()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href={`/api/owner/documents/view?id=${doc.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#2C5E50] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </a>
              <span className="text-[10px] font-mono text-white/40">
                {doc.versions?.[0]?.fileSize || 'PDF Document'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
