'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { safetyDevicesData, SafetyDevice } from '@/data/devicesData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import { formatINR } from '@/lib/utils';
import {
  ShieldCheck,
  Radio,
  Cpu,
  Wifi,
  CheckCircle2,
  PhoneCall,
  ShoppingBag,
  ArrowRight,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export default function DevicesPage() {
  const { showToast } = useToast();
  const { openLeadDrawer } = useModal();

  const [pricingMode, setPricingMode] = useState<'buy' | 'rent'>('rent');
  const [selectedDevice, setSelectedDevice] = useState<SafetyDevice | null>(null);

  const handleOrderDevice = (device: SafetyDevice) => {
    const cost = pricingMode === 'buy' ? formatINR(device.priceBuy) : `${formatINR(device.priceRentPerMonth)}/month`;
    showToast({
      title: 'Device Reservation Initiated',
      description: `Added "${device.name}" (${pricingMode.toUpperCase()}: ${cost}) to care setup. A technician will call for installation scheduling.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold" size="md">
            Smart Home Senior Protection
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold text-[#0D2329]">
            AI Fall Radars, 4G SOS Pendants & Tele-Vitals
          </h1>
          <p className="text-base sm:text-xl text-[#3D685A] font-light max-w-2xl mx-auto leading-relaxed">
            Medical-grade IoT hardware that keeps parents safe 24/7 without invasive optical cameras. Connected directly to our Emergency Helpdesk.
          </p>

          {/* Buy vs Rent Switcher */}
          <div className="pt-6 flex items-center justify-center">
            <div className="bg-white p-1.5 rounded-full border border-[#E8E2D8] shadow-sm flex items-center gap-1">
              <button
                onClick={() => setPricingMode('rent')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  pricingMode === 'rent'
                    ? 'bg-[#0D2329] text-white shadow-xs'
                    : 'text-[#5C6F75] hover:text-[#0D2329]'
                }`}
              >
                Monthly Device Rental (Zero Deposit)
              </button>
              <button
                onClick={() => setPricingMode('buy')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  pricingMode === 'buy'
                    ? 'bg-[#0D2329] text-white shadow-xs'
                    : 'text-[#5C6F75] hover:text-[#0D2329]'
                }`}
              >
                Outright Purchase (1-Yr Warranty)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Devices Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safetyDevicesData.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 sm:h-72 w-full bg-[#F6F1E8]">
                  <Image
                    src={device.image}
                    alt={device.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="forest" size="sm">
                      {device.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold text-[#0D2329]">
                    {pricingMode === 'rent' ? (
                      <span>{formatINR(device.priceRentPerMonth)} <span className="text-[10px] text-[#5C6F75] font-normal">/ mo</span></span>
                    ) : (
                      <span>{formatINR(device.priceBuy)} <span className="text-[10px] text-[#5C6F75] font-normal">one-time</span></span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#0D2329]">
                      {device.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6F75] mt-1 font-light leading-relaxed">
                      {device.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
                    <span className="text-[11px] uppercase font-bold text-[#3D685A] block">
                      Core Safety Capabilities:
                    </span>
                    <ul className="space-y-1.5">
                      {device.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#0D2329]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] text-[11px] text-[#5C6F75]">
                    <strong className="text-[#0D2329] block mb-0.5">Best Suited For:</strong>
                    {device.bestFor}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDevice(device)}
                  className="text-xs"
                >
                  View Technical Specs
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOrderDevice(device)}
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                >
                  Order {pricingMode === 'rent' ? 'Rental' : 'Device'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free Emergency Mock Drill Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-14 border border-[#1C4550] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <Badge variant="gold" size="sm">
              In-Home Safety Protocol
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold text-white">
              Book a Free In-Home Emergency Mock Drill & Safety Audit
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              Our paramedic and safety engineer will visit your parents&apos; home, test the SOS alarm button response with our 24/7 command desk, audit bathroom slip hazards, and train elders on how to call for emergency help in under 10 seconds.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Button
              variant="gold"
              size="lg"
              onClick={() => openLeadDrawer({ title: 'Schedule Free In-Home Emergency Mock Drill' })}
              className="w-full font-bold"
            >
              Book Free Mock Drill →
            </Button>
            <span className="text-center text-[11px] text-white/50">
              100% Free for Seniors in Delhi NCR, Mumbai & Bangalore
            </span>
          </div>
        </div>
      </section>

      {/* Technical Specs Modal */}
      {selectedDevice && (
        <Modal
          isOpen={!!selectedDevice}
          onClose={() => setSelectedDevice(null)}
          title={selectedDevice.name}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-[#5C6F75] leading-relaxed">
              {selectedDevice.tagline}
            </p>

            <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#E8E2D8] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0D2329] block">
                Technical Specifications & Certifications:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(selectedDevice.specs).map(([key, val]) => (
                  <div key={key} className="p-3 bg-white rounded-xl border border-[#E8E2D8]">
                    <span className="text-[10px] text-[#5C6F75] block uppercase font-bold">{key}</span>
                    <strong className="text-[#0D2329] text-xs mt-0.5 block">{val}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D8]">
              <div className="text-xs">
                <span className="text-[#5C6F75] block">Included with:</span>
                <strong className="text-emerald-700">{selectedDevice.includedInPlans.join(' & ')}</strong>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const dev = selectedDevice;
                  setSelectedDevice(null);
                  handleOrderDevice(dev);
                }}
              >
                Proceed with Setup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
