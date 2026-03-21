import type { MetadataRoute } from "next";

const BASE = "https://benchmybrain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, priority: 1.0 },
    { url: `${BASE}/reaction`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/typing`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/memory`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/aim`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/click-speed`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/chimp`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/visual-memory`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/sequence`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/verbal`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/stroop`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/color-blind`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/math`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/peripheral`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/reading`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/reverse-memory`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/pattern`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/rotation`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/rhythm`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/brain-score`, lastModified: now, priority: 0.8 },
  ];
}
