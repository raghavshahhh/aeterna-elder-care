'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  badge?: string;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  badge,
  className
}) => {
  return (
    <div className={cn('border-b border-[#E8E2D8] last:border-b-0 py-4 sm:py-5 transition-colors', className)}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D685A] rounded-xl p-1"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 pr-2">
          {badge && (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#EAF2EE] text-[#285244]">
              {badge}
            </span>
          )}
          <span className="text-base sm:text-lg font-medium text-[#0D2329] group-hover:text-[#3D685A] transition-colors">
            {title}
          </span>
        </div>
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#F6F1E8] group-hover:bg-[#EAF2EE] text-[#0D2329] transition-transform duration-300',
            isOpen && 'rotate-180 bg-[#0D2329] text-white group-hover:bg-[#0D2329]'
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="text-sm sm:text-base text-[#5C6F75] leading-relaxed pl-1 pr-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
    badge?: string;
  }[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className
}) => {
  const [openIds, setOpenIds] = useState<string[]>(items.length > 0 ? [items[0].id] : []);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('divide-y divide-[#E8E2D8] bg-white rounded-3xl p-4 sm:p-8 border border-[#E8E2D8] shadow-sm', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          badge={item.badge}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
