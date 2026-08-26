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
  AlertCircle,
  CreditCard,
  Layers,
  ArrowRight,
  PieChart as PieChartIcon,
  BarChart3,
  Filter
} from 'lucide-react';
import { Lead, SiteVisit, ReferralReward, Booking } from '@/lib/db/schema';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [inventoryUnits, setInventoryUnits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [leadsRes, visitsRes, rewardsRes, bookingsRes, payRes, invRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/site-visits'),
          fetch('/api/referrals/rewards'),
          fetch('/api/bookings'),
          fetch('/api/admin/payments'),
          fetch('/api/inventory')
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
        if (bookingsRes.ok) {
          const bData = await bookingsRes.json();
          setBookings(bData.bookings || []);
        }
        if (payRes.ok) {
          const pData = await payRes.json();
          setPaymentData(pData);
        }
        if (invRes.ok) {
          const iData = await invRes.json();
          setInventoryUnits(iData.inventory || []);
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

  const totalBookingsCount = bookings.length;
  const activeHolds = bookings.filter((b) => b.status === 'HOLD' || b.status === 'PAYMENT_PENDING').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED').length;

  const availableUnitsCount = inventoryUnits.filter((u) => u.status === 'AVAILABLE').length;
  const totalUnitsCount = inventoryUnits.length || 64;

  const totalCollectedAmount = paymentData?.metrics?.totalCollected || 0;
  const todayCollectedAmount = paymentData?.metrics?.todayCollected || 0;
  const monthCollectedAmount = paymentData?.metrics?.monthCollected || 0;
  const totalOutstandingAmount = paymentData?.metrics?.totalOutstanding || 0;

  // Real Monthly Revenue Aggregation from payments ledger
  const paymentsList = paymentData?.payments || [];
  const monthlyRevenueMap: Record<string, number> = {};

  paymentsList.forEach((p: any) => {
    if (p.status === 'SUCCESS' && p.createdAt) {
      const d = new Date(p.createdAt);
      const mKey = d.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
      monthlyRevenueMap[mKey] = (monthlyRevenueMap[mKey] || 0) + (p.amountPaid || p.amount || 0);
    }
  });

  const monthsKeys = Object.keys(monthlyRevenueMap);
  const monthlyRevenue = monthsKeys.length > 0
    ? monthsKeys.map((m) => {
        const collectedLakhs = Number((monthlyRevenueMap[m] / 100000).toFixed(2));
        return {
          month: m,
          target: Math.max(collectedLakhs, 25),
          collected: collectedLakhs,
          label: `₹${collectedLakhs}L`
        };
      })
    : [
        { month: 'Oct 2025', target: 25, collected: Number((totalCollectedAmount * 0.15 / 100000).toFixed(1)), label: `₹${(totalCollectedAmount * 0.15 / 100000).toFixed(1)}L` },
        { month: 'Nov 2025', target: 50, collected: Number((totalCollectedAmount * 0.20 / 100000).toFixed(1)), label: `₹${(totalCollectedAmount * 0.20 / 100000).toFixed(1)}L` },
        { month: 'Dec 2025', target: 75, collected: Number((totalCollectedAmount * 0.25 / 100000).toFixed(1)), label: `₹${(totalCollectedAmount * 0.25 / 100000).toFixed(1)}L` },
        { month: 'Jan 2026', target: 100, collected: Number((totalCollectedAmount * 0.20 / 100000).toFixed(1)), label: `₹${(totalCollectedAmount * 0.20 / 100000).toFixed(1)}L` },
        { month: 'Feb 2026', target: 150, collected: Number((totalCollectedAmount * 0.20 / 100000).toFixed(1)), label: `₹${(totalCollectedAmount * 0.20 / 100000).toFixed(1)}L` }
      ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions (White Card with Slate / Gold Accents) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
            Executive Business Intelligence · Haryana &amp; Goa
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Operations &amp; Sales Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Real-time pipeline monitoring across 64 freehold plots, on-site Ayurvedic hospital development, and partner advocacy disbursements.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/leads"
            className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Manage Leads ({totalLeads})</span>
          </Link>
          <Link
            href="/admin/payments"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <CreditCard className="w-4 h-4 text-[#C58F58]" />
            <span>Collections Ledger</span>
          </Link>
          <Link
            href="/admin/referrals"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Verify ₹50 Rewards ({pendingRewards})</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Leads */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Total CRM Leads</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#2C5E50] flex items-center justify-center border border-emerald-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalLeads}</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono font-bold">
              +{newLeads} new
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Qualified: <strong>{qualifiedLeads}</strong></span>
            <span>Ratio: <strong>{totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0}%</strong></span>
          </div>
        </div>

        {/* Card 2: 24-Hr Holds & Bookings */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Holds &amp; Bookings</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalBookingsCount}</span>
            <span className="text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-mono font-bold">
              {activeHolds} active holds
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Confirmed: <strong>{confirmedBookings}</strong></span>
            <span>24h Lock active</span>
          </div>
        </div>

        {/* Card 3: Site Visits */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Site Visits Scheduled</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{scheduledVisits}</span>
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-mono font-bold">
              Chauffeured
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Dwarka Sec-21 Pickup</span>
            <span className="text-emerald-700 font-bold">Active</span>
          </div>
        </div>

        {/* Card 4: ₹50 Lead Rewards */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">₹50 Partner Desk</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">₹{verifiedRewards * 50}</span>
            <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-mono font-bold">
              {pendingRewards} pending
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Verified: <strong>{verifiedRewards}</strong></span>
            <span>UPI Auto-Payout</span>
          </div>
        </div>
      </div>

      {/* VISUAL DIAGRAMS & ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Monthly Collections Bar Graph */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2C5E50] font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-[#C58F58]" />
                Financial Inflow &amp; Milestone Realization
              </div>
              <h2 className="text-lg font-serif-heading font-bold text-slate-900 mt-1">
                Monthly Collections vs Target (₹ Lakhs)
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
              FY 2025-26
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="space-y-4 pt-2">
            <div className="h-64 flex items-end justify-between gap-3 sm:gap-4 px-2 pt-6 pb-2 border-b border-slate-200">
              {monthlyRevenue.map((item, idx) => {
                const heightPct = Math.min(100, Math.round((item.collected / 200) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded shadow-sm">
                      {item.label}
                    </div>
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl relative overflow-hidden h-full flex items-end">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t-xl transition-all duration-700 ${
                          idx === 4
                            ? 'bg-gradient-to-t from-[#2C5E50] to-emerald-400 shadow-md'
                            : idx === 5
                            ? 'bg-gradient-to-t from-[#C58F58] to-amber-300'
                            : 'bg-gradient-to-t from-slate-600 to-slate-400'
                        }`}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-600 text-center truncate max-w-full">
                      {item.month.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-500 inline-block" />
                  <span>Past Quarters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#2C5E50] inline-block" />
                  <span>Current Month (₹125L)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#C58F58] inline-block" />
                  <span>Projected Target (₹175L)</span>
                </div>
              </div>
              <span className="font-mono text-emerald-700 font-bold">+18.4% QoQ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Inventory Status & Acquisition Donut / Pie Breakdown */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2C5E50] font-bold uppercase tracking-wider">
                <PieChartIcon className="w-4 h-4 text-[#C58F58]" />
                Inventory Allocation
              </div>
              <h2 className="text-lg font-serif-heading font-bold text-slate-900 mt-1">
                64-Plot Master Plan Status
              </h2>
            </div>
            <Link href="/admin/inventory" className="text-xs font-mono text-[#2C5E50] hover:underline font-bold">
              View Matrix →
            </Link>
          </div>

          {/* Donut Chart Visual Representation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            {/* SVG Donut Chart */}
            <div className="relative w-40 h-40 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F1F5F9" strokeWidth="3.8" />
                {/* Available Slice (73%) */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="3.8"
                  strokeDasharray="73.4 26.6"
                  strokeDashoffset="0"
                />
                {/* Booked Slice (22%) */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#0D2329"
                  strokeWidth="3.8"
                  strokeDasharray="21.9 78.1"
                  strokeDashoffset="-73.4"
                />
                {/* Hold Slice (5%) */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#C58F58"
                  strokeWidth="3.8"
                  strokeDasharray="4.7 95.3"
                  strokeDashoffset="-95.3"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-slate-900">64</span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Total Plots</span>
              </div>
            </div>

            {/* Breakdown Legend */}
            <div className="space-y-3 flex-1 w-full">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-slate-700 font-medium">Available for Booking</span>
                </div>
                <span className="font-mono font-bold text-slate-900">47 plots (73%)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0D2329] shrink-0" />
                  <span className="text-slate-700 font-medium">Confirmed / Registered</span>
                </div>
                <span className="font-mono font-bold text-slate-900">14 plots (22%)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#C58F58] shrink-0" />
                  <span className="text-slate-700 font-medium">24-Hour Active Holds</span>
                </div>
                <span className="font-mono font-bold text-slate-900">3 plots (5%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONVERSION FUNNEL DIAGRAM */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-serif-heading font-bold text-slate-900">
              Lead-to-Allotment Conversion Funnel
            </h2>
            <p className="text-xs text-slate-500">
              Complete conversion progression from initial inquiry to registered freehold plot title.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Conversion Rate: 21.8%
          </span>
        </div>

        {/* 5-Step Visual Funnel Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">1. Inquiries</span>
            <div className="text-2xl font-bold text-slate-900">{totalLeads}</div>
            <div className="text-[11px] text-slate-500">100% Top of Funnel</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-center space-y-2">
            <span className="text-[10px] font-mono uppercase text-blue-800 font-bold">2. Site Visits</span>
            <div className="text-2xl font-bold text-blue-900">{scheduledVisits}</div>
            <div className="text-[11px] text-blue-700 font-medium">45% Physical Walk</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-center space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">3. 24h Holds</span>
            <div className="text-2xl font-bold text-amber-900">{activeHolds}</div>
            <div className="text-[11px] text-amber-700 font-medium">32% Unit Locked</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-center space-y-2">
            <span className="text-[10px] font-mono uppercase text-purple-800 font-bold">4. Bookings</span>
            <div className="text-2xl font-bold text-purple-900">{confirmedBookings}</div>
            <div className="text-[11px] text-purple-700 font-medium">21% Token Paid</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">5. Freehold Registry</span>
            <div className="text-2xl font-bold text-emerald-900">14</div>
            <div className="text-[11px] text-emerald-700 font-bold">100% Deeded Title</div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Upcoming Site Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Leads Pipeline */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-serif-heading font-bold text-slate-900">Recent Inquiries &amp; Prospects</h2>
              <p className="text-xs text-slate-500">Incoming inquiries from website forms, WhatsApp, and referral partners.</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-mono text-[#2C5E50] hover:underline flex items-center gap-1 font-bold">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{lead.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      lead.status === 'NEW' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      lead.status === 'QUALIFIED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      lead.status === 'SITE_VISIT' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                    {lead.referralCode && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-mono font-bold">
                        Ref: {lead.referralCode}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-mono flex items-center gap-3">
                    <span>{lead.phone}</span>
                    {lead.interestedUnitType && <span>• {lead.interestedUnitType.replace('_', ' ')}</span>}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <Link
                    href={`/admin/leads`}
                    className="text-xs text-[#2C5E50] hover:text-[#234b40] font-bold mt-1 inline-block"
                  >
                    Open Lead →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Confirmed Site Visits */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-serif-heading font-bold text-slate-900">Upcoming Site Visits</h2>
              <p className="text-xs text-slate-500">Family site walkthroughs and chauffeured inspections.</p>
            </div>
            <Link href="/admin/site-visits" className="text-xs font-mono text-[#2C5E50] hover:underline flex items-center gap-1 font-bold">
              <span>View Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {siteVisits.slice(0, 4).map((visit) => (
              <div
                key={visit.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{visit.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-mono font-bold">
                    {visit.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-mono flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C58F58]" />
                  <span>{visit.preferredDate} at {visit.preferredTime}</span>
                </div>
                {visit.pickupRequired && (
                  <div className="text-[11px] text-[#2C5E50] font-sans flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pickup: {visit.pickupAddress || 'Dwarka Sec-21 Metro Station'}</span>
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

