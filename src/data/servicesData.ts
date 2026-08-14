import { Service } from '@/types';

export const servicesData: Service[] = [
  {
    id: 'srv-1',
    slug: 'home-nursing',
    title: 'ICU & Clinical Home Nursing',
    subtitle: 'Hospital-grade critical & clinical nursing in the comfort of home',
    shortDescription: 'Certified B.Sc. & GNM nurses for tracheostomy, catheterization, IV therapy, post-chemo, and ventilator monitoring under senior doctor supervision.',
    category: 'critical-care',
    categoryName: 'Critical & Clinical Care',
    iconName: 'Activity',
    heroImage: '/images/indian-nurse-bp.jpg',
    badge: 'NABH Compliant Protocols',
    rating: 4.96,
    reviewCount: 342,
    startingPrice: '₹1,800',
    priceUnit: 'per 12-hour shift',
    clinicalLead: {
      name: 'Sister Ananya Varghese, RN',
      role: 'Head of Clinical Nursing Operations',
      qualification: 'B.Sc. Nursing, PG Critical Care (CMC Vellore)',
      experience: '16+ Years Critical Care'
    },
    highlights: [
      '100% Background-verified & Police-cleared B.Sc./GNM Registered Nurses',
      'Continuous remote monitoring by supervising Chief Medical Officer',
      'Daily digital vitals charts synced directly to Family Mobile App',
      'Emergency medicine administration & sterile dressing protocols',
      'Zero-hassle instant nurse replacement guarantee within 4 hours'
    ],
    whatIsIncluded: [
      {
        title: 'Clinical Procedures & Monitoring',
        items: [
          'Tracheostomy care, suctioning & cannula replacement',
          'Ryle’s tube insertion, feeding & gastrostomy care',
          'Urinary catheterization (Foley/Silicone) & bladder irrigation',
          'Intravenous (IV) cannulation, IV infusions & injections (IM/SC)',
          'Advanced bedsore grading, sterile debridement & dressing (Vacuum/Hydrocolloid)'
        ]
      },
      {
        title: 'Device & Oxygen Management',
        items: [
          'Invasive & non-invasive ventilator parameter tracking',
          'BiPAP / CPAP machine titration & mask seal inspection',
          'Oxygen concentrator, cylinder flow rate & SpO2 titration',
          'Cardiac multi-para monitor interpretation & arrhythmia alerts'
        ]
      },
      {
        title: 'Family Transparency & Record Keeping',
        items: [
          'Shift-by-shift clinical handover report in Digital Health Locker',
          'Medication reconciliation with primary hospital discharge summary',
          'Weekly audit call with Senior Nursing Superintendent'
        ]
      }
    ],
    whoIsThisFor: [
      'Seniors recovering from stroke, cardiac surgery, or major trauma',
      'Patients with high-dependency tracheostomy or home ventilator needs',
      'Elderly suffering from Stage 3/4 bedsores requiring aseptic sterile management',
      'Post-chemotherapy and cancer palliative care support at home'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'In-Depth Clinical Triage (Day 0)',
        description: 'Our Geriatric Clinical Specialist reviews hospital discharge summary, lab reports, and home layout to formulate a personalized Nursing Care Plan (NCP).'
      },
      {
        step: 2,
        title: 'Nurse Skill Matching & Orientation',
        description: 'We assign a nurse with specific competency in the patient condition (e.g. neuro-rehab, tracheostomy, geriatric oncology).'
      },
      {
        step: 3,
        title: 'Daily Supervised Execution',
        description: 'Nurse logs vitals 4x daily via the clinical tablet. Algorithms flag vitals deviations to our 24/7 central emergency desk.'
      },
      {
        step: 4,
        title: 'Weekly Clinical Review',
        description: 'Supervising physician reviews progress every 7 days and adjusts medication schedule in consultation with the family doctor.'
      }
    ],
    pricingTiers: [
      {
        name: 'Visiting Clinical Nurse',
        price: '₹799',
        period: 'per procedure',
        description: 'Ideal for specific injections, dressings, catheter change, or IV drip setups.',
        features: [
          'Up to 60 mins dedicated nurse visit',
          'Sterile consumable kit included',
          'Vital signs assessment & digital report',
          'Prescription adherence check'
        ]
      },
      {
        name: '12-Hour Critical Shift',
        price: '₹1,800',
        period: 'per 12-hr shift',
        description: 'Continuous day or night supervision for high-dependency seniors.',
        recommended: true,
        features: [
          'Dedicated GNM/B.Sc. registered nurse',
          'Vitals charting every 2 hours',
          'Full medication & nutrition delivery',
          'Direct hotline to Supervising Doctor',
          'Free replacement within 4 hours'
        ]
      },
      {
        name: '24-Hour Live-in ICU Care',
        price: '₹3,400',
        period: 'per 24-hr day (2-nurse rotation)',
        description: 'Round-the-clock intensive care with 2 rotational certified nurses.',
        features: [
          'Zero unsupervised gaps',
          'Ventilator & BiPAP management',
          'Daily medical audit by senior physician',
          'Priority emergency ambulance standby',
          'Digital health locker sync for NRI families'
        ]
      }
    ],
    faqs: [
      {
        question: 'What are the qualifications of your home nurses?',
        answer: 'All our nurses hold either a General Nursing and Midwifery (GNM) diploma or a Bachelor of Science (B.Sc.) in Nursing from recognized Nursing Councils, with a minimum of 2 years of prior ICU or hospital ward experience. They undergo a mandatory 40-hour geriatric orientation at our Clinical Academy.'
      },
      {
        question: 'How quickly can you deploy a nurse at home?',
        answer: 'For emergency post-hospital discharge in major metro cities, we can deploy within 4 to 6 hours after reviewing the patient discharge summary. For scheduled care, we recommend 24 hours advance notice.'
      },
      {
        question: 'What happens if the assigned nurse falls ill or takes leave?',
        answer: 'We maintain a 15% bench of standby certified nurses. In the rare event of illness, our central team dispatches a fully briefed replacement nurse with handover within 4 hours at zero extra charge.'
      }
    ],
    relatedServiceSlugs: ['24x7-caregiver-attendant', 'doctor-home-visits', 'medical-equipment-rental']
  },
  {
    id: 'srv-2',
    slug: '24x7-caregiver-attendant',
    title: 'Trained Geriatric Caregivers & Attendants',
    subtitle: 'Warm, respectful assistance with daily living, hygiene, and mobility',
    shortDescription: 'Dedicated female and male elder attendants trained in dementia empathy, bed-to-chair transfer, sponge bathing, feeding, and active fall prevention.',
    category: 'daily-living',
    categoryName: 'Daily Assisted Living',
    iconName: 'HeartHandshake',
    heroImage: '/images/indian-daughter-care.jpg',
    badge: '100% Police Verified',
    rating: 4.93,
    reviewCount: 489,
    startingPrice: '₹1,100',
    priceUnit: 'per 12-hour shift',
    clinicalLead: {
      name: 'Dr. Meenakshi Sundaram',
      role: 'Director of Elder Well-being & Attendant Training',
      qualification: 'MD Geriatric Care, PGD Gerontology',
      experience: '20+ Years Gerontology'
    },
    highlights: [
      'Comprehensive 7-point background check (Aadhaar, Police, Permanent Address verification)',
      '120 hours of hands-on simulation training in dementia care & fall prevention',
      'Assistance with bathing, grooming, diaper change, and oral hygiene with supreme dignity',
      'Nutritious meal preparation and doctor-prescribed timely medicine administration',
      'Empathetic companionship to alleviate isolation and loneliness in seniors'
    ],
    whatIsIncluded: [
      {
        title: 'Personal Hygiene & Dignity',
        items: [
          'Assisted bed bath, sponge bath or shower assistance',
          'Oral care, denture sanitization & hair grooming',
          'Diaper changing, bedpan support & skin barrier cream application to prevent rashes'
        ]
      },
      {
        title: 'Mobility & Fall Safety',
        items: [
          'Safe transfer from bed to wheelchair, commode, and walking support',
          'Assisted gentle morning/evening walks with gait stability monitoring',
          'Active room hazard clearance to prevent trip-and-fall incidents'
        ]
      },
      {
        title: 'Nutrition & Daily Routine',
        items: [
          'Assisted feeding and preparation of soft/diabetic/hypertension meals',
          'Timely medicine dispensing as per prescribed doctor chart',
          'Mental stimulation games, newspaper reading & empathetic conversations'
        ]
      }
    ],
    whoIsThisFor: [
      'Elderly parents living independently while children live in other cities or abroad',
      'Seniors with limited mobility, Parkinson’s tremors, or arthritis stiffness',
      'Patients needing non-clinical post-discharge assistance and daily routine management',
      'Elders recovering from hip fracture surgery or joint replacement'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Home Environment & Lifestyle Assessment',
        description: 'Our Care Manager visits your home to understand dietary preferences, language fluency, sleep schedule, and physical support needs.'
      },
      {
        step: 2,
        title: 'Caregiver Profile Matching',
        description: 'We match 2 candidate profiles based on language compatibility, gender preference, and specialized experience (e.g. bedridden vs mobile).'
      },
      {
        step: 3,
        title: 'Supervised Trial & Orientation',
        description: 'First day includes an on-site handover by our Care Supervisor to calibrate care routines and emergency contact numbers.'
      },
      {
        step: 4,
        title: 'Continuous Quality Audits',
        description: 'Bi-weekly surprise audits and daily biometric/mobile check-ins ensure absolute punctuality, hygiene, and compassionate care.'
      }
    ],
    pricingTiers: [
      {
        name: '12-Hour Day Attendant',
        price: '₹1,100',
        period: 'per day (30-day package)',
        description: 'Daily support from 8:00 AM to 8:00 PM for active routine assistance.',
        features: [
          'Personal hygiene & bathing support',
          'Medication reminders & meal serving',
          'Assisted walking & mobility exercises',
          'Daily activity log on mobile app',
          '1 free replacement per month'
        ]
      },
      {
        name: '24-Hour Live-in Attendant',
        price: '₹1,750',
        period: 'per day (30-day package)',
        description: 'Continuous 24-hour companion staying at the home for peace of mind.',
        recommended: true,
        features: [
          'Round-the-clock presence & night assistance',
          'Bed-to-washroom night transfers',
          'Home meal preparation assistance',
          'Dedicated Care Manager weekly calls',
          'Unlimited replacements guarantee'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can we interview the caregiver before final confirmation?',
        answer: 'Yes, absolutely. We provide 2-3 shortlisted caregiver profiles with video introduction clips, language details, and work experience. You can conduct a video or phone interview before they are assigned.'
      },
      {
        question: 'What if my parent does not get along with the caregiver?',
        answer: 'Elder-care requires deep emotional chemistry. If your parent is uncomfortable for any reason, simply notify your Dedicated Care Manager and we will provide a replacement caregiver within 24 to 48 hours without any additional fee.'
      }
    ],
    relatedServiceSlugs: ['home-nursing', 'dementia-alzheimers-care', 'physiotherapy-rehab']
  },
  {
    id: 'srv-3',
    slug: 'doctor-home-visits',
    title: 'Senior Physician & Geriatrician Home Visits',
    subtitle: 'Comprehensive bedside medical consultations without clinic stress',
    shortDescription: 'Senior MD Physicians, Geriatricians, and specialists visiting your parents at home for thorough 45-minute clinical reviews, ECG, and prescription audits.',
    category: 'medical-rehab',
    categoryName: 'Doctor & Rehab Services',
    iconName: 'Stethoscope',
    heroImage: '/images/indian-about-care.jpg',
    badge: 'Senior MD Geriatricians',
    rating: 4.98,
    reviewCount: 290,
    startingPrice: '₹1,499',
    priceUnit: 'per consultation',
    clinicalLead: {
      name: 'Dr. Rajeshwar Kulkarni, MD',
      role: 'Chief of Geriatric Medicine',
      qualification: 'MBBS, MD Internal Medicine, Fellow in Geriatrics (AIIMS)',
      experience: '24+ Years Clinical Leadership'
    },
    highlights: [
      'Unrushed 45-minute bedside consultation focusing on multi-morbidity',
      'Comprehensive Polypharmacy & Drug Interaction audit of all current pills',
      'Portable 12-lead digital ECG, Blood Pressure, and Blood Sugar done on the spot',
      'Digitized prescription and medical summary sent directly to children abroad',
      'Ongoing teleconsultation follow-up included for 7 days post-visit'
    ],
    whatIsIncluded: [
      {
        title: 'Bedside Clinical Assessment',
        items: [
          'Detailed cardiovascular, pulmonary, abdominal, and neurological physical exam',
          'Cognitive assessment using Mini-Mental State Examination (MMSE)',
          'Frailty, fall risk, and nutritional status evaluation'
        ]
      },
      {
        title: 'Diagnostic Support on the Spot',
        items: [
          'Immediate bedside 12-lead digital ECG recording',
          'Random & fasting blood glucose testing via calibrated glucometer',
          'Pulse oximetry, respiratory rate & peripheral pulse assessment'
        ]
      },
      {
        title: 'Prescription & Treatment Planning',
        items: [
          'Rationalization of overlapping medications to reduce side-effects',
          'Direct coordination with tertiary hospital specialists if hospitalization needed',
          'Digital prescription valid at all licensed pharmacies across India'
        ]
      }
    ],
    whoIsThisFor: [
      'Frail elders for whom travel to hospitals causes immense physical fatigue and stress',
      'Seniors with multiple chronic ailments (Hypertension, Diabetes, Kidney disease, Arthritis)',
      'Post-discharge patients needing close medical review 7 days after leaving hospital',
      'Parents needing regular preventive health check-ins and blood test reviews'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Pre-Visit History Collection',
        description: 'Our medical officer compiles past discharge summaries, recent lab reports, and current medication list before the doctor arrives.'
      },
      {
        step: 2,
        title: 'Comprehensive 45-Minute Bedside Exam',
        description: 'Doctor conducts in-depth physical examination, listens to family concerns, and checks vital organ functions.'
      },
      {
        step: 3,
        title: 'Family Briefing & Prescription Sync',
        description: 'Doctor connects on a 3-way conference call with children living outside the city to explain findings and the future care plan.'
      },
      {
        step: 4,
        title: '7-Day Follow-Up Protocol',
        description: 'Our care manager calls on Day 3 and Day 7 to check medication compliance and symptom resolution.'
      }
    ],
    pricingTiers: [
      {
        name: 'Single Physician Visit',
        price: '₹1,499',
        period: 'per visit',
        description: 'Comprehensive 45-minute home consultation with prescription & ECG.',
        features: [
          'Senior MD Internal Medicine physician',
          'Bedside 12-lead ECG & glucose check',
          'Full drug interaction audit',
          'Digital report in health locker',
          '7 days free tele-consult follow-up'
        ]
      },
      {
        name: 'Quarterly Doctor Care Package',
        price: '₹4,999',
        period: '4 visits / year (Annual)',
        description: 'Regular seasonal checkups and preventive monitoring throughout the year.',
        recommended: true,
        features: [
          '4 Planned MD Physician home visits',
          'Annual Comprehensive Blood Profile (68 tests)',
          'Dedicated Geriatrician assigned to family',
          'Unlimited tele-consultations for 12 months',
          'Emergency hospitalization priority support'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can the doctor order blood tests or X-rays at home?',
        answer: 'Yes! If the doctor recommends blood investigations or portable digital X-rays, our home diagnostics team arrives within 2 hours to collect samples or capture bedside X-rays.'
      },
      {
        question: 'Are your doctors qualified to handle acute emergencies?',
        answer: 'Our visiting physicians carry emergency medical kits and can stabilize conditions; however, for life-threatening events (acute cardiac arrest, major stroke), our integrated emergency ambulance protocol is triggered immediately.'
      }
    ],
    relatedServiceSlugs: ['home-nursing', 'lab-tests-at-home', 'emergency-ambulance-support']
  },
  {
    id: 'srv-4',
    slug: 'physiotherapy-rehab',
    title: 'Geriatric Physiotherapy & Neuro-Rehabilitation',
    subtitle: 'Restoring balance, joint mobility, and walking confidence',
    shortDescription: 'Qualified MPT / BPT physiotherapists specializing in stroke paralysis rehab, knee/hip replacement recovery, Parkinson’s gait training, and pain relief therapy.',
    category: 'medical-rehab',
    categoryName: 'Medical Consultations & Rehab',
    iconName: 'Footprints',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
    badge: 'Certified MPT Specialists',
    rating: 4.95,
    reviewCount: 318,
    startingPrice: '₹850',
    priceUnit: 'per 45-min session',
    clinicalLead: {
      name: 'Dr. Vivek Swaminathan, MPT',
      role: 'Head of Neuro-Rehabilitation & Physical Therapy',
      qualification: 'MPT Neuro-Sciences (NIMHANS), Certified Geriatric Rehab Specialist',
      experience: '14+ Years Rehabilitation'
    },
    highlights: [
      'Advanced portable therapy equipment brought home (TENS, Ultrasound, Muscle Stimulator)',
      'Tailored rehabilitation plans for Total Knee Replacement (TKR) and Hip Arthroplasty',
      'Stroke Hemiplegia recovery: mirror therapy, fine-motor training & gait re-education',
      'Objective range-of-motion (ROM) and muscle power grading tracked weekly',
      'Gentle, compassionate pacing calibrated specifically for elder pain thresholds'
    ],
    whatIsIncluded: [
      {
        title: 'Specialized Clinical Modalities',
        items: [
          'Electrotherapy for acute & chronic arthritic pain (TENS, IFT, Therapeutic Ultrasound)',
          'Neuromuscular electrical stimulation (NMES) for foot drop & muscle atrophy',
          'Chest physiotherapy & incentive spirometry for respiratory endurance'
        ]
      },
      {
        title: 'Functional Movement Training',
        items: [
          'Sit-to-stand bio-mechanics and posture correction',
          'Dynamic balance training using foam balance pads and wobble boards to prevent falls',
          'Stair-climbing confidence training and outdoor gait endurance'
        ]
      },
      {
        title: 'Caregiver & Home Ergonomics Training',
        items: [
          'Coaching family members and attendants on safe lifting techniques',
          'Prescription of appropriate walking aids (Quadripod cane, Rollator walker)',
          'Home environment hazard audit to optimize bathroom and corridor safety'
        ]
      }
    ],
    whoIsThisFor: [
      'Seniors within 1 to 12 weeks of Knee Replacement or Hip Fracture surgery',
      'Stroke survivors regaining motor control in arms, hands, or legs',
      'Elders experiencing severe balance loss, unsteady gait, or fear of falling',
      'Chronic cervical, lumbar spondylosis, or osteoarthritic knee pain'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Initial Functional Mobility Assessment',
        description: 'Physiotherapist measures joint angles, muscle power (MMT), Berg Balance score, and pain numeric rating.'
      },
      {
        step: 2,
        title: 'Target-Driven Rehab Roadmap',
        description: 'We establish clear milestones (e.g. walking unassisted by Week 3, climbing stairs by Week 6).'
      },
      {
        step: 3,
        title: 'Daily/Alternate-Day Therapy Sessions',
        description: 'Hands-on manual therapy, therapeutic exercises, and electro-modalities delivered with continuous encouragement.'
      },
      {
        step: 4,
        title: 'Re-Assessment & Maintenance Program',
        description: 'Formal progress report prepared at end of 15 sessions with home maintenance exercise booklet.'
      }
    ],
    pricingTiers: [
      {
        name: 'Single Assessment Session',
        price: '₹850',
        period: 'per session (45 mins)',
        description: 'Comprehensive physical evaluation, pain diagnosis & first treatment.',
        features: [
          'Full musculoskeletal & neuro assessment',
          'TENS / Ultrasound therapy',
          'Prescription of home exercise routine',
          'Digital mobility scorecard'
        ]
      },
      {
        name: '15-Session Recovery Pack',
        price: '₹10,500',
        period: '₹700 / session (Save 18%)',
        description: 'Intensive rehabilitation package for post-surgery and stroke recovery.',
        recommended: true,
        features: [
          '15 Hands-on physiotherapy sessions',
          'Free advanced electrotherapy modalities',
          'Weekly Berg Balance & ROM tracking',
          'Dedicated senior MPT therapist assigned',
          'Doctor review coordination'
        ]
      },
      {
        name: '30-Session Complete Mobility Pack',
        price: '₹18,000',
        period: '₹600 / session (Save 30%)',
        description: 'Complete independence restoration program for severe stroke or dual surgery.',
        features: [
          '30 Intensive 1-on-1 sessions',
          'Gait re-education & stair climbing training',
          'Home fall safety adaptation report',
          'Assisted walking equipment calibration',
          'Free replacement therapist guarantee'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does the physiotherapist bring their own therapy machines?',
        answer: 'Yes. Our physiotherapists carry calibrated medical kits containing portable TENS units, Therapeutic Ultrasound, muscle stimulators, resistance bands, and balance pads directly to your home.'
      },
      {
        question: 'How many sessions are typically required for post-knee replacement?',
        answer: 'Most orthopedic surgeons recommend 15 to 20 daily sessions following discharge. By session 10, patients typically achieve 90-110 degrees of knee flexion and can walk with minimal cane support.'
      }
    ],
    relatedServiceSlugs: ['home-nursing', 'doctor-home-visits', 'medical-equipment-rental']
  },
  {
    id: 'srv-5',
    slug: 'dementia-alzheimers-care',
    title: 'Dementia & Alzheimer’s Memory Care',
    subtitle: 'Specialized cognitive stimulation, behavioral calming, and wandering safety',
    shortDescription: 'Dedicated memory-care specialists trained in Alzheimer’s, Vascular Dementia, and Lewy Body care. We provide structured cognitive therapies, sensory calming, and caregiver respite.',
    category: 'dementia-memory',
    categoryName: 'Dementia & Memory Care',
    iconName: 'Brain',
    heroImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1400&q=80',
    badge: 'Cognitive Care Certified',
    rating: 4.97,
    reviewCount: 178,
    startingPrice: '₹1,600',
    priceUnit: 'per 12-hour shift',
    clinicalLead: {
      name: 'Dr. Shalini Ramanathan',
      role: 'Lead Cognitive Neuropsychologist & Dementia Director',
      qualification: 'Ph.D. Clinical Neuropsychology, Certified Dementia Practitioner (CDP)',
      experience: '18+ Years Memory Care'
    },
    highlights: [
      'Non-pharmacological de-escalation for Sundowning, agitation, and anxiety',
      'Reminiscence therapy and personalized Memory Box engagement exercises',
      'Safe wandering management and home orientation cue systems',
      'Respite care support for emotionally exhausted family caregivers',
      'Regular cognitive score tracking and neurologist consultation alignment'
    ],
    whatIsIncluded: [
      {
        title: 'Cognitive & Sensory Stimulation',
        items: [
          'Daily structured cognitive exercises, audio-photo albums, and music therapy',
          'Aromatherapy and soothing tactile sensory blankets to ease evening agitation',
          'Familiar routine anchoring to reduce disorientation and confusion'
        ]
      },
      {
        title: 'Behavioral Management & Empathy',
        items: [
          'Validation therapy techniques to address hallucinations and repetitive questioning',
          'Patience-driven assistance with dressing, feeding, and nighttime sleep cycles',
          'Zero physical restraints policy — 100% gentle engagement'
        ]
      },
      {
        title: 'Family Coaching & Respite',
        items: [
          'Bi-weekly counseling sessions for primary family members on handling burnout',
          'Safety checklist for home locks, kitchen stove guards, and GPS trackers',
          'Emergency SOS protocols for sudden behavioral changes'
        ]
      }
    ],
    whoIsThisFor: [
      'Seniors diagnosed with Mild Cognitive Impairment (MCI), Alzheimer’s, or Frontotemporal Dementia',
      'Elders experiencing severe evening agitation (Sundowning syndrome) or sleep cycle inversion',
      'Parents prone to wandering outside and getting lost',
      'Families seeking compassionate relief from the 24/7 strain of memory care'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Neuropsychological Assessment & Life Story Profiling',
        description: 'We assess the patient stage (Fast scale / CDR) and document their favorite youth memories, music, career history, and triggers.'
      },
      {
        step: 2,
        title: 'Dementia-Certified Caregiver Matching',
        description: 'We assign a caregiver who has passed advanced behavioral de-escalation training and matches language and temperament.'
      },
      {
        step: 3,
        title: 'Structured Daily Routine Implementation',
        description: 'A calming rhythm of sensory activities, light physical movement, music, and quiet hours is maintained daily.'
      },
      {
        step: 4,
        title: 'Neurologist Collaboration & Family Circle Updates',
        description: 'Monthly behavioral logs are shared with the treating neurologist to evaluate medication efficacy.'
      }
    ],
    pricingTiers: [
      {
        name: 'Day Memory Care (12 Hours)',
        price: '₹1,600',
        period: 'per day (30-day package)',
        description: 'Active daytime cognitive engagement and safe routine management.',
        features: [
          'Certified Dementia Caregiver',
          'Cognitive stimulation activities',
          'Sundowning de-escalation support',
          'Hygiene & nutrition assistance',
          'Monthly Clinical Neuropsychologist review'
        ]
      },
      {
        name: '24-Hour Intensive Memory Care',
        price: '₹2,600',
        period: 'per day (30-day package)',
        description: 'Complete 24x7 day and night supervision for advanced dementia.',
        recommended: true,
        features: [
          'Round-the-clock wandering safety & night calming',
          'Bedtime soothing routines & sleep cycle restoration',
          'Full assistance with all activities of daily living (ADL)',
          'Dedicated Dementia Care Manager',
          'Emergency neurologist priority access'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do your attendants handle aggressive outbursts or resistance to bathing?',
        answer: 'Our dementia specialists are trained in the "Validation Approach" — they never argue, correct, or force the elder. Instead, they redirect attention, validate underlying emotions, use warm distraction techniques, and return to tasks when the senior feels calm and safe.'
      },
      {
        question: 'Can you help set up safety modifications in our home for dementia?',
        answer: 'Yes. Our clinical team conducts a comprehensive Home Safety Audit to recommend non-intrusive door sensors, contrast toilet seats, concealed locks, and night path lighting.'
      }
    ],
    relatedServiceSlugs: ['24x7-caregiver-attendant', 'doctor-home-visits', 'companion-concierge-care']
  },
  {
    id: 'srv-6',
    slug: 'post-operative-care',
    title: 'Post-Operative & Surgical Recovery at Home',
    subtitle: 'Safe, infection-free healing after cardiac, orthopedic, and abdominal surgery',
    shortDescription: 'Specialized 14-day and 30-day post-surgery care packages including wound drain monitoring, aseptic dressings, pain control, deep vein thrombosis (DVT) prevention, and diet management.',
    category: 'critical-care',
    categoryName: 'Critical & Clinical Care',
    iconName: 'Bandage',
    heroImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80',
    badge: 'Zero Infection Protocol',
    rating: 4.94,
    reviewCount: 224,
    startingPrice: '₹1,700',
    priceUnit: 'per 12-hour shift',
    clinicalLead: {
      name: 'Dr. Arvind Sen, MS, MCh',
      role: 'Surgical Recovery Consultant',
      qualification: 'MS General Surgery, Ex-Senior Consultant Max Healthcare',
      experience: '22+ Years Surgical Excellence'
    },
    highlights: [
      'Sterile surgical wound care complying with CDC surgical site infection guidelines',
      'Monitoring of surgical drains (Jackson-Pratt, Hemovac), output charting & timely removal',
      'Deep Vein Thrombosis (DVT) prevention with graduated compression & mobilization',
      'Strict adherence to operating surgeon’s protocol & pain management regimen',
      'Daily high-definition wound photographs reviewed by our Chief Medical Officer'
    ],
    whatIsIncluded: [
      {
        title: 'Surgical Wound & Drain Management',
        items: [
          'Aseptic dressing changes using hospital-grade antimicrobial dressings',
          'Staple/suture removal by certified nurse with surgeon sign-off',
          'Drain fluid color, consistency, and volume recording'
        ]
      },
      {
        title: 'Pain Control & Medication Adherence',
        items: [
          'Strict schedule for oral and IV analgesics, antibiotics, and anticoagulants',
          'Incentive spirometry supervision to prevent post-op atelectasis/pneumonia',
          'Anti-embolic stocking maintenance and passive limb exercises'
        ]
      },
      {
        title: 'Post-Op Nutrition & Hydration',
        items: [
          'Graduated diet progression from clear liquids to soft protein-rich healing meals',
          'Bowel & bladder function monitoring to prevent post-anesthesia constipation',
          'Direct liaison with hospital surgeon for tele-review'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients returning home after CABG (Open Heart bypass) or Valve Replacement',
      'Elders discharged after Total Hip or Knee Arthroplasty',
      'Post-laparotomy, hernia, gallbladder, or oncological surgery recovery',
      'Seniors with surgical drains, temporary stomas, or high wound infection risks'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Hospital Bedside Handover',
        description: 'Our nurse connects with the hospital team on day of discharge to review surgical notes, incision status, and drain levels.'
      },
      {
        step: 2,
        title: 'Home Sanitization & Equipment Setup',
        description: 'We ensure oxygen, motorized hospital bed, suction machine, and sterile consumable packs are in place before patient arrives.'
      },
      {
        step: 3,
        title: 'Active Clinical Healing Protocol',
        description: 'Continuous vitals charting, sterile dressings, and early mobilization initiated as per surgeon guidelines.'
      },
      {
        step: 4,
        title: 'Surgeon Tele-Review & Discharge from Care',
        description: 'Digital wound timeline shared with surgeon at Day 14 for suture removal and clearance.'
      }
    ],
    pricingTiers: [
      {
        name: '14-Day Rapid Recovery Pack',
        price: '₹22,000',
        period: '14 Days (12-hr Nursing)',
        description: 'Essential post-surgical care for laparoscopic and joint replacement recovery.',
        features: [
          '12-hr daily B.Sc. nurse',
          'Sterile dressing changes included',
          'Surgeon coordination & daily wound review',
          '1 Free MD Physician home visit',
          'Emergency priority hotline'
        ]
      },
      {
        name: '30-Day Critical Post-Op Pack',
        price: '₹54,000',
        period: '30 Days (12-hr Nursing + Physio)',
        description: 'Comprehensive recovery for cardiac, neuro, or major abdominal surgeries.',
        recommended: true,
        features: [
          '30 Days 12-hr clinical nursing',
          '10 Physiotherapy mobilization sessions',
          '2 Doctor home visits included',
          'Full DVT & pulmonary rehab protocol',
          'Digital health locker sync'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can you coordinate with my parents’ hospital surgeon?',
        answer: 'Yes! Our clinical lead sends weekly photographic wound healing reports and vitals summaries directly to your primary operating surgeon for review.'
      },
      {
        question: 'What if an infection or sudden fever occurs?',
        answer: 'Our protocol triggers an immediate bedside blood culture and urgent consult with our on-call physician, who can administer IV antibiotics or mobilize our ambulance if tertiary intervention is needed.'
      }
    ],
    relatedServiceSlugs: ['home-nursing', 'physiotherapy-rehab', 'doctor-home-visits']
  },
  {
    id: 'srv-7',
    slug: 'medical-equipment-rental',
    title: 'Hospital Beds & Medical Equipment Rental',
    subtitle: 'ICU-grade equipment delivered, sanitized, and installed within 4 hours',
    shortDescription: 'Motorized hospital beds, BiPAP/CPAP, oxygen concentrators, patient hoists, suction machines, and wheelchairs delivered with technical demonstration and maintenance support.',
    category: 'diagnostics-meds',
    categoryName: 'Diagnostics & Equipment',
    iconName: 'BedDouble',
    heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
    badge: 'Same-Day 4-Hr Delivery',
    rating: 4.91,
    reviewCount: 412,
    startingPrice: '₹1,500',
    priceUnit: 'per month',
    clinicalLead: {
      name: 'Er. Sandeep Bhasin',
      role: 'Director of Biomedical Engineering',
      qualification: 'B.Tech Biomedical Engineering, Certified Medical Device Specialist',
      experience: '15+ Years Medical Technology'
    },
    highlights: [
      '100% Hospital-grade equipment disinfected with medical-grade hospital sterilants',
      'Free doorstep installation and hands-on operational training for family & attendants',
      '24/7 Technical breakdown replacement guarantee within 2 hours in all supported cities',
      'Flexible rental plans with zero long-term lock-in and simple refundable security deposit',
      'All devices calibrated with valid ISO & CE safety compliance certificates'
    ],
    whatIsIncluded: [
      {
        title: 'Core ICU & Mobility Devices',
        items: [
          '3-Function and 5-Function Electric Motorized Hospital Beds with Cardiac Chair mode',
          'Medical-grade Anti-Bedsore Alternating Pressure Air Mattresses',
          'BiPAP & Auto-CPAP machines (ResMed, Philips) with humidifier & masks',
          '5L and 10L High-Purity (93%+) Oxygen Concentrators & backup cylinders'
        ]
      },
      {
        title: 'Monitoring & Suction Systems',
        items: [
          'Multi-parameter Patient Monitors (ECG, SpO2, NIBP, Respiration, Temp)',
          'Electric & battery-operated heavy-duty Phlegm Suction Machines',
          'Hydraulic and Electric Patient Transfer Hoists / Lifters'
        ]
      },
      {
        title: 'Mobility & Daily Living Aids',
        items: [
          'Motorized & manual lightweight foldable Wheelchairs',
          'Reclining Commode Chairs with removable pans and safety brakes',
          'Adjustable Over-Bed Dining Tables and IV Drip Stands'
        ]
      }
    ],
    whoIsThisFor: [
      'Families setting up a temporary or long-term Home ICU for an aging parent',
      'Patients discharged from hospital requiring supplemental oxygen or BiPAP therapy',
      'Bedridden elders vulnerable to painful decubitus bedsores',
      'Seniors requiring assistive devices for post-operative recovery or chronic immobility'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Biomedical Consultation',
        description: 'Our clinical engineers review prescription to recommend the exact machine specifications (e.g. EPAP/IPAP pressures, O2 flow rate).'
      },
      {
        step: 2,
        title: 'Hospital-Grade Sterilization & Dispatch',
        description: 'Equipment is sterilized with hospital virucidal agents, packed in sealed protective transit bags, and dispatched.'
      },
      {
        step: 3,
        title: 'On-Site Technical Installation',
        description: 'Trained biomedical technician delivers, sets up equipment, tests electrical grounding, and trains family members.'
      },
      {
        step: 4,
        title: '24/7 Breakdown & Calibration Standby',
        description: 'Bi-monthly scheduled filter changes and instant machine swap if any alert sounds.'
      }
    ],
    pricingTiers: [
      {
        name: 'Essential Mobility Kit',
        price: '₹2,500',
        period: 'per month',
        description: 'Wheelchair + Anti-bedsore Air Mattress + IV Stand + Commode Chair.',
        features: [
          'Foldable lightweight wheelchair',
          'Alternating pressure air mattress',
          'Free doorstep delivery & sanitization',
          'Zero maintenance charges',
          'Refundable security deposit'
        ]
      },
      {
        name: 'Motorized Hospital Bed (3-Func)',
        price: '₹5,500',
        period: 'per month',
        description: 'Electric remote-controlled backrest, knee elevation & height adjustment.',
        recommended: true,
        features: [
          '3-Function electric motorized bed',
          'Collapsible aluminum side safety rails',
          'Medical waterproof high-density mattress',
          'Includes Air Mattress with pump',
          'Free technician assembly'
        ]
      },
      {
        name: 'ICU Respiratory Station',
        price: '₹11,000',
        period: 'per month',
        description: 'ResMed BiPAP + 10L Oxygen Concentrator + Multi-para Monitor.',
        features: [
          'ResMed Lumis/Stellar BiPAP machine',
          '10L Continuous flow O2 concentrator',
          '5-Lead Multi-parameter cardiac monitor',
          'New sealed mask & tubing kit',
          '2-Hour emergency replacement SLA'
        ]
      }
    ],
    faqs: [
      {
        question: 'How quickly can you deliver emergency medical equipment?',
        answer: 'We maintain regional distribution centers in all 12 metro cities. Emergency items like Oxygen Concentrators, Suction Machines, and Hospital Beds are delivered within 2 to 4 hours of confirmation.'
      },
      {
        question: 'Are all masks and consumable accessories brand new?',
        answer: 'Yes! All patient-contact consumables — BiPAP masks, tubing, nasal cannulas, and catheter bags — are 100% brand new, factory-sealed items provided to you.'
      }
    ],
    relatedServiceSlugs: ['home-nursing', 'doctor-home-visits', 'emergency-ambulance-support']
  },
  {
    id: 'srv-8',
    slug: 'lab-tests-at-home',
    title: 'Senior Health Checkups & Lab Tests at Home',
    subtitle: 'Gentle, pain-free blood sample collection with same-day digital reports',
    shortDescription: 'NABL-accredited diagnostic testing at home. Experienced phlebotomists trained in difficult geriatric vein access for routine blood, urine, HbA1c, and portable ECG.',
    category: 'diagnostics-meds',
    categoryName: 'Diagnostics & Equipment',
    iconName: 'FlaskConical',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
    badge: 'NABL & CAP Accredited',
    rating: 4.96,
    reviewCount: 520,
    startingPrice: '₹499',
    priceUnit: 'per package',
    clinicalLead: {
      name: 'Dr. Pallavi Sengupta, MD (Path)',
      role: 'Director of Diagnostic Quality & Pathology',
      qualification: 'MD Pathology, Ex-Head of Diagnostics Apollo Hospitals',
      experience: '19+ Years Pathology Leadership'
    },
    highlights: [
      'Specialized "Butterfly Needle" technique for ultra-gentle, painless geriatric blood draw',
      'Cold-chain temperature-monitored sample transit to premier NABL laboratories',
      'Smart digital reports with historical trend comparisons (e.g. HbA1c trajectory over 12 months)',
      'Free phone consultation with an MD Physician to interpret test results',
      'Automated recurring test reminders for diabetic and thyroid patients'
    ],
    whatIsIncluded: [
      {
        title: 'Comprehensive Geriatric Profiles',
        items: [
          'Complete Hemogram (CBC, ESR) & Peripheral Smear',
          'Comprehensive Diabetic Evaluation (Fasting/PP Glucose, HbA1c, Average Blood Sugar)',
          'Liver Function Test (LFT) & Kidney Function Test (KFT with eGFR calculation)',
          'Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides, Atherogenic Index)'
        ]
      },
      {
        title: 'Cardiac & Bone Health Biomarkers',
        items: [
          'High-Sensitivity C-Reactive Protein (hs-CRP) & Troponin-I on doctor order',
          'Vitamin D (25-OH), Vitamin B12, Calcium & Phosphorus for osteoporosis tracking',
          'Thyroid Profile (Total T3, T4, Ultrasensitive TSH)'
        ]
      },
      {
        title: 'Home Diagnostics & Reporting',
        items: [
          'Portable 12-lead digital ECG with cardiologist tele-reporting in 30 minutes',
          'Urine Routine & Microscopic analysis with culture sensitivity',
          'Health Locker storage and PDF download for instant doctor sharing'
        ]
      }
    ],
    whoIsThisFor: [
      'Elderly individuals with mobility limitations or wheelchair dependency',
      'Seniors requiring monthly monitoring of blood sugar, kidney function, or thyroid levels',
      'Patients taking blood thinners (Warfarin, Acitrom) needing regular PT-INR tests',
      'Families desiring proactive annual preventive health screening for parents'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Easy Slot Booking & Fasting Instructions',
        description: 'Choose your preferred 30-minute early morning slot (6:30 AM to 11:00 AM) and receive automated fasting reminders.'
      },
      {
        step: 2,
        title: 'Hygienic Home Sample Collection',
        description: 'Our certified phlebotomist arrives with sterile vacuum-sealed tubes, barcoded for 100% error-free sample tracking.'
      },
      {
        step: 3,
        title: 'Cold-Chain Lab Processing',
        description: 'Samples are analyzed at our accredited central pathology lab using automated Abbott/Roche analyzers.'
      },
      {
        step: 4,
        title: 'Doctor Tele-Consultation',
        description: 'Receive verified digital report within 6 hours + 15-minute call with an MD Physician to discuss the findings.'
      }
    ],
    pricingTiers: [
      {
        name: 'Senior Vital Routine Pack',
        price: '₹899',
        period: '42 Parameters',
        description: 'Basic quarterly monitoring of sugar, liver, kidney & hemogram.',
        features: [
          'Complete Hemogram (CBC)',
          'Fasting Blood Sugar + HbA1c',
          'Kidney Function (Urea/Creatinine)',
          'Urine Routine & Microscopy',
          'Report delivered within 6 hours'
        ]
      },
      {
        name: 'Senior Comprehensive Gold Profile',
        price: '₹1,999',
        period: '78 Parameters',
        description: 'Our most popular complete annual wellness & organ health screen.',
        recommended: true,
        features: [
          'Full Liver, Kidney & Lipid Profiles',
          'Thyroid Profile (T3, T4, TSH)',
          'Vitamin D & Vitamin B12 Levels',
          'HbA1c + Fasting Blood Sugar',
          'Free MD Doctor Tele-Consultation'
        ]
      },
      {
        name: 'Senior Platinum + Home ECG Screen',
        price: '₹3,499',
        period: '92 Parameters + ECG',
        description: 'Exhaustive full-body screening including 12-lead digital ECG & cardiac risk markers.',
        features: [
          'Everything in Comprehensive Gold',
          'Bedside 12-Lead Digital ECG',
          'High Sensitivity hs-CRP & Electrolytes',
          'Uric Acid, Calcium & Iron Studies',
          '1-on-1 Comprehensive Doctor Review'
        ]
      }
    ],
    faqs: [
      {
        question: 'My mother has very thin and fragile veins. Are your phlebotomists experienced?',
        answer: 'Yes. Our senior phlebotomists specialize exclusively in geriatric and pediatric collections. They use ultra-fine 23G/25G butterfly needles and vein-finder transilluminators to ensure a painless, single-prick experience.'
      },
      {
        question: 'How do I access the reports?',
        answer: 'Reports are delivered via WhatsApp, emailed in high-resolution PDF format, and permanently stored in your Aeterna Digital Health Locker.'
      }
    ],
    relatedServiceSlugs: ['doctor-home-visits', 'home-nursing', 'medical-equipment-rental']
  },
  {
    id: 'srv-9',
    slug: 'emergency-ambulance-support',
    title: '24x7 Emergency Ambulance & Hospitalization Coordination',
    subtitle: 'Lightning-fast BLS/ACLS ambulances and dedicated bedside hospital advocates',
    shortDescription: 'Dedicated 24/7 Emergency Command Center coordinating nearest ACLS cardiac ambulances, on-board paramedic care, hospital bed reservation, and on-site patient admission advocacy.',
    category: 'critical-care',
    categoryName: 'Critical & Clinical Care',
    iconName: 'Siren',
    heroImage: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1400&q=80',
    badge: 'Avg. 15-Min Metro Response',
    rating: 4.99,
    reviewCount: 610,
    startingPrice: 'Included in Plans',
    priceUnit: 'or ₹2,500 on-demand',
    clinicalLead: {
      name: 'Dr. Samarjit Choudhury',
      role: 'Head of Emergency Response & Critical Evacuation',
      qualification: 'MD Emergency Medicine, Fellow European Society of Emergency Care',
      experience: '21+ Years Trauma Care'
    },
    highlights: [
      'Single-touch SOS alert triggering instant live GPS tracking of nearest ACLS ambulance',
      'Advanced Cardiac Life Support (ACLS) fleet equipped with ventilator, defibrillator, and monitor',
      'Pre-arrival hospital ER bed pre-booking & specialist alert to eliminate reception delay',
      'Dedicated Aeterna Care Manager physically arrives at the hospital to manage admission formalities',
      'Real-time live video & vitals transmission from ambulance to ER trauma team'
    ],
    whatIsIncluded: [
      {
        title: 'ACLS Emergency Fleet Specifications',
        items: [
          'High-end transport ventilator & multi-para cardiac monitor with 12-lead capability',
          'Biphasic Defibrillator with pacing capability and portable suction',
          'Full emergency crash cart with emergency cardiac & stroke medications',
          'Certified Emergency Medical Technician (EMT) and trained emergency driver'
        ]
      },
      {
        title: 'Command Center & Hospital Liaison',
        items: [
          '24/7 Emergency Physician triaging call within 20 seconds',
          'Fast-track admission coordination with 120+ accredited network hospitals',
          'Emergency cashless insurance desk coordination support'
        ]
      },
      {
        title: 'Family Support & Emergency Handover',
        items: [
          'Instant automated SMS/WhatsApp alerts sent to all registered emergency family contacts',
          'On-site Care Manager presence to handle paperwork, deposit, and initial doctor updates'
        ]
      }
    ],
    whoIsThisFor: [
      'Elderly parents living independently while adult children reside in another city or abroad',
      'Seniors with high risk of sudden cardiac arrest, acute stroke, or respiratory distress',
      'Post-trauma fall patients with suspected hip fracture requiring immobilized transit',
      'Families desiring guaranteed priority emergency response without dialing random numbers'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'One-Touch SOS Activation',
        description: 'Family or parent presses Emergency SOS button on app, smart wristband, or dials our dedicated 24/7 hotline.'
      },
      {
        step: 2,
        title: 'Instant GPS Dispatch & Paramedic Briefing',
        description: 'Nearest ACLS ambulance dispatched within 90 seconds while ER doctor gives phone guidance for stabilization.'
      },
      {
        step: 3,
        title: 'In-Transit Stabilization & Hospital Alert',
        description: 'EMT stabilizes vitals, administers oxygen, and alerts destination hospital trauma bay.'
      },
      {
        step: 4,
        title: 'Bedside Care Manager Handover',
        description: 'Our on-ground Care Advocate meets the ambulance at ER gates to streamline admission and update family.'
      }
    ],
    pricingTiers: [
      {
        name: 'On-Demand Emergency Transit (BLS)',
        price: '₹2,500',
        period: 'per dispatch (< 15 km)',
        description: 'Basic Life Support ambulance with oxygen, stretcher & trained paramedic.',
        features: [
          'BLS Ambulance with oxygen supply',
          'Certified Paramedic on board',
          'Nearest network hospital transit',
          'Digital vitals log to family'
        ]
      },
      {
        name: 'Advanced Cardiac ACLS Transit',
        price: '₹4,500',
        period: 'per dispatch (< 15 km)',
        description: 'Intensive care mobile unit with transport ventilator & cardiac defibrillator.',
        recommended: true,
        features: [
          'ACLS Ambulance with transport ventilator',
          'Biphasic Defibrillator & cardiac monitor',
          'Senior Emergency Paramedic',
          'Hospital ER pre-alert & bed reservation',
          'On-ground Care Manager assistance'
        ]
      },
      {
        name: 'Annual Emergency Protection Shield',
        price: '₹9,999',
        period: 'per year (Full Coverage)',
        description: 'Unlimited 24x7 emergency response + 2 free ACLS dispatches + Hospital advocacy.',
        features: [
          'Unlimited 24x7 SOS Command Center access',
          '2 Free ACLS Ambulance Dispatches included',
          'Dedicated on-site hospital care advocate',
          'Zero reception waiting at 120+ partner hospitals',
          'Smart SOS pendant provided'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the average response time for an emergency ambulance?',
        answer: 'Across major metro cities (Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Chennai), our average dispatch-to-doorstep arrival time is 14.8 minutes.'
      },
      {
        question: 'Who helps with hospital paperwork if the children live abroad?',
        answer: 'Our on-ground Care Advocate rushes directly to the hospital ER, manages registration, coordinates with insurance, and gives live video updates to family members abroad.'
      }
    ],
    relatedServiceSlugs: ['doctor-home-visits', 'home-nursing', 'medical-equipment-rental']
  },
  {
    id: 'srv-10',
    slug: 'companion-concierge-care',
    title: 'Senior Companionship & Concierge Support',
    subtitle: 'Warm friendship, assisted outings, technology coaching & bank errands',
    shortDescription: 'Educated, empathetic youth companions and retired care executives providing conversation, digital literacy coaching (WhatsApp, Uber), accompanied doctor visits, and social outings.',
    category: 'companionship',
    categoryName: 'Companionship & Concierge',
    iconName: 'Smile',
    heroImage: '/images/indian-daughter-care.jpg',
    badge: 'Enriching Senior Lives',
    rating: 4.98,
    reviewCount: 388,
    startingPrice: '₹650',
    priceUnit: 'per visit',
    clinicalLead: {
      name: 'Ms. Radhika Nair',
      role: 'Director of Active Aging & Social Wellness',
      qualification: 'M.A. Social Work, Certified Geriatric Mental Wellness Coach',
      experience: '12+ Years Senior Engagement'
    },
    highlights: [
      'Empathetic, educated companions matched by common hobbies, language, and interests',
      'Accompanied door-to-door visits to doctors, temples, family weddings, and parks',
      'Patience-driven smartphone coaching (video calling children, online grocery, digital banking)',
      'Assistance with government paperwork: Digital Life Certificate, pension, and passport renewals',
      'Engaging conversations, chess, classical music listening, and memory-sharing walks'
    ],
    whatIsIncluded: [
      {
        title: 'Assisted Outings & Errands',
        items: [
          'Door-to-door accompanied hospital appointments and pharmacy pickups',
          'Assisted visits to bank branches, post office, and government administrative desks',
          'Outings to places of worship, cultural centers, botanical gardens, and shopping'
        ]
      },
      {
        title: 'Digital Empowerment & Technology',
        items: [
          'Teaching parents to confidently use Zoom, FaceTime, WhatsApp video calls',
          'Setting up digital payments (UPI) with safety fraud-prevention guardrails',
          'Configuring smart speakers (Alexa, Google Home) for audiobooks, bhajans, and news'
        ]
      },
      {
        title: 'Social & Emotional Wellbeing',
        items: [
          'Weekly leisure visits: board games, gardening, reading books & newspapers aloud',
          'Assistance writing family memoirs and digitizing old photo albums',
          'Regular wellness check-in calls for parents living alone'
        ]
      }
    ],
    whoIsThisFor: [
      'Mentally sharp elders feeling lonely or isolated after children relocated abroad',
      'Parents who hesitate to travel alone for routine hospital or banking visits',
      'Seniors eager to learn modern smartphones, apps, and video calling tools',
      'Families desiring thoughtful, dignified social engagement for aging loved ones'
    ],
    clinicalProtocol: [
      {
        step: 1,
        title: 'Personality & Interest Matching',
        description: 'We understand your parent’s life background, career history, mother tongue, and personal hobbies.'
      },
      {
        step: 2,
        title: 'Companion Introduction & Chemistry Call',
        description: 'We arrange an introductory tea visit or video call to ensure mutual warmth and comfort.'
      },
      {
        step: 3,
        title: 'Scheduled Visits & Outing Calendar',
        description: 'Set regular 2-hour or 4-hour visits per week with planned activity agendas.'
      },
      {
        step: 4,
        title: 'Post-Visit Photo & Joy Update to Family',
        description: 'Care companion uploads a summary note and joyful photo to the family mobile app after every session.'
      }
    ],
    pricingTiers: [
      {
        name: 'Single Outing / Errand Visit',
        price: '₹750',
        period: 'per visit (up to 3 hrs)',
        description: 'Accompanied doctor appointment, bank visit, or social outing.',
        features: [
          'Door-to-door accompanied transit',
          'Assistance with queues & paperwork',
          'Live location sharing with children',
          'Post-visit briefing to family'
        ]
      },
      {
        name: 'Active Mind Monthly Friendship (8 Visits)',
        price: '₹4,800',
        period: '8 Visits / month (Save 20%)',
        description: 'Twice-a-week visits for deep companionship, tech training & hobbies.',
        recommended: true,
        features: [
          '8 Scheduled 2-hour companion visits',
          'Smartphone & digital app coaching',
          'Assisted park walks & memory exercises',
          'Digital Life Certificate assistance',
          'Weekly happiness log on Family App'
        ]
      }
    ],
    faqs: [
      {
        question: 'Who are your companionship executives?',
        answer: 'Our companions are background-verified postgraduate students, social work professionals, and retired educators who possess high emotional intelligence, patience, and a genuine love for engaging with elders.'
      },
      {
        question: 'Can the companion travel in an Uber or private cab with my parent?',
        answer: 'Yes! The companion travels alongside your parent, ensures seatbelt safety, assists with walking at the destination, holds umbrellas, and never leaves their side until safely back home.'
      }
    ],
    relatedServiceSlugs: ['24x7-caregiver-attendant', 'doctor-home-visits', 'dementia-alzheimers-care']
  }
];
