"use client";

import { useState, useRef, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

export default function NBack() {
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [level, setLevel] = useState(2); // Start at 2-back
  const [sequence, setSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const trialsPerLevel = 20;
  const timeoutRef = useRef<number | null>(null);

  const pb = usePersonalBest("pb-n-back", "higher", phase === "done" ? level : null);

  const letters = "ABCDEFGHKLMNPQRSTUVWXYZ".split("");

  const generateSequence = (n: number) => {
    const seq: string[] = [];
    // First N items are random
    for (let i = 0; i < n; i++) {
      seq.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    // Remaining items: 40% matches, 60% non-matches
    for (let i = n; i < trialsPerLevel; i++) {
      if (Math.random() < 0.4) {
        // Match: same as N positions back
        seq.push(seq[i - n]);
      } else {
        // Non-match: different letter
        let letter;
        do {
          letter = letters[Math.floor(Math.random() * letters.length)];
        } while (letter === seq[i - n]);
        seq.push(letter);
      }
    }
    return seq;
  };

  const startGame = () => {
    setLevel(2);
    setScore(0);
    setLives(3);
    setPhase("playing");
    startLevel(2);
  };

  const startLevel = (n: number) => {
    setSequence(generateSequence(n));
    setCurrentIndex(0);
    nextTrial(generateSequence(n), 0, n);
  };

  const nextTrial = (seq: string[], idx: number, n: number) => {
    if (idx >= seq.length) {
      // Level complete
      if (level < 10) {
        const newLevel = level + 1;
        setLevel(newLevel);
        setTimeout(() => startLevel(newLevel), 1000);
      } else {
        setPhase("done");
      }
      return;
    }

    setCurrentIndex(idx);
    setFeedback(null);

    // Show letter for 500ms, then blank for 2000ms
    timeoutRef.current = window.setTimeout(() => {
      setCurrentIndex(idx + 1);
      // Auto-advance as "no match" if no click
      setTimeout(() => {
        nextTrial(seq, idx + 1, n);
      }, 2000);
    }, 500);
  };

  const handleMatch = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const isMatch = currentIndex >= level && sequence[currentIndex] === sequence[currentIndex - level];

    if (isMatch) {
      setScore(prev => prev + 1);
      setFeedback("correct");
    } else {
      setLives(prev => prev - 1);
      setFeedback("wrong");
      if (lives <= 1) {
        setPhase("done");
        return;
      }
    }

    setTimeout(() => {
      setFeedback(null);
      nextTrial(sequence, currentIndex + 1, level);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getRating = (lvl: number) => {
    if (lvl >= 5) return { label: "Excellent", color: "text-emerald-400" };
    if (lvl >= 4) return { label: "Very Good", color: "text-green-400" };
    if (lvl >= 3) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "done") {
    const rating = getRating(level);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Highest Level Reached</p>
          <p className="text-6xl font-black text-purple-400">{level}-back</p>
          <p className="text-gray-400 text-sm mt-2">Score: {score}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}-back</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Good: 4-back</span>
            <span>Average: 3-back</span>
            <span>Excellent: 5+ back</span>
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
              const t = `N-Back Test: Level ${level} (${rating.label})! Can you beat this working memory score?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
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

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-2xl hover:bg-purple-700 transition-colors"
        >
          Start N-Back
        </button>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
          See a sequence of letters. Click "Match" if the current letter is the SAME as N positions back. Starts at 2-back, levels up.
        </p>
      </div>
    );
  }

  const currentLetter = currentIndex < sequence.length && currentIndex === currentIndex ? sequence[currentIndex] : "";
  const showLetter = currentIndex < sequence.length && currentIndex % 1 === 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>{level}-back • Trial: {currentIndex + 1}/{sequence.length}</span>
        <span>Lives: {"❤️".repeat(lives)}</span>
      </div>

      <div className="relative w-full h-80 md:h-96 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center">
        {showLetter && currentLetter && (
          <div className={`text-8xl font-black text-white transition-all ${
            feedback === "correct" ? "text-green-400" : feedback === "wrong" ? "text-red-400" : ""
          }`}>
            {currentLetter}
          </div>
        )}
      </div>

      <button
        onClick={handleMatch}
        disabled={!showLetter || feedback !== null}
        className="w-full px-6 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Match
      </button>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400 text-center">
        Click "Match" if current letter = letter from {level} positions back
      </div>
    </div>
  );
}
