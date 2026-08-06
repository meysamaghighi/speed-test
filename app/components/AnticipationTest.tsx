"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";
import LeaderboardPanel from "./LeaderboardPanel";
import ReportUpsell from "./ReportUpsell";

type Phase = "waiting" | "instructions" | "countdown" | "timing" | "result";

interface Round {
  targetMs: number;
  errorMs: number;
  timedOut: boolean;
}

const TOTAL_ROUNDS = 6;
const MIN_DURATION_MS = 1500;
const MAX_DURATION_MS = 2600;
const OCCLUDE_FRACTION_MIN = 0.35;
const OCCLUDE_FRACTION_MAX = 0.55;
const MIN_COUNTDOWN_MS = 400;
const MAX_COUNTDOWN_MS = 1000;
const TARGET_PERCENT = 92; // finish line position, leaves margin so the dot never clips the edge
const WORST_ERROR_MS = 500; // error at/above this scores 0
const TIMEOUT_GRACE_MS = 4000; // auto-resolve a round if the player never taps (anti-softlock)

export default function AnticipationTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [ballVisible, setBallVisible] = useState(false);
  const [ballAnimating, setBallAnimating] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<Round | null>(null);

  const targetDurationRef = useRef(0);
  const startTimeRef = useRef(0);
  const resolvedRef = useRef(true); // true when the current round has already been scored
  const occludeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutGraceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalRounds = TOTAL_ROUNDS;
  const currentRoundIndex = rounds.length;

  const roundScore = (errorMs: number) =>
    Math.max(0, Math.round(100 - (Math.min(errorMs, WORST_ERROR_MS) / WORST_ERROR_MS) * 100));

  const avgScore =
    rounds.length > 0
      ? Math.round(rounds.reduce((sum, r) => sum + roundScore(r.errorMs), 0) / rounds.length)
      : 0;

  const isFinished = phase === "result" && rounds.length === totalRounds;
  const pb = usePersonalBest("pb-anticipation", "higher", isFinished ? avgScore : null);

  const clearAllTimers = useCallback(() => {
    if (occludeTimeoutRef.current) clearTimeout(occludeTimeoutRef.current);
    if (countdownTimeoutRef.current) clearTimeout(countdownTimeoutRef.current);
    if (timeoutGraceRef.current) clearTimeout(timeoutGraceRef.current);
    occludeTimeoutRef.current = null;
    countdownTimeoutRef.current = null;
    timeoutGraceRef.current = null;
  }, []);

  useEffect(() => clearAllTimers, [clearAllTimers]);

  const finishRound = useCallback(
    (errorMs: number, timedOut: boolean) => {
      if (resolvedRef.current) return; // already scored (tap + timeout race guard)
      resolvedRef.current = true;
      clearAllTimers();

      const round: Round = {
        targetMs: targetDurationRef.current,
        errorMs: Math.max(0, Math.round(errorMs)),
        timedOut,
      };
      setLastFeedback(round);
      setBallVisible(false);
      setBallAnimating(false);

      setRounds((prev) => {
        const next = [...prev, round];
        if (next.length >= totalRounds) {
          setPhase("result");
        } else {
          setPhase("instructions");
        }
        return next;
      });
    },
    [clearAllTimers, totalRounds]
  );

  const handleTap = useCallback(() => {
    if (phase !== "timing" || resolvedRef.current) return;
    const elapsed = performance.now() - startTimeRef.current;
    const errorMs = Math.abs(elapsed - targetDurationRef.current);
    finishRound(errorMs, false);
  }, [phase, finishRound]);

  const handleClick = () => handleTap();
  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    handleTap();
  };

  const startRound = () => {
    const duration = Math.round(
      MIN_DURATION_MS + Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS)
    );
    const occludeFraction =
      OCCLUDE_FRACTION_MIN + Math.random() * (OCCLUDE_FRACTION_MAX - OCCLUDE_FRACTION_MIN);
    const countdown = Math.round(
      MIN_COUNTDOWN_MS + Math.random() * (MAX_COUNTDOWN_MS - MIN_COUNTDOWN_MS)
    );

    targetDurationRef.current = duration;
    resolvedRef.current = false;
    setLastFeedback(null);
    setBallVisible(false);
    setBallAnimating(false);
    setPhase("countdown");

    countdownTimeoutRef.current = setTimeout(() => {
      if (resolvedRef.current) return; // round was aborted (restart mid-countdown)
      setPhase("timing");
      setBallVisible(true);
      startTimeRef.current = performance.now();
      // Trigger the CSS transition on the next frame so the 0% starting
      // position has actually painted before we animate to the target.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (resolvedRef.current) return;
          setBallAnimating(true);
        });
      });

      occludeTimeoutRef.current = setTimeout(() => {
        if (resolvedRef.current) return;
        setBallVisible(false);
      }, Math.round(duration * occludeFraction));

      // Anti-softlock: if the player never taps, auto-score a worst-case miss
      // and move the test forward instead of hanging forever.
      timeoutGraceRef.current = setTimeout(() => {
        finishRound(WORST_ERROR_MS, true);
      }, duration + TIMEOUT_GRACE_MS);
    }, countdown);
  };

  const startTest = () => {
    clearAllTimers();
    resolvedRef.current = true;
    setRounds([]);
    setLastFeedback(null);
    setPhase("instructions");
  };

  const restart = () => {
    clearAllTimers();
    resolvedRef.current = true;
    setRounds([]);
    setLastFeedback(null);
    setBallVisible(false);
    setBallAnimating(false);
    setPhase("waiting");
  };

  const getRating = (score: number) => {
    if (score >= 90) return { label: "Elite Timing", color: "text-emerald-400" };
    if (score >= 75) return { label: "Excellent", color: "text-green-400" };
    if (score >= 55) return { label: "Good", color: "text-yellow-400" };
    if (score >= 35) return { label: "Average", color: "text-orange-400" };
    return { label: "Keep Practicing", color: "text-red-400" };
  };

  // Result screen
  if (phase === "result") {
    const rating = getRating(avgScore);
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Anticipation Score</p>
          <p className="text-6xl font-black text-sky-400">{avgScore}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && (
            <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>
          )}
          {pb.best !== null && !pb.isNewBest && (
            <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best}</p>
          )}
        </div>

        <div className="space-y-3">
          {rounds.map((round, idx) => (
            <div key={idx} className="bg-paper-2 rounded-xl p-4 border border-line flex justify-between items-center">
              <p className="text-sm text-ink-3">
                Round {idx + 1}
                {round.timedOut ? <span className="ml-2 text-orange-400">(no tap)</span> : null}
              </p>
              <p className={`text-lg font-bold ${round.errorMs < 80 ? "text-green-400" : round.errorMs < 200 ? "text-yellow-400" : "text-orange-400"}`}>
                {round.timedOut ? "missed" : `${round.errorMs}ms off`}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">Scoring</p>
          <p>Each round scores 0-100 based on how close your tap was to the moment the ball reached the finish line (0ms error = 100, 500ms+ error = 0). Final score is the average across {totalRounds} rounds.</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={restart}
            className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const text = `I scored ${avgScore}/100 on Anticipation Timing (${rating.label})! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-sky-600 text-ink font-bold rounded-xl hover:bg-sky-700 transition-colors"
          >
            Share Score
          </button>
        </div>

        <LeaderboardPanel game="anticipation" score={isFinished ? avgScore : null} unit="score" />

        {isFinished && <ReportUpsell source="anticipation" />}
      </div>
    );
  }

  // Countdown / timing screen (the actual round)
  if (phase === "countdown" || phase === "timing") {
    return (
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-ink-2">
          <span>Round {currentRoundIndex + 1} of {totalRounds}</span>
          <span>{phase === "countdown" ? "Get ready..." : "Tap when the ball reaches the line!"}</span>
        </div>

        <div
          onClick={handleClick}
          onTouchStart={handleTouch}
          className="relative w-full h-40 bg-paper-2 rounded-2xl border border-line overflow-hidden cursor-pointer select-none"
          role="button"
          aria-label="Tap when the ball reaches the finish line"
        >
          {/* Finish line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-sky-500/70"
            style={{ left: `${TARGET_PERCENT}%` }}
          />
          {/* Ball */}
          <div
            className="absolute top-1/2 w-8 h-8 rounded-full bg-sky-400 shadow-lg shadow-sky-500/40"
            style={{
              left: `${ballAnimating ? TARGET_PERCENT : 0}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: ballVisible ? 1 : 0,
              transition: ballAnimating
                ? `left ${targetDurationRef.current}ms linear`
                : "none",
            }}
          />
        </div>

        <p className="text-center text-xs text-ink-3">
          The ball will disappear before reaching the line. Tap the area at the moment you think it arrives.
        </p>
      </div>
    );
  }

  // Instructions screen (before each round)
  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-sm text-ink-3 mb-2">Round {currentRoundIndex + 1} of {totalRounds}</p>
          {lastFeedback && (
            <p className="text-sm text-ink-2 mb-4">
              Last round: {lastFeedback.timedOut ? "no tap registered" : `${lastFeedback.errorMs}ms off`}
            </p>
          )}
          <p className="text-ink-2 mb-2">
            A ball will roll toward the finish line, then vanish. Tap anywhere on the track the moment you think it reaches the line.
          </p>
          <p className="text-sm text-ink-3">Speed changes every round, so you can&apos;t just memorize a rhythm.</p>
        </div>

        <button
          onClick={startRound}
          className="px-8 py-4 bg-sky-600 text-ink font-bold rounded-xl hover:bg-sky-700 transition-colors text-lg"
        >
          Start Round
        </button>
      </div>
    );
  }

  // Waiting screen
  return (
    <div className="text-center space-y-6">
      <div className="bg-paper-2 rounded-2xl p-8 border border-line">
        <p className="text-4xl mb-4">🎯</p>
        <p className="text-ink-2 mb-4">
          Predict when a moving target arrives. The ball vanishes partway across &mdash; tap the track at the exact moment you think it crosses the finish line.
        </p>
        <p className="text-sm text-ink-3 mb-4">
          {totalRounds} rounds, each with a different speed. Scored by average timing error in milliseconds.
        </p>
        <div className="bg-paper-2 rounded-lg p-4 text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">How it works:</p>
          <p>1. Press Start Round</p>
          <p>2. Watch the ball roll toward the finish line</p>
          <p>3. It disappears before arriving &mdash; keep tracking it mentally</p>
          <p>4. Tap the track when you think it reaches the line</p>
          <p className="text-xs text-ink-3 mt-2">Closer taps score higher. No audio required.</p>
        </div>
      </div>

      <button
        onClick={startTest}
        className="px-8 py-4 bg-sky-600 text-ink font-bold rounded-xl hover:bg-sky-700 transition-colors text-lg"
      >
        Start Test
      </button>
    </div>
  );
}
