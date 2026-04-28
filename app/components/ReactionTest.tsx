"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "waiting" | "ready" | "go" | "result" | "too-early";

export type ReactionTestProps = {
  /** Fires once when the user completes all 5 rounds. avgMs is the
   * final average reaction time (lower-is-better). Lets a parent shell
   * record progress and trigger a share. */
  onComplete?: (avgMs: number) => void;
};

export default function ReactionTest({ onComplete }: ReactionTestProps = {}) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [times, setTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const goTime = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const round = times.length + (phase === "result" ? 0 : phase === "waiting" ? 0 : 1);
  const totalRounds = 5;

  const average =
    times.length > 0
      ? Math.round(times.reduce((s, t) => s + t, 0) / times.length)
      : 0;

  const isFinished = times.length === totalRounds && phase === "result";
  const pb = usePersonalBest("pb-reaction", "lower", isFinished ? average : null);
  const reportedRef = useRef(false);

  useEffect(() => {
    if (isFinished && !reportedRef.current) {
      reportedRef.current = true;
      onComplete?.(average);
    }
    if (!isFinished) reportedRef.current = false;
  }, [isFinished, average, onComplete]);

  const startRound = useCallback(() => {
    setPhase("ready");
    const delay = 1000 + Math.random() * 4000; // 1-5 seconds
    timeout.current = setTimeout(() => {
      goTime.current = performance.now();
      setPhase("go");
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (phase === "waiting") {
      startRound();
    } else if (phase === "ready") {
      if (timeout.current) clearTimeout(timeout.current);
      setPhase("too-early");
    } else if (phase === "go") {
      const elapsed = Math.round(performance.now() - goTime.current);
      setCurrentTime(elapsed);
      const newTimes = [...times, elapsed];
      setTimes(newTimes);
      setPhase("result");
    } else if (phase === "result") {
      if (times.length < totalRounds) {
        startRound();
      }
    } else if (phase === "too-early") {
      startRound();
    }
  }, [phase, times, startRound]);

  const restart = () => {
    setPhase("waiting");
    setTimes([]);
    setCurrentTime(0);
  };

  const getRating = (ms: number) => {
    if (ms < 180) return { label: "Incredible", color: "text-emerald-400" };
    if (ms < 220) return { label: "Fast", color: "text-green-400" };
    if (ms < 270) return { label: "Average", color: "text-yellow-400" };
    if (ms < 350) return { label: "Below Average", color: "text-orange-400" };
    return { label: "Slow", color: "text-red-400" };
  };

  // Final results screen
  if (times.length === totalRounds && phase === "result") {
    const rating = getRating(average);
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Your Average Reaction Time</p>
          <p className="text-6xl font-black text-emerald-400">{average}ms</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best}ms</p>}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {times.map((t, i) => (
            <div key={i} className="bg-paper-2 rounded-lg p-3 border border-line">
              <p className="text-xs text-ink-3">#{i + 1}</p>
              <p className="text-lg font-bold text-ink">{t}ms</p>
            </div>
          ))}
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Top 1%: &lt;150ms</span>
            <span>Fast: &lt;220ms</span>
            <span>Average: 250ms</span>
            <span>Slow: &gt;350ms</span>
          </div>
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
              const text = `My reaction time: ${average}ms (${rating.label})! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  const bgColor =
    phase === "ready"
      ? "bg-red-600"
      : phase === "go"
      ? "bg-emerald-500"
      : phase === "too-early"
      ? "bg-orange-500"
      : phase === "result"
      ? "bg-blue-600"
      : "bg-gray-800";

  const message =
    phase === "waiting"
      ? "Click to Start"
      : phase === "ready"
      ? "Wait for green..."
      : phase === "go"
      ? "CLICK NOW!"
      : phase === "too-early"
      ? "Too early! Click to try again"
      : `${currentTime}ms — Click to continue`;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400 px-1">
        <span>Round {Math.min(round, totalRounds)} of {totalRounds}</span>
        {times.length > 0 && <span>Avg: {average}ms</span>}
      </div>

      <button
        onClick={handleClick}
        className={`w-full h-64 md:h-80 rounded-2xl ${bgColor} transition-colors duration-100 flex items-center justify-center cursor-pointer select-none`}
      >
        <span className="text-2xl md:text-3xl font-bold text-white drop-shadow">
          {message}
        </span>
      </button>

      {times.length > 0 && (
        <div className="flex gap-2">
          {times.map((t, i) => (
            <div key={i} className="bg-paper-2 rounded-lg px-3 py-2 text-center flex-1 border border-line">
              <p className="text-xs text-ink-3">#{i + 1}</p>
              <p className="text-sm font-bold text-ink">{t}ms</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
