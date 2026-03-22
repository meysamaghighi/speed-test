"use client";

import { useState, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "waiting" | "playing" | "result";

const COLORS = [
  { name: "RED", hex: "#ef4444", display: "Red" },
  { name: "BLUE", hex: "#3b82f6", display: "Blue" },
  { name: "GREEN", hex: "#10b981", display: "Green" },
  { name: "YELLOW", hex: "#eab308", display: "Yellow" },
  { name: "PURPLE", hex: "#a855f7", display: "Purple" },
  { name: "ORANGE", hex: "#f97316", display: "Orange" },
];

interface Round {
  wordColor: typeof COLORS[number];
  displayColor: typeof COLORS[number];
  startTime: number;
  responseTime: number | null;
  correct: boolean | null;
}

export default function ColorMatchTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const totalRounds = 20;

  const correctCount = rounds.filter((r) => r.correct).length;
  const avgSpeed = rounds.filter((r) => r.correct && r.responseTime).length > 0
    ? Math.round(
        rounds.filter((r) => r.correct && r.responseTime).reduce((sum, r) => sum + (r.responseTime || 0), 0) /
        rounds.filter((r) => r.correct && r.responseTime).length
      )
    : 0;

  // Score = correct answers * 100 + speed bonus (faster = higher)
  const score = correctCount * 100 + Math.max(0, 2000 - avgSpeed);
  const isFinished = rounds.length === totalRounds && phase === "result";
  const pb = usePersonalBest("pb-color-match", "higher", isFinished ? score : null);

  const startRound = useCallback(() => {
    const wordColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const displayColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setCurrentRound({
      wordColor,
      displayColor,
      startTime: performance.now(),
      responseTime: null,
      correct: null,
    });
  }, []);

  const startTest = () => {
    setPhase("playing");
    setRounds([]);
    startRound();
  };

  const handleAnswer = (selectedColor: typeof COLORS[number]) => {
    if (!currentRound) return;

    const responseTime = Math.round(performance.now() - currentRound.startTime);
    const correct = selectedColor.name === currentRound.displayColor.name;

    const completedRound = {
      ...currentRound,
      responseTime,
      correct,
    };

    const newRounds = [...rounds, completedRound];
    setRounds(newRounds);

    if (newRounds.length >= totalRounds) {
      setPhase("result");
      setCurrentRound(null);
    } else {
      startRound();
    }
  };

  const restart = () => {
    setPhase("waiting");
    setRounds([]);
    setCurrentRound(null);
  };

  const getRating = (sc: number) => {
    if (sc >= 2800) return { label: "Elite", color: "text-emerald-400" };
    if (sc >= 2400) return { label: "Excellent", color: "text-green-400" };
    if (sc >= 2000) return { label: "Good", color: "text-yellow-400" };
    if (sc >= 1600) return { label: "Average", color: "text-orange-400" };
    return { label: "Needs Practice", color: "text-red-400" };
  };

  // Result screen
  if (phase === "result") {
    const rating = getRating(score);
    const accuracy = Math.round((correctCount / totalRounds) * 100);

    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Your Score</p>
          <p className="text-6xl font-black text-blue-400">{score}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-gray-500 text-sm">Accuracy</p>
            <p className="text-3xl font-bold text-white">{accuracy}%</p>
            <p className="text-xs text-gray-600">{correctCount}/{totalRounds} correct</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-gray-500 text-sm">Avg Speed</p>
            <p className="text-3xl font-bold text-white">{avgSpeed}ms</p>
            <p className="text-xs text-gray-600">correct answers</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Scoring</p>
          <p>Correct answers: {correctCount} × 100 = {correctCount * 100}</p>
          <p>Speed bonus: {Math.max(0, 2000 - avgSpeed)}</p>
          <p className="text-xs mt-2 text-gray-500">Faster correct answers = higher score</p>
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
              const text = `I scored ${score} on Color Match Test (${rating.label}, ${accuracy}% accuracy)! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
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
    const progress = rounds.length + 1;

    return (
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-gray-500 px-1">
          <span>Question {progress} of {totalRounds}</span>
          <span>{correctCount} correct</span>
        </div>

        <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 text-center">
          <p className="text-sm text-gray-400 mb-4">Tap the DISPLAYED COLOR (not the word)</p>
          <p
            className="text-6xl font-black mb-6"
            style={{ color: currentRound.displayColor.hex }}
          >
            {currentRound.wordColor.name}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => handleAnswer(color)}
              className="p-4 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: color.hex }}
            >
              {color.display}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Waiting screen
  return (
    <div className="text-center space-y-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <p className="text-4xl mb-4">🎨</p>
        <p className="text-gray-300 mb-4">
          You'll see a color name (like "RED") displayed in a different color (like blue text).
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Tap the button matching the DISPLAYED COLOR, not the word.
        </p>
        <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Example:</p>
          <p className="text-blue-400 text-2xl font-bold mb-2">RED</p>
          <p className="text-xs">The word says "RED" but it's shown in blue.</p>
          <p className="text-xs text-green-400 mt-1">✓ Correct answer: Blue</p>
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
