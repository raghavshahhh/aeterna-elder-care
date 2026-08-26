'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  DollarSign,
  Share2,
  Users,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
  LogOut,
  Home
} from 'lucide-react';
import { Referrer, ReferralReward, Commission } from '@/lib/db/schema';

export default function PartnerDashboardPage() {
  const [partner, setPartner] = useState<Referrer | null>(null);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPartnerData() {
      try {
        const res = await fetch('/api/referrals');
        if (res.ok) {
          const data = await res.json();
          if (data.partner) {
            setPartner(data.partner);
            setRewards(data.rewards || []);
            setCommissions(data.commissions || []);
          } else if (data.referrers && data.referrers.length > 0) {
            // Default demo partner
            setPartner(data.referrers[0]);
            const rRes = await fetch('/api/referrals/rewards');
            if (rRes.ok) {
              const rData = await rRes.json();
              setRewards(rData.rewards || []);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load partner data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPartnerData();
  }, []);

  const [origin, setOrigin] = useState('https://aeterna-elder-care.vercel.app');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const referralUrl = partner
    ? `${origin}/?ref=${partner.code}`
    : '';

  const copyToClipboard = () => {
    if (referralUrl) {
      navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-white/60">Loading Partner Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071519] text-[#FAF8F5] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Partner Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#091B20] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/95 border border-white/20 p-1 flex items-center justify-center shrink-0">
              <img
                src="/project-assets/brand/logo-icon.png"
                alt="Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-serif-heading font-bold text-white">
                  {partner?.name || 'Advocate Partner'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/30 text-[#E0AB77] font-mono text-[10px] font-bold">
                  Code: {partner?.code || 'SLF8K2'}
                </span>
              </div>
              <span className="text-xs font-mono text-white/50">{partner?.phone || '+91 98101 23456'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>Public Website</span>
            </Link>
          </div>
        </header>

        {/* Referral Link & WhatsApp Share Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0D2329] to-[#091B20] border border-white/10 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-[#E0AB77] font-bold">YOUR UNIQUE SHARING LINK</span>
              <h2 className="text-lg sm:text-xl font-serif-heading font-bold text-white">
                Earn ₹50 per Verified Lead + 1% Sales Commission
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
              30-Day Cookie Active
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white">
            <span className="truncate w-full">{referralUrl}</span>
            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Explore Senior Living Citizens Foundation's master sanctuary with G+2 senior residences & Ayurvedic care: ${referralUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-2">
            <span className="text-xs font-mono uppercase text-white/50">Total Clicks</span>
            <div className="text-2xl font-bold text-white">{partner?.totalVisits || 142}</div>
            <span className="text-[10px] text-white/40 font-mono">Prospect visitors</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-2">
            <span className="text-xs font-mono uppercase text-white/50">Leads Submitted</span>
            <div className="text-2xl font-bold text-white">{partner?.totalLeadsSubmitted || 18}</div>
            <span className="text-[10px] text-white/40 font-mono">Inquiry forms</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-2">
            <span className="text-xs font-mono uppercase text-white/50">₹50 Verified Bonuses</span>
            <div className="text-2xl font-bold text-emerald-400">
              ₹{(partner?.verifiedLeadsCount || 14) * 50}
            </div>
            <span className="text-[10px] text-emerald-400/80 font-mono">{partner?.verifiedLeadsCount || 14} verified leads</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-2">
            <span className="text-xs font-mono uppercase text-white/50">Sales Commissions</span>
            <div className="text-2xl font-bold text-[#E0AB77]">
              ₹{(partner?.totalEarnedCommissions || 25000).toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-[#E0AB77]/80 font-mono">1% on confirmed booking</span>
          </div>
        </div>

        {/* Referral Rewards Table */}
        <div className="p-6 rounded-3xl bg-[#091B20] border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-base font-serif-heading font-bold text-white">
            Your Referred Inquiries &amp; Bonus Status
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-white/5 text-white/60 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Lead Name</th>
                  <th className="py-3 px-4">Reward</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rewards.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 px-4 font-bold text-white">{r.leadName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">₹{r.rewardAmount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          r.status === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : r.status === 'PENDING'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-white/40">
                      {new Date(r.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
