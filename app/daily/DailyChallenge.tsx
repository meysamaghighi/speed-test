"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Pool of daily-compatible tests
const TEST_POOL = [
  { href: "/reaction",      label: "Reaction Time",      desc: "How fast do you click?",            unit: "ms",    lowerIsBetter: true },
  { href: "/typing",        label: "Typing Speed",        desc: "Words per minute",                  unit: "WPM",   lowerIsBetter: false },
  { href: "/chimp",         label: "Chimp Test",          desc: "Memory vs chimpanzees",             unit: "/9",    lowerIsBetter: false },
  { href: "/memory",        label: "Number Memory",       desc: "How long a number can you hold?",   unit: "digits",lowerIsBetter: false },
  { href: "/visual-memory", label: "Visual Memory",       desc: "Remember the squares",              unit: "lvl",   lowerIsBetter: false },
  { href: "/sequence",      label: "Sequence Memory",     desc: "Repeat the pattern",                unit: "lvl",   lowerIsBetter: false },
  { href: "/aim",           label: "Aim Trainer",         desc: "Hit the targets fast",              unit: "ms",    lowerIsBetter: true },
  { href: "/rotation",      label: "Spatial Rotation",    desc: "Match the rotated shapes",          unit: "%",     lowerIsBetter: false },
  { href: "/stroop",        label: "Stroop Test",         desc: "Name the color, not the word",      unit: "ms",    lowerIsBetter: true },
  { href: "/digit-span",    label: "Digit Span",          desc: "Repeat digits forward & backward",  unit: "digits",lowerIsBetter: false },
  { href: "/verbal",        label: "Verbal Memory",       desc: "Seen this word before?",            unit: "words", lowerIsBetter: false },
  { href: "/rhythm",        label: "Rhythm Test",         desc: "Tap in time",                       unit: "%",     lowerIsBetter: false },
  { href: "/pattern",       label: "Pattern Recognition", desc: "Odd one out",                       unit: "/40",   lowerIsBetter: false },
  { href: "/n-back",        label: "N-Back",              desc: "Working memory stress test",        unit: "lvl",   lowerIsBetter: false },
  { href: "/math",          label: "Math Speed",          desc: "Mental arithmetic race",            unit: "score", lowerIsBetter: false },
  { href: "/click-speed",   label: "Click Speed",         desc: "Clicks per second",                 unit: "CPS",   lowerIsBetter: false },
  { href: "/reading",       label: "Reading Speed",       desc: "How fast do you read?",             unit: "WPM",   lowerIsBetter: false },
  { href: "/go-no-go",      label: "Go / No-Go",          desc: "React only when you should",        unit: "ms",    lowerIsBetter: true },
  { href: "/trail-making",  label: "Trail Making",        desc: "Connect the dots fast",             unit: "sec",   lowerIsBetter: true },
  { href: "/color-match",   label: "Color Match",         desc: "Match colors under pressure",       unit: "score", lowerIsBetter: false },
  { href: "/face-memory",   label: "Face Memory",         desc: "Remember the faces",                unit: "score", lowerIsBetter: false },
  { href: "/word-speed",    label: "Word Speed",          desc: "Type words as fast as you can",     unit: "WPM",   lowerIsBetter: false },
  { href: "/hand-eye",      label: "Hand-Eye Coord",      desc: "Catch the moving target",           unit: "score", lowerIsBetter: false },
  { href: "/reverse-memory",label: "Reverse Memory",      desc: "Digits in reverse",                 unit: "digits",lowerIsBetter: false },
  { href: "/emotion",       label: "Emotion Recognition", desc: "Read the face",                     unit: "%",     lowerIsBetter: false },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getDaySeed(dateKey: string): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = ((hash << 5) - hash + dateKey.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pickDailyTests(dateKey: string, count = 5) {
  const rng = seededRandom(getDaySeed(dateKey));
  const pool = [...TEST_POOL];
  const picked = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(rng() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

function getDayNumber(): number {
  const epoch = new Date("2026-04-12").getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(1, Math.floor((today.getTime() - epoch) / 86400000) + 1);
}

const STORAGE_KEY = "bmb_daily";

interface DailyState {
  dateKey: string;
  completed: Record<string, boolean>;
  streak: number;
  lastCompletedDate: string | null;
}

function loadState(): DailyState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state: DailyState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function DailyChallenge() {
  const todayKey = getTodayKey();
  const dailyTests = pickDailyTests(todayKey);
  const dayNum = getDayNumber();

  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = loadState();
    if (saved) {
      // Reset completed if it's a new day
      const prevCompleted = saved.dateKey === todayKey ? saved.completed : {};
      setCompleted(prevCompleted);
      setStreak(saved.streak);
    }
  }, [todayKey]);

  const doneCount = Object.values(completed).filter(Boolean).length;
  const allDone = doneCount === dailyTests.length;

  function toggleDone(href: string) {
    setCompleted((prev) => {
      const next = { ...prev, [href]: !prev[href] };

      // Compute new all-done state
      const nowAllDone = dailyTests.every((t) => next[t.href]);
      const saved = loadState();

      let newStreak = streak;
      if (nowAllDone && saved?.lastCompletedDate !== todayKey) {
        // First completion today
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
        newStreak = saved?.lastCompletedDate === yKey ? (saved.streak ?? 0) + 1 : 1;
        setStreak(newStreak);
      }

      saveState({
        dateKey: todayKey,
        completed: next,
        streak: newStreak,
        lastCompletedDate: nowAllDone ? todayKey : saved?.lastCompletedDate ?? null,
      });
      return next;
    });
  }

  function buildShareText() {
    const icons = ["🧠", "⚡", "🎯", "🔢", "👁️"];
    const lines = dailyTests.map((t, i) => `${icons[i] ?? "✅"} ${t.label}`);
    return `BenchMyBrain Daily Challenge — Day ${dayNum}\n${lines.join("\n")}\nDone! 🏆 ${streak} day streak\nbenchmybrain.com/daily`;
  }

  async function handleShare() {
    const text = buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          Day {dayNum}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Daily Challenge</h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          5 tests, same for everyone, refreshes at midnight. Complete all 5 to keep your streak.
        </p>
        {streak > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-bold px-5 py-2 rounded-full">
            🔥 {streak} day streak
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{doneCount} / {dailyTests.length} done</span>
          <span>{Math.round((doneCount / dailyTests.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / dailyTests.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Test cards */}
      <div className="space-y-3 mb-10">
        {dailyTests.map((test, i) => {
          const done = !!completed[test.href];
          return (
            <div
              key={test.href}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                done
                  ? "bg-indigo-900/30 border-indigo-700/50"
                  : "bg-gray-900 border-gray-800 hover:border-gray-700"
              }`}
            >
              {/* Number / check */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 ${
                  done ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-400"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm ${done ? "text-indigo-200 line-through decoration-indigo-400" : "text-white"}`}>
                  {test.label}
                </div>
                <div className="text-xs text-gray-500 truncate">{test.desc}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {!done && (
                  <Link
                    href={test.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Go →
                  </Link>
                )}
                <button
                  onClick={() => toggleDone(test.href)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    done
                      ? "bg-gray-800 text-gray-400 hover:bg-red-900/40 hover:text-red-400"
                      : "bg-gray-800 text-gray-400 hover:bg-green-900/40 hover:text-green-400"
                  }`}
                  title={done ? "Undo" : "Mark done"}
                >
                  {done ? "Undo" : "Done"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion card */}
      {allDone && (
        <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-8 text-center">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-2xl font-black text-white mb-1">All done!</h2>
          <p className="text-indigo-300 text-sm mb-2">
            {streak > 1 ? `${streak} day streak — keep it going!` : "First day completed!"}
          </p>
          <p className="text-gray-500 text-xs mb-6">Come back tomorrow for a new set of 5 tests.</p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-black text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {copied ? "✓ Copied!" : "Share result"}
          </button>
        </div>
      )}

      {/* How it works */}
      <div className="mt-14 border-t border-gray-800 pt-10">
        <h2 className="text-lg font-bold text-white mb-4">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="text-2xl mb-2">🎲</div>
            <div className="font-semibold text-white mb-1">Same for everyone</div>
            Each day&apos;s 5 tests are the same worldwide. Seeded by the date — no randomness per person.
          </div>
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="text-2xl mb-2">🔥</div>
            <div className="font-semibold text-white mb-1">Build a streak</div>
            Complete all 5 tests each day to extend your streak. Miss a day and it resets.
          </div>
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="text-2xl mb-2">📤</div>
            <div className="font-semibold text-white mb-1">Share your result</div>
            After finishing, share your result card to challenge friends to beat you.
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-10 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
          ← All tests
        </Link>
      </div>
    </div>
  );
}
