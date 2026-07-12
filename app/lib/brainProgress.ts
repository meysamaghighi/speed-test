// Brain Score progress history: local-only score snapshots over time.
// No backend, no accounts, no payment code — pure localStorage, defensive
// against corrupt/garbage data (never throws, degrades to an empty history).

const HISTORY_KEY = "bmb-score-history";
const MAX_ENTRIES = 30;

export interface ScoreSnapshot {
  date: string; // YYYY-MM-DD, local calendar day
  score: number; // brainPoints, 0-1000
}

export function readHistory(): ScoreSnapshot[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is ScoreSnapshot =>
        !!e &&
        typeof e.date === "string" &&
        typeof e.score === "number" &&
        Number.isFinite(e.score)
    );
  } catch {
    return [];
  }
}

// Records today's score once per calendar day — re-visiting the same day
// updates that day's entry in place instead of appending, so repeat visits
// don't balloon the history.
export function recordSnapshot(score: number): ScoreSnapshot[] {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const history = readHistory();
    const existingIdx = history.findIndex((e) => e.date === today);
    if (existingIdx >= 0) {
      history[existingIdx] = { date: today, score };
    } else {
      history.push({ date: today, score });
    }
    const trimmed = history.slice(-MAX_ENTRIES);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    return trimmed;
  } catch {
    return readHistory();
  }
}
