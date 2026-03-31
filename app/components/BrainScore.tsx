"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TestDef {
  key: string;
  label: string;
  href: string;
  mode: "lower" | "higher";
  unit: string;
  // Scoring function: converts raw PB to a 0-100 score
  toScore: (raw: number) => number;
}

const TESTS: TestDef[] = [
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
    label: "Peripheral Vision",
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
    unit: "%",
    toScore: (pct) => clamp(((pct - 50) / 50) * 100), // 50%=0, 100%=100
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
    key: "pb-digit-span",
    label: "Digit Span",
    href: "/digit-span",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 10) * 100), // 10=100
  },
  {
    key: "pb-emotion",
    label: "Emotion Recognition",
    href: "/emotion",
    mode: "higher",
    unit: "score",
    toScore: (s) => clamp((s / 20) * 100), // 20=100
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
    mode: "higher",
    unit: "score",
    toScore: (s) => clamp((s / 50) * 100), // 50=100
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
    label: "Peripheral Test",
    href: "/peripheral-test",
    mode: "higher",
    unit: "angle",
    toScore: (deg) => clamp(((deg - 30) / 150) * 100), // 30=0, 180=100
  },
  {
    key: "pb-pattern-speed",
    label: "Pattern Speed",
    href: "/pattern-speed",
    mode: "higher",
    unit: "level",
    toScore: (lvl) => clamp((lvl / 10) * 100), // 10=100
  },
  {
    key: "pb-math-memory",
    label: "Math Memory",
    href: "/math-memory",
    mode: "higher",
    unit: "level",
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
    unit: "score",
    toScore: (s) => clamp((s / 30) * 100), // 30=100
  },
  {
    key: "pb-estimation",
    label: "Estimation Test",
    href: "/estimation",
    mode: "higher",
    unit: "acc%",
    toScore: (acc) => clamp(((acc - 50) / 50) * 100), // 50%=0, 100%=100
  },
];

function clamp(v: number) {
  return Math.max(0, Math.min(100, v));
}

function getOverallRating(score: number) {
  if (score >= 90) return { label: "Genius Brain", color: "text-emerald-400", bg: "bg-emerald-500" };
  if (score >= 75) return { label: "Exceptional", color: "text-green-400", bg: "bg-green-500" };
  if (score >= 60) return { label: "Above Average", color: "text-blue-400", bg: "bg-blue-500" };
  if (score >= 45) return { label: "Average", color: "text-yellow-400", bg: "bg-yellow-500" };
  if (score >= 30) return { label: "Below Average", color: "text-orange-400", bg: "bg-orange-500" };
  return { label: "Keep Training", color: "text-red-400", bg: "bg-red-500" };
}

function getBarColor(score: number) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-green-500";
  if (score >= 40) return "bg-yellow-500";
  if (score >= 20) return "bg-orange-500";
  return "bg-red-500";
}

export default function BrainScore() {
  const [scores, setScores] = useState<Map<string, number>>(new Map());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const map = new Map<string, number>();
    for (const test of TESTS) {
      try {
        const val = localStorage.getItem(test.key);
        if (val !== null) map.set(test.key, parseFloat(val));
      } catch {}
    }
    setScores(map);
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const completedTests = TESTS.filter((t) => scores.has(t.key));
  const totalTests = TESTS.length;
  const completedCount = completedTests.length;

  const testScores = completedTests.map((t) => ({
    ...t,
    raw: scores.get(t.key)!,
    normalized: Math.round(t.toScore(scores.get(t.key)!)),
  }));

  const overallScore =
    completedCount > 0
      ? Math.round(testScores.reduce((sum, t) => sum + t.normalized, 0) / completedCount)
      : 0;

  const brainPoints = Math.round(overallScore * 10);
  const rating = getOverallRating(overallScore);

  const handleShare = () => {
    const text = `My Brain Score: ${brainPoints}/1000 (${rating.label}) on ${completedCount}/${totalTests} tests! How smart are you?`;
    const url = "https://benchmybrain.com/brain-score";
    if (navigator.share) {
      navigator.share({ text, url }).catch(() => {});
    } else {
      navigator.clipboard
        .writeText(`${text}\n${url}`)
        .then(() => alert("Copied to clipboard!"))
        .catch(() => {});
    }
  };

  if (completedCount === 0) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-6xl font-black text-gray-600 mb-4">?/1000</p>
          <p className="text-gray-400">
            Take some tests first! Your personal bests are saved automatically.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Complete at least 3 tests to generate your Brain Score.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Browse All Tests
        </Link>
      </div>
    );
  }

  const missingTests = TESTS.filter((t) => !scores.has(t.key));

  return (
    <div className="space-y-8">
      {/* Main score display */}
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
        <p className="text-gray-400 text-sm mb-2">Your Brain Score</p>
        <p className="text-7xl font-black text-white mb-1">{brainPoints}</p>
        <p className="text-gray-500 text-lg">/1000</p>
        <p className={`text-2xl font-bold mt-3 ${rating.color}`}>{rating.label}</p>
        <p className="text-gray-500 text-sm mt-2">
          Based on {completedCount} of {totalTests} tests
        </p>

        {/* Progress ring */}
        <div className="mt-6 flex justify-center">
          <div className="w-48 h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${rating.bg} rounded-full transition-all duration-1000`}
              style={{ width: `${overallScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Share + retry */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleShare}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Share Brain Score
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
        >
          Retake Tests
        </Link>
      </div>

      {/* Individual test breakdown */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-lg font-bold text-white mb-4">Test Breakdown</h2>
        <div className="space-y-3">
          {testScores
            .sort((a, b) => b.normalized - a.normalized)
            .map((t) => (
              <Link key={t.key} href={t.href} className="block group">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 w-40 truncate group-hover:text-white transition-colors">
                    {t.label}
                  </span>
                  <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getBarColor(t.normalized)} rounded-full transition-all`}
                      style={{ width: `${t.normalized}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-gray-500 w-12 text-right">
                    {t.normalized}
                  </span>
                  <span className="text-xs text-gray-600 w-20 text-right">
                    {t.raw}
                    {t.unit}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Missing tests */}
      {missingTests.length > 0 && (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold text-white mb-2">
            Tests Remaining ({missingTests.length})
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Complete all tests for a more accurate Brain Score.
          </p>
          <div className="flex flex-wrap gap-2">
            {missingTests.map((t) => (
              <Link
                key={t.key}
                href={t.href}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-sm rounded-lg transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
