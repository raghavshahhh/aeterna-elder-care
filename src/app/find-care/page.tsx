'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { FindCareSubmission } from '@/types';
import {
  Heart,
  User,
  Users,
  Calendar,
  MapPin,
  Activity,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  PhoneCall,
  Download,
  Share2
} from 'lucide-react';

export default function FindCarePage() {
  const { showToast } = useToast();
  const { openWhatsApp } = useModal();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [formData, setFormData] = useState<FindCareSubmission>({
    relation: 'Mother',
    elderAge: '75-80',
    mobilityStatus: 'Needs walking support',
    city: 'Delhi NCR',
    locality: '',
    servicesNeeded: ['ICU Nursing & Clinical Care'],
    urgency: 'within-48-hours',
    schedulePreference: '12-hr-day',
    medicalConditions: [],
    contactName: '',
    contactPhone: '',
    contactWhatsApp: '',
    contactEmail: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep === 1 && !formData.relation) {
      showToast({ title: 'Please select care recipient', type: 'warning' });
      return;
    }
    if (currentStep === 3 && !formData.city) {
      showToast({ title: 'Please select a city', type: 'warning' });
      return;
    }
    if (currentStep === 4 && formData.servicesNeeded.length === 0) {
      showToast({ title: 'Please select at least one care need', type: 'warning' });
      return;
    }
    if (currentStep === 7) {
      if (!formData.contactName || !formData.contactPhone) {
        showToast({ title: 'Name and Phone are required', type: 'warning' });
        return;
      }
      handleSubmit();
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(srv);
      return {
        ...prev,
        servicesNeeded: exists
          ? prev.servicesNeeded.filter((s) => s !== srv)
          : [...prev.servicesNeeded, srv]
      };
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast({
        title: 'Clinical Assessment Complete!',
        description: 'Personalized care roadmap and recommended plan generated.',
        type: 'success'
      });
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] py-12 sm:py-16 bg-gradient-to-b from-[#F6F1E8]/60 via-[#FBF9F5] to-[#FBF9F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!submitted ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-xl space-y-8 animate-in fade-in duration-300">
            {/* Header & Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="sage" size="sm">
                  Clinical Care Assessment
                </Badge>
                <span className="text-xs font-semibold text-[#5C6F75]">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#F6F1E8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0D2329] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
                {currentStep === 1 && 'Who needs care & support?'}
                {currentStep === 2 && "What is the elder's age and mobility status?"}
                {currentStep === 3 && 'Where should the care be delivered?'}
                {currentStep === 4 && 'What type of assistance is required?'}
                {currentStep === 5 && 'How soon do you need care to start?'}
                {currentStep === 6 && 'What is your preferred schedule or shift?'}
                {currentStep === 7 && 'Where should we send the care recommendation?'}
              </h1>
            </div>

            {/* STEP 1: RELATION */}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Mother', icon: <Heart className="w-6 h-6 text-rose-500" /> },
                  { label: 'Father', icon: <User className="w-6 h-6 text-blue-600" /> },
                  { label: 'Both Parents', icon: <Users className="w-6 h-6 text-[#C58F58]" /> },
                  { label: 'Grandparent', icon: <Sparkles className="w-6 h-6 text-emerald-600" /> },
                  { label: 'Self', icon: <Activity className="w-6 h-6 text-[#3D685A]" /> },
                  { label: 'Other Relative', icon: <User className="w-6 h-6 text-neutral-500" /> }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, relation: item.label })}
                    className={`p-6 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-3 ${
                      formData.relation === item.label
                        ? 'border-[#0D2329] bg-[#EAF2EE] shadow-sm'
                        : 'border-[#E8E2D8] hover:border-[#3D685A] bg-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-bold text-sm text-[#0D2329]">{item.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 2: AGE & MOBILITY */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D2329] mb-3">
                    Approximate Age Bracket
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['60 - 70 yrs', '71 - 80 yrs', '81 - 90 yrs', '90+ yrs'].map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setFormData({ ...formData, elderAge: age })}
                        className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                          formData.elderAge === age
                            ? 'border-[#0D2329] bg-[#0D2329] text-white shadow-sm'
                            : 'border-[#E8E2D8] text-[#0D2329] hover:bg-[#F6F1E8]'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D2329] mb-3">
                    Current Mobility Status
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Fully Independent / Mobile',
                      'Needs Walking Stick / Walker Support',
                      'Wheelchair Dependent',
                      'Bedridden / High Dependency'
                    ].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({ ...formData, mobilityStatus: status })}
                        className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all ${
                          formData.mobilityStatus === status
                            ? 'border-[#0D2329] bg-[#EAF2EE] text-[#0D2329] font-bold'
                            : 'border-[#E8E2D8] hover:bg-[#F6F1E8] text-[#5C6F75]'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: LOCATION */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D2329] mb-3">
                    City of Care
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FBF9F5] border border-[#E2D7C5] rounded-2xl px-4 py-3.5 text-sm text-[#0D2329] focus:outline-none focus:border-[#3D685A]"
                  >
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Gurgaon">Gurgaon (Gurugram)</option>
                    <option value="Noida">Noida & Greater Noida</option>
                    <option value="Mumbai">Mumbai & MMR</option>
                    <option value="Bangalore">Bangalore (Bengaluru)</option>
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
                  label="Locality / Neighborhood (Optional)"
                  placeholder="e.g. GK-2, Indiranagar, Bandra West, DLF Phase 5..."
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  helperText="Helps us check average emergency ambulance dispatch time to your street."
                />
              </div>
            )}

            {/* STEP 4: SERVICES NEEDED (MULTI-SELECT) */}
            {currentStep === 4 && (
              <div className="space-y-3">
                <p className="text-xs text-[#5C6F75] mb-2">Select all that apply:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'ICU Nursing & Clinical Procedures',
                    '24x7 Live-in or Day Attendant',
                    'Senior Doctor Home Bedside Visits',
                    'Physiotherapy & Stroke / Knee Rehab',
                    'Dementia & Alzheimer’s Memory Care',
                    'Medical Equipment (Bed, Oxygen, BiPAP)',
                    'Lab Blood Diagnostics at Home',
                    'Companionship & Assisted Outings'
                  ].map((srv) => {
                    const selected = formData.servicesNeeded.includes(srv);
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between gap-3 transition-all ${
                          selected
                            ? 'border-[#0D2329] bg-[#EAF2EE] text-[#0D2329] font-bold'
                            : 'border-[#E8E2D8] hover:bg-[#F6F1E8] text-[#5C6F75]'
                        }`}
                      >
                        <span>{srv}</span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                            selected ? 'bg-[#0D2329] text-white' : 'border border-[#E2D7C5]'
                          }`}
                        >
                          {selected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: URGENCY */}
            {currentStep === 5 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'immediate', title: '🚨 Immediate / Today', desc: 'Hospital discharge or acute clinical need requiring deployment in 4-6 hours.' },
                  { id: 'within-48-hours', title: '⏱️ Within 48 Hours', desc: 'Planning discharge or caregiver onboarding this week.' },
                  { id: 'next-week', title: '📅 Next Week / Month', desc: 'Scheduled upcoming surgery or planned elder transition.' },
                  { id: 'exploring', title: '🔍 Exploring Care Plans', desc: 'Comparing memberships for future peace of mind.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: item.id as any })}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      formData.urgency === item.id
                        ? 'border-[#0D2329] bg-[#EAF2EE] text-[#0D2329] shadow-sm'
                        : 'border-[#E8E2D8] hover:bg-[#F6F1E8] text-[#5C6F75]'
                    }`}
                  >
                    <h4 className="font-bold text-sm text-[#0D2329]">{item.title}</h4>
                    <p className="text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 6: SCHEDULE PREFERENCE */}
            {currentStep === 6 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: '12-hr-day', title: '12-Hour Day Shift', desc: '8:00 AM to 8:00 PM support for daily routine, meals, and mobility.' },
                  { id: '12-hr-night', title: '12-Hour Night Shift', desc: '8:00 PM to 8:00 AM support for night washroom safety and vital tracking.' },
                  { id: '24-hr-livein', title: '24-Hour Live-in Care', desc: 'Round-the-clock attendant staying at home for continuous security.' },
                  { id: 'visiting', title: 'Visiting / On-Demand', desc: 'Procedure-by-procedure visits (injections, physio, doctor checkups).' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, schedulePreference: item.id as any })}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      formData.schedulePreference === item.id
                        ? 'border-[#0D2329] bg-[#EAF2EE] text-[#0D2329] shadow-sm'
                        : 'border-[#E8E2D8] hover:bg-[#F6F1E8] text-[#5C6F75]'
                    }`}
                  >
                    <h4 className="font-bold text-sm text-[#0D2329]">{item.title}</h4>
                    <p className="text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 7: CONTACT DETAILS */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#EAF2EE] text-xs text-[#1D4B57] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    Your assessment summary and tailored pricing will be generated instantly. 100% confidential.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Full Name"
                    placeholder="e.g. Vikram Malhotra"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    required
                  />

                  <Input
                    label="Phone Number"
                    placeholder="+91 98765 43210"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="WhatsApp Number (For Instant Report)"
                    placeholder="+91 98765 43210"
                    value={formData.contactWhatsApp}
                    onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="vikram@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-[#E8E2D8]">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleBack}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Back
                </Button>
              ) : (
                <div className="hidden sm:block" />
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                isLoading={loading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto font-bold"
              >
                {currentStep === totalSteps ? 'Generate Care Recommendation' : 'Continue →'}
              </Button>
            </div>
          </div>
        ) : (
          /* STEP 8: TAILORED RECOMMENDATION RESULT */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-3 pb-6 border-b border-[#E8E2D8]">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <Badge variant="gold" size="md">
                Clinical Recommendation Ready
              </Badge>

              <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
                Tailored Care Roadmap for Your {formData.relation}
              </h2>
              <p className="text-sm text-[#5C6F75] max-w-md mx-auto">
                Based on {formData.elderAge} age profile, mobility status, and location in {formData.city}.
              </p>
            </div>

            {/* Recommended Plan Match Card */}
            <div className="bg-[#0D2329] text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-[#1C4550]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C58F58]">
                  ⭐ Best Suited Care Plan
                </span>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/80">
                  98.4% Match Score
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
                  Gold Essential Membership + {formData.schedulePreference === '24-hr-livein' ? 'Live-in Attendant' : 'Clinical Shift'}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Quarterly Doctor Home Visits • 2 Free ACLS Cardiac Ambulance Dispatches • Daily Vitals Telemetry
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Estimated Monthly Care Budget:</span>
                  <strong className="text-white">₹6,499 / mo (Plan) + Shifts</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Emergency Ambulance SLA in {formData.city}:</span>
                  <strong className="text-emerald-400">&lt; 14 Minutes</strong>
                </div>
              </div>
            </div>

            {/* Assigned Clinical Specialist */}
            <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E2D7C5] flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-[#3D685A]">
                <Image
                  src="https://images.unsplash.com/photo-1594824813590-78174548842d?auto=format&fit=crop&w=200&q=80"
                  alt="Sister Ananya"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-[#3D685A] block">
                  Assigned Clinical Advisor
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#0D2329]">
                  Sister Ananya Varghese, RN
                </h4>
                <p className="text-xs text-[#5C6F75]">
                  B.Sc. Nursing, 16+ yrs Critical Care • Dialing your number ({formData.contactPhone})
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link href={`/book?city=${encodeURIComponent(formData.city)}&relation=${encodeURIComponent(formData.relation)}`}>
                <Button variant="primary" size="lg" className="w-full font-bold">
                  Schedule In-Home Triage Visit →
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => openWhatsApp({ service: 'Customized Assessment Follow-up', city: formData.city })}
                  leftIcon={<Sparkles className="w-4 h-4 text-emerald-600" />}
                >
                  WhatsApp Report
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    showToast({
                      title: 'Report Downloaded',
                      description: 'Aeterna Clinical Assessment PDF saved.',
                      type: 'success'
                    });
                  }}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
