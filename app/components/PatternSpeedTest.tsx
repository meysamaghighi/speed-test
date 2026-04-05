"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "ready" | "memorize" | "recall" | "result" | "finished";

export default function PatternSpeedTest() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [highestLevel, setHighestLevel] = useState(0);

  const isFinished = phase === "finished";
  // NOTE: This component is unused. Changed key to avoid conflict with RapidEstimationTest.
  const pb = usePersonalBest("pb-pattern-speed-old", "higher", isFinished ? highestLevel : null);

  const generatePattern = useCallback((numCells: number) => {
    const cells = Array.from({ length: 9 }, (_, i) => i);
    const shuffled = cells.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numCells);
  }, []);

  const startLevel = useCallback(() => {
    const numCells = level + 1; // Start with 2 cells at level 1
    const newPattern = generatePattern(numCells);
    setPattern(newPattern);
    setSelected([]);
    setPhase("memorize");

    // Show pattern briefly
    setTimeout(() => {
      setPhase("recall");
    }, 1000 + level * 200); // Longer display for higher levels
  }, [level, generatePattern]);

  const handleCellClick = (index: number) => {
    if (phase !== "recall") return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    // Check if correct so far
    const isCorrect = newSelected.every((cell, i) => pattern.includes(cell));

    if (!isCorrect) {
      // Failed - game over
      setHighestLevel(level);
      setPhase("finished");
      return;
    }

    // Check if completed this level
    if (newSelected.length === pattern.length) {
      const allCorrect = newSelected.every(cell => pattern.includes(cell));
      if (allCorrect) {
        setPhase("result");
        setTimeout(() => {
          setLevel(level + 1);
          startLevel();
        }, 800);
      } else {
        setHighestLevel(level);
        setPhase("finished");
      }
    }
  };

  const restart = () => {
    setPhase("ready");
    setLevel(1);
    setPattern([]);
    setSelected([]);
    setHighestLevel(0);
  };

  // Finished screen
  if (phase === "finished") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Highest Level Reached</p>
          <p className="text-6xl font-black text-purple-400">Level {highestLevel}</p>
          <p className="text-gray-400 text-sm mt-2">
            ({highestLevel + 1} cells in the pattern)
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: Level {pb.best}</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Pattern Speed Rating</p>
          <div className="flex justify-between">
            <span>Beginner: 1-3</span>
            <span>Average: 4-6</span>
            <span>Good: 7-9</span>
            <span>Expert: 10+</span>
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
              const text = `I reached level ${highestLevel} on Pattern Speed Test! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
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
            <p>• A pattern will flash on the grid</p>
            <p>• Memorize which cells are highlighted</p>
            <p>• Click the same cells to recreate the pattern</p>
            <p>• Each level adds one more cell</p>
          </div>
        </div>
        <button
          onClick={startLevel}
          className="px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-xl hover:bg-purple-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  // Game grid
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400 px-1">
        <span>Level {level}</span>
        <span>{pattern.length} cells to remember</span>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        {phase === "memorize" && (
          <p className="text-center text-white font-bold mb-4">Memorize!</p>
        )}
        {phase === "recall" && (
          <p className="text-center text-gray-400 mb-4">
            Click the highlighted cells ({selected.length}/{pattern.length})
          </p>
        )}
        {phase === "result" && (
          <p className="text-center text-green-400 font-bold mb-4">Correct!</p>
        )}

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {Array.from({ length: 9 }, (_, i) => {
            const isInPattern = pattern.includes(i);
            const isSelected = selected.includes(i);
            const showPattern = phase === "memorize" || phase === "result";

            return (
              <button
                key={i}
                onClick={() => handleCellClick(i)}
                disabled={phase !== "recall"}
                className={`aspect-square rounded-xl transition-all ${
                  showPattern && isInPattern
                    ? "bg-purple-500"
                    : isSelected
                    ? "bg-blue-500"
                    : "bg-gray-800 hover:bg-gray-700"
                } ${phase === "recall" ? "cursor-pointer" : "cursor-default"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
