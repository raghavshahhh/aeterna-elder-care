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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071519]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Centering wrapper */}
      <div className="min-h-screen px-3 py-6 sm:px-6 sm:py-10 flex items-center justify-center">
        {/* Modal Box */}
        <div
          className={cn(
            'relative w-full bg-white rounded-3xl shadow-2xl border border-[#E8E2D8] p-5 sm:p-7 z-10 mx-auto text-left max-h-[90vh] overflow-y-auto transform transition-all',
            maxWidths[maxWidth],
            className
          )}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-[#53676E] hover:text-[#0D2329] hover:bg-[#F5EFE6] transition-colors focus:outline-none z-20 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {(title || subtitle) && (
            <div className="mb-4 pr-8">
              {title && <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">{title}</h3>}
              {subtitle && <p className="text-xs sm:text-sm text-[#53676E] mt-0.5">{subtitle}</p>}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
