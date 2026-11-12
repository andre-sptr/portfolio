import type { Metadata } from "next";

export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? new URL(url.origin) : undefined;
  } catch { return undefined; }
}

export const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  title: "Andre Saputra | RF Engineer",
  description: "RF Engineer focused on radio trunking systems, radio communication infrastructure, and network operations. Based in Indonesia.",
  authors: [{ name: "Andre Saputra" }],
  openGraph: { type: "website", locale: "en_US", title: "Andre Saputra | RF Engineer", description: "RF Engineer focused on radio trunking and communication infrastructure.", siteName: "Andre Saputra", ...(siteUrl ? { url: siteUrl } : {}), images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Andre Saputra | RF Engineer" }] },
  twitter: { card: "summary_large_image", title: "Andre Saputra | RF Engineer", description: "RF Engineer focused on radio trunking and communication infrastructure.", images: ["/og-image.png"] },
  icons: {
    icon: [
      { url: "/favicon.ico?v=20261021", type: "image/x-icon", sizes: "16x16 32x32 48x48 64x64 128x128 256x256" },
      { url: "/favicon-32.png?v=20261021", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png?v=20261021", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico?v=20261021",
    apple: { url: "/apple-icon.png?v=20261021", sizes: "180x180", type: "image/png" },
  },
};
