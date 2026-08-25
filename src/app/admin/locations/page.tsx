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
    heroImage: '/project-assets/real/drone-aerial.jpg',
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
          heroImage: '/project-assets/real/drone-aerial.jpg',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Sanctuary Locations CMS
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Expand Foundation sanctuaries across Haryana, Goa, Dehradun, and future cities without code changes.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Location</span>
        </button>
      </div>

      {/* Add Location Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#091B20] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-serif-heading font-bold text-white">Add New Sanctuary Location</h2>
              <button onClick={() => setIsAdding(false)} className="p-1 rounded-lg text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLocation} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 font-mono mb-1 uppercase text-[10px]">Location Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dehradun (Himalayan Valley)"
                    value={newLoc.name}
                    onChange={(e) => setNewLoc({ ...newLoc, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-mono mb-1 uppercase text-[10px]">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. dehradun"
                    value={newLoc.slug}
                    onChange={(e) => setNewLoc({ ...newLoc, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 font-mono mb-1 uppercase text-[10px]">State</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttarakhand"
                    value={newLoc.state}
                    onChange={(e) => setNewLoc({ ...newLoc, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-mono mb-1 uppercase text-[10px]">City / Region</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Doon Valley"
                    value={newLoc.city}
                    onChange={(e) => setNewLoc({ ...newLoc, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 font-mono mb-1 uppercase text-[10px]">Tagline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Serene Mountain Sanctuary with Geriatric Wellness"
                  value={newLoc.tagline}
                  onChange={(e) => setNewLoc({ ...newLoc, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-white/60 font-mono mb-1 uppercase text-[10px]">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of the sanctuary environment..."
                  value={newLoc.description}
                  onChange={(e) => setNewLoc({ ...newLoc, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white font-bold flex items-center gap-1.5"
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
            className="p-6 rounded-3xl bg-[#091B20] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif-heading font-bold text-white">{loc.name}</h3>
                  <span className="text-xs font-mono text-[#C58F58]">/{loc.slug}</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    loc.isPublished ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {loc.isPublished ? 'PUBLISHED' : 'DRAFT'}
                </span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-sans">{loc.tagline}</p>
              <p className="text-[11px] text-white/50 line-clamp-3 leading-relaxed">{loc.description}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/60">
                {loc.city}, {loc.state}
              </span>
              <button
                onClick={() => togglePublish(loc)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
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
