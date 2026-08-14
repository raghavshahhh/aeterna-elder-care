'use client';

import React from 'react';
import { planFeatureGroups, carePlansData } from '@/data/plansData';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/utils';
import { Check, X, Info, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export interface PlanComparisonTableProps {
  billingCycle: 'monthly' | 'annual';
}

export const PlanComparisonTable: React.FC<PlanComparisonTableProps> = ({ billingCycle }) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-4 sm:p-8">
      <table className="w-full min-w-[760px] text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-[#0D2329]">
            <th className="py-5 px-4 w-1/3 text-base sm:text-lg font-serif-heading font-bold text-[#0D2329]">
              Comprehensive Deliverables
            </th>
            {carePlansData.map((plan) => {
              const price = billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly;
              return (
                <th key={plan.id} className="py-5 px-4 text-center">
                  <div className="font-bold text-sm sm:text-base text-[#0D2329]">{plan.name}</div>
                  <div className="text-base sm:text-xl font-extrabold text-[#0D2329] mt-1">
                    {formatINR(price)}
                    <span className="text-xs font-normal text-[#5C6F75]">/mo</span>
                  </div>
                  <div className="mt-3">
                    <Link href={`/book?plan=${plan.slug}&billing=${billingCycle}`}>
                      <Button
                        size="sm"
                        variant={plan.popular ? 'gold' : 'outline'}
                        className="w-full text-xs"
                      >
                        Select {plan.name}
                      </Button>
                    </Link>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E2D8]">
          {planFeatureGroups.map((group, groupIdx) => (
            <React.Fragment key={groupIdx}>
              <tr className="bg-[#FBF9F5]">
                <td
                  colSpan={5}
                  className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#3D685A]"
                >
                  {group.category}
                </td>
              </tr>
              {group.features.map((feat, featIdx) => (
                <tr key={featIdx} className="hover:bg-[#F9F6F0]/60 transition-colors">
                  <td className="py-4 px-4 text-xs sm:text-sm font-medium text-[#0D2329]">
                    <div className="flex items-center gap-1.5">
                      <span>{feat.name}</span>
                      {feat.tooltip && (
                        <span className="text-[#5C6F75] cursor-help" title={feat.tooltip}>
                          <Info className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Silver */}
                  <td className="py-4 px-4 text-center text-xs sm:text-sm text-[#5C6F75]">
                    {typeof feat.silver === 'boolean' ? (
                      feat.silver ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium text-[#0D2329]">{feat.silver}</span>
                    )}
                  </td>

                  {/* Gold */}
                  <td className="py-4 px-4 text-center text-xs sm:text-sm bg-amber-50/20">
                    {typeof feat.gold === 'boolean' ? (
                      feat.gold ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold text-[#0D2329]">{feat.gold}</span>
                    )}
                  </td>

                  {/* Platinum */}
                  <td className="py-4 px-4 text-center text-xs sm:text-sm bg-[#EAF2EE]/30">
                    {typeof feat.platinum === 'boolean' ? (
                      feat.platinum ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-bold text-[#1D4B57]">{feat.platinum}</span>
                    )}
                  </td>

                  {/* Diamond */}
                  <td className="py-4 px-4 text-center text-xs sm:text-sm">
                    {typeof feat.diamond === 'boolean' ? (
                      feat.diamond ? (
                        <Check className="w-5 h-5 text-[#C58F58] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-bold text-[#A8733E]">{feat.diamond}</span>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
