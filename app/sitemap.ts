import type { MetadataRoute } from "next";

const BASE = "https://benchmybrain.com";

// Stable lastmod. Only bump this when real content changes (new test, copy update).
// GSC down-ranks sitemaps whose lastmod churns on every deploy.
const SITE_LAST_MODIFIED = "2026-07-13";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITE_LAST_MODIFIED;

  return [
    { url: BASE, lastModified, priority: 1.0 },
    { url: `${BASE}/reaction`, lastModified, priority: 0.9 },
    { url: `${BASE}/typing`, lastModified, priority: 0.9 },
    { url: `${BASE}/memory`, lastModified, priority: 0.9 },
    { url: `${BASE}/aim`, lastModified, priority: 0.9 },
    { url: `${BASE}/click-speed`, lastModified, priority: 0.9 },
    { url: `${BASE}/chimp`, lastModified, priority: 0.9 },
    { url: `${BASE}/visual-memory`, lastModified, priority: 0.9 },
    { url: `${BASE}/sequence`, lastModified, priority: 0.9 },
    { url: `${BASE}/verbal`, lastModified, priority: 0.9 },
    { url: `${BASE}/stroop`, lastModified, priority: 0.9 },
    { url: `${BASE}/color-blind`, lastModified, priority: 0.9 },
    { url: `${BASE}/math`, lastModified, priority: 0.9 },
    { url: `${BASE}/peripheral`, lastModified, priority: 0.9 },
    { url: `${BASE}/reading`, lastModified, priority: 0.9 },
    { url: `${BASE}/reverse-memory`, lastModified, priority: 0.9 },
    { url: `${BASE}/pattern`, lastModified, priority: 0.9 },
    { url: `${BASE}/rotation`, lastModified, priority: 0.9 },
    { url: `${BASE}/rhythm`, lastModified, priority: 0.9 },
    { url: `${BASE}/word-speed`, lastModified, priority: 0.9 },
    { url: `${BASE}/number-speed`, lastModified, priority: 0.9 },
    { url: `${BASE}/face-memory`, lastModified, priority: 0.9 },
    { url: `${BASE}/color-match`, lastModified, priority: 0.9 },
    { url: `${BASE}/focus-timer`, lastModified, priority: 0.9 },
    { url: `${BASE}/digit-span`, lastModified, priority: 0.9 },
    { url: `${BASE}/emotion`, lastModified, priority: 0.9 },
    { url: `${BASE}/trail-making`, lastModified, priority: 0.9 },
    { url: `${BASE}/go-no-go`, lastModified, priority: 0.9 },
    { url: `${BASE}/n-back`, lastModified, priority: 0.9 },
    { url: `${BASE}/hand-eye`, lastModified, priority: 0.9 },
    { url: `${BASE}/audio-memory`, lastModified, priority: 0.9 },
    { url: `${BASE}/color-memory`, lastModified, priority: 0.9 },
    { url: `${BASE}/word-association`, lastModified, priority: 0.9 },
    { url: `${BASE}/number-comparison`, lastModified, priority: 0.9 },
    { url: `${BASE}/visual-search`, lastModified, priority: 0.9 },
    { url: `${BASE}/peripheral-test`, lastModified, priority: 0.9 },
    { url: `${BASE}/pattern-speed`, lastModified, priority: 0.9 },
    { url: `${BASE}/math-memory`, lastModified, priority: 0.9 },
    { url: `${BASE}/dual-task`, lastModified, priority: 0.9 },
    { url: `${BASE}/change-detection`, lastModified, priority: 0.9 },
    { url: `${BASE}/estimation`, lastModified, priority: 0.9 },
    { url: `${BASE}/anticipation`, lastModified, priority: 0.9 },
    { url: `${BASE}/brain-score`, lastModified, priority: 0.8 },
    { url: `${BASE}/daily`, lastModified, priority: 0.9 },
    { url: `${BASE}/stack-tower`, lastModified, priority: 0.7 },
    { url: `${BASE}/about`, lastModified, priority: 0.3 },
  ];
}
