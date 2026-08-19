import {
  ResidenceUnit,
  BuildingUnit,
  PlotItem,
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
  tagline: 'A Better Place for the People Who Raised You.',
  subtitle: 'An upcoming pre-launch senior-living community and on-site Ayurvedic hospital designed around comfort, accessibility, wellness, and peace of mind.',
  locationShort: 'Near Reliance MET City, SH-22, Kheri Asra, Jhajjar, Haryana 124104',
  googleMapsUrl: 'https://maps.app.goo.gl/bpqroduFspTJVqDfA?g_st=ic',
  googleMapsPlusCode: 'MP5G+4X Kheri Asra, Haryana 124104',
  siteOfficeAddress: 'Yoffices Tower, Opp. Ramada Hotel, Sector-45 Gurugram, Haryana',
  architectFirm: 'The Vision Architects, Farrukhnagar, Gurugram 122506',
  projectStage: 'Upcoming Project • Architectural & Pre-Launch Planning',
  totalPlots: 64,
  plotBlocks: '6 Blocks (Block A to Block F)',
  plotSizes: '120 sq. yd. to 425 sq. yd.',
  hospitalAreaSqFt: '30,000 sq. ft. (Proposed G+2 Structure)',
  hospitalFootprint: '117\'-10" × 138\' L-Shaped Footprint',
  totalBuildingUnits: 9,
  currentReleaseUnits: 'Units 01, 02, 03 (Ground Floor — Available)',
  futureReleaseUnits: 'Units 04–09 (First & Second Floors — Coming Soon / Future Release)',
  siteOfficePhone: '+91 99999558447',
  salesWhatsApp: '+91 99999558447',
  inquiryEmail: 'Yoffices@gmail.com',
  disclaimer: 'This website presents an upcoming pre-launch project. Architectural drawings, 3D renderings, indicative interiors, and planned amenities represent proposed designs by The Vision Architects and are subject to final municipal and statutory approvals.'
};

// ============================================================================
// 2. 9 RESIDENTIAL BUILDING UNITS (STILT + GROUND + FIRST + SECOND FLOORS)
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
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'East / Morning Sun & Garden View',
    status: 'available',
    badge: '🟢 Available • Phase 1 Launch',
    priceDisplay: 'Attractive Pre-Launch Price (Request Details)',
    keyHighlights: [
      'Zero-step barrier-free access directly from ground elevator lobby',
      'Dual 5×6ft wheelchair-accessible lifts in building',
      'Single-floor living inside — no internal steps or split levels',
      'Direct on-foot 2-minute stroll to on-site Ayurvedic Hospital and Mandir'
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
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'North-East / Courtyard View',
    status: 'available',
    badge: '🟢 Available • Phase 1 Launch',
    priceDisplay: 'Attractive Pre-Launch Price (Request Details)',
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
    badge: '🟢 Available • Phase 1 Launch',
    priceDisplay: 'Attractive Pre-Launch Price (Request Details)',
    keyHighlights: [
      'Compact, efficient studio suite ideal for single senior or visiting guest',
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

  // FIRST FLOOR: UNITS 04, 05, 06 (FUTURE RELEASE / COMING SOON - NOT SOLD)
  {
    id: 'unit-04',
    unitNumber: 'Residence 04',
    code: '04',
    floorLevel: 'first',
    floorName: 'First Floor',
    type: '1-bhk',
    typeName: '1 BHK Senior Residence (Type A)',
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'East / Tree Canopy View',
    status: 'future_release',
    badge: '⏳ Future Release • Coming Soon',
    priceDisplay: 'Register Interest for Phase 2 Release',
    keyHighlights: [
      'Elevated first-floor garden view with privacy and soft breeze',
      'Served by 2 high-speed wheelchair-size elevators',
      'Single-level internal floor plan',
      'Planned release in upcoming development milestone'
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
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'North-East / Quiet Sector View',
    status: 'future_release',
    badge: '⏳ Future Release • Coming Soon',
    priceDisplay: 'Register Interest for Phase 2 Release',
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
    badge: '⏳ Future Release • Coming Soon',
    priceDisplay: 'Register Interest for Phase 2 Release',
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

  // SECOND FLOOR: UNITS 07, 08, 09 (FUTURE RELEASE / COMING SOON - NOT SOLD)
  {
    id: 'unit-07',
    unitNumber: 'Residence 07',
    code: '07',
    floorLevel: 'second',
    floorName: 'Second Floor',
    type: '1-bhk',
    typeName: '1 BHK Sky Suite (Type A)',
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'East / Open Sky & Sunrise View',
    status: 'future_release',
    badge: '⏳ Future Release • Coming Soon',
    priceDisplay: 'Register Interest for Phase 3 Release',
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
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'North-East / Panoramic Horizon View',
    status: 'future_release',
    badge: '⏳ Future Release • Coming Soon',
    priceDisplay: 'Register Interest for Phase 3 Release',
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
    badge: '⏳ Future Release • Coming Soon',
    priceDisplay: 'Register Interest for Phase 3 Release',
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
// 3. 64 RESIDENTIAL PLOTS DATA (BLOCKS A TO F)
// ============================================================================
export const allPlots: PlotItem[] = Array.from({ length: 64 }, (_, i) => {
  const num = i + 1;
  const blockIndex = Math.floor(i / 11);
  const block = (['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'][blockIndex] || 'Block A') as PlotItem['block'];
  
  // Real-world realistic distribution:
  // ~42 Available (green), ~12 On Hold (amber), ~10 Sold (muted red)
  const isSold = [4, 12, 19, 27, 33, 41, 48, 52, 59, 63].includes(num);
  const isHold = [8, 15, 23, 31, 38, 46, 50, 56, 61].includes(num);
  const status: PlotItem['status'] = isSold ? 'sold' : isHold ? 'on_hold' : 'available';
  
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
    status,
    priceEstimate: 'Request Pre-Launch Price',
    isCorner,
    isParkFacing
  };
});

export const plotsSummary = {
  totalPlots: 64,
  blocks: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'],
  availableCount: allPlots.filter(p => p.status === 'available').length,
  onHoldCount: allPlots.filter(p => p.status === 'on_hold').length,
  soldCount: allPlots.filter(p => p.status === 'sold').length,
  minSizeSqYd: 120,
  maxSizeSqYd: 425,
  internalRoads: '11 ft internal lanes to 33 ft wide main arterial road',
  greenBelt: '5 ft & 6 ft continuous green buffer zones along boundaries',
  mandirDistance: '5 mins walking distance from every plot'
};

// ============================================================================
// 4. EXACT 3-FLOOR CAD HOSPITAL & WELLNESS INFRASTRUCTURE (117'-10" x 138')
// ============================================================================
export const propertyFloors: PropertyFloor[] = [
  {
    id: 'ground',
    level: 1,
    name: 'Floor 1 — Clinical Diagnostics, Critical Care & Inpatient Rooms',
    tagline: 'Planned Hospital Level 1: Dialysis, OT, ICU, CT/MRI & 9 Private Rooms',
    description: 'Proposed ground clinical level featuring advanced imaging, emergency surgery, intensive care, and inpatient recovery wards.',
    totalAreaSqFt: 11500,
    unitIds: ['01', '02', '03'],
    zones: [
      {
        name: 'Dialysis Center',
        category: 'clinical',
        badge: '20\'-0" × 30\'-0"',
        description: 'Proposed multi-station renal dialysis wing with buffer prep area.'
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
    tagline: 'Planned Hospital Level 2: Ayurvedic Healing, Cafeteria & Emergency',
    description: 'The proposed wellness and consultation floor featuring grand reception, multi-purpose yoga hall, doctor OPDs, and authentic Panchakarma chambers.',
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
    tagline: 'Planned Hospital Level 3: Community, Research, Pool & Open Sky Deck',
    description: 'Proposed community and lifestyle level featuring open amphitheater, swimming pool, quiet library, research hall, and open roof terrace.',
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
// 5. 1 RK & 1 BHK APARTMENT CONFIGURATIONS SHOWCASE
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
    superAreaSqFt: 330,
    carpetAreaSqFt: 270,
    facing: 'East / Garden Facing',
    status: 'available',
    releasePhase: 'Active Release (Phase 1 — Units 01, 02)',
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
    releasePhase: 'Active Release (Phase 1 — Unit 03)',
    badge: '🟢 Available for Booking',
    startingPriceEstimate: 'Attractive Pre-Launch Price',
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
// 6. REAL LOCATION & CONNECTIVITY (KHERI ASRA / JHAJJAR / RELIANCE MET CITY)
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
    significance: 'Planned 30,000 sq. ft. hospital with Dialysis, OT, ICU, CT/MRI, OPD, and 9 Panchakarma suites.'
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
// 7. "CARE WHEN IT MATTERS" — HEALTHCARE & WELLNESS SANCTUARY (PROPOSED)
// ============================================================================
export const ecosystemPillars: EcosystemPillar[] = [
  {
    id: 'healthcare',
    title: 'G+2 Multi-Speciality Ayurvedic Hospital (30k Sq. Ft.)',
    badge: '30,000 Sq. Ft. On-Site (Proposed)',
    tagline: 'A full G+2 hospital right within the township gates — the doctor is your neighbour.',
    description: 'Designed so families never have to travel across town for medical care. Complete hospital infrastructure planned on-site with emergency bay, OT, ICU, Dialysis, CT/MRI, and 24x7 pharmacies.',
    disclaimer: 'Hospital facility designed by The Vision Architects (117\'-10" × 138\' footprint) conforming to NABH clinical zoning standards. Facilities represent planned infrastructure.',
    items: [
      {
        title: 'Dialysis Center & ICU Area',
        subtitle: '20\'×30\' Dialysis wing and 18\'×20\' ICU intensive care suite with continuous oxygen monitoring.',
        iconName: 'Activity',
        highlight: '24×7 Critical Care',
        status: 'proposed'
      },
      {
        title: 'Full Imaging: CT Scan, MRI & Cathlab',
        subtitle: 'In-house CT Scan (17\'10"×20\'8"), MRI (17\'10"×28\'0"), X-Ray/Ultrasound and Cathlab (20\'×26\'4").',
        iconName: 'Siren',
        highlight: 'Zero Travel Diagnostics',
        status: 'proposed'
      },
      {
        title: '6 Doctor OPD Rooms & 2 Pharmacies',
        subtitle: 'Two 15\'×20\' pharmacy stores and 6 consultation chambers on Floor 2.',
        iconName: 'Stethoscope',
        highlight: 'Daily Physician Rounds',
        status: 'proposed'
      },
      {
        title: 'Inpatient Private & Semi-Private Rooms',
        subtitle: '9 Private rooms (9\'4"×10\'8") and 4 Semi-private rooms (12\'6"×14\'8") on Floor 1, plus 7 upper suites.',
        iconName: 'ShieldCheck',
        highlight: 'Dedicated Attendant Care',
        status: 'proposed'
      }
    ]
  },
  {
    id: 'ayurveda',
    title: 'Authentic Ayurvedic Longevity & Panchakarma',
    badge: 'Vedic Healing Sanctuary (Proposed)',
    tagline: 'Time-tested Vedic therapies engineered for active senior vitality and joint mobility.',
    description: 'Floor 2 houses 9 dedicated Panchakarma rooms, acupuncture chambers, a 54\'×49\' yoga center, and organic Satvik dining.',
    disclaimer: 'Ayurvedic treatments administered by certified Kerala Vaidyas and geriatric wellness therapists.',
    items: [
      {
        title: '9 Panchakarma Therapy Rooms',
        subtitle: 'Authentic Abhyanga, Shirodhara, and Kizhi therapy suites with timber treatment tables.',
        iconName: 'Sparkles',
        highlight: 'Arthritis & Joint Relief',
        status: 'proposed'
      },
      {
        title: '54\' × 49\' Yoga & Prānāyāma Hall',
        subtitle: 'Grand multi-purpose yoga center with dedicated changing rooms and morning breathing sessions.',
        iconName: 'Heart',
        highlight: 'Balance & Mobility',
        status: 'proposed'
      },
      {
        title: 'Physiotherapy & Acupuncture Suite',
        subtitle: '15\' × 20\' rehabilitation studio focusing on fall prevention and stroke recovery.',
        iconName: 'Zap',
        highlight: 'Senior Rehab Focus',
        status: 'proposed'
      },
      {
        title: 'Satvik Dietary Cafeteria',
        subtitle: '15\' × 26\'10" doctor-supervised dining serving fresh Ayurvedic vegetarian cuisine.',
        iconName: 'Globe',
        highlight: 'Tailored Nutrition',
        status: 'proposed'
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
        status: 'proposed'
      },
      {
        title: '50-Seat Open Amphitheater',
        subtitle: 'Floor 3 stepped open auditorium for classical musical evenings, cinema retrospectives, and festivals.',
        iconName: 'Tv',
        highlight: 'Weekly Social Gatherings',
        status: 'proposed'
      },
      {
        title: 'Senior Mobility Swimming Pool',
        subtitle: '10\' × 12\' heated hydrotherapy pool designed for low-impact joint movement.',
        iconName: 'Radio',
        highlight: 'Zero-Impact Swimming',
        status: 'proposed'
      },
      {
        title: '64 Residential Plots (Blocks A–F)',
        subtitle: 'Plots from 120 to 425 sq. yd. along 33ft wide roads with 5ft-6ft green belts.',
        iconName: 'Users',
        highlight: 'Build Your Own Home',
        status: 'proposed'
      }
    ]
  }
];

// ============================================================================
// 8. DEVELOPMENT ROADMAP
// ============================================================================
export const developmentRoadmap: RoadmapMilestone[] = [
  {
    phase: 'Phase 01',
    title: 'Land Demarcation & Architectural Planning',
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
      'Phase 1 plot allocations opened for Block A to Block F',
      'Active sales desk at Sector-45 Gurugram'
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
// 9. FAQS (TAILORED FOR FAMILIES, SONS, DAUGHTERS & NRIS)
// ============================================================================
export const propertyFaqs = [
  {
    question: 'Where exactly is the Senior Living Citizen Foundation located?',
    answer: 'The project is located in Kheri Asra, near Reliance MET City (Model Economic Township), just off State Highway 22 (SH-22), Jhajjar, Haryana 124104. It offers seamless highway connectivity to Gurugram, Farrukhnagar, and Delhi.'
  },
  {
    question: 'Is this an old age home or a freehold property?',
    answer: 'This is a premium freehold plotted township and senior apartment community. You own the plot or apartment outright, with full legal registration, while enjoying an integrated on-site 30,000 sq. ft. G+2 Ayurvedic Hospital, Mandir, and senior-safe infrastructure.'
  },
  {
    question: 'Which residential units are currently available for booking?',
    answer: 'For the current Phase 1 launch, Ground Floor Units (Residence 01, Residence 02, and Residence 03) and select plots across Blocks A to F are available for booking. Units 04 to 09 (First and Second Floors) will be released in future phases.'
  },
  {
    question: 'What facilities are planned in the on-site G+2 Hospital building?',
    answer: 'The planned 30,000 sq. ft. hospital building includes Dialysis, OT, ICU, CT Scan, MRI, Cathlab, 9 Private Inpatient Rooms, 4 Semi-Private Rooms, 6 Doctor OPDs, 2 Pharmacy stores, 9 Panchakarma therapy suites, a 54\'×49\' Yoga center, a 50-seat open amphitheater, swimming pool, library, and cafeteria.'
  },
  {
    question: 'How do I schedule an on-site visit or talk to an advisor?',
    answer: 'You can connect directly with our advisory desk on WhatsApp or Call at +91 99999558447 or visit our corporate office at Yoffices Tower, Opp. Ramada Hotel, Sector-45 Gurugram, Haryana.'
  }
];
