"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "waiting" | "memorize" | "recall" | "result";

const EMOJI_POOL = ["😀", "😎", "🤔", "😂", "🥳", "😴", "🤩", "😤", "😍", "🤯", "😱", "🥴", "😇", "🤓", "😈", "🤠"];

interface Level {
  gridSize: number; // e.g., 3 = 3x3 = 9 faces
  memorizeTime: number; // ms
  changesCount: number; // how many faces to swap
}

const LEVELS: Level[] = [
  { gridSize: 3, memorizeTime: 5000, changesCount: 1 }, // Level 1: 9 faces, 5s, 1 change
  { gridSize: 3, memorizeTime: 4000, changesCount: 2 }, // Level 2: 9 faces, 4s, 2 changes
  { gridSize: 4, memorizeTime: 6000, changesCount: 2 }, // Level 3: 16 faces, 6s, 2 changes
  { gridSize: 4, memorizeTime: 5000, changesCount: 3 }, // Level 4: 16 faces, 5s, 3 changes
  { gridSize: 5, memorizeTime: 7000, changesCount: 3 }, // Level 5: 25 faces, 7s, 3 changes
  { gridSize: 5, memorizeTime: 6000, changesCount: 4 }, // Level 6: 25 faces, 6s, 4 changes
];

export default function FaceMemoryTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [level, setLevel] = useState(0);
  const [originalGrid, setOriginalGrid] = useState<string[]>([]);
  const [currentGrid, setCurrentGrid] = useState<string[]>([]);
  const [changedIndices, setChangedIndices] = useState<Set<number>>(new Set());
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [countdown, setCountdown] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const maxLevel = level;
  const isFinished = phase === "result" && isCorrect === false;
  const pb = usePersonalBest("pb-face-memory", "higher", isFinished ? maxLevel : null);

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const startLevel = useCallback(() => {
    const config = LEVELS[Math.min(level, LEVELS.length - 1)];
    const totalFaces = config.gridSize * config.gridSize;
    const availableEmojis = shuffle(EMOJI_POOL);

    // Generate original grid
    const grid: string[] = [];
    for (let i = 0; i < totalFaces; i++) {
      grid.push(availableEmojis[i % availableEmojis.length]);
    }

    setOriginalGrid(grid);
    setCurrentGrid(grid);
    setChangedIndices(new Set());
    setSelectedIndices(new Set());
    setIsCorrect(null);
    setPhase("memorize");
    setCountdown(Math.ceil(config.memorizeTime / 1000));

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // After memorize time, show recall phase with changes
    timeoutRef.current = setTimeout(() => {
      const changedSet = new Set<number>();
      const indicesToChange = shuffle([...Array(totalFaces).keys()]).slice(0, config.changesCount);
      const newGrid = [...grid];

      indicesToChange.forEach((idx) => {
        const otherEmojis = availableEmojis.filter((e) => e !== grid[idx]);
        newGrid[idx] = otherEmojis[Math.floor(Math.random() * otherEmojis.length)];
        changedSet.add(idx);
      });

      setCurrentGrid(newGrid);
      setChangedIndices(changedSet);
      setPhase("recall");
    }, config.memorizeTime);
  }, [level]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCellClick = (index: number) => {
    if (phase !== "recall") return;

    const newSelected = new Set(selectedIndices);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedIndices(newSelected);
  };

  const handleSubmit = () => {
    if (phase !== "recall") return;

    const correct =
      selectedIndices.size === changedIndices.size &&
      [...selectedIndices].every((idx) => changedIndices.has(idx));

    setIsCorrect(correct);
    setPhase("result");
  };

  const handleContinue = () => {
    if (isCorrect) {
      setLevel(level + 1);
      startLevel();
    }
  };

  const restart = () => {
    setPhase("waiting");
    setLevel(0);
    setOriginalGrid([]);
    setCurrentGrid([]);
    setChangedIndices(new Set());
    setSelectedIndices(new Set());
    setCountdown(0);
    setIsCorrect(null);
  };

  const getRating = (lvl: number) => {
    if (lvl >= 6) return { label: "Elite Memory", color: "text-emerald-400" };
    if (lvl >= 4) return { label: "Strong Memory", color: "text-green-400" };
    if (lvl >= 2) return { label: "Average Memory", color: "text-yellow-400" };
    if (lvl >= 1) return { label: "Needs Practice", color: "text-orange-400" };
    return { label: "Beginner", color: "text-red-400" };
  };

  // Final result screen (failed a level)
  if (phase === "result" && isCorrect === false) {
    const rating = getRating(maxLevel);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Level Reached</p>
          <p className="text-6xl font-black text-purple-400">{maxLevel}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: Level {pb.best}</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Your Answer</p>
          <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${LEVELS[Math.min(level, LEVELS.length - 1)].gridSize}, minmax(0, 1fr))` }}>
            {currentGrid.map((emoji, idx) => {
              const wasChanged = changedIndices.has(idx);
              const wasSelected = selectedIndices.has(idx);
              const isWrong = wasSelected && !wasChanged;
              const isMissed = !wasSelected && wasChanged;

              return (
                <div
                  key={idx}
                  className={`text-3xl p-2 rounded-lg border-2 ${
                    wasSelected && wasChanged
                      ? "border-green-500 bg-green-950"
                      : isWrong
                      ? "border-red-500 bg-red-950"
                      : isMissed
                      ? "border-yellow-500 bg-yellow-950"
                      : "border-gray-700 bg-gray-800"
                  }`}
                >
                  {emoji}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs">
            <span className="text-green-400">Green = Correct</span> ·
            <span className="text-red-400 ml-2">Red = Wrong Selection</span> ·
            <span className="text-yellow-400 ml-2">Yellow = Missed</span>
          </p>
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
              const text = `I reached level ${maxLevel} on Face Memory Test (${rating.label})! Can you beat me?`;
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

  // Success screen (passed a level)
  if (phase === "result" && isCorrect === true) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-5xl mb-3">✅</p>
          <p className="text-2xl font-bold text-green-400">Perfect!</p>
          <p className="text-gray-400 text-sm mt-2">Level {level} Complete</p>
        </div>

        <button
          onClick={handleContinue}
          className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors text-lg"
        >
          Next Level →
        </button>
      </div>
    );
  }

  const config = LEVELS[Math.min(level, LEVELS.length - 1)];

  // Waiting screen
  if (phase === "waiting") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-4xl mb-4">🧠</p>
          <p className="text-gray-300 mb-4">
            Study the grid of faces, then identify which ones changed.
          </p>
          <p className="text-sm text-gray-500">
            Each level gets harder: more faces, less time, more changes.
          </p>
        </div>

        <button
          onClick={startLevel}
          className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors text-lg"
        >
          Start Test
        </button>
      </div>
    );
  }

  // Memorize phase
  if (phase === "memorize") {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Level {level + 1}</p>
          <p className="text-2xl font-bold text-white">Memorize These Faces</p>
          <p className="text-4xl font-black text-purple-400">{countdown}s</p>
        </div>

        <div className={`grid gap-3 mx-auto max-w-md`} style={{ gridTemplateColumns: `repeat(${config.gridSize}, minmax(0, 1fr))` }}>
          {currentGrid.map((emoji, idx) => (
            <div
              key={idx}
              className="text-4xl md:text-5xl p-4 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-center"
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Recall phase
  if (phase === "recall") {
    const changesNeeded = changedIndices.size;
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Level {level + 1}</p>
          <p className="text-xl font-bold text-white">Which Faces Changed?</p>
          <p className="text-sm text-gray-400">
            Tap {changesNeeded} face{changesNeeded > 1 ? "s" : ""} that changed
          </p>
          <p className="text-sm text-purple-400 font-bold">
            Selected: {selectedIndices.size}/{changesNeeded}
          </p>
        </div>

        <div className={`grid gap-3 mx-auto max-w-md`} style={{ gridTemplateColumns: `repeat(${config.gridSize}, minmax(0, 1fr))` }}>
          {currentGrid.map((emoji, idx) => {
            const isSelected = selectedIndices.has(idx);
            return (
              <button
                key={idx}
                onClick={() => handleCellClick(idx)}
                className={`text-4xl md:text-5xl p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-950 scale-95"
                    : "border-gray-800 bg-gray-900 hover:border-gray-700"
                }`}
              >
                {emoji}
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={selectedIndices.size !== changesNeeded}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return null;
}
