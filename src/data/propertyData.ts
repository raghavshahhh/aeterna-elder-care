import {
  ResidenceUnit,
  BuildingUnit,
  PlotItem,
  PropertyFloor,
  EcosystemPillar,
  LocationLandmark,
  RoadmapMilestone,
  CoreValue,
  DeepBenefit,
  PaymentPlan,
  LoanParameter,
  ArchitectProfile,
  RealVsProposedItem,
  BenefitGroupPillar,
  TrustCredential
} from '@/types';

// ============================================================================
// 1. MASTER PROJECT METADATA & SPECS (SENIOR LIVING CITIZENS FOUNDATION)
// ============================================================================
export const projectOverview = {
  name: 'Senior Living Citizens Foundation',
  legalName: 'Senior Living Citizens Foundation · Haryana',
  tagline: 'A Better Place for the People Who Raised You.',
  subtitle: 'A purpose-built plotted senior community with proposed on-site Ayurvedic hospital near Reliance MET City, SH-22 Jhajjar, Haryana.',
  visionStatement: 'A small, plotted township where the corner shop knows your name, the doctor lives next door, and the mandir is a five-minute walk away.',
  locationShort: 'Near Reliance MET City, SH-22, Kheri Asra, Jhajjar, Haryana 124104',
  googleMapsUrl: 'https://maps.app.goo.gl/bpqroduFspTJVqDfA?g_st=ic',
  googleMapsPlusCode: 'MP5G+4X Kheri Asra, Haryana 124104',
  siteOfficeAddress: 'Yoffices Tower, Opp. Ramada Hotel, Sector-45 Gurugram, Haryana',
  architectFirm: 'The Vision Architects & Consultants, Farrukhnagar, Gurugram 122506',
  projectStage: 'Upcoming Pre-Launch Project • Land Demarcated with Architectural Master Planning',
  totalPlots: 64,
  plotBlocks: '6 Blocks (Block A to Block F)',
  plotSizes: '120 sq. yd. to 425 sq. yd.',
  hospitalAreaSqFt: '30,000 sq. ft. (Proposed G+2 Structure)',
  hospitalFootprint: '117\'-10" × 138\' L-Shaped Footprint',
  totalBuildingUnits: 9,
  currentReleaseUnits: 'Units 01, 02, 03 (Ground Floor — Available for Phase 1 Booking)',
  futureReleaseUnits: 'Units 04–09 (First & Second Floors — Future Release Phases)',
  siteOfficePhone: '+91 99999 55847',
  salesWhatsApp: '+91 99999 55847',
  inquiryEmail: 'Yoffices@gmail.com',
  droneVideoUrl: '/project-assets/real-site/drone/hero-loop.mp4',
  fullDroneTourUrl: '/project-assets/real-site/drone/full-tour.mp4',
  droneYoutubeUrl: 'https://youtu.be/jiEwQ6RA2HI',
  heroPosterImage: '/project-assets/real-site/drone/poster.jpg',
  images: {
    droneOverview: '/project-assets/real-site/drone/real-land-aerial-1.jpg',
    masterPlanCad: '/project-assets/architecture/cad/previews/masterplan-real.jpg',
    buildingCadElevation: '/project-assets/architecture/cad/previews/typical-floor-cad.jpg',
    stiltFloorCad: '/project-assets/architecture/cad/previews/stilt-floor-cad.jpg',
    revenueMapCad: '/project-assets/architecture/cad/previews/kheri-asra-revenue-map.jpg',
    buildingCgiRenders: [
      '/images/indian-club-seniors.jpg',
      '/images/indian-hospital-care.jpg'
    ]
  },
  cadDownloads: {
    masterplan: '/project-assets/architecture/cad/slcf-masterplan-site-layout.pdf',
    groundFloor: '/project-assets/architecture/floor-plans/ground-floor-plan.pdf',
    firstFloor: '/project-assets/architecture/floor-plans/first-floor-plan.pdf',
    secondFloor: '/project-assets/architecture/floor-plans/second-floor-plan.pdf'
  },
  disclaimer: 'This website presents an upcoming pre-launch project. Architectural drawings, 3D renderings, indicative interiors, and planned amenities represent proposed designs by The Vision Architects and are subject to final municipal and statutory approvals.'
};

// ============================================================================
// 1B. REALITY VS. VISION (TRANSPARENCY COMPONENT DATA)
// ============================================================================
export const realVsProposedItems: RealVsProposedItem[] = [
  {
    category: 'Land & Demarcation',
    whatExistsToday: {
      title: 'Real Demarcated Freehold Land',
      description: 'Physical perimeter demarcation completed in Kheri Asra, off SH-22. Freehold registry-ready plots with clear boundary markers.',
      badge: 'Existing Today',
      icon: 'MapPin'
    },
    whatWeAreBuilding: {
      title: '64-Plot Plotted Township with 33ft Arterial Roads',
      description: 'Gated planned township with underground utilities, paved wide walkways, 5ft–6ft green tree buffer zones, and 24x7 security.',
      badge: 'Proposed Master Plan',
      icon: 'Layers'
    }
  },
  {
    category: 'Residential Building',
    whatExistsToday: {
      title: 'Architectural CAD Blueprints & Soil Testing',
      description: 'Full G+2 structural design by The Vision Architects. Soil testing, load calculations, and municipal submission drawings completed.',
      badge: 'Planning Complete',
      icon: 'FileText'
    },
    whatWeAreBuilding: {
      title: '9 Barrier-Free Senior Residences (G+2 + Stilt)',
      description: 'Stilt parking, dual 5×6ft wheelchair lifts, gradual 6" rise stairs, zero-step internal floor plans, and senior safety grab-rail bathrooms.',
      badge: 'Proposed Architecture',
      icon: 'Building2'
    }
  },
  {
    category: 'Healthcare & Wellness',
    whatExistsToday: {
      title: 'Strategic SH-22 Highway Location',
      description: 'Direct highway frontage near Reliance MET City with rapid emergency road connectivity to Gurugram and Delhi tertiary hospitals.',
      badge: 'Real Highway Access',
      icon: 'Navigation'
    },
    whatWeAreBuilding: {
      title: '30,000 Sq. Ft. On-Site Ayurvedic Hospital',
      description: 'Planned G+2 hospital facility inside the township gate with 6 OPDs, 9 Kerala Panchakarma suites, diagnostic triage bay, and pharmacy.',
      badge: 'Proposed Hospital',
      icon: 'Stethoscope'
    }
  },
  {
    category: 'Spiritual & Community Life',
    whatExistsToday: {
      title: 'Pristine Rural AQI & Peaceful Countryside',
      description: 'Surrounded by tranquil agricultural green belts of Jhajjar, offering unpolluted air and zero metropolitan traffic noise.',
      badge: 'Real Environment',
      icon: 'Trees'
    },
    whatWeAreBuilding: {
      title: 'Community Mandir & 50-Seat Amphitheater',
      description: 'Dedicated western temple within 5 minutes walk of every plot for daily morning aarti, evening satsangs, and festival gatherings.',
      badge: 'Proposed Community',
      icon: 'Heart'
    }
  }
];

// ============================================================================
// 1C. WHAT YOU GET — 5 CONCISE BENEFIT PILLARS
// ============================================================================
export const whatYouGetPillars: BenefitGroupPillar[] = [
  {
    id: 'home',
    title: 'Home',
    tagline: 'Dignity of Freehold Land Ownership',
    iconName: 'Home',
    highlights: [
      'Registered freehold plot or residence in your name',
      'Clean generational inheritance with zero society disputes',
      'Single-floor internal living with zero barrier steps',
      'Covered stilt parking slot included with every residence'
    ]
  },
  {
    id: 'care',
    title: 'Care',
    tagline: 'The Doctor Lives Inside the Gate',
    iconName: 'Stethoscope',
    highlights: [
      'Proposed 30,000 sq. ft. on-site Multi-Speciality Ayurvedic Hospital',
      '6 Physician consultation OPDs and visiting geriatric specialists',
      'Immediate emergency triage response bay within 2 minutes walk',
      'On-site 24x7 pharmacy and diagnostic lab support'
    ]
  },
  {
    id: 'wellness',
    title: 'Wellness',
    tagline: 'Vedic Healing & Pure Country Air',
    iconName: 'Sparkles',
    highlights: [
      '9 Dedicated authentic Kerala Panchakarma therapy suites',
      'Shirodhara, Abhyanga, and joint mobility rehabilitation',
      '5ft and 6ft continuous native tree green buffer zones',
      'Morning yoga and pranayama deck on hospital terrace'
    ]
  },
  {
    id: 'community',
    title: 'Community',
    tagline: 'Neighbours at the Same Chapter of Life',
    iconName: 'Users',
    highlights: [
      'Community Mandir sited 5 minutes walk from every plot',
      'Daily morning aarti, evening bhajan, and satsang circles',
      '50-seat open amphitheater for cultural celebrations',
      'Quiet, watchful, like-minded peer community'
    ]
  },
  {
    id: 'convenience',
    title: 'Convenience',
    tagline: 'Built for Senior Ergonomics & Easy Living',
    iconName: 'ShieldCheck',
    highlights: [
      'Dual 5×6ft elevators — always one operational backup',
      'Gradual 6" rise stairs with wide 4ft accompaniment corridors',
      'Wide 33ft main arterial roads with pedestrian-first paths',
      'Seamless SH-22 connectivity to Gurugram & Reliance MET City'
    ]
  }
];

// ============================================================================
// 1D. TRUST & TRANSPARENCY CREDENTIALS
// ============================================================================
export const trustCredentials: TrustCredential[] = [
  {
    iconName: 'Landmark',
    title: 'Section 8 Registered Company',
    authority: 'Ministry of Corporate Affairs (Govt. of India)',
    description: 'Senior Living Citizens Foundation is incorporated as a non-profit Company Limited by Guarantee under Section 8 of the Companies Act, 2013.',
    badge: 'Section 8 Company'
  },
  {
    iconName: 'FileCheck2',
    title: '80G Provisional Approval (Form 10AC)',
    authority: 'Income Tax Department (Govt. of India)',
    description: 'Holds provisional approval under Section 80G of the Income Tax Act (AY 2026-27 to 2028-29) for eligible charitable contributions to the Foundation.',
    badge: '80G Form 10AC'
  },
  {
    iconName: 'BadgeCheck',
    title: 'DARPAN Registered NPO',
    authority: 'NITI Aayog (Govt. of India)',
    description: 'Registered on the NITI Aayog NGO-DARPAN portal under Health & Family Welfare and Aged/Elderly working sectors.',
    badge: 'DARPAN Portal'
  },
  {
    iconName: 'ShieldCheck',
    title: 'Freehold Registered Title',
    authority: 'Revenue Department, Haryana',
    description: 'Plots and residences are sold with direct legal registration and individual title ownership — not a leasehold or temporary trust license.',
    badge: 'Clear Title'
  }
];

// ============================================================================
// 2. FOUR CORE VALUES (FROM OFFICIAL FOUNDATION STORY)
// ============================================================================
export const coreValues: CoreValue[] = [
  {
    num: '01',
    title: 'Health First',
    description: 'The proposed 30,000 sqft Multi-Speciality Ayurvedic Hospital is on the property — not across town or in another sector, but right inside the township gates.'
  },
  {
    num: '02',
    title: 'Dignity of Ownership',
    description: 'You own freehold land, in your name, registered. No society politics, no maintenance disputes, no lifts that break down without recourse.'
  },
  {
    num: '03',
    title: 'Community by Design',
    description: 'A township shaped for the same chapter of life. Walkable roads, a nearby mandir, and neighbours living at the same unhurried pace.'
  },
  {
    num: '04',
    title: 'Designed for the Body',
    description: 'Wide 4ft doors, level access, gradual stairs (10" tread, 6" rise), two lifts per building. Built for the body you have at 65, 75, and beyond.'
  }
];

// ============================================================================
// 3. EIGHT DEEP BENEFITS (NOT A RETIREMENT HOME. YOUR OWN LAND.)
// ============================================================================
export const deepBenefits: DeepBenefit[] = [
  {
    num: '01',
    title: 'The hospital is inside the gate.',
    description: 'A proposed 30,000 sqft Multi-Speciality Ayurvedic Hospital on the property. For anyone living into their seventies or eighties, the difference between a five-minute walk to the doctor and a forty-minute drive through traffic is the difference between living confidently and living anxiously.'
  },
  {
    num: '02',
    title: 'You own land. That changes the inheritance.',
    description: 'A plotted property transfers cleanly. No society approval. No co-owners to negotiate with. Your children inherit a registered piece of land with a clear title. Haryana\'s real estate corridor near Reliance MET City continues to see steady appreciation.'
  },
  {
    num: '03',
    title: 'Neighbours who understand your pace.',
    description: 'In a city building, your downstairs neighbour might run a business from home at 11pm. Here, everyone has chosen the same chapter of life. The community that forms in a purposeful senior township is quieter, more patient, and watchful.'
  },
  {
    num: '04',
    title: 'A body-first design from the foundation up.',
    description: '6" stair risers instead of 7". 4ft-wide stairwells so someone can walk beside you. Two lifts per building. Single-floor living inside every apartment — no internal steps, no split levels. Wide roads built for walking, not just vehicles.'
  },
  {
    num: '05',
    title: 'The mandir is a five-minute walk.',
    description: 'A community temple sited at the western edge of the township, accessible from every plot without a vehicle. Morning aarti, festival days, a quiet afternoon — faith integrated into the daily geography of life.'
  },
  {
    num: '06',
    title: 'Connectivity without chaos.',
    description: 'On the SH-22 corridor between Jhajjar and Bahadurgarh — quiet enough for a slow morning, connected enough for a quick drive to Gurugram. Village Chhudani for daily essentials, Reliance MET City for larger needs.'
  },
  {
    num: '07',
    title: 'Your garden. Your outdoor morning.',
    description: 'A plotted home gives you outdoor space in your name. Not a balcony overlooking a road, not a rooftop shared with twelve floors — your front and back garden to sit in, to tend, and to fill with what you love.'
  },
  {
    num: '08',
    title: 'A clean structure that banks understand.',
    description: 'Plotted properties with clear titles and freehold ownership are among the simplest assets to finance and to sell. Major Indian banks and NBFCs offer home loans against plotted developments at competitive rates.'
  }
];

// ============================================================================
// 4. COMPARISON: REGULAR CITY FLAT VS SENIOR LIVING FOUNDATION
// ============================================================================
export const comparisonPoints = {
  cityFlat: [
    'Neighbour noise through shared walls',
    'Lifts that break, stairs that hurt knees (7" rise)',
    'Hospital 40 minutes away in city traffic',
    'Society politics and maintenance disputes',
    'No outdoor private garden space',
    'No sense of community — strangers at every floor'
  ],
  seniorLiving: [
    'Your plot, your land, your registered boundary wall',
    'Two lifts + gradual stairs (10" tread, 6" rise), senior-designed',
    'Proposed 30k sqft Hospital on the property — same gate',
    'Freehold land, clear title, clean generational transfer',
    'Your private garden & 5ft–6ft green buffer belts',
    'Neighbours at the same chapter of life & daily mandir'
  ]
};

// ============================================================================
// ============================================================================
// 5. FINANCE, HOME LOANS & PAYMENT PLANS
// ============================================================================
export const paymentPlans: PaymentPlan[] = [
  {
    id: 'down-payment',
    code: 'Plan 1',
    title: 'Down Payment Plan (Assured Rental)',
    ratio: '₹25 Lakh Upfront',
    badge: '₹25,000/mo Rental Return',
    description: '₹25 Lakh paid upfront with 100% direct freehold land registry share. Includes ₹25,000/month rental return till possession, and ₹12,500/month rental return after possession.',
    highlight: '₹25k/mo Till Possession • ₹12.5k/mo Post-Possession • 100% Freehold Registry',
    steps: [
      { milestone: 'Down Payment on Booking', percentage: '₹25 Lakh (100%)' },
      { milestone: 'Rental Return Till Possession', percentage: '₹25,000 / Month' },
      { milestone: 'Rental Return After Possession', percentage: '₹12,500 / Month' },
      { milestone: 'Land Ownership', percentage: 'Direct Freehold Registry' }
    ]
  },
  {
    id: 'flexi',
    code: 'Plan 2',
    title: '50:50 Flexi Payment Plan',
    ratio: '50:50',
    description: 'Split 50% (₹12.50 Lakh) prior to start of construction with ₹6,250/month rental return till possession, and 50% (₹12.50 Lakh) post completion of construction with ₹12,500/month rental return after possession.',
    badge: 'Most Popular',
    highlight: '₹6,250/mo Till Possession • ₹12,500/mo Post-Possession • 50:50 Staged',
    steps: [
      { milestone: 'Prior to Start of Construction (50%)', percentage: '₹12.50 Lakh' },
      { milestone: 'Rental Return Till Possession (1st Half)', percentage: '₹6,250 / Month' },
      { milestone: 'Post Completion of Construction (50%)', percentage: '₹12.50 Lakh' },
      { milestone: 'Rental Return After Possession', percentage: '₹12,500 / Month' }
    ]
  },
  {
    id: 'clp',
    code: 'Plan 3',
    title: 'Construction Linked Plan (CLP)',
    ratio: '5 × ₹5 Lakh Lenter Slabs',
    description: 'Transparent 5-stage milestone payments tied directly to on-ground physical construction progress and slab (lenter) casting.',
    badge: 'Progressive Staging',
    highlight: '5 Stages @ ₹5 Lakh Each • Total ₹25 Lakhs • Milestone Audited',
    steps: [
      { milestone: '1. Booking & Plinth / Foundation', percentage: '₹5.00 Lakh (20%)' },
      { milestone: '2. 1st Lenter (Ground Floor Slab)', percentage: '₹5.00 Lakh (20%)' },
      { milestone: '3. 2nd Lenter (First Floor Slab)', percentage: '₹5.00 Lakh (20%)' },
      { milestone: '4. 3rd Lenter (Roof Slab & Brickwork)', percentage: '₹5.00 Lakh (20%)' },
      { milestone: '5. Finishing, Registry & Possession', percentage: '₹5.00 Lakh (20%)' }
    ]
  }
];

export const loanParameters: LoanParameter[] = [
  { parameter: 'Loan-to-Value (LTV)', detail: 'Up to 75–80% of property value', highlight: true },
  { parameter: 'Minimum Loan Amount', detail: '₹5 Lakhs' },
  { parameter: 'Maximum Tenure', detail: 'Up to 30 years', highlight: true },
  { parameter: 'Eligibility Age', detail: 'Up to 70 years at loan maturity' },
  { parameter: 'Income Proof', detail: 'Salary slips / ITR (3 years)' },
  { parameter: 'Processing Fee', detail: '0.5% – 1% of loan amount' },
  { parameter: 'Part Prepayment', detail: 'Free (floating rate loans)' },
  { parameter: 'Foreclosure', detail: 'Free after 6 months' }
];

export const taxBenefits = [
  {
    section: 'Section 80C',
    title: 'Principal Repayment Deduction',
    benefit: 'Up to ₹1.5 Lakhs per financial year on principal loan repayment.'
  },
  {
    section: 'Section 24(b)',
    title: 'Interest Payment Deduction',
    benefit: 'Up to ₹2.0 Lakhs per financial year on interest paid for self-occupied home.'
  }
];

// ============================================================================
// 5D. BUYBACK / EXIT POLICY
// ============================================================================
export const buybackPolicy = {
  headline: 'Structured Buyback Exit Policy',
  description: 'If the owner wishes to exit or in case of an emergency, the Foundation offers a full buyback of the ₹25 Lakh down payment plus prevailing Fixed Deposit rate interest (7%–8% p.a.).',
  interestRange: '7% – 8% p.a. (FD Rate Indicative)',
  disclaimer: 'Buyback terms are as per the Foundation\'s stated policy and are subject to a signed agreement at the time of purchase.'
};

// ============================================================================
// 5E. 2-PLOT 1-BLOCK PREMIUM CONFIGURATION
// ============================================================================
export const twoPlotOneBlockConfig = {
  headline: '2-Plot, 1-Block Premium Configuration',
  description: 'An optional premium layout that merges 2 adjacent building plots into a single unified architectural block — increasing common-area efficiency and creating larger shared corridors.',
  standard: {
    label: 'Standard 1-Plot Configuration',
    plots: '1 Singular Plot per Building',
    units: '9 Service Apartments'
  },
  premium: {
    label: 'Premium 2-Plot, 1-Block Configuration',
    plots: '2 Adjacent Plots Merged',
    units: '18 Service Apartments',
    advantage: 'Higher super-to-carpet efficiency and visibly larger common spaces & living corridors.'
  }
};

// ============================================================================
// 5B. PARKING & TERRACE RIGHTS
// ============================================================================
export const additionalCharges = [
  { item: 'Uncovered Parking', priceDisplay: 'Included Free', note: 'One uncovered parking space with every apartment.' },
  { item: 'Covered Parking', priceDisplay: '₹3,00,000 / slot', note: 'Optional, purchased separately.' },
  { item: 'Terrace Rights', priceDisplay: '₹3,00,000', note: 'Registered separately from the apartment. Availability depends on floor.' }
];

// ============================================================================
// 5C. ASSURED RENTAL RETURNS & CAPITAL SAFETY PROPOSITION
// ============================================================================
export const rentalProposition = {
  headline: 'Assured Monthly Rental Returns & Capital Safety Policy',
  subheadline: 'Assured monthly cash flow with zero vacancy risk and capital protection policy from Senior Living Citizens Foundation.',
  disclaimer: 'Rental returns and terms are governed by the Foundation\'s official booking agreement. ₹25,000/month is paid pre-possession until handover, followed by ₹12,500/month post-possession under an assured return policy with capital safety security.',
  stages: [
    {
      stage: 'Pre-Possession Return',
      monthlyAmount: '₹25,000 / month',
      note: 'Credited directly to your bank account every month from booking until physical possession on ₹25 Lakh Down Payment.'
    },
    {
      stage: 'Post-Possession Return',
      monthlyAmount: '₹12,500 / month',
      note: 'Assured monthly rental income under the Foundation senior living occupancy pool.'
    },
    {
      stage: '50:50 Flexi Return',
      monthlyAmount: '₹6,250 / month',
      note: 'Credited monthly on 50% initial payment prior to start of construction, escalating to ₹12,500/month post-possession.'
    },
    {
      stage: 'Capital Exit Safety',
      monthlyAmount: '₹25L + FD Rate Interest',
      note: '100% buyback of down payment plus prevailing FD rate interest on exit or emergency.'
    }
  ]
};

// ============================================================================
// 6. ARCHITECT & CREDENTIALS
// ============================================================================
export const architectProfile: ArchitectProfile = {
  firmName: 'The Vision Architects & Consultants',
  principalArchitect: 'Ar. Yash Garg',
  credentials: 'B.Arch, M.Arch',
  studioAddress: 'Near Civil Hospital, Farrukhnagar, Gurugram 122506',
  phone: '+91 99999 55847',
  email: 'Yoffices@gmail.com',
  services: [
    'Architectural Design & Master Planning',
    'Interior Design & Turnkey Fit-Outs',
    'Exterior & Landscape Architecture',
    'Structural Consultancy & Engineering',
    'Valuation Services',
    'Vastu Consultancy'
  ]
};

// ============================================================================
// 7. 9 RESIDENTIAL BUILDING UNITS (STILT + GROUND + FIRST + SECOND FLOORS)
// ============================================================================
export const buildingUnits: BuildingUnit[] = [
  // GROUND FLOOR: UNITS 01, 02, 03 (CURRENT RELEASE FOCUS - AVAILABLE)
  {
    id: 'unit-01',
    unitNumber: 'Residence 01',
    code: '01',
    floorLevel: 'ground',
    floorName: 'Ground Floor',
    type: '1-bhk',
    typeName: '1 BHK Compact Senior Residence (Type A)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    facing: 'East / Morning Sun & Garden View',
    status: 'available',
    badge: 'Phase 1 • Priority Enquiry',
    priceDisplay: '₹25 Lakhs (Down Payment Plan) | ₹25k/mo pre-possession & ₹12.5k/mo post-possession',
    keyHighlights: [
      'Zero-step barrier-free access directly from ground elevator lobby',
      'Dual 5×6ft wheelchair-accessible lifts in building',
      'Single-floor living inside — no internal steps or split levels',
      'Direct on-foot stroll to on-site Ayurvedic Hospital and Mandir'
    ],
    seniorFeatures: [
      'Gradual 6" rise stairs & wide 4ft corridors',
      'Continuous wall grab rails in bathroom',
      'Non-slip vitrified matte flooring',
      'Low-reach electrical switches & emergency cords',
      'Stilt covered car parking space'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'Senior orthopaedic bed layout, reading wall lights, dual wardrobe zone.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living Salon',
        dimensions: '9\'0" × 9\'10"',
        highlight: 'Naturally ventilated living lounge overlooking tree-lined street.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Modular Kitchen',
        dimensions: '5\'0" × 9\'0"',
        highlight: 'Low-reach cabinetry, induction hob, alkaline water filtration point.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior-Safe Toilet',
        dimensions: '4\'0" × 7\'2"',
        highlight: 'Zero-step shower area, folding shower seat, anti-scald temperature mixing.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'unit-02',
    unitNumber: 'Residence 02',
    code: '02',
    floorLevel: 'ground',
    floorName: 'Ground Floor',
    type: '1-bhk',
    typeName: '1 BHK Premium Senior Residence (Type A)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    facing: 'North-East / Courtyard View',
    status: 'available',
    badge: 'Phase 1 • Priority Enquiry',
    priceDisplay: '₹25 Lakhs (Down Payment Plan) | ₹25k/mo pre-possession & ₹12.5k/mo post-possession',
    keyHighlights: [
      'Quiet courtyard-facing orientation with abundant cross-ventilation',
      'Dual elevators and gradual 10" tread / 6" rise stairs',
      'Compact modular kitchen with safe electric induction hub',
      'Immediate access to stilt covered parking and walkway'
    ],
    seniorFeatures: [
      'Zero-threshold bathroom entrance',
      'Anti-skid flooring throughout',
      'Wide 4ft entry door for walker / wheelchair access',
      'Emergency pull-cords in bedroom & bath'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'Peaceful garden facing window, soft night lighting.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living Salon',
        dimensions: '9\'0" × 9\'10"',
        highlight: 'Cozy seating for 4 with direct natural daylight.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Modular Kitchen',
        dimensions: '5\'0" × 9\'0"',
        highlight: 'Senior ergonomic countertop height and pull-out drawers.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior-Safe Toilet',
        dimensions: '4\'0" × 7\'2"',
        highlight: 'Continuous grab rails and non-slip floor tiles.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'unit-03',
    unitNumber: 'Residence 03',
    code: '03',
    floorLevel: 'ground',
    floorName: 'Ground Floor',
    type: '1-rk',
    typeName: '1 RK Senior Studio Suite',
    superAreaSqFt: 240,
    carpetAreaSqFt: 195,
    facing: 'North / Green Belt View',
    status: 'available',
    badge: 'Phase 1 • Priority Enquiry',
    priceDisplay: 'Price to be Confirmed',
    keyHighlights: [
      'Compact, efficient studio suite ideal for single senior comfort',
      'All daily essentials within arm\'s reach on single floor',
      'Attached senior-safe bathroom and kitchenette pantry',
      'Immediate elevator access from stilt level'
    ],
    seniorFeatures: [
      'Barrier-free single-room flow',
      'Emergency switch next to bed',
      'Anti-slip vitrified tiles',
      'Support grab bars in washroom'
    ],
    rooms: [
      {
        name: 'Studio Living & Bed Area',
        dimensions: '12\'0" × 14\'0"',
        highlight: 'Comfortable orthopaedic bed, sofa chair, and dining table corner.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchenette Pantry',
        dimensions: '5\'0" × 6\'0"',
        highlight: 'Compact tea/snack prep counter with induction and mini fridge.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior-Safe Toilet',
        dimensions: '4\'0" × 7\'0"',
        highlight: 'Zero-threshold floor with safety handrails.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  },

  // FIRST FLOOR: UNITS 04, 05, 06 (FUTURE RELEASE / COMING SOON)
  {
    id: 'unit-04',
    unitNumber: 'Residence 04',
    code: '04',
    floorLevel: 'first',
    floorName: 'First Floor',
    type: '1-bhk',
    typeName: '1 BHK Senior Residence (Type A)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    facing: 'East / Tree Canopy View',
    status: 'future_release',
    badge: '⏳ Future Release (Phase 2)',
    priceDisplay: 'Register Interest (Phase 2)',
    keyHighlights: [
      'Elevated first-floor garden view with privacy and soft breeze',
      'Served by 2 high-speed wheelchair-size elevators',
      'Single-level internal floor plan',
      'Planned release in Phase 2'
    ],
    seniorFeatures: [
      'Gradual stairs with 6" rise and 10" tread',
      'Full grab rails in bathroom',
      'Anti-skid vitrified flooring',
      'Wide doors for accessibility'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'Large window with safety glass railing and cross-ventilation.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living Salon',
        dimensions: '9\'0" × 9\'10"',
        highlight: 'Spacious living room overlooking the green boundary.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchen',
        dimensions: '5\'0" × 9\'0"',
        highlight: 'Senior-height granite counter and storage cabinets.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior Toilet',
        dimensions: '4\'0" × 7\'2"',
        highlight: 'Flush floor level with non-slip ceramic flooring.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'unit-05',
    unitNumber: 'Residence 05',
    code: '05',
    floorLevel: 'first',
    floorName: 'First Floor',
    type: '1-bhk',
    typeName: '1 BHK Senior Residence (Type A)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    facing: 'North-East / Quiet Sector View',
    status: 'future_release',
    badge: '⏳ Future Release (Phase 2)',
    priceDisplay: 'Register Interest (Phase 2)',
    keyHighlights: [
      'North-East orientation with pleasant morning light',
      'Dual elevator access with backup generator connectivity',
      'Close proximity to first-floor wellness lounge',
      'Planned release in Phase 2'
    ],
    seniorFeatures: [
      'Dual lift access',
      'Zero internal stairs',
      'Anti-slip bathroom flooring',
      'Emergency calling system conduit'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'Quiet bedroom space with senior acoustic damping.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living Salon',
        dimensions: '9\'0" × 9\'10"',
        highlight: 'Bright living space with garden vista.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchen',
        dimensions: '5\'0" × 9\'0"',
        highlight: 'Induction cooking zone and dry storage.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior Toilet',
        dimensions: '4\'0" × 7\'2"',
        highlight: 'Barrier-free wet room with folding bench.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'unit-06',
    unitNumber: 'Residence 06',
    code: '06',
    floorLevel: 'first',
    floorName: 'First Floor',
    type: '1-rk',
    typeName: '1 RK Senior Studio Suite',
    superAreaSqFt: 240,
    carpetAreaSqFt: 195,
    facing: 'North / Countryside View',
    status: 'future_release',
    badge: '⏳ Future Release (Phase 2)',
    priceDisplay: 'Register Interest (Phase 2)',
    keyHighlights: [
      'Compact studio layout with green countryside view',
      'Ideal for single senior living with minimal maintenance',
      'Dual elevator access from stilt parking',
      'Phase 2 release allocation'
    ],
    seniorFeatures: [
      'Single-floor open studio design',
      'Support rails in bathroom',
      'Matte vitrified tiles',
      'Emergency switch provisions'
    ],
    rooms: [
      {
        name: 'Studio Suite',
        dimensions: '12\'0" × 14\'0"',
        highlight: 'Single-room living with bed, seating and reading desk.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchenette',
        dimensions: '5\'0" × 6\'0"',
        highlight: 'Pantry counter with electric point.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior Toilet',
        dimensions: '4\'0" × 7\'0"',
        highlight: 'Zero-step shower area.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  },

  // SECOND FLOOR: UNITS 07, 08, 09 (FUTURE RELEASE / COMING SOON)
  {
    id: 'unit-07',
    unitNumber: 'Residence 07',
    code: '07',
    floorLevel: 'second',
    floorName: 'Second Floor',
    type: '1-bhk',
    typeName: '1 BHK Sky Suite (Type A)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    facing: 'East / Open Sky & Sunrise View',
    status: 'future_release',
    badge: '⏳ Future Release (Phase 3)',
    priceDisplay: 'Register Interest (Phase 3)',
    keyHighlights: [
      'Top-floor elevation with direct access to rooftop terrace and amphitheater',
      'Dual elevator access straight from stilt parking',
      'Maximum natural light and fresh Haryana countryside breeze',
      'Planned release in Phase 3'
    ],
    seniorFeatures: [
      'Zero internal level changes',
      'Continuous wall grab bars',
      'High-grade anti-slip ceramic floors',
      'Wheelchair-friendly 4ft doorways'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'Panoramic sky view with morning sunrise light.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living Salon',
        dimensions: '9\'0" × 9\'10"',
        highlight: 'Bright living room with terrace proximity.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchen',
        dimensions: '5\'0" × 9\'0"',
        highlight: 'Ergonomic kitchen layout.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior Toilet',
        dimensions: '4\'0" × 7\'2"',
        highlight: 'Safety handrails and zero-step shower.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'unit-08',
    unitNumber: 'Residence 08',
    code: '08',
    floorLevel: 'second',
    floorName: 'Second Floor',
    type: '1-bhk',
    typeName: '1 BHK Sky Suite (Type A)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    facing: 'North-East / Panoramic Horizon View',
    status: 'future_release',
    badge: '⏳ Future Release (Phase 3)',
    priceDisplay: 'Register Interest (Phase 3)',
    keyHighlights: [
      'Top-floor privacy with peaceful horizon view',
      'Dual elevator access with full generator backup',
      'Steps away from quiet library and open sky deck',
      'Planned release in Phase 3'
    ],
    seniorFeatures: [
      'Barrier-free single floor layout',
      'Low-reach electrical controls',
      'Anti-scald bathroom fittings',
      'Non-slip flooring'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'Restful master suite with dual light windows.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living Salon',
        dimensions: '9\'0" × 9\'10"',
        highlight: 'Quiet living salon.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchen',
        dimensions: '5\'0" × 9\'0"',
        highlight: 'Modular kitchen counter.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior Toilet',
        dimensions: '4\'0" × 7\'2"',
        highlight: 'Full safety rails.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'unit-09',
    unitNumber: 'Residence 09',
    code: '09',
    floorLevel: 'second',
    floorName: 'Second Floor',
    type: '1-rk',
    typeName: '1 RK Sky Studio Suite',
    superAreaSqFt: 240,
    carpetAreaSqFt: 195,
    facing: 'North / Sunset View',
    status: 'future_release',
    badge: '⏳ Future Release (Phase 3)',
    priceDisplay: 'Register Interest (Phase 3)',
    keyHighlights: [
      'Top-floor cozy studio suite with sunset horizon views',
      'Direct access to rooftop recreation area and pool',
      'Dual elevator access',
      'Phase 3 release allocation'
    ],
    seniorFeatures: [
      'Compact single-level studio',
      'Safety grab bars',
      'Non-slip tiles',
      'Emergency calling conduit'
    ],
    rooms: [
      {
        name: 'Studio Room',
        dimensions: '12\'0" × 14\'0"',
        highlight: 'Bed and living space with window view.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchenette',
        dimensions: '5\'0" × 6\'0"',
        highlight: 'Tea and coffee counter.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior Toilet',
        dimensions: '4\'0" × 7\'0"',
        highlight: 'Accessible bathroom.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  }
];

// ============================================================================
// 8. 64 RESIDENTIAL PLOTS DATA (BLOCKS A TO F) — 100% SOURCE-ACCURATE CAD DATA
// ============================================================================
export interface MasterPlotDefinition {
  num: number;
  block: 'Block A' | 'Block B' | 'Block C' | 'Block D' | 'Block E' | 'Block F';
  sizeSqYd: number;
  dimensions: string;
  facing: string;
  roadWidth: string;
  isCorner: boolean;
  isParkFacing: boolean;
  indicativePrice: string;
}

export const MASTER_PLOT_DEFINITIONS: MasterPlotDefinition[] = [
  // Block A (Yellow) — 13 Plots (Plots 1-10, 34-36)
  { num: 1, block: 'Block A', sizeSqYd: 425, dimensions: '45\' × 85\' (425 Sq Yds)', facing: 'West', roadWidth: '33 ft Main Highway', isCorner: true, isParkFacing: true, indicativePrice: '₹1.02 Crores' },
  { num: 2, block: 'Block A', sizeSqYd: 425, dimensions: '45\' × 85\' (425 Sq Yds)', facing: 'West', roadWidth: '33 ft Main Highway', isCorner: false, isParkFacing: true, indicativePrice: '₹1.02 Crores' },
  { num: 3, block: 'Block A', sizeSqYd: 425, dimensions: '45\' × 85\' (425 Sq Yds)', facing: 'West', roadWidth: '33 ft Main Highway (Above Mandir)', isCorner: true, isParkFacing: true, indicativePrice: '₹1.02 Crores' },
  { num: 4, block: 'Block A', sizeSqYd: 204, dimensions: '39\'-0" × 47\'-0" (204 Sq Yds)', facing: 'South', roadWidth: '33 ft East-West Road (Adj. Mandir)', isCorner: true, isParkFacing: true, indicativePrice: '₹48.9 Lakhs' },
  { num: 5, block: 'Block A', sizeSqYd: 126, dimensions: '24\'-0" × 47\'-0" (126 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.2 Lakhs' },
  { num: 6, block: 'Block A', sizeSqYd: 126, dimensions: '24\'-0" × 47\'-0" (126 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.2 Lakhs' },
  { num: 7, block: 'Block A', sizeSqYd: 126, dimensions: '24\'-0" × 47\'-0" (126 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.2 Lakhs' },
  { num: 8, block: 'Block A', sizeSqYd: 126, dimensions: '24\'-0" × 47\'-0" (126 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.2 Lakhs' },
  { num: 9, block: 'Block A', sizeSqYd: 126, dimensions: '24\'-0" × 47\'-0" (126 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.2 Lakhs' },
  { num: 10, block: 'Block A', sizeSqYd: 227, dimensions: '42\'-6" × 48\'-0" (227 Sq Yds)', facing: 'East / South', roadWidth: '22\'-6" Rasta & 20\'-0" Rasta Corner', isCorner: true, isParkFacing: false, indicativePrice: '₹54.5 Lakhs' },
  { num: 34, block: 'Block A', sizeSqYd: 130, dimensions: '26\'-0" × 45\'-0" (130 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 35, block: 'Block A', sizeSqYd: 130, dimensions: '26\'-0" × 45\'-0" (130 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 36, block: 'Block A', sizeSqYd: 140, dimensions: '28\'-0" × 45\'-0" (140 Sq Yds)', facing: 'North / West', roadWidth: '20\'-0" Rasta & 22\'-6" Rasta Corner', isCorner: true, isParkFacing: false, indicativePrice: '₹33.6 Lakhs' },

  // Block B (Pink / Rose) — 11 Plots (Plots 11-15, 28-33)
  { num: 11, block: 'Block B', sizeSqYd: 128, dimensions: '24\'-0" × 48\'-0" (128 Sq Yds)', facing: 'South', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.7 Lakhs' },
  { num: 12, block: 'Block B', sizeSqYd: 128, dimensions: '24\'-0" × 48\'-0" (128 Sq Yds)', facing: 'South', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.7 Lakhs' },
  { num: 13, block: 'Block B', sizeSqYd: 128, dimensions: '24\'-0" × 48\'-0" (128 Sq Yds)', facing: 'South', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.7 Lakhs' },
  { num: 14, block: 'Block B', sizeSqYd: 128, dimensions: '24\'-0" × 48\'-0" (128 Sq Yds)', facing: 'South', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹30.7 Lakhs' },
  { num: 15, block: 'Block B', sizeSqYd: 128, dimensions: '24\'-0" × 48\'-0" (128 Sq Yds)', facing: 'South', roadWidth: '20\'-0" Internal Rasta (Adj. Utility)', isCorner: true, isParkFacing: false, indicativePrice: '₹30.7 Lakhs' },
  { num: 28, block: 'Block B', sizeSqYd: 130, dimensions: '24\'-6" × 47\'-6" (130 Sq Yds)', facing: 'North', roadWidth: '33 ft Road with 5 ft Green Belt', isCorner: false, isParkFacing: true, indicativePrice: '₹31.2 Lakhs' },
  { num: 29, block: 'Block B', sizeSqYd: 130, dimensions: '24\'-6" × 47\'-6" (130 Sq Yds)', facing: 'North', roadWidth: '33 ft Road with 5 ft Green Belt', isCorner: false, isParkFacing: true, indicativePrice: '₹31.2 Lakhs' },
  { num: 30, block: 'Block B', sizeSqYd: 163, dimensions: '31\'-0" × 47\'-6" (163 Sq Yds)', facing: 'North / West', roadWidth: '33 ft Road & 22\'-6" Rasta Corner', isCorner: true, isParkFacing: true, indicativePrice: '₹39.1 Lakhs' },
  { num: 31, block: 'Block B', sizeSqYd: 163, dimensions: '31\'-0" × 47\'-6" (163 Sq Yds)', facing: 'South / West', roadWidth: '20\'-0" Rasta & 22\'-6" Rasta Corner', isCorner: true, isParkFacing: false, indicativePrice: '₹39.1 Lakhs' },
  { num: 32, block: 'Block B', sizeSqYd: 130, dimensions: '24\'-6" × 47\'-6" (130 Sq Yds)', facing: 'South', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 33, block: 'Block B', sizeSqYd: 130, dimensions: '24\'-6" × 47\'-6" (130 Sq Yds)', facing: 'South', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },

  // Block C (Lavender / Purple) — 12 Plots (Plots 16-27)
  { num: 16, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹29.3 Lakhs' },
  { num: 17, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹29.3 Lakhs' },
  { num: 18, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹29.3 Lakhs' },
  { num: 19, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹29.3 Lakhs' },
  { num: 20, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Internal Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹29.3 Lakhs' },
  { num: 21, block: 'Block C', sizeSqYd: 215, dimensions: '42\'-6" × 45\'-6" (215 Sq Yds)', facing: 'North / West', roadWidth: '20\'-0" Rasta & 22\'-6" Rasta Corner', isCorner: true, isParkFacing: false, indicativePrice: '₹51.6 Lakhs' },
  { num: 22, block: 'Block C', sizeSqYd: 215, dimensions: '42\'-6" × 45\'-6" (215 Sq Yds)', facing: 'South / West', roadWidth: '33 ft Road & 22\'-6" Rasta Corner', isCorner: true, isParkFacing: true, indicativePrice: '₹51.6 Lakhs' },
  { num: 23, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'South', roadWidth: '33 ft Road with 6 ft Green Belt', isCorner: false, isParkFacing: true, indicativePrice: '₹29.3 Lakhs' },
  { num: 24, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'South', roadWidth: '33 ft Road with 6 ft Green Belt', isCorner: false, isParkFacing: true, indicativePrice: '₹29.3 Lakhs' },
  { num: 25, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'South', roadWidth: '33 ft Road with 6 ft Green Belt', isCorner: false, isParkFacing: true, indicativePrice: '₹29.3 Lakhs' },
  { num: 26, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'South', roadWidth: '33 ft Road with 6 ft Green Belt', isCorner: false, isParkFacing: true, indicativePrice: '₹29.3 Lakhs' },
  { num: 27, block: 'Block C', sizeSqYd: 122, dimensions: '24\'-0" × 45\'-6" (122 Sq Yds)', facing: 'South', roadWidth: '33 ft Road with 6 ft Green Belt', isCorner: true, isParkFacing: true, indicativePrice: '₹29.3 Lakhs' },

  // Block D (Green) — 8 Plots (Plots 37-44)
  { num: 37, block: 'Block D', sizeSqYd: 130.5, dimensions: '25\'-0" × 47\'-0" (130.5 Sq Yds)', facing: 'West', roadWidth: '22\'-6" Central Rasta', isCorner: true, isParkFacing: false, indicativePrice: '₹31.3 Lakhs' },
  { num: 38, block: 'Block D', sizeSqYd: 130.5, dimensions: '25\'-0" × 47\'-0" (130.5 Sq Yds)', facing: 'West', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.3 Lakhs' },
  { num: 39, block: 'Block D', sizeSqYd: 130.5, dimensions: '25\'-0" × 47\'-0" (130.5 Sq Yds)', facing: 'West', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.3 Lakhs' },
  { num: 40, block: 'Block D', sizeSqYd: 130.5, dimensions: '25\'-0" × 47\'-0" (130.5 Sq Yds)', facing: 'West', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.3 Lakhs' },
  { num: 41, block: 'Block D', sizeSqYd: 130.5, dimensions: '25\'-0" × 47\'-0" (130.5 Sq Yds)', facing: 'West', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.3 Lakhs' },
  { num: 42, block: 'Block D', sizeSqYd: 130.5, dimensions: '25\'-0" × 47\'-0" (130.5 Sq Yds)', facing: 'West', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.3 Lakhs' },
  { num: 43, block: 'Block D', sizeSqYd: 130.5, dimensions: '25\'-0" × 47\'-0" (130.5 Sq Yds)', facing: 'West', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.3 Lakhs' },
  { num: 44, block: 'Block D', sizeSqYd: 120.1, dimensions: '23\'-0" × 47\'-0" (120.1 Sq Yds)', facing: 'West / South', roadWidth: '22\'-6" Central Rasta (South Boundary)', isCorner: true, isParkFacing: false, indicativePrice: '₹28.8 Lakhs' },

  // Block E (Light Blue) — 16 Plots (Plots 45-60)
  { num: 45, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta (South Corner)', isCorner: true, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 46, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 47, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 48, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 49, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 50, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 51, block: 'Block E', sizeSqYd: 129, dimensions: '25\'-3" × 46\'-0" (129 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Rasta (Facing Hospital)', isCorner: true, isParkFacing: false, indicativePrice: '₹30.9 Lakhs' },
  { num: 52, block: 'Block E', sizeSqYd: 129, dimensions: '25\'-3" × 46\'-0" (129 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Rasta (Facing Hospital)', isCorner: false, isParkFacing: false, indicativePrice: '₹30.9 Lakhs' },
  { num: 53, block: 'Block E', sizeSqYd: 129, dimensions: '25\'-3" × 46\'-0" (129 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Rasta (Facing Hospital)', isCorner: false, isParkFacing: false, indicativePrice: '₹30.9 Lakhs' },
  { num: 54, block: 'Block E', sizeSqYd: 129, dimensions: '25\'-3" × 46\'-0" (129 Sq Yds)', facing: 'North', roadWidth: '20\'-0" Rasta (Facing Hospital)', isCorner: true, isParkFacing: false, indicativePrice: '₹30.9 Lakhs' },
  { num: 55, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'West', roadWidth: '16\'-6" West Rasta', isCorner: true, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 56, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'West', roadWidth: '16\'-6" West Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 57, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'West', roadWidth: '16\'-6" West Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 58, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'West', roadWidth: '16\'-6" West Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 59, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'West', roadWidth: '16\'-6" West Rasta', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 60, block: 'Block E', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'West', roadWidth: '16\'-6" West Rasta (South Corner)', isCorner: true, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },

  // Block F (Aqua / Cyan) — 4 Plots (Plots 61-64)
  { num: 61, block: 'Block F', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East / South', roadWidth: '22\'-6" Rasta & 20\'-0" Rasta Corner (Adj. Hospital)', isCorner: true, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 62, block: 'Block F', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta (Adj. Hospital)', isCorner: false, isParkFacing: false, indicativePrice: '₹31.2 Lakhs' },
  { num: 63, block: 'Block F', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East', roadWidth: '22\'-6" Central Rasta (Site for G+2 Senior Residences)', isCorner: false, isParkFacing: true, indicativePrice: '₹31.2 Lakhs' },
  { num: 64, block: 'Block F', sizeSqYd: 130, dimensions: '23\'-0" × 50\'-6" (130 Sq Yds)', facing: 'East / North', roadWidth: '22\'-6" Central Rasta (North Corner, Site for G+2 Residences)', isCorner: true, isParkFacing: true, indicativePrice: '₹31.2 Lakhs' }
];

// Sort definitions by plot number ascending (1 to 64)
const sortedPlotDefs = [...MASTER_PLOT_DEFINITIONS].sort((a, b) => a.num - b.num);

export const allPlots: PlotItem[] = sortedPlotDefs.map((def) => {
  return {
    id: `plot-${def.num}`,
    plotNumber: `Plot ${def.num}`,
    number: def.num,
    block: def.block,
    sizeSqYd: def.sizeSqYd,
    dimensions: def.dimensions,
    facing: def.facing,
    roadWidth: def.roadWidth,
    status: 'phase1_enquiry',
    statusLabel: 'Phase 1 Enquiry Open',
    priceEstimate: `Indicative ${def.indicativePrice}*`,
    enquiryNote: 'Individual boundary demarcation and registry terms confirmed during private on-site walk.',
    isCorner: def.isCorner,
    isParkFacing: def.isParkFacing
  };
});

export const plotsSummary = {
  totalPlots: 64,
  blocks: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'],
  statusNote: 'Phase 1 Pre-Launch Enquiry Open across all 6 Blocks (120.1 to 425 sq. yd.)',
  disclaimer: 'Plot dimensions and block demarcations are derived directly from approved CAD master layout (The Vision Architects). Individual availability and registration terms confirmed on site.',
  minSizeSqYd: 120.1,
  maxSizeSqYd: 425,
  internalRoads: '11 ft to 22 ft 6 in internal lanes connecting to 33 ft main arterial road',
  greenBelt: '5 ft & 6 ft continuous green buffer zones along boundaries',
  mandirDistance: '5 mins walking distance from every plot'
};

// ============================================================================
// 9. SIMPLIFIED & HONEST HEALTHCARE & LIFESTYLE HIGHLIGHTS
// ============================================================================
export const healthcareHighlights = [
  {
    icon: 'Building2',
    title: 'Proposed G+2 Ayurvedic & Multi-Speciality Hospital',
    subtitle: '30,000 sq. ft. planned facility on the property — the doctor is your neighbour.',
    badge: 'On-Site Facility'
  },
  {
    icon: 'Sparkles',
    title: 'Authentic Kerala Panchakarma & Detox',
    subtitle: '9 Dedicated therapy suites for Abhyanga, Shirodhara, and arthritis joint mobility.',
    badge: 'Vedic Wellness'
  },
  {
    icon: 'Stethoscope',
    title: 'Daily Physician Consultation & 6 OPDs',
    subtitle: 'Chambers for visiting Vaidyas, geriatric physicians, and super-specialists.',
    badge: 'Clinical Care'
  },
  {
    icon: 'Activity',
    title: 'Emergency Triage & Diagnostics Bay',
    subtitle: 'Immediate medical attention and diagnostic support right inside the township gates.',
    badge: 'Emergency Bay'
  },
  {
    icon: 'Heart',
    title: 'Community Mandir & Daily Satsang',
    subtitle: 'A peaceful temple sited at the western edge — a gentle 5-minute stroll from every plot.',
    badge: 'Spiritual Peace'
  },
  {
    icon: 'Trees',
    title: '5ft & 6ft Perimeter Green Walking Buffers',
    subtitle: 'Continuous native tree lines and wide 33ft roads with zero city noise and fresh air.',
    badge: 'Pure Air & Walking'
  }
];

// ============================================================================
// 10. 1 RK & 1 BHK APARTMENT CONFIGURATIONS SHOWCASE
// ============================================================================
export const residenceUnits: ResidenceUnit[] = [
  {
    id: '1bhk-apt',
    unitNumber: '1 BHK Senior Residence',
    type: '1-bhk',
    typeName: '1 BHK Compact Senior Suite (Type A)',
    floor: 'ground',
    floorNumber: 0,
    floorName: 'G+2 Building + Stilt Parking',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    facing: 'East / Garden Facing',
    status: 'available',
    releasePhase: 'Active Phase 1 Booking (Units 01, 02)',
    badge: 'Phase 1 • Priority Enquiry',
    startingPriceEstimate: '₹25 Lakhs (Down Payment Plan) | ₹25,000/mo Till Possession & ₹12,500/mo Post-Possession',
    monthlyCarePackageEstimate: 'Customized Wellness Package',
    seniorSafetyFeatures: [
      'Single-floor living inside — no internal steps or split levels',
      'Dual lifts in building (5×6ft cabins accommodating wheelchairs & attendants)',
      'Gradual stairs with 10" tread and 6" rise (standard 7" replaced for knee ease)',
      'Zero-threshold barrier-free bathroom and anti-skid vitrified flooring',
      'Stilt parking with 10+ covered car bays and 3 entry gates'
    ],
    keyHighlights: [
      'Simple, walkable, warm layout designed for 1 or 2 senior residents',
      'Compact modular kitchen (5\'0" × 9\'0") with induction safety',
      'Cozy living area (9\'0" × 9\'10") with abundant cross-ventilation',
      'Direct on-foot proximity to the on-site Ayurvedic Hospital and Mandir'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'Senior-safe orthopaedic bed placement, reading lights, emergency switch.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living Salon',
        dimensions: '9\'0" × 9\'10"',
        highlight: 'Naturally ventilated living lounge overlooking the tree-lined street.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Modular Kitchen',
        dimensions: '5\'0" × 9\'0"',
        highlight: 'Low-reach cabinetry, induction hob, alkaline water filtration.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior-Safe Toilet',
        dimensions: '4\'0" × 7\'2"',
        highlight: 'Continuous wall grab rails, zero-step shower, anti-slip tiles.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '1rk-apt',
    unitNumber: '1 RK Senior Studio Suite',
    type: '1-rk',
    typeName: '1 RK Studio Suite (Type C)',
    floor: 'ground',
    floorNumber: 0,
    floorName: 'G+2 Building + Stilt Parking',
    superAreaSqFt: 240,
    carpetAreaSqFt: 195,
    facing: 'North / Countryside View',
    status: 'available',
    releasePhase: 'Active Phase 1 Booking (Unit 03)',
    badge: 'Phase 1 • Priority Enquiry',
    startingPriceEstimate: 'Price to be Confirmed',
    monthlyCarePackageEstimate: 'Customized Wellness Package',
    seniorSafetyFeatures: [
      'Compact open layout with zero interior partitions or obstructions',
      'Dual elevator access straight from covered stilt car parking',
      'Emergency pull switch located next to orthopaedic bed',
      'Senior-safe bathroom with non-slip flooring and grab bars'
    ],
    keyHighlights: [
      'Low-maintenance studio designed for single senior comfort',
      'Kitchenette pantry for quick tea and snack preparation',
      'Abundant natural daylight through large safety-glazed window',
      'Short 30-second elevator ride to garden walkways'
    ],
    rooms: [
      {
        name: 'Studio Living & Bed Area',
        dimensions: '12\'0" × 14\'0"',
        highlight: 'Integrated bed and relaxing lounge corner with reading lamps.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchenette Pantry',
        dimensions: '5\'0" × 6\'0"',
        highlight: 'Safe induction cooktop counter and beverage station.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior-Safe Toilet',
        dimensions: '4\'0" × 7\'0"',
        highlight: 'Flush floor level with wall-mounted safety grab rails.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  }
];

// ============================================================================
// 11. REAL LOCATION & CONNECTIVITY (KHERI ASRA / JHAJJAR / RELIANCE MET CITY)
// ============================================================================
export const locationLandmarks: LocationLandmark[] = [
  {
    category: 'expressway',
    name: 'State Highway 22 (SH-22 Jhajjar Corridor)',
    distance: 'Direct Access (0 km)',
    travelTime: 'Direct on Highway',
    significance: 'Seamless, wide road access connecting directly to Gurugram, Farrukhnagar & Jhajjar.'
  },
  {
    category: 'transit',
    name: 'Reliance MET City (Model Economic Township)',
    distance: 'Approx. 3.5 km*',
    travelTime: 'Approx. 5 mins drive*',
    significance: 'World-class industrial, commercial, and healthcare development hub in North India.'
  },
  {
    category: 'hospital',
    name: 'Proposed G+2 Multi-Speciality Ayurvedic Hospital',
    distance: 'Within Township (0 km)',
    travelTime: '1 min walk',
    significance: 'Planned 30,000 sq. ft. hospital with OPDs, Panchakarma suites, and emergency response bay.'
  },
  {
    category: 'nature',
    name: 'Kheri Asra Peaceful Agricultural Green Belt',
    distance: 'Township Perimeter',
    travelTime: 'Step outside',
    significance: 'Pristine Air Quality Index (AQI), 5ft-6ft boundary green belts, and zero city congestion.'
  }
];

// ============================================================================
// 12. TRANSPARENT PRE-LAUNCH DEVELOPMENT ROADMAP
// ============================================================================
export const developmentRoadmap: RoadmapMilestone[] = [
  {
    phase: 'Phase 01',
    title: 'Land Demarcation & Master Planning',
    timeline: 'Completed',
    status: 'completed',
    description: 'Freehold land perimeter demarcation, soil testing, and complete architectural CAD blueprints by The Vision Architects.',
    deliverables: [
      '64-Plot layout with 33ft main arterial roads',
      'Boundary wall demarcation in Kheri Asra',
      'Architectural CAD plans for Hospital & Residences'
    ]
  },
  {
    phase: 'Phase 02',
    title: 'Statutory Clearances & Pre-Launch Release',
    timeline: 'Active Pre-Launch Phase',
    status: 'in-progress',
    description: 'Ground unit bookings open for Phase 1 allotment (Units 01–03 & select freehold plots across Blocks A–F).',
    deliverables: [
      'Phase 1 plot allotment agreements',
      'Ground Floor senior units booking open',
      'Site office & family walkthrough desk active'
    ]
  },
  {
    phase: 'Phase 03',
    title: 'Civil Infrastructure & Hospital Structure',
    timeline: 'Proposed Execution',
    status: 'upcoming',
    description: 'Underground utility network, 33ft road paving, and G+2 hospital civil structure execution.',
    deliverables: [
      'Underground water, sewage, and electricity ducts',
      'G+2 Hospital structure construction',
      'Community Mandir foundation'
    ]
  },
  {
    phase: 'Phase 04',
    title: 'Turnkey Handover & Community Living',
    timeline: 'Planned Handover',
    status: 'upcoming',
    description: 'Turnkey possession of freehold plots, senior residences, and operational Ayurvedic hospital.',
    deliverables: [
      'Registry & possession handover',
      'Doctor OPDs & Panchakarma clinic operational',
      'Resident wellness & daily mandir aarti'
    ]
  }
];

// ============================================================================
// 13. HOSPITAL ARCHITECTURAL FLOORS (CAD REFERENCE)
// ============================================================================
export const propertyFloors: PropertyFloor[] = [
  {
    id: 'ground',
    level: 1,
    name: 'Ground Floor — OPD Chambers, Triage & Diagnostics',
    tagline: 'Direct Street Access • 6 OPDs • Triage Bay',
    description: '6 Doctor OPD consultation rooms, emergency response triage bay, diagnostics lab, and pharmacy.',
    totalAreaSqFt: 10000,
    unitIds: ['opd-1', 'pancha-suite', 'emergency-bay'],
    zones: [
      {
        name: 'Doctor OPD Chambers (6 Suites)',
        category: 'clinical',
        badge: '6 Rooms',
        description: 'Geriatric physician consultation rooms with diagnostic stations and waiting lounge.'
      },
      {
        name: 'Emergency Response & Triage Bay',
        category: 'clinical',
        badge: 'Immediate Care',
        description: 'Direct ambulance ingress and immediate medical stabilization bay.'
      },
      {
        name: 'Panchakarma Consultation Chamber',
        category: 'wellness',
        badge: 'Vaidya Desk',
        description: 'Ayurvedic pulse diagnosis and comprehensive wellness assessment.'
      }
    ]
  },
  {
    id: 'first',
    level: 2,
    name: 'First Floor — Panchakarma & Therapy Suites',
    tagline: '9 Dedicated Suites • Shirodhara & Abhyanga',
    description: '9 Dedicated therapy suites for authentic Kerala Abhyanga, Shirodhara, and steam detox.',
    totalAreaSqFt: 10000,
    unitIds: ['therapy-1', 'therapy-2'],
    zones: [
      {
        name: 'Shirodhara & Medicated Oil Suites',
        category: 'wellness',
        badge: '4 Suites',
        description: 'Quiet herbal oil stream therapy chambers for mental serenity and sleep restoration.'
      },
      {
        name: 'Full-Body Abhyanga & Steam Detox',
        category: 'wellness',
        badge: '5 Suites',
        description: 'Herbal massage tables for senior joint mobility, spine care, and arthritis relief.'
      }
    ]
  },
  {
    id: 'second',
    level: 3,
    name: 'Second Floor — Inpatient Suites & Wellness Deck',
    tagline: 'Private Suites • Yoga Hall • Open Amphitheater',
    description: 'Private recovery suites, yoga & meditation hall, and 50-seat open amphitheater on terrace.',
    totalAreaSqFt: 10000,
    unitIds: ['inpatient-1', 'yoga-hall'],
    zones: [
      {
        name: 'Private Inpatient Suites',
        category: 'residential',
        badge: 'Private Rooms',
        description: 'Comfortable recovery rooms with attached senior-safe bathrooms.'
      },
      {
        name: 'Pranayama, Yoga & Amphitheater',
        category: 'lifestyle',
        badge: 'Community Space',
        description: 'Gentle morning senior yoga, breathing exercises, and cultural satsang gatherings.'
      }
    ]
  }
];

// ============================================================================
// 14. FAQS (TAILORED FOR FAMILIES, SONS, DAUGHTERS & NRIS)
// ============================================================================
export const propertyFaqs = [
  {
    question: 'Where exactly is the Senior Living Citizens Foundation located?',
    answer: 'The project is located in Kheri Asra, near Reliance MET City (Model Economic Township), just off State Highway 22 (SH-22), Jhajjar, Haryana 124104. It offers seamless highway connectivity to Gurugram, Farrukhnagar, and Delhi.'
  },
  {
    question: 'Is this an old age home or a freehold property?',
    answer: 'This is a premium freehold plotted township and senior apartment community. You own the plot or apartment outright, with full legal registration, while enjoying an integrated on-site proposed 30,000 sq. ft. G+2 Ayurvedic Hospital, Mandir, and senior-safe infrastructure.'
  },
  {
    question: 'Which residential units and plots are currently available for booking?',
    answer: 'For the current Phase 1 launch, Ground Floor Units (Residence 01, Residence 02, and Residence 03) and select freehold plots across Blocks A to F are available for booking. Units 04 to 09 (First and Second Floors) will be released in future phases.'
  },
  {
    question: 'What facilities are planned in the on-site Hospital building?',
    answer: 'The planned 30,000 sq. ft. hospital building includes 6 Doctor OPDs, 9 Panchakarma therapy suites, a multi-purpose yoga hall, emergency response bay, pharmacy stores, a 50-seat open amphitheater, swimming pool, library, and cafeteria.'
  },
  {
    question: 'Can I get a home loan or finance for plots and apartments?',
    answer: 'Yes. Major Indian banks and NBFCs offer home loans for plotted development up to 75–80% LTV with tenures up to 30 years. Three structured payment plans (Plan A 30:70, Plan B 50:50, and Plan C 100%) are available.'
  },
  {
    question: 'How do I schedule an on-site visit or talk to an advisor?',
    answer: 'You can connect directly with our advisory desk on WhatsApp or Call at +91 99999 55847 or visit our corporate office at Yoffices Tower, Opp. Ramada Hotel, Sector-45 Gurugram, Haryana. We also arrange car pickup from Delhi NCR.'
  }
];
