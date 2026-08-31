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
  AlertCircle,
  Users,
  Shield,
  Layers,
  Award
} from 'lucide-react';

export default function AdminLoginPage() {
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
        body: JSON.stringify({ identifier: identifier.trim(), password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please verify admin email and password.');
        setIsLoading(false);
        return;
      }

      // Success -> Redirect to requested path or default to /admin
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTarget = urlParams.get('redirect') || data.redirectUrl || '/admin';
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setError('Connection error. Please check server status and try again.');
      setIsLoading(false);
    }
  };

  const handleFillCredentials = (email: string, pass: string) => {
    setIdentifier(email);
    setPassword(pass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#071519] text-white flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#2C5E50]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#C58F58]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pb-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#14323A] border border-[#C58F58]/40 p-1.5 flex items-center justify-center shrink-0 shadow-md">
            <img
              src="/project-assets/brand/logo-icon-clean.png"
              alt="Senior Living Citizens Foundation"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div>
            <span className="text-sm font-serif-heading font-bold text-[#FAF8F5] group-hover:text-[#C58F58] transition-colors block leading-tight">
              Senior Living Citizens Foundation
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#C58F58] font-bold block">
              Admin &amp; Management Console
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
      <div className="max-w-md mx-auto w-full bg-[#0D2329]/95 border border-white/15 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2C5E50]/40 border border-emerald-400/40 text-[#C58F58] flex items-center justify-center mx-auto shadow-inner">
            <Shield className="w-6 h-6 text-[#E0AB77]" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Executive Admin Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#FAF8F5]">
            Admin Sign In
          </h1>
          <p className="text-xs text-white/70 leading-relaxed">
            Enter authorized administrator credentials to manage leads, payments, bookings, inventory, and foundation governance.
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
              Admin Email / Identifier
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@seniorliving.org"
                className="w-full px-4 py-3 pl-10 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C58F58] focus:ring-1 focus:ring-[#C58F58] transition-all"
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#FAF8F5]/80">
              Password
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
            className="w-full py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Sign In to Admin Console →
              </>
            )}
          </button>
        </form>

        {/* 1-Click Fast Fill for Authorized Roles */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-white/50 flex items-center justify-between">
            <span>Quick-Fill Authorized Roles:</span>
            <span className="text-[#C58F58]">Click to populate</span>
          </div>

          <button
            type="button"
            onClick={() => handleFillCredentials("admin@seniorliving.org", "Foundation@2026")}
            className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-xs transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="font-bold text-white group-hover:text-emerald-300">Super Administrator</div>
                <div className="text-[10px] font-mono text-white/50">admin@seniorliving.org</div>
              </div>
            </div>
            <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
              SUPER_ADMIN
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleFillCredentials("sales@seniorliving.org", "Foundation@2026")}
            className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#C58F58]" />
              <div>
                <div className="font-bold text-white group-hover:text-[#E0AB77]">Sales Relationship Manager</div>
                <div className="text-[10px] font-mono text-white/50">sales@seniorliving.org</div>
              </div>
            </div>
            <span className="text-[9px] font-mono bg-[#C58F58]/20 text-[#E0AB77] px-2 py-0.5 rounded font-bold">
              SALES
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleFillCredentials("SL-OWNER-2026", "SLCF-pr7ZTbPiF0!12")}
            className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <div className="font-bold text-white group-hover:text-amber-300">Foundation Document Officer</div>
                <div className="text-[10px] font-mono text-white/50">SL-OWNER-2026 / owner@seniorliving.org</div>
              </div>
            </div>
            <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
              OWNER
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="max-w-md mx-auto text-center text-[11px] text-white/50 space-y-1">
        <p>Protected by 24h HMAC-SHA256 Encrypted Session Token</p>
        <p>© 2026 Senior Living Citizens Foundation · Jhajjar, Haryana</p>
      </div>
    </div>
  );
}
