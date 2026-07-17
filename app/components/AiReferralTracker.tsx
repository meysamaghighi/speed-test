"use client";

import { useEffect } from "react";
import { detectAiSource } from "../lib/aiReferral";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function AiReferralTracker() {
  useEffect(() => {
    const source = detectAiSource(document.referrer);
    if (source) {
      if (typeof window.gtag === "function") {
        window.gtag("event", "ai_referral", {
          ai_source: source,
          page_path: window.location.pathname,
        });
      }
    }

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as Record<string, unknown>).__detectAiSource = detectAiSource;
    }
  }, []);

  return null;
}
