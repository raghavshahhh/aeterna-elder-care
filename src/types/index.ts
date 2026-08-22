// ============================================================================
// SENIOR LIVING CITIZEN FOUNDATION — MASTER TYPE DEFINITIONS
// ============================================================================

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
  badge: string; // "Available • Phase 1" or "⏳ Future Release (Phase 2)"
  priceDisplay: string; // "₹25 Lakhs (Down Payment Plan)" or "Price to be Confirmed"
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
  status: 'phase1_enquiry' | 'future_phase' | 'custom_demarcation' | 'available' | 'on_hold' | 'sold';
  statusLabel?: string; // "Phase 1 Enquiry Open"
  priceEstimate: string; // "Indicative Range (Discussed on site walk)"
  enquiryNote?: string;
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
// Real vs. Proposed Transparency Types
// ----------------------------------------------------

export interface RealVsProposedItem {
  category: string;
  whatExistsToday: {
    title: string;
    description: string;
    badge: string;
    icon: string;
  };
  whatWeAreBuilding: {
    title: string;
    description: string;
    badge: string;
    icon: string;
  };
}

// ----------------------------------------------------
// 5 Benefit Groups (What You Get)
// ----------------------------------------------------

export interface BenefitGroupPillar {
  id: 'home' | 'care' | 'wellness' | 'community' | 'convenience';
  title: string;
  tagline: string;
  iconName: string;
  highlights: string[];
}

// ----------------------------------------------------
// Trust & Organization Credentials
// ----------------------------------------------------

export interface TrustCredential {
  iconName: string;
  title: string;
  authority: string;
  description: string;
  badge: string;
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

export interface WhatsAppLeadContext {
  actionType?: 'general' | 'reserve-unit' | 'reserve-plot' | 'book-site-visit' | 'request-pricing' | 'request-trust-docs' | 'rental-plan';
  title?: string;
  unitName?: string;
  unitType?: string;
  plotNumber?: string;
  plotBlock?: string;
  plotSize?: string;
  floorLevel?: string;
  city?: string;
  message?: string;
}

export interface FAQItem {
  id?: string;
  category?: string;
  question: string;
  answer: string;
}

export interface SiteVisitRequest {
  name: string;
  phone: string;
  email?: string;
  interestType: string;
  preferredDate?: string;
  city: string;
  notes?: string;
}

// ----------------------------------------------------
// Owner Document Vault Types
// ----------------------------------------------------
export type VaultDocumentCategory =
  | 'land_title'
  | 'architecture'
  | 'approvals'
  | 'site_location'
  | 'site_evidence'
  | 'other';

export interface VaultDocument {
  id: string;
  title: string;
  category: VaultDocumentCategory;
  categoryLabel: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'cad';
  fileSize: string;
  version: string;
  uploadedAt: string;
  uploadedBy: string;
  visibility: 'owner_only' | 'authorized' | 'public';
  pageCount?: number;
  previewImageUrl?: string;
}

export interface OwnerSession {
  isAuthenticated: boolean;
  ownerId?: string;
  email?: string;
  role?: 'owner' | 'authorized_viewer';
  expiresAt?: string;
}


