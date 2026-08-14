import { CarePlan, PlanFeatureGroup } from '@/types';

export const carePlansData: CarePlan[] = [
  {
    id: 'plan-silver',
    slug: 'silver-assist',
    name: 'Silver Assist',
    tagline: 'Essential safety, emergency coordination & digital health records for independent seniors',
    badge: 'Starter Protection',
    priceMonthly: 2999,
    priceAnnual: 28790,
    annualSavings: 7198,
    description: 'Perfect for relatively independent elderly parents who need an emergency safety net, routine check-in calls, and digital health records management.',
    idealFor: 'Independent seniors aged 60-72 without major chronic ailments needing reliable emergency security.',
    doctorVisitsPerYear: 2,
    nursingHoursPerMonth: 'On-demand (15% discount)',
    emergencyResponseTime: '< 20 Mins',
    ambulanceCover: '1 Free BLS Dispatch / Year',
    teleconsults: '4 Doctor Tele-consults / Year',
    healthLockerAccess: true,
    dedicatedCareManager: false,
    dailyVitalsTracking: false,
    keyDeliverables: [
      '24x7 Emergency SOS Command Center access',
      '1 Free Emergency BLS Ambulance dispatch / year',
      '2 Planned MD Physician Home Checkups / year',
      '4 Doctor Tele-consultations / year',
      'Comprehensive Digital Health Locker with 10-year cloud storage',
      'Bi-weekly wellness check-in phone calls by clinical nurse'
    ],
    fullFeatures: [
      '24/7 Rapid Emergency Response Desk',
      '1 Free Emergency BLS Ambulance dispatch per annum',
      '2 Comprehensive Physician home visits with portable ECG',
      '4 Specialist Telemedicine consultations',
      'Annual Basic Blood Health Checkup (42 parameters)',
      'Digital Health Locker with OCR medical report transcription',
      '15% Flat Member Discount on home nursing, caregivers & equipment rentals',
      'Bi-weekly nurse wellness check-in calls'
    ],
    limitations: [
      'Dedicated private Care Manager not included (Shared pool)',
      'Daily vitals monitoring not included'
    ]
  },
  {
    id: 'plan-gold',
    slug: 'gold-essential',
    name: 'Gold Essential',
    tagline: 'Active clinical monitoring, quarterly doctor visits & guaranteed emergency ambulance shield',
    badge: 'Popular Choice',
    popular: true,
    priceMonthly: 6499,
    priceAnnual: 62390,
    annualSavings: 15598,
    description: 'Comprehensive proactive healthcare for seniors with lifestyle conditions like hypertension, diabetes, or mild arthritis.',
    idealFor: 'Parents aged 68-80 managing 1-2 chronic conditions whose children live out of city or overseas.',
    doctorVisitsPerYear: 4,
    nursingHoursPerMonth: '4 Hours Included / Month',
    emergencyResponseTime: '< 15 Mins',
    ambulanceCover: '2 Free ACLS Dispatches / Year',
    teleconsults: 'Unlimited 24x7 Doctor Calls',
    healthLockerAccess: true,
    dedicatedCareManager: true,
    dailyVitalsTracking: true,
    keyDeliverables: [
      'Dedicated Geriatric Care Manager assigned to family',
      '2 Free ACLS Cardiac Ambulance dispatches per year',
      '4 Planned MD Physician Home Checkups per year',
      'Unlimited 24x7 Tele-consultations with Senior Doctors',
      'Weekly vitals tracking with automated abnormality alerts',
      'Annual Comprehensive Master Health Checkup (78 parameters)'
    ],
    fullFeatures: [
      'All Silver Assist features included',
      'Named Dedicated Care Manager with direct WhatsApp hotline',
      '2 Free Advanced Cardiac ACLS Ambulance dispatches',
      '4 Quarterly MD Physician Home Visits with ECG & medicine audit',
      'Unlimited 24x7 Emergency Telemedicine calls',
      '4 Hours of complimentary Clinical Nursing or Caregiver per month',
      'Weekly home vitals logging & smart analytics chart',
      'Annual Comprehensive Master Blood Screen (78 parameters for 2 elders)',
      'Hospitalization Bedside Care Advocate (First 24 hours covered)',
      '20% Member Discount across all medical equipment and physiotherapy'
    ],
    limitations: [
      'Physical hospital companion limited to 24 hours per episode',
      'Daily live-in attendant billed separately'
    ]
  },
  {
    id: 'plan-platinum',
    slug: 'platinum-comprehensive',
    name: 'Platinum Comprehensive',
    tagline: 'Complete 360° clinical ecosystem with weekly nursing, physio & on-ground hospital care advocate',
    badge: 'Clinical Excellence',
    priceMonthly: 12999,
    priceAnnual: 124790,
    annualSavings: 31198,
    description: 'The premier choice for elderly parents recovering from major health events, managing Parkinson’s, stroke recovery, or severe mobility challenges.',
    idealFor: 'High-dependency seniors aged 75+ requiring intensive medical supervision and family peace of mind.',
    doctorVisitsPerYear: 8,
    nursingHoursPerMonth: '16 Hours Included / Month',
    emergencyResponseTime: '< 12 Mins',
    ambulanceCover: 'Unlimited Free ACLS Dispatches',
    teleconsults: 'Unlimited 24x7 Priority Tele-consults',
    healthLockerAccess: true,
    dedicatedCareManager: true,
    dailyVitalsTracking: true,
    keyDeliverables: [
      'Senior Clinical Officer + Dedicated Care Manager Duo',
      'Unlimited Free ACLS Cardiac Emergency Dispatches',
      '8 Planned Specialist & MD Physician Home Visits / year',
      '16 Hours of Clinical Nursing or Attendant support / month',
      '4 Physiotherapy / Neuro-Rehab sessions / month',
      'End-to-End Hospital Admission, In-Ward Advocacy & Discharge Management'
    ],
    fullFeatures: [
      'All Gold Essential features included',
      'Unlimited Free ACLS Cardiac Ambulance Dispatches with zero cap',
      '8 MD Physician & Geriatrician Home Visits per year',
      '16 Hours of certified B.Sc. Clinical Nursing per month included',
      '4 Geriatric Physiotherapy sessions per month included',
      'Daily biometric vitals tracking with clinical trend analysis',
      'Bi-annual Full Body Diagnostics (92 parameters with Vitamin & Cardiac screen)',
      'Dedicated Hospital Care Advocate physically present during entire hospitalization',
      'Medicine refill auto-delivery with 20% discount directly to doorstep',
      'Priority standby caregiver replacement within 2 hours'
    ],
    limitations: [
      '24-hr live-in attendant charges billed with 25% exclusive platinum discount'
    ]
  },
  {
    id: 'plan-diamond',
    slug: 'diamond-concierge',
    name: 'Diamond Concierge Suite',
    tagline: 'Private geriatrician, continuous home ICU telemetry, and personalized luxury senior concierge',
    badge: 'Bespoke Luxury',
    priceMonthly: 24999,
    priceAnnual: 239990,
    annualSavings: 59998,
    description: 'An uncompromising, ultra-high-touch personal healthcare concierge for discerning families demanding hospital-grade safety and royal care for their parents.',
    idealFor: 'Families seeking a complete private healthcare team, VIP hospital admissions, and bespoke concierge life support.',
    doctorVisitsPerYear: 12,
    nursingHoursPerMonth: '36 Hours Included / Month',
    emergencyResponseTime: '< 10 Mins (Priority Fleet)',
    ambulanceCover: 'Unlimited VIP ACLS Fleet with Doctor On-Board',
    teleconsults: 'Direct Personal Mobile Access to Chief Medical Officer',
    healthLockerAccess: true,
    dedicatedCareManager: true,
    dailyVitalsTracking: true,
    keyDeliverables: [
      'Chief Medical Officer assigned as Personal Family Physician',
      'Continuous Connected IoT Vitals Telemetry Kit installed at home',
      '12 Monthly Comprehensive MD Physician & Super-Specialist Home Visits',
      '36 Hours of Clinical Nursing or Caregiver support / month',
      'Unlimited Assisted Luxury Transportation & Companionship Outings',
      'VIP Green-Channel Hospital Suite Access across all top tier hospital chains'
    ],
    fullFeatures: [
      'All Platinum Comprehensive features included',
      'Continuous IoT Connected Remote Patient Monitoring Station (BP, O2, ECG, Sugar)',
      '12 Scheduled Monthly Physician & Specialist Bedside Visits',
      '36 Hours of certified Nursing or Caregiver support per month',
      '8 Geriatric Physiotherapy / Rehab sessions per month included',
      'Quarterly NABL Platinum Diagnostic Full Body Profiles (Family of 2)',
      'Accompanied chauffeur-driven medical and social outings (4 visits / month)',
      'VIP Green-Channel priority ER and room admissions with Chief Medical Officer coordination',
      'Comprehensive Home Ergonomics & Fall-Proofing Renovation Audit',
      'Direct WhatsApp access to Aeterna Care Founder & Chief Medical Officer'
    ],
    limitations: [
      'Limited to 50 families per city to maintain zero-compromise ultra-luxury service'
    ]
  }
];

export const planFeatureGroups: PlanFeatureGroup[] = [
  {
    category: 'Emergency & Acute Care',
    features: [
      {
        name: '24x7 Emergency SOS Command Center',
        silver: true,
        gold: true,
        platinum: true,
        diamond: true,
        tooltip: 'Immediate response in under 20 seconds by trained clinical coordinators'
      },
      {
        name: 'Emergency Response SLA (Doorstep Arrival)',
        silver: '< 20 Mins',
        gold: '< 15 Mins',
        platinum: '< 12 Mins',
        diamond: '< 10 Mins (Priority Fleet)',
        tooltip: 'Average verified arrival time across metro zones'
      },
      {
        name: 'Free Emergency Ambulance Dispatches',
        silver: '1 BLS / Year',
        gold: '2 ACLS / Year',
        platinum: 'Unlimited ACLS',
        diamond: 'Unlimited ACLS + Doctor On-Board',
        tooltip: 'Advanced Cardiac Life Support fleet with ventilator & defibrillator'
      },
      {
        name: 'Hospital Admission & ER Bedside Advocate',
        silver: 'Emergency Assist',
        gold: 'First 24 Hours',
        platinum: 'Full Stay Covered',
        diamond: 'VIP Suite Priority + Full Stay',
        tooltip: 'Aeterna care advocate arrives physically at hospital to handle admissions'
      }
    ]
  },
  {
    category: 'Clinical Consultations & Home Visits',
    features: [
      {
        name: 'MD Physician Home Bedside Checkups',
        silver: '2 Visits / Year',
        gold: '4 Visits / Year',
        platinum: '8 Visits / Year',
        diamond: '12 Visits / Year (Monthly)',
        tooltip: '45-minute comprehensive examination with 12-lead digital ECG'
      },
      {
        name: '24x7 Doctor Telemedicine Access',
        silver: '4 Calls / Year',
        gold: 'Unlimited 24x7',
        platinum: 'Unlimited Priority',
        diamond: 'Direct CMO Access',
        tooltip: 'Instant video or voice consultation with registered doctors'
      },
      {
        name: 'Complimentary Monthly Nursing / Attendant Hours',
        silver: 'On-Demand (15% off)',
        gold: '4 Hours / Month',
        platinum: '16 Hours / Month',
        diamond: '36 Hours / Month',
        tooltip: 'Can be used for procedures, injections, dressings, or attendant cover'
      },
      {
        name: 'Geriatric Physiotherapy & Rehab Sessions',
        silver: '15% Member Discount',
        gold: '20% Member Discount',
        platinum: '4 Sessions / Month',
        diamond: '8 Sessions / Month',
        tooltip: 'Hands-on rehabilitation with electrotherapy and balance training'
      }
    ]
  },
  {
    category: 'Preventive Health, Diagnostics & Tech',
    features: [
      {
        name: 'Annual NABL Master Blood Screen',
        silver: '42 Parameters',
        gold: '78 Parameters',
        platinum: '92 Parameters (Bi-Annual)',
        diamond: 'Full Suite Quarterly',
        tooltip: 'Home sample collection with same-day digital reports'
      },
      {
        name: 'Dedicated Personal Care Manager',
        silver: 'Shared Care Pool',
        gold: 'Named Care Manager',
        platinum: 'Clinical Officer + Manager',
        diamond: 'Chief Medical Officer + Concierge',
        tooltip: 'Single point of contact for family coordination and weekly calls'
      },
      {
        name: 'Health Vitals Monitoring Frequency',
        silver: 'Bi-Weekly Calls',
        gold: 'Weekly In-Home Check',
        platinum: 'Daily Digital Log',
        diamond: 'Continuous IoT Telemetry',
        tooltip: 'Blood pressure, glucose, oxygen, pulse, and temperature trends'
      },
      {
        name: 'Aeterna Digital Health Locker & OCR Record Sync',
        silver: true,
        gold: true,
        platinum: true,
        diamond: true,
        tooltip: 'All historical hospital summaries, lab tests, and prescriptions digitized'
      }
    ]
  },
  {
    category: 'Concierge, Social & Active Living',
    features: [
      {
        name: 'Accompanied Outings & Social Concierge',
        silver: 'On-Demand (15% off)',
        gold: '1 Visit / Month',
        platinum: '2 Visits / Month',
        diamond: '4 Chauffeur Outings / Month',
        tooltip: 'Accompanied visits for temple, bank, wedding, or park walks'
      },
      {
        name: 'Medicine Refill & Doorstep Delivery',
        silver: '10% Discount',
        gold: '15% Discount',
        platinum: '20% Discount + Auto-Refill',
        diamond: '20% Discount + Concierge Delivery',
        tooltip: 'Scheduled monthly refills so parents never run out of critical pills'
      },
      {
        name: 'Home Safety & Fall-Proofing Audit',
        silver: 'Digital Checklist',
        gold: 'Annual Inspection',
        platinum: 'Bi-Annual Inspection',
        diamond: 'Complete Safety Kit & Setup',
        tooltip: 'Clinical assessment of bathroom grab bars, anti-skid mats, lighting'
      }
    ]
  }
];
