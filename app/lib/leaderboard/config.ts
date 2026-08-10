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
  // Count-like units below all use min: 1, not 0, deliberately: in
  // app/hooks/usePersonalBest.ts, a 0 score in higher-is-better mode is
  // treated as "no achievement" and is never stored as a personal best
  // (`mode === "higher" && score <= 0` short-circuits before the best is
  // set). Rejecting a 0 from the world board mirrors that existing
  // site-wide rule rather than conflicting with it — do not "fix" this to
  // min: 0 for consistency with %/acc%, which are percentages, not counts.
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
  // (80-5000) are wider and were chosen for other ms-unit tests (e.g. aim,
  // peripheral, go-no-go, number-comparison, visual-search) — do NOT let
  // the derived `ms` bounds widen this live board, it would change
  // validation behavior under existing data.
  reaction: { min: 80, max: 2000, lowerIsBetter: true },

  // These three `level`-unit tests plateau: past some level, difficulty
  // stops increasing and every further round is identical, so a
  // sufficiently persistent player can rack up levels indefinitely as an
  // endurance run rather than a skill ceiling. The generic `level` bounds
  // (1-50) would silently reject those legitimate high scores. Ceilings
  // below are generous on purpose — see BOUNDS_BY_UNIT's comment above the
  // count-like rows for the same "generous over strict" philosophy.

  // VisualMemory.tsx:18 — tilesForLevel = Math.min(3 + lvl, 25) plateaus at
  // level 22 (3+22=25); every round after that is the same 25-tiles-in-a
  // -36-cell (6x6) challenge, an endurance test from there on.
  "visual-memory": { min: 1, max: 500, lowerIsBetter: false },

  // ChangeDetectionTest.tsx:34 — grid size = Math.min(lvl + 1, 5) plateaus
  // at level 4 (a 5x5 grid); every round after that is the same difficulty,
  // an endurance test from there on.
  "change-detection": { min: 1, max: 500, lowerIsBetter: false },

  // FaceMemoryTest.tsx:51 — startLevel indexes LEVELS[Math.min(lvl,
  // LEVELS.length - 1)], and LEVELS has only 6 entries (indices 0-5), so
  // every round from level 6 onward reuses the hardest config forever, an
  // endurance test from there on.
  "face-memory": { min: 1, max: 500, lowerIsBetter: false },
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

// Board ids that don't map 1:1 to a single TESTS entry. DigitSpanTest.tsx
// has two modes — forward and backward — sharing one TESTS entry (href
// "/digit-span", key pb-digit-span-forward; backward's pb key isn't in
// TESTS at all, a separate known gap). Backward is materially harder than
// forward, so a single shared "digit-span" world board would just let
// forward players dominate every ranking — the same problem the sister
// site solved by giving each Sudoku difficulty its own board. Bounds and
// direction below mirror what the "digits" unit gives via BOUNDS_BY_UNIT
// (min: 1, max: 30, lowerIsBetter: false) — verified against that table,
// not hand-picked.
const EXTRA_BOARDS: Record<string, GameCfg> = {
  "digit-span-forward": { min: 1, max: 30, lowerIsBetter: false },
  "digit-span-backward": { min: 1, max: 30, lowerIsBetter: false },
};

// World board config, derived from TESTS and keyed by slug (test.href minus
// the leading "/"), plus EXTRA_BOARDS for ids that need a finer split than
// TESTS provides. Covers all 40 brain tests. Do not hand-edit the derived
// part — add a new TESTS entry (and a BOUNDS_BY_UNIT/OVERRIDES entry if
// needed) and it derives automatically.
//
// The single auto-derived "digit-span" id is deliberately dropped in favor
// of the two EXTRA_BOARDS entries above. Safe to drop: this branch is
// unreleased, so no scores were ever submitted to "digit-span" in Redis —
// unlike e.g. "reaction", which has live production data and must keep its
// exact key/bounds (see the OVERRIDES comment above).
const derivedGames = deriveGames();
delete derivedGames["digit-span"];

export const GAMES: Record<string, GameCfg> = { ...derivedGames, ...EXTRA_BOARDS };

// --- Family scoreboard board-id lookup ---------------------------------
//
// LeaderboardPanel's Family tab needs the *family* `pb-*` storage key (e.g.
// "pb-spatial") for whichever test's `game` slug it was mounted with (e.g.
// "rotation") — NOT the same thing as the World-board slug above. The two
// are usually equal but not always: TESTS' own `key` is the source of
// truth (it's what usePersonalBest actually writes to), and a couple of
// slugs diverge from the naive `pb-${slug}` guess (e.g. rotation → pb-spatial).
export type FamilyBoardCfg = { key: string; lowerIsBetter: boolean };

function deriveFamilyBoards(): Record<string, FamilyBoardCfg> {
  const boards: Record<string, FamilyBoardCfg> = {};
  for (const t of TESTS) {
    const slug = t.href.replace(/^\//, "");
    boards[slug] = { key: t.key, lowerIsBetter: t.mode === "lower" };
  }
  return boards;
}

// Extra family-board slugs that don't map 1:1 from a single TESTS entry —
// mirrors EXTRA_BOARDS above. DigitSpanTest.tsx passes game=
// "digit-span-forward"/"digit-span-backward" to LeaderboardPanel (not the
// single shared TESTS href "/digit-span"), and both follow the plain
// `pb-${game}` key pattern — confirmed against DigitSpanTest.tsx's own
// usePersonalBest calls, which use "pb-digit-span-forward"/
// "pb-digit-span-backward" directly.
const EXTRA_FAMILY_BOARDS: Record<string, FamilyBoardCfg> = {
  "digit-span-forward": { key: "pb-digit-span-forward", lowerIsBetter: false },
  "digit-span-backward": { key: "pb-digit-span-backward", lowerIsBetter: false },
};

// Same "drop the ambiguous auto-derived entry, union in the explicit split"
// pattern as GAMES above: the lone "digit-span" slug (from the one shared
// TESTS href) can't tell forward from backward, so it's replaced entirely.
const derivedFamilyBoards = deriveFamilyBoards();
delete derivedFamilyBoards["digit-span"];

export const FAMILY_BOARDS: Record<string, FamilyBoardCfg> = {
  ...derivedFamilyBoards,
  ...EXTRA_FAMILY_BOARDS,
};
