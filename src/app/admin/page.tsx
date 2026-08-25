'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  CalendarCheck,
  Building2,
  Award,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Lead, SiteVisit, ReferralReward, AuditLog } from '@/lib/db/schema';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [leadsRes, visitsRes, rewardsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/site-visits'),
          fetch('/api/referrals/rewards')
        ]);

        if (leadsRes.ok) {
          const lData = await leadsRes.json();
          setLeads(lData.leads || []);
        }
        if (visitsRes.ok) {
          const vData = await visitsRes.json();
          setSiteVisits(vData.siteVisits || []);
        }
        if (rewardsRes.ok) {
          const rData = await rewardsRes.json();
          setRewards(rData.rewards || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'NEW').length;
  const qualifiedLeads = leads.filter((l) => l.status === 'QUALIFIED').length;
  const scheduledVisits = siteVisits.filter((v) => v.status === 'CONFIRMED' || v.status === 'REQUESTED').length;
  const pendingRewards = rewards.filter((r) => r.status === 'PENDING').length;
  const verifiedRewards = rewards.filter((r) => r.status === 'VERIFIED').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0D2329] to-[#091B20] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/30 text-[#E0AB77] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Executive Business Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Foundation Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-white/70">
            Real-time pipeline monitoring across Haryana (Pre-Launch), Goa (Ready-to-Move), and Referral Networks.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/leads"
            className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage Leads</span>
          </Link>
          <Link
            href="/admin/referrals"
            className="px-4 py-2.5 rounded-xl bg-[#C58F58] hover:bg-[#B37E47] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Verify ₹50 Rewards ({pendingRewards})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Leads */}
        <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white/60">Total CRM Leads</span>
            <div className="w-9 h-9 rounded-xl bg-[#2C5E50]/30 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalLeads}</span>
            <span className="text-xs text-emerald-400 font-mono font-bold">+{newLeads} new</span>
          </div>
          <div className="text-[11px] text-white/50 flex items-center gap-1">
            <span>{qualifiedLeads} qualified prospects</span>
          </div>
        </div>

        {/* Card 2: Site Visits */}
        <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white/60">Site Visits Active</span>
            <div className="w-9 h-9 rounded-xl bg-[#C58F58]/30 text-[#E0AB77] flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{scheduledVisits}</span>
            <span className="text-xs text-[#E0AB77] font-mono font-bold">Confirmed</span>
          </div>
          <div className="text-[11px] text-white/50 flex items-center gap-1">
            <span>VIP pickup &amp; walkthroughs</span>
          </div>
        </div>

        {/* Card 3: ₹50 Verified Lead Desk */}
        <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white/60">₹50 Referral Rewards</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">₹{verifiedRewards * 50}</span>
            <span className="text-xs text-amber-300 font-mono font-bold">{pendingRewards} pending</span>
          </div>
          <div className="text-[11px] text-white/50 flex items-center gap-1">
            <span>{verifiedRewards} verified submissions</span>
          </div>
        </div>

        {/* Card 4: Inventory Units */}
        <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white/60">Inventory Portfolio</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">73</span>
            <span className="text-xs text-blue-400 font-mono font-bold">64 Plots + 9 Apts</span>
          </div>
          <div className="text-[11px] text-white/50 flex items-center gap-1">
            <span>Real-time 3D sync enabled</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Upcoming Site Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Leads Pipeline */}
        <div className="lg:col-span-7 bg-[#091B20] border border-white/10 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-serif-heading font-bold text-white">Recent Inquiries &amp; Prospects</h2>
              <p className="text-xs text-white/60">Incoming inquiries from website forms, WhatsApp, and referral partners.</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-mono text-[#C58F58] hover:underline flex items-center gap-1 font-bold">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{lead.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      lead.status === 'NEW' ? 'bg-amber-500/20 text-amber-300' :
                      lead.status === 'QUALIFIED' ? 'bg-emerald-500/20 text-emerald-300' :
                      lead.status === 'SITE_VISIT' ? 'bg-blue-500/20 text-blue-300' : 'bg-white/10 text-white/70'
                    }`}>
                      {lead.status}
                    </span>
                    {lead.referralCode && (
                      <span className="px-2 py-0.5 rounded-full bg-[#C58F58]/20 text-[#E0AB77] text-[10px] font-mono font-bold">
                        Ref: {lead.referralCode}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/60 font-mono flex items-center gap-3">
                    <span>{lead.phone}</span>
                    {lead.interestedUnitType && <span>• {lead.interestedUnitType.replace('_', ' ')}</span>}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-white/40 block">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <Link
                    href={`/admin/leads`}
                    className="text-xs text-[#2C5E50] hover:text-[#3D7363] text-emerald-400 font-bold mt-1 inline-block"
                  >
                    Open Lead →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Confirmed Site Visits */}
        <div className="lg:col-span-5 bg-[#091B20] border border-white/10 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-serif-heading font-bold text-white">Upcoming Site Visits</h2>
              <p className="text-xs text-white/60">Family site walkthroughs and chauffeured inspections.</p>
            </div>
            <Link href="/admin/site-visits" className="text-xs font-mono text-[#C58F58] hover:underline flex items-center gap-1 font-bold">
              <span>View Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {siteVisits.slice(0, 4).map((visit) => (
              <div
                key={visit.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{visit.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                    {visit.status}
                  </span>
                </div>
                <div className="text-xs text-white/70 font-mono flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>{visit.preferredDate} at {visit.preferredTime}</span>
                </div>
                {visit.pickupRequired && (
                  <div className="text-[11px] text-emerald-400 font-sans flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pickup Requested ({visit.pickupAddress || 'Address on file'})</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
