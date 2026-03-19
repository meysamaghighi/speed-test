"use client";

import { useState, useRef, useCallback } from "react";

type Phase = "waiting" | "ready" | "go" | "result" | "too-early";

export default function ReactionTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [times, setTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const goTime = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const round = times.length + (phase === "result" ? 0 : phase === "waiting" ? 0 : 1);
  const totalRounds = 5;

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

  const average =
    times.length > 0
      ? Math.round(times.reduce((s, t) => s + t, 0) / times.length)
      : 0;

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
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Your Average Reaction Time</p>
          <p className="text-6xl font-black text-emerald-400">{average}ms</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {times.map((t, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <p className="text-xs text-gray-500">#{i + 1}</p>
              <p className="text-lg font-bold text-white">{t}ms</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
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
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
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
      <div className="flex justify-between text-sm text-gray-500 px-1">
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
            <div key={i} className="bg-gray-900 rounded-lg px-3 py-2 text-center flex-1 border border-gray-800">
              <p className="text-xs text-gray-500">#{i + 1}</p>
              <p className="text-sm font-bold text-white">{t}ms</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
