// src/types/leadership.ts
// ============================================================================
// SENIOR LIVING CITIZENS FOUNDATION — LEADERSHIP & AMBASSADORS TYPE SYSTEM
// ============================================================================

export type VerificationType = "VERIFIED" | "SOURCE_LINKED" | "MEDIA" | "PENDING";

export interface SocialLinks {
  linkedin?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  x?: string;
  website?: string;
  wikipedia?: string;
  otherLinks?: { label: string; url: string }[];
}

export interface CompanyAssociation {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  role?: string;
  relationship?: string;
  period?: string;
  description?: string;
  projects?: string[];
  image?: string;
  verification?: VerificationType;
}

export interface CareerMilestone {
  id: string;
  year?: string;
  period?: string;
  organization?: string;
  role?: string;
  description?: string;
  achievement?: string;
  companyLogo?: string;
  companyWebsite?: string;
  projectImage?: string;
  supportingLink?: { label: string; url: string };
}

export interface MediaItem {
  id: string;
  platform: "youtube" | "podcast" | "article" | "interview" | "talk";
  title: string;
  url: string;
  thumbnail?: string;
  channel?: string;
  date?: string;
  description?: string;
  duration?: string;
}

export interface LeadershipProfile {
  id: string;
  type: "owner" | "ambassador";
  name: string;
  designation: string;
  subDesignation?: string;
  portrait?: string;
  portraitAlt?: string;
  shortBio?: string;
  biography?: string[];
  currentRole?: string;
  expertise: string[];
  companies: CompanyAssociation[];
  careerTimeline: CareerMilestone[];
  achievements: string[];
  awards: string[];
  pastVentures?: string[];
  media: MediaItem[];
  socialLinks: SocialLinks;
  credibilityNotes?: string[];
  status: "ready" | "pending_details";
  verificationBadge?: { label: string; type: VerificationType };
}

export interface LeadershipPageData {
  hero: {
    badge: string;
    headline: string;
    subheading: string;
    institutionalPillars: { title: string; subtitle: string; icon: string }[];
  };
  ownerProfile: LeadershipProfile;
  ambassadors: LeadershipProfile[];
  trustAssurance: {
    section8Registration: string;
    architecturalAuthority: string;
    landTitleStatus: string;
    secretariatNotice: string;
  };
}
