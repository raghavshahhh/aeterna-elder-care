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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>STATUTORY &amp; TITLE REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Document Vault &amp; Trust Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Immutable document versioning, statutory certificates, Aks Shajra survey records, and MCA filings.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by title, authority, or document number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#2C5E50]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'legal', 'registry', 'approvals', 'architecture', 'financial'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                categoryFilter === cat ? 'bg-[#2C5E50] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
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
            className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-bold uppercase">
                  {doc.categoryLabel}
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{doc.verificationBadgeText}</span>
                </span>
              </div>

              <h3 className="text-base font-serif-heading font-bold text-slate-900 leading-snug">{doc.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{doc.description}</p>

              <div className="pt-2 border-t border-slate-100 text-xs font-mono text-slate-500 space-y-1">
                <div>Authority: <span className="text-slate-800 font-medium">{doc.authority}</span></div>
                {doc.documentNumber && <div>Doc #: <span className="text-slate-800 font-medium">{doc.documentNumber}</span></div>}
                <div className="flex items-center justify-between pt-1">
                  <span>Version: v{doc.currentVersion}</span>
                  <span className="capitalize">{doc.visibility.toLowerCase()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`/api/owner/documents/view?id=${doc.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#2C5E50] text-slate-800 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors border border-slate-200"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </a>
              <span className="text-[10px] font-mono text-slate-400">
                {doc.versions?.[0]?.fileSize || 'PDF Document'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

