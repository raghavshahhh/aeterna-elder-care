'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Clock, User, ShieldCheck, Search } from 'lucide-react';
import { AuditLog } from '@/lib/db/schema';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await fetch('/api/audit-logs');
        if (res.ok) {
          const data = await res.json();
          setLogs(data.logs || []);
        } else {
          // Fallback initial log
          setLogs([
            {
              id: 'LOG-001',
              userName: 'System Administrator',
              userRole: 'SUPER_ADMIN',
              action: 'DATABASE_INITIALIZATION',
              entityType: 'SYSTEM',
              entityId: 'ROOT',
              details: 'Multi-Location Database and Enterprise RBAC active across Haryana & Goa.',
              createdAt: '2026-02-26T00:00:00Z'
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to load audit logs:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLogs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-[#C58F58]" />
          <span>SECURITY &amp; COMPLIANCE LOGS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
          Security &amp; Administrative Audit Trail
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Immutable log of all user logins, inventory status changes, lead status transitions, and reward approvals.
        </p>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 font-bold">Timestamp</th>
                <th className="py-4 px-6 font-bold">Actor / Role</th>
                <th className="py-4 px-6 font-bold">Action</th>
                <th className="py-4 px-6 font-bold">Entity Scope</th>
                <th className="py-4 px-6 font-bold">Activity Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-slate-500 text-[11px]">
                    {new Date(log.createdAt).toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{log.userName || 'System'}</div>
                    <div className="text-[10px] text-amber-800 font-bold">{log.userRole || 'SYSTEM'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-[11px]">
                    {log.entityType} ({log.entityId})
                  </td>
                  <td className="py-4 px-6 font-sans text-xs text-slate-900">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

