'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  ExternalLink,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/lib/db/schema';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function togglePublish(proj: Project) {
    try {
      const res = await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: proj.id, isPublished: !proj.isPublished })
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === proj.id ? data.project : p)));
      }
    } catch (err) {
      console.error('Error toggling project publish:', err);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>DEVELOPMENT PROJECTS CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Projects &amp; Masterplans CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure project blueprints, 3D viewers, commercial pricing propositions, and healthcare amenities.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif-heading font-bold text-slate-900">{proj.name}</h3>
                  <span className="text-xs font-mono text-[#2C5E50]">/{proj.slug}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                    proj.status === 'PRE_LAUNCH'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : proj.status === 'READY_TO_MOVE'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {proj.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">{proj.headline}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono text-slate-600">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Inventory Scope</span>
                  <span className="text-slate-900 font-bold">{proj.totalPlots ? `${proj.totalPlots} Plots` : `${proj.totalResidences} Residences`}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Commercial Model</span>
                  <span className="text-amber-800 font-bold text-[11px] truncate block">{proj.pricing.basePriceDisplay}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 pt-2">
                <span>3D: {proj.enable3D ? '✓ Active' : '✕ Disabled'}</span>
                <span>•</span>
                <span>CAD: {proj.enableCAD ? '✓ Active' : '✕ Disabled'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/projects/${proj.slug}`}
                target="_blank"
                className="text-xs font-bold text-[#2C5E50] hover:underline flex items-center gap-1 font-mono"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => togglePublish(proj)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              >
                {proj.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{proj.isPublished ? 'Unpublish' : 'Publish'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

