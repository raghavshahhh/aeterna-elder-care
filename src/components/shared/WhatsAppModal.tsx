'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MessageSquare, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const WhatsAppModal: React.FC = () => {
  const { isWhatsAppOpen, whatsAppContext, closeWhatsApp } = useModal();
  const { showToast } = useToast();

  const [parentName, setParentName] = useState('');
  const [city, setCity] = useState(whatsAppContext.city || 'Delhi NCR');
  const [selectedService, setSelectedService] = useState(whatsAppContext.service || 'Elder Care Consultation');
  const [customQuery, setCustomQuery] = useState('');

  useEffect(() => {
    if (whatsAppContext.service) setSelectedService(whatsAppContext.service);
    if (whatsAppContext.city) setCity(whatsAppContext.city);
    if (whatsAppContext.message) setCustomQuery(whatsAppContext.message);
  }, [whatsAppContext]);

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalParent = parentName.trim() ? ` for my parent (${parentName})` : '';
    const textMessage = `Hello Aeterna Care Team, I would like to inquire about ${selectedService}${finalParent} in ${city}. ${customQuery ? `\nDetails: ${customQuery}` : ''}\nPlease connect me with a Senior Geriatric Care Advisor.`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/919810144882?text=${encodedText}`;

    showToast({
      title: 'Connecting to WhatsApp Support...',
      description: 'Opening official Aeterna Care WhatsApp channel.',
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
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#E8E2D8]">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
              Instant WhatsApp Desk
            </span>
            <span className="text-xs text-[#5C6F75] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Avg. Reply in 2 Mins
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
            Chat with Care Advisor
          </h3>
        </div>
      </div>

      <form onSubmit={handleLaunchWhatsApp} className="space-y-4">
        <div className="p-3.5 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] text-xs sm:text-sm text-[#1B4550] flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#3D685A] shrink-0 mt-0.5" />
          <span>
            Connect directly with an experienced Geriatric Care Manager on WhatsApp for quick price estimates, caregiver profiles, or doctor bookings.
          </span>
        </div>

        <Input
          label="Parent's Name (Optional)"
          placeholder="e.g. Sh. Ramesh Sharma"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3.5 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
            >
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Noida">Noida & Gr. Noida</option>
              <option value="Mumbai">Mumbai & MMR</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Chandigarh">Chandigarh Tricity</option>
              <option value="Jaipur">Jaipur</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Interested Service</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3.5 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
            >
              <option value="ICU Clinical Home Nursing">ICU Clinical Home Nursing</option>
              <option value="24x7 Caregiver Attendant">24x7 Caregiver Attendant</option>
              <option value="Senior Doctor Home Visit">Senior Doctor Home Visit</option>
              <option value="Physiotherapy & Neuro-Rehab">Physiotherapy & Rehab</option>
              <option value="Dementia & Memory Care">Dementia & Memory Care</option>
              <option value="Medical Equipment Rental">Medical Equipment Rental</option>
              <option value="Gold/Platinum Care Plan">Care Membership Plans</option>
              <option value="General Elder Care Inquiry">General Inquiry</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Specific Requirements / Medical Notes (Optional)</label>
          <textarea
            rows={3}
            placeholder="e.g. My mother is 82, needs 12-hr day nurse after hip surgery in South Delhi..."
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl p-4 text-sm text-[#0D2329] focus:bg-white focus:border-[#3D685A] focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20"
            leftIcon={<Send className="w-4 h-4" />}
          >
            Start WhatsApp Chat Now →
          </Button>
          <p className="text-[11px] text-center text-[#5C6F75] mt-2">
            No spam. We respect your family&apos;s privacy and medical confidentiality.
          </p>
        </div>
      </form>
    </Modal>
  );
};
