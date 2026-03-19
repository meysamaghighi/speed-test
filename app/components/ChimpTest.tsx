"use client";

import { useState, useCallback } from "react";

interface Cell {
  id: number;
  number: number;
  row: number;
  col: number;
  revealed: boolean;
  clicked: boolean;
}

export default function ChimpTest() {
  const [phase, setPhase] = useState<"ready" | "memorize" | "play" | "correct" | "wrong">("ready");
  const [level, setLevel] = useState(4);
  const [cells, setCells] = useState<Cell[]>([]);
  const [nextExpected, setNextExpected] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const gridSize = 8;

  const generateCells = useCallback((count: number) => {
    const positions = new Set<string>();
    const result: Cell[] = [];

    while (result.length < count) {
      const row = Math.floor(Math.random() * 5);
      const col = Math.floor(Math.random() * gridSize);
      const key = `${row}-${col}`;
      if (!positions.has(key)) {
        positions.add(key);
        result.push({
          id: result.length,
          number: result.length + 1,
          row,
          col,
          revealed: true,
          clicked: false,
        });
      }
    }
    return result;
  }, []);

  const startLevel = useCallback((lvl: number) => {
    const newCells = generateCells(lvl);
    setCells(newCells);
    setNextExpected(1);
    setPhase("memorize");
  }, [generateCells]);

  const startGame = () => {
    setLevel(4);
    startLevel(4);
  };

  const handleCellClick = (cell: Cell) => {
    if (phase === "memorize") {
      // First click hides numbers
      if (cell.number === 1) {
        setCells((prev) =>
          prev.map((c) =>
            c.number === 1
              ? { ...c, clicked: true, revealed: false }
              : { ...c, revealed: false }
          )
        );
        setNextExpected(2);
        setPhase("play");
      }
      return;
    }

    if (phase !== "play") return;

    if (cell.number === nextExpected) {
      const newCells = cells.map((c) =>
        c.id === cell.id ? { ...c, clicked: true } : c
      );
      setCells(newCells);

      if (nextExpected === cells.length) {
        setPhase("correct");
      } else {
        setNextExpected(nextExpected + 1);
      }
    } else {
      const score = level - 1;
      if (score > highScore) setHighScore(score);
      // Show all numbers on failure
      setCells((prev) => prev.map((c) => ({ ...c, revealed: true })));
      setPhase("wrong");
    }
  };

  const nextLevel = () => {
    const next = level + 1;
    setLevel(next);
    startLevel(next);
  };

  const getRating = (lvl: number) => {
    if (lvl >= 15) return { label: "Genius Chimp", color: "text-emerald-400" };
    if (lvl >= 10) return { label: "Excellent", color: "text-green-400" };
    if (lvl >= 7) return { label: "Above Average", color: "text-blue-400" };
    if (lvl >= 5) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-orange-600 text-white font-bold text-xl rounded-2xl hover:bg-orange-700 transition-colors"
        >
          Start Chimp Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Numbers appear on a grid. Click them in order (1, 2, 3...). After you
          click 1, the rest hide. How many can you remember?
        </p>
        {highScore > 0 && (
          <p className="text-orange-400 font-bold mt-2">
            Best: {highScore} numbers
          </p>
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
            Level {level} — {level} numbers
          </p>
        </div>
        <button
          onClick={nextLevel}
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
        >
          Next Level ({level + 1} numbers)
        </button>
      </div>
    );
  }

  if (phase === "wrong") {
    const score = level - 1;
    const rating = getRating(score);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Your Chimp Test Score</p>
          <p className="text-6xl font-black text-orange-400">{score}</p>
          <p className="text-gray-400 mt-1">numbers remembered</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Amazing: 15+</span>
            <span>Great: 10+</span>
            <span>Average: 7</span>
            <span>Low: &lt;5</span>
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
              const t = `Chimp Test: I remembered ${score} numbers! Can you beat me?`;
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

  // Memorize or Play phase - show grid
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Level {level} — {level} numbers</span>
        <span>
          {phase === "memorize" ? "Click 1 to start" : `Next: ${nextExpected}`}
        </span>
      </div>

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: 5 * gridSize }).map((_, idx) => {
          const row = Math.floor(idx / gridSize);
          const col = idx % gridSize;
          const cell = cells.find((c) => c.row === row && c.col === col);

          if (!cell) {
            return (
              <div
                key={idx}
                className="aspect-square rounded-lg bg-gray-900/30"
              />
            );
          }

          if (cell.clicked) {
            return (
              <div
                key={idx}
                className="aspect-square rounded-lg bg-emerald-900/30 border border-emerald-800/30"
              />
            );
          }

          return (
            <button
              key={idx}
              onClick={() => handleCellClick(cell)}
              className="aspect-square rounded-lg bg-white hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer"
            >
              {cell.revealed && (
                <span className="text-gray-900 font-black text-sm md:text-lg">
                  {cell.number}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
