import { TESTS } from "../brainTests.ts";

export const SITE = "bmb";

export type GameCfg = { min: number; max: number; lowerIsBetter: boolean };

// World-board bounds by test `unit`. Ceilings are deliberately generous:
// rejecting someone's legitimately great score is worse than accepting a
// forged one on a casual board. Every unit used by TESTS must appear here —
// see the throw in the derivation loop below.
export const BOUNDS_BY_UNIT: Record<string, { min: number; max: number }> = {
  ms: { min: 80, max: 5000 },
  level: { min: 1, max: 50 },
  WPM: { min: 5, max: 300 },
  "%": { min: 0, max: 100 },
  "acc%": { min: 0, max: 100 },
  score: { min: 1, max: 100000 },
  pts: { min: 1, max: 100000 },
  digits: { min: 1, max: 30 },
  streak: { min: 1, max: 500 },
  words: { min: 1, max: 500 },
  catches: { min: 1, max: 500 },
  CPS: { min: 1, max: 30 },
  s: { min: 1, max: 3600 },
  "/12": { min: 0, max: 12 },
  "/15": { min: 0, max: 15 },
};

// Per-slug overrides that win over BOUNDS_BY_UNIT. Keep this map minimal —
// it exists for cases where the generic unit bounds don't match reality for
// one specific board.
const OVERRIDES: Record<string, GameCfg> = {
  // `reaction` has real player scores in Redis under this exact key with
  // these exact bounds (min: 80, max: 2000). The generic `ms` bounds above
  // (80-5000) are wider and were chosen for other ms-unit tests (e.g.
  // trail-making-adjacent ones) — do NOT let the derived `ms` bounds widen
  // this live board, it would change validation behavior under existing data.
  reaction: { min: 80, max: 2000, lowerIsBetter: true },
};

function deriveGames(): Record<string, GameCfg> {
  const games: Record<string, GameCfg> = {};
  for (const t of TESTS) {
    const slug = t.href.replace(/^\//, "");
    const override = OVERRIDES[slug];
    if (override) {
      games[slug] = override;
      continue;
    }
    const bounds = BOUNDS_BY_UNIT[t.unit];
    if (!bounds) {
      throw new Error(
        `leaderboard/config: no bounds defined for unit "${t.unit}" used by test "${t.label}" (${t.href}). ` +
          `Add an entry to BOUNDS_BY_UNIT or an OVERRIDES entry for slug "${slug}".`
      );
    }
    games[slug] = {
      min: bounds.min,
      max: bounds.max,
      lowerIsBetter: t.mode === "lower",
    };
  }
  return games;
}

// World board config, derived from TESTS and keyed by slug (test.href minus
// the leading "/"). Covers all 40 brain tests. Do not hand-edit this list —
// add a new TESTS entry (and a BOUNDS_BY_UNIT/OVERRIDES entry if needed) and
// it derives automatically.
export const GAMES: Record<string, GameCfg> = deriveGames();
