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
