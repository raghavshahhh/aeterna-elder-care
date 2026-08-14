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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none';

  const variants = {
    primary: 'bg-[#0D2329] text-[#FBF9F5] hover:bg-[#163942] focus:ring-[#0D2329] shadow-sm',
    secondary: 'bg-[#EAF2EE] text-[#0D2329] hover:bg-[#D5E6DE] focus:ring-[#4E7A6B]',
    gold: 'bg-[#C58F58] text-white hover:bg-[#B37C45] focus:ring-[#C58F58] shadow-md shadow-[#C58F58]/20',
    outline: 'bg-transparent border border-[#0D2329]/20 text-[#0D2329] hover:bg-[#0D2329]/5 focus:ring-[#0D2329]',
    ghost: 'bg-transparent text-[#0D2329] hover:bg-[#0D2329]/5 focus:ring-[#0D2329]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
    emergency: 'bg-[#D9383A] text-white hover:bg-[#B8282A] focus:ring-[#D9383A] shadow-lg shadow-red-600/30 animate-sos-pulse font-bold tracking-wide'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm',
    xl: 'text-lg px-8 py-4 gap-3 shadow-md'
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
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
