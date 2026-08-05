"use client";

import { useState, useEffect, useRef } from "react";
import { loadFamily, saveFamily } from "../lib/family/storage";
import { recordForActivePlayer } from "../lib/family/profiles";
import { LOWER_BOARDS } from "../lib/brainTests";

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
    // A zero score in higher-is-better mode is "no achievement" — never store
    // it as a PB (a stored 0 counts as a completed test on Brain Score)
    if (score === null || !initialized.current || (mode === "higher" && score <= 0)) {
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

    // Also record for the active family player, if this device has one. Not
    // nested inside the `isBetter` branch above: a score that isn't a new
    // device-wide best can still be a personal best for this particular
    // player. On a device with no family profiles, loadFamily().activeId is
    // null and this returns before ever calling saveFamily — no extra
    // localStorage *write*, only the harmless read loadFamily always does.
    // Wrapped so a family-storage failure can never break a test page. This
    // effect's dependency array is `[score]` only, so — like PlayMini's
    // `recorded` ref — a re-render alone can't rerun this and rewrite
    // storage; it only runs again when `score` itself changes.
    try {
      const fam = loadFamily();
      const next = recordForActivePlayer(fam, key, score, mode);
      if (next !== fam) saveFamily(next, LOWER_BOARDS);
    } catch {}
  }, [score]); // intentionally only depend on score

  return { best, isNewBest };
}
