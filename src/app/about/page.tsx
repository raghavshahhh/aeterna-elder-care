'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';
import {
  Heart,
  ShieldCheck,
  Award,
  Stethoscope,
  Users,
  CheckCircle2,
  Building2,
  Clock,
  ArrowRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const { openLeadDrawer, openWhatsApp } = useModal();

  const clinicalBoard = [
    {
      name: 'Dr. Rajeshwar Kulkarni, MD',
      role: 'Chief of Geriatric Medicine & Clinical Governance',
      qualification: 'MBBS, MD Internal Medicine (AIIMS), Fellow Geriatric Medicine',
      experience: '24+ Years Clinical Leadership',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      bio: 'Former Head of Geriatric Outpatient Services at AIIMS. Spearheaded national clinical guidelines for elderly polypharmacy reduction.'
    },
    {
      name: 'Sister Ananya Varghese, RN',
      role: 'Director of Clinical Nursing Operations',
      qualification: 'B.Sc. Nursing, PG Critical Care (CMC Vellore)',
      experience: '16+ Years Critical Care',
      photo: 'https://images.unsplash.com/photo-1594824813590-78174548842d?auto=format&fit=crop&w=600&q=80',
      bio: 'Headed surgical ICUs at Fortis & Max Healthcare. Leads our 500+ registered nurse roster and geriatric simulation academy.'
    },
    {
      name: 'Dr. Shalini Ramanathan',
      role: 'Lead Cognitive Neuropsychologist & Dementia Director',
      qualification: 'Ph.D. Clinical Neuropsychology (NIMHANS), CDP',
      experience: '18+ Years Memory Care',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Specialist in non-pharmacological behavioral therapy for Alzheimer’s, Sundowning syndrome, and family caregiver respite.'
    },
    {
      name: 'Dr. Vivek Swaminathan, MPT',
      role: 'Head of Physical Rehabilitation & Mobility',
      qualification: 'MPT Neuro-Sciences, Certified Geriatric Rehab Specialist',
      experience: '14+ Years Rehabilitation',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Expert in fall-risk recovery, post-TKR mobilization, and stroke hemiplegia gait re-education.'
    }
  ];

  const pillars = [
    {
      title: 'Clinical Primacy Over Brokerage',
      desc: 'We are not an informal domestic agency. Every single patient routine is governed, monitored, and audited by senior MD doctors.'
    },
    {
      title: 'Supreme Human Dignity',
      desc: 'Seniors are treated with deep cultural reverence and warmth. No rushed tasks, no compromised personal hygiene.'
    },
    {
      title: 'Radical Transparency for Families',
      desc: 'Children living in other cities or overseas receive shift-by-shift vitals charts, GPS logs, and direct access to care supervisors.'
    },
    {
      title: 'Sub-15 Minute Emergency SLA',
      desc: 'We invest heavily in dedicated GPS cardiac ambulance nodes so no family is left stranded in acute crises.'
    },
    {
      title: 'Continuous Lifelong Companionship',
      desc: 'Beyond medical procedures, we foster genuine emotional warmth, digital literacy, and active aging joy.'
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* Editorial Hero */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-24 border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold" size="md">
            Our Purpose & Clinical Heritage
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold text-[#0D2329] leading-tight">
            Setting the Gold Standard in Elder Care Across India
          </h1>
          <p className="text-lg sm:text-xl text-[#3D685A] font-light leading-relaxed max-w-2xl mx-auto">
            Born from personal experience, engineered with hospital-grade rigor, and delivered with unconditional warmth.
          </p>
        </div>
      </section>

      {/* Founding Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="sage" size="sm">
              The Genesis of Aeterna
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
              Born Out of the Frustration of Unregulated Domestic Agencies
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#5C6F75] font-light leading-relaxed">
              <p>
                In 2022, our founders experienced the agonizing panic of trying to arrange reliable home healthcare for their 83-year-old grandfather in South Delhi following a cardiac event.
              </p>
              <p>
                Every option in the market fell into two extremes: either expensive, impersonal hospital visits that drained an elderly parent’s energy, or unregulated domestic maid bureaus sending untrained, unvetted workers with zero medical understanding.
              </p>
              <p className="font-normal text-[#0D2329]">
                We founded Aeterna Care to create what Indian families truly deserve: a professional healthcare platform backed by senior geriatricians, certified B.Sc. nurses, biometric background verification, and a 24x7 emergency ambulance network.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-6 text-xs font-bold text-[#0D2329]">
              <div>
                <span className="text-3xl font-extrabold block text-[#0D2329]">12,000+</span>
                <span className="text-[#5C6F75] font-normal">Families Protected</span>
              </div>
              <div className="h-8 w-px bg-[#E8E2D8]" />
              <div>
                <span className="text-3xl font-extrabold block text-[#3D685A]">12</span>
                <span className="text-[#5C6F75] font-normal">Operational Metros</span>
              </div>
              <div className="h-8 w-px bg-[#E8E2D8]" />
              <div>
                <span className="text-3xl font-extrabold block text-[#C58F58]">4.96 / 5</span>
                <span className="text-[#5C6F75] font-normal">Patient Trust Score</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-[#F6F1E8]">
              <Image
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor consulting an elderly mother with compassion"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Advisory Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="gold" size="md">
            Medical Leadership
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#0D2329]">
            Our Clinical Advisory Board & Medical Directors
          </h2>
          <p className="text-sm sm:text-base text-[#5C6F75]">
            Senior physicians and healthcare leaders who audit our clinical standard operating procedures every week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {clinicalBoard.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#F6F1E8] mb-4">
                  <Image
                    src={doc.photo}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-base text-[#0D2329]">{doc.name}</h3>
                <p className="text-xs font-semibold text-[#3D685A] mt-0.5">{doc.role}</p>
                <p className="text-[11px] text-[#5C6F75] mt-1">{doc.qualification}</p>
                <p className="text-xs text-[#5C6F75] mt-3 leading-relaxed font-light">{doc.bio}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E2D8] text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{doc.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Pillars of Care Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2329] text-white rounded-3xl p-8 sm:p-14 border border-[#1C4550] shadow-2xl space-y-10">
          <div className="max-w-xl space-y-2">
            <Badge variant="gold" size="sm">
              Our Non-Negotiables
            </Badge>
            <h2 className="text-3xl font-serif-heading font-bold text-white">
              The 5 Pillars of Aeterna Care Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors"
              >
                <span className="text-xs font-bold text-[#C58F58]">0{idx + 1}.</span>
                <h3 className="font-bold text-base text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-Stage Vetting Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="sage" size="md">
            Safety & Verification
          </Badge>
          <h2 className="text-3xl font-serif-heading font-bold text-[#0D2329]">
            Our 7-Stage Caregiver Vetting Guarantee
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Only 4.8% of caregiver applicants pass our rigorous medical, biometric, and psychological screening.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Aadhaar Biometric Verification', desc: 'UIDAI identity validation with fingerprint/retina check.' },
            { step: '2', title: 'Criminal Background Check', desc: 'State police & district court record legal screening.' },
            { step: '3', title: 'Permanent Address Physical Audit', desc: 'Physical home verification of permanent residence.' },
            { step: '4', title: 'Past Employer Verification', desc: 'Minimum 2 verified hospital or family care references.' },
            { step: '5', title: 'Medical Fitness Screening', desc: 'Screening for communicable diseases, vision, and hepatitis.' },
            { step: '6', title: 'Psychological Temperament Test', desc: 'Patience, empathy, and dementia crisis management testing.' },
            { step: '7', title: '120-Hr Geriatric Simulation', desc: 'Intensive training on bed transfers, hygiene, and emergency CPR.' }
          ].map((v) => (
            <div key={v.step} className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#EAF2EE] text-[#3D685A] font-bold text-xs flex items-center justify-center">
                {v.step}
              </span>
              <h4 className="font-bold text-sm text-[#0D2329]">{v.title}</h4>
              <p className="text-xs text-[#5C6F75] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F1E8] rounded-3xl p-8 sm:p-12 border border-[#E2D7C5] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              Ready to Experience the Aeterna Standard?
            </h3>
            <p className="text-sm text-[#5C6F75]">
              Speak with a Senior Geriatric Specialist today or book an in-home clinical triage visit.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/find-care">
              <Button variant="primary" size="lg">
                Find Right Care Wizard →
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => openLeadDrawer({ title: 'Speak to Our Clinical Director' })}
            >
              Request Callback
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
