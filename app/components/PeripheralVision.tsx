"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function PeripheralVision() {
  const [phase, setPhase] = useState<"ready" | "fixate" | "target" | "result">("ready");
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [misses, setMisses] = useState(0);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  const [showTarget, setShowTarget] = useState(false);
  const startTime = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const totalRounds = 15;
  const containerRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setPhase("fixate");
    setRound(0);
    setTimes([]);
    setMisses(0);
    showNextTarget();
  };

  const showNextTarget = useCallback(() => {
    setShowTarget(false);
    setTargetPos(null);

    // Random delay 1-3s before showing target
    const delay = 1000 + Math.random() * 2000;
    timeoutRef.current = setTimeout(() => {
      // Place target at random position, biased toward edges
      const angle = Math.random() * Math.PI * 2;
      const minDist = 25; // minimum % from center
      const maxDist = 42; // maximum % from center
      const dist = minDist + Math.random() * (maxDist - minDist);
      const x = 50 + Math.cos(angle) * dist;
      const y = 50 + Math.sin(angle) * dist;

      setTargetPos({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
      setShowTarget(true);
      startTime.current = performance.now();

      // Auto-miss after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setMisses((m) => m + 1);
        nextRound();
      }, 3000);
    }, delay);
  }, []);

  const nextRound = useCallback(() => {
    setRound((r) => {
      if (r + 1 >= totalRounds) {
        setPhase("result");
        return r + 1;
      }
      setShowTarget(false);
      setTargetPos(null);
      // Next target after brief pause
      const delay = 500 + Math.random() * 1000;
      timeoutRef.current = setTimeout(() => showNextTarget(), delay);
      return r + 1;
    });
  }, [showNextTarget]);

  const handleTargetClick = () => {
    if (!showTarget) return;
    clearTimeout(timeoutRef.current);
    const elapsed = Math.round(performance.now() - startTime.current);
    setTimes((t) => [...t, elapsed]);
    nextRound();
  };

  const handleFieldClick = (e: React.MouseEvent) => {
    // Only count misclicks when target is visible
    if (showTarget && targetPos) {
      // Check if click was far from target
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const clickX = ((e.clientX - rect.left) / rect.width) * 100;
        const clickY = ((e.clientY - rect.top) / rect.height) * 100;
        const dist = Math.sqrt((clickX - targetPos.x) ** 2 + (clickY - targetPos.y) ** 2);
        if (dist > 8) {
          // Misclick
          setMisses((m) => m + 1);
        }
      }
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (phase === "fixate") {
      showNextTarget();
    }
  }, [phase]);

  const avgTime = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

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
          <p className="text-sm text-gray-500 mb-6">{totalRounds} rounds. Targets appear at the edges -- don't look away from center!</p>
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
              const text = `Peripheral Vision: ${avgTime}ms avg (${times.length}/${totalRounds} detected) - ${rating.label} | benchmybrain.com/peripheral`;
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
        <span>Round {round + 1} / {totalRounds}</span>
        <span>Detected: {times.length}</span>
      </div>

      <div
        ref={containerRef}
        className="relative bg-gray-900 rounded-2xl border border-gray-800 cursor-crosshair select-none"
        style={{ height: "400px" }}
        onClick={handleFieldClick}
      >
        {/* Center fixation dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
        </div>

        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-800" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800" />

        {/* Target */}
        {showTarget && targetPos && (
          <button
            onClick={(e) => { e.stopPropagation(); handleTargetClick(); }}
            className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/50 animate-ping-once"
            style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
          />
        )}
      </div>

      <p className="text-center text-xs text-gray-500">Keep your eyes on the center dot. Click targets in your peripheral vision.</p>
    </div>
  );
}
