import {
  ResidenceUnit,
  PropertyFloor,
  EcosystemPillar,
  LocationLandmark,
  RoadmapMilestone
} from '@/types';

// ============================================================================
// 1. MASTER PROJECT METADATA & SPECS (SENIOR LIVING CITIZEN FOUNDATION)
// ============================================================================
export const projectOverview = {
  name: 'Senior Living Citizen Foundation',
  legalName: 'Senior Living Citizen Foundation · Haryana',
  tagline: 'A Home for the Second Half of Life',
  subtitle: 'A purpose-built plotted township and multi-speciality Ayurvedic hospital community near Reliance MET City, SH-22, Jhajjar, Haryana.',
  locationShort: 'Near Reliance MET City, SH-22, Kheri Asra, Jhajjar, Haryana 124104',
  googleMapsUrl: 'https://maps.app.goo.gl/bpqroduFspTJVqDfA?g_st=ic',
  googleMapsPlusCode: 'MP5G+4X Kheri Asra, Haryana 124104',
  siteOfficeAddress: 'Yoffices Tower, Opp. Ramada Hotel, Sector-45 Gurugram, Haryana',
  architectFirm: 'The Vision Architects, Farrukhnagar, Gurugram 122506',
  status: 'Plotted Sanctuary & G+2 Hospital Development',
  totalPlots: 64,
  plotBlocks: '6 Blocks (Block A to Block F)',
  plotSizes: '120 sq. yd. to 425 sq. yd.',
  hospitalAreaSqFt: '30,000 sq. ft. (G+2 Structure)',
  hospitalFootprint: '117\'-10" × 138\' L-Shaped Footprint',
  apartmentTypes: '1 BHK (Compact ~330 sq.ft.) & 2 BHK (Family ~580 sq.ft.)',
  siteOfficePhone: '+91 99999558447',
  salesWhatsApp: '+91 99999558447',
  inquiryEmail: 'Yoffices@gmail.com',
  disclaimer: 'Architectural drawings, dimensions, plot demarcations, and hospital room allocations shown are exact representations from approved CAD floor plans by The Vision Architects.'
};

// ============================================================================
// 2. REAL LOCATION & CONNECTIVITY (KHERI ASRA / JHAJJAR / RELIANCE MET CITY)
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
    name: 'On-Site G+2 Multi-Speciality Ayurvedic Hospital',
    distance: 'Within Township (0 km)',
    travelTime: '1 min walk',
    significance: '30,000 sq. ft. hospital with Dialysis, OT, ICU, CT/MRI, OPD, and 9 Panchakarma suites.'
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
// 3. EXACT 3-FLOOR CAD HOSPITAL & WELLNESS INFRASTRUCTURE (117'-10" x 138')
// ============================================================================
export const propertyFloors: PropertyFloor[] = [
  {
    id: 'ground',
    level: 1,
    name: 'Floor 1 — Clinical Diagnostics, Critical Care & Inpatient Rooms',
    tagline: 'G+2 Hospital Level 1: Dialysis, OT, ICU, CT/MRI & 9 Private Rooms',
    description: 'Ground clinical level featuring advanced imaging, emergency surgery, intensive care, and inpatient recovery wards.',
    totalAreaSqFt: 11500,
    unitIds: ['01', '02', '03'],
    zones: [
      {
        name: 'Dialysis Center',
        category: 'clinical',
        badge: '20\'-0" × 30\'-0"',
        description: 'Dedicated multi-station renal dialysis wing with buffer prep area.'
      },
      {
        name: 'Operation Theater (OT Area)',
        category: 'clinical',
        badge: '18\'-0" × 25\'-7"',
        description: 'Laminar airflow surgical suite with sterile scrub and prep zones.'
      },
      {
        name: 'ICU Critical Care Area',
        category: 'clinical',
        badge: '18\'-0" × 20\'-0"',
        description: 'High-dependency intensive monitoring unit with 24x7 medical gas lines.'
      },
      {
        name: 'X-Ray & Ultrasound',
        category: 'clinical',
        badge: '16\'-0" × 18\'-0"',
        description: 'Digital radiography and ultrasonography diagnostic suites.'
      },
      {
        name: 'Cathlab Wing',
        category: 'clinical',
        badge: '20\'-0" × 26\'-4"',
        description: 'Cardiac catheterization laboratory for interventional cardiology.'
      },
      {
        name: 'CT Scan & MRI Suites',
        category: 'clinical',
        badge: 'CT: 17\'-10"×20\'-8" | MRI: 17\'-10"×28\'-0"',
        description: 'Magnetic resonance imaging and computed tomography diagnostic imaging wing.'
      },
      {
        name: '9 Private Inpatient Rooms',
        category: 'residential',
        badge: '9\'-4" × 10\'-8" (9 Rooms)',
        description: 'Private patient recovery chambers (6 rooms in top block, 3 in lower block).'
      },
      {
        name: '4 Semi-Private Patient Rooms',
        category: 'residential',
        badge: '12\'-6" × 14\'-8" (4 Rooms)',
        description: 'Dual-occupancy recovery rooms along the left 10\'-0" wide corridor.'
      },
      {
        name: 'He & She General Wards',
        category: 'clinical',
        badge: '19\'-0" × 28\'-10" Each',
        description: 'Separate Male & Female recovery wards with dedicated 6\'-6" × 10\'-0" washrooms.'
      }
    ]
  },
  {
    id: 'first',
    level: 2,
    name: 'Floor 2 — Reception, 6 OPDs, 9 Panchakarma Suites & Yoga Hall',
    tagline: 'G+2 Hospital Level 2: Ayurvedic Healing, Cafeteria & Emergency',
    description: 'The wellness and consultation floor featuring grand reception, multi-purpose yoga hall, doctor OPDs, and authentic Panchakarma chambers.',
    totalAreaSqFt: 10800,
    unitIds: ['04', '05', '06'],
    zones: [
      {
        name: 'Grand Reception & Waiting Lounge',
        category: 'lifestyle',
        badge: '23\'-7" × 50\'-1"',
        description: 'Spacious central waiting hall with two 10\'-0" wide main entrance gates.'
      },
      {
        name: 'Two On-Site Pharmacy Stores',
        category: 'clinical',
        badge: '15\'-0" × 20\'-0" Each',
        description: 'Fully stocked Ayurvedic and allopathic prescription medication pharmacies.'
      },
      {
        name: '6 Doctor OPD Consultation Rooms',
        category: 'clinical',
        badge: 'OPD-1 to OPD-6',
        description: 'Chambers for visiting Vaidyas, geriatric physicians, and super-specialists.'
      },
      {
        name: 'Multi-Purpose Hall & Yoga Center',
        category: 'wellness',
        badge: '54\'-2" × 49\'-0"',
        description: 'Grand wellness hall with separate male/female staff rooms, changing areas & toilets.'
      },
      {
        name: 'Doctor-Supervised Cafeteria',
        category: 'lifestyle',
        badge: '15\'-0" × 26\'-10"',
        description: 'Satvik hygienic dining room serving personalized organic dietary meals.'
      },
      {
        name: 'Physio & Acupuncture Room',
        category: 'wellness',
        badge: '15\'-0" × 20\'-0"',
        description: 'Geriatric rehabilitation, acupuncture, and joint mobility therapy center.'
      },
      {
        name: '9 Panchakarma Therapy Rooms',
        category: 'wellness',
        badge: '3 Large (10\'×20\') + 6 Suites (10\'×11\')',
        description: 'Authentic Ayurvedic treatment rooms for Abhyanga, Shirodhara, and Kizhi therapies.'
      },
      {
        name: '24×7 Emergency Response Bay',
        category: 'clinical',
        badge: '18\'-0" × 19\'-0"',
        description: 'Direct ground gate entrance for instant triage and emergency resuscitation.'
      }
    ]
  },
  {
    id: 'second',
    level: 3,
    name: 'Floor 3 — 50-Seat Auditorium, Swimming Pool, Library & Rooftop Deck',
    tagline: 'G+2 Hospital Level 3: Community, Research, Pool & Open Sky Deck',
    description: 'Community and lifestyle level featuring open amphitheater, swimming pool, quiet library, research hall, and open roof terrace.',
    totalAreaSqFt: 9800,
    unitIds: ['07', '08', '09'],
    zones: [
      {
        name: '50-Seat Open-Air Amphitheater',
        category: 'lifestyle',
        badge: '50 Seating with Steps',
        description: 'Stepped open auditorium for classical music concerts, bhajan satsang, and cinema nights.'
      },
      {
        name: 'Senior Mobility Swimming Pool',
        category: 'wellness',
        badge: '10\'-0" × 12\'-0"',
        description: 'Heated hydrotherapy water pool for arthritis relief and gentle swimming.'
      },
      {
        name: 'Semi-Shade Recreational Area',
        category: 'lifestyle',
        badge: '20\'-4" × 50\'-0"',
        description: 'Covered open-air pavilion for morning chess, card games, and evening gatherings.'
      },
      {
        name: 'Panoramic Open Roof Terrace',
        category: 'lifestyle',
        badge: '39\'-2" × 56\'-11"',
        description: 'Expansive open sky deck offering fresh air and unobstructed views of Haryana green fields.'
      },
      {
        name: 'Geriatric Library & Reading Room',
        category: 'lifestyle',
        badge: '17\'-10" × 20\'-8"',
        description: 'Quiet literature study room with large-print books and digital archives.'
      },
      {
        name: 'Conference Room',
        category: 'lifestyle',
        badge: '20\'-0" × 26\'-2"',
        description: 'Meeting salon for wellness symposiums and family community interactions.'
      },
      {
        name: 'Health Research Room',
        category: 'clinical',
        badge: '18\'-0" × 25\'-4"',
        description: 'Clinical documentation and Ayurvedic longevity research wing.'
      },
      {
        name: '7 Upper Inpatient & Living Rooms',
        category: 'residential',
        badge: '4 Rooms (11\'×18\') + 3 Rooms (9\'4"×20\')',
        description: 'Quiet upper-level private suites with direct terrace access.'
      },
      {
        name: 'Laundry & Central Kitchen',
        category: 'lifestyle',
        badge: 'Laundry (24\'10"×30\'4") | Kitchen (15\'×20\')',
        description: 'Full commercial linen laundry and industrial hygienic dietary kitchen.'
      }
    ]
  }
];

// ============================================================================
// 4. RESIDENCES (1 BHK & 2 BHK APARTMENTS + HOSPITAL WING SUITES)
// ============================================================================
export const residenceUnits: ResidenceUnit[] = [
  {
    id: '1bhk-apt',
    unitNumber: '1 BHK Senior Apartment',
    type: '1-bhk',
    typeName: '1 BHK Compact Senior Suite (Type A)',
    floor: 'ground',
    floorNumber: 0,
    floorName: 'G+2 Apartments + Stilt',
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'East / Garden Facing',
    status: 'available',
    releasePhase: 'Active Release (Phase 1)',
    badge: '🟢 Available for Booking',
    startingPriceEstimate: 'Attractive Pre-Launch Price',
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
    id: '2bhk-apt',
    unitNumber: '2 BHK Senior Apartment',
    type: '1-bhk', // 2BHK family
    typeName: '2 BHK Family Senior Residence (Type B)',
    floor: 'first',
    floorNumber: 1,
    floorName: 'G+2 Apartments + Stilt',
    superAreaSqFt: 580,
    carpetAreaSqFt: 470,
    facing: 'North-East Corner View',
    status: 'available',
    releasePhase: 'Active Release (Phase 1)',
    badge: '🟢 Available for Booking',
    startingPriceEstimate: 'Attractive Pre-Launch Price',
    monthlyCarePackageEstimate: 'Customized Wellness Package',
    seniorSafetyFeatures: [
      'Single-floor 6-room expansive layout for family visits and grandchildren stays',
      'Attached and Common elder-friendly toilets with grab rails and anti-scald mixing',
      'Dual elevator access with backup generator connectivity',
      'Wide 4ft entrance and corridors for effortless wheelchair movement'
    ],
    keyHighlights: [
      'Two full bedrooms (Master 10\'0"×10\'10" & 2nd Bedroom 10\'0"×10\'0")',
      'Spacious Living / Dining area (9\'0" × 14\'4")',
      'Kitchen (5\'0" × 9\'0") with dry and wet prep zones',
      'Two full bathrooms (Attached 4\'0"×10\'0" & Common 4\'0"×10\'0")'
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        dimensions: '10\'0" × 10\'10"',
        highlight: 'En-suite bath, dual light windows, senior acoustic soundproofing.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: '2nd Guest / Family Bedroom',
        dimensions: '10\'0" × 10\'0"',
        highlight: 'Comfortable guest room for visiting children and caregivers.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Living & Dining Hall',
        dimensions: '9\'0" × 14\'4"',
        highlight: 'Spacious family seating for 6 guests and prayer corner.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Attached & Common Baths',
        dimensions: '4\'0" × 10\'0" (Each)',
        highlight: 'Complete wet-room design with folding shower seat and emergency call cord.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'hospital-private',
    unitNumber: 'Hospital Private Care Suite',
    type: '1-rk',
    typeName: 'Hospital Private Inpatient Suite (9 Units Available)',
    floor: 'ground',
    floorNumber: 0,
    floorName: 'Floor 1 — Hospital Wing',
    superAreaSqFt: 180,
    carpetAreaSqFt: 100,
    facing: 'Internal Courtyard Corridor',
    status: 'available',
    releasePhase: 'Hospital Inpatient Wing',
    badge: '🟢 Hospital Floor 1',
    startingPriceEstimate: 'Daily / Monthly Medical Care Rate',
    monthlyCarePackageEstimate: 'Full Nursing & Physician Care',
    seniorSafetyFeatures: [
      'Exact 9\'-4" × 10\'-8" clinical dimensions from CAD drawing',
      'Immediate adjacency to ICU (18\'×20\'), OT (18\'×25\'7") and Dialysis (20\'×30\')',
      'Direct nurse station communication terminal next to bedside',
      'Piped medical oxygen and vacuum suction conduits'
    ],
    keyHighlights: [
      'Designed for post-operative recovery, chronic care, or Ayurvedic therapies',
      'Dedicated attendants and daily geriatric rounds by senior Vaidyas & doctors',
      'Located in ground hospital wing with 10\'-0" wide stretcher-ready corridors'
    ],
    rooms: [
      {
        name: 'Clinical Private Chamber',
        dimensions: '9\'4" × 10\'8"',
        highlight: 'Full medical bed with attendant sofa and vitals monitoring console.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
  }
];

// ============================================================================
// 5. 64 RESIDENTIAL PLOTS DATA (BLOCKS A TO F)
// ============================================================================
export const plotsSummary = {
  totalPlots: 64,
  blocks: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'],
  availableCount: 42,
  onHoldCount: 12,
  soldCount: 10,
  minSizeSqYd: 120,
  maxSizeSqYd: 425,
  internalRoads: '11 ft internal lanes to 33 ft wide main arterial road',
  greenBelt: '5 ft & 6 ft continuous green buffer zones along boundaries',
  mandirDistance: '5 mins walking distance from every plot'
};

// ============================================================================
// 6. MODULAR 3-PILLAR ECOSYSTEM
// ============================================================================
export const ecosystemPillars: EcosystemPillar[] = [
  {
    id: 'healthcare',
    title: 'G+2 Multi-Speciality Ayurvedic Hospital (30k Sq. Ft.)',
    badge: '30,000 Sq. Ft. On-Site',
    tagline: 'A full G+2 hospital right within the township gates — the doctor is your neighbour.',
    description: 'Designed so families never have to travel across town for medical care. Complete hospital infrastructure on-site with emergency bay, OT, ICU, Dialysis, CT/MRI, and 24x7 pharmacies.',
    disclaimer: 'Hospital facility designed by The Vision Architects (117\'-10" × 138\' footprint) conforming to NABH clinical zoning standards.',
    items: [
      {
        title: 'Dialysis Center & ICU Area',
        subtitle: '20\'×30\' Dialysis wing and 18\'×20\' ICU intensive care suite with continuous oxygen monitoring.',
        iconName: 'Activity',
        highlight: '24×7 Critical Care',
        status: 'confirmed'
      },
      {
        title: 'Full Imaging: CT Scan, MRI & Cathlab',
        subtitle: 'In-house CT Scan (17\'10"×20\'8"), MRI (17\'10"×28\'0"), X-Ray/Ultrasound and Cathlab (20\'×26\'4").',
        iconName: 'Siren',
        highlight: 'Zero Travel Diagnostics',
        status: 'confirmed'
      },
      {
        title: '6 Doctor OPD Rooms & 2 Pharmacies',
        subtitle: 'Two 15\'×20\' pharmacy stores and 6 consultation chambers on Floor 2.',
        iconName: 'Stethoscope',
        highlight: 'Daily Physician Rounds',
        status: 'confirmed'
      },
      {
        title: 'Inpatient Private & Semi-Private Rooms',
        subtitle: '9 Private rooms (9\'4"×10\'8") and 4 Semi-private rooms (12\'6"×14\'8") on Floor 1, plus 7 upper suites.',
        iconName: 'ShieldCheck',
        highlight: 'Dedicated Attendant Care',
        status: 'confirmed'
      }
    ]
  },
  {
    id: 'ayurveda',
    title: 'Authentic Ayurvedic Longevity & Panchakarma',
    badge: 'Vedic Healing Sanctuary',
    tagline: 'Time-tested Vedic therapies engineered for active senior vitality and joint mobility.',
    description: 'Floor 2 houses 9 dedicated Panchakarma rooms, acupuncture chambers, a 54\'×49\' yoga center, and organic Satvik dining.',
    disclaimer: 'Ayurvedic treatments administered by certified Kerala Vaidyas and geriatric wellness therapists.',
    items: [
      {
        title: '9 Panchakarma Therapy Rooms',
        subtitle: 'Authentic Abhyanga, Shirodhara, and Kizhi therapy suites with timber treatment tables.',
        iconName: 'Sparkles',
        highlight: 'Arthritis & Joint Relief',
        status: 'confirmed'
      },
      {
        title: '54\' × 49\' Yoga & Prānāyāma Hall',
        subtitle: 'Grand multi-purpose yoga center with dedicated changing rooms and morning breathing sessions.',
        iconName: 'Heart',
        highlight: 'Balance & Mobility',
        status: 'confirmed'
      },
      {
        title: 'Physiotherapy & Acupuncture Suite',
        subtitle: '15\' × 20\' rehabilitation studio focusing on fall prevention and stroke recovery.',
        iconName: 'Zap',
        highlight: 'Senior Rehab Focus',
        status: 'confirmed'
      },
      {
        title: 'Satvik Dietary Cafeteria',
        subtitle: '15\' × 26\'10" doctor-supervised dining serving fresh Ayurvedic vegetarian cuisine.',
        iconName: 'Globe',
        highlight: 'Tailored Nutrition',
        status: 'confirmed'
      }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Plotted Sanctuary, Mandir & Community Lifestyle',
    badge: 'Walkable Community',
    tagline: 'A sacred, tranquil township where the mandir is a 5-minute stroll away.',
    description: '64 residential plots, community mandir, 50-seat open amphitheater, swimming pool, and quiet geriatric library.',
    disclaimer: 'Township master plan features 11ft to 33ft wide pedestrian-first streets and boundary green belts.',
    items: [
      {
        title: 'Community Mandir',
        subtitle: 'Sacred temple sited at the western edge — within peaceful 5-minute walking distance from every plot.',
        iconName: 'Sparkles',
        highlight: 'Daily Aarti & Satsang',
        status: 'confirmed'
      },
      {
        title: '50-Seat Open Amphitheater',
        subtitle: 'Floor 3 stepped open auditorium for classical musical evenings, cinema retrospectives, and festivals.',
        iconName: 'Tv',
        highlight: 'Weekly Social Gatherings',
        status: 'confirmed'
      },
      {
        title: 'Senior Mobility Swimming Pool',
        subtitle: '10\' × 12\' heated hydrotherapy pool designed for low-impact joint movement.',
        iconName: 'Radio',
        highlight: 'Zero-Impact Swimming',
        status: 'confirmed'
      },
      {
        title: '64 Residential Plots (Blocks A–F)',
        subtitle: 'Plots from 120 to 425 sq. yd. along 33ft wide roads with 5ft-6ft green belts.',
        iconName: 'Users',
        highlight: 'Build Your Own Home',
        status: 'confirmed'
      }
    ]
  }
];

// ============================================================================
// 7. DEVELOPMENT ROADMAP
// ============================================================================
export const developmentRoadmap: RoadmapMilestone[] = [
  {
    phase: 'Phase 01',
    title: 'Land Acquisition & Architectural Planning',
    timeline: 'Completed • The Vision Architects',
    status: 'completed',
    description: '30,000 sq. ft. G+2 Hospital drawings (117\'-10" × 138\') and 64-plot township master plan finalized.',
    deliverables: [
      'Approved CAD floor plans for Floor 1, 2, and 3',
      '64 residential plots layout across Blocks A–F',
      'Universal senior accessibility and road design audits'
    ]
  },
  {
    phase: 'Phase 02',
    title: 'Groundwork & Road Infrastructure',
    timeline: 'In Progress • Active Milestone',
    status: 'in-progress',
    description: '33ft main road demarcations, perimeter green buffers, and foundation piling for hospital structure.',
    deliverables: [
      'Site foundation & boundary wall execution',
      'Plot allocations opened for Block A to Block F',
      'Site office active at Sector-45 Gurugram'
    ]
  },
  {
    phase: 'Phase 03',
    title: 'Hospital Superstructure & Apartment Fit-outs',
    timeline: 'Upcoming • Q1 2027',
    status: 'upcoming',
    description: 'G+2 structural framework, medical gas piping, elevator installations, and stilt apartment framing.',
    deliverables: [
      'G+2 concrete frame & rooftop auditorium deck',
      'Panchakarma timber suites fabrication',
      '2 Lifts per building installation'
    ]
  },
  {
    phase: 'Phase 04',
    title: 'Hospital Activation & Township Handover',
    timeline: 'Target • Q4 2027',
    status: 'upcoming',
    description: 'Possession of plots & apartments, full activation of Ayurvedic hospital, and Mandir inauguration.',
    deliverables: [
      'Plot registries and home construction handovers',
      'Ayurvedic hospital OPD & emergency triage launch',
      'Community Mandir pran pratishtha ceremony'
    ]
  }
];

// ============================================================================
// 8. FAQS
// ============================================================================
export const propertyFaqs = [
  {
    question: 'Where exactly is the Senior Living Citizen Foundation located?',
    answer: 'The project is located in Kheri Asra, near Reliance MET City (Model Economic Township), just off State Highway 22 (SH-22), Jhajjar, Haryana 124104. It offers seamless highway connectivity to Gurugram, Farrukhnagar, and Delhi.'
  },
  {
    question: 'Is this an old age home or a residential township?',
    answer: 'This is a premium plotted township and apartment sanctuary offering freehold residential plots (120 to 425 sq. yd.) and 1BHK/2BHK apartments, built around an on-premise 30,000 sq. ft. G+2 Multi-Speciality Ayurvedic Hospital and Community Mandir.'
  },
  {
    question: 'What facilities are in the on-site G+2 Hospital building?',
    answer: 'The 30,000 sq. ft. hospital building includes Dialysis, OT, ICU, CT Scan, MRI, Cathlab, 9 Private Inpatient Rooms, 4 Semi-Private Rooms, 6 Doctor OPDs, 2 Pharmacy stores, 9 Panchakarma therapy suites, a 54\'×49\' Yoga center, a 50-seat open amphitheater, swimming pool, library, and cafeteria.'
  },
  {
    question: 'What plot and apartment options are available?',
    answer: 'There are 64 residential plots across 6 blocks (Blocks A to F) with sizes from 120 sq. yd. to 425 sq. yd. We also offer G+2 Senior Apartments with Stilt parking and dual lifts in 1 BHK (~330 sq. ft.) and 2 BHK (~580 sq. ft.) configurations.'
  },
  {
    question: 'How can I schedule a site visit or get price details?',
    answer: 'You can connect directly with our sales team on WhatsApp / Call at +91 99999558447 or visit our sales office at Yoffices Tower, Opp. Ramada Hotel, Sector-45 Gurugram, Haryana.'
  }
];
