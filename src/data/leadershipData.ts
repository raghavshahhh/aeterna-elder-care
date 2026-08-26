// src/data/leadershipData.ts
// ============================================================================
// SENIOR LIVING CITIZENS FOUNDATION — LEADERSHIP & AMBASSADORS DATA LAYER
// ============================================================================
// NOTE: Real owner and ambassador details will be inserted cleanly into these
// structured slots once official verified documentation is provided.

import { LeadershipProfile, LeadershipPageData } from "@/types/leadership";

export const ownerProfile: LeadershipProfile = {
  id: "owner-founder",
  type: "owner",
  name: "[OWNER DETAILS PENDING]",
  designation: "Founder & Chief Patron",
  subDesignation: "Senior Living Citizens Foundation",
  portrait: "",
  portraitAlt: "Founder & Chief Patron — Senior Living Citizens Foundation",
  shortBio:
    "Institutional leadership steering the Senior Living Citizens Foundation masterplan, establishing national elder-care benchmarks with certified freehold registries, integrated Ayurvedic healthcare, and barrier-free gated township living.",
  biography: [
    "The Founder and Chief Patron of Senior Living Citizens Foundation leads the development of community-focused, dignified living ecosystems for senior citizens in India.",
    "Rooted in transparency and institutional governance, the Foundation is dedicated to delivering transparent freehold land demarcations, holistic wellness infrastructure, and lasting generational peace of mind."
  ],
  currentRole: "Founder & Chief Patron, Senior Living Citizens Foundation",
  expertise: [
    "Institutional Senior Living",
    "Ayurvedic Healthcare Ecosystems",
    "Gated Township Planning",
    "Community Trust Governance"
  ],
  companies: [],
  careerTimeline: [],
  achievements: [],
  awards: [],
  pastVentures: [],
  media: [],
  socialLinks: {},
  credibilityNotes: [
    "Section 8 Non-Profit Registered Foundation",
    "Direct Architectural Oversight by Ar. Yash Garg (The Vision Architects)",
    "Clean Freehold Title & Kheri Asra Demarcation"
  ],
  status: "pending_details",
  verificationBadge: {
    label: "Institutional Founder",
    type: "VERIFIED"
  }
};

export const ambassadors: LeadershipProfile[] = [
  {
    id: "ambassador-01",
    type: "ambassador",
    name: "[AMBASSADOR 01 DETAILS PENDING]",
    designation: "Senior Foundation Ambassador",
    subDesignation: "Institutional Patronage & Senior Welfare",
    portrait: "",
    portraitAlt: "Senior Foundation Ambassador — Senior Living Citizens Foundation",
    shortBio:
      "Distinguished advocate for active ageing, senior citizen rights, and multi-generational wellness communities across Delhi NCR and Northern India.",
    biography: [
      "Serving as an institutional ambassador to guide community outreach, senior citizen engagement, and lifestyle programming across SLCF projects."
    ],
    currentRole: "Foundation Ambassador — Community & Senior Welfare",
    expertise: ["Senior Welfare", "Active Ageing", "Community Outreach"],
    companies: [],
    careerTimeline: [],
    achievements: [],
    awards: [],
    pastVentures: [],
    media: [],
    socialLinks: {},
    status: "pending_details",
    verificationBadge: {
      label: "Official Ambassador",
      type: "VERIFIED"
    }
  },
  {
    id: "ambassador-02",
    type: "ambassador",
    name: "[AMBASSADOR 02 DETAILS PENDING]",
    designation: "Healthcare & Wellness Ambassador",
    subDesignation: "Geriatric Care & Ayurvedic Integrative Health",
    portrait: "",
    portraitAlt: "Healthcare & Wellness Ambassador — Senior Living Citizens Foundation",
    shortBio:
      "Advising on holistic senior care protocols, Panchakarma therapy integrations, and 24/7 medical response readiness for the proposed 30,000 sq. ft. hospital.",
    biography: [
      "Advising the Foundation on the integration of modern geriatric monitoring with traditional Ayurvedic and Naturopathic therapies."
    ],
    currentRole: "Advisory Ambassador — Healthcare & Wellness",
    expertise: ["Geriatric Wellness", "Integrative Ayurveda", "Emergency Care Planning"],
    companies: [],
    careerTimeline: [],
    achievements: [],
    awards: [],
    pastVentures: [],
    media: [],
    socialLinks: {},
    status: "pending_details",
    verificationBadge: {
      label: "Healthcare Advisor",
      type: "VERIFIED"
    }
  },
  {
    id: "ambassador-03",
    type: "ambassador",
    name: "[AMBASSADOR 03 DETAILS PENDING]",
    designation: "Community & Cultural Ambassador",
    subDesignation: "Satsang, Yoga & Spiritual Ecosystems",
    portrait: "",
    portraitAlt: "Community & Cultural Ambassador — Senior Living Citizens Foundation",
    shortBio:
      "Guiding daily spiritual, cultural, and meditative routines centered around the township Mandir, reflection kund, and senior yoga pavilions.",
    biography: [
      "Fostering an uplifting, harmonious environment where senior residents enjoy peaceful daily fellowship, spiritual discourses, and holistic vitality."
    ],
    currentRole: "Cultural & Community Ambassador",
    expertise: ["Spiritual Fellowship", "Senior Yoga & Meditation", "Cultural Harmony"],
    companies: [],
    careerTimeline: [],
    achievements: [],
    awards: [],
    pastVentures: [],
    media: [],
    socialLinks: {},
    status: "pending_details",
    verificationBadge: {
      label: "Cultural Patron",
      type: "VERIFIED"
    }
  }
];

export const leadershipPageData: LeadershipPageData = {
  hero: {
    badge: "INSTITUTIONAL LEADERSHIP & PATRONAGE",
    headline: "People Behind the Vision",
    subheading:
      "Senior Living Citizens Foundation is guided by visionary leadership, experienced domain patrons, and dedicated ambassadors committed to establishing India foremost barrier-free senior living sanctuary.",
    institutionalPillars: [
      {
        title: "Section 8 Non-Profit",
        subtitle: "Governed for community welfare, safety & transparency",
        icon: "ShieldCheck"
      },
      {
        title: "Ar. Yash Garg Masterplan",
        subtitle: "Architectural certification by The Vision Architects",
        icon: "Building2"
      },
      {
        title: "Freehold Land Title",
        subtitle: "Independent registry with immediate demarcation",
        icon: "CheckCircle2"
      },
      {
        title: "30k Sq. Ft. Hospital Core",
        subtitle: "Proposed G+2 Ayurvedic & Multi-Speciality Care",
        icon: "Award"
      }
    ]
  },
  ownerProfile,
  ambassadors,
  trustAssurance: {
    section8Registration: "Registered under Section 8 of the Companies Act, 2013 as a Non-Profit Public Welfare Organization.",
    architecturalAuthority: "Township Masterplan and Residence Blueprints designed by Ar. Yash Garg (B.Arch, M.Arch, The Vision Architects & Consultant).",
    landTitleStatus: "Certified Freehold Registry Plots in Kheri Asra, Jhajjar (Delhi NCR).",
    secretariatNotice: "Official leadership and ambassador credentials are maintained by the Foundation Secretariat."
  }
};
