'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function OwnerLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please verify credentials.');
        setIsLoading(false);
        return;
      }

      // Success -> Redirect to requested path or role default
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTarget = urlParams.get('redirect') || data.redirectUrl || '/admin';
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setError('Connection error. Please try again.');
      setIsLoading(false);
    }
  };

  const handleUseAdminCredentials = () => {
    setIdentifier('admin@seniorliving.org');
    setPassword('Foundation@2026');
  };

  const handleUseOwnerCredentials = () => {
    setIdentifier('SL-OWNER-2026');
    setPassword('SLCF-pr7ZTbPiF0!12');
  };

  return (
    <div className="min-h-screen bg-[#071519] text-white flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#2C5E50]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#C58F58]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pb-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-white/95 border border-white/20 p-1 flex items-center justify-center shadow-md">
            <img
              src="/project-assets/brand/logo-icon.png"
              alt="Senior Living Citizen Foundation"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-sm font-serif-heading font-bold text-[#FAF8F5] group-hover:text-[#C58F58] transition-colors block leading-tight">
              Senior Living Citizen Foundation
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#C58F58] font-bold block">
              Haryana · Owner Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-white/60 hover:text-white transition-colors"
        >
          ← Return to Site
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full bg-[#0D2329]/90 border border-white/15 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2C5E50]/40 border border-emerald-400/40 text-[#C58F58] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#C58F58] uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Authorized Document Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#FAF8F5]">
            Owner Vault Access
          </h1>
          <p className="text-xs text-white/70 leading-relaxed">
            Encrypted repository for title deeds, revenue records, architectural CAD blueprints, and statutory approvals.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#FAF8F5]/80">
              Owner ID or Email
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. SL-OWNER-2026 or owner@seniorliving.org"
                className="w-full px-4 py-3 pl-10 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C58F58] focus:ring-1 focus:ring-[#C58F58] transition-all"
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#FAF8F5]/80">
              Vault Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pl-10 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C58F58] focus:ring-1 focus:ring-[#C58F58] transition-all"
              />
              <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating Secure Vault...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#C58F58]" />
                Access Document Vault →
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Fill Helper */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-2 text-center">
          <button
            type="button"
            onClick={handleUseAdminCredentials}
            className="text-[11px] text-emerald-400 hover:underline font-mono py-1 px-2 rounded-lg bg-white/5 border border-white/10 text-left flex items-center justify-between"
          >
            <span>Auto-fill: <strong>Admin CRM</strong> (admin@seniorliving.org)</span>
            <span className="text-[9px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">ADMIN</span>
          </button>

          <button
            type="button"
            onClick={handleUseOwnerCredentials}
            className="text-[11px] text-[#C58F58] hover:underline font-mono py-1 px-2 rounded-lg bg-white/5 border border-white/10 text-left flex items-center justify-between"
          >
            <span>Auto-fill: <strong>Owner Vault</strong> (SL-OWNER-2026)</span>
            <span className="text-[9px] bg-[#C58F58]/20 px-1.5 py-0.5 rounded text-[#E0AB77]">OWNER</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="max-w-md mx-auto text-center text-[11px] text-white/50 space-y-1">
        <p>Protected by Server-Side HTTP-Only Session Security</p>
        <p>© 2026 Senior Living Citizen Foundation · Haryana</p>
      </div>
    </div>
  );
}
