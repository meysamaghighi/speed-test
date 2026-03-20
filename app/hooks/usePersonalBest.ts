"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook for localStorage personal bests.
 * @param key - localStorage key (e.g. "pb-reaction")
 * @param mode - "lower" if lower scores are better (e.g. reaction time), "higher" if higher is better
 */
export function usePersonalBest(key: string, mode: "lower" | "higher") {
  const [best, setBestState] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) setBestState(parseFloat(stored));
    } catch {}
  }, [key]);

  const checkAndSet = useCallback(
    (value: number) => {
      const isBetter =
        best === null ||
        (mode === "higher" ? value > best : value < best);

      if (isBetter) {
        setBestState(value);
        setIsNewBest(true);
        try {
          localStorage.setItem(key, String(value));
        } catch {}
      } else {
        setIsNewBest(false);
      }
      return isBetter;
    },
    [key, mode, best]
  );

  const resetNewBest = useCallback(() => setIsNewBest(false), []);

  return { best, checkAndSet, isNewBest, resetNewBest };
}
