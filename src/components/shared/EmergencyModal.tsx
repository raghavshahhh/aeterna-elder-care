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
      maxWidth="xl"
      className="border-red-200"
    >
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#E8E2D8]">
        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shrink-0 animate-sos-pulse">
          <Siren className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 text-red-700">
              Live Emergency Desk
            </span>
            <span className="text-xs text-[#5C6F75] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 24x7 Active
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329] mt-0.5">
            Immediate Emergency Response
          </h3>
        </div>
      </div>

      {stage === 'options' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p>
              If your parent is experiencing chest pain, difficulty breathing, sudden stroke symptoms, or severe fall trauma, dispatch our nearest ACLS cardiac ambulance immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleConnectDoctor}
              className="p-5 rounded-2xl border-2 border-[#0D2329] bg-[#FBF9F5] hover:bg-[#EAF2EE] text-left transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0D2329] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0D2329] text-base">Speak to ER Doctor</h4>
              <p className="text-xs text-[#5C6F75] mt-1 leading-relaxed">
                Direct phone triage with Senior ER Physician within 20 seconds.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D2329] mt-3 underline">
                Dial +91 11 4084 9900 →
              </span>
            </button>

            <button
              onClick={() => {
                showToast({
                  title: 'Emergency Video Tele-Triage',
                  description: 'Opening priority encrypted video room with Geriatric ER team.',
                  type: 'info'
                });
              }}
              className="p-5 rounded-2xl border border-[#E2D7C5] bg-white hover:border-[#3D685A] text-left transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF2EE] text-[#285244] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0D2329] text-base">Instant Video SOS</h4>
              <p className="text-xs text-[#5C6F75] mt-1 leading-relaxed">
                1-Click emergency video room for visual patient assessment.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3D685A] mt-3">
                Launch Secure Room →
              </span>
            </button>
          </div>

          <form onSubmit={handleDispatchAmbulance} className="pt-4 border-t border-[#E8E2D8] space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0D2329]">
              Dispatch Nearest ACLS Ambulance (Ventilator & Paramedic)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0D2329] mb-1.5">Select City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
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
              className="w-full"
              leftIcon={<Siren className="w-5 h-5" />}
            >
              Dispatch Cardiac Ambulance Now (&lt; 15 Mins)
            </Button>
          </form>
        </div>
      )}

      {stage === 'dispatching' && (
        <div className="py-12 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-sos-pulse">
            <Navigation className="w-10 h-10 animate-spin" />
          </div>
          <h4 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
            Triaging & Locating Nearest Standby Unit...
          </h4>
          <p className="text-sm text-[#5C6F75] max-w-sm mx-auto">
            Locking GPS coordinates in {city} and alerting trauma emergency hospital network.
          </p>
          <div className="w-48 h-2 bg-[#E2D7C5] rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-red-600 transition-all duration-100" style={{ width: `${((15 - countdown) / 15) * 100}%` }} />
          </div>
        </div>
      )}

      {stage === 'confirmed' && (
        <div className="py-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Dispatched & En Route
            </span>
            <h4 className="text-2xl font-serif-heading font-bold text-[#0D2329] mt-3">
              Ambulance #DL-01-AMB-8802 on the way
            </h4>
            <p className="text-sm text-[#5C6F75] mt-1">
              Estimated Arrival: <strong className="text-[#0D2329]">11-13 Minutes</strong> ({city})
            </p>
          </div>

          <div className="bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">On-Board Paramedic:</span>
              <strong className="text-[#0D2329]">EMT Suresh Sharma (ACLS Certified)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">Equipment Active:</span>
              <strong className="text-[#0D2329]">Transport Ventilator + Biphasic Defibrillator</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">Pre-Alerted Hospital:</span>
              <strong className="text-[#0D2329]">Nearest Tertiary Emergency Network</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C6F75]">Live Paramedic Direct Line:</span>
              <strong className="text-[#0D2329]">+91 98101 88200</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
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
