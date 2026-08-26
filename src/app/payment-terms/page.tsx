import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  BadgeIndianRupee,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  HelpCircle,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

export default function PaymentTermsPage() {
  return (
    <div className="min-h-screen bg-[#071519] text-[#FAF8F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Financial Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-white tracking-tight">
            Commercial &amp; Payment Terms
          </h1>
          <p className="text-sm text-white/70 max-w-2xl mx-auto mt-3">
            Clear, transparent, and legally binding payment policies for Senior Living Citizen Foundation residences and plotted sanctuaries.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#091B20] border border-white/10 p-6 rounded-3xl">
            <BadgeIndianRupee className="w-8 h-8 text-[#C58F58] mb-3" />
            <h3 className="text-base font-serif-heading font-bold text-white mb-1">Fixed Milestone Pricing</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              No hidden escalation clauses. The agreed price at booking is locked and guaranteed throughout construction and handover.
            </p>
          </div>

          <div className="bg-[#091B20] border border-white/10 p-6 rounded-3xl">
            <Calendar className="w-8 h-8 text-[#C58F58] mb-3" />
            <h3 className="text-base font-serif-heading font-bold text-white mb-1">Guaranteed Lease Returns</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Active rental returns of ₹25,000/month till possession and ₹12,500/month post-possession backed by a 1-year guarantee.
            </p>
          </div>

          <div className="bg-[#091B20] border border-white/10 p-6 rounded-3xl">
            <ShieldCheck className="w-8 h-8 text-[#C58F58] mb-3" />
            <h3 className="text-base font-serif-heading font-bold text-white mb-1">7-Day Cooling-Off Period</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              100% full refund on token booking holds within 7 days if the buyer chooses not to proceed with formal agreement execution.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-[#091B20] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10 text-sm text-white/80 leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-serif-heading font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#C58F58]/20 text-[#E0AB77] font-mono text-xs flex items-center justify-center font-bold">1</span>
              <span>Payment Structure &amp; Milestone Options</span>
            </h2>
            <p className="text-xs text-white/70 mb-3">
              Buyers can select between three transparent payment schedules at the time of reservation:
            </p>
            <ul className="space-y-2 text-xs text-white/70 pl-4 list-disc">
              <li>
                <strong className="text-white">Down Payment Plan (Plots)</strong>: ₹1,00,000 priority hold token, followed by ₹24,00,000 upon registered agreement, and ₹2,00,000 balance at final Sub-Registrar registry.
              </li>
              <li>
                <strong className="text-white">50-50 Construction Milestone (Residences)</strong>: 50% upon booking and agreement execution; remaining 50% upon structural completion, key handover, and possession.
              </li>
              <li>
                <strong className="text-white">Pay in Full (100% Upfront)</strong>: Complete settlement with prioritized registration queue and zero milestone reminders.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="border-t border-white/10 pt-8">
            <h2 className="text-lg font-serif-heading font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#C58F58]/20 text-[#E0AB77] font-mono text-xs flex items-center justify-center font-bold">2</span>
              <span>Statutory Taxes, Stamp Duty &amp; Registry</span>
            </h2>
            <p className="text-xs text-white/70 mb-3">
              All plot and residence purchases in Haryana and Goa are registered under the respective State Registration Acts:
            </p>
            <ul className="space-y-2 text-xs text-white/70 pl-4 list-disc">
              <li>
                Stamp Duty and Registration charges are payable directly to the Sub-Registrar at the prevailing state government circle rates.
              </li>
              <li>
                GST (Goods and Services Tax) is applicable strictly as per prevailing central GST Council notifications for under-construction and ready residences.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border-t border-white/10 pt-8">
            <h2 className="text-lg font-serif-heading font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#C58F58]/20 text-[#E0AB77] font-mono text-xs flex items-center justify-center font-bold">3</span>
              <span>Cancellation &amp; Refund Policy</span>
            </h2>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Within 7 Days of Token:</strong> 100% refund of booking token within 7 business days, no deduction.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Post-Agreement Execution:</strong> Subject to standard administrative processing charge (1% of unit price) to cover legal drafting and title search disbursements.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Refund Processing:</strong> All approved refunds are processed back to the original source account via Razorpay within 7–10 banking working days.
                </span>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-t border-white/10 pt-8">
            <h2 className="text-lg font-serif-heading font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#C58F58]/20 text-[#E0AB77] font-mono text-xs flex items-center justify-center font-bold">4</span>
              <span>Secure Digital Payment Gateways</span>
            </h2>
            <p className="text-xs text-white/70">
              Senior Living Citizen Foundation processes online transactions through Razorpay Software Private Limited utilizing 256-bit SSL encryption and Level 1 PCI-DSS certified banking infrastructure. We do not store credit card numbers, CVVs, or net banking passwords.
            </p>
          </div>
        </div>

        {/* Bottom Contact Desk */}
        <div className="mt-8 p-6 rounded-3xl bg-[#0D2329] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <div className="text-sm font-bold text-white">Have Questions About Payment Plans?</div>
            <div className="text-white/60">Connect with our Foundation Financial Officer</div>
          </div>
          <a
            href="https://wa.me/919999955847"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-white font-bold transition-all shrink-0 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Consult on WhatsApp (+91 99999 55847)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
