import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger' | 'emergency';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  href,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] select-none cursor-pointer';

  const variants = {
    primary: 'bg-[#0D2329] text-[#FAF8F5] hover:bg-[#163942] hover:shadow-md focus:ring-[#0D2329] shadow-xs',
    secondary: 'bg-[#EAF2EE] text-[#0D2329] hover:bg-[#D5E6DE] hover:shadow-xs focus:ring-[#3D7363]',
    gold: 'bg-gradient-to-r from-[#C58F58] to-[#B37C45] text-white hover:brightness-105 focus:ring-[#C58F58] shadow-md shadow-[#C58F58]/25',
    outline: 'bg-transparent border border-[#0D2329]/20 text-[#0D2329] hover:bg-[#0D2329]/5 hover:border-[#0D2329]/40 focus:ring-[#0D2329]',
    ghost: 'bg-transparent text-[#0D2329] hover:bg-[#0D2329]/5 focus:ring-[#0D2329]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
    emergency: 'bg-[#D9383A] text-white hover:bg-[#B8282A] focus:ring-[#D9383A] shadow-lg shadow-red-600/30 animate-sos-pulse font-bold tracking-wide'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[42px]',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-sm min-h-[48px]',
    xl: 'text-lg px-8 py-4 gap-3 shadow-md min-h-[54px]'
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};
