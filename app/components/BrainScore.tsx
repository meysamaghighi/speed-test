"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TESTS } from "../lib/brainTests";
import ReportUpsell from "./ReportUpsell";
import { encodeBrainChallenge, decodeBrainChallenge, type BrainChallengeData } from "../lib/brainChallenge";
import { track } from "../lib/report";



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

  const searchParams = useSearchParams();
  const [challenge, setChallenge] = useState<BrainChallengeData | null>(null);
  const [challengerName, setChallengerName] = useState("");
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [challengeCopied, setChallengeCopied] = useState(false);
  const trackedAccepted = useRef(false);

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

  useEffect(() => {
    const decoded = decodeBrainChallenge(searchParams?.get("c"));
    setChallenge(decoded);
    if (decoded && !trackedAccepted.current) {
      trackedAccepted.current = true;
      track("brainscore_challenge_accepted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
        {challenge && (
          <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 text-left">
            <p className="text-orange-700 text-sm font-bold">
              🧠 {challenge.name} scored {challenge.score}/1000 — can you beat it?
            </p>
          </div>
        )}
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

  const handleChallengeShare = () => {
    const name = challengerName.trim() || "A friend";
    const url = `${window.location.origin}/brain-score?c=${encodeBrainChallenge({ name, score: brainPoints })}`;
    const text = `${name} scored ${brainPoints}/1000 on their Brain Score — can you beat it?`;
    track("brainscore_challenge_created");
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Brain Score", text, url }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setChallengeCopied(true);
          setTimeout(() => setChallengeCopied(false), 2500);
        })
        .catch(() => {});
    }
  };

  const vsChallenge = challenge
    ? brainPoints > challenge.score
      ? `You scored ${brainPoints} — you beat ${challenge.name} by ${brainPoints - challenge.score}!`
      : brainPoints === challenge.score
      ? `You tied ${challenge.name} at ${brainPoints}!`
      : `You scored ${brainPoints} — ${challenge.name} wins by ${challenge.score - brainPoints}`
    : null;

  return (
    <div className="space-y-8">
      {challenge && (
        <div className="bg-orange-100 border border-orange-300 rounded-xl p-4">
          <p className="text-orange-700 text-sm font-bold">
            🧠 {challenge.name} scored {challenge.score}/1000 — can you beat it?
          </p>
        </div>
      )}

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

        {vsChallenge && (
          <div className="mt-4 border-t border-line pt-3">
            <p className="text-ink-3 text-xs uppercase tracking-wide font-bold">
              You vs {challenge!.name}
            </p>
            <p className="text-orange-700 text-sm font-bold mt-1">{vsChallenge}</p>
          </div>
        )}
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

      {/* Challenge a Friend */}
      <div className="bg-paper-2 rounded-xl p-4 border border-line text-center">
        {!showChallengeForm ? (
          <button
            onClick={() => setShowChallengeForm(true)}
            className="px-6 py-3 bg-paper text-ink font-bold rounded-xl border border-line hover:bg-paper-2 transition-colors"
          >
            Challenge a Friend
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
            <input
              type="text"
              value={challengerName}
              onChange={(e) => setChallengerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChallengeShare();
              }}
              placeholder="Your name (optional)"
              maxLength={20}
              autoComplete="off"
              className="w-full sm:w-48 px-3 py-2 text-sm bg-paper border border-line rounded-lg text-ink text-center focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={handleChallengeShare}
              className="px-5 py-2 bg-orange-600 text-ink font-bold text-sm rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap"
            >
              Send Challenge
            </button>
          </div>
        )}
        {challengeCopied && (
          <p className="text-emerald-500 text-xs font-bold mt-2">Link copied!</p>
        )}
      </div>

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
