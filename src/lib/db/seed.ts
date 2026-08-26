import {
  User,
  Franchise,
  Location,
  Project,
  InventoryUnit,
  Referrer,
  DocumentRecord,
  SystemSettings,
  Booking,
  PaymentPlan,
  PaymentInstallment,
  PaymentRecord,
  PaymentReceipt,
  BuyerDocument
} from './schema';
import crypto from 'crypto';

function hashPassword(password: string): string {
  // Stable HMAC-SHA256 hash for seed users
  return crypto.createHmac('sha256', 'slcf-salt-2026').update(password).digest('hex');
}

export const SEED_USERS: User[] = [
  {
    id: 'USR-001',
    email: 'admin@seniorliving.org',
    name: 'Super Administrator',
    phone: '+91 99999 55847',
    passwordHash: hashPassword('Foundation@2026'),
    role: 'SUPER_ADMIN',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'USR-002',
    email: 'owner@seniorliving.org',
    name: 'Foundation Document Officer',
    phone: '+91 99999 55847',
    passwordHash: hashPassword('Foundation@2026'),
    role: 'OWNER',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'USR-003',
    email: 'goa.franchise@seniorliving.org',
    name: 'Goa Regional Director',
    phone: '+91 98221 44556',
    passwordHash: hashPassword('Foundation@2026'),
    role: 'FRANCHISE_ADMIN',
    franchiseId: 'FRAN-GOA-01',
    locationId: 'LOC-GOA',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'USR-004',
    email: 'sales@seniorliving.org',
    name: 'Senior Care Relationship Manager',
    phone: '+91 99999 55847',
    passwordHash: hashPassword('Foundation@2026'),
    role: 'SALES_AGENT',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'USR-005',
    email: 'partner@seniorliving.org',
    name: 'Ramesh Sharma (Senior Community Advocate)',
    phone: '+91 98101 23456',
    passwordHash: hashPassword('Foundation@2026'),
    role: 'REFERRAL_PARTNER',
    referralCode: 'SLF8K2',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

export const SEED_FRANCHISES: Franchise[] = [
  {
    id: 'FRAN-HQ',
    name: 'Senior Living Citizens Foundation Headquarters',
    code: 'HQ-DELHI-NCR',
    contactPerson: 'Director of Operations',
    email: 'admin@seniorliving.org',
    phone: '+91 99999 55847',
    city: 'Gurugram',
    state: 'Haryana',
    isActive: true,
    commissionPercentage: 0,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'FRAN-GOA-01',
    name: 'Goa Coastal Serene Living LLP',
    code: 'FRAN-GOA',
    contactPerson: 'Goa Regional Partner',
    email: 'goa.franchise@seniorliving.org',
    phone: '+91 98221 44556',
    city: 'Candolim / Porvorim',
    state: 'Goa',
    isActive: true,
    commissionPercentage: 2.0,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

export const SEED_LOCATIONS: Location[] = [
  {
    id: 'LOC-HARYANA',
    slug: 'haryana',
    name: 'Haryana (Delhi NCR)',
    state: 'Haryana',
    city: 'Jhajjar / Near Reliance MET City',
    tagline: 'Master-Plotted Sanctuary with Proposed 30k Sq. Ft. Ayurvedic Hospital',
    description: 'A 64-plot planned township featuring G+2 elder residences, community mandir, wide landscaped avenues, and rapid connectivity to Gurgaon via SH-22 and KMP Expressway.',
    heroImage: '/project-assets/real/drone-aerial.jpg',
    featuredProjectCount: 1,
    isPublished: true,
    displayOrder: 1,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'LOC-GOA',
    slug: 'goa',
    name: 'Goa (Coastal Haven)',
    state: 'Goa',
    city: 'North Goa / Candolim Foothills',
    tagline: 'Ready-to-Move Serene Elder Sanctuary Surrounded by Palm Groves',
    description: 'An operational, peaceful coastal elder sanctuary offering fully serviced 1 BHK and 2 BHK residences, daily wellness routines, on-call doctor care, and home-cooked nutritious dining.',
    heroImage: '/project-assets/real/site-boundary.jpg',
    featuredProjectCount: 1,
    isPublished: true,
    displayOrder: 2,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'LOC-DEHRADUN',
    slug: 'dehradun',
    name: 'Dehradun (Himalayan Foothills)',
    state: 'Uttarakhand',
    city: 'Doon Valley',
    tagline: 'Upcoming Hillside Wellness Community with Pure Mountain Air',
    description: 'Planned serene living sanctuary nestled in the sal forests of Doon Valley with specialized geriatric wellness and organic farming.',
    heroImage: '/project-assets/real/drone-aerial.jpg',
    featuredProjectCount: 0,
    isPublished: false,
    displayOrder: 3,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

export const SEED_PROJECTS: Project[] = [
  {
    id: 'PRJ-HARYANA-01',
    slug: 'kheri-asra',
    locationId: 'LOC-HARYANA',
    franchiseId: 'FRAN-HQ',
    name: 'Kheri Asra Senior Plotted Sanctuary',
    tagline: 'Plotted Living with Integrated Ayurvedic Care',
    headline: 'A Better Place for the People Who Raised You.',
    subheadline: 'An upcoming 64-plot plotted master township with G+2 senior residences and a planned 30,000 sq. ft. Ayurvedic hospital on SH-22 near Reliance MET City, Jhajjar.',
    status: 'PRE_LAUNCH',
    projectType: 'PRE_LAUNCH_PLOTTED',
    address: 'Near Reliance MET City, SH-22, Kheri Asra, Jhajjar',
    city: 'Jhajjar / Delhi NCR',
    state: 'Haryana',
    pincode: '124104',
    coordinates: { lat: 28.5842, lng: 76.7123 },
    totalArea: '15.5 Acres',
    totalPlots: 64,
    totalResidences: 9,
    hospitalAreaSqFt: 30000,
    hospitalStatus: 'PROPOSED',
    heroMedia: {
      type: 'DRONE',
      url: '/project-assets/real/drone-aerial.jpg',
      thumbnailUrl: '/project-assets/real/drone-aerial.jpg',
      youtubeId: 'jiEwQ6RA2HI'
    },
    overview: {
      story: 'The Senior Living Citizens Foundation was conceived with one question: where do India\'s seniors go when the city becomes too fast, too loud, and too far from the doctor? Built on freehold registered land near Reliance MET City, Kheri Asra brings together 64 residential plots, 9 boutique G+2 residences, and an integrated Ayurvedic healing hospital.',
      features: [
        { title: 'Freehold Clear Title', desc: '100% direct registry and mutation ownership (never leasehold)', icon: 'ShieldCheck', status: 'VERIFIED' },
        { title: '30k Sq. Ft. Hospital', desc: 'Proposed multi-speciality Ayurvedic & Panchakarma medical center on-site', icon: 'HeartPulse', status: 'PROPOSED' },
        { title: 'Community Mandir', desc: 'Sacred spiritual pavilion within a gentle 5-minute garden walk', icon: 'Sparkles', status: 'PROPOSED' },
        { title: 'Zero-Barrier Design', desc: 'Continuous ramps, 32mm grab rails, and emergency SOS buttons throughout', icon: 'Accessibility', status: 'APPROVED' }
      ],
      amenities: [
        { name: '24/7 On-Site Nurse Desk & Emergency SOS', category: 'Healthcare', icon: 'Activity', status: 'PROPOSED' },
        { name: 'Shaded Senior Walking Trails & Reflexology Path', category: 'Wellness', icon: 'Footprints', status: 'PLANNED' },
        { name: 'Pure Sattvic Dining & Organic Kitchen Garden', category: 'Dining', icon: 'Utensils', status: 'PLANNED' },
        { name: 'Community Library, Bhajan Hall & Activity Center', category: 'Community', icon: 'BookOpen', status: 'PROPOSED' }
      ],
      healthcare: [
        { name: 'On-Call Geriatric Consultation', desc: 'Regular vital checks, chronic disease management, and medication schedules.', status: 'PLANNED' },
        { name: 'Authentic Panchakarma Therapy', desc: 'Detoxification, joint relief, and rejuvenation therapies overseen by Ayurvedic doctors.', status: 'PROPOSED' },
        { name: 'Emergency Cardiac Ambulance Tie-Up', desc: 'Fast-response oxygen-fitted transport to tertiary care hospitals in Gurugram.', status: 'PLANNED' }
      ]
    },
    pricing: {
      basePriceDisplay: '₹25 Lakh Upfront (Down Payment Plan)',
      downPaymentAmount: '₹25,00,000',
      prePossessionReturn: '₹25,000 / month (12% annualized yield)',
      postPossessionReturn: '₹12,500 / month (6% net yield)',
      leaseGuaranteeMonths: 12,
      buybackGuaranteed: true,
      pricingNote: 'Guaranteed 1-Year Foundation lease agreement with 100% buyback safety net.'
    },
    isPublished: true,
    enable3D: true,
    enableCAD: true,
    displayOrder: 1,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'PRJ-GOA-01',
    slug: 'goa-residence',
    locationId: 'LOC-GOA',
    franchiseId: 'FRAN-GOA-01',
    name: 'Goa Coastal Serene Living',
    tagline: 'Ready-to-Move Boutique Coastal Sanctuary',
    headline: 'A Peaceful Coastal Haven with Daily Healthcare & Warm Community.',
    subheadline: 'An operational senior retreat nestled in the peaceful green foothills of North Goa. Offering immediate possession, fully furnished suites, and 24/7 care.',
    status: 'READY_TO_MOVE',
    projectType: 'READY_TO_MOVE_RESIDENTIAL',
    address: 'Near Candolim Foothills, North Goa',
    city: 'North Goa',
    state: 'Goa',
    pincode: '403515',
    coordinates: { lat: 15.518, lng: 73.774 },
    totalArea: '3.2 Acres',
    totalResidences: 24,
    heroMedia: {
      type: 'IMAGE',
      url: '/project-assets/real/site-boundary.jpg',
      thumbnailUrl: '/project-assets/real/site-boundary.jpg'
    },
    overview: {
      story: 'Experience peaceful coastal living surrounded by swaying palms and clean sea breezes. Our Goa sanctuary offers independent living suites with round-the-clock nursing assistance, nutritious coastal dining, and active daily community gatherings.',
      features: [
        { title: 'Immediate Move-In', desc: 'Fully furnished, senior-equipped suites ready for occupancy today', icon: 'CheckCircle2', status: 'EXISTS' },
        { title: '24/7 Nursing Desk', desc: 'Licensed caregivers and emergency response in every room', icon: 'HeartPulse', status: 'EXISTS' },
        { title: 'All-Inclusive Dining', desc: 'Fresh home-style vegetarian & balanced meals prepared daily', icon: 'Utensils', status: 'EXISTS' },
        { title: 'Lush Tropical Gardens', desc: 'Barrier-free paved walking paths under shady coconut groves', icon: 'Trees', status: 'EXISTS' }
      ],
      amenities: [
        { name: 'Daily Morning Yoga & Pranayama Sessions', category: 'Wellness', icon: 'Sun', status: 'EXISTS' },
        { name: 'Reading Lounge & Indoor Board Games', category: 'Community', icon: 'Coffee', status: 'EXISTS' },
        { name: 'Bi-Weekly Beach & Temple Excursions', category: 'Lifestyle', icon: 'Compass', status: 'EXISTS' },
        { name: 'Dedicated Physiotherapy Room', category: 'Healthcare', icon: 'Activity', status: 'EXISTS' }
      ],
      healthcare: [
        { name: 'Daily Vital & Blood Sugar Monitoring', desc: 'Continuous healthcare tracking with digital record sharing for family.', status: 'EXISTS' },
        { name: 'Tie-up with Manipal Hospital Goa', desc: 'Priority admission and 15-minute ambulance response protocol.', status: 'EXISTS' }
      ]
    },
    pricing: {
      basePriceDisplay: 'From ₹45,000 / month (Full Board Living)',
      downPaymentAmount: '₹5,00,000 (Refundable Security Deposit)',
      pricingNote: 'Includes private suite, all meals, housekeeping, laundry, and daily nursing care.'
    },
    isPublished: true,
    enable3D: false,
    enableCAD: false,
    displayOrder: 2,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

// Helper to generate 64 plots for Haryana project
export function generateSeedInventory(): InventoryUnit[] {
  const units: InventoryUnit[] = [];

  // 1. 64 Plots in Haryana Project
  const blocks = [
    { block: 'A', count: 12, startNum: 1, area: 150, price: 2700000, facing: 'North' as const },
    { block: 'B', count: 10, startNum: 13, area: 135, price: 2430000, facing: 'East' as const },
    { block: 'C', count: 10, startNum: 23, area: 120, price: 2160000, facing: 'North-East' as const },
    { block: 'D', count: 10, startNum: 33, area: 160, price: 2880000, facing: 'South-East' as const },
    { block: 'E', count: 10, startNum: 43, area: 180, price: 3240000, facing: 'West' as const },
    { block: 'F', count: 12, startNum: 53, area: 200, price: 3600000, facing: 'North' as const }
  ];

  for (const b of blocks) {
    for (let i = 0; i < b.count; i++) {
      const num = b.startNum + i;
      const id = `PLOT-${b.block}-${String(num).padStart(2, '0')}`;
      // Set some units to hold/reserved/sold for realistic CRM state
      let status: InventoryUnit['status'] = 'AVAILABLE';
      if (num === 4 || num === 15 || num === 34) status = 'HOLD';
      if (num === 8 || num === 26 || num === 45) status = 'RESERVED';
      if (num === 12 || num === 63 || num === 64) status = 'SOLD';

      units.push({
        id,
        projectId: 'PRJ-HARYANA-01',
        unitCode: id,
        block: b.block,
        unitNumber: num,
        type: 'PLOT',
        areaSqYd: b.area,
        areaSqFt: b.area * 9,
        floorLevel: 'plot',
        facing: b.facing,
        price: b.price,
        priceDisplay: `₹${(b.price / 100000).toFixed(2)} Lakh`,
        status,
        features: [
          'Direct Freehold Land Registry',
          '30 Ft. Wide Paved Avenue',
          'Underground Water & Power Lines',
          'Senior Green Landscaping Zone'
        ],
        updatedAt: '2026-01-01T00:00:00Z'
      });
    }
  }

  // 2. 9 Senior Residences in Haryana G+2 Building
  const residenceConfigs = [
    { code: 'UNIT-G-01', floor: 'ground' as const, type: 'STUDIO_SUITE' as const, num: 101, area: 360, carpet: 290, price: 2500000, status: 'AVAILABLE' as const },
    { code: 'UNIT-G-02', floor: 'ground' as const, type: '1_BHK_RESIDENCE' as const, num: 102, area: 650, carpet: 520, price: 3800000, status: 'AVAILABLE' as const },
    { code: 'UNIT-G-03', floor: 'ground' as const, type: 'STUDIO_SUITE' as const, num: 103, area: 360, carpet: 290, price: 2500000, status: 'RESERVED' as const },
    { code: 'UNIT-F-01', floor: 'first' as const, type: '1_BHK_RESIDENCE' as const, num: 201, area: 650, carpet: 520, price: 3800000, status: 'AVAILABLE' as const },
    { code: 'UNIT-F-02', floor: 'first' as const, type: 'STUDIO_SUITE' as const, num: 202, area: 360, carpet: 290, price: 2500000, status: 'AVAILABLE' as const },
    { code: 'UNIT-F-03', floor: 'first' as const, type: '1_BHK_RESIDENCE' as const, num: 203, area: 650, carpet: 520, price: 3800000, status: 'SOLD' as const },
    { code: 'UNIT-S-01', floor: 'second' as const, type: 'STUDIO_SUITE' as const, num: 301, area: 360, carpet: 290, price: 2500000, status: 'AVAILABLE' as const },
    { code: 'UNIT-S-02', floor: 'second' as const, type: '1_BHK_RESIDENCE' as const, num: 302, area: 650, carpet: 520, price: 3800000, status: 'AVAILABLE' as const },
    { code: 'UNIT-S-03', floor: 'second' as const, type: '2_BHK_SUITE' as const, num: 303, area: 980, carpet: 810, price: 5400000, status: 'HOLD' as const }
  ];

  for (const r of residenceConfigs) {
    units.push({
      id: r.code,
      projectId: 'PRJ-HARYANA-01',
      unitCode: r.code,
      unitNumber: r.num,
      type: r.type,
      areaSqFt: r.area,
      carpetAreaSqFt: r.carpet,
      superAreaSqFt: Math.round(r.area * 1.25),
      floorLevel: r.floor,
      facing: 'North-East',
      price: r.price,
      priceDisplay: `₹${(r.price / 100000).toFixed(2)} Lakh`,
      status: r.status,
      features: [
        '32mm Stainless Steel Grab Rails in Bath & Hall',
        'Anti-Skid R11 Grade Flooring',
        'Direct Emergency SOS Button linked to Nurse Desk',
        'Wide 900mm Wheelchair-Friendly Doorways',
        '500mm Low-Rise Ergonomic Bed Height'
      ],
      updatedAt: '2026-01-01T00:00:00Z'
    });
  }

  return units;
}

export const SEED_REFERRERS: Referrer[] = [
  {
    id: 'REF-001',
    code: 'SLF8K2',
    name: 'Ramesh Sharma',
    phone: '+91 98101 23456',
    email: 'partner@seniorliving.org',
    upiId: 'ramesh.sharma@okaxis',
    isActive: true,
    totalVisits: 142,
    totalLeadsSubmitted: 18,
    verifiedLeadsCount: 14,
    rejectedLeadsCount: 4,
    totalEarnedRewards: 700, // 14 * ₹50
    totalEarnedCommissions: 25000, // 1% on ₹25L booking
    totalPaidOut: 500,
    pendingBalance: 25200,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'REF-002',
    code: 'CARE99',
    name: 'Elder Care NGO Network',
    phone: '+91 98765 43210',
    email: 'contact@eldercareindia.org',
    upiId: 'eldercare@icici',
    isActive: true,
    totalVisits: 310,
    totalLeadsSubmitted: 32,
    verifiedLeadsCount: 28,
    rejectedLeadsCount: 4,
    totalEarnedRewards: 1400,
    totalEarnedCommissions: 0,
    totalPaidOut: 1400,
    pendingBalance: 0,
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z'
  }
];

export const SEED_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-01',
    title: 'Section 8 Non-Profit Certificate of Incorporation',
    category: 'legal',
    categoryLabel: 'Corporate Legal Identity',
    locationId: 'LOC-HARYANA',
    projectId: 'PRJ-HARYANA-01',
    documentNumber: 'U85300HR2026NPL098231',
    authority: 'Ministry of Corporate Affairs, Govt. of India',
    verificationStatus: 'VERIFIED',
    verificationBadgeText: 'MCA VERIFIED',
    description: 'Statutory certificate confirming non-profit incorporation under Section 8 of the Companies Act, 2013 dedicated to senior citizen welfare.',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    currentVersion: 1,
    versions: [
      {
        version: 1,
        fileName: 'MCA_Section8_Incorporation_Certificate.pdf',
        fileSize: '1.4 MB',
        uploadedAt: '2026-01-10T10:00:00Z',
        uploadedBy: 'Foundation Legal Team',
        changeNotes: 'Original registered certificate'
      }
    ],
    tags: ['MCA', 'Section 8', 'Non-Profit', 'Corporate'],
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'DOC-02',
    title: 'Income Tax 80G Provisional Approval (Form 10AC)',
    category: 'financial',
    categoryLabel: 'Tax Exemption & Trust',
    locationId: 'LOC-HARYANA',
    projectId: 'PRJ-HARYANA-01',
    documentNumber: 'AAACX9812EF20261',
    authority: 'Income Tax Department, Govt. of India',
    verificationStatus: 'VERIFIED',
    verificationBadgeText: '80G VALIDATED',
    description: 'Provisional registration under Section 80G(5) of the Income Tax Act 1961 granting 50% tax deduction on qualifying donations from AY 2026-27 to 2028-29.',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    currentVersion: 1,
    versions: [
      {
        version: 1,
        fileName: 'IT_Department_Form_10AC_80G_Approval.pdf',
        fileSize: '980 KB',
        uploadedAt: '2026-01-15T11:30:00Z',
        uploadedBy: 'Finance & Compliance Desk'
      }
    ],
    tags: ['Income Tax', '80G', 'Form 10AC', 'Tax Exemption'],
    createdAt: '2026-01-15T11:30:00Z',
    updatedAt: '2026-01-15T11:30:00Z'
  },
  {
    id: 'DOC-03',
    title: 'NITI Aayog NGO-DARPAN Portal Registration',
    category: 'legal',
    categoryLabel: 'Govt. NPO Accreditation',
    locationId: 'LOC-HARYANA',
    projectId: 'PRJ-HARYANA-01',
    documentNumber: 'HR/2026/0398124',
    authority: 'NITI Aayog, Government of India',
    verificationStatus: 'VERIFIED',
    verificationBadgeText: 'DARPAN ACTIVE',
    description: 'Active accreditation on NITI Aayog NGO-DARPAN portal under Health & Family Welfare and Aged/Elderly Care sectors.',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    currentVersion: 1,
    versions: [
      {
        version: 1,
        fileName: 'NITI_Aayog_DARPAN_Registration_Summary.pdf',
        fileSize: '840 KB',
        uploadedAt: '2026-01-20T09:15:00Z',
        uploadedBy: 'Administration Desk'
      }
    ],
    tags: ['NITI Aayog', 'DARPAN', 'Elderly Care', 'NGO'],
    createdAt: '2026-01-20T09:15:00Z',
    updatedAt: '2026-01-20T09:15:00Z'
  },
  {
    id: 'DOC-04',
    title: 'Kheri Asra Land Demarcation & Freehold Title Chain',
    category: 'registry',
    categoryLabel: 'Revenue & Land Title',
    locationId: 'LOC-HARYANA',
    projectId: 'PRJ-HARYANA-01',
    documentNumber: 'KHERI-ASRA-REV-2026-88',
    authority: 'Tehsil & Revenue Department, Jhajjar, Haryana',
    verificationStatus: 'VERIFIED',
    verificationBadgeText: 'REVENUE VERIFIED',
    description: 'Freehold land registry, Jamabandi extract, and certified Aks Shajra map certifying clear unencumbered title ownership and road demarcation.',
    visibility: 'OWNER_ONLY',
    status: 'PUBLISHED',
    currentVersion: 2,
    versions: [
      {
        version: 2,
        fileName: 'Revenue_Record_Jamabandi_Aks_Shajra_v2.pdf',
        fileSize: '4.2 MB',
        uploadedAt: '2026-02-05T14:20:00Z',
        uploadedBy: 'Legal Registrar',
        changeNotes: 'Updated with latest boundary stone demarcation survey'
      },
      {
        version: 1,
        fileName: 'Revenue_Record_Jamabandi_v1.pdf',
        fileSize: '3.8 MB',
        uploadedAt: '2026-01-05T10:00:00Z',
        uploadedBy: 'Legal Registrar',
        changeNotes: 'Initial extract'
      }
    ],
    tags: ['Revenue', 'Registry', 'Jamabandi', 'Aks Shajra'],
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-02-05T14:20:00Z'
  },
  {
    id: 'DOC-05',
    title: '64-Plot Township Masterplan CAD Blueprint Dossier',
    category: 'architecture',
    categoryLabel: 'Architectural Blueprint',
    locationId: 'LOC-HARYANA',
    projectId: 'PRJ-HARYANA-01',
    documentNumber: 'CAD-MP-2026-V3',
    authority: 'Architectural Planning Board',
    verificationStatus: 'APPROVED',
    verificationBadgeText: 'CAD APPROVED',
    description: 'Complete dimensional architectural layout of 64 residential plots across Blocks A–F, 30 ft. wide internal roads, hospital boundary, and mandir garden.',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    currentVersion: 3,
    versions: [
      {
        version: 3,
        fileName: 'Masterplan_64_Plot_Dimensional_CAD_v3.pdf',
        fileSize: '8.4 MB',
        uploadedAt: '2026-02-12T16:00:00Z',
        uploadedBy: 'Chief Architect',
        changeNotes: 'Aligned with latest 2026 Haryana boundary coordinates'
      }
    ],
    tags: ['Masterplan', 'CAD', '64 Plots', 'Township'],
    createdAt: '2026-01-08T12:00:00Z',
    updatedAt: '2026-02-12T16:00:00Z'
  }
];

export const SEED_SETTINGS: SystemSettings = {
  leadRewardAmount: 50, // ₹50 per verified lead
  defaultCommissionPercentage: 1.0, // 1% sale commission
  defaultFixedCommissionAmount: 10000,
  referralAttributionCookieDays: 30,
  autoVerifyLeads: false, // requires manual or rule-based verification
  duplicatePhoneWindowDays: 90,
  holdExpiryHours: 24,
  notificationEmail: 'leads@seniorlivingcitizensfoundation.com',
  whatsappContactNumber: '+919999955847',
  updatedAt: '2026-01-01T00:00:00Z'
};

export const SEED_BOOKINGS: Booking[] = [
  {
    id: 'BK-2026-001',
    bookingNumber: 'SLF-GOA-2026-00124',
    leadId: 'LEAD-1001',
    unitId: 'GOA-SUITE-102',
    unitCode: 'Suite A-102',
    unitType: '1_BHK_RESIDENCE',
    projectId: 'PRJ-GOA-01',
    projectTitle: 'Goa Coastal Serene Living',
    locationId: 'LOC-GOA',
    customerName: 'Col. Rajesh Bakshi (Retd.)',
    customerPhone: '+91 98112 34567',
    customerEmail: 'rajesh.bakshi@gmail.com',
    customerAddress: 'Sector 14, Gurugram, Haryana 122001',
    bookingAmount: 500000,
    totalAgreedPrice: 1000000,
    totalPaidAmount: 500000,
    remainingBalance: 500000,
    status: 'CONFIRMED',
    paymentPlanId: 'PLAN-BK-2026-001',
    referrerCode: 'SLF8K2',
    referrerId: 'REF-01',
    commissionAmount: 10000,
    commissionStatus: 'APPROVED',
    assignedAdvisorName: 'Capt. R. S. Bhatia',
    assignedAdvisorPhone: '+91 99999 55847',
    notes: 'Down payment received. Installment 2 scheduled for registry.',
    createdAt: '2026-02-15T11:30:00Z',
    updatedAt: '2026-02-15T12:00:00Z'
  },
  {
    id: 'BK-2026-002',
    bookingNumber: 'SLF-HAR-2026-00088',
    leadId: 'LEAD-1002',
    unitId: 'PLOT-A-04',
    unitCode: 'Plot A-04',
    unitType: 'PLOT',
    projectId: 'PRJ-HARYANA-01',
    projectTitle: 'Kheri Asra Senior Plotted Sanctuary',
    locationId: 'LOC-HARYANA',
    customerName: 'Sunita & Vikram Kapoor',
    customerPhone: '+91 99580 98765',
    customerEmail: 'vkapoor@outlook.com',
    customerAddress: 'Sector 12, Dwarka, New Delhi 110075',
    bookingAmount: 100000,
    totalAgreedPrice: 2700000,
    totalPaidAmount: 0,
    remainingBalance: 2700000,
    status: 'HOLD',
    holdExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    paymentPlanId: 'PLAN-BK-2026-002',
    assignedAdvisorName: 'Dr. Vivek Sharma',
    assignedAdvisorPhone: '+91 99999 55847',
    notes: '24-hour priority reservation hold placed during site walkthrough.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const SEED_PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'PLAN-BK-2026-001',
    bookingId: 'BK-2026-001',
    projectId: 'PRJ-GOA-01',
    unitId: 'GOA-SUITE-102',
    totalAmount: 1000000,
    totalPaid: 500000,
    totalRemaining: 500000,
    bookingAmount: 500000,
    numberOfInstallments: 2,
    gracePeriodDays: 7,
    status: 'ACTIVE',
    installments: [
      {
        id: 'INST-001',
        planId: 'PLAN-BK-2026-001',
        bookingId: 'BK-2026-001',
        installmentNumber: 1,
        title: 'Booking & First Installment (50%)',
        amount: 500000,
        paidAmount: 500000,
        dueDate: '2026-02-15',
        gracePeriodDays: 7,
        status: 'PAID',
        paymentId: 'PAY-1001',
        receiptId: 'RCP-2026-001',
        paidAt: '2026-02-15T12:00:00Z',
        notes: 'Verified through Razorpay NetBanking'
      },
      {
        id: 'INST-002',
        planId: 'PLAN-BK-2026-001',
        bookingId: 'BK-2026-001',
        installmentNumber: 2,
        title: 'Possession & Handover (50%)',
        amount: 500000,
        paidAmount: 0,
        dueDate: '2026-09-15',
        gracePeriodDays: 7,
        status: 'DUE',
        notes: 'Due upon unit key handover'
      }
    ],
    notes: '50-50 Senior Living Milestone Plan',
    createdAt: '2026-02-15T11:30:00Z',
    updatedAt: '2026-02-15T12:00:00Z'
  },
  {
    id: 'PLAN-BK-2026-002',
    bookingId: 'BK-2026-002',
    projectId: 'PRJ-HARYANA-01',
    unitId: 'PLOT-A-04',
    totalAmount: 2700000,
    totalPaid: 0,
    totalRemaining: 2700000,
    bookingAmount: 100000,
    numberOfInstallments: 3,
    gracePeriodDays: 10,
    status: 'ACTIVE',
    installments: [
      {
        id: 'INST-003',
        planId: 'PLAN-BK-2026-002',
        bookingId: 'BK-2026-002',
        installmentNumber: 1,
        title: 'Token & Booking Hold',
        amount: 100000,
        paidAmount: 0,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        gracePeriodDays: 2,
        status: 'DUE',
        notes: 'Priority plot hold token'
      },
      {
        id: 'INST-004',
        planId: 'PLAN-BK-2026-002',
        bookingId: 'BK-2026-002',
        installmentNumber: 2,
        title: 'Agreement Allotment (₹24L Down Payment)',
        amount: 2400000,
        paidAmount: 0,
        dueDate: '2026-04-30',
        gracePeriodDays: 7,
        status: 'PENDING',
        notes: 'Guaranteed rental agreement execution'
      },
      {
        id: 'INST-005',
        planId: 'PLAN-BK-2026-002',
        bookingId: 'BK-2026-002',
        installmentNumber: 3,
        title: 'Final Registry & Mutation',
        amount: 200000,
        paidAmount: 0,
        dueDate: '2026-08-30',
        gracePeriodDays: 7,
        status: 'PENDING',
        notes: 'Final Sub-Registrar stamp & registry'
      }
    ],
    notes: '₹25L Down Payment Freehold Plot Plan',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const SEED_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-1001',
    receiptNumber: 'RCP-2026-001',
    bookingId: 'BK-2026-001',
    planId: 'PLAN-BK-2026-001',
    installmentId: 'INST-001',
    installmentNumber: 1,
    buyerId: 'LEAD-1001',
    buyerName: 'Col. Rajesh Bakshi (Retd.)',
    buyerEmail: 'rajesh.bakshi@gmail.com',
    buyerPhone: '+91 98112 34567',
    projectId: 'PRJ-GOA-01',
    locationId: 'LOC-GOA',
    unitId: 'GOA-SUITE-102',
    unitCode: 'Suite A-102',
    amount: 500000,
    amountPaid: 500000,
    currency: 'INR',
    method: 'RAZORPAY_NETBANKING',
    status: 'CAPTURED',
    razorpayOrderId: 'order_O8x9K3j8A123',
    razorpayPaymentId: 'pay_P8x9K3j8B456',
    webhookVerified: true,
    webhookReceivedAt: '2026-02-15T12:00:01Z',
    notes: 'First installment captured successfully via HDFC Netbanking.',
    createdAt: '2026-02-15T12:00:00Z',
    updatedAt: '2026-02-15T12:00:01Z'
  }
];

export const SEED_RECEIPTS: PaymentReceipt[] = [
  {
    id: 'RCP-2026-001',
    receiptNumber: 'RCP-2026-001',
    paymentId: 'PAY-1001',
    bookingId: 'BK-2026-001',
    installmentId: 'INST-001',
    installmentTitle: 'Booking & First Installment (50%)',
    buyerName: 'Col. Rajesh Bakshi (Retd.)',
    buyerPhone: '+91 98112 34567',
    buyerEmail: 'rajesh.bakshi@gmail.com',
    buyerAddress: 'Sector 14, Gurugram, Haryana 122001',
    projectTitle: 'Goa Coastal Serene Living',
    locationName: 'Goa (Candolim Hills)',
    unitCode: 'Suite A-102',
    unitType: '1 BHK Senior Residence (400 Sq. Ft.)',
    amountPaid: 500000,
    amountRemaining: 500000,
    totalPropertyAmount: 1000000,
    paymentDate: '15 February 2026',
    paymentMethod: 'Razorpay NetBanking (HDFC Bank)',
    transactionReference: 'pay_P8x9K3j8B456',
    razorpayPaymentId: 'pay_P8x9K3j8B456',
    status: 'ISSUED',
    qrVerificationUrl: 'https://seniorlivingcitizensfoundation.com/verify/receipt/RCP-2026-001',
    createdAt: '2026-02-15T12:00:02Z'
  }
];

export const SEED_BUYER_DOCUMENTS: BuyerDocument[] = [
  {
    id: 'BDOC-001',
    bookingId: 'BK-2026-001',
    buyerPhone: '+91 98112 34567',
    title: 'Official Booking & Unit Allotment Certificate',
    category: 'ALLOTMENT_LETTER',
    fileName: 'Allotment_Certificate_Suite_A102.pdf',
    fileSize: '1.2 MB',
    downloadUrl: '/api/receipts/RCP-2026-001',
    uploadedAt: '2026-02-15T12:05:00Z'
  },
  {
    id: 'BDOC-002',
    bookingId: 'BK-2026-001',
    buyerPhone: '+91 98112 34567',
    title: 'Payment Receipt #RCP-2026-001 (₹5,00,000)',
    category: 'RECEIPT',
    fileName: 'Payment_Receipt_RCP-2026-001.pdf',
    fileSize: '450 KB',
    downloadUrl: '/api/receipts/RCP-2026-001',
    uploadedAt: '2026-02-15T12:00:02Z'
  }
];

