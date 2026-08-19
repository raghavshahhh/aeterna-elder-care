'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockAdminLeads, mockAdminBookings, AdminLead, AdminBooking } from '@/data/adminData';
import { servicesData } from '@/data/servicesData';
import { carePlansData } from '@/data/plansData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/context/ToastContext';
import {
  Users,
  Calendar,
  Layers,
  DollarSign,
  PhoneCall,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Filter,
  Search,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function AdminPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('leads');

  const [leads, setLeads] = useState<AdminLead[]>(mockAdminLeads);
  const [bookings, setBookings] = useState<AdminBooking[]>(mockAdminBookings);
  const [leadFilter, setLeadFilter] = useState('all');

  const handleUpdateLeadStatus = (leadId: string, newStatus: AdminLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    showToast({
      title: 'Lead Status Updated',
      description: `Lead #${leadId} moved to "${newStatus}".`,
      type: 'success'
    });
  };

  const adminTabs = [
    { id: 'leads', label: 'Incoming Leads Pipeline', count: leads.length, icon: <Users className="w-4 h-4" /> },
    { id: 'bookings', label: 'Service Bookings Roster', count: bookings.length, icon: <Calendar className="w-4 h-4" /> },
    { id: 'services', label: 'Services CMS Catalog', count: servicesData.length, icon: <Layers className="w-4 h-4" /> },
    { id: 'plans', label: 'Care Plans Pricing Editor', count: carePlansData.length, icon: <DollarSign className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Top Banner Notice */}
      <div className="bg-[#0D2329] text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#C58F58] shrink-0" />
          <span>
            <strong>Aeterna Care CRM & Admin Console Demo</strong>: Triage incoming inquiries from the 8-step wizard, assign nurses, and manage service rosters.
          </span>
        </div>
        <Badge variant="gold" size="sm">
          Admin Portal Active
        </Badge>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5C6F75]">
            <span>Total Active Inquiries</span>
            <Users className="w-4 h-4 text-[#3D685A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0D2329]">142</div>
          <span className="text-[11px] text-emerald-700 font-semibold">+18 New Today</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5C6F75]">
            <span>Active Care Members</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0D2329]">3,850</div>
          <span className="text-[11px] text-emerald-700 font-semibold">98.4% Retention Rate</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5C6F75]">
            <span>Active Shifts Today</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0D2329]">584</div>
          <span className="text-[11px] text-blue-700 font-semibold">100% Punctual (Biometric)</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5C6F75]">
            <span>Emergency SLA Speed</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0D2329]">13.8 Mins</div>
          <span className="text-[11px] text-emerald-700 font-semibold">12 Metros Monitored</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        options={adminTabs}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id)}
        variant="underline"
      />

      {/* TAB 1: LEADS MANAGEMENT */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              Live Inquiries & 8-Step Wizard Leads
            </h2>
            <div className="flex gap-2 text-xs">
              {['all', 'New', 'Contacted', 'Qualified', 'Converted'].map((st) => (
                <button
                  key={st}
                  onClick={() => setLeadFilter(st)}
                  className={`px-3 py-1.5 rounded-full font-semibold border ${
                    leadFilter === st
                      ? 'bg-[#0D2329] text-white border-[#0D2329]'
                      : 'bg-white text-[#5C6F75] border-[#E8E2D8]'
                  }`}
                >
                  {st === 'all' ? 'All Leads' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-[#E8E2D8] shadow-sm">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E8E2D8] bg-[#FBF9F5] text-[#5C6F75] font-semibold">
                  <th className="py-4 px-4">Lead ID / Date</th>
                  <th className="py-4 px-4">Patient Profile</th>
                  <th className="py-4 px-4">Service Requested</th>
                  <th className="py-4 px-4">City / Contact</th>
                  <th className="py-4 px-4">Status Pipeline</th>
                  <th className="py-4 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]">
                {leads
                  .filter((l) => leadFilter === 'all' || l.status === leadFilter)
                  .map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FBF9F5]">
                      <td className="py-4 px-4 font-mono font-bold text-[#0D2329]">
                        {lead.id}
                        <span className="block text-[10px] text-[#5C6F75] font-sans font-normal">
                          {lead.createdDate}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <strong className="text-[#0D2329] block text-sm">{lead.patientName}</strong>
                        <span className="text-[#5C6F75]">{lead.age} yrs • {lead.contactName}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-semibold text-[#0D2329] block">{lead.serviceRequested}</span>
                        <span className="text-[10px] text-emerald-700 font-bold">{lead.estimatedValue}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-[#0D2329] font-medium block">{lead.city}</span>
                        <a href={`tel:${lead.phone}`} className="text-[#C58F58] hover:underline font-mono">
                          {lead.phone}
                        </a>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="bg-[#F6F1E8] border border-[#E2D7C5] rounded-xl px-2.5 py-1 text-xs font-bold text-[#0D2329] focus:outline-none"
                        >
                          <option value="New">New Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => {
                            showToast({
                              title: 'Opening WhatsApp Desk',
                              description: `Connecting with ${lead.contactName} (${lead.phone}).`,
                              type: 'success'
                            });
                          }}
                          className="p-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="WhatsApp Triage"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS ROSTER */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
            Active Scheduled Service Bookings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookings.map((bk) => (
              <div
                key={bk.id}
                className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="font-mono font-bold text-xs text-[#0D2329]">{bk.id}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {bk.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#0D2329]">{bk.service}</h3>
                  <p className="text-xs text-[#5C6F75] mt-0.5">{bk.customerName} • {bk.city}</p>
                </div>

                <div className="text-xs text-[#5C6F75] space-y-1">
                  <div>Assigned Staff: <strong className="text-[#0D2329]">{bk.assignedStaff}</strong></div>
                  <div>Scheduled: <strong>{bk.dateTime}</strong></div>
                  <div>Payment: <span className="text-emerald-700 font-semibold">{bk.paymentStatus} ({bk.amount})</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES CMS */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
            Clinical Services CMS Management
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicesData.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-sm text-[#0D2329]">{srv.title}</h3>
                  <p className="text-xs text-[#5C6F75]">{srv.categoryName} • From {srv.startingPrice}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Active & Live on Website</span>
                </div>

                <Link href={`/services/${srv.slug}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Live →
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PLANS PRICING CMS */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
            Membership Plan Tiers & Deliverables
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carePlansData.map((pln) => (
              <div
                key={pln.id}
                className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#0D2329]">{pln.name}</h3>
                  <span className="text-sm font-extrabold text-[#0D2329]">₹{pln.priceMonthly} / mo</span>
                </div>
                <p className="text-xs text-[#5C6F75]">{pln.tagline}</p>
                <div className="text-xs text-emerald-700 font-semibold">
                  Annual Price: ₹{pln.priceAnnual}/yr • {pln.doctorVisitsPerYear} Doctor Visits Included
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
