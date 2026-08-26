// ============================================================================
// SENIOR LIVING CITIZENS FOUNDATION â NORMALIZED ARCHITECTURAL DATA
// Authoritative Single Source of Geometric & Spatial Truth
// Source: The Vision Architects & Interiors â Ar. Yash Garg
// ============================================================================

export interface ArchitecturalRoom {
  id: string;
  name: string;
  shortName: string;
  floor: 'ground' | 'first' | 'second' | 'roof' | 'stilt';
  zone: 'wellness' | 'opd' | 'ayurveda' | 'emergency' | 'diagnostics' | 'surgical' | 'inpatient' | 'academic' | 'recreation' | 'service' | 'circulation' | 'residential';
  cadDimension: string;
  widthM: number;
  depthM: number;
  areaSqFt?: number;
  position: [number, number, number]; // [x, y, z] center coordinates in 3D world space (meters)
  size: [number, number, number]; // [width, height, depth] in meters
  description: string;
  keyFeatures: string[];
  cadPlanTab: 'hospital-ground' | 'hospital-first' | 'hospital-second' | 'residences' | 'stilt';
}

export interface BuildingFootprint {
  widthFt: number;
  depthFt: number;
  widthM: number;
  depthM: number;
  grossBuiltUpSqFt: number;
  floorsCount: number;
  floorHeightM: number;
  parapetHeightM: number;
  orientation: {
    north: 'top' | 'right' | 'bottom' | 'left';
    frontFacade: 'south' | 'north' | 'east' | 'west';
    entryRoad: string;
  };
}

// ----------------------------------------------------------------------------
// 1. HOSPITAL ARCHITECTURAL DEFINITION (117'-10\" Ã 138'-0\", G+2 30,000 SQ.FT.)
// ----------------------------------------------------------------------------

export const HOSPITAL_FOOTPRINT: BuildingFootprint = {
  widthFt: 117.833, // 117'-10\"
  depthFt: 138.0,   // 138'-0\"
  widthM: 35.916,   // 1414 inches * 0.0254
  depthM: 42.062,   // 1656 inches * 0.0254
  grossBuiltUpSqFt: 30000,
  floorsCount: 3,
  floorHeightM: 3.6,
  parapetHeightM: 1.1,
  orientation: {
    north: 'top',
    frontFacade: 'south',
    entryRoad: "33'-0\" Wide Highway Road"
  }
};

export const HOSPITAL_ROOMS_GROUND: ArchitecturalRoom[] = [
  {
    id: 'hosp-g-yoga',
    name: 'Multi-Purpose Hall & Yoga Center',
    shortName: 'Yoga Hall',
    floor: 'ground',
    zone: 'wellness',
    cadDimension: "34'-2\" Ã 49'-0\"",
    widthM: 10.41,
    depthM: 14.94,
    areaSqFt: 1674,
    position: [-10.8, 1.8, -12.5],
    size: [10.41, 3.2, 14.94],
    description: 'Double-height sound-insulated hall designed for morning yoga, guided pranayama meditation, and holistic health workshops.',
    keyFeatures: ['Teakwood anti-skid flooring', 'Cross-ventilation windows', 'Attached male & female changing rooms', 'Sound amplification acoustic baffles'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-store',
    name: 'Yoga Equipment & Mat Store',
    shortName: 'Store Room',
    floor: 'ground',
    zone: 'service',
    cadDimension: "10'-0\" Ã 17'-8\"",
    widthM: 3.05,
    depthM: 5.38,
    areaSqFt: 177,
    position: [-16.0, 1.8, -4.0],
    size: [3.05, 3.2, 5.38],
    description: 'Storage facility for yoga mats, props, bolsters, and audio-visual equipment.',
    keyFeatures: ['Ventilated cabinetry', 'Direct access from yoga hall'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-changing-f',
    name: 'Female Changing Area',
    shortName: 'Female Changing',
    floor: 'ground',
    zone: 'service',
    cadDimension: "10'-0\" Ã 10'-0\"",
    widthM: 3.05,
    depthM: 3.05,
    areaSqFt: 100,
    position: [-16.0, 1.8, 1.0],
    size: [3.05, 3.2, 3.05],
    description: 'Private changing cubicles and locker facility for female yoga and therapy participants.',
    keyFeatures: ['Full-height lockers', 'Attached washroom'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-changing-m',
    name: 'Male Changing Area',
    shortName: 'Male Changing',
    floor: 'ground',
    zone: 'service',
    cadDimension: "10'-0\" Ã 10'-0\"",
    widthM: 3.05,
    depthM: 3.05,
    areaSqFt: 100,
    position: [-16.0, 1.8, 4.5],
    size: [3.05, 3.2, 3.05],
    description: 'Private changing cubicles and locker facility for male yoga and therapy participants.',
    keyFeatures: ['Full-height lockers', 'Attached washroom'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-opd-1',
    name: 'OPD Chamber 01 (Ayurveda Consultant)',
    shortName: 'OPD 01',
    floor: 'ground',
    zone: 'opd',
    cadDimension: "9'-10\" Ã 12'-2\"",
    widthM: 3.0,
    depthM: 3.71,
    areaSqFt: 120,
    position: [-14.5, 1.8, 9.0],
    size: [3.0, 3.2, 3.71],
    description: 'Senior Ayurvedic physician consultation room equipped with pulse diagnosis (Nadi Pariksha) desk.',
    keyFeatures: ['Examination couch', 'Direct gallery access', 'Natural daylight'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-opd-2',
    name: 'OPD Chamber 02 (General Medicine)',
    shortName: 'OPD 02',
    floor: 'ground',
    zone: 'opd',
    cadDimension: "9'-10\" Ã 12'-2\"",
    widthM: 3.0,
    depthM: 3.71,
    areaSqFt: 120,
    position: [-14.5, 1.8, 13.0],
    size: [3.0, 3.2, 3.71],
    description: 'General practitioner and geriatric physician consultation suite.',
    keyFeatures: ['BP & vitals station', 'Doctor consultation desk', 'Wheelchair clearance'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-opd-3',
    name: 'OPD Chamber 03 (Cardiology & Geriatrics)',
    shortName: 'OPD 03',
    floor: 'ground',
    zone: 'opd',
    cadDimension: "9'-10\" Ã 12'-2\"",
    widthM: 3.0,
    depthM: 3.71,
    areaSqFt: 120,
    position: [-14.5, 1.8, 17.0],
    size: [3.0, 3.2, 3.71],
    description: 'Specialist consultation suite with integrated ECG and cardiac monitoring setup.',
    keyFeatures: ['Digital ECG machine', 'Examination bed', 'EHR terminal'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-opd-4',
    name: 'OPD Chamber 04 (Orthopaedics & Joint Care)',
    shortName: 'OPD 04',
    floor: 'ground',
    zone: 'opd',
    cadDimension: "9'-10\" Ã 12'-2\"",
    widthM: 3.0,
    depthM: 3.71,
    areaSqFt: 120,
    position: [-11.0, 1.8, 9.0],
    size: [3.0, 3.2, 3.71],
    description: 'Orthopaedic assessment chamber for arthritis and joint mobility care.',
    keyFeatures: ['Goniometer mobility check station', 'X-ray viewbox', 'Ergonomic examination couch'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-opd-5',
    name: 'OPD Chamber 05 (Diet & Nutrition)',
    shortName: 'OPD 05',
    floor: 'ground',
    zone: 'opd',
    cadDimension: "9'-10\" Ã 13'-3\"",
    widthM: 3.0,
    depthM: 4.04,
    areaSqFt: 130,
    position: [-11.0, 1.8, 13.0],
    size: [3.0, 3.2, 4.04],
    description: 'Ayurvedic dietetics, nutrition planning, and lifestyle counselling suite.',
    keyFeatures: ['Prakriti assessment charts', 'Dietary chart printer', 'Counselling area'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-opd-6',
    name: 'OPD Chamber 06 (Physiotherapy Consultation)',
    shortName: 'OPD 06',
    floor: 'ground',
    zone: 'opd',
    cadDimension: "9'-10\" Ã 13'-3\"",
    widthM: 3.0,
    depthM: 4.04,
    areaSqFt: 130,
    position: [-11.0, 1.8, 17.0],
    size: [3.0, 3.2, 4.04],
    description: 'Pre-therapy clinical evaluation and physical assessment chamber.',
    keyFeatures: ['Gait assessment area', 'Ergonomic seating', 'Physical therapy prescription desk'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-reception',
    name: 'Main Reception & Patient Waiting Lounge',
    shortName: 'Reception & Waiting',
    floor: 'ground',
    zone: 'circulation',
    cadDimension: "25'-7\" Ã 50'-1\"",
    widthM: 7.8,
    depthM: 15.27,
    areaSqFt: 1281,
    position: [0.0, 1.8, 13.0],
    size: [7.8, 3.2, 15.27],
    description: 'Double-height grand welcoming atrium with triage reception, patient check-in counters, and comfortable senior lounge seating.',
    keyFeatures: ['Digital appointment token display', 'Wheelchair assistance station', 'Direct connectivity to 10ft wide Gallery'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-pharmacy-1',
    name: 'Ayurvedic & Allopathic Pharmacy Retail Store',
    shortName: 'Pharmacy Store 1',
    floor: 'ground',
    zone: 'service',
    cadDimension: "15'-0\" Ã 20'-0\"",
    widthM: 4.57,
    depthM: 6.1,
    areaSqFt: 300,
    position: [6.8, 1.8, 16.5],
    size: [4.57, 3.2, 6.1],
    description: '24x7 on-site licensed pharmacy dispensing authentic Ayurvedic formulations and essential prescription medications.',
    keyFeatures: ['Temperature-controlled medicine storage', 'Dispensing counter', 'Computerized inventory terminal'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-pharmacy-2',
    name: 'Ayurvedic Herb Dispensary & Bulk Storage',
    shortName: 'Pharmacy Store 2',
    floor: 'ground',
    zone: 'service',
    cadDimension: "15'-0\" Ã 20'-0\"",
    widthM: 4.57,
    depthM: 6.1,
    areaSqFt: 300,
    position: [12.0, 1.8, 16.5],
    size: [4.57, 3.2, 6.1],
    description: 'Specialized herb compounding and formulation storage for Panchakarma decoctions (Kashayams, Tailams, Ghritams).',
    keyFeatures: ['Airtight herb bins', 'Kashayam preparation counter', 'Sterile dry storage'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-cafeteria',
    name: 'Satvik Dining & Cafeteria',
    shortName: 'Cafeteria',
    floor: 'ground',
    zone: 'service',
    cadDimension: "15'-0\" Ã 28'-10\"",
    widthM: 4.57,
    depthM: 8.79,
    areaSqFt: 432,
    position: [-5.5, 1.8, 15.0],
    size: [4.57, 3.2, 8.79],
    description: 'Wholesome Ayurvedic dietary cafeteria serving herbal infusions, warm Satvik meals, and senior-friendly refreshments.',
    keyFeatures: ['Hygienic stainless service counter', 'Seating for 32 patrons', 'Handwash stations'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-physio',
    name: 'Physiotherapy & Acupuncture Suite',
    shortName: 'Physio & Acupuncture',
    floor: 'ground',
    zone: 'ayurveda',
    cadDimension: "15'-0\" Ã 20'-0\"",
    widthM: 4.57,
    depthM: 6.1,
    areaSqFt: 300,
    position: [6.8, 1.8, 7.5],
    size: [4.57, 3.2, 6.1],
    description: 'Equipped with ultrasound therapy, TENS units, acupuncture tables, and rehabilitation parallel bars.',
    keyFeatures: ['Hydrocollator packs', 'Acupuncture treatment station', 'Exercise therapy zone'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-pancha-1',
    name: 'Panchakarma Deluxe Suite 01 (Shirodhara & Abhyanga)',
    shortName: 'Panchakarma 01',
    floor: 'ground',
    zone: 'ayurveda',
    cadDimension: "10'-0\" Ã 20'-0\"",
    widthM: 3.05,
    depthM: 6.1,
    areaSqFt: 200,
    position: [12.0, 1.8, 7.5],
    size: [3.05, 3.2, 6.1],
    description: 'Complete Panchakarma suite with carved neem wood Droni massage table, motorized Shirodhara stand, and wooden steam chamber.',
    keyFeatures: ['Authentic neem Droni table', 'Brass Shirodhara vessel', 'Attached herbal bath & toilet'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-pancha-2',
    name: 'Panchakarma Deluxe Suite 02 (Kizhi & Pizhichil)',
    shortName: 'Panchakarma 02',
    floor: 'ground',
    zone: 'ayurveda',
    cadDimension: "10'-0\" Ã 20'-0\"",
    widthM: 3.05,
    depthM: 6.1,
    areaSqFt: 200,
    position: [15.5, 1.8, 7.5],
    size: [3.05, 3.2, 6.1],
    description: 'Traditional oil bath (Pizhichil) and herbal bolus massage (Elakizhi) suite with non-slip flooring and floor drains.',
    keyFeatures: ['Warm oil heating setup', 'Traditional Droni table', 'Herbal steam box (Swedana)'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-pancha-3',
    name: 'Panchakarma Therapy Suite 03',
    shortName: 'Panchakarma 03',
    floor: 'ground',
    zone: 'ayurveda',
    cadDimension: "10'-0\" Ã 15'-6\"",
    widthM: 3.05,
    depthM: 4.72,
    areaSqFt: 155,
    position: [12.0, 1.8, 0.5],
    size: [3.05, 3.2, 4.72],
    description: 'Panchakarma detox treatment room with attached private bath.',
    keyFeatures: ['Droni table', 'Medicinal oil storage', 'Shower stall'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-pancha-4',
    name: 'Panchakarma Therapy Suite 04',
    shortName: 'Panchakarma 04',
    floor: 'ground',
    zone: 'ayurveda',
    cadDimension: "10'-0\" Ã 15'-6\"",
    widthM: 3.05,
    depthM: 4.72,
    areaSqFt: 155,
    position: [15.5, 1.8, 0.5],
    size: [3.05, 3.2, 4.72],
    description: 'Panchakarma detox treatment room with attached private bath.',
    keyFeatures: ['Droni table', 'Medicinal oil storage', 'Shower stall'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-emergency',
    name: 'Emergency Department & Triage',
    shortName: 'Emergency Triage',
    floor: 'ground',
    zone: 'emergency',
    cadDimension: "18'-6\" Ã 19'-0\"",
    widthM: 5.64,
    depthM: 5.79,
    areaSqFt: 351,
    position: [6.8, 1.8, -14.0],
    size: [5.64, 3.2, 5.79],
    description: '24/7 senior trauma & emergency resuscitation bay with direct ramp access, oxygen lines, and cardiac crash carts.',
    keyFeatures: ['3 resuscitation beds with multi-para monitors', 'Central medical gas pipelines (O2, Vacuum)', 'Defibrillator & crash cart'],
    cadPlanTab: 'hospital-ground'
  },
  {
    id: 'hosp-g-mini-ot',
    name: 'Mini Operation Theatre (Minor Procedures)',
    shortName: 'Mini OT',
    floor: 'ground',
    zone: 'emergency',
    cadDimension: "10'-0\" Ã 13'-8\"",
    widthM: 3.05,
    depthM: 4.17,
    areaSqFt: 137,
    position: [13.0, 1.8, -14.0],
    size: [3.05, 3.2, 4.17],
    description: 'Sterile minor OT for wound suturing, orthopedic reductions, endoscopy, and minor surgical debridement.',
    keyFeatures: ['Shadowless surgical light', 'Cautery & suction unit', 'Sterile scrub sink'],
    cadPlanTab: 'hospital-ground'
  }
];

export const HOSPITAL_ROOMS_FIRST: ArchitecturalRoom[] = [
  {
    id: 'hosp-1f-cathlab',
    name: 'Advanced Cardiac Cathlab Suite',
    shortName: 'Cathlab',
    floor: 'first',
    zone: 'diagnostics',
    cadDimension: "20'-0\" Ã 26'-4\"",
    widthM: 6.1,
    depthM: 8.03,
    areaSqFt: 527,
    position: [-13.0, 5.4, -15.0],
    size: [6.1, 3.2, 8.03],
    description: 'Interventional cardiology catheterization lab for coronary angiographies, angioplasties, and pacemaker implantations.',
    keyFeatures: ['C-Arm fluoroscopy system', 'Radiation-shielded lead walls', 'Integrated hemodynamic monitoring console'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-mri',
    name: 'MRI 1.5 Tesla Diagnostic Suite',
    shortName: 'MRI Suite',
    floor: 'first',
    zone: 'diagnostics',
    cadDimension: "17'-10\" Ã 28'-0\"",
    widthM: 5.44,
    depthM: 8.53,
    areaSqFt: 499,
    position: [-13.0, 5.4, -6.0],
    size: [5.44, 3.2, 8.53],
    description: 'Quiet-bore 1.5T Magnetic Resonance Imaging suite with RF Faraday shielding cage and specialized senior positioning coils.',
    keyFeatures: ['RF shielded Faraday enclosure', 'Chilled helium cryogenic lines', 'Acoustic noise reduction padding'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-ct',
    name: '128-Slice CT Scan Diagnostic Suite',
    shortName: 'CT Scan',
    floor: 'first',
    zone: 'diagnostics',
    cadDimension: "17'-10\" Ã 20'-8\"",
    widthM: 5.44,
    depthM: 6.3,
    areaSqFt: 369,
    position: [-13.0, 5.4, 2.0],
    size: [5.44, 3.2, 6.3],
    description: 'High-speed 128-slice computed tomography scanner for non-invasive cardiac, neuro, and full-body scans.',
    keyFeatures: ['Lead glass operator console', 'Ultra-low radiation dose protocol', 'Motorized patient table'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-dialysis',
    name: 'Dialysis Critical Unit (8 Stations)',
    shortName: 'Dialysis',
    floor: 'first',
    zone: 'diagnostics',
    cadDimension: "20'-0\" Ã 30'-0\"",
    widthM: 6.1,
    depthM: 9.14,
    areaSqFt: 600,
    position: [-13.0, 5.4, 11.5],
    size: [6.1, 3.2, 9.14],
    description: '8-station hemodialysis bay with medical RO water plant, motorized recliner beds, and dedicated nurse station.',
    keyFeatures: ['Medical grade RO water plant', 'Continuous arterial line monitoring', 'Comfortable reclining treatment chairs'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-xray',
    name: 'Digital X-Ray & Ultrasound Suite',
    shortName: 'X-Ray & USG',
    floor: 'first',
    zone: 'diagnostics',
    cadDimension: "16'-0\" Ã 18'-0\"",
    widthM: 4.88,
    depthM: 5.49,
    areaSqFt: 288,
    position: [-4.0, 5.4, -15.0],
    size: [4.88, 3.2, 5.49],
    description: 'Digital radiography (DR) ceiling-suspended tube and high-resolution 4D color Doppler ultrasound.',
    keyFeatures: ['Direct digital detector DR plate', 'Color Doppler ultrasound', 'Lead apron safety racks'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-icu',
    name: 'Intensive Care Unit (6 Critical Care Beds)',
    shortName: 'ICU Area',
    floor: 'first',
    zone: 'surgical',
    cadDimension: "18'-0\" Ã 20'-0\"",
    widthM: 5.49,
    depthM: 6.1,
    areaSqFt: 360,
    position: [2.0, 5.4, -15.0],
    size: [5.49, 3.2, 6.1],
    description: 'HEPA-filtered positive pressure ICU with central ventilator telemetry, dialysis ports, and isolated barrier nursing.',
    keyFeatures: ['Servo-controlled mechanical ventilators', 'Central multi-channel telemetry', 'Medical gas pendant ceiling arms'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-ot',
    name: 'Major Modular Operation Theatre Suite',
    shortName: 'OT Suite',
    floor: 'first',
    zone: 'surgical',
    cadDimension: "18'-0\" Ã 25'-7\"",
    widthM: 5.49,
    depthM: 7.8,
    areaSqFt: 460,
    position: [9.5, 5.4, -15.0],
    size: [5.49, 3.2, 7.8],
    description: 'Class 100 laminar airflow major surgical theatre with antimicrobial hermetic cladding and integrated endoscopic towers.',
    keyFeatures: ['Class 100 laminar air flow ceiling', 'Hermetically sealed automatic sliding doors', 'Anesthesia workstation pendant'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-ward-he',
    name: 'Male General Inpatient Ward',
    shortName: 'He General Ward',
    floor: 'first',
    zone: 'inpatient',
    cadDimension: "19'-0\" Ã 28'-10\"",
    widthM: 5.79,
    depthM: 8.79,
    areaSqFt: 548,
    position: [12.5, 5.4, 5.0],
    size: [5.79, 3.2, 8.79],
    description: 'Spacious male inpatient ward with motorized fowler beds, nurse call bell systems, and direct natural light.',
    keyFeatures: ['6 motorized ICU-style fowler beds', 'Individual bedside oxygen & suction', 'Attached barrier-free toilet'],
    cadPlanTab: 'hospital-first'
  },
  {
    id: 'hosp-1f-ward-she',
    name: 'Female General Inpatient Ward',
    shortName: 'She General Ward',
    floor: 'first',
    zone: 'inpatient',
    cadDimension: "19'-0\" Ã 28'-10\"",
    widthM: 5.79,
    depthM: 8.79,
    areaSqFt: 548,
    position: [12.5, 5.4, 14.5],
    size: [5.79, 3.2, 8.79],
    description: 'Spacious female inpatient ward with motorized fowler beds, privacy curtains, and nurse monitoring desk.',
    keyFeatures: ['6 motorized ICU-style fowler beds', 'Anti-bacterial privacy curtains', 'Attached barrier-free toilet'],
    cadPlanTab: 'hospital-first'
  }
];

export const HOSPITAL_ROOMS_SECOND: ArchitecturalRoom[] = [
  {
    id: 'hosp-2f-auditorium',
    name: '50-Seating Open Amphitheatre & Stage',
    shortName: '50-Seat Auditorium',
    floor: 'second',
    zone: 'recreation',
    cadDimension: "Custom Semicircular Tiered (~1,040 sq.ft.)",
    widthM: 10.5,
    depthM: 9.2,
    areaSqFt: 1040,
    position: [-10.5, 9.0, 10.0],
    size: [10.5, 3.2, 9.2],
    description: 'Tiered 50-seat open amphitheatre with presentation stage for wellness symposia, cultural satsang, and health talks.',
    keyFeatures: ['Tiered concentric seating risers', 'Acoustic presentation stage', 'High-lumens projection screen'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-pool',
    name: 'Senior Hydrotherapy & Therapeutic Swimming Pool',
    shortName: 'Hydrotherapy Pool',
    floor: 'second',
    zone: 'wellness',
    cadDimension: "10'-0\" Ã 12'-0\"",
    widthM: 3.05,
    depthM: 3.66,
    areaSqFt: 120,
    position: [-14.0, 9.0, 2.0],
    size: [3.05, 1.2, 3.66],
    description: 'Heated water hydrotherapy pool with handrails and hydraulic hoist for arthritis rehabilitation and aqua-physiotherapy.',
    keyFeatures: ['Constant 32Â°C water temperature', 'Underwater therapeutic jet nozzles', 'Wheelchair hydraulic immersion lift'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-semishade',
    name: 'Semi-Shaded Louvered Recreational Pavilion',
    shortName: 'Semi-Shade Lounge',
    floor: 'second',
    zone: 'recreation',
    cadDimension: "20'-4\" Ã 38'-0\"",
    widthM: 6.2,
    depthM: 11.58,
    areaSqFt: 773,
    position: [-10.5, 9.0, -8.0],
    size: [6.2, 3.2, 11.58],
    description: 'Open-air pergola with architectural wooden louvers for gentle morning walks, herbal tea lounging, and fresh air.',
    keyFeatures: ['Louvered shade pergola', 'Anti-skid timber decking', 'Comfortable rattan armchairs'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-openroof',
    name: 'Open Sky Landscaped Roof Terrace Deck',
    shortName: 'Open Roof Deck',
    floor: 'roof',
    zone: 'recreation',
    cadDimension: "39'-2\" Ã 56'-11\"",
    widthM: 11.94,
    depthM: 17.35,
    areaSqFt: 2230,
    position: [6.5, 9.0, 8.0],
    size: [11.94, 1.1, 17.35],
    description: "Authoritative Open Sky Rooftop Terrace (39'-2\" Ã 56'-11\") offering panoramic 360-degree views of Jhajjar green fields, herb planters, and morning walking track.",
    keyFeatures: ['Weatherproof tiled terrace floor', '3.5ft safety parapet railings', 'Aromatic herb garden planters', 'Open sky star-gazing deck'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-library',
    name: 'Medical & Spiritual Heritage Library',
    shortName: 'Library Room',
    floor: 'second',
    zone: 'academic',
    cadDimension: "17'-10\" Ã 28'-8\"",
    widthM: 5.44,
    depthM: 8.74,
    areaSqFt: 511,
    position: [12.0, 9.0, -14.0],
    size: [5.44, 3.2, 8.74],
    description: 'Peaceful reading hall cataloguing Ayurvedic classics (Charaka, Sushruta Samhitas), Vedic literature, and modern journals.',
    keyFeatures: ['Solid oak reading desks', 'Audiobook listening stations', 'Over 2,000 reference volumes'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-research',
    name: 'Clinical Research & Pharmacology Lab',
    shortName: 'Research Room',
    floor: 'second',
    zone: 'academic',
    cadDimension: "18'-0\" Ã 25'-4\"",
    widthM: 5.49,
    depthM: 7.72,
    areaSqFt: 456,
    position: [5.0, 9.0, -14.0],
    size: [5.49, 3.2, 7.72],
    description: 'Standardization and clinical trial analysis facility for plant-based herbal medicines.',
    keyFeatures: ['Microscopy & analytical station', 'Sample cold storage', 'Standardization testing benches'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-conference',
    name: 'Conference & Medical Board Room',
    shortName: 'Conference Room',
    floor: 'second',
    zone: 'academic',
    cadDimension: "20'-0\" Ã 26'-2\"",
    widthM: 6.1,
    depthM: 7.98,
    areaSqFt: 523,
    position: [-2.0, 9.0, -14.0],
    size: [6.1, 3.2, 7.98],
    description: 'Executive clinical case discussion room with 20-seat oval boardroom table and high-definition video-conferencing.',
    keyFeatures: ['20-seat boardroom table', 'Telemedicine link to AIIMS Delhi', 'Dual presentation monitors'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-kitchen',
    name: 'Central Dietary Commercial Kitchen',
    shortName: 'Dietary Kitchen',
    floor: 'second',
    zone: 'service',
    cadDimension: "15'-0\" Ã 20'-0\"",
    widthM: 4.57,
    depthM: 6.1,
    areaSqFt: 300,
    position: [12.0, 9.0, -3.0],
    size: [4.57, 3.2, 6.1],
    description: 'State-of-the-art hygienic commercial kitchen preparing individualized therapeutic Ayurvedic patient diets.',
    keyFeatures: ['Stainless steel commercial cooking ranges', 'Dedicated herb decoction kettle', 'Dietary tray assembly conveyor'],
    cadPlanTab: 'hospital-second'
  },
  {
    id: 'hosp-2f-laundry',
    name: 'Hospital Laundry & Linen Sterilization',
    shortName: 'Laundry Area',
    floor: 'second',
    zone: 'service',
    cadDimension: "14'-10\" Ã 30'-4\"",
    widthM: 4.52,
    depthM: 9.25,
    areaSqFt: 450,
    position: [12.0, 9.0, 4.5],
    size: [4.52, 3.2, 9.25],
    description: 'Heavy-duty medical washer-extractors and high-temperature steam barrier autoclaves for Panchakarma linens.',
    keyFeatures: ['Barrier washer-extractors (cross-infection proof)', 'Thermal steam linen ironers', 'Linen sorting & sterile wrapping'],
    cadPlanTab: 'hospital-second'
  }
];

export const RESIDENCE_FOOTPRINT: BuildingFootprint = {
  widthFt: 46.0,
  depthFt: 50.5,
  widthM: 14.02,
  depthM: 15.39,
  grossBuiltUpSqFt: 6969, // ~2,323 sq.ft. per floor Ã 3
  floorsCount: 3,
  floorHeightM: 3.2,
  parapetHeightM: 1.0,
  orientation: {
    north: 'top',
    frontFacade: 'south',
    entryRoad: "22'-6\" Wide Spine Rasta"
  }
};

export const RESIDENCE_UNITS_DATA = [
  {
    unitId: 'unit-01',
    unitNumber: 'Residence 01',
    code: '01',
    typeName: '1 BHK Senior Residence (West Wing)',
    type: '1-bhk',
    position: 'West Wing (Left)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    cadDimensions: {
      bedroom: "10'-0\" Ã 10'-10\"",
      livingDining: "9'-0\" Ã 14'-4\"",
      kitchen: "5'-0\" Ã 9'-0\"",
      toilet: "4'-0\" Ã 7'-2\"",
      balcony: "3'-6\" Wide Projection"
    },
    seniorFeatures: [
      "Zero-threshold entry from 9'8\" common lobby",
      "Dual grab rails and walk-in shower bench in 4'0\" Ã 7'2\" toilet",
      "Anti-skid matte vitrified tile flooring throughout",
      "Emergency pull-cord in bathroom linked to 24x7 security",
      "3'6\" deep private balcony with safety railings"
    ]
  },
  {
    unitId: 'unit-02',
    unitNumber: 'Residence 02',
    code: '02',
    typeName: '1 RK Senior Studio Suite (Center Wing)',
    type: '1-rk',
    position: 'Center Wing',
    superAreaSqFt: 240,
    carpetAreaSqFt: 195,
    cadDimensions: {
      livingBedroom: "10'-0\" Ã 10'-0\"",
      livingArea: "9'-0\" Ã 9'-0\"",
      kitchen: "5'-0\" Ã 9'-0\"",
      toilet: "4'-0\" Ã 7'-2\"",
      balcony: "3'-6\" Wide Projection"
    },
    seniorFeatures: [
      "Compact, energy-efficient layout minimizing daily walking fatigue",
      "Direct access to 5'6\" Ã 8'0\" elevator and senior stairwell",
      "Low-height kitchen countertops and push-to-open cabinetry",
      "Dedicated wheelchair turning radius"
    ]
  },
  {
    unitId: 'unit-03',
    unitNumber: 'Residence 03',
    code: '03',
    typeName: '1 BHK Deluxe Senior Residence (East Wing)',
    type: '1-bhk',
    position: 'East Wing (Right)',
    superAreaSqFt: 400,
    carpetAreaSqFt: 276,
    cadDimensions: {
      bedroom: "10'-0\" Ã 10'-10\"",
      livingArea1: "9'-0\" Ã 9'-10\"",
      livingArea2: "9'-0\" Ã 9'-0\"",
      kitchen: "5'-0\" Ã 9'-0\"",
      toilet: "4'-0\" Ã 10'-0\"",
      balcony: "3'-6\" Wide Projection"
    },
    seniorFeatures: [
      "Expansive 4'0\" Ã 10'0\" senior bathroom with grab bars and vanity",
      "Double living zone with separate prayer alcove / reading corner",
      "Morning sunlight exposure from East-facing balcony",
      "Direct ventilation shaft (2'6\" Ã 8'4\")"
    ]
  }
];

export const RESIDENCE_STILT_DATA = {
  baysCount: 14,
  entryGatesCount: 3,
  elevatorShaft: { widthFt: 5.5, depthFt: 8.0, widthM: 1.68, depthM: 2.44 },
  staircase: { widthFt: 4.0, treadIn: 10, riserIn: 6, steps: 21, heightFt: 10.5 },
  structuralGrid: {
    columnsCount: 16,
    columnSizeM: 0.45,
    rows: 4,
    columns: 4
  }
};
