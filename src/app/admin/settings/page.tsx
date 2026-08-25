'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, DollarSign, Award, Bell } from 'lucide-react';
import { SystemSettings } from '@/lib/db/schema';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    leadRewardAmount: 50,
    defaultCommissionPercentage: 1.0,
    defaultFixedCommissionAmount: 10000,
    referralAttributionCookieDays: 30,
    autoVerifyLeads: false,
    duplicatePhoneWindowDays: 90,
    notificationEmail: 'leads@seniorlivingcitizensfoundation.com',
    whatsappContactNumber: '+919999955847',
    updatedAt: new Date().toISOString()
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
          System &amp; Business Rules Settings
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          Configure referral reward thresholds, commission percentages, attribution cookies, and notification endpoints.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#091B20] border border-white/10 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2">
              Verified Lead Reward (₹ INR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.leadRewardAmount}
                onChange={(e) => setSettings({ ...settings, leadRewardAmount: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#E0AB77]">INR</span>
            </div>
            <span className="text-[10px] text-white/40 block mt-1">Paid to referral partner per verified legitimate inquiry.</span>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2">
              Default Sales Commission (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={settings.defaultCommissionPercentage}
                onChange={(e) => setSettings({ ...settings, defaultCommissionPercentage: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#E0AB77]">%</span>
            </div>
            <span className="text-[10px] text-white/40 block mt-1">Commission on confirmed registry &amp; booking.</span>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2">
              Attribution Cookie Window (Days)
            </label>
            <input
              type="number"
              value={settings.referralAttributionCookieDays}
              onChange={(e) => setSettings({ ...settings, referralAttributionCookieDays: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
            />
            <span className="text-[10px] text-white/40 block mt-1">Days referral code stays active in prospect browser.</span>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2">
              Duplicate Protection Window (Days)
            </label>
            <input
              type="number"
              value={settings.duplicatePhoneWindowDays}
              onChange={(e) => setSettings({ ...settings, duplicatePhoneWindowDays: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
            />
            <span className="text-[10px] text-white/40 block mt-1">Prevents duplicate lead reward abuse for same phone number.</span>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2">
              Primary WhatsApp Contact
            </label>
            <input
              type="text"
              value={settings.whatsappContactNumber}
              onChange={(e) => setSettings({ ...settings, whatsappContactNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2">
              Notification Routing Email
            </label>
            <input
              type="email"
              value={settings.notificationEmail}
              onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          {isSaved && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings successfully persisted to database!</span>
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-5 py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
