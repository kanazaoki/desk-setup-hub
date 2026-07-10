import type { MetadataRoute } from "next";
import { articles } from "@/lib/data/articles";
import { setups } from "@/lib/data/setups";

const BASE = "https://desk-setup-hub.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/setups`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/articles`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/tools/compatibility`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/budget`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/submit`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const setupPages: MetadataRoute.Sitemap = setups.map((s) => ({
    url: `${BASE}/setups/${s.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...setupPages];
}
