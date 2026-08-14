import React from 'react';
import { cn } from '@/lib/utils';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline' | 'segmented';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  activeId,
  onChange,
  variant = 'pills',
  className
}) => {
  if (variant === 'segmented') {
    return (
      <div className={cn('inline-flex p-1.5 bg-[#F6F1E8] rounded-full border border-[#E2D7C5] max-w-full overflow-x-auto no-scrollbar', className)}>
        {options.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none whitespace-nowrap shrink-0',
                isActive
                  ? 'bg-[#0D2329] text-white shadow-sm'
                  : 'text-[#5C6F75] hover:text-[#0D2329] hover:bg-black/5'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-bold', isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-[#5C6F75]')}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div className={cn('flex border-b border-[#E8E2D8] gap-4 sm:gap-8 overflow-x-auto no-scrollbar w-full', className)}>
        {options.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 pb-3 text-xs sm:text-base font-medium whitespace-nowrap transition-all border-b-2 -mb-px focus:outline-none shrink-0',
                isActive
                  ? 'border-[#0D2329] text-[#0D2329] font-bold'
                  : 'border-transparent text-[#5C6F75] hover:text-[#0D2329] hover:border-[#C58F58]'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={cn('text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold', isActive ? 'bg-[#EAF2EE] text-[#285244]' : 'bg-[#F6F1E8] text-[#5C6F75]')}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Default pills with mobile horizontal scroll
  return (
    <div className={cn('flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full flex-nowrap sm:flex-wrap', className)}>
      {options.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 focus:outline-none whitespace-nowrap shrink-0 min-h-[38px]',
              isActive
                ? 'bg-[#0D2329] border-[#0D2329] text-white shadow-sm'
                : 'bg-white border-[#E2D7C5] text-[#5C6F75] hover:border-[#3D685A] hover:text-[#0D2329]'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span className={cn('text-[10px] px-1.5 py-0.2 rounded-full font-bold', isActive ? 'bg-white/20 text-white' : 'bg-[#F6F1E8] text-[#5C6F75]')}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
