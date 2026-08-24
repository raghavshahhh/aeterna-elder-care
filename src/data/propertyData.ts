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
// 1. MASTER PROJECT METADATA & SPECS (SENIOR LIVING CITIZEN FOUNDATION)
// ============================================================================
export const projectOverview = {
  name: 'Senior Living Citizen Foundation',
  legalName: 'Senior Living Citizen Foundation · Haryana',
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
  siteOfficePhone: '+91 99999558447',
  salesWhatsApp: '+91 99999558447',
  inquiryEmail: 'Yoffices@gmail.com',
  droneVideoUrl: '/project-assets/real-site/drone/hero-loop.mp4',
  fullDroneTourUrl: '/project-assets/real-site/drone/full-tour.mp4',
  droneYoutubeUrl: 'https://youtu.be/jiEwQ6RA2HI',
  heroPosterImage: '/project-assets/real-site/drone/poster.jpg',
  images: {
    droneOverview: '/images/indian-grandparents-hero.jpg',
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
    description: 'Senior Living Citizen Foundation is incorporated as a non-profit Company Limited by Guarantee under Section 8 of the Companies Act, 2013.',
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
// 5. FINANCE, HOME LOANS & PAYMENT PLANS
// ============================================================================
export const paymentPlans: PaymentPlan[] = [
  {
    id: 'down-payment',
    code: 'Plan 1',
    title: 'Down Payment Plan',
    ratio: '100% Upfront',
    description: '₹25 Lakh paid upfront. Immediate direct registry of a 14.4 sq. yd. undivided land share (out of the building\'s 130 sq. yd. plot) on payment.',
    steps: [
      { milestone: 'On Booking (Full Amount)', percentage: '100%' }
    ]
  },
  {
    id: 'flexi',
    code: 'Plan 2',
    title: 'Flexi Payment Plan',
    ratio: '50:50',
    description: 'Split across the construction timeline. Complete direct registry executed on full payment clearance and completion of construction.',
    badge: 'Most Popular',
    steps: [
      { milestone: 'Prior to Start of Construction', percentage: '50%' },
      { milestone: 'Post Completion of Construction', percentage: '50%' }
    ]
  },
  {
    id: 'clp',
    code: 'Plan 3',
    title: 'Construction Linked Plan (CLP)',
    ratio: 'Milestone-Based',
    description: 'Stage payments tied directly to physical on-site construction progress, as per the builder-developer schedule. Legal registry executed on completion.',
    steps: [
      { milestone: 'Per Pre-Agreed Construction Milestones', percentage: 'Staged' }
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
// Per Website Brief V1.0: "If the owner wishes to exit or in any emergency,
// the foundation offers full buyback of the down payment plus FD rate interest."
// ============================================================================
export const buybackPolicy = {
  headline: 'Structured Buyback Exit Policy',
  description: 'If the owner wishes to exit or in case of an emergency, the Foundation offers a full buyback of the ₹25 Lakh down payment plus prevailing Fixed Deposit rate interest.',
  interestRange: '7% – 8% p.a. (FD Rate Indicative)',
  disclaimer: 'Buyback terms are as per the Foundation\'s stated policy and are subject to a signed exit agreement at the time of purchase. Please request the buyback clause in writing before booking.'
};

// ============================================================================
// 5E. 2-PLOT 1-BLOCK PREMIUM CONFIGURATION
// Per Website Brief V1.0: merges 2 adjacent plots into 1 unified block of 18 units.
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
// 5C. RENTAL / OCCUPANCY PROPOSITION
// Wording intentionally avoids "guaranteed" / "assured" / "investment return" —
// pending client legal review of the source Rental Plan document's framing.
// See CLIENT CONFIRMATION REQUIRED note in TrustTransparency section.
// ============================================================================
export const rentalProposition = {
  headline: 'Rental Support Proposition',
  disclaimer: 'The following payout structure is proposed by the Foundation as a rental/occupancy management service, not an investment scheme or deposit product. Final terms are subject to a signed agreement and client legal review. These figures are indicative and not guaranteed returns.',
  stages: [
    {
      stage: 'Pre-Possession',
      monthlyAmount: '₹25,000 / month',
      note: 'From booking until physical possession, across any payment plan.'
    },
    {
      stage: 'Post-Possession',
      monthlyAmount: '₹12,500 / month',
      note: 'Foundation manages senior-occupancy tenancy on the owner\'s behalf.'
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
  phone: '+91 99999558447',
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
    priceDisplay: '₹25L* Indicative (Confirmed on site walk)',
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
    priceDisplay: '₹25L* Indicative (Confirmed on site walk)',
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
// 8. 64 RESIDENTIAL PLOTS DATA (BLOCKS A TO F) WITH REALISTIC PRE-LAUNCH PRICING
// ============================================================================
const plotPricingMap: Record<number, string> = {
  120: '₹28.8 Lakhs',
  150: '₹36.0 Lakhs',
  180: '₹43.2 Lakhs',
  220: '₹52.8 Lakhs',
  250: '₹60.0 Lakhs',
  300: '₹72.0 Lakhs',
  425: '₹1.02 Crores'
};

export const allPlots: PlotItem[] = Array.from({ length: 64 }, (_, i) => {
  const num = i + 1;
  const blockIndex = Math.floor(i / 11);
  const block = (['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'][blockIndex] || 'Block A') as PlotItem['block'];
  
  const size = [120, 150, 180, 220, 250, 300, 425][i % 7];
  const dimensionsMap: Record<number, string> = {
    120: '24\' × 45\'',
    150: '30\' × 45\'',
    180: '30\' × 54\'',
    220: '33\' × 60\'',
    250: '35\' × 64\'',
    300: '40\' × 67\'',
    425: '45\' × 85\''
  };
  
  const facings = ['North', 'East', 'North-East', 'Park Facing', 'Corner'];
  const facing = facings[i % 5];
  const isCorner = facing === 'Corner' || num % 11 === 1 || num % 11 === 0;
  const isParkFacing = facing === 'Park Facing' || [5, 14, 22, 35, 44, 53].includes(num);
  const roadWidth = (num % 3 === 0 || isCorner) ? '33 ft Main Arterial Road' : '11 ft Wide Internal Lane';

  return {
    id: `plot-${num}`,
    plotNumber: `Plot ${num}`,
    number: num,
    block,
    sizeSqYd: size,
    dimensions: dimensionsMap[size] || '30\' × 50\'',
    facing,
    roadWidth,
    status: 'phase1_enquiry',
    statusLabel: 'Phase 1 Enquiry Open',
    priceEstimate: `Indicative ${plotPricingMap[size] || '₹36.0L'}*`,
    enquiryNote: 'Individual boundary demarcation and registry terms confirmed during private on-site walk.',
    isCorner,
    isParkFacing
  };
});

export const plotsSummary = {
  totalPlots: 64,
  blocks: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'],
  statusNote: 'Phase 1 Pre-Launch Enquiry Open across all 6 Blocks (120 to 425 sq. yd.)',
  disclaimer: 'Plot dimensions and block demarcations are derived from approved CAD master layout. Individual availability and registration terms confirmed on site.',
  minSizeSqYd: 120,
  maxSizeSqYd: 425,
  internalRoads: '11 ft internal lanes to 33 ft wide main arterial road',
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
    startingPriceEstimate: '₹25L* Indicative (Confirmed on site walk)',
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
    distance: '3.5 km',
    travelTime: '5 mins drive',
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
    question: 'Where exactly is the Senior Living Citizen Foundation located?',
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
    answer: 'You can connect directly with our advisory desk on WhatsApp or Call at +91 99999558447 or visit our corporate office at Yoffices Tower, Opp. Ramada Hotel, Sector-45 Gurugram, Haryana. We also arrange car pickup from Delhi NCR.'
  }
];
