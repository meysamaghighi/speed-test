"use client";

import { useState, useRef, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

interface Circle {
  id: number;
  label: string;
  x: number;
  y: number;
}

export default function TrailMaking() {
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [circles, setCircles] = useState<Circle[]>([]);
  const [connected, setConnected] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const pb = usePersonalBest("pb-trail-making", "lower", phase === "done" ? elapsedTime : null);

  const generateSequence = useCallback(() => {
    // Generate alternating number-letter sequence: 1-A-2-B-3-C...
    const seq: Circle[] = [];
    const labels = [];

    for (let i = 1; i <= 13; i++) {
      labels.push(String(i));
      if (i <= 12) {
        labels.push(String.fromCharCode(64 + i)); // A=65
      }
    }

    // Randomly position 25 circles
    const used = new Set<string>();
    for (let i = 0; i < 25; i++) {
      let x, y, key;
      do {
        x = 10 + Math.random() * 80;
        y = 10 + Math.random() * 80;
        key = `${Math.floor(x / 10)}-${Math.floor(y / 10)}`;
      } while (used.has(key));
      used.add(key);

      seq.push({ id: i, label: labels[i], x, y });
    }

    return seq;
  }, []);

  const startGame = () => {
    setCircles(generateSequence());
    setConnected([]);
    setStartTime(performance.now());
    setPhase("playing");
  };

  const handleCircleClick = (id: number) => {
    if (connected.includes(id)) return;

    const expectedIndex = connected.length;
    const clickedCircle = circles.find(c => c.id === id);
    const expectedCircle = circles[expectedIndex];

    if (clickedCircle?.label !== expectedCircle?.label) {
      // Wrong circle
      return;
    }

    const newConnected = [...connected, id];
    setConnected(newConnected);

    if (newConnected.length === circles.length) {
      const elapsed = Math.round(performance.now() - startTime);
      setElapsedTime(elapsed);
      setPhase("done");
    }
  };

  const getRating = (ms: number) => {
    if (ms < 20000) return { label: "Lightning Fast", color: "text-emerald-400" };
    if (ms < 30000) return { label: "Very Good", color: "text-green-400" };
    if (ms < 45000) return { label: "Average", color: "text-yellow-400" };
    if (ms < 60000) return { label: "Below Average", color: "text-orange-400" };
    return { label: "Keep Practicing", color: "text-red-400" };
  };

  if (phase === "done") {
    const rating = getRating(elapsedTime);
    const seconds = (elapsedTime / 1000).toFixed(1);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Completion Time</p>
          <p className="text-6xl font-black text-cyan-400">{seconds}s</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {(pb.best / 1000).toFixed(1)}s</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Fast: &lt;20s</span>
            <span>Good: &lt;30s</span>
            <span>Average: 30-45s</span>
            <span>Slow: &gt;60s</span>
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
              const t = `Trail Making Test: ${seconds}s (${rating.label})! Can you connect faster?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors"
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
          className="px-8 py-4 bg-cyan-600 text-white font-bold text-xl rounded-2xl hover:bg-cyan-700 transition-colors"
        >
          Start Trail Making
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Connect circles in alternating order: 1-A-2-B-3-C... as fast as you can.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Connected: {connected.length} / {circles.length}</span>
        <span>Next: {circles[connected.length]?.label}</span>
      </div>

      <div
        ref={areaRef}
        className="relative w-full h-96 md:h-[500px] bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connected.map((id, idx) => {
            if (idx === 0) return null;
            const from = circles.find(c => c.id === connected[idx - 1]);
            const to = circles.find(c => c.id === id);
            if (!from || !to) return null;
            return (
              <line
                key={`${from.id}-${to.id}`}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="#22d3ee"
                strokeWidth="2"
                opacity="0.5"
              />
            );
          })}
        </svg>

        {circles.map((circle) => {
          const isConnected = connected.includes(circle.id);
          const isNext = circles[connected.length]?.id === circle.id;
          return (
            <button
              key={circle.id}
              onClick={() => handleCircleClick(circle.id)}
              className={`absolute rounded-full w-12 h-12 border-2 font-bold transition-all ${
                isConnected
                  ? "bg-cyan-600 border-cyan-400 text-white"
                  : isNext
                  ? "bg-cyan-500/20 border-cyan-400 text-white ring-2 ring-cyan-400"
                  : "bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500"
              }`}
              style={{
                left: `calc(${circle.x}% - 24px)`,
                top: `calc(${circle.y}% - 24px)`,
              }}
            >
              {circle.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
