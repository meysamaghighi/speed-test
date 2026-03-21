"use client";

import { useState, useEffect, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

export default function ReverseMemory() {
  const [phase, setPhase] = useState<"ready" | "show" | "input" | "correct" | "wrong">("ready");
  const [level, setLevel] = useState(1);
  const pb = usePersonalBest("pb-reverse-memory", "higher", phase === "wrong" ? level - 1 : null);
  const [sequence, setSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [highScore, setHighScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateSequence = (length: number) => {
    const seq: string[] = [];
    for (let i = 0; i < length; i++) {
      seq.push(Math.floor(Math.random() * 10).toString());
    }
    return seq;
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const startLevel = (lvl: number) => {
    const digitCount = lvl + 2; // level 1 = 3 digits, level 2 = 4, etc.
    const seq = generateSequence(digitCount);
    setSequence(seq);
    setCurrentIndex(0);
    setGuess("");
    setPhase("show");
  };

  // Show digits one at a time
  useEffect(() => {
    if (phase === "show" && currentIndex < sequence.length) {
      const timer = setTimeout(() => {
        if (currentIndex < sequence.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // All digits shown, move to input
          setPhase("input");
          setTimeout(() => inputRef.current?.focus(), 50);
        }
      }, 1000); // 1 second per digit
      return () => clearTimeout(timer);
    }
  }, [phase, currentIndex, sequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reversed = sequence.slice().reverse().join("");
    if (guess === reversed) {
      setPhase("correct");
    } else {
      const score = level - 1;
      if (score > highScore) setHighScore(score);
      setPhase("wrong");
    }
  };

  const nextLevel = () => {
    const next = level + 1;
    setLevel(next);
    startLevel(next);
  };

  const digits = level + 2;

  const getRating = (lvl: number) => {
    if (lvl >= 10) return { label: "Genius Working Memory", color: "text-emerald-400" };
    if (lvl >= 7) return { label: "Excellent", color: "text-green-400" };
    if (lvl >= 5) return { label: "Above Average", color: "text-blue-400" };
    if (lvl >= 3) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-cyan-600 text-white font-bold text-xl rounded-2xl hover:bg-cyan-700 transition-colors"
        >
          Start Reverse Memory Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Digits will flash one at a time. Type them back in REVERSE order.
        </p>
        {highScore > 0 && (
          <p className="text-cyan-400 font-bold mt-2">
            Best: Level {highScore} ({highScore + 2} digits)
          </p>
        )}
      </div>
    );
  }

  if (phase === "show") {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-400 text-sm">Level {level} — Memorize the sequence</p>
        <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 min-h-[200px] flex items-center justify-center">
          <p
            className="font-mono font-black text-cyan-400 tracking-widest animate-pulse"
            style={{ fontSize: "72px" }}
          >
            {sequence[currentIndex]}
          </p>
        </div>
        <p className="text-gray-500 text-sm">
          Digit {currentIndex + 1} of {digits}
        </p>
        <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
          <div
            className="bg-cyan-500 h-full rounded-full"
            style={{
              width: `${((currentIndex + 1) / digits) * 100}%`,
              transition: "width 0.3s ease-out",
            }}
          />
        </div>
      </div>
    );
  }

  if (phase === "input") {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-400 text-sm">Level {level} — Type the digits in REVERSE order</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4 text-white font-mono text-3xl text-center tracking-widest focus:outline-none focus:border-cyan-500"
            placeholder="Type reversed..."
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (phase === "correct") {
    const reversed = sequence.slice().reverse().join("");
    return (
      <div className="text-center space-y-4">
        <div className="bg-emerald-900/30 rounded-2xl p-8 border border-emerald-800">
          <p className="text-emerald-400 text-2xl font-bold mb-2">Correct!</p>
          <p className="text-4xl font-mono font-black text-white tracking-widest">
            {reversed}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Level {level} — {digits} digits
          </p>
        </div>
        <button
          onClick={nextLevel}
          className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors"
        >
          Next Level ({digits + 1} digits)
        </button>
      </div>
    );
  }

  // Wrong
  const finalScore = level - 1;
  const rating = getRating(finalScore);
  const reversed = sequence.slice().reverse().join("");
  return (
    <div className="text-center space-y-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <p className="text-gray-400 text-sm mb-2">Your Reverse Memory</p>
        <p className="text-6xl font-black text-cyan-400">
          Level {finalScore}
        </p>
        <p className="text-gray-400 mt-1">{finalScore + 2} digits</p>
        <p className={`text-lg font-bold mt-2 ${rating.color}`}>
          {rating.label}
        </p>
        {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
        {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: Level {pb.best}</p>}
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <p className="text-sm text-gray-500 mb-2">The sequence was:</p>
        <p className="font-mono text-xl text-white tracking-widest">{sequence.join(" ")}</p>
        <p className="text-sm text-gray-500 mt-3">Reversed:</p>
        <p className="font-mono text-xl text-emerald-400 tracking-widest">{reversed}</p>
        <p className="text-sm text-gray-500 mt-3">You typed:</p>
        <p className="font-mono text-xl text-red-400 tracking-widest">{guess}</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
        <p className="font-bold text-white mb-2">How You Compare</p>
        <div className="flex justify-between">
          <span>Genius: 10+</span>
          <span>Great: 7+</span>
          <span>Average: 5</span>
          <span>Low: &lt;3</span>
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
            const t = `My reverse memory: Level ${finalScore} (${finalScore + 2} digits backward)! Test your working memory at benchmybrain.com`;
            if (navigator.share) {
              navigator.share({ text: t }).catch(() => {});
            } else {
              navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
            }
          }}
          className="px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors"
        >
          Share Score
        </button>
      </div>
    </div>
  );
}
