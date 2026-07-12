"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TESTS } from "../lib/brainTests";
import ReportUpsell from "./ReportUpsell";
import { recordSnapshot, type ScoreSnapshot } from "../lib/brainProgress";

function formatDate(iso: string) {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
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
  const [history, setHistory] = useState<ScoreSnapshot[]>([]);

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

  useEffect(() => {
    if (!loaded || completedCount === 0) return;
    setHistory(recordSnapshot(brainPoints));
  }, [loaded, completedCount, brainPoints]);

  if (!loaded) return null;

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
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-6xl font-black text-ink-3 mb-4">?/1000</p>
          <p className="text-ink-2">
            Take some tests first! Your personal bests are saved automatically.
          </p>
          <p className="text-ink-3 text-sm mt-2">
            Complete at least 3 tests to generate your Brain Score.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-indigo-600 text-ink font-bold rounded-xl hover:bg-indigo-700 transition-colors"
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
      <div className="bg-paper-2 rounded-2xl p-8 border border-line text-center">
        <p className="text-ink-2 text-sm mb-2">Your Brain Score</p>
        <p className="text-7xl font-black text-ink mb-1">{brainPoints}</p>
        <p className="text-ink-3 text-lg">/1000</p>
        <p className={`text-2xl font-bold mt-3 ${rating.color}`}>{rating.label}</p>
        <p className="text-ink-3 text-sm mt-2">
          Based on {completedCount} of {totalTests} tests
        </p>

        {/* Progress ring */}
        <div className="mt-6 flex justify-center">
          <div className="w-48 h-4 bg-paper-2 rounded-full overflow-hidden">
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
          className="px-6 py-3 bg-indigo-600 text-ink font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Share Brain Score
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
        >
          Retake Tests
        </Link>
      </div>

      {/* Progress over time (local-only history, no accounts) */}
      {history.length >= 2 && (
        <div className="bg-paper-2 rounded-2xl p-6 border border-line">
          <h2 className="text-lg font-bold text-ink mb-1">Your Progress</h2>
          <p className="text-ink-3 text-sm mb-4">
            {history[0].score} → {history[history.length - 1].score}{" "}
            <span
              className={
                history[history.length - 1].score >= history[0].score
                  ? "text-emerald-400"
                  : "text-orange-400"
              }
            >
              ({history[history.length - 1].score - history[0].score >= 0 ? "+" : ""}
              {history[history.length - 1].score - history[0].score})
            </span>{" "}
            since {formatDate(history[0].date)}
          </p>
          <div className="flex items-end gap-1 h-16">
            {history.slice(-14).map((h) => (
              <div
                key={h.date}
                className={`flex-1 rounded-t ${rating.bg} opacity-70`}
                style={{ height: `${Math.max(4, h.score / 10)}%` }}
                title={`${formatDate(h.date)}: ${h.score}`}
              />
            ))}
          </div>
        </div>
      )}

      <ReportUpsell completedCount={completedCount} />

      {/* Individual test breakdown */}
      <div className="bg-paper-2 rounded-2xl p-6 border border-line">
        <h2 className="text-lg font-bold text-ink mb-4">Test Breakdown</h2>
        <div className="space-y-3">
          {testScores
            .sort((a, b) => b.normalized - a.normalized)
            .map((t) => (
              <Link key={t.key} href={t.href} className="block group">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-ink-2 w-40 truncate group-hover:text-ink transition-colors">
                    {t.label}
                  </span>
                  <div className="flex-1 h-3 bg-paper-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getBarColor(t.normalized)} rounded-full transition-all`}
                      style={{ width: `${t.normalized}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-ink-3 w-12 text-right">
                    {t.normalized}
                  </span>
                  <span className="text-xs text-ink-3 w-20 text-right">
                    {t.raw}
                    {/^[a-z]/i.test(t.unit) ? " " : ""}
                    {t.unit}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Missing tests */}
      {missingTests.length > 0 && (
        <div className="bg-paper-2 rounded-2xl p-6 border border-line">
          <h2 className="text-lg font-bold text-ink mb-2">
            Tests Remaining ({missingTests.length})
          </h2>
          <p className="text-ink-3 text-sm mb-4">
            Complete all tests for a more accurate Brain Score.
          </p>
          <div className="flex flex-wrap gap-2">
            {missingTests.map((t) => (
              <Link
                key={t.key}
                href={t.href}
                className="px-3 py-1.5 bg-paper-2 hover:bg-paper-2 text-ink-2 hover:text-ink text-sm rounded-lg transition-colors"
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
