'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  CalendarCheck,
  Building2,
  MapPin,
  FolderOpen,
  Award,
  FileText,
  ShieldAlert,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Layers,
  Home,
  CreditCard
} from 'lucide-react';
import { User } from '@/lib/db/schema';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  roles?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Executive Overview', href: '/admin', icon: Building2 },
  { label: 'Payments & Collections', href: '/admin/payments', icon: CreditCard, badge: 'Razorpay' },
  { label: 'Bookings & Holds', href: '/admin/bookings', icon: Layers },
  { label: 'Leads & CRM Pipeline', href: '/admin/leads', icon: Users, badge: 'Active' },
  { label: 'Site Visits Scheduler', href: '/admin/site-visits', icon: CalendarCheck },
  { label: 'Inventory & Units', href: '/admin/inventory', icon: Layers },
  { label: 'Locations & CMS', href: '/admin/locations', icon: MapPin },
  { label: 'Projects & Masterplans', href: '/admin/projects', icon: FolderOpen },
  { label: 'Referrals & ₹50 Rewards', href: '/admin/referrals', icon: Award },
  { label: 'Document Vault Repository', href: '/admin/documents', icon: FileText },
  { label: 'Security & Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
  { label: 'System Settings', href: '/admin/settings', icon: Settings }
];

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/owner/login');
        }
      } catch {
        router.push('/owner/login');
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/owner/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071519] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#E8E2D8]/70 uppercase tracking-widest">
            Authenticating Administrative Console...
          </span>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-white/95 border border-white/20 p-1 flex items-center justify-center shrink-0 shadow-md">
            <img
              src="/project-assets/brand/logo-icon.png"
              alt="Senior Living Citizen Foundation"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-[#C58F58] font-bold tracking-widest block">
              BUSINESS &amp; CRM SUITE
            </span>
            <h2 className="text-sm font-serif-heading font-bold text-white tracking-tight">
              Senior Living Admin
            </h2>
          </div>
        </Link>
      </div>

      {/* User Identity Card */}
      {user && (
        <div className="px-5 py-3.5 bg-white/5 border-b border-white/5 mx-3 mt-3 rounded-2xl flex items-center justify-between">
          <div className="truncate">
            <div className="text-xs font-bold text-white truncate">{user.name}</div>
            <div className="text-[10px] font-mono text-[#C58F58] tracking-wider uppercase">
              {user.role.replace('_', ' ')}
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        <div className="px-3 pb-2 text-[9px] font-mono uppercase tracking-widest text-[#53676E] font-bold">
          Management Consoles
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#2C5E50] text-white font-bold shadow-lg shadow-[#2C5E50]/20'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E0AB77]' : 'text-white/60'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-md bg-[#C58F58]/20 text-[#E0AB77] text-[9px] font-mono font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2 bg-[#061215]">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/80 transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[#C58F58]" />
          <span>View Public Website</span>
          <ExternalLink className="w-3 h-3 text-white/40" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#071519] text-[#FAF8F5] flex flex-col lg:flex-row">
      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0D2329] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <img src="/project-assets/brand/logo-icon.png" alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
          <span className="font-serif-heading font-bold text-sm tracking-tight text-white">
            Senior Living Admin
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl bg-white/10 text-white"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay & Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="relative z-50 w-72 bg-[#091B20] border-r border-white/10 flex flex-col justify-between h-full shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-72 shrink-0 bg-[#091B20] border-r border-white/10 h-screen sticky top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#071519]">
        {/* Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#091B20]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-white/60 font-mono">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-[#C58F58] font-bold">
              {NAV_ITEMS.find((n) => n.href === pathname)?.label || 'Console'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Location Database Online</span>
            </div>

            <Link
              href="/admin/referrals"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-xs font-bold hover:bg-[#C58F58]/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E0AB77]" />
              <span>₹50 Verified Lead Desk</span>
            </Link>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
