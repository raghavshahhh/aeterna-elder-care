'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  PhoneCall,
  Mail,
  Calendar,
  MessageSquare,
  Sparkles,
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  Send,
  Plus
} from 'lucide-react';
import { Lead, LeadStatus, LeadEvent } from '@/lib/db/schema';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadEvents, setLeadEvents] = useState<LeadEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function openLeadDetails(lead: Lead) {
    setSelectedLead(lead);
    try {
      const res = await fetch(`/api/leads/${lead.id}`);
      if (res.ok) {
        const data = await res.json();
        setLeadEvents(data.events || []);
      }
    } catch (err) {
      console.error('Error fetching lead events:', err);
    }
  }

  async function updateStatus(leadId: string, nextStatus: LeadStatus) {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus, notes: newNote || undefined })
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (selectedLead?.id === leadId) {
          setSelectedLead(data.lead);
          openLeadDetails(data.lead);
        }
        setNewNote('');
      }
    } catch (err) {
      console.error('Error updating lead status:', err);
    } finally {
      setIsUpdating(false);
    }
  }

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchPhone = lead.phone.includes(q);
      const matchEmail = lead.email?.toLowerCase().includes(q);
      const matchRef = lead.referralCode?.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchRef) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Users className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>CRM &amp; PROSPECT ENGAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Leads &amp; Inquiries Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track inquiries, verify referral attributions, schedule visits, and nurture family relationships.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, email, or referral code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#2C5E50]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'BOOKED', 'CONVERTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#2C5E50] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 font-bold">Lead ID &amp; Name</th>
                <th className="py-4 px-6 font-bold">Contact Details</th>
                <th className="py-4 px-6 font-bold">Interest &amp; Budget</th>
                <th className="py-4 px-6 font-bold">Source / Referral</th>
                <th className="py-4 px-6 font-bold">Current Status</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => openLeadDetails(lead)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                    <span className="text-[10px] font-mono text-slate-400">{lead.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-mono text-slate-800 font-semibold">{lead.phone}</div>
                    {lead.email && <div className="text-slate-500 text-[11px]">{lead.email}</div>}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800 font-medium">
                      {lead.interestedUnitType ? lead.interestedUnitType.replace('_', ' ') : 'General Sanctuary'}
                    </div>
                    {lead.budgetRange && (
                      <span className="text-[10px] font-mono text-[#2C5E50] font-bold">{lead.budgetRange}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 block w-fit font-medium">
                      {lead.source}
                    </span>
                    {lead.referralCode && (
                      <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-bold block mt-1 w-fit border border-amber-200">
                        Ref: {lead.referralCode}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      lead.status === 'NEW' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      lead.status === 'QUALIFIED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      lead.status === 'SITE_VISIT' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                      lead.status === 'BOOKED' ? 'bg-purple-50 text-purple-800 border border-purple-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLeadDetails(lead);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#2C5E50] hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                    >
                      View Dossier →
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-mono text-xs">
                    No leads matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Over Lead Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#2C5E50] font-bold tracking-widest">
                    PROSPECT DOSSIER // {selectedLead.id}
                  </span>
                  <h2 className="text-xl font-serif-heading font-bold text-slate-900">{selectedLead.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Direct Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="p-3 rounded-2xl bg-[#2C5E50] hover:bg-[#234b40] text-white flex items-center justify-center gap-2 text-xs font-bold shadow-xs transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {selectedLead.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedLead.name)},%20greetings%20from%20Senior%20Living%20Citizens%20Foundation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 text-xs font-bold shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Contact</span>
                </a>
              </div>

              {/* Status Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                  Update Pipeline Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'NEGOTIATION', 'BOOKED', 'CONVERTED', 'LOST'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      disabled={isUpdating}
                      onClick={() => updateStatus(selectedLead.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedLead.status === st
                          ? 'bg-[#2C5E50] text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Referral & Attribution Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                  Acquisition &amp; Referral Details
                </span>
                <div className="text-xs text-slate-700 space-y-1 font-mono">
                  <div>Source: <span className="text-[#2C5E50] font-bold">{selectedLead.source}</span></div>
                  {selectedLead.referralCode && (
                    <div>Referral Code: <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200">{selectedLead.referralCode}</span></div>
                  )}
                  {selectedLead.utmCampaign && <div>Campaign: {selectedLead.utmCampaign}</div>}
                  <div>Created: {new Date(selectedLead.createdAt).toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Timeline Activity Events */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                  Activity Timeline
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {leadEvents.map((evt) => (
                    <div key={evt.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>{evt.actorName || 'System'}</span>
                        <span>{new Date(evt.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-slate-800 font-medium">{evt.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Note / Follow-up */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                  Add Interaction Note
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter discussion notes or next follow-up action..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#2C5E50]"
                  />
                  <button
                    disabled={!newNote.trim() || isUpdating}
                    onClick={() => updateStatus(selectedLead.id, selectedLead.status)}
                    className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

