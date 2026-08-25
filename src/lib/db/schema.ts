export type UserRole =
  | 'SUPER_ADMIN'
  | 'OWNER'
  | 'FRANCHISE_ADMIN'
  | 'LOCATION_ADMIN'
  | 'SALES_AGENT'
  | 'CONTENT_MANAGER'
  | 'FINANCE'
  | 'REFERRAL_PARTNER';

export type ProjectStatus =
  | 'COMING_SOON'
  | 'PRE_LAUNCH'
  | 'LAUNCHED'
  | 'UNDER_DEVELOPMENT'
  | 'READY_TO_MOVE'
  | 'COMPLETED'
  | 'SOLD_OUT';

export type FeatureStatus =
  | 'EXISTS'
  | 'VERIFIED'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'PLANNED'
  | 'PROPOSED'
  | 'APPROVAL_PENDING';

export type InventoryType =
  | 'PLOT'
  | 'STUDIO_SUITE'
  | '1_BHK_RESIDENCE'
  | '2_BHK_SUITE'
  | 'VILLA'
  | 'APARTMENT';

export type InventoryStatus =
  | 'AVAILABLE'
  | 'HOLD'
  | 'RESERVED'
  | 'SOLD'
  | 'COMING_SOON';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'SITE_VISIT'
  | 'NEGOTIATION'
  | 'BOOKED'
  | 'CONVERTED'
  | 'LOST';

export type SiteVisitStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'VISITED'
  | 'RESCHEDULED'
  | 'CANCELLED'
  | 'NO_SHOW';

export type RewardStatus =
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECTED'
  | 'PAID';

export type CommissionStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'PAID';

export type DocumentVisibility =
  | 'PUBLIC'
  | 'PRIVATE'
  | 'OWNER_ONLY'
  | 'ADMIN_ONLY';

export type DocumentStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'VERIFIED'
  | 'PENDING_REVIEW';

// ----------------------------------------------------
// ENTITIES
// ----------------------------------------------------

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  passwordHash: string; // PBKDF2/SHA256 salted
  role: UserRole;
  franchiseId?: string;
  locationId?: string;
  assignedProjectIds?: string[];
  referralCode?: string; // If REFERRAL_PARTNER
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Franchise {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  isActive: boolean;
  commissionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  slug: string; // 'haryana', 'goa', 'dehradun'
  name: string; // 'Haryana', 'Goa', 'Dehradun'
  state: string;
  city: string;
  tagline: string;
  description: string;
  heroImage: string;
  featuredProjectCount: number;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string; // 'kheri-asra', 'goa-residence'
  locationId: string;
  franchiseId?: string;
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  status: ProjectStatus;
  projectType: 'PRE_LAUNCH_PLOTTED' | 'READY_TO_MOVE_RESIDENTIAL' | 'INTEGRATED_TOWNSHIP';
  address: string;
  city: string;
  state: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  totalArea: string; // e.g. '15.5 Acres'
  totalPlots?: number;
  totalResidences?: number;
  hospitalAreaSqFt?: number;
  hospitalStatus?: FeatureStatus;
  heroMedia: {
    type: 'IMAGE' | 'VIDEO' | 'DRONE';
    url: string;
    thumbnailUrl?: string;
    youtubeId?: string;
  };
  overview: {
    story: string;
    features: { title: string; desc: string; icon: string; status: FeatureStatus }[];
    amenities: { name: string; category: string; icon: string; status: FeatureStatus }[];
    healthcare: { name: string; desc: string; status: FeatureStatus }[];
  };
  pricing: {
    basePriceDisplay: string;
    downPaymentAmount?: string;
    prePossessionReturn?: string;
    postPossessionReturn?: string;
    leaseGuaranteeMonths?: number;
    buybackGuaranteed?: boolean;
    pricingNote?: string;
  };
  isPublished: boolean;
  enable3D: boolean;
  enableCAD: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryUnit {
  id: string; // e.g. 'UNIT-A-101', 'PLOT-A-01'
  projectId: string;
  unitCode: string;
  block?: string; // 'A', 'B', 'C', 'D', 'E', 'F'
  unitNumber: number;
  type: InventoryType;
  areaSqYd?: number;
  areaSqFt?: number;
  carpetAreaSqFt?: number;
  superAreaSqFt?: number;
  floorLevel?: 'stilt' | 'ground' | 'first' | 'second' | 'terrace' | 'plot';
  facing: 'North' | 'North-East' | 'East' | 'South-East' | 'South' | 'South-West' | 'West' | 'North-West';
  price: number; // in INR
  priceDisplay: string;
  status: InventoryStatus;
  features: string[];
  floorPlanUrl?: string;
  cadSvgAsset?: string;
  threeDAssetId?: string;
  assignedLeadId?: string;
  reservedAt?: string;
  soldAt?: string;
  notes?: string;
  updatedAt: string;
}

export interface Lead {
  id: string; // e.g. 'LEAD-10023'
  name: string;
  phone: string;
  email?: string;
  locationId?: string;
  projectId?: string;
  interestedUnitType?: InventoryType;
  budgetRange?: string;
  source: 'WEBSITE_FORM' | 'WHATSAPP' | 'DIRECT_CALL' | 'REFERRAL_LINK' | 'BROCHURE_DOWNLOAD' | 'SITE_VISIT_FORM' | 'ADMIN_MANUAL';
  referralCode?: string;
  referrerId?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  ipHash?: string;
  userAgent?: string;
  status: LeadStatus;
  assignedAgentId?: string;
  notes?: string;
  followUpDate?: string;
  isVerified: boolean;
  rewardStatus?: RewardStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadEvent {
  id: string;
  leadId: string;
  eventType: 'CREATED' | 'STATUS_CHANGED' | 'ASSIGNED' | 'NOTE_ADDED' | 'SITE_VISIT_SCHEDULED' | 'WHATSAPP_CONTACTED' | 'CALL_ATTEMPTED' | 'BOOKED' | 'CONVERTED';
  actorId?: string;
  actorName?: string;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface SiteVisit {
  id: string; // e.g. 'VISIT-501'
  leadId: string;
  name: string;
  phone: string;
  email?: string;
  projectId: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // '10:00 AM', '02:00 PM', '04:30 PM'
  numberOfVisitors: number;
  pickupRequired: boolean;
  pickupAddress?: string;
  message?: string;
  status: SiteVisitStatus;
  assignedAgentId?: string;
  notes?: string;
  feedback?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string; // e.g. 'BK-2026-001'
  bookingNumber: string;
  leadId: string;
  unitId: string;
  projectId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  bookingAmount: number;
  totalAgreedPrice: number;
  paymentPlanSelected: string;
  paymentStatus: 'TOKEN_RECEIVED' | 'DOWN_PAYMENT_COMPLETE' | 'REGISTRY_DONE' | 'CANCELLED';
  referrerId?: string;
  commissionAmount?: number;
  commissionStatus?: CommissionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Referrer {
  id: string;
  code: string; // e.g. 'SLF8K2'
  name: string;
  phone: string;
  email: string;
  upiId?: string;
  bankAccountDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    holderName: string;
  };
  isActive: boolean;
  totalVisits: number;
  totalLeadsSubmitted: number;
  verifiedLeadsCount: number;
  rejectedLeadsCount: number;
  totalEarnedRewards: number; // ₹50 per verified lead
  totalEarnedCommissions: number; // on sales
  totalPaidOut: number;
  pendingBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralReward {
  id: string; // 'RWD-101'
  referrerId: string;
  referrerCode: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  rewardAmount: number; // Default ₹50
  status: RewardStatus;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  paidAt?: string;
  payoutTxnId?: string;
  createdAt: string;
}

export interface Commission {
  id: string;
  referrerId: string;
  referrerCode: string;
  bookingId: string;
  unitId: string;
  projectId: string;
  saleValue: number;
  commissionType: 'PERCENTAGE' | 'FIXED';
  commissionRate: number; // e.g. 1.0 for 1%
  commissionAmount: number;
  status: CommissionStatus;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  paidAt?: string;
  payoutTxnId?: string;
  createdAt: string;
}

export interface DocumentVersion {
  version: number;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy: string;
  changeNotes?: string;
  blobPath?: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  category: 'legal' | 'registry' | 'approvals' | 'architecture' | 'financial' | 'healthcare' | 'project';
  categoryLabel: string;
  locationId?: string;
  projectId?: string;
  documentNumber?: string;
  authority: string;
  verificationStatus: 'VERIFIED' | 'PROPOSED' | 'APPROVED' | 'IN_PROGRESS' | 'DRAFT';
  verificationBadgeText: string;
  description: string;
  visibility: DocumentVisibility;
  status: DocumentStatus;
  currentVersion: number;
  versions: DocumentVersion[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  userName?: string;
  userRole?: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface SystemSettings {
  leadRewardAmount: number; // ₹50
  defaultCommissionPercentage: number; // 1.0%
  defaultFixedCommissionAmount: number; // ₹10,000
  referralAttributionCookieDays: number; // 30 days
  autoVerifyLeads: boolean;
  duplicatePhoneWindowDays: number; // 90 days
  notificationEmail: string;
  whatsappContactNumber: string;
  updatedAt: string;
}
