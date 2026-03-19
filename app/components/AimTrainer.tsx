"use client";

import { useState, useRef, useCallback } from "react";

interface Target {
  x: number;
  y: number;
  size: number;
}

export default function AimTrainer() {
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [target, setTarget] = useState<Target | null>(null);
  const [hits, setHits] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const totalTargets = 30;
  const lastHit = useRef(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const spawnTarget = useCallback(() => {
    const size = 40 + Math.random() * 20; // 40-60px
    const x = 10 + Math.random() * 80; // 10-90% to avoid edges
    const y = 10 + Math.random() * 80;
    setTarget({ x, y, size });
    lastHit.current = performance.now();
  }, []);

  const startGame = () => {
    setHits(0);
    setTimes([]);
    setPhase("playing");
    spawnTarget();
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const elapsed = performance.now() - lastHit.current;
    const newTimes = [...times, elapsed];
    const newHits = hits + 1;

    setTimes(newTimes);
    setHits(newHits);

    if (newHits >= totalTargets) {
      setTarget(null);
      setPhase("done");
    } else {
      spawnTarget();
    }
  };

  const average =
    times.length > 0
      ? Math.round(times.reduce((s, t) => s + t, 0) / times.length)
      : 0;

  const getRating = (ms: number) => {
    if (ms < 300) return { label: "Aimbot", color: "text-emerald-400" };
    if (ms < 450) return { label: "Sharp Shooter", color: "text-green-400" };
    if (ms < 600) return { label: "Average", color: "text-yellow-400" };
    if (ms < 800) return { label: "Below Average", color: "text-orange-400" };
    return { label: "Keep Practicing", color: "text-red-400" };
  };

  if (phase === "done") {
    const rating = getRating(average);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Average Time per Target</p>
          <p className="text-6xl font-black text-red-400">{average}ms</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {totalTargets} targets hit
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Fastest</p>
            <p className="text-xl font-bold text-emerald-400">
              {Math.round(Math.min(...times))}ms
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Slowest</p>
            <p className="text-xl font-bold text-red-400">
              {Math.round(Math.max(...times))}ms
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Pro: &lt;300ms</span>
            <span>Good: &lt;450ms</span>
            <span>Average: 600ms</span>
            <span>Slow: &gt;800ms</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const t = `Aim Trainer: ${average}ms average (${rating.label})! Can you aim faster?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-red-600 text-white font-bold text-xl rounded-2xl hover:bg-red-700 transition-colors"
        >
          Start Aim Trainer
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Click {totalTargets} targets as fast as you can. We measure your
          average time per target.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Targets: {hits} / {totalTargets}</span>
        {times.length > 0 && <span>Avg: {average}ms</span>}
      </div>

      <div
        ref={areaRef}
        className="relative w-full h-80 md:h-96 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden cursor-crosshair"
      >
        {target && (
          <button
            onClick={handleTargetClick}
            className="absolute rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-lg shadow-red-500/30"
            style={{
              width: `${target.size}px`,
              height: `${target.size}px`,
              left: `calc(${target.x}% - ${target.size / 2}px)`,
              top: `calc(${target.y}% - ${target.size / 2}px)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
