"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

interface Target {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

export default function HandEye() {
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [target, setTarget] = useState<Target | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);
  const areaRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTime = useRef(0);

  const pb = usePersonalBest("pb-hand-eye", "higher", phase === "done" ? score : null);

  const spawnTarget = useCallback((currentLevel: number) => {
    const size = Math.max(30, 60 - currentLevel * 3); // Gets smaller each level
    const speed = 1 + currentLevel * 0.3; // Gets faster each level
    const angle = Math.random() * Math.PI * 2;

    setTarget({
      x: 50,
      y: 50,
      size,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });
  }, []);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setPhase("playing");
    startTime.current = performance.now();
    spawnTarget(1);
  };

  const updateTarget = useCallback(() => {
    if (phase !== "playing" || !target || !areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    const maxX = rect.width;
    const maxY = rect.height;

    let newX = target.x + target.vx;
    let newY = target.y + target.vy;
    let newVx = target.vx;
    let newVy = target.vy;

    // Bounce off walls
    if (newX <= target.size / 2 || newX >= maxX - target.size / 2) {
      newVx = -newVx;
      newX = Math.max(target.size / 2, Math.min(maxX - target.size / 2, newX));
    }
    if (newY <= target.size / 2 || newY >= maxY - target.size / 2) {
      newVy = -newVy;
      newY = Math.max(target.size / 2, Math.min(maxY - target.size / 2, newY));
    }

    setTarget({ ...target, x: newX, y: newY, vx: newVx, vy: newVy });

    rafRef.current = requestAnimationFrame(updateTarget);
  }, [phase, target]);

  useEffect(() => {
    if (phase === "playing") {
      rafRef.current = requestAnimationFrame(updateTarget);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [phase, updateTarget]);

  useEffect(() => {
    if (phase !== "playing") return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 0.1;
        if (newTime <= 0) {
          setPhase("done");
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!target || !areaRef.current || phase !== "playing") return;

    const rect = areaRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const dx = clickX - target.x;
    const dy = clickY - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= target.size / 2) {
      const newScore = score + 1;
      setScore(newScore);

      // Level up every 5 catches
      if (newScore % 5 === 0) {
        const newLevel = level + 1;
        setLevel(newLevel);
        spawnTarget(newLevel);
      } else {
        spawnTarget(level);
      }
    }
  };

  const getRating = (catches: number) => {
    if (catches >= 30) return { label: "Ninja", color: "text-emerald-400" };
    if (catches >= 25) return { label: "Very Good", color: "text-green-400" };
    if (catches >= 20) return { label: "Average", color: "text-yellow-400" };
    if (catches >= 15) return { label: "Below Average", color: "text-orange-400" };
    return { label: "Keep Practicing", color: "text-red-400" };
  };

  if (phase === "done") {
    const rating = getRating(score);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Targets Caught</p>
          <p className="text-6xl font-black text-orange-400">{score}</p>
          <p className="text-gray-400 text-sm mt-2">Highest Level: {level}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best} catches</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Good: 25+</span>
            <span>Average: 20-25</span>
            <span>Excellent: 30+</span>
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
              const t = `Hand-Eye Coordination: ${score} catches, level ${level} (${rating.label})! Can you catch more?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
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
          className="px-8 py-4 bg-orange-600 text-white font-bold text-xl rounded-2xl hover:bg-orange-700 transition-colors"
        >
          Start Hand-Eye Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          A moving target bounces around. Click/tap it as many times as you can in 30 seconds. It gets smaller and faster!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Score: {score} • Level: {level}</span>
        <span className="font-bold text-orange-400">{timeLeft.toFixed(1)}s</span>
      </div>

      <div
        ref={areaRef}
        onClick={handleClick}
        className="relative w-full h-80 md:h-96 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden cursor-crosshair"
      >
        {target && (
          <div
            className="absolute rounded-full bg-orange-500 shadow-lg shadow-orange-500/30 transition-all"
            style={{
              width: `${target.size}px`,
              height: `${target.size}px`,
              left: `${target.x - target.size / 2}px`,
              top: `${target.y - target.size / 2}px`,
            }}
          />
        )}
      </div>
    </div>
  );
}
