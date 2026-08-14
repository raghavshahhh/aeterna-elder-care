import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'forest' | 'sand' | 'glass' | 'bordered';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = true,
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-[#E8E2D8] shadow-[0_2px_12px_-2px_rgba(13,35,41,0.04)]',
    elevated: 'bg-white border border-[#E2D7C5] shadow-[0_12px_32px_-4px_rgba(13,35,41,0.08)]',
    forest: 'bg-[#0D2329] border border-[#1C4550] text-[#FBF9F5] shadow-xl',
    sand: 'bg-[#F9F6F0] border border-[#E5DACB]',
    glass: 'bg-white/90 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(13,35,41,0.06)]',
    bordered: 'bg-transparent border border-[#0D2329]/15'
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-300 hover:shadow-[0_16px_40px_-8px_rgba(13,35,41,0.1)] hover:-translate-y-1'
    : '';

  return (
    <div
      className={cn(
        'rounded-3xl p-6 sm:p-8',
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
