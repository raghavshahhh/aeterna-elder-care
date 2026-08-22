'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VaultDocument, VaultDocumentCategory } from '@/types';
import {
  ShieldCheck,
  FolderLock,
  FileText,
  Upload,
  Search,
  Filter,
  Eye,
  Download,
  LogOut,
  Sparkles,
  Building2,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  X,
  Plus,
  RefreshCw
} from 'lucide-react';

export default function OwnerDocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDoc, setSelectedDoc] = useState<VaultDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<VaultDocumentCategory>('architecture');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadVersion, setUploadVersion] = useState('v1.0');
  const [uploadVisibility, setUploadVisibility] = useState<'owner_only' | 'authorized' | 'public'>('owner_only');
  const [isUploading, setIsUploading] = useState(false);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/owner/documents');
      if (res.status === 401) {
        router.push('/owner/login');
        return;
      }
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch {
      // Failed to load
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/owner/logout', { method: 'POST' });
    router.push('/owner/login');
    router.refresh();
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', uploadTitle);
      formData.append('category', uploadCategory);
      formData.append('description', uploadDescription);
      formData.append('version', uploadVersion);
      formData.append('visibility', uploadVisibility);

      const res = await fetch('/api/owner/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.document) {
        setDocuments((prev) => [data.document, ...prev]);
        setIsUploadModalOpen(false);
        setUploadTitle('');
        setUploadDescription('');
      }
    } catch {
      // Error handling
    } finally {
      setIsUploading(false);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Project Records', count: documents.length },
    {
      id: 'land_title',
      label: 'Land & Title',
      count: documents.filter((d) => d.category === 'land_title').length
    },
    {
      id: 'architecture',
      label: 'Architecture & CAD',
      count: documents.filter((d) => d.category === 'architecture').length
    },
    {
      id: 'approvals',
      label: 'Approvals & Trust',
      count: documents.filter((d) => d.category === 'approvals').length
    },
    {
      id: 'site_location',
      label: 'Site & Location',
      count: documents.filter((d) => d.category === 'site_location').length
    },
    {
      id: 'site_evidence',
      label: 'Site Evidence & Drone',
      count: documents.filter((d) => d.category === 'site_evidence').length
    }
  ];

  return (
    <div className="min-h-screen bg-[#071519] text-white">
      {/* Top Owner Header Bar */}
      <header className="border-b border-white/10 bg-[#0D2329]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-2xl bg-[#2C5E50] text-white flex items-center justify-center font-serif font-bold text-base shadow-md">
                S
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#C58F58] font-bold tracking-widest block">
                  PROJECT RECORD REPOSITORY
                </span>
                <h1 className="text-sm sm:text-base font-serif-heading font-bold text-[#FAF8F5]">
                  Owner Document Vault
                </h1>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Upload Document
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-xs flex items-center gap-1.5 cursor-pointer"
              title="Logout from Vault"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-[#0D2329] border border-white/10 space-y-1 shadow-xl">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest block">
              Total Archived Records
            </span>
            <strong className="text-3xl font-serif-heading font-bold text-[#FAF8F5]">
              {documents.length}
            </strong>
            <span className="text-[10px] text-emerald-400 font-mono block">
              ✓ All 5 Master Categories Indexed
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-[#0D2329] border border-white/10 space-y-1 shadow-xl">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest block">
              Title &amp; Demarcation
            </span>
            <strong className="text-3xl font-serif-heading font-bold text-[#C58F58]">
              {documents.filter((d) => d.category === 'land_title').length} Files
            </strong>
            <span className="text-[10px] text-white/60 font-mono block">
              Freehold Unencumbered Land
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-[#0D2329] border border-white/10 space-y-1 shadow-xl">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest block">
              Architectural CAD Sets
            </span>
            <strong className="text-3xl font-serif-heading font-bold text-[#FAF8F5]">
              {documents.filter((d) => d.category === 'architecture').length} Blueprints
            </strong>
            <span className="text-[10px] text-white/60 font-mono block">
              By The Vision Architects
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-[#0D2329] border border-white/10 space-y-1 shadow-xl">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest block">
              Statutory Credentials
            </span>
            <strong className="text-3xl font-serif-heading font-bold text-emerald-400">
              {documents.filter((d) => d.category === 'approvals').length} Orders
            </strong>
            <span className="text-[10px] text-white/60 font-mono block">
              MCA Sec 8 • 80G • DARPAN
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-[#0D2329] rounded-3xl border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by title, keyword, or filename..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C58F58]"
              />
            </div>

            <div className="text-xs text-white/60 font-mono">
              Showing {filteredDocs.length} of {documents.length} Documents
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl transition-all shrink-0 font-medium cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2C5E50] text-white font-bold shadow-md border border-emerald-400/40'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Document Cards Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-white/60 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#C58F58]" />
            <p className="text-xs font-mono">Loading Vault Documents...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="text-center py-20 bg-[#0D2329] rounded-3xl border border-white/10 text-white/60 space-y-3">
            <FileText className="w-8 h-8 mx-auto text-white/30" />
            <h4 className="text-base font-bold text-white">No documents match your query</h4>
            <p className="text-xs text-white/60">Try searching for a different keyword or select another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-3xl bg-[#0D2329] border border-white/10 hover:border-[#C58F58]/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#2C5E50]/30 border border-emerald-400/30 text-[10px] font-mono font-bold text-emerald-300 uppercase">
                      {doc.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-[#C58F58] font-bold">
                      {doc.version}
                    </span>
                  </div>

                  <h3 className="text-base font-serif-heading font-bold text-[#FAF8F5] group-hover:text-[#C58F58] transition-colors leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
                    <span>{doc.fileSize} • {doc.pageCount || 1} Pages</span>
                    <span>{doc.uploadedAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="flex-1 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C58F58]" />
                      Inspect PDF
                    </button>

                    <button
                      onClick={() => alert(`Initiating secure download of ${doc.fileName}...`)}
                      className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Embedded Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedDoc(null)}
          />

          <div className="relative w-full max-w-4xl bg-[#0D2329] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2C5E50] text-white flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase tracking-widest block">
                    {selectedDoc.categoryLabel} • {selectedDoc.version}
                  </span>
                  <h3 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
                    {selectedDoc.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Viewer Frame Simulation */}
            <div className="p-8 rounded-2xl bg-[#071519] border border-white/10 text-center space-y-4">
              <div className="max-w-md mx-auto space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-[#2C5E50]/30 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif-heading font-bold text-white">
                  {selectedDoc.fileName}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {selectedDoc.description}
                </p>
                <div className="pt-2 text-[11px] text-white/50 font-mono space-y-1">
                  <p>Archived by: {selectedDoc.uploadedBy} on {selectedDoc.uploadedAt}</p>
                  <p>File Size: {selectedDoc.fileSize} • {selectedDoc.pageCount} Pages • Format: PDF (Signed)</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => alert(`Opening secure high-resolution viewer for ${selectedDoc.fileName}...`)}
                  className="px-5 py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#C58F58]" />
                  Open Fullscreen PDF Viewer
                </button>
                <button
                  onClick={() => alert(`Downloading verified copy of ${selectedDoc.fileName}...`)}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Archive Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsUploadModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#0D2329] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Upload className="w-5 h-5 text-[#C58F58]" />
                <h3 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
                  Archive Project Document
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Phase 1 Electrical Grid Blueprint"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C58F58]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as VaultDocumentCategory)}
                    className="w-full px-3 py-3 rounded-2xl bg-[#071519] border border-white/15 text-white text-xs focus:outline-none focus:border-[#C58F58]"
                  >
                    <option value="land_title">Land &amp; Title</option>
                    <option value="architecture">Architecture &amp; CAD</option>
                    <option value="approvals">Approvals &amp; Trust</option>
                    <option value="site_location">Site &amp; Location</option>
                    <option value="site_evidence">Site Evidence</option>
                    <option value="other">Other Documents</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
                    Version
                  </label>
                  <input
                    type="text"
                    value={uploadVersion}
                    onChange={(e) => setUploadVersion(e.target.value)}
                    placeholder="v1.0"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#C58F58]"
                  >
                  </input>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
                  Description &amp; Context
                </label>
                <textarea
                  required
                  rows={3}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Summarize document scope, issuing authority, and key deliverables..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C58F58]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
                  Select File (PDF / CAD / Image)
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white/80 text-xs file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#2C5E50] file:text-white"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? 'Archiving Document...' : 'Archive in Owner Vault →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
