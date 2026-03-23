"use client";

import { useState, useCallback, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "waiting" | "playing" | "result";

interface Round {
  gridSize: number;
  baseColor: { h: number; s: number; l: number };
  oddColor: { h: number; s: number; l: number };
  oddIndex: number;
  startTime: number;
  responseTime: number | null;
  correct: boolean | null;
}

function hsl(c: { h: number; s: number; l: number }) {
  return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
}

function generateRound(level: number): Omit<Round, "startTime" | "responseTime" | "correct"> {
  // Grid gets larger, color difference gets smaller as level increases
  const gridSize = level <= 5 ? 3 : level <= 12 ? 4 : level <= 18 ? 5 : 6;
  const totalCells = gridSize * gridSize;

  // Random base color
  const h = Math.floor(Math.random() * 360);
  const s = 50 + Math.floor(Math.random() * 30); // 50-80
  const l = 40 + Math.floor(Math.random() * 20); // 40-60

  // Difference decreases with level (starts obvious, gets subtle)
  const diff = Math.max(5, 35 - level * 1.5);
  const direction = Math.random() < 0.5 ? 1 : -1;

  // Vary hue OR lightness (randomly)
  const varyHue = Math.random() < 0.5;
  const oddColor = varyHue
    ? { h: (h + diff * direction + 360) % 360, s, l }
    : { h, s, l: Math.min(85, Math.max(15, l + diff * direction)) };

  const oddIndex = Math.floor(Math.random() * totalCells);

  return { gridSize, baseColor: { h, s, l }, oddColor, oddIndex };
}

export default function ColorMatchTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const totalRounds = 20;

  const correctCount = rounds.filter((r) => r.correct).length;
  const avgSpeed =
    rounds.filter((r) => r.correct && r.responseTime).length > 0
      ? Math.round(
          rounds
            .filter((r) => r.correct && r.responseTime)
            .reduce((sum, r) => sum + (r.responseTime || 0), 0) /
            rounds.filter((r) => r.correct && r.responseTime).length
        )
      : 0;

  // Score based on level reached + speed bonus
  const score = correctCount * 100 + Math.max(0, Math.floor(level * 50)) + Math.max(0, 2000 - avgSpeed);
  const isFinished = phase === "result";
  const pb = usePersonalBest("pb-color-match", "higher", isFinished ? score : null);

  const startNextRound = useCallback(
    (currentLevel: number) => {
      const roundData = generateRound(currentLevel);
      setCurrentRound({
        ...roundData,
        startTime: performance.now(),
        responseTime: null,
        correct: null,
      });
    },
    []
  );

  const startTest = () => {
    setPhase("playing");
    setRounds([]);
    setLevel(1);
    setLives(3);
    startNextRound(1);
  };

  const handleCellClick = (index: number) => {
    if (!currentRound || phase !== "playing") return;

    const responseTime = Math.round(performance.now() - currentRound.startTime);
    const correct = index === currentRound.oddIndex;

    const completedRound: Round = {
      ...currentRound,
      responseTime,
      correct,
    };

    const newRounds = [...rounds, completedRound];
    setRounds(newRounds);

    const newLives = correct ? lives : lives - 1;
    const newLevel = correct ? level + 1 : level;
    setLives(newLives);
    setLevel(newLevel);

    if (newLives <= 0 || newRounds.length >= totalRounds) {
      setCurrentRound(null);
      setPhase("result");
    } else {
      startNextRound(newLevel);
    }
  };

  const restart = () => {
    setPhase("waiting");
    setRounds([]);
    setCurrentRound(null);
    setLevel(1);
    setLives(3);
  };

  const getRating = (sc: number) => {
    if (sc >= 3000) return { label: "Eagle Eye", color: "text-emerald-400" };
    if (sc >= 2400) return { label: "Excellent", color: "text-green-400" };
    if (sc >= 1800) return { label: "Good", color: "text-yellow-400" };
    if (sc >= 1200) return { label: "Average", color: "text-orange-400" };
    return { label: "Keep Practicing", color: "text-red-400" };
  };

  // Result screen
  if (phase === "result") {
    const rating = getRating(score);
    const accuracy = rounds.length > 0 ? Math.round((correctCount / rounds.length) * 100) : 0;

    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Your Score</p>
          <p className="text-6xl font-black text-blue-400">{score}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && (
            <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>
          )}
          {pb.best !== null && !pb.isNewBest && (
            <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-gray-500 text-sm">Accuracy</p>
            <p className="text-2xl font-bold text-white">{accuracy}%</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-gray-500 text-sm">Level</p>
            <p className="text-2xl font-bold text-white">{level}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-gray-500 text-sm">Avg Speed</p>
            <p className="text-2xl font-bold text-white">{avgSpeed}ms</p>
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
              const text = `I scored ${score} on Odd Color Out (${rating.label}, Level ${level})! Can you spot the different shade? benchmybrain.com/color-match`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard
                  .writeText(text)
                  .then(() => alert("Copied!"))
                  .catch(() => {});
              }
            }}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  // Playing screen
  if (phase === "playing" && currentRound) {
    const { gridSize, baseColor, oddColor, oddIndex } = currentRound;
    const totalCells = gridSize * gridSize;

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm px-1">
          <span className="text-gray-400">
            Round {rounds.length + 1}/{totalRounds} | Level {level}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < lives ? "text-red-500" : "text-gray-700"}`}
              >
                &#9829;
              </span>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm">Tap the tile that is a different color</p>

        <div
          className="grid gap-2 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            maxWidth: `${gridSize * 80}px`,
          }}
        >
          {Array.from({ length: totalCells }).map((_, i) => {
            const isOdd = i === oddIndex;
            return (
              <button
                key={i}
                onClick={() => handleCellClick(i)}
                className="aspect-square rounded-lg transition-transform active:scale-95 hover:scale-105"
                style={{
                  backgroundColor: hsl(isOdd ? oddColor : baseColor),
                  minHeight: "48px",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Waiting screen
  return (
    <div className="text-center space-y-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <p className="text-4xl mb-4">&#128065;</p>
        <h2 className="text-xl font-bold text-white mb-3">Odd Color Out</h2>
        <p className="text-gray-300 mb-4">
          A grid of colored tiles is shown. One tile is a slightly different shade.
          Find it as fast as you can!
        </p>
        <p className="text-sm text-gray-500 mb-4">
          The grid gets larger and the color difference gets more subtle as you progress.
          You have 3 lives.
        </p>
        <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How It Works:</p>
          <p>Level 1-5: 3x3 grid, obvious difference</p>
          <p>Level 6-12: 4x4 grid, subtle difference</p>
          <p>Level 13-18: 5x5 grid, very subtle</p>
          <p>Level 19+: 6x6 grid, nearly invisible</p>
        </div>
      </div>

      <button
        onClick={startTest}
        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg"
      >
        Start Test
      </button>
    </div>
  );
}
