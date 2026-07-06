// Shared brain test definitions: single source of truth for Brain Score and the Cognitive Report.
export interface TestDef {
  key: string;
  label: string;
  href: string;
  mode: "lower" | "higher";
  unit: string;
  // Scoring function: converts raw PB to a 0-100 score
  toScore: (raw: number) => number;
}

export const TESTS: TestDef[] = [
  {
    key: "pb-reaction",
    label: "Reaction Time",
    href: "/reaction",
    mode: "lower",
    unit: "ms",
    toScore: (ms) => clamp(100 - ((ms - 150) / 350) * 100), // 150ms=100, 500ms=0
  },
  {
    key: "pb-typing",
    label: "Typing Speed",
    href: "/typing",
    mode: "higher",
    unit: "WPM",
    toScore: (wpm) => clamp(((wpm - 20) / 80) * 100), // 20=0, 100=100
  },
  {
    key: "pb-number-memory",
    label: "Number Memory",
    href: "/memory",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 12) * 100), // 12=100
  },
  {
    key: "pb-aim",
    label: "Aim Trainer",
    href: "/aim",
    mode: "lower",
    unit: "ms",
    toScore: (ms) => clamp(100 - ((ms - 300) / 700) * 100), // 300ms=100, 1000ms=0
  },
  {
    key: "pb-cps",
    label: "Click Speed",
    href: "/click-speed",
    mode: "higher",
    unit: "CPS",
    toScore: (cps) => clamp(((cps - 3) / 9) * 100), // 3=0, 12=100
  },
  {
    key: "pb-chimp",
    label: "Chimp Test",
    href: "/chimp",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 10) * 100), // 10=100
  },
  {
    key: "pb-visual-memory",
    label: "Visual Memory",
    href: "/visual-memory",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 15) * 100), // 15=100
  },
  {
    key: "pb-sequence",
    label: "Sequence Memory",
    href: "/sequence",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 15) * 100),
  },
  {
    key: "pb-verbal",
    label: "Verbal Memory",
    href: "/verbal",
    mode: "higher",
    unit: "words",
    toScore: (w) => clamp((w / 80) * 100), // 80=100
  },
  {
    key: "pb-stroop",
    label: "Stroop Test",
    href: "/stroop",
    mode: "higher",
    unit: "score",
    toScore: (s) => clamp((s / 20) * 100), // 20=100
  },
  {
    key: "pb-math",
    label: "Math Speed",
    href: "/math",
    mode: "higher",
    unit: "pts",
    toScore: (s) => clamp((s / 300) * 100), // 300=100
  },
  {
    key: "pb-peripheral",
    label: "Peripheral Reaction",
    href: "/peripheral",
    mode: "lower",
    unit: "ms",
    toScore: (ms) => clamp(100 - ((ms - 400) / 600) * 100), // 400ms=100, 1000ms=0
  },
  {
    key: "pb-reading",
    label: "Reading Speed",
    href: "/reading",
    mode: "higher",
    unit: "WPM",
    toScore: (wpm) => clamp(((wpm - 100) / 400) * 100), // 100=0, 500=100
  },
  {
    key: "pb-reverse-memory",
    label: "Reverse Memory",
    href: "/reverse-memory",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 10) * 100),
  },
  {
    key: "pb-pattern",
    label: "Pattern Recognition",
    href: "/pattern",
    mode: "higher",
    unit: "/12",
    toScore: (s) => clamp((s / 12) * 100),
  },
  {
    key: "pb-spatial",
    label: "Spatial Rotation",
    href: "/rotation",
    mode: "higher",
    unit: "/15",
    toScore: (s) => clamp((s / 15) * 100),
  },
  {
    key: "pb-rhythm",
    label: "Rhythm Timing",
    href: "/rhythm",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 10) * 100),
  },
  {
    key: "pb-word-speed",
    label: "Word Speed",
    href: "/word-speed",
    mode: "higher",
    unit: "WPM",
    toScore: (wpm) => clamp(((wpm - 20) / 80) * 100), // 20=0, 100=100
  },
  {
    key: "pb-number-speed",
    label: "Number Speed",
    href: "/number-speed",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 10) * 100), // 10=100
  },
  {
    key: "pb-face-memory",
    label: "Face Memory",
    href: "/face-memory",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 12) * 100), // 12=100
  },
  {
    key: "pb-color-match",
    label: "Color Match",
    href: "/color-match",
    mode: "higher",
    unit: "pts",
    toScore: (s) => clamp((s / 3000) * 100), // composite score, 3000 = top rating
  },
  {
    key: "pb-focus-timer",
    label: "Focus Timer",
    href: "/focus-timer",
    mode: "higher",
    unit: "acc%",
    toScore: (acc) => clamp(((acc - 50) / 50) * 100), // 50%=0, 100%=100
  },
  {
    key: "pb-digit-span-forward",
    label: "Digit Span",
    href: "/digit-span",
    mode: "higher",
    unit: "digits",
    toScore: (lvl) => clamp((lvl / 10) * 100), // 10=100
  },
  {
    key: "pb-emotion",
    label: "Emotion Recognition",
    href: "/emotion",
    mode: "higher",
    unit: "score",
    toScore: (s) => clamp(s), // component saves a 0-100 score (accuracy - time penalty)
  },
  {
    key: "pb-trail-making",
    label: "Trail Making",
    href: "/trail-making",
    mode: "lower",
    unit: "s",
    toScore: (s) => clamp(100 - ((s - 15) / 45) * 100), // 15s=100, 60s=0
  },
  {
    key: "pb-go-no-go",
    label: "Go/No-Go",
    href: "/go-no-go",
    mode: "lower",
    unit: "ms",
    toScore: (ms) => clamp(100 - ((ms - 250) / 450) * 100), // 250ms=100, 700ms=0
  },
  {
    key: "pb-n-back",
    label: "N-Back",
    href: "/n-back",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 5) * 100), // 5=100
  },
  {
    key: "pb-hand-eye",
    label: "Hand-Eye Coordination",
    href: "/hand-eye",
    mode: "higher",
    unit: "catches",
    toScore: (c) => clamp((c / 50) * 100), // 50=100
  },
  {
    key: "pb-audio-memory",
    label: "Audio Memory",
    href: "/audio-memory",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 12) * 100), // 12=100
  },
  {
    key: "pb-color-memory",
    label: "Color Memory",
    href: "/color-memory",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 12) * 100), // 12=100
  },
  {
    key: "pb-word-association",
    label: "Word Association",
    href: "/word-association",
    mode: "higher",
    unit: "WPM",
    toScore: (wpm) => clamp(((wpm - 5) / 20) * 100), // 5=0, 25=100
  },
  {
    key: "pb-number-comparison",
    label: "Number Comparison",
    href: "/number-comparison",
    mode: "lower",
    unit: "ms",
    toScore: (ms) => clamp(100 - ((ms - 400) / 600) * 100), // 400ms=100, 1000ms=0
  },
  {
    key: "pb-visual-search",
    label: "Visual Search",
    href: "/visual-search",
    mode: "lower",
    unit: "ms",
    toScore: (ms) => clamp(100 - ((ms - 800) / 1200) * 100), // 800ms=100, 2000ms=0
  },
  {
    key: "pb-peripheral-test",
    label: "Divided Attention",
    href: "/peripheral-test",
    mode: "higher",
    unit: "%",
    toScore: (pct) => clamp(pct), // Already 0-100 percentage
  },
  {
    key: "pb-pattern-speed",
    label: "Mental Math Sprint",
    href: "/pattern-speed",
    mode: "higher",
    unit: "score",
    toScore: (pts) => clamp((pts / 2000) * 100), // 2000=100
  },
  {
    key: "pb-math-memory",
    label: "Math Memory",
    href: "/math-memory",
    mode: "higher",
    unit: "streak",
    toScore: (lvl) => clamp((lvl / 10) * 100), // 10=100
  },
  {
    key: "pb-dual-task",
    label: "Dual Task",
    href: "/dual-task",
    mode: "higher",
    unit: "score",
    toScore: (s) => clamp((s / 100) * 100), // 100=100
  },
  {
    key: "pb-change-detection",
    label: "Change Detection",
    href: "/change-detection",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 10) * 100), // component saves highest completed level
  },
  {
    key: "pb-estimation",
    label: "Dot Estimation",
    href: "/estimation",
    mode: "higher",
    unit: "acc%",
    toScore: (acc) => clamp(((acc - 50) / 50) * 100), // 50%=0, 100%=100
  },
];

export function clamp(v: number) {
  return Math.max(0, Math.min(100, v));
}
