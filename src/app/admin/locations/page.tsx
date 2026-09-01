'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  X
} from 'lucide-react';
import { Location } from '@/lib/db/schema';

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newLoc, setNewLoc] = useState({
    name: '',
    slug: '',
    state: '',
    city: '',
    tagline: '',
    description: '',
    heroImage: '/project-assets/real-site/drone/real-land-aerial-1.jpg',
    featuredProjectCount: 1,
    isPublished: true,
    displayOrder: 1
  });

  useEffect(() => {
    loadLocations();
  }, []);

  async function loadLocations() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/locations');
      if (res.ok) {
        const data = await res.json();
        setLocations(data.locations || []);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function togglePublish(loc: Location) {
    try {
      const res = await fetch('/api/locations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loc.id, isPublished: !loc.isPublished })
      });
      if (res.ok) {
        const data = await res.json();
        setLocations((prev) => prev.map((l) => (l.id === loc.id ? data.location : l)));
      }
    } catch (err) {
      console.error('Error toggling location publish:', err);
    }
  }

  async function handleAddLocation(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLoc)
      });
      if (res.ok) {
        setIsAdding(false);
        setNewLoc({
          name: '',
          slug: '',
          state: '',
          city: '',
          tagline: '',
          description: '',
          heroImage: '/project-assets/real-site/drone/real-land-aerial-1.jpg',
          featuredProjectCount: 1,
          isPublished: true,
          displayOrder: locations.length + 1
        });
        loadLocations();
      }
    } catch (err) {
      console.error('Error creating location:', err);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>EXPANSION ROADMAP &amp; CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Sanctuary Locations CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Expand Foundation sanctuaries across Haryana, Goa, Dehradun, and future cities without code changes.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Location</span>
        </button>
      </div>

      {/* Add Location Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-lg font-serif-heading font-bold text-slate-900">Add New Sanctuary Location</h2>
              <button onClick={() => setIsAdding(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLocation} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1 uppercase text-[10px] font-bold">Location Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dehradun (Himalayan Valley)"
                    value={newLoc.name}
                    onChange={(e) => setNewLoc({ ...newLoc, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-mono mb-1 uppercase text-[10px] font-bold">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. dehradun"
                    value={newLoc.slug}
                    onChange={(e) => setNewLoc({ ...newLoc, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-mono mb-1 uppercase text-[10px] font-bold">State</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttarakhand"
                    value={newLoc.state}
                    onChange={(e) => setNewLoc({ ...newLoc, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-mono mb-1 uppercase text-[10px] font-bold">City / Region</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Doon Valley"
                    value={newLoc.city}
                    onChange={(e) => setNewLoc({ ...newLoc, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2C5E50]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-mono mb-1 uppercase text-[10px] font-bold">Tagline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Serene Mountain Sanctuary with Geriatric Wellness"
                  value={newLoc.tagline}
                  onChange={(e) => setNewLoc({ ...newLoc, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2C5E50]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-mono mb-1 uppercase text-[10px] font-bold">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of the sanctuary environment..."
                  value={newLoc.description}
                  onChange={(e) => setNewLoc({ ...newLoc, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2C5E50]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Location</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Locations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif-heading font-bold text-slate-900">{loc.name}</h3>
                  <span className="text-xs font-mono text-[#2C5E50]">/{loc.slug}</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    loc.isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {loc.isPublished ? 'PUBLISHED' : 'DRAFT'}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">{loc.tagline}</p>
              <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">{loc.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 font-bold">
                {loc.city}, {loc.state}
              </span>
              <button
                onClick={() => togglePublish(loc)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              >
                {loc.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{loc.isPublished ? 'Unpublish' : 'Publish'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

