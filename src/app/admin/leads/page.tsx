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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            CRM &amp; Lead Management
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Track inquiries, verify referral attributions, schedule visits, and nurture family relationships.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-[#091B20] border border-white/10">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, email, or referral code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#C58F58]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'BOOKED', 'CONVERTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#2C5E50] text-white shadow-md'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-white/5 text-white/60 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Lead ID &amp; Name</th>
                <th className="py-4 px-6">Contact Details</th>
                <th className="py-4 px-6">Interest &amp; Budget</th>
                <th className="py-4 px-6">Source / Referral</th>
                <th className="py-4 px-6">Current Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => openLeadDetails(lead)}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <div className="font-bold text-white text-sm">{lead.name}</div>
                    <span className="text-[10px] font-mono text-white/40">{lead.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-mono text-white">{lead.phone}</div>
                    {lead.email && <div className="text-white/50 text-[11px]">{lead.email}</div>}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-white font-medium">
                      {lead.interestedUnitType ? lead.interestedUnitType.replace('_', ' ') : 'General Sanctuary'}
                    </div>
                    {lead.budgetRange && (
                      <span className="text-[10px] font-mono text-[#E0AB77]">{lead.budgetRange}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white/80 block w-fit">
                      {lead.source}
                    </span>
                    {lead.referralCode && (
                      <span className="text-[10px] font-mono text-[#C58F58] font-bold block mt-1">
                        Ref: {lead.referralCode}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      lead.status === 'NEW' ? 'bg-amber-500/20 text-amber-300' :
                      lead.status === 'QUALIFIED' ? 'bg-emerald-500/20 text-emerald-300' :
                      lead.status === 'SITE_VISIT' ? 'bg-blue-500/20 text-blue-300' :
                      lead.status === 'BOOKED' ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-white/70'
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
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#2C5E50] text-white text-xs font-bold transition-colors"
                    >
                      View Dossier →
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/40 font-mono text-xs">
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-xl bg-[#091B20] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#C58F58] font-bold tracking-widest">
                    PROSPECT DOSSIER // {selectedLead.id}
                  </span>
                  <h2 className="text-xl font-serif-heading font-bold text-white">{selectedLead.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Direct Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="p-3 rounded-2xl bg-[#2C5E50] text-white flex items-center justify-center gap-2 text-xs font-bold shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {selectedLead.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedLead.name)},%20greetings%20from%20Senior%20Living%20Citizen%20Foundation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#25D366] text-white flex items-center justify-center gap-2 text-xs font-bold shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Contact</span>
                </a>
              </div>

              {/* Status Selector */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Update Pipeline Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'NEGOTIATION', 'BOOKED', 'CONVERTED', 'LOST'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      disabled={isUpdating}
                      onClick={() => updateStatus(selectedLead.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        selectedLead.status === st
                          ? 'bg-[#C58F58] text-white shadow-md'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Referral & Attribution Info */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Acquisition &amp; Referral Details
                </span>
                <div className="text-xs text-white/80 space-y-1 font-mono">
                  <div>Source: <span className="text-[#E0AB77] font-bold">{selectedLead.source}</span></div>
                  {selectedLead.referralCode && (
                    <div>Referral Code: <span className="text-emerald-400 font-bold">{selectedLead.referralCode}</span></div>
                  )}
                  {selectedLead.utmCampaign && <div>Campaign: {selectedLead.utmCampaign}</div>}
                  <div>Created: {new Date(selectedLead.createdAt).toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Timeline Activity Events */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Activity Timeline
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {leadEvents.map((evt) => (
                    <div key={evt.id} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                        <span>{evt.actorName || 'System'}</span>
                        <span>{new Date(evt.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-white/90">{evt.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Note / Follow-up */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Add Interaction Note
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter discussion notes or next follow-up action..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#C58F58]"
                  />
                  <button
                    disabled={!newNote.trim() || isUpdating}
                    onClick={() => updateStatus(selectedLead.id, selectedLead.status)}
                    className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5"
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
