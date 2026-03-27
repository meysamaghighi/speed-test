"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "ready" | "show1" | "blank" | "show2" | "result" | "finished";

interface GridState {
  size: number;
  colors: string[];
  changedIndex: number;
}

export default function ChangeDetectionTest() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState<GridState | null>(null);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [showTime, setShowTime] = useState(0);
  const [lives, setLives] = useState(3);

  const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899", "#f97316", "#06b6d4"];

  const isFinished = phase === "finished";
  const avgResponseTime = responseTimes.length > 0
    ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
    : 0;
  const score = isFinished ? level : 0;
  const pb = usePersonalBest("pb-change-detection", "higher", isFinished ? score : null);

  const generateGrid = useCallback((lvl: number): GridState => {
    const size = Math.min(lvl + 1, 5); // 2x2 at level 1, up to 5x5
    const totalCells = size * size;
    const gridColors: string[] = [];

    for (let i = 0; i < totalCells; i++) {
      gridColors.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    const changedIndex = Math.floor(Math.random() * totalCells);

    return { size, colors: gridColors, changedIndex };
  }, []);

  const startLevel = useCallback(() => {
    const newGrid = generateGrid(level);
    setGrid(newGrid);
    setPhase("show1");

    // Show first grid
    setTimeout(() => {
      setPhase("blank");
      // Brief blank period
      setTimeout(() => {
        setShowTime(performance.now());
        setPhase("show2");
      }, 300);
    }, 1000 + level * 100);
  }, [level, generateGrid]);

  const handleCellClick = useCallback((index: number) => {
    if (phase !== "show2" || !grid) return;

    const responseTime = Math.round(performance.now() - showTime);

    if (index === grid.changedIndex) {
      // Correct!
      setResponseTimes([...responseTimes, responseTime]);
      setPhase("result");
      setTimeout(() => {
        setLevel(level + 1);
        startLevel();
      }, 800);
    } else {
      // Wrong!
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setPhase("finished");
      } else {
        setPhase("result");
        setTimeout(() => {
          startLevel();
        }, 1000);
      }
    }
  }, [phase, grid, showTime, responseTimes, lives, level, startLevel]);

  const restart = () => {
    setPhase("ready");
    setLevel(1);
    setGrid(null);
    setResponseTimes([]);
    setShowTime(0);
    setLives(3);
  };

  // Finished screen
  if (phase === "finished") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Highest Level + Avg Response Time</p>
          <p className="text-5xl font-black text-pink-400">Level {level}</p>
          <p className="text-2xl text-gray-400 mt-2">{avgResponseTime}ms avg</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: Level {pb.best}</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Change Detection Rating</p>
          <div className="grid grid-cols-2 gap-2">
            <span>Level 1-2: Beginner</span>
            <span>Level 3-4: Average</span>
            <span>Level 5-6: Good</span>
            <span>Level 7+: Expert</span>
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
              const text = `I reached level ${level} on Change Detection Test (${avgResponseTime}ms avg)! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
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

  // Ready screen
  if (phase === "ready") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-left text-gray-400 space-y-2">
            <p>• A grid of colored circles will appear</p>
            <p>• It briefly disappears, then reappears</p>
            <p>• ONE color has changed</p>
            <p>• Click the circle that changed color</p>
            <p>• Grid gets bigger each level (2x2 → 5x5)</p>
            <p>• 3 lives</p>
          </div>
        </div>
        <button
          onClick={startLevel}
          className="px-8 py-4 bg-pink-600 text-white font-bold text-xl rounded-xl hover:bg-pink-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  if (!grid) return null;

  const getSecondGridColors = (): string[] => {
    if (phase !== "show2") return grid.colors;
    const newColors = [...grid.colors];
    const currentColor = newColors[grid.changedIndex];
    const otherColors = colors.filter(c => c !== currentColor);
    newColors[grid.changedIndex] = otherColors[Math.floor(Math.random() * otherColors.length)];
    return newColors;
  };

  const displayColors = phase === "show2" ? getSecondGridColors() : grid.colors;

  // Game screen
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400 px-1">
        <span>Level {level} • {grid.size}x{grid.size} grid</span>
        <span className="text-red-400">❤️ x {lives}</span>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        {phase === "show1" && (
          <p className="text-center text-white font-bold mb-4">Memorize the colors</p>
        )}
        {phase === "blank" && (
          <p className="text-center text-gray-400 mb-4">...</p>
        )}
        {phase === "show2" && (
          <p className="text-center text-white font-bold mb-4">Click the changed circle!</p>
        )}
        {phase === "result" && (
          <p className={`text-center font-bold mb-4 ${lives < 3 ? "text-red-400" : "text-green-400"}`}>
            {lives < 3 ? "Wrong! -1 life" : "Correct!"}
          </p>
        )}

        {phase === "blank" ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-6xl text-gray-700">...</div>
          </div>
        ) : (
          <div
            className="grid gap-3 max-w-md mx-auto"
            style={{
              gridTemplateColumns: `repeat(${grid.size}, 1fr)`,
            }}
          >
            {displayColors.map((color, i) => (
              <button
                key={i}
                onClick={() => handleCellClick(i)}
                disabled={phase !== "show2"}
                className={`aspect-square rounded-full transition-all ${
                  phase === "show2" ? "cursor-pointer hover:scale-110" : "cursor-default"
                }`}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 4px 12px ${color}40`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
