'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  mockParentProfile,
  mockPortalVitals,
  mockPortalVisits,
  mockPortalDocuments
} from '@/data/portalData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import {
  Activity,
  Calendar,
  FileText,
  Heart,
  Phone,
  Siren,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Plus,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function PortalPage() {
  const { showToast } = useToast();
  const { openEmergency } = useModal();
  const [activeTab, setActiveTab] = useState('vitals');

  const [vitalsList, setVitalsList] = useState(mockPortalVitals);
  const [showAddVitalModal, setShowAddVitalModal] = useState(false);
  const [newBp, setNewBp] = useState('120 / 80 mmHg');
  const [newSugar, setNewSugar] = useState('110 mg/dL');
  const [newSpo2, setNewSpo2] = useState('98');

  const handleAddVital = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      date: 'Just Now',
      bp: newBp,
      sugar: newSugar,
      pulse: 72,
      spo2: Number(newSpo2) || 98,
      temperature: '98.4 °F',
      status: 'optimal' as const,
      notes: 'Manually logged by family member.'
    };
    setVitalsList([newRecord, ...vitalsList]);
    setShowAddVitalModal(false);
    showToast({
      title: 'Vital Recorded Successfully',
      description: 'Logged to parent health timeline and synced with Care Manager.',
      type: 'success'
    });
  };

  const portalTabs = [
    { id: 'vitals', label: 'Daily Vitals & Telemetry', count: vitalsList.length, icon: <Activity className="w-4 h-4" /> },
    { id: 'visits', label: 'Doctor & Physio Visits', count: mockPortalVisits.length, icon: <Calendar className="w-4 h-4" /> },
    { id: 'documents', label: 'Digital Health Locker', count: mockPortalDocuments.length, icon: <FileText className="w-4 h-4" /> },
    { id: 'caregiver', label: 'Attendant On-Duty Log', icon: <UserCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Top Banner Simulator Notice */}
      <div className="bg-[#EAF2EE] border border-[#CDE0D7] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1B4550]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>
            <strong>Family Health Portal Demo</strong>: This is an interactive preview of the real-time family dashboard provided to Aeterna Care members.
          </span>
        </div>
        <Badge variant="sage" size="sm">
          Active Live Sync
        </Badge>
      </div>

      {/* Parent Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" size="sm">
              {mockParentProfile.currentPlan} Member
            </Badge>
            <span className="text-xs text-[#5C6F75]">Renewal: {mockParentProfile.planRenewalDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
            {mockParentProfile.name}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs text-[#5C6F75]">
            <span>Age: <strong>{mockParentProfile.age} yrs</strong></span>
            <span>•</span>
            <span>Blood Group: <strong>{mockParentProfile.bloodGroup}</strong></span>
            <span>•</span>
            <span>Location: <strong>{mockParentProfile.city}</strong></span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {mockParentProfile.primaryConditions.map((cond, idx) => (
              <span key={idx} className="text-[11px] font-semibold bg-[#F6F1E8] text-[#0D2329] px-2.5 py-1 rounded-full">
                {cond}
              </span>
            ))}
          </div>
        </div>

        {/* Assigned Staff Mini Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Care Manager */}
          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E2D7C5] space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#3D685A] block">
              Dedicated Care Manager
            </span>
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border">
                <Image
                  src={mockParentProfile.assignedCareManager.photo}
                  alt={mockParentProfile.assignedCareManager.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0D2329] block truncate">
                  {mockParentProfile.assignedCareManager.name}
                </span>
                <a
                  href={`tel:${mockParentProfile.assignedCareManager.phone}`}
                  className="text-[11px] text-[#C58F58] hover:underline"
                >
                  {mockParentProfile.assignedCareManager.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Active Caregiver */}
          <div className="p-4 rounded-2xl bg-[#EAF2EE] border border-[#CDE0D7] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-800">
                Attendant On Duty
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border">
                <Image
                  src={mockParentProfile.activeCaregiver.photo}
                  alt={mockParentProfile.activeCaregiver.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0D2329] block">
                  {mockParentProfile.activeCaregiver.name}
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold block">
                  {mockParentProfile.activeCaregiver.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs
        options={portalTabs}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id)}
        variant="underline"
      />

      {/* TAB 1: DAILY VITALS & TELEMETRY */}
      {activeTab === 'vitals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              Parent Health Vitals History
            </h2>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowAddVitalModal(true)}
            >
              Log Vital Reading
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vitalsList.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-xs font-bold text-[#0D2329]">{rec.date}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      rec.status === 'optimal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'attention'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#5C6F75] block">Blood Pressure:</span>
                    <strong className="text-[#0D2329] text-sm">{rec.bp}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5C6F75] block">Blood Sugar:</span>
                    <strong className="text-[#0D2329] text-sm">{rec.sugar}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5C6F75] block">Pulse Rate:</span>
                    <strong className="text-[#0D2329]">{rec.pulse} bpm</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5C6F75] block">Oxygen (SpO2):</span>
                    <strong className="text-emerald-700 font-bold">{rec.spo2}%</strong>
                  </div>
                </div>

                <p className="text-[11px] text-[#5C6F75] pt-2 border-t border-[#E8E2D8] leading-relaxed">
                  {rec.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DOCTOR & PHYSIO VISITS */}
      {activeTab === 'visits' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              Scheduled Bedside Consultations & Rehab
            </h2>
            <Link href="/book">
              <Button variant="outline" size="sm">
                + Book New Visit
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {mockPortalVisits.map((vis) => (
              <div
                key={vis.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F1E8] text-[#0D2329] flex items-center justify-center font-bold text-sm shrink-0">
                    <Calendar className="w-5 h-5 text-[#3D685A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3D685A]">
                        {vis.type}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          vis.status === 'Upcoming'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {vis.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#0D2329] mt-0.5">{vis.providerName}</h3>
                    <p className="text-xs text-[#5C6F75]">{vis.role} • {vis.date} ({vis.time})</p>
                    {vis.notes && <p className="text-xs text-[#0D2329] mt-2 font-medium">{vis.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      showToast({
                        title: 'Reminder Set',
                        description: `Reminder added for ${vis.providerName} visit on ${vis.date}.`,
                        type: 'info'
                      });
                    }}
                  >
                    Sync to Calendar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DIGITAL HEALTH LOCKER */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              Encrypted Medical Documents & Reports
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                showToast({
                  title: 'Upload Triggered',
                  description: 'Select medical report PDF to upload to cloud locker.',
                  type: 'info'
                });
              }}
            >
              + Upload Document
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockPortalDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-5 border border-[#E8E2D8] shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0D2329] line-clamp-1">
                      {doc.title}
                    </h3>
                    <p className="text-[11px] text-[#5C6F75]">
                      {doc.type} • {doc.date} • {doc.fileSize}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    showToast({
                      title: 'Downloading PDF Report...',
                      description: `${doc.title} downloaded securely.`,
                      type: 'success'
                    });
                  }}
                  className="p-2.5 rounded-full bg-[#F6F1E8] hover:bg-[#E8E2D8] text-[#0D2329] transition-colors"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CAREGIVER LOG */}
      {activeTab === 'caregiver' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif-heading font-bold text-[#0D2329]">
                Today&apos;s Daily Routine & Activity Timeline
              </h2>
              <p className="text-xs text-[#5C6F75]">
                Logged by Prakash Chandra (Live-in Attendant)
              </p>
            </div>
            <Badge variant="sage" size="sm">
              All Tasks Completed
            </Badge>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { time: '07:30 AM', task: 'Morning Awakening & Warm Water with Lemon', status: 'Done' },
              { time: '08:15 AM', task: 'Warm Sponge Bath, Skin Moisturizer & Fresh Clothes', status: 'Done' },
              { time: '09:00 AM', task: 'Oats & Egg Whites Breakfast + Morning BP Medicine Telmisartan 40mg', status: 'Done' },
              { time: '11:00 AM', task: 'Assisted Gentle Walk (800 steps in apartment corridor)', status: 'Done' },
              { time: '01:30 PM', task: 'Steamed Khichdi Lunch + Metformin 500mg After Meal', status: 'Done' },
              { time: '04:30 PM', task: 'Evening Green Tea + Sudoku & Memory Conversation', status: 'Done' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8]">
                <span className="text-xs font-bold text-[#3D685A] shrink-0 w-18">{item.time}</span>
                <span className="text-xs sm:text-sm text-[#0D2329] flex-1">{item.task}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Vital Modal Simulator */}
      {showAddVitalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8E2D8] shadow-2xl space-y-4">
            <h3 className="text-xl font-serif-heading font-bold text-[#0D2329]">
              Log New Health Reading
            </h3>
            <form onSubmit={handleAddVital} className="space-y-3">
              <Input
                label="Blood Pressure"
                value={newBp}
                onChange={(e) => setNewBp(e.target.value)}
                required
              />
              <Input
                label="Blood Sugar (Fasting / PP)"
                value={newSugar}
                onChange={(e) => setNewSugar(e.target.value)}
                required
              />
              <Input
                label="Pulse Oximetry (SpO2 %)"
                value={newSpo2}
                onChange={(e) => setNewSpo2(e.target.value)}
                required
              />
              <div className="flex gap-2 pt-3">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Save Vital
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setShowAddVitalModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
