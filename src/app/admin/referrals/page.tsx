'use client';

import React, { useState, useEffect } from 'react';
import {
  Award,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
  Share2,
  DollarSign,
  Search,
  Filter
} from 'lucide-react';
import { Referrer, ReferralReward, Commission } from '@/lib/db/schema';

export default function AdminReferralsPage() {
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [activeTab, setActiveTab] = useState<'REWARDS' | 'PARTNERS' | 'COMMISSIONS'>('REWARDS');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReferralData();
  }, []);

  async function loadReferralData() {
    setIsLoading(true);
    try {
      const [refRes, rewRes, comRes] = await Promise.all([
        fetch('/api/referrals'),
        fetch('/api/referrals/rewards'),
        fetch('/api/commissions')
      ]);

      if (refRes.ok) {
        const r = await refRes.json();
        setReferrers(r.referrers || []);
      }
      if (rewRes.ok) {
        const rw = await rewRes.json();
        setRewards(rw.rewards || []);
      }
      if (comRes.ok) {
        const c = await comRes.json();
        setCommissions(c.commissions || []);
      }
    } catch (err) {
      console.error('Error fetching referral data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function verifyReward(rewardId: string, isApproved: boolean) {
    try {
      const res = await fetch('/api/referrals/rewards', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardId, isApproved })
      });
      if (res.ok) {
        const data = await res.json();
        setRewards((prev) => prev.map((rw) => (rw.id === rewardId ? data.reward : rw)));
        loadReferralData();
      }
    } catch (err) {
      console.error('Error verifying reward:', err);
    }
  }

  async function updateCommission(commissionId: string, status: 'APPROVED' | 'PAID') {
    try {
      const res = await fetch('/api/commissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: commissionId, status })
      });
      if (res.ok) {
        const data = await res.json();
        setCommissions((prev) => prev.map((c) => (c.id === commissionId ? data.commission : c)));
        loadReferralData();
      }
    } catch (err) {
      console.error('Error updating commission:', err);
    }
  }

  const pendingRewards = rewards.filter((r) => r.status === 'PENDING');
  const verifiedRewards = rewards.filter((r) => r.status === 'VERIFIED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/30 text-[#E0AB77] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Partner Growth Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Referrals &amp; ₹50 Verified Lead Desk
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Verify legitimate inquiries, approve ₹50 lead bonuses, and manage sales commission payouts.
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-white/10 gap-4">
        <button
          onClick={() => setActiveTab('REWARDS')}
          className={`pb-3 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'REWARDS'
              ? 'border-[#C58F58] text-[#E0AB77]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>₹50 Lead Reward Queue ({pendingRewards.length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('PARTNERS')}
          className={`pb-3 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'PARTNERS'
              ? 'border-[#C58F58] text-[#E0AB77]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Partner Directory ({referrers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('COMMISSIONS')}
          className={`pb-3 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'COMMISSIONS'
              ? 'border-[#C58F58] text-[#E0AB77]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Sales Commissions ({commissions.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'REWARDS' && (
        <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-base font-serif-heading font-bold text-white">
              Pending &amp; Processed ₹50 Verified Lead Rewards
            </h2>
            <span className="text-xs font-mono text-[#E0AB77] font-bold">
              Total Verified Payouts: ₹{verifiedRewards.length * 50}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-white/5 text-white/60 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">Reward ID</th>
                  <th className="py-4 px-6">Referrer Partner</th>
                  <th className="py-4 px-6">Lead Information</th>
                  <th className="py-4 px-6">Bonus Amount</th>
                  <th className="py-4 px-6">Verification Status</th>
                  <th className="py-4 px-6 text-right">Audit Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rewards.map((rw) => (
                  <tr key={rw.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-white/50">{rw.id}</td>
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-[#C58F58]">{rw.referrerCode}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-white">{rw.leadName}</div>
                      <div className="font-mono text-white/50 text-[11px]">{rw.leadPhone}</div>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                      ₹{rw.rewardAmount}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          rw.status === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : rw.status === 'PENDING'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {rw.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {rw.status === 'PENDING' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => verifyReward(rw.id, true)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verify (+₹50)</span>
                          </button>
                          <button
                            onClick={() => verifyReward(rw.id, false)}
                            className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-white/40">
                          {rw.verifiedBy ? `Verified by ${rw.verifiedBy}` : 'Processed'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'PARTNERS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {referrers.map((ref) => (
            <div key={ref.id} className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-bold text-white text-sm">{ref.name}</h3>
                  <span className="text-xs font-mono text-white/50">{ref.phone}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-[#C58F58]/20 border border-[#C58F58]/30 font-mono font-bold text-sm text-[#E0AB77]">
                  {ref.code}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-white/70 font-mono">
                <div className="flex justify-between">
                  <span>Clicks / Visits:</span>
                  <span className="text-white font-bold">{ref.totalVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Leads Submitted:</span>
                  <span className="text-white font-bold">{ref.totalLeadsSubmitted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verified Leads:</span>
                  <span className="text-emerald-400 font-bold">{ref.verifiedLeadsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>₹50 Bonuses Earned:</span>
                  <span className="text-emerald-400 font-bold">₹{ref.totalEarnedRewards}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Payout:</span>
                  <span className="text-[#E0AB77] font-bold">₹{ref.pendingBalance}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Explore Senior Living Citizen Foundation sanctuary: ${typeof window !== 'undefined' ? window.location.origin : 'https://aeterna-elder-care.vercel.app'}/?ref=${ref.code}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Partner Link</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'COMMISSIONS' && (
        <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-base font-serif-heading font-bold text-white">
              Confirmed Sales Commission Pipeline
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-white/5 text-white/60 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">Commission ID</th>
                  <th className="py-4 px-6">Referrer Code</th>
                  <th className="py-4 px-6">Unit / Booking</th>
                  <th className="py-4 px-6">Sale Value</th>
                  <th className="py-4 px-6">Commission Rate</th>
                  <th className="py-4 px-6">Commission Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {commissions.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-white/50">{c.id}</td>
                    <td className="py-4 px-6 font-mono font-bold text-[#C58F58]">{c.referrerCode}</td>
                    <td className="py-4 px-6 font-mono text-white">{c.unitId}</td>
                    <td className="py-4 px-6 font-mono">₹{(c.saleValue / 100000).toFixed(2)} Lakh</td>
                    <td className="py-4 px-6 font-mono">{c.commissionRate}%</td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                      ₹{c.commissionAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {c.status === 'PENDING' ? (
                        <button
                          onClick={() => updateCommission(c.id, 'APPROVED')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors"
                        >
                          Approve Commission
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-white/40">Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
