"use client";

import { useState, useCallback, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "instructions" | "showing" | "delay" | "recall" | "result";

const COLORS = [
  { name: "Red", bg: "bg-red-500", hex: "#ef4444" },
  { name: "Blue", bg: "bg-blue-500", hex: "#3b82f6" },
  { name: "Green", bg: "bg-green-500", hex: "#22c55e" },
  { name: "Yellow", bg: "bg-yellow-500", hex: "#eab308" },
  { name: "Purple", bg: "bg-purple-500", hex: "#a855f7" },
  { name: "Orange", bg: "bg-orange-500", hex: "#f97316" },
  { name: "Pink", bg: "bg-pink-500", hex: "#ec4899" },
  { name: "Cyan", bg: "bg-cyan-500", hex: "#06b6d4" },
];

export default function ColorMemoryTest() {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [level, setLevel] = useState(3);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);

  const isFinished = phase === "result";
  const score = level - 3; // starts at 3, so score is level - 3
  const pb = usePersonalBest("pb-color-memory", "higher", isFinished ? score : null);

  const generateSequence = useCallback((length: number) => {
    const seq: number[] = [];
    for (let i = 0; i < length; i++) {
      seq.push(Math.floor(Math.random() * COLORS.length));
    }
    return seq;
  }, []);

  const startRound = useCallback(() => {
    const seq = generateSequence(level);
    setSequence(seq);
    setUserSequence([]);
    setCurrentIndex(0);
    setPhase("showing");
  }, [level, generateSequence]);

  useEffect(() => {
    if (phase === "showing") {
      if (currentIndex < sequence.length) {
        const timer = setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 1200); // Increased from 800ms to make colors display longer
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase("delay");
          const delayTimer = setTimeout(() => {
            setPhase("recall");
            setCurrentIndex(0);
          }, 500);
          // Store timer ref for cleanup
          return () => clearTimeout(delayTimer);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, currentIndex, sequence.length]);

  const handleColorClick = (colorIndex: number) => {
    if (phase !== "recall") return;

    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);

    // Guard against out-of-bounds access
    if (newUserSequence.length > sequence.length) return;

    const expectedIndex = sequence[newUserSequence.length - 1];
    if (colorIndex !== expectedIndex) {
      // Wrong color
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setPhase("result");
      } else {
        // Retry same level
        setTimeout(() => {
          if (phase === "recall") startRound();
        }, 1000);
      }
    } else if (newUserSequence.length === sequence.length) {
      // Completed level
      setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 500);
      setTimeout(() => {
        if (phase === "recall") startRound();
      }, 1200);
    }
  };

  const restart = () => {
    setPhase("instructions");
    setLevel(3);
    setLives(3);
    setSequence([]);
    setUserSequence([]);
    setCurrentIndex(0);
  };

  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-gray-400 space-y-3 text-left max-w-md mx-auto">
            <p>1. Watch colored circles appear one at a time</p>
            <p>2. After the sequence ends, click the colors in the same order</p>
            <p>3. Sequences get longer each level (starts at 3 colors)</p>
            <p>4. You have 3 lives -- wrong clicks cost a life</p>
          </div>
        </div>

        <button
          onClick={startRound}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xl font-bold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Longest Sequence Completed</p>
          <p className="text-6xl font-black text-purple-400">{level - 1}</p>
          <p className="text-lg text-gray-400 mt-2">colors</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-3 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best} colors</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="space-y-1">
            <p>Average: 5-6 colors</p>
            <p>Good: 7-8 colors</p>
            <p>Excellent: 9+ colors</p>
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
              const text = `I completed a ${level - 1}-color memory sequence! Can you beat me?`;
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

  // Safe access to current color - prevent out of bounds crash
  const showingColor = phase === "showing" && currentIndex < sequence.length && sequence[currentIndex] !== undefined ? sequence[currentIndex] : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500 px-1">
        <span>Level {level}</span>
        <span>Lives: {"❤️".repeat(lives)}</span>
      </div>

      {phase === "showing" && (
        <div className="text-center space-y-4">
          <p className="text-gray-400">Watch the sequence...</p>
          <div className="flex justify-center">
            <div
              className={`w-32 h-32 rounded-full ${showingColor !== null ? COLORS[showingColor].bg : "bg-gray-800"} transition-all duration-200`}
            />
          </div>
          <p className="text-gray-500 text-sm">{currentIndex} / {sequence.length}</p>
        </div>
      )}

      {phase === "delay" && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">Ready...</p>
        </div>
      )}

      {phase === "recall" && (
        <div className="space-y-4">
          <p className="text-center text-gray-400">Click the colors in order!</p>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {COLORS.map((color, idx) => (
              <button
                key={idx}
                onClick={() => handleColorClick(idx)}
                className={`w-20 h-20 rounded-full ${color.bg} hover:scale-110 transition-transform`}
                aria-label={color.name}
              />
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm">{userSequence.length} / {sequence.length}</p>
        </div>
      )}
    </div>
  );
}
