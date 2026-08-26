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
  Filter,
  Plus,
  Copy,
  Check
} from 'lucide-react';
import { Referrer, ReferralReward, Commission } from '@/lib/db/schema';

export default function AdminReferralsPage() {
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [activeTab, setActiveTab] = useState<'REWARDS' | 'PARTNERS' | 'COMMISSIONS'>('REWARDS');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Partner Modal
  const [isCreatingPartner, setIsCreatingPartner] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerUpi, setPartnerUpi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleCreatePartner(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: partnerName,
          phone: partnerPhone,
          upiId: partnerUpi
        })
      });
      if (res.ok) {
        setPartnerName('');
        setPartnerPhone('');
        setPartnerUpi('');
        setIsCreatingPartner(false);
        loadReferralData();
      }
    } catch (err) {
      console.error('Error creating partner:', err);
    } finally {
      setIsSubmitting(false);
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

  const copyPartnerLink = (code: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://aeterna-elder-care.vercel.app';
    const link = `${origin}/?ref=${code}`;
    navigator.clipboard.writeText(link);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const pendingRewards = rewards.filter((r) => r.status === 'PENDING');
  const verifiedRewards = rewards.filter((r) => r.status === 'VERIFIED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
            PARTNER ADVOCACY &amp; ₹50 REWARD DESK
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Referrals &amp; ₹50 Verified Lead Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Verify legitimate inquiries, approve ₹50 lead bonuses, and manage sales commission payouts.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingPartner(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Partner Code</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-4 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('REWARDS')}
          className={`pb-3 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'REWARDS'
              ? 'border-[#2C5E50] text-[#2C5E50]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>₹50 Lead Reward Queue ({pendingRewards.length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('PARTNERS')}
          className={`pb-3 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'PARTNERS'
              ? 'border-[#2C5E50] text-[#2C5E50]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Partner Directory ({referrers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('COMMISSIONS')}
          className={`pb-3 text-xs font-mono font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'COMMISSIONS'
              ? 'border-[#2C5E50] text-[#2C5E50]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Sales Commissions ({commissions.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'REWARDS' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-serif-heading font-bold text-slate-900">
              Pending &amp; Processed ₹50 Verified Lead Rewards
            </h2>
            <span className="text-xs font-mono text-[#2C5E50] font-bold">
              Total Verified Payouts: ₹{verifiedRewards.length * 50}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6 font-bold">Reward ID</th>
                  <th className="py-4 px-6 font-bold">Referrer Partner</th>
                  <th className="py-4 px-6 font-bold">Lead Information</th>
                  <th className="py-4 px-6 font-bold">Bonus Amount</th>
                  <th className="py-4 px-6 font-bold">Verification Status</th>
                  <th className="py-4 px-6 font-bold text-right">Audit Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rewards.map((rw) => (
                  <tr key={rw.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono text-slate-400">{rw.id}</td>
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{rw.referrerCode}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{rw.leadName}</div>
                      <div className="font-mono text-slate-500 text-[11px]">{rw.leadPhone}</div>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-700">
                      ₹{rw.rewardAmount}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          rw.status === 'VERIFIED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : rw.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
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
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verify (+₹50)</span>
                          </button>
                          <button
                            onClick={() => verifyReward(rw.id, false)}
                            className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400">
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
            <div key={ref.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{ref.name}</h3>
                  <span className="text-xs font-mono text-slate-500">{ref.phone}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 font-mono font-bold text-sm text-amber-900">
                  {ref.code}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 font-mono">
                <div className="flex justify-between">
                  <span>Clicks / Visits:</span>
                  <span className="text-slate-900 font-bold">{ref.totalVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Leads Submitted:</span>
                  <span className="text-slate-900 font-bold">{ref.totalLeadsSubmitted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verified Leads:</span>
                  <span className="text-emerald-700 font-bold">{ref.verifiedLeadsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>₹50 Bonuses Earned:</span>
                  <span className="text-emerald-700 font-bold">₹{ref.totalEarnedRewards}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Payout:</span>
                  <span className="text-amber-800 font-bold">₹{ref.pendingBalance}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => copyPartnerLink(ref.code)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                >
                  {copiedCode === ref.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === ref.code ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Explore Senior Living Citizens Foundation sanctuary: ${typeof window !== 'undefined' ? window.location.origin : 'https://aeterna-elder-care.vercel.app'}/?ref=${ref.code}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'COMMISSIONS' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-serif-heading font-bold text-slate-900">
              Confirmed Sales Commission Pipeline
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6 font-bold">Commission ID</th>
                  <th className="py-4 px-6 font-bold">Referrer Code</th>
                  <th className="py-4 px-6 font-bold">Unit / Booking</th>
                  <th className="py-4 px-6 font-bold">Sale Value</th>
                  <th className="py-4 px-6 font-bold">Commission Rate</th>
                  <th className="py-4 px-6 font-bold">Commission Amount</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {commissions.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono text-slate-400">{c.id}</td>
                    <td className="py-4 px-6 font-mono font-bold text-[#2C5E50]">{c.referrerCode}</td>
                    <td className="py-4 px-6 font-mono text-slate-800">{c.unitId}</td>
                    <td className="py-4 px-6 font-mono">₹{(c.saleValue / 100000).toFixed(2)} Lakh</td>
                    <td className="py-4 px-6 font-mono">{c.commissionRate}%</td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-700">
                      ₹{c.commissionAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {c.status === 'PENDING' ? (
                        <button
                          onClick={() => updateCommission(c.id, 'APPROVED')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Approve Commission
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400">Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create Partner */}
      {isCreatingPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-serif-heading font-bold text-slate-900 mb-2">
              Generate Partner Referral Code
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Create a custom partner attribution code with ₹50 lead tracking and 1% sales commission ledger.
            </p>

            <form onSubmit={handleCreatePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 uppercase mb-1 font-bold">
                  Partner Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Verma"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#2C5E50] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 uppercase mb-1 font-bold">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={partnerPhone}
                  onChange={(e) => setPartnerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-[#2C5E50] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 uppercase mb-1 font-bold">
                  UPI ID for Auto-Payouts (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. rajesh@icici"
                  value={partnerUpi}
                  onChange={(e) => setPartnerUpi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-[#2C5E50] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreatingPartner(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-mono font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#234b40] text-white font-bold text-xs font-mono cursor-pointer"
                >
                  {isSubmitting ? 'Generating...' : 'Issue Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

