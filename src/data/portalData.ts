import { PortalVitalRecord, PortalVisit, PortalDocument } from '@/types';

export const mockParentProfile = {
  name: 'Col. K.L. Malhotra (Retd.)',
  age: 81,
  city: 'Gurgaon, DLF Phase 5',
  bloodGroup: 'O+ Positive',
  currentPlan: 'Platinum Comprehensive',
  planRenewalDate: '15 Dec 2026',
  primaryConditions: ['Hypertension', 'Type-2 Diabetes', 'Post-TKR Knee Recovery'],
  allergies: ['Penicillin', 'Sulfa drugs'],
  assignedCareManager: {
    name: 'Sister Ananya Varghese, RN',
    phone: '+91 98101 44882',
    photo: 'https://images.unsplash.com/photo-1594824813590-78174548842d?auto=format&fit=crop&w=300&q=80'
  },
  activeCaregiver: {
    name: 'Prakash Chandra',
    role: 'Trained Geriatric Attendant (24-Hr Live-in)',
    status: 'Checked-in (On Duty)',
    rating: 4.98,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  }
};

export const mockPortalVitals: PortalVitalRecord[] = [
  {
    date: 'Today, 8:30 AM',
    bp: '124 / 82 mmHg',
    sugar: '118 mg/dL (Fasting)',
    pulse: 74,
    spo2: 98,
    temperature: '98.4 °F',
    status: 'optimal',
    notes: 'Morning vitals optimal. Morning antihypertensive Telmisartan 40mg administered after oats breakfast.'
  },
  {
    date: 'Yesterday, 8:00 PM',
    bp: '128 / 84 mmHg',
    sugar: '142 mg/dL (Post-prandial)',
    pulse: 76,
    spo2: 98,
    temperature: '98.6 °F',
    status: 'normal',
    notes: 'Evening walk completed (1,800 steps in condo garden). Assisted knee mobility exercises done.'
  },
  {
    date: 'Yesterday, 8:15 AM',
    bp: '130 / 86 mmHg',
    sugar: '122 mg/dL (Fasting)',
    pulse: 72,
    spo2: 97,
    temperature: '98.2 °F',
    status: 'normal',
    notes: 'Comfortable night sleep (7.5 hrs). Sponge bath and fresh dressing to left knee.'
  },
  {
    date: '3 Days Ago, 8:30 AM',
    bp: '136 / 88 mmHg',
    sugar: '128 mg/dL (Fasting)',
    pulse: 78,
    spo2: 97,
    temperature: '98.5 °F',
    status: 'attention',
    notes: 'Mild BP elevation noted. Dr. Kulkarni consulted via tele-review; sodium intake restricted.'
  }
];

export const mockPortalVisits: PortalVisit[] = [
  {
    id: 'vis-1',
    date: 'Tomorrow, 10:30 AM',
    time: '10:30 AM – 11:30 AM',
    providerName: 'Dr. Vivek Swaminathan, MPT',
    role: 'Senior Neuro-Physiotherapist',
    type: 'Physio Session',
    status: 'Upcoming',
    notes: 'Session #8: Quadriceps strengthening & stairs balance calibration'
  },
  {
    id: 'vis-2',
    date: 'Saturday, 9:00 AM',
    time: '9:00 AM – 9:45 AM',
    providerName: 'Dr. Rajeshwar Kulkarni, MD',
    role: 'Chief Geriatrician',
    type: 'Doctor Visit',
    status: 'Upcoming',
    notes: 'Quarterly comprehensive physical examination & 12-lead ECG review'
  },
  {
    id: 'vis-3',
    date: '10 Aug 2026',
    time: '7:30 AM',
    providerName: 'Sunil Phlebotomist, NABL',
    role: 'Senior Diagnostic Phlebotomist',
    type: 'Lab Sample Collection',
    status: 'Completed',
    notes: 'Quarterly HbA1c, KFT & Lipid profiles collected. Reports uploaded to Health Locker.'
  }
];

export const mockPortalDocuments: PortalDocument[] = [
  {
    id: 'doc-1',
    title: 'Quarterly Comprehensive Blood Diagnostic Report (NABL)',
    type: 'Lab Report',
    date: '10 Aug 2026',
    doctorName: 'Dr. Pallavi Sengupta, MD (Path)',
    fileSize: '1.8 MB PDF'
  },
  {
    id: 'doc-2',
    title: 'Post-TKR Orthopedic Rehabilitation Progress Chart',
    type: 'Care Plan',
    date: '02 Aug 2026',
    doctorName: 'Dr. Vivek Swaminathan, MPT',
    fileSize: '840 KB PDF'
  },
  {
    id: 'doc-3',
    title: 'Prescription & Drug Reconciliation Summary',
    type: 'Prescription',
    date: '18 Jul 2026',
    doctorName: 'Dr. Rajeshwar Kulkarni, MD',
    fileSize: '420 KB PDF'
  },
  {
    id: 'doc-4',
    title: 'Fortis Hospital Discharge Summary — Left TKR',
    type: 'Discharge Summary',
    date: '12 Jun 2026',
    doctorName: 'Dr. H.S. Chhabra, MS',
    fileSize: '3.4 MB PDF'
  }
];
