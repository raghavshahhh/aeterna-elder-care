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

export type BookingStatus =
  | 'HOLD'
  | 'CONFIRMED'
  | 'PAYMENT_PENDING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

export type PaymentStatus =
  | 'CREATED'
  | 'PENDING'
  | 'AUTHORIZED'
  | 'CAPTURED'
  | 'PARTIALLY_PAID'
  | 'PAID'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED';

export type InstallmentStatus =
  | 'PENDING'
  | 'DUE'
  | 'PAID'
  | 'OVERDUE'
  | 'PARTIALLY_PAID';

export type RefundStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

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
  name: string;
  slug: string;
  state: string;
  city: string;
  tagline: string;
  description: string;
  heroImage: string;
  featuredProjectCount: number;
  isPublished: boolean;
  displayOrder: number;
  franchiseId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPricing {
  basePrice?: number;
  basePriceDisplay?: string;
  downPaymentAmount?: number | string;
  downPaymentDisplay?: string;
  rentalReturnTillPossession?: number | string;
  rentalReturnAfterPossession?: number | string;
  prePossessionReturn?: string;
  postPossessionReturn?: string;
  leaseGuaranteeMonths?: number;
  leaseGuaranteeYears?: number | string;
  buybackGuaranteed?: boolean;
  pricingNote?: string;
  paymentPlansDescription?: string;
}

export interface ProjectOverview {
  headline?: string;
  subheadline?: string;
  story?: string;
  totalPlots?: number;
  totalResidences?: number;
  hospitalAreaSqFt?: number | string;
  communityMandir?: boolean;
  amenities?: Array<string | { name: string; category?: string; icon?: string; status?: string }>;
  features?: { title: string; desc: string; icon?: string; status?: string }[];
  healthcare?: { name: string; desc: string; type?: string; status?: string }[];
}

export interface Project {
  id: string;
  locationId: string;
  franchiseId?: string;
  name: string;
  slug: string;
  tagline?: string;
  projectType?: string;
  headline: string;
  subheadline: string;
  status: ProjectStatus;
  isPublished: boolean;
  displayOrder?: number;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  coordinates?: { lat: number; lng: number };
  totalArea?: string;
  hospitalStatus?: string;
  heroMedia?: {
    type?: string;
    url?: string;
    thumbnailUrl?: string;
    youtubeId?: string;
  };
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  pricing: ProjectPricing;
  overview: ProjectOverview;
  totalPlots?: number;
  totalResidences?: number;
  hospitalAreaSqFt?: number | string;
  enable3D?: boolean;
  enableCAD?: boolean;
  enableAvailabilityMatrix?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryUnit {
  id: string; // e.g. 'UNIT-G-01', 'PLOT-A-24'
  projectId: string;
  locationId?: string;
  unitCode: string; // 'Residence 01' or 'Plot 24'
  unitNumber?: string | number;
  type: InventoryType;
  block?: string;
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
  holdExpiresAt?: string;
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

// ----------------------------------------------------
// PAYMENT, BOOKING & INSTALLMENT ENTITIES
// ----------------------------------------------------

export interface PaymentInstallment {
  id: string; // e.g. 'INST-001'
  planId: string;
  bookingId: string;
  installmentNumber: number; // 1, 2, 3...
  title: string; // 'Booking Token', 'First Installment', 'Structure Completion', 'Possession & Registry'
  amount: number; // in INR
  paidAmount: number; // in INR
  dueDate: string; // YYYY-MM-DD
  gracePeriodDays: number; // e.g. 7
  status: InstallmentStatus;
  paymentId?: string;
  receiptId?: string;
  paidAt?: string;
  notes?: string;
}

export interface PaymentPlan {
  id: string; // e.g. 'PLAN-BK-2026-001'
  bookingId: string;
  projectId: string;
  unitId: string;
  totalAmount: number; // in INR
  totalPaid: number; // in INR
  totalRemaining: number; // in INR
  bookingAmount: number;
  numberOfInstallments: number;
  gracePeriodDays: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'DEFAULTED';
  installments: PaymentInstallment[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string; // e.g. 'BK-2026-001'
  bookingNumber: string; // 'SLF-HAR-2026-001'
  leadId: string;
  unitId: string;
  unitCode: string;
  unitType: InventoryType;
  projectId: string;
  projectTitle: string;
  locationId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress?: string;
  bookingAmount: number;
  totalAgreedPrice: number;
  totalPaidAmount: number;
  remainingBalance: number;
  status: BookingStatus;
  paymentPlanId?: string;
  holdExpiresAt?: string; // ISO string if in HOLD
  referrerCode?: string;
  referrerId?: string;
  commissionAmount?: number;
  commissionStatus?: CommissionStatus;
  assignedAdvisorName?: string;
  assignedAdvisorPhone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string; // e.g. 'PAY-10024'
  receiptNumber: string; // e.g. 'RCP-2026-001'
  bookingId: string;
  planId?: string;
  installmentId?: string;
  installmentNumber?: number;
  buyerId?: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  projectId: string;
  locationId: string;
  unitId: string;
  unitCode: string;
  amount: number; // in INR
  amountPaid: number; // in INR
  currency: string; // 'INR'
  method: 'RAZORPAY_CARD' | 'RAZORPAY_UPI' | 'RAZORPAY_NETBANKING' | 'NEFT_RTGS' | 'CHEQUE' | 'CASH';
  status: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpayPaymentLinkId?: string;
  razorpaySignature?: string;
  webhookVerified: boolean;
  webhookReceivedAt?: string;
  failureReason?: string;
  refundId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentLinkRecord {
  id: string; // 'PLINK-001'
  bookingId: string;
  installmentId?: string;
  razorpayLinkId: string;
  shortUrl: string;
  amount: number;
  amountPaid: number;
  amountDue: number;
  description: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: 'CREATED' | 'PARTIALLY_PAID' | 'PAID' | 'EXPIRED' | 'CANCELLED';
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentReceipt {
  id: string; // 'RCP-2026-001'
  receiptNumber: string;
  paymentId: string;
  bookingId: string;
  installmentId?: string;
  installmentTitle?: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerAddress?: string;
  projectTitle: string;
  locationName: string;
  unitCode: string;
  unitType: string;
  amountPaid: number;
  amountRemaining: number;
  totalPropertyAmount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionReference: string;
  razorpayPaymentId?: string;
  status: 'ISSUED' | 'VOID' | 'REFUNDED';
  qrVerificationUrl?: string;
  createdAt: string;
}

export interface RefundRecord {
  id: string; // 'REF-001'
  paymentId: string;
  bookingId: string;
  amount: number;
  reason: string;
  requestedBy: string;
  approvedBy?: string;
  status: RefundStatus;
  razorpayRefundId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentEvent {
  id: string;
  bookingId: string;
  paymentId?: string;
  installmentId?: string;
  eventType:
    | 'PAYMENT_LINK_CREATED'
    | 'ORDER_CREATED'
    | 'PAYMENT_INITIATED'
    | 'PAYMENT_CAPTURED'
    | 'PAYMENT_FAILED'
    | 'INSTALLMENT_PAID'
    | 'BOOKING_CONFIRMED'
    | 'REFUND_REQUESTED'
    | 'REFUND_APPROVED'
    | 'HOLD_EXPIRED'
    | 'COMMISSION_CALCULATED';
  description: string;
  metadata?: Record<string, unknown>;
  actorId?: string;
  actorName?: string;
  createdAt: string;
}

export interface BuyerDocument {
  id: string;
  bookingId: string;
  buyerPhone: string;
  title: string;
  category: 'RECEIPT' | 'ALLOTMENT_LETTER' | 'BOOKING_AGREEMENT' | 'TRUST_CERTIFICATE' | 'CAD_BLUEPRINT';
  fileName: string;
  fileSize: string;
  downloadUrl: string;
  uploadedAt: string;
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
  holdExpiryHours: number; // e.g. 24 hours
  razorpayKeyId?: string;
  razorpayWebhookSecret?: string;
  notificationEmail: string;
  whatsappContactNumber: string;
  updatedAt: string;
}
