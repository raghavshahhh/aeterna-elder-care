'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={cn(
          'relative w-full bg-white rounded-3xl shadow-2xl border border-[#E8E2D8] p-6 sm:p-8 z-10 my-8 animate-in zoom-in-95 duration-200',
          maxWidths[maxWidth],
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#5C6F75] hover:text-[#0D2329] hover:bg-[#F6F1E8] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {(title || subtitle) && (
          <div className="mb-6 pr-8">
            {title && <h3 className="text-2xl font-serif-heading font-semibold text-[#0D2329]">{title}</h3>}
            {subtitle && <p className="text-sm text-[#5C6F75] mt-1">{subtitle}</p>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
