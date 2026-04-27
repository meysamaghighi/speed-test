"use client";

import { useCallback, useEffect, useState } from "react";

export type ProgressMode = "higher" | "lower";

export type ProgressEntry = {
  best: number;
  plays: number;
  lastScore: number;
  mode: ProgressMode;
};

export type ProgressV1 = {
  v: 1;
  lastPlayed: string | null;
  streak: { count: number; lastDate: string | null };
  history: Record<string, ProgressEntry>;
};

const SITE_ID = "speedtest";
const STORAGE_KEY = `${SITE_ID}_progress`;

const EMPTY: ProgressV1 = {
  v: 1,
  lastPlayed: null,
  streak: { count: 0, lastDate: null },
  history: {},
};

function load(): ProgressV1 {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (parsed?.v === 1) return { ...EMPTY, ...parsed };
  } catch {}
  return EMPTY;
}

function save(state: ProgressV1) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/**
 * Read legacy `pb-${gameId}` keys written by usePersonalBest.ts. Used as a
 * one-time seed when a test is first played through useProgress; original key
 * is left intact so usePersonalBest keeps working until Phase 2 retrofits the
 * test pages.
 */
function readLegacyBest(gameId: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(`pb-${gameId}`);
    if (v === null) return null;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysApart(a: string, b: string): number {
  return Math.round(
    (new Date(a).getTime() - new Date(b).getTime()) / 86_400_000
  );
}

/**
 * NOTE: speed-test already has a working daily streak persisted at the
 * `bmb_daily` localStorage key by app/daily/DailyChallenge.tsx. Phase 1 leaves
 * that path intact. Phase 2 will add a one-time migrator copying
 * bmb_daily.streak → speedtest_progress.streak.count.
 */
export function useProgress() {
  const [state, setState] = useState<ProgressV1>(EMPTY);

  useEffect(() => {
    setState(load());
  }, []);

  const recordPlay = useCallback(
    (gameId: string, score: number, mode: ProgressMode) => {
      let isNewBest = false;
      setState(prev => {
        const existing = prev.history[gameId];
        const currentBest = existing ? existing.best : readLegacyBest(gameId);
        const isBetter =
          currentBest === null ||
          (mode === "higher" ? score > currentBest : score < currentBest);
        isNewBest = isBetter;
        const next: ProgressV1 = {
          ...prev,
          lastPlayed: todayISO(),
          history: {
            ...prev.history,
            [gameId]: {
              best: isBetter ? score : (currentBest as number),
              plays: (existing?.plays ?? 0) + 1,
              lastScore: score,
              mode,
            },
          },
        };
        save(next);
        return next;
      });
      return { isNewBest };
    },
    []
  );

  const bumpStreak = useCallback(() => {
    setState(prev => {
      const today = todayISO();
      const last = prev.streak.lastDate;
      if (last === today) return prev;
      const count =
        last && daysApart(today, last) === 1 ? prev.streak.count + 1 : 1;
      const next: ProgressV1 = {
        ...prev,
        streak: { count, lastDate: today },
      };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(EMPTY);
    save(EMPTY);
  }, []);

  return { state, recordPlay, bumpStreak, reset };
}
