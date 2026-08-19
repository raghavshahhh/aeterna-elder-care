export type ServiceCategory = 
  | 'critical-care'
  | 'daily-living'
  | 'medical-rehab'
  | 'dementia-memory'
  | 'diagnostics-meds'
  | 'companionship';

export interface ServiceTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  category: ServiceCategory;
  categoryName: string;
  iconName: string;
  heroImage: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  startingPrice: string;
  priceUnit: string;
  clinicalLead: {
    name: string;
    role: string;
    qualification: string;
    experience: string;
  };
  highlights: string[];
  whatIsIncluded: {
    title: string;
    items: string[];
  }[];
  whoIsThisFor: string[];
  clinicalProtocol: {
    step: number;
    title: string;
    description: string;
  }[];
  pricingTiers: ServiceTier[];
  faqs: ServiceFAQ[];
  relatedServiceSlugs: string[];
}

export interface PlanFeatureGroup {
  category: string;
  features: {
    name: string;
    silver: string | boolean;
    gold: string | boolean;
    platinum: string | boolean;
    diamond: string | boolean;
    tooltip?: string;
  }[];
}

export interface CarePlan {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  priceMonthly: number;
  priceAnnual: number;
  annualSavings: number;
  description: string;
  idealFor: string;
  doctorVisitsPerYear: number;
  nursingHoursPerMonth: string;
  emergencyResponseTime: string;
  ambulanceCover: string;
  teleconsults: string;
  healthLockerAccess: boolean;
  dedicatedCareManager: boolean;
  dailyVitalsTracking: boolean;
  keyDeliverables: string[];
  fullFeatures: string[];
  limitations: string[];
}

export interface CityLocation {
  id: string;
  slug: string;
  name: string;
  state: string;
  region: string;
  heroImage: string;
  activeCaregivers: number;
  partnerHospitals: number;
  familiesServed: number;
  avgResponseTimeMin: number;
  localHubAddress: string;
  helpline: string;
  leadCoordinator: {
    name: string;
    title: string;
    phone: string;
    photo: string;
  };
  coveredLocalities: string[];
  partnerHospitalList: {
    name: string;
    accreditation: string;
    speciality: string;
  }[];
  localTestimonials: {
    quote: string;
    author: string;
    locality: string;
    rating: number;
    serviceUsed: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
  calloutBox?: {
    type: 'tip' | 'warning' | 'clinical-note';
    title: string;
    text: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTimeMinutes: number;
  publishDate: string;
  heroImage: string;
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  medicallyReviewedBy: {
    name: string;
    speciality: string;
    hospital: string;
  };
  keyTakeaways: string[];
  sections: ArticleSection[];
  tags: string[];
  relatedSlugs: string[];
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRelation: string;
  authorLocation: string;
  authorImage: string;
  elderName: string;
  elderAge: number;
  serviceUsed: string;
  planName?: string;
  rating: number;
  quote: string;
  fullStory: string;
  verified: boolean;
  videoDuration?: string;
  videoThumb?: string;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'services' | 'plans' | 'emergency' | 'caregivers' | 'payments';
  question: string;
  answer: string;
}

export interface FindCareSubmission {
  relation: string;
  elderAge: string;
  mobilityStatus: string;
  city: string;
  locality: string;
  servicesNeeded: string[];
  urgency: 'immediate' | 'within-48-hours' | 'next-week' | 'exploring';
  schedulePreference: '12-hr-day' | '12-hr-night' | '24-hr-livein' | 'visiting' | 'on-demand';
  medicalConditions: string[];
  contactName: string;
  contactPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  notes?: string;
}

export interface BookingSubmission {
  serviceId: string;
  serviceName: string;
  tierName?: string;
  city: string;
  locality: string;
  address: string;
  startDate: string;
  timeSlot: string;
  patientName: string;
  patientAge: string;
  gender: string;
  medicalConditions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  specialInstructions?: string;
  amount: number;
  paymentMethod: 'pay-online' | 'pay-after-assessment';
}

export interface PortalVitalRecord {
  date: string;
  bp: string;
  sugar: string;
  pulse: number;
  spo2: number;
  temperature: string;
  status: 'normal' | 'attention' | 'optimal';
  notes: string;
}

export interface PortalVisit {
  id: string;
  date: string;
  time: string;
  providerName: string;
  role: string;
  type: 'Doctor Visit' | 'Physio Session' | 'Nursing Check' | 'Lab Sample Collection';
  status: 'Upcoming' | 'Completed' | 'In Progress';
  notes?: string;
}

export interface PortalDocument {
  id: string;
  title: string;
  type: 'Prescription' | 'Lab Report' | 'Discharge Summary' | 'Care Plan';
  date: string;
  doctorName: string;
  fileSize: string;
}

// ----------------------------------------------------
// Property Showcase & Senior Residence Models
// ----------------------------------------------------

export type UnitType = '1-rk' | '1-bhk' | '2-bhk';
export type UnitStatus = 'available' | 'future_release' | 'on_hold' | 'sold';
export type FloorLevel = 'stilt' | 'ground' | 'first' | 'second' | 'rooftop';
export type FloorId = FloorLevel;

export interface RoomDetail {
  name: string;
  dimensions: string;
  highlight: string;
  cgiImage: string;
}

export interface BuildingUnit {
  id: string;
  unitNumber: string; // e.g. "Residence 01"
  code: string; // "01"
  floorLevel: FloorLevel;
  floorName: string; // "Ground Floor", "First Floor", "Second Floor"
  type: UnitType;
  typeName: string; // "1 BHK Senior Residence" or "1 RK Senior Suite"
  superAreaSqFt: number;
  carpetAreaSqFt: number;
  facing: string;
  status: UnitStatus; // 'available' for 01-03, 'future_release' for 04-09
  badge: string; // "Available (Phase 1)" or "Coming Soon (Future Release)"
  priceDisplay: string; // "₹XX,XX,XXX" or "Request Pre-Launch Price"
  rooms: RoomDetail[];
  seniorFeatures: string[];
  blueprint2d: string;
  interior3dCgi: string;
  keyHighlights: string[];
}

export interface PlotItem {
  id: string;
  plotNumber: string; // "Plot 24"
  number: number; // 24
  block: 'Block A' | 'Block B' | 'Block C' | 'Block D' | 'Block E' | 'Block F';
  sizeSqYd: number; // e.g. 180
  dimensions: string; // "30' × 54'"
  facing: string; // "North-East" | "Park Facing" | "Corner" | "East"
  roadWidth: string; // "33 ft Main Road" | "11 ft Lane"
  status: 'available' | 'on_hold' | 'sold';
  priceEstimate: string; // "Request Price"
  isCorner?: boolean;
  isParkFacing?: boolean;
}

export interface ResidenceUnit {
  id: string;
  unitNumber: string;
  type: UnitType;
  typeName: string;
  floor: FloorId;
  floorNumber: number;
  floorName: string;
  superAreaSqFt: number;
  carpetAreaSqFt: number;
  facing: string;
  status: UnitStatus;
  releasePhase: string;
  badge: string;
  startingPriceEstimate: string;
  monthlyCarePackageEstimate: string;
  seniorSafetyFeatures: string[];
  keyHighlights: string[];
  rooms: RoomDetail[];
  blueprint2d: string;
  interior3dCgi: string;
}

export interface FloorZone {
  name: string;
  category: 'clinical' | 'wellness' | 'residential' | 'lifestyle';
  badge?: string;
  description: string;
}

export interface PropertyFloor {
  id: FloorId;
  level: number;
  name: string;
  tagline: string;
  description: string;
  zones: FloorZone[];
  unitIds: string[];
  totalAreaSqFt: number;
}

export interface EcosystemPillarItem {
  title: string;
  subtitle: string;
  iconName: string;
  highlight: string;
  status: 'confirmed' | 'proposed';
}

export interface EcosystemPillar {
  id: 'healthcare' | 'ayurveda' | 'lifestyle';
  title: string;
  badge: string;
  tagline: string;
  description: string;
  disclaimer: string;
  items: EcosystemPillarItem[];
}

export interface LocationLandmark {
  category: 'hospital' | 'expressway' | 'nature' | 'transit';
  name: string;
  distance: string;
  travelTime: string;
  significance: string;
}

export interface RoadmapMilestone {
  phase: string;
  title: string;
  timeline: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  deliverables: string[];
}

// ----------------------------------------------------
// Official Foundation Models & Content Extensions
// ----------------------------------------------------

export interface CoreValue {
  num: string;
  title: string;
  description: string;
}

export interface DeepBenefit {
  num: string;
  title: string;
  description: string;
}

export interface PaymentPlanStep {
  milestone: string;
  percentage: string;
}

export interface PaymentPlan {
  id: string;
  code: string;
  title: string;
  ratio: string;
  description: string;
  steps: PaymentPlanStep[];
  badge?: string;
  highlight?: string;
}

export interface LoanParameter {
  parameter: string;
  detail: string;
  highlight?: boolean;
}

export interface ArchitectProfile {
  firmName: string;
  principalArchitect: string;
  credentials: string;
  studioAddress: string;
  phone: string;
  email: string;
  services: string[];
}
