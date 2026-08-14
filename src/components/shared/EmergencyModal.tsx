'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Siren, PhoneCall, Video, CheckCircle2, ShieldAlert, Navigation, Clock } from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyOpen, closeEmergency } = useModal();
  const { showToast } = useToast();
  const [stage, setStage] = useState<'options' | 'dispatching' | 'confirmed'>('options');
  const [city, setCity] = useState('Delhi NCR');
  const [address, setAddress] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [countdown, setCountdown] = useState(15);

  const handleDispatchAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientPhone) {
      showToast({
        title: 'Phone Number Required',
        description: 'Please enter a contact number so the paramedic can coordinate arrival.',
        type: 'warning'
      });
      return;
    }

    setStage('dispatching');
    let timer = 15;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (timer <= 0) {
        clearInterval(interval);
        setStage('confirmed');
        showToast({
          title: 'ACLS Ambulance Dispatched!',
          description: `Vehicle #DL-01-AMB-8802 is en route to ${city}. Expected arrival: 12 minutes.`,
          type: 'success'
        });
      }
    }, 150);
  };

  const handleConnectDoctor = () => {
    showToast({
      title: 'Connecting to 24/7 ER Physician...',
      description: 'Senior ER Physician Dr. Samarjit Choudhury is initiating emergency tele-triage.',
      type: 'info'
    });
    setTimeout(() => {
      window.location.href = 'tel:+911140849900';
    }, 1000);
  };

  const resetAndClose = () => {
    setStage('options');
    closeEmergency();
  };

  return (
    <Modal
      isOpen={isEmergencyOpen}
      onClose={resetAndClose}
      maxWidth="lg"
      className="border-red-200 p-4 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E8E2D8]">
        <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shrink-0 animate-sos-pulse">
          <Siren className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 text-red-700">
              Live Emergency Desk
            </span>
            <span className="text-xs text-[#53676E] flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> 24x7 Active
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif-heading font-bold text-[#0D2329]">
            Immediate Emergency Response
          </h3>
        </div>
      </div>

      {stage === 'options' && (
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-red-50/80 border border-red-200 text-xs text-red-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              If your parent is experiencing chest pain, difficulty breathing, stroke symptoms, or fall trauma, dispatch our nearest ACLS ambulance immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleConnectDoctor}
              className="p-3.5 rounded-2xl border border-[#0D2329] bg-[#FAF8F5] hover:bg-[#EAF2EE] text-left transition-all group flex items-start gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0D2329] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0D2329] text-xs sm:text-sm">Speak to ER Doctor</h4>
                <span className="text-[11px] text-[#53676E] block mt-0.5">Direct 20s phone triage</span>
                <span className="text-[11px] font-bold text-[#0D2329] underline block mt-1">Dial 4084 9900 →</span>
              </div>
            </button>

            <button
              onClick={() => {
                showToast({
                  title: 'Emergency Video Tele-Triage',
                  description: 'Opening priority encrypted video room with Geriatric ER team.',
                  type: 'info'
                });
              }}
              className="p-3.5 rounded-2xl border border-[#E2D7C5] bg-white hover:border-[#2C5E50] text-left transition-all group flex items-start gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EAF2EE] text-[#2C5E50] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0D2329] text-xs sm:text-sm">Instant Video SOS</h4>
                <span className="text-[11px] text-[#53676E] block mt-0.5">1-Click visual triage room</span>
                <span className="text-[11px] font-bold text-[#2C5E50] block mt-1">Launch Room →</span>
              </div>
            </button>
          </div>

          <form onSubmit={handleDispatchAmbulance} className="pt-3 border-t border-[#E8E2D8] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D2329]">
              Dispatch Nearest ACLS Ambulance (Ventilator & Paramedic)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0D2329] mb-1">Select City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E2D7C5] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#0D2329] focus:outline-none focus:border-[#2C5E50]"
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

              <Input
                label="Emergency Phone Number"
                placeholder="+91 98765 43210"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                required
              />
            </div>

            <Input
              label="Apartment / Landmark / Locality Address"
              placeholder="e.g. Flat 604, Tower B, Nirvana Country, Sector 50"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Button
              type="submit"
              variant="emergency"
              size="lg"
              className="w-full mt-2 font-bold text-sm py-3.5"
              leftIcon={<Siren className="w-5 h-5" />}
            >
              Dispatch Cardiac Ambulance Now (&lt; 15 Mins)
            </Button>
          </form>
        </div>
      )}

      {stage === 'dispatching' && (
        <div className="py-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-sos-pulse">
            <Navigation className="w-8 h-8 animate-spin" />
          </div>
          <h4 className="text-xl font-serif-heading font-bold text-[#0D2329]">
            Triaging & Locating Nearest Standby Unit...
          </h4>
          <p className="text-xs text-[#53676E] max-w-sm mx-auto">
            Locking GPS coordinates in {city} and alerting trauma emergency hospital network.
          </p>
          <div className="w-48 h-2 bg-[#E2D7C5] rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-red-600 transition-all duration-100" style={{ width: `${((15 - countdown) / 15) * 100}%` }} />
          </div>
        </div>
      )}

      {stage === 'confirmed' && (
        <div className="py-4 text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Dispatched & En Route
            </span>
            <h4 className="text-xl font-serif-heading font-bold text-[#0D2329] mt-2">
              Ambulance #DL-01-AMB-8802 on the way
            </h4>
            <p className="text-xs text-[#53676E] mt-0.5">
              Estimated Arrival: <strong className="text-[#0D2329]">11-13 Minutes</strong> ({city})
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E2D7C5] rounded-2xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#53676E]">On-Board Paramedic:</span>
              <strong className="text-[#0D2329]">EMT Suresh Sharma (ACLS Certified)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#53676E]">Equipment Active:</span>
              <strong className="text-[#0D2329]">Transport Ventilator + Defibrillator</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#53676E]">Pre-Alerted Hospital:</span>
              <strong className="text-[#0D2329]">Nearest Tertiary Emergency Network</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#53676E]">Paramedic Direct Line:</span>
              <strong className="text-[#0D2329]">+91 98101 88200</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => {
                showToast({
                  title: 'SMS Sent',
                  description: 'Live GPS tracking URL sent to your phone.',
                  type: 'success'
                });
              }}
            >
              Send Live GPS Link via SMS
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={resetAndClose}
            >
              Close Window
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
