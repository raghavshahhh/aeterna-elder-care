import {
  ResidenceUnit,
  PropertyFloor,
  EcosystemPillar,
  LocationLandmark,
  RoadmapMilestone
} from '@/types';

// ============================================================================
// 1. MASTER PROJECT METADATA & SPECS
// ============================================================================
export const projectOverview = {
  name: 'Aeterna Sanjeevani Sanctuary',
  legalName: 'Aeterna Senior Living & Ayurvedic Healthtech Retreat',
  tagline: 'A New Standard of Living, Wellness & Care',
  subtitle: 'An upcoming luxury residential community seamlessly integrated with an on-premise Ayurvedic hospital, continuous clinical monitoring, and curated senior hospitality.',
  locationShort: 'Delhi NCR Green Belt (Sohna–Gurgaon Corridor)',
  status: 'Upcoming Project • Early Registration Phase',
  totalUnitsPlanned: 9,
  currentPhaseAvailable: 3, // Units 01, 02, 03
  superBuiltUpAreaSqFt: '35,000+ sq. ft.',
  levels: 'Stilt + Ground + 2 Floors + Panoramic Rooftop Deck',
  architecturalStyle: 'Modern Biophilic Healing Architecture & Barrier-Free Senior Design',
  expectedPossession: 'Q4 2027 (Pre-launch Booking Now Open)',
  siteOfficePhone: '+91 98101 44882',
  salesWhatsApp: '+91 98101 44882',
  inquiryEmail: 'residences@aeternacare.com',
  disclaimer: 'Artistic impressions, floor layouts, dimensions, and planned amenities shown are conceptual representations for pre-launch visualization. Final specifications subject to official architectural approvals.'
};

// ============================================================================
// 2. REAL LOCATION & CONNECTIVITY
// ============================================================================
export const locationLandmarks: LocationLandmark[] = [
  {
    category: 'hospital',
    name: 'Multi-Speciality Emergency Hospital Hub',
    distance: '3.2 km',
    travelTime: '6 mins drive',
    significance: 'Rapid triage transfer protocol with direct 24x7 ambulance access.'
  },
  {
    category: 'expressway',
    name: 'Delhi–Mumbai Expressway & Sohna Elevated Corridor',
    distance: '1.8 km',
    travelTime: '4 mins drive',
    significance: 'Signal-free direct connectivity to Cyber City, Golf Course Road & IGI Airport.'
  },
  {
    category: 'nature',
    name: 'Aravalli Biodiversity & Forest Buffer Zone',
    distance: 'Adjacent (0 km)',
    travelTime: 'Walking distance',
    significance: 'Zero high-density traffic noise, pristine air quality index (AQI), and morning bird song.'
  },
  {
    category: 'transit',
    name: 'IGI International Airport (Terminal 3)',
    distance: '34 km',
    travelTime: '38 mins drive',
    significance: 'Effortless transit for NRI family members and visiting children.'
  }
];

// ============================================================================
// 3. MASTER PLAN & FLOORS ARCHITECTURE
// ============================================================================
export const propertyFloors: PropertyFloor[] = [
  {
    id: 'ground',
    level: 0,
    name: 'Ground Floor — Clinical Infrastructure & Residences 01–03',
    tagline: 'Immediate Level Medical Support & Private Garden Suites',
    description: 'Houses primary clinical triage, diagnostic support wings, dedicated pharmacy, emergency bay, along with the first release of 3 luxury senior suites with direct veranda access.',
    totalAreaSqFt: 11200,
    unitIds: ['01', '02', '03'],
    zones: [
      {
        name: 'Residences 01, 02, 03',
        category: 'residential',
        badge: '🟢 Phase 1 Available',
        description: 'Prime ground-access 1 BHK and 1 RK suites with private terrace buffer.'
      },
      {
        name: 'Clinical Diagnostics & Emergency',
        category: 'clinical',
        badge: 'Planned Clinical Wing',
        description: 'Emergency assessment bay, X-Ray/Ultrasound, Dialysis & sample collection.'
      },
      {
        name: 'ICU & High-Dependency Care',
        category: 'clinical',
        badge: 'Planned Critical Care',
        description: 'Post-acute clinical observation suite with 24x7 oxygen & nursing console.'
      },
      {
        name: 'On-Site 24x7 Pharmacy & Triage',
        category: 'clinical',
        badge: 'Medical Logistics',
        description: 'Temperature-controlled medication locker, pharmacy & caregiver briefing desk.'
      }
    ]
  },
  {
    id: 'first',
    level: 1,
    name: 'First Floor — Ayurvedic Healing, OPD & Residences 04–06',
    tagline: 'Holistic Rejuvenation, Consultation Clinics & Wellness Suites',
    description: 'Dedicated to traditional Ayurvedic therapy rooms, Panchakarma rejuvenation suites, Doctor OPD consultation rooms, physiotherapy center, and organic wellness cafeteria.',
    totalAreaSqFt: 10800,
    unitIds: ['04', '05', '06'],
    zones: [
      {
        name: 'Residences 04, 05, 06',
        category: 'residential',
        badge: '🟡 Future Phase 2',
        description: 'Elevated suites overlooking the central herbal garden & water courtyard.'
      },
      {
        name: 'Panchakarma & Abhyanga Suites',
        category: 'wellness',
        badge: 'Ayurvedic Therapy',
        description: 'Four specialized timber therapy suites with steam chambers and herbal baths.'
      },
      {
        name: 'Senior Doctor OPD & Physio Center',
        category: 'clinical',
        badge: 'Consultation & Rehab',
        description: 'Geriatric physician chambers, acupuncture room, and mobility rehab gym.'
      },
      {
        name: 'Satvik Dining & Organic Cafe',
        category: 'lifestyle',
        badge: 'Nutritional Care',
        description: 'Doctor-supervised dietary dining serving fresh Ayurvedic and low-sodium meals.'
      }
    ]
  },
  {
    id: 'second',
    level: 2,
    name: 'Second Floor — Community, Library & Residences 07–09',
    tagline: 'Quiet Contemplation, Culture & Elevated Suites',
    description: 'Designed for intellectual stimulation and social engagement, featuring a comprehensive geriatric wellness library, research reading room, conference salon, and private suites.',
    totalAreaSqFt: 10400,
    unitIds: ['07', '08', '09'],
    zones: [
      {
        name: 'Residences 07, 08, 09',
        category: 'residential',
        badge: '🟡 Future Phase 2',
        description: 'Top-tier tranquil residences with panoramic views of the Aravalli skyline.'
      },
      {
        name: 'Geriatric Library & Digital Media Hub',
        category: 'lifestyle',
        badge: 'Lifelong Learning',
        description: 'Large-print literature collection, audio-book booths, and tech support kiosk.'
      },
      {
        name: 'Conference & Health Research Room',
        category: 'lifestyle',
        badge: 'Community Space',
        description: 'Multi-purpose hall for guest lectures, family virtual calls, and workshops.'
      },
      {
        name: 'Central Kitchen & Laundry Operations',
        category: 'lifestyle',
        badge: 'Hospitality Ops',
        description: 'Industrial hygienic kitchen & sanitized laundry wing for daily linen care.'
      }
    ]
  },
  {
    id: 'rooftop',
    level: 3,
    name: 'Rooftop Sky Deck — Pool, Open Auditorium & Sky Garden',
    tagline: 'Open Skies, Gentle Movement & Community Celebrations',
    description: 'An open-air retreat featuring a temperature-regulated hydrotherapy splash pool, a 50-seat semi-shaded open-air amphitheater for musical soirees, and a fragrant reflexology walking loop.',
    totalAreaSqFt: 8600,
    unitIds: [],
    zones: [
      {
        name: '50-Seat Open-Air Amphitheater',
        category: 'lifestyle',
        badge: 'Cultural Evenings',
        description: 'Acoustically treated amphitheater for classical concerts, cinema nights, and satsang.'
      },
      {
        name: 'Hydrotherapy Pool & Sun Deck',
        category: 'wellness',
        badge: 'Low-Impact Movement',
        description: 'Gentle warm-water mobility pool with hoist assist and submerged walking rails.'
      },
      {
        name: 'Reflexology Herbal Sky Garden',
        category: 'wellness',
        badge: 'Sensory Therapy',
        description: 'Cobblestone walking track surrounded by Tulsi, Neem, Lemongrass, and Lavender.'
      },
      {
        name: 'Semi-Shaded Yoga & Prānāyāma Pavilion',
        category: 'wellness',
        badge: 'Morning Wellness',
        description: 'East-facing bamboo pavilion designed for sunrise breathing exercises and meditation.'
      }
    ]
  }
];

// ============================================================================
// 4. RESIDENCE UNITS INVENTORY (01 TO 09)
// ============================================================================
export const residenceUnits: ResidenceUnit[] = [
  {
    id: '01',
    unitNumber: 'Residence 01',
    type: '1-bhk',
    typeName: '1 BHK Luxury Care Suite',
    floor: 'ground',
    floorNumber: 0,
    floorName: 'Ground Floor',
    superAreaSqFt: 885,
    carpetAreaSqFt: 620,
    facing: 'East Facing — Morning Golden Light',
    status: 'available',
    releasePhase: 'Phase 1 (Current Release)',
    badge: '🟢 Available for Early Booking',
    startingPriceEstimate: '₹48.5 Lakhs (Pre-launch Price)',
    monthlyCarePackageEstimate: '₹18,500/mo (Includes All Medical Concierge)',
    seniorSafetyFeatures: [
      'Zero-threshold barrier-free entrance & anti-skid vitrified Italian tiles',
      'Dual emergency pull cords in master bedroom and en-suite washroom',
      'Wide 42-inch doorways to accommodate wheelchairs and stretcher access',
      'Motion-activated night path illumination between bed and bathroom',
      'Ergonomic lever handles and anti-scald thermostatically controlled faucets',
      'Continuous wall-integrated grab bars and shower seating console'
    ],
    keyHighlights: [
      'Direct access to landscaped medicinal courtyard & morning veranda',
      'Spacious living room designed for family hosting & video conferencing',
      'Full kitchenette with induction cooker & senior-accessible low shelving',
      'Direct fiber-connected nurse calling terminal next to bedside'
    ],
    rooms: [
      {
        name: 'Master Suite Bedroom',
        dimensions: '14 ft × 12 ft',
        highlight: 'Medical bed compatible, acoustic soundproofing, emergency pull-cord at bedside.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Light-Filled Living Salon',
        dimensions: '16 ft × 13 ft',
        highlight: 'Panoramic double-glazed french windows looking out to the herbal garden.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Barrier-Free Wellness Bathroom',
        dimensions: '8 ft × 7 ft',
        highlight: 'Zero-step shower entry, wall-mounted folding bench, heated bidet washlet.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Kitchenette & Breakfast Bar',
        dimensions: '8 ft × 6 ft',
        highlight: 'Electric safe induction hob, automatic water shutoff, under-counter refrigeration.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '02',
    unitNumber: 'Residence 02',
    type: '1-rk',
    typeName: '1 RK Executive Wellness Studio',
    floor: 'ground',
    floorNumber: 0,
    floorName: 'Ground Floor',
    superAreaSqFt: 540,
    carpetAreaSqFt: 385,
    facing: 'North-East — Soft Diffused Daylight',
    status: 'available',
    releasePhase: 'Phase 1 (Current Release)',
    badge: '🟢 Available for Early Booking',
    startingPriceEstimate: '₹32.0 Lakhs (Pre-launch Price)',
    monthlyCarePackageEstimate: '₹14,500/mo (Includes All Medical Concierge)',
    seniorSafetyFeatures: [
      'Smart wall-integrated SOS panic buttons at bedside and washroom',
      'Slip-resistant textured flooring throughout living & wet zones',
      'Wide slide-to-open safety doors with biometric / caregiver override locks',
      'Rounded corner furniture design preventing accidental impact bruises',
      'Voice-enabled lighting and temperature smart thermostat'
    ],
    keyHighlights: [
      'Ultra-efficient studio layout with dedicated reading lounge corner',
      'Compact hospitality pantry with electric kettle & beverage console',
      'Proximity to ground clinical wing (less than 20 meters walk)',
      'Private sit-out patio overlooking the manicured Bonsai terrace'
    ],
    rooms: [
      {
        name: 'Integrated Studio & Bedroom Lounge',
        dimensions: '18 ft × 14 ft',
        highlight: 'Queen-sized orthopaedic bed with integrated reading sconces and recliner armchairs.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Senior-Safe En-Suite Bath',
        dimensions: '7 ft × 6 ft',
        highlight: 'Continuous safety handrails, emergency call transmitter, thermostatic anti-scald mixing.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Hospitality Pantry Counter',
        dimensions: '6 ft × 5 ft',
        highlight: 'Ergonomic pull-out pantry, filtered RO alkaline water dispenser, quiet mini-fridge.',
        cgiImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '03',
    unitNumber: 'Residence 03',
    type: '1-bhk',
    typeName: '1 BHK Premium Corner Suite',
    floor: 'ground',
    floorNumber: 0,
    floorName: 'Ground Floor',
    superAreaSqFt: 920,
    carpetAreaSqFt: 650,
    facing: 'South-East — Dual Light Corner Elevation',
    status: 'available',
    releasePhase: 'Phase 1 (Current Release)',
    badge: '🟢 Available for Early Booking',
    startingPriceEstimate: '₹51.0 Lakhs (Pre-launch Price)',
    monthlyCarePackageEstimate: '₹19,000/mo (Includes All Medical Concierge)',
    seniorSafetyFeatures: [
      'Dual-aspect corner cross-ventilation keeping indoor air pure & fresh',
      'Direct emergency call terminal connecting directly to nurse console in 3 seconds',
      'Wide turning radius accommodating heavy mobility equipment',
      'High-contrast electrical switchplates with glow-in-dark toggles'
    ],
    keyHighlights: [
      'Largest corner floor layout with dedicated study / Pooja niche',
      'Wrap-around garden deck with shaded cane seating for morning tea',
      'Customized walk-in closet with low-height hanging rods and internal sensor lights'
    ],
    rooms: [
      {
        name: 'Corner Master Suite',
        dimensions: '15 ft × 13 ft',
        highlight: 'Dual windows overlooking private courtyard garden with soundproof double glazing.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Grand Living & Dining Room',
        dimensions: '17 ft × 14 ft',
        highlight: 'Comfortable seating for 6 guests, dedicated pooja/meditation enclave.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Luxury Geriatric Washroom',
        dimensions: '9 ft × 7 ft',
        highlight: 'Full wet-room styling with anti-slip flooring, double grab bars and heated bidet.',
        cgiImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '04',
    unitNumber: 'Residence 04',
    type: '1-rk',
    typeName: '1 RK Wellness Suite',
    floor: 'first',
    floorNumber: 1,
    floorName: 'First Floor',
    superAreaSqFt: 550,
    carpetAreaSqFt: 390,
    facing: 'North Facing — Quiet Courtyard',
    status: 'future_release',
    releasePhase: 'Phase 2 (Upcoming Release)',
    badge: '🟡 Future Release • Priority Register',
    startingPriceEstimate: 'Price on Application (Phase 2)',
    monthlyCarePackageEstimate: 'Phase 2 Pricing Structure',
    seniorSafetyFeatures: [
      'Smart emergency button grid',
      'Anti-skid surfaces & barrier-free thresholds',
      'Direct elevator access with automatic stretcher opening'
    ],
    keyHighlights: [
      'Immediate access to 1st Floor Ayurveda therapy suites & Yoga center',
      'Quiet orientation away from main driveway'
    ],
    rooms: [
      {
        name: 'Studio Chamber',
        dimensions: '18 ft × 14 ft',
        highlight: 'Airy studio overlooking central herbal plantation.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '05',
    unitNumber: 'Residence 05',
    type: '1-bhk',
    typeName: '1 BHK Herbal Balcony Suite',
    floor: 'first',
    floorNumber: 1,
    floorName: 'First Floor',
    superAreaSqFt: 890,
    carpetAreaSqFt: 625,
    facing: 'East Facing — Morning Sunshine',
    status: 'future_release',
    releasePhase: 'Phase 2 (Upcoming Release)',
    badge: '🟡 Future Release • Priority Register',
    startingPriceEstimate: 'Price on Application (Phase 2)',
    monthlyCarePackageEstimate: 'Phase 2 Pricing Structure',
    seniorSafetyFeatures: [
      'Full barrier-free accessibility suite',
      'Nurse calling intercom with 2-way audio'
    ],
    keyHighlights: [
      'Spacious covered balcony with vertical herb planters',
      'Close proximity to Satvik Dining & OPD doctors'
    ],
    rooms: [
      {
        name: 'Master Suite',
        dimensions: '14 ft × 12 ft',
        highlight: 'Sunrise balcony orientation.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '06',
    unitNumber: 'Residence 06',
    type: '1-bhk',
    typeName: '1 BHK Sunset View Suite',
    floor: 'first',
    floorNumber: 1,
    floorName: 'First Floor',
    superAreaSqFt: 910,
    carpetAreaSqFt: 640,
    facing: 'West Facing — Soothing Evening Sky',
    status: 'future_release',
    releasePhase: 'Phase 2 (Upcoming Release)',
    badge: '🟡 Future Release • Priority Register',
    startingPriceEstimate: 'Price on Application (Phase 2)',
    monthlyCarePackageEstimate: 'Phase 2 Pricing Structure',
    seniorSafetyFeatures: [
      'Anti-glare UV filtered architectural glass',
      'Emergency response wall console'
    ],
    keyHighlights: [
      'Views of the evening sunset horizon and Aravalli foothills',
      'Open plan kitchen with custom senior-height cabinetry'
    ],
    rooms: [
      {
        name: 'Master Bedroom & Living',
        dimensions: '16 ft × 14 ft',
        highlight: 'West-facing panorama with motorized thermal blackout shades.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '07',
    unitNumber: 'Residence 07',
    type: '1-rk',
    typeName: '1 RK Skyview Studio',
    floor: 'second',
    floorNumber: 2,
    floorName: 'Second Floor',
    superAreaSqFt: 560,
    carpetAreaSqFt: 400,
    facing: 'North-East — Panoramic Vista',
    status: 'future_release',
    releasePhase: 'Phase 2 (Upcoming Release)',
    badge: '🟡 Future Release • Priority Register',
    startingPriceEstimate: 'Price on Application (Phase 2)',
    monthlyCarePackageEstimate: 'Phase 2 Pricing Structure',
    seniorSafetyFeatures: [
      'Reinforced safety balustrades on private terrace',
      'Dual elevator access with backup generator'
    ],
    keyHighlights: [
      'Direct stair and elevator access to Rooftop Pool & Amphitheater',
      'Adjacent to quiet Geriatric Library'
    ],
    rooms: [
      {
        name: 'Skyview Studio',
        dimensions: '18 ft × 14 ft',
        highlight: 'High-ceiling studio room with top floor peace.',
        cgiImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '08',
    unitNumber: 'Residence 08',
    type: '1-bhk',
    typeName: '1 BHK Sky Suite Deluxe',
    floor: 'second',
    floorNumber: 2,
    floorName: 'Second Floor',
    superAreaSqFt: 935,
    carpetAreaSqFt: 660,
    facing: 'East Facing — Top Level Sunlit Suite',
    status: 'future_release',
    releasePhase: 'Phase 2 (Upcoming Release)',
    badge: '🟡 Future Release • Priority Register',
    startingPriceEstimate: 'Price on Application (Phase 2)',
    monthlyCarePackageEstimate: 'Phase 2 Pricing Structure',
    seniorSafetyFeatures: [
      'Fully soundproofed partitions for deep, undisturbed sleep',
      'Touchless smart sanitary fittings'
    ],
    keyHighlights: [
      'Expansive private terrace lounge area',
      'Premium teakwood interior finishes and textured wall panelling'
    ],
    rooms: [
      {
        name: 'Master Sky Suite',
        dimensions: '15 ft × 13 ft',
        highlight: 'Panoramic horizon views.',
        cgiImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '09',
    unitNumber: 'Residence 09',
    type: '1-bhk',
    typeName: '1 BHK Presidential Penthouse Suite',
    floor: 'second',
    floorNumber: 2,
    floorName: 'Second Floor',
    superAreaSqFt: 980,
    carpetAreaSqFt: 690,
    facing: 'South-East Corner — Complete Panoramic Ridge View',
    status: 'future_release',
    releasePhase: 'Phase 2 (Upcoming Release)',
    badge: '🟡 Future Release • Priority Register',
    startingPriceEstimate: 'Price on Application (Phase 2)',
    monthlyCarePackageEstimate: 'Phase 2 Pricing Structure',
    seniorSafetyFeatures: [
      'Exclusive direct elevator security access',
      'Integrated medical oxygen delivery conduit in bedroom wall'
    ],
    keyHighlights: [
      'Flagship residential suite of the entire development',
      'Wrap-around glass facade and private botanical balcony deck'
    ],
    rooms: [
      {
        name: 'Presidential Suite Salon',
        dimensions: '18 ft × 15 ft',
        highlight: 'Expansive entertaining living room with custom teak furnishings.',
        cgiImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    blueprint2d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    interior3dCgi: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  }
];

// ============================================================================
// 5. MODULAR 3-PILLAR ECOSYSTEM (HEALTHCARE, AYURVEDA, LIFESTYLE)
// ============================================================================
export const ecosystemPillars: EcosystemPillar[] = [
  {
    id: 'healthcare',
    title: 'Hospital-Grade Clinical Support',
    badge: 'Clinical Infrastructure',
    tagline: 'Peace of mind with hospital-level care right within your building.',
    description: 'Designed so families never have to worry about medical crises. Full clinical infrastructure planned right on the ground floor with dedicated doctors, critical care nursing, and rapid diagnostics.',
    disclaimer: 'Medical facility specifications are indicative and subject to final clinical licensing & NABH hospital empanelment.',
    items: [
      {
        title: 'Emergency Triage & Observation Wing',
        subtitle: '24×7 on-premise emergency response bay with ICU-grade monitoring & oxygen conduit.',
        iconName: 'Siren',
        highlight: 'Sub-30-Second Nurse Response',
        status: 'proposed'
      },
      {
        title: 'Geriatric Specialist OPD Clinics',
        subtitle: 'In-house senior physicians, cardiologists, neurologists, and ortho consultations on scheduled days.',
        iconName: 'Stethoscope',
        highlight: 'Zero Travel Doctor Checkups',
        status: 'proposed'
      },
      {
        title: 'Diagnostic Imaging & Dialysis Unit',
        subtitle: 'Planned sample collection lab, digital X-Ray, ultrasound, and dedicated dialysis station.',
        iconName: 'Activity',
        highlight: 'On-Premise Lab Reports',
        status: 'proposed'
      },
      {
        title: '24×7 Temperature-Controlled Pharmacy',
        subtitle: 'Continuous stocking of senior chronic medications, delivery to your suite, and pill-box management.',
        iconName: 'ShieldCheck',
        highlight: 'Automated Medicine Refills',
        status: 'proposed'
      }
    ]
  },
  {
    id: 'ayurveda',
    title: 'Ayurvedic Healing & Panchakarma',
    badge: 'Holistic Longevity',
    tagline: 'Time-tested Vedic therapies engineered for active senior vitality.',
    description: 'Rejuvenate body and spirit with authentic Ayurvedic doctors, therapeutic medicated oil treatments, specialized arthritis therapies, and tranquil meditation gardens.',
    disclaimer: 'Ayurvedic wellness treatments are customized individually following a classical Nadi Pariksha consultation.',
    items: [
      {
        title: 'Classical Panchakarma Treatment Suites',
        subtitle: 'Authentic Abhyanga, Shirodhara, and Kizhi therapies administered by trained Kerala Vaidyas.',
        iconName: 'Sparkles',
        highlight: 'Natural Pain & Joint Relief',
        status: 'proposed'
      },
      {
        title: 'Senior Yoga & Prānāyāma Sanctuary',
        subtitle: 'Gentle chair yoga, spine mobility stretching, and restorative breathing sessions every morning.',
        iconName: 'Heart',
        highlight: 'Mobility & Balance Enhancement',
        status: 'proposed'
      },
      {
        title: 'Physiotherapy & Neuro-Rehabilitation',
        subtitle: 'Post-stroke motor recovery, balance training, and fall-prevention exercise studio.',
        iconName: 'Zap',
        highlight: 'Independent Living Focus',
        status: 'proposed'
      },
      {
        title: 'Herbal Medicinal Botanical Garden',
        subtitle: 'Sensory reflexology walking trails lined with over 60 verified Ayurvedic plants and fragrant herbs.',
        iconName: 'Globe',
        highlight: 'Fresh Ozone & Sensory Calming',
        status: 'proposed'
      }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Community, Culture & Hospitality',
    badge: 'Dignified Living',
    tagline: 'A vibrant social life surrounded by like-minded intellectual peers.',
    description: 'Banish senior isolation forever. Enjoy movie soirees in the 50-seat open amphitheater, book clubs in the library, hydrotherapy in the pool, and pure Satvik dining.',
    disclaimer: 'Community facilities operate with dedicated recreation managers and hospitality coordinators.',
    items: [
      {
        title: '50-Seat Open-Air Amphitheater',
        subtitle: 'Rooftop amphitheater hosting classical musical evenings, cinema retrospectives, and cultural festivals.',
        iconName: 'Tv',
        highlight: 'Weekly Social Calendar',
        status: 'proposed'
      },
      {
        title: 'Hydrotherapy Mobility Pool',
        subtitle: 'Heated low-impact water pool designed for soothing osteo-arthritis and gentle aquatic exercise.',
        iconName: 'Radio',
        highlight: 'Zero-Impact Joint Movement',
        status: 'proposed'
      },
      {
        title: 'Geriatric Library & Digital Media Salon',
        subtitle: 'Curated library with large-print literature, newspapers, internet tablets, and reading armchairs.',
        iconName: 'Users',
        highlight: 'Lifelong Learning & Reading',
        status: 'proposed'
      },
      {
        title: 'Chef-Curated Satvik Dining Cafe',
        subtitle: 'Farm-fresh organic vegetarian dining prepared as per personalized dietary guidelines and low glycemic indexes.',
        iconName: 'Smile',
        highlight: 'Doctor-Supervised Nutrition',
        status: 'proposed'
      }
    ]
  }
];

// ============================================================================
// 6. DEVELOPMENT ROADMAP (FROM VISION TO REALITY)
// ============================================================================
export const developmentRoadmap: RoadmapMilestone[] = [
  {
    phase: 'Phase 01',
    title: 'Land Acquisition & Architectural Master Planning',
    timeline: 'Completed • Q1 2026',
    status: 'completed',
    description: 'Comprehensive structural drafting, biophilic master planning, and initial government clearances.',
    deliverables: [
      'Approved 35,000 sq. ft. architectural drawings',
      'NABH-aligned clinical floor zoning',
      'Universal senior accessibility compliance audits'
    ]
  },
  {
    phase: 'Phase 02',
    title: 'Site Preparation & Foundation Groundwork',
    timeline: 'In Progress • Current Milestone',
    status: 'in-progress',
    description: 'Sub-structure foundation laying, boundary landscaping, and deep-bore drainage execution.',
    deliverables: [
      'Site foundation piling & structural retention',
      'Boundary green buffer plantation commencement',
      'Early pre-launch reservation window opened for Units 01–03'
    ]
  },
  {
    phase: 'Phase 03',
    title: 'Superstructure & Specialized Medical Fit-outs',
    timeline: 'Upcoming • Q1 2027',
    status: 'upcoming',
    description: 'Rooftop slab completion, medical gas conduits, oxygen lines, and elevator installation.',
    deliverables: [
      'Stilt to Rooftop structural framework completion',
      'Acoustic insulation & medical pipeline conduits',
      'Ayurvedic therapy wood fabrication'
    ]
  },
  {
    phase: 'Phase 04',
    title: 'Interior Turnkey Finishing & Clinical Licensing',
    timeline: 'Upcoming • Q3 2027',
    status: 'upcoming',
    description: 'Luxury turnkey residences furnishing, non-slip flooring, and trial clinical mock-runs.',
    deliverables: [
      'Mock residence completion for early walkthroughs',
      'Medical equipment installation & ICU triage trials',
      'Hospitality staff & Kerala Vaidya onboarding'
    ]
  },
  {
    phase: 'Phase 05',
    title: 'Community Handover & Welcome Move-in',
    timeline: 'Target • Q4 2027',
    status: 'upcoming',
    description: 'Possession handover, community inauguration, and full 24x7 medical activation.',
    deliverables: [
      'Keys handover for Units 01–03',
      'Full clinical operational commencement',
      'Club Aeterna community inauguration'
    ]
  }
];

// ============================================================================
// 7. PROPERTY SPECIFIC FAQS
// ============================================================================
export const propertyFaqs = [
  {
    question: 'Is the building currently ready or under construction?',
    answer: 'The project is an upcoming, purpose-designed Senior Living & Wellness sanctuary currently in active foundation groundwork. We are showcasing the complete architectural 3D CGI and CAD plans so early families can visualize and secure their preferred residences before general release.'
  },
  {
    question: 'Which residences are open for booking right now?',
    answer: 'In the current Phase 1 release, only Residences 01, 02, and 03 on the Ground Floor (1 BHK and 1 RK suites) are available for priority reservation. Residences 04 to 09 across the First and Second floors will be opened in subsequent phases.'
  },
  {
    question: 'What is the difference between a 1 RK and a 1 BHK Suite?',
    answer: 'The 1 RK is an ultra-efficient 540 sq. ft. executive wellness studio featuring an integrated master bedroom, reading lounge, private sit-out, and senior-safe en-suite bath. The 1 BHK is a spacious 885–920 sq. ft. suite featuring a private master bedroom, separate family living salon, full modular kitchenette, and multiple balconies.'
  },
  {
    question: 'How is this different from a regular retirement home?',
    answer: 'Unlike standard retirement housing, Aeterna integrates an on-premise Ayurvedic hospital wing, emergency clinical triage with ICU backup, and 24x7 doctor/nurse availability directly into the ground floor. It combines luxury hospitality with uncompromising clinical safety.'
  },
  {
    question: 'Can I visit the project site before booking?',
    answer: 'Yes! We encourage families to schedule a private site visit. Our Senior Project Advisor will walk you through the actual location, road connectivity, surrounding green belt, and the exact architectural blueprint.'
  },
  {
    question: 'How does the priority reservation process work?',
    answer: 'Simply click "Reserve Residence" or submit your contact details. Our team will share the complete structural dossier, transparent payment milestones, and assist with registering your priority allotment without immediate commercial obligation.'
  }
];
