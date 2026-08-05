"use client";

import { useState, useRef, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";
import LeaderboardPanel from "./LeaderboardPanel";
import ReportUpsell from "./ReportUpsell";

interface Target {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

export default function HandEye() {
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);
  const areaRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<Target | null>(null);
  const rafRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const deadlineRef = useRef(0);
  const levelRef = useRef(1);

  const pb = usePersonalBest("pb-hand-eye", "higher", phase === "done" ? score : null);

  const spawnTarget = (currentLevel: number) => {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const size = Math.max(24, 60 - currentLevel * 3); // Gets smaller each level, min 24px
    const speed = 3 + (currentLevel - 1) * 0.5; // Starts at 3 px/frame, increases by 0.5 per level
    const angle = Math.random() * Math.PI * 2;

    // Spawn at random position in pixels
    const x = size / 2 + Math.random() * (rect.width - size);
    const y = size / 2 + Math.random() * (rect.height - size);

    targetRef.current = {
      x,
      y,
      size,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    };

    // Update DOM directly
    if (circleRef.current) {
      circleRef.current.style.width = `${size}px`;
      circleRef.current.style.height = `${size}px`;
      circleRef.current.style.left = `${x - size / 2}px`;
      circleRef.current.style.top = `${y - size / 2}px`;
    }
  };

  const startGame = () => {
    scoreRef.current = 0;
    levelRef.current = 1;
    targetRef.current = null;
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    deadlineRef.current = Date.now() + 30000;
    setPhase("playing");
  };

  // Spawn first target after the game area div renders
  useEffect(() => {
    if (phase === "playing" && !targetRef.current && areaRef.current) {
      const trySpawn = () => {
        if (!areaRef.current) return;
        const rect = areaRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          requestAnimationFrame(trySpawn);
          return;
        }
        spawnTarget(1);
      };
      trySpawn();
    }
  }, [phase]);

  const updateTarget = () => {
    if (phase !== "playing" || !targetRef.current || !areaRef.current || !circleRef.current) return;

    const target = targetRef.current;
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

    // Update ref
    target.x = newX;
    target.y = newY;
    target.vx = newVx;
    target.vy = newVy;

    // Update DOM directly
    circleRef.current.style.left = `${newX - target.size / 2}px`;
    circleRef.current.style.top = `${newY - target.size / 2}px`;

    rafRef.current = requestAnimationFrame(updateTarget);
  };

  useEffect(() => {
    if (phase === "playing") {
      rafRef.current = requestAnimationFrame(updateTarget);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;

    // Wall-clock deadline: a decrementing counter pauses when the tab is
    // backgrounded, letting a player stop the clock (and inflate their score)
    // by tabbing away mid-test
    const interval = setInterval(() => {
      const left = Math.max(0, (deadlineRef.current - Date.now()) / 1000);
      setTimeLeft(left);
      if (left <= 0) {
        setPhase("done");
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  const handleHit = (clientX: number, clientY: number) => {
    if (!targetRef.current || !areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    const hitX = clientX - rect.left;
    const hitY = clientY - rect.top;

    const target = targetRef.current;
    const dx = hitX - target.x;
    const dy = hitY - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= target.size / 2) {
      scoreRef.current += 1;
      const newScore = scoreRef.current;
      setScore(newScore);

      if (newScore % 5 === 0) {
        levelRef.current += 1;
        setLevel(levelRef.current);
        spawnTarget(levelRef.current);
      } else {
        spawnTarget(levelRef.current);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== "playing") return;
    handleHit(e.clientX, e.clientY);
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (phase !== "playing") return;
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    handleHit(touch.clientX, touch.clientY);
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
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Targets Caught</p>
          <p className="text-6xl font-black text-orange-400">{score}</p>
          <p className="text-ink-2 text-sm mt-2">Highest Level: {level}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best} catches</p>}
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Good: 25+</span>
            <span>Average: 20-25</span>
            <span>Excellent: 30+</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
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
            className="px-6 py-3 bg-orange-600 text-ink font-bold rounded-xl hover:bg-orange-700 transition-colors"
          >
            Share Score
          </button>
        </div>

        <LeaderboardPanel game="hand-eye" score={phase === "done" ? score : null} unit="catches" />

        <ReportUpsell source="hand-eye" />
      </div>
    );
  }

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-orange-600 text-ink font-bold text-xl rounded-2xl hover:bg-orange-700 transition-colors"
        >
          Start Hand-Eye Test
        </button>
        <p className="text-ink-3 text-sm mt-3">
          A moving target bounces around. Click/tap it as many times as you can in 30 seconds. It gets smaller and faster!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-ink-2">
        <span>Score: {score} • Level: {level}</span>
        <span className="font-bold text-orange-400">{timeLeft.toFixed(1)}s</span>
      </div>

      <div
        ref={areaRef}
        onClick={handleClick}
        onTouchStart={handleTouch}
        className="relative w-full h-80 md:h-96 bg-paper-2 rounded-2xl border border-line overflow-hidden cursor-crosshair"
      >
        {phase === "playing" && (
          <div
            ref={circleRef}
            className="absolute rounded-full bg-orange-500 shadow-lg shadow-orange-500/30"
            style={{
              width: "60px",
              height: "60px",
              left: "0px",
              top: "0px",
            }}
          />
        )}
      </div>
    </div>
  );
}
