import type { Metadata } from "next";
import { profile } from "@/data/profile";

export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? new URL(url.origin) : undefined;
  } catch {
    return undefined;
  }
}

export const siteUrl = getSiteUrl();

export const ogImages = [
  {
    url: "/og-cover.png",
    width: 1200,
    height: 630,
    alt: "Andre Saputra — RF & Network Engineer",
  },
];

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  title: "Andre Saputra | RF Engineer",
  description:
    "RF Engineer focused on radio trunking systems, radio communication infrastructure, and network operations. Based in Indonesia.",
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Andre Saputra | RF Engineer",
    description: "RF Engineer focused on radio trunking and communication infrastructure.",
    siteName: profile.name,
    images: ogImages,
    ...(siteUrl ? { url: `${siteUrl.origin}/` } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Saputra | RF Engineer",
    description: "RF Engineer focused on radio trunking and communication infrastructure.",
    images: ["/og-cover.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=20261113", type: "image/x-icon", sizes: "16x16 32x32 48x48 64x64 128x128 256x256" },
      { url: "/favicon-32.png?v=20261113", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png?v=20261113", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico?v=20261113",
    apple: { url: "/apple-icon.png?v=20261113", sizes: "180x180", type: "image/png" },
  },
};

export function getPersonJsonLd() {
  const origin = siteUrl?.origin;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "RF & Network Engineer",
    description: profile.about.introduction,
    ...(origin ? { url: `${origin}/`, image: `${origin}/og-cover.png` } : {}),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Politeknik Caltex Riau",
    },
    worksFor: {
      "@type": "Organization",
      name: "PT Nexcom Indonesia",
    },
    sameAs: [profile.github, profile.linkedin, profile.threads, profile.instagram],
    knowsAbout: [
      "Radio Communication Systems",
      "Radio Trunking Operations",
      "IP Site Connect",
      "Capacity Plus",
      "Motorola Capacity Max",
      "Network Infrastructure",
      "AI Implementation",
      "Workflow Automation",
    ],
  };
}
