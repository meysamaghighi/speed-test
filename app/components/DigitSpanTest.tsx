"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "waiting" | "mode-select" | "memorize" | "recall" | "result";
type Mode = "forward" | "backward";

export default function DigitSpanTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [mode, setMode] = useState<Mode>("forward");
  const [level, setLevel] = useState(3); // Start with 3 digits
  const [digits, setDigits] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [maxLevel, setMaxLevel] = useState(3);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isFinished = phase === "result" && isCorrect === false;
  const pb = usePersonalBest(
    mode === "forward" ? "pb-digit-span-forward" : "pb-digit-span-backward",
    "higher",
    isFinished ? maxLevel : null
  );

  const generateDigits = useCallback((count: number) => {
    const arr: number[] = [];
    for (let i = 0; i < count; i++) {
      arr.push(Math.floor(Math.random() * 10));
    }
    return arr;
  }, []);

  const startLevel = useCallback(() => {
    const newDigits = generateDigits(level);
    setDigits(newDigits);
    setCurrentIndex(0);
    setUserInput("");
    setIsCorrect(null);
    setPhase("memorize");

    // Show digits one at a time (500ms each)
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setCurrentIndex(idx);
      if (idx >= newDigits.length) {
        clearInterval(interval);
        timeoutRef.current = setTimeout(() => {
          setPhase("recall");
        }, 500);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [level, generateDigits]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = () => {
    if (phase !== "recall") return;

    const expected = mode === "forward" ? digits.join("") : digits.reverse().join("");
    const correct = userInput.trim() === expected;

    setIsCorrect(correct);
    setPhase("result");

    if (correct) {
      setMaxLevel(level);
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      setLevel(level + 1);
      startLevel();
    }
  };

  const restart = () => {
    setPhase("waiting");
    setLevel(3);
    setDigits([]);
    setCurrentIndex(0);
    setUserInput("");
    setIsCorrect(null);
    setMaxLevel(3);
  };

  const getRating = (lvl: number, m: Mode) => {
    if (m === "forward") {
      if (lvl >= 12) return { label: "Elite Memory", color: "text-emerald-400" };
      if (lvl >= 9) return { label: "Excellent", color: "text-green-400" };
      if (lvl >= 7) return { label: "Good", color: "text-yellow-400" };
      if (lvl >= 5) return { label: "Average", color: "text-orange-400" };
      return { label: "Needs Practice", color: "text-red-400" };
    } else {
      if (lvl >= 10) return { label: "Elite Memory", color: "text-emerald-400" };
      if (lvl >= 7) return { label: "Excellent", color: "text-green-400" };
      if (lvl >= 5) return { label: "Good", color: "text-yellow-400" };
      if (lvl >= 4) return { label: "Average", color: "text-orange-400" };
      return { label: "Needs Practice", color: "text-red-400" };
    }
  };

  // Final result screen (failed a level)
  if (phase === "result" && isCorrect === false) {
    const rating = getRating(maxLevel, mode);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">
            {mode === "forward" ? "Forward" : "Backward"} Digit Span
          </p>
          <p className="text-6xl font-black text-blue-400">{maxLevel}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && (
            <p className="text-yellow-400 font-bold mt-2 animate-pulse">
              New Personal Best!
            </p>
          )}
          {pb.best !== null && !pb.isNewBest && (
            <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best} digits</p>
          )}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm">
          <p className="font-bold text-white mb-2">Expected</p>
          <p className="text-2xl font-mono text-green-400 mb-3">
            {mode === "forward" ? digits.join("") : [...digits].reverse().join("")}
          </p>
          <p className="font-bold text-white mb-2">Your Answer</p>
          <p className="text-2xl font-mono text-red-400">{userInput || "(empty)"}</p>
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
              const text = `I remembered ${maxLevel} digits (${mode}) on Digit Span Test (${rating.label})! Can you beat me?`;
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

  // Success screen (passed a level)
  if (phase === "result" && isCorrect === true) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-5xl mb-3">✅</p>
          <p className="text-2xl font-bold text-green-400">Correct!</p>
          <p className="text-gray-400 text-sm mt-2">{level} digits complete</p>
        </div>

        <button
          onClick={handleContinue}
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg"
        >
          Next Level ({level + 1} digits) →
        </button>
      </div>
    );
  }

  // Waiting screen
  if (phase === "waiting") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-4xl mb-4">🧠</p>
          <p className="text-gray-300 mb-4">
            Digits will appear one at a time. Memorize them, then type them back.
          </p>
          <p className="text-sm text-gray-500">
            Choose your mode: Forward (as shown) or Backward (reversed order).
          </p>
        </div>

        <button
          onClick={() => setPhase("mode-select")}
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg"
        >
          Start Test
        </button>
      </div>
    );
  }

  // Mode select screen
  if (phase === "mode-select") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-2xl font-bold text-white mb-4">Choose Mode</p>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setMode("forward");
                startLevel();
              }}
              className="p-6 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all"
            >
              <p className="text-xl font-bold mb-2">Forward</p>
              <p className="text-sm opacity-90">Type digits in the same order</p>
              <p className="text-xs opacity-75 mt-2">Example: 3 7 2 → 372</p>
            </button>
            <button
              onClick={() => {
                setMode("backward");
                startLevel();
              }}
              className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              <p className="text-xl font-bold mb-2">Backward</p>
              <p className="text-sm opacity-90">Type digits in REVERSE order</p>
              <p className="text-xs opacity-75 mt-2">Example: 3 7 2 → 273</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Memorize phase (showing digits one at a time)
  if (phase === "memorize") {
    const currentDigit = currentIndex > 0 && currentIndex <= digits.length ? digits[currentIndex - 1] : null;

    return (
      <div className="text-center space-y-6">
        <div className="text-sm text-gray-500 mb-2">
          {mode === "forward" ? "Forward" : "Backward"} · {level} digits
        </div>
        <div className="bg-gray-900 rounded-2xl p-16 border border-gray-800">
          {currentDigit !== null ? (
            <p className="text-8xl font-black text-blue-400">{currentDigit}</p>
          ) : (
            <p className="text-4xl text-gray-600">Ready...</p>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Memorizing {currentIndex}/{digits.length}
        </p>
      </div>
    );
  }

  // Recall phase (user types the answer)
  if (phase === "recall") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-sm text-gray-500 mb-2">
            {mode === "forward" ? "Type in same order" : "Type in REVERSE order"}
          </p>
          <p className="text-xl font-bold text-white mb-4">
            {level} digits · {mode === "forward" ? "Forward" : "Backward"}
          </p>
          <input
            type="tel"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Type digits..."
            autoFocus
            className="w-full max-w-xs px-6 py-4 bg-gray-800 text-white text-2xl font-mono text-center rounded-xl border-2 border-gray-700 focus:border-blue-500 outline-none"
            maxLength={level}
          />
          <p className="text-xs text-gray-500 mt-2">
            {userInput.length}/{level} digits
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={userInput.length !== level}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    );
  }

  return null;
}
