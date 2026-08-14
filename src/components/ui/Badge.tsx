import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'sage' | 'gold' | 'forest' | 'emergency' | 'neutral' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'sage',
  size = 'md',
  dot = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variants = {
    sage: 'bg-[#EAF2EE] text-[#285244] border border-[#CDE0D7]',
    gold: 'bg-[#FBF4EB] text-[#8C5D2C] border border-[#EED7C1]',
    forest: 'bg-[#0D2329] text-[#FBF9F5]',
    emergency: 'bg-[#FDE8E8] text-[#9B1C1C] border border-[#F8B4B4]',
    neutral: 'bg-[#F3ECE2] text-[#4A4036] border border-[#E5DACB]',
    outline: 'bg-transparent text-[#0D2329] border border-[#D5CDC2]'
  };

  const dotColors = {
    sage: 'bg-[#3D685A]',
    gold: 'bg-[#C58F58]',
    forest: 'bg-emerald-400',
    emergency: 'bg-red-600',
    neutral: 'bg-[#7C6E5F]',
    outline: 'bg-[#0D2329]'
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2'
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};
