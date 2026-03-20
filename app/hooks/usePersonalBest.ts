"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook for localStorage personal bests.
 * @param key - localStorage key (e.g. "pb-reaction")
 * @param mode - "lower" if lower scores are better, "higher" if higher is better
 * @param score - current score to check, or null when not in result phase
 */
export function usePersonalBest(key: string, mode: "lower" | "higher", score: number | null) {
  const [best, setBest] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);
  const initialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) setBest(parseFloat(stored));
    } catch {}
    initialized.current = true;
  }, [key]);

  // Check score when it changes (non-null = result phase)
  useEffect(() => {
    if (score === null || !initialized.current) {
      setIsNewBest(false);
      return;
    }

    const isBetter =
      best === null ||
      (mode === "higher" ? score > best : score < best);

    if (isBetter) {
      setBest(score);
      setIsNewBest(true);
      try {
        localStorage.setItem(key, String(score));
      } catch {}
    } else {
      setIsNewBest(false);
    }
  }, [score]); // intentionally only depend on score

  return { best, isNewBest };
}
