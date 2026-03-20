"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

export default function VisualMemory() {
  const pb = usePersonalBest("pb-visual-memory", "higher");
  const [phase, setPhase] = useState<"ready" | "show" | "input" | "correct" | "wrong">("ready");
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(3);
  const [pattern, setPattern] = useState<Set<number>>(new Set());
  const [clicked, setClicked] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);

  const tilesForLevel = (lvl: number) => Math.min(3 + lvl, 25);
  const gridForLevel = (lvl: number) => {
    const tiles = tilesForLevel(lvl);
    if (tiles <= 9) return 3;
    if (tiles <= 16) return 4;
    if (tiles <= 20) return 5;
    return 6;
  };

  const startGame = () => {
    setLevel(1);
    setLives(3);
    startLevel(1);
  };

  const startLevel = useCallback((lvl: number) => {
    const size = gridForLevel(lvl);
    const tileCount = tilesForLevel(lvl);
    const total = size * size;

    const indices = new Set<number>();
    while (indices.size < Math.min(tileCount, total)) {
      indices.add(Math.floor(Math.random() * total));
    }

    setGridSize(size);
    setPattern(indices);
    setClicked(new Set());
    setWrong(new Set());
    setPhase("show");
  }, []);

  useEffect(() => {
    if (phase === "show") {
      const delay = 1000 + pattern.size * 200;
      const timer = setTimeout(() => setPhase("input"), delay);
      return () => clearTimeout(timer);
    }
  }, [phase, pattern]);

  const handleCellClick = (idx: number) => {
    if (phase !== "input") return;
    if (clicked.has(idx) || wrong.has(idx)) return;

    if (pattern.has(idx)) {
      const newClicked = new Set(clicked);
      newClicked.add(idx);
      setClicked(newClicked);

      if (newClicked.size === pattern.size) {
        setPhase("correct");
      }
    } else {
      const newWrong = new Set(wrong);
      newWrong.add(idx);
      setWrong(newWrong);

      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        const score = level - 1;
        if (score > highScore) setHighScore(score);
        setPhase("wrong");
      }
    }
  };

  const nextLevel = () => {
    const next = level + 1;
    setLevel(next);
    startLevel(next);
  };

  const getRating = (lvl: number) => {
    if (lvl >= 15) return { label: "Photographic", color: "text-emerald-400" };
    if (lvl >= 10) return { label: "Excellent", color: "text-green-400" };
    if (lvl >= 7) return { label: "Good", color: "text-blue-400" };
    if (lvl >= 4) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Trying", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-pink-600 text-white font-bold text-xl rounded-2xl hover:bg-pink-700 transition-colors"
        >
          Start Visual Memory
        </button>
        <p className="text-gray-500 text-sm mt-3">
          A pattern of tiles will flash. Remember them and click the correct
          tiles. You have 3 lives.
        </p>
        {highScore > 0 && (
          <p className="text-pink-400 font-bold mt-2">Best: Level {highScore}</p>
        )}
      </div>
    );
  }

  if (phase === "correct") {
    return (
      <div className="text-center space-y-4">
        <div className="bg-emerald-900/30 rounded-2xl p-8 border border-emerald-800">
          <p className="text-emerald-400 text-2xl font-bold mb-2">Correct!</p>
          <p className="text-gray-400">
            Level {level} — {tilesForLevel(level)} tiles
          </p>
        </div>
        <p className="text-gray-500">
          {"♥".repeat(lives)}{"♡".repeat(3 - lives)} {lives} lives remaining
        </p>
        <button
          onClick={nextLevel}
          className="px-8 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors"
        >
          Next Level ({tilesForLevel(level + 1)} tiles)
        </button>
      </div>
    );
  }

  if (phase === "wrong" && lives <= 0) {
    const score = level - 1;
    pb.checkAndSet(score);
    const rating = getRating(score);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Visual Memory Score</p>
          <p className="text-6xl font-black text-pink-400">Level {score}</p>
          <p className="text-gray-400 mt-1">{tilesForLevel(score)} tiles memorized</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: Level {pb.best}</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Top: 15+</span>
            <span>Great: 10+</span>
            <span>Average: 7</span>
            <span>Low: &lt;4</span>
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
              const t = `Visual Memory: Level ${score} (${tilesForLevel(score)} tiles)! How far can you get?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  // Show or Input phase
  const total = gridSize * gridSize;
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Level {level} — {tilesForLevel(level)} tiles</span>
        <span>{"♥".repeat(lives)}{"♡".repeat(3 - lives)}</span>
      </div>

      <div
        className="grid gap-1.5 max-w-md mx-auto"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: total }).map((_, idx) => {
          const isPattern = pattern.has(idx);
          const isClicked = clicked.has(idx);
          const isWrong = wrong.has(idx);

          let bg = "bg-gray-800 hover:bg-gray-700 cursor-pointer";
          if (phase === "show" && isPattern) {
            bg = "bg-white";
          } else if (isClicked) {
            bg = "bg-emerald-500";
          } else if (isWrong) {
            bg = "bg-red-500";
          }

          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`aspect-square rounded-lg transition-colors ${bg}`}
              disabled={phase === "show"}
            />
          );
        })}
      </div>

      {phase === "show" && (
        <p className="text-center text-gray-500 text-sm">Memorize the pattern...</p>
      )}
    </div>
  );
}
