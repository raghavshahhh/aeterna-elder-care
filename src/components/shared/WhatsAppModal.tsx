'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { projectOverview } from '@/data/propertyData';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  MapPin
} from 'lucide-react';

export const WhatsAppModal: React.FC = () => {
  const { isWhatsAppOpen, whatsAppContext, closeWhatsApp } = useModal();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(whatsAppContext.city || 'Delhi NCR');
  const [selectedUnit, setSelectedUnit] = useState(whatsAppContext.unitName || 'Residence 01 (1 BHK)');
  const [inquiryType, setInquiryType] = useState(
    whatsAppContext.actionType === 'reserve-unit'
      ? 'Priority Residence Reservation'
      : whatsAppContext.actionType === 'book-site-visit'
      ? 'Schedule Site & Blueprint Visit'
      : whatsAppContext.actionType === 'request-pricing'
      ? 'Detailed Pricing & Payment Milestones'
      : 'General Project & Living Inquiry'
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  useEffect(() => {
    if (whatsAppContext.unitName) {
      setSelectedUnit(`${whatsAppContext.unitName} (${whatsAppContext.unitType || 'Care Suite'})`);
    }
    if (whatsAppContext.city) setCity(whatsAppContext.city);
    if (whatsAppContext.message) setCustomNotes(whatsAppContext.message);
    if (whatsAppContext.actionType === 'reserve-unit') {
      setInquiryType('Priority Residence Reservation');
    } else if (whatsAppContext.actionType === 'book-site-visit') {
      setInquiryType('Schedule Site & Blueprint Visit');
    } else if (whatsAppContext.actionType === 'request-pricing') {
      setInquiryType('Detailed Pricing & Payment Milestones');
    }
  }, [whatsAppContext]);

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = preferredDate ? `\n📅 Preferred Date: ${preferredDate}` : '';
    const noteStr = customNotes.trim() ? `\n📝 Note: ${customNotes.trim()}` : '';

    const textMessage = `🔔 *NEW WEBSITE PROPERTY LEAD*
👤 *Name:* ${name || 'Prospective Resident'}
📱 *Phone:* ${phone || 'Provided in chat'}
📍 *Location:* ${city}

🏠 *Project:* ${projectOverview.name}
🏡 *Interested In:* ${selectedUnit}
🎯 *Intent:* ${inquiryType}${dateStr}${noteStr}

🔗 *Source:* Website Digital Explorer
🕐 *Time:* ${timestamp}

_Please connect me with the Senior Project Advisor for blueprint walkthrough & reservation details._`;

    const encodedText = encodeURIComponent(textMessage);
    const cleanNumber = projectOverview.salesWhatsApp.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

    showToast({
      title: 'Connecting to Project Concierge...',
      description: `Opening official WhatsApp channel for ${projectOverview.name}.`,
      type: 'success'
    });

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      closeWhatsApp();
    }, 400);
  };

  return (
    <Modal
      isOpen={isWhatsAppOpen}
      onClose={closeWhatsApp}
      maxWidth="lg"
    >
      <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-[#E8E2D8]">
        <div className="w-12 h-12 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] flex items-center justify-center text-[#2C5E50] shrink-0">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#EAF2EE] text-[#2C5E50]">
              Project Sales Concierge
            </span>
            <span className="text-xs text-[#53676E] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Direct
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
            {whatsAppContext.title || 'Inquire with Senior Project Advisor'}
          </h3>
        </div>
      </div>

      <form onSubmit={handleLaunchWhatsApp} className="space-y-4">
        {/* Context Banner */}
        <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E2D7C5] text-xs sm:text-sm text-[#14353E] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#A8733E] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            {whatsAppContext.unitName ? (
              <span>
                You are inquiring for <strong>{whatsAppContext.unitName}</strong> ({whatsAppContext.unitType || 'Residence'}). Your priority context is locked.
              </span>
            ) : (
              <span>
                Connect directly on WhatsApp to receive the complete architectural dossier, high-resolution CAD floor plans, and pre-launch pricing.
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Your Full Name"
            placeholder="e.g. Dr. Rajesh Khanna"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Phone / WhatsApp Number"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Selected Residence</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
            >
              <option value="Residence 01 (1 BHK Suite — Ground)">Residence 01 (1 BHK — Ground Floor)</option>
              <option value="Residence 02 (1 RK Studio — Ground)">Residence 02 (1 RK — Ground Floor)</option>
              <option value="Residence 03 (1 BHK Corner — Ground)">Residence 03 (1 BHK Corner — Ground)</option>
              <option value="1 BHK Care Suite (General Inquiry)">1 BHK Care Suite (General)</option>
              <option value="1 RK Executive Studio (General Inquiry)">1 RK Executive Studio (General)</option>
              <option value="Future Release Phase 2 (Units 04-09)">Future Release (Units 04–09)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Action Intent</label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
            >
              <option value="Priority Residence Reservation">Priority Residence Reservation</option>
              <option value="Schedule Site & Blueprint Visit">Schedule Site & Blueprint Visit</option>
              <option value="Detailed Pricing & Payment Milestones">Detailed Pricing & Payment Milestones</option>
              <option value="General Project & Living Inquiry">General Living & Medical Inquiry</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Preferred Site Visit Date (Optional)"
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Current City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
            >
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Noida">Noida</option>
              <option value="NRI / Overseas">NRI / Overseas (USA/UK/UAE/Canada)</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Other City">Other City</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">
            Specific Requirements / Senior Medical Needs (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Inquiring for my parents (78 & 74 yrs), need 1 BHK ground floor with dialysis support..."
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl p-3.5 text-sm text-[#0D2329] focus:bg-white focus:border-[#2C5E50] focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#2C5E50] hover:bg-[#1D4B57] text-white shadow-lg shadow-[#2C5E50]/20 py-4 font-semibold"
            leftIcon={<MessageSquare className="w-5 h-5" />}
          >
            Connect with Project Advisor on WhatsApp →
          </Button>
          <p className="text-[11px] text-center text-[#53676E] mt-2.5">
            🔒 Direct sales desk. Zero spam. We respect your family&apos;s privacy and medical confidentiality.
          </p>
        </div>
      </form>
    </Modal>
  );
};

