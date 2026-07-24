"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";
import ReportUpsell from "./ReportUpsell";

export default function ClickSpeed() {
  const [phase, setPhase] = useState<"ready" | "clicking" | "done">("ready");
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [cps, setCps] = useState(0);
  const pb = usePersonalBest("pb-cps", "higher", phase === "done" ? cps : null);
  const [bestCps, setBestCps] = useState(0);
  const startTime = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = useCallback(() => {
    setClicks(0);
    setTimeLeft(5);
    setPhase("clicking");
    startTime.current = performance.now();

    timerRef.current = setInterval(() => {
      const elapsed = (performance.now() - startTime.current) / 1000;
      const remaining = Math.max(0, 5 - elapsed);
      setTimeLeft(Math.ceil(remaining * 10) / 10);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase("done");
      }
    }, 50);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") {
      const elapsed = (performance.now() - startTime.current) / 1000;
      const result = Math.round((clicks / elapsed) * 10) / 10;
      setCps(result);
      if (result > bestCps) setBestCps(result);
    }
  }, [phase, clicks, bestCps]);

  const handleClick = () => {
    if (phase === "ready") {
      startTest();
      setClicks(1);
    } else if (phase === "clicking") {
      setClicks((c) => c + 1);
    }
  };

  const getRating = (c: number) => {
    if (c >= 12) return { label: "Inhuman", color: "text-emerald-400" };
    if (c >= 9) return { label: "Very Fast", color: "text-green-400" };
    if (c >= 7) return { label: "Fast", color: "text-blue-400" };
    if (c >= 5) return { label: "Average", color: "text-yellow-400" };
    return { label: "Slow", color: "text-orange-400" };
  };

  if (phase === "done") {
    const rating = getRating(cps);
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Your Click Speed</p>
          <p className="text-6xl font-black text-amber-400">{cps} CPS</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          <p className="text-ink-3 text-sm mt-1">{clicks} clicks in 5 seconds</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-1">Personal Best: {pb.best} CPS</p>}
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>World record: 16+</span>
            <span>Fast: 9+</span>
            <span>Average: 6.5</span>
            <span>Slow: &lt;5</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setPhase("ready"); setClicks(0); setTimeLeft(5); }}
            className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const t = `My click speed: ${cps} CPS (${clicks} clicks in 5s)! Can you click faster?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-amber-600 text-ink font-bold rounded-xl hover:bg-amber-700 transition-colors"
          >
            Share Score
          </button>
        </div>

        <ReportUpsell source="click-speed" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {phase === "clicking" && (
        <div className="flex justify-between text-sm">
          <span className="text-ink-2">Clicks: <span className="text-ink font-bold">{clicks}</span></span>
          <span className="text-ink-2">Time: <span className="text-amber-400 font-bold">{timeLeft.toFixed(1)}s</span></span>
        </div>
      )}

      <button
        onClick={handleClick}
        className={`w-full h-64 md:h-80 rounded-2xl transition-all duration-100 flex flex-col items-center justify-center cursor-pointer select-none active:scale-95 ${
          phase === "clicking"
            ? "bg-amber-600 hover:bg-amber-500"
            : "bg-paper-2 hover:bg-paper-2"
        }`}
      >
        <span className="text-2xl md:text-3xl font-bold text-ink drop-shadow">
          {phase === "ready" ? "Click to Start!" : "Keep Clicking!"}
        </span>
        {phase === "clicking" && (
          <span className="text-6xl font-black text-ink/80 mt-2">{clicks}</span>
        )}
      </button>

      {bestCps > 0 && phase === "ready" && (
        <p className="text-center text-amber-400 font-bold text-sm">
          Personal best: {bestCps} CPS
        </p>
      )}
    </div>
  );
}
