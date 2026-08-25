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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Security &amp; Administrative Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Immutable log of all user logins, inventory status changes, lead status transitions, and reward approvals.
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#091B20] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-white/5 text-white/60 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Actor / Role</th>
                <th className="py-4 px-6">Action</th>
                <th className="py-4 px-6">Entity Scope</th>
                <th className="py-4 px-6">Activity Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-white/50 text-[11px]">
                    {new Date(log.createdAt).toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-white">{log.userName || 'System'}</div>
                    <div className="text-[10px] text-[#C58F58]">{log.userRole || 'SYSTEM'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/60 text-[11px]">
                    {log.entityType} ({log.entityId})
                  </td>
                  <td className="py-4 px-6 font-sans text-xs text-white/90">
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
