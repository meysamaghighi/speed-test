"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

const TOTAL_ROUNDS = 15;

export default function PeripheralVision() {
  const [phase, setPhase] = useState<"ready" | "playing" | "result">("ready");
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [misses, setMisses] = useState(0);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  const targetShown = useRef(false);
  const startTime = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const avgTime = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const pb = usePersonalBest("pb-peripheral", "lower", phase === "result" && avgTime > 0 ? avgTime : null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const scheduleTarget = useCallback(() => {
    clearTimer();
    setTargetPos(null);
    targetShown.current = false;

    const delay = 1000 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      // Place target at random angle, biased toward edges
      const angle = Math.random() * Math.PI * 2;
      const dist = 25 + Math.random() * 17; // 25-42% from center
      const x = Math.max(5, Math.min(95, 50 + Math.cos(angle) * dist));
      const y = Math.max(5, Math.min(95, 50 + Math.sin(angle) * dist));

      setTargetPos({ x, y });
      targetShown.current = true;
      startTime.current = performance.now();

      // Auto-miss after 3 seconds
      timerRef.current = setTimeout(() => {
        targetShown.current = false;
        setTargetPos(null);
        setMisses((m) => m + 1);
        advanceRound();
      }, 3000);
    }, delay);
  }, []);

  const advanceRound = useCallback(() => {
    setRound((r) => {
      const next = r + 1;
      if (next >= TOTAL_ROUNDS) {
        setPhase("result");
        return next;
      }
      // Brief pause before next target
      clearTimer();
      timerRef.current = setTimeout(() => scheduleTarget(), 500 + Math.random() * 500);
      return next;
    });
  }, [scheduleTarget]);

  const startGame = () => {
    setRound(0);
    setTimes([]);
    setMisses(0);
    setTargetPos(null);
    targetShown.current = false;
    setPhase("playing");
    scheduleTarget();
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!targetShown.current) return;
    clearTimer();
    const elapsed = Math.round(performance.now() - startTime.current);
    setTimes((t) => [...t, elapsed]);
    targetShown.current = false;
    setTargetPos(null);
    advanceRound();
  };

  const handleFieldClick = () => {
    // Misclick when target is visible
    if (targetShown.current && targetPos) {
      setMisses((m) => m + 1);
    }
  };

  const getRating = () => {
    if (avgTime === 0) return { label: "No Detections", color: "text-red-400" };
    if (avgTime < 400) return { label: "Eagle Eyes", color: "text-yellow-400" };
    if (avgTime < 600) return { label: "Sharp Vision", color: "text-green-400" };
    if (avgTime < 800) return { label: "Good Awareness", color: "text-blue-400" };
    if (avgTime < 1100) return { label: "Average", color: "text-gray-300" };
    return { label: "Tunnel Vision", color: "text-gray-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-lg text-gray-300 mb-4">Stare at the center dot. Click targets that appear in your <strong className="text-white">peripheral vision</strong>.</p>
          <p className="text-sm text-gray-500 mb-6">{TOTAL_ROUNDS} rounds. Targets appear at the edges -- don't look away from center!</p>
          <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-blue-400 transition-all">
            Start
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const rating = getRating();
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Average Detection Time</p>
          <p className="text-5xl font-black text-white">{avgTime}<span className="text-2xl text-gray-400">ms</span></p>
          <p className={`text-xl font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}ms</p>}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-2xl font-bold text-white">{times.length}</p>
              <p className="text-xs text-gray-500">Detected</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{misses}</p>
              <p className="text-xs text-gray-500">Missed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{times.length > 0 ? Math.min(...times) : 0}ms</p>
              <p className="text-xs text-gray-500">Fastest</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={startGame} className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors">
            Try Again
          </button>
          <button
            onClick={() => {
              const text = `Peripheral Vision: ${avgTime}ms avg (${times.length}/${TOTAL_ROUNDS} detected) - ${rating.label} | benchmybrain.com/peripheral`;
              if (navigator.share) navigator.share({ title: "Peripheral Vision Test", text });
              else navigator.clipboard.writeText(text);
            }}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Round {Math.min(round + 1, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</span>
        <span>Detected: {times.length} | Missed: {misses}</span>
      </div>

      <div
        ref={containerRef}
        className="relative bg-gray-900 rounded-2xl border border-gray-800 cursor-crosshair select-none"
        style={{ height: "400px" }}
        onClick={handleFieldClick}
      >
        {/* Center fixation dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>

        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-800" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800" />

        {/* Target */}
        {targetPos && (
          <button
            onClick={handleTargetClick}
            className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/50 transition-transform hover:scale-110"
            style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
          />
        )}
      </div>

      <p className="text-center text-xs text-gray-500">Keep your eyes on the center dot. Click targets in your peripheral vision.</p>
    </div>
  );
}
