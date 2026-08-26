// src/app/leadership/page.tsx
import React from "react";
import { Metadata } from "next";
import { leadershipPageData, ownerProfile, ambassadors } from "@/data/leadershipData";
import { LeadershipHero } from "@/components/leadership/LeadershipHero";
import { OwnerFeatureSection } from "@/components/leadership/OwnerFeatureSection";
import { AmbassadorSection } from "@/components/leadership/AmbassadorSection";
import { LeadershipMediaSection } from "@/components/leadership/LeadershipMediaSection";
import { LeadershipTrustSystem } from "@/components/leadership/LeadershipTrustSystem";

export const metadata: Metadata = {
  title: "Leadership & Ambassadors | Senior Living Citizens Foundation",
  description:
    "Discover the institutional leadership, founder patronage, and distinguished ambassadors steering Senior Living Citizens Foundation towards India premier senior living ecosystem.",
  openGraph: {
    title: "Leadership & Ambassadors | Senior Living Citizens Foundation",
    description:
      "Institutional leadership, certified architectural masterplans, and dedicated ambassadors championing elder welfare and active ageing in Delhi NCR.",
    url: "https://seniorlivingcitizens.org/leadership",
    siteName: "Senior Living Citizens Foundation",
    images: [
      {
        url: "/images/indian-grandparents-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Senior Living Citizens Foundation Leadership"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  alternates: {
    canonical: "https://seniorlivingcitizens.org/leadership"
  }
};

export default function LeadershipPage() {
  // Collect any media items present across profiles
  const allMedia = [
    ...ownerProfile.media,
    ...ambassadors.flatMap((a) => a.media)
  ];

  // Organization Schema Markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Senior Living Citizens Foundation",
    alternateName: "SLCF",
    url: "https://seniorlivingcitizens.org/leadership",
    logo: "https://seniorlivingcitizens.org/project-assets/brand/logo-icon-clean.png",
    description:
      "Section 8 Non-Profit Organization creating barrier-free senior living townships with integrated Ayurvedic healthcare in Delhi NCR.",
    member: [
      {
        "@type": "Person",
        name: ownerProfile.name,
        jobTitle: ownerProfile.designation
      },
      ...ambassadors.map((a) => ({
        "@type": "Person",
        name: a.name,
        jobTitle: a.designation
      }))
    ]
  };

  return (
    <main className="min-h-screen bg-[#071519]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <LeadershipHero
        badge={leadershipPageData.hero.badge}
        headline={leadershipPageData.hero.headline}
        subheading={leadershipPageData.hero.subheading}
      />

      {/* 2. Owner / Founder Feature Profile */}
      <OwnerFeatureSection owner={ownerProfile} />

      {/* 3. Three Ambassadors Grid & Slide-Over Drawers */}
      <AmbassadorSection ambassadors={ambassadors} />

      {/* 4. Media & Talks Section (Conditionally renders if media exists) */}
      <LeadershipMediaSection mediaItems={allMedia} />

      {/* 5. Institutional Trust System & Direct Secretariat Connect */}
      <LeadershipTrustSystem trustAssurance={leadershipPageData.trustAssurance} />
    </main>
  );
}
