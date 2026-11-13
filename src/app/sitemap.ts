import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const origin = siteUrl.origin;
  return [
    { url: `${origin}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${origin}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/projects/`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
