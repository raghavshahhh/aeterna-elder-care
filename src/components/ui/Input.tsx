import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#0D2329]/80 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-[#5C6F75] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3.5 text-sm text-[#0D2329] placeholder:text-[#899B9F]',
              'focus:bg-white focus:border-[#3D685A] focus:ring-4 focus:ring-[#3D685A]/10 focus:outline-none transition-all duration-200',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 text-[#5C6F75] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#5C6F75] mt-1.5">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
