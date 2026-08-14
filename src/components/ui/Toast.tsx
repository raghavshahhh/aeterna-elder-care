'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/90',
    info: 'border-blue-200 bg-blue-50/90',
    warning: 'border-amber-200 bg-amber-50/90',
    error: 'border-red-200 bg-red-50/90'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none p-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5',
            borders[toast.type]
          )}
        >
          {icons[toast.type]}
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold text-[#0D2329]">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-[#5C6F75] mt-0.5 leading-relaxed">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-full text-[#5C6F75] hover:text-[#0D2329] hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
