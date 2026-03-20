"use client";

import { useState, useEffect, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

export default function NumberMemory() {
  const [phase, setPhase] = useState<"ready" | "show" | "input" | "correct" | "wrong">("ready");
  const [level, setLevel] = useState(1);
  const pb = usePersonalBest("pb-number-memory", "higher", phase === "wrong" ? level - 1 : null);
  const [number, setNumber] = useState("");
  const [guess, setGuess] = useState("");
  const [highScore, setHighScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateNumber = (digits: number) => {
    let n = "";
    for (let i = 0; i < digits; i++) {
      n += Math.floor(Math.random() * 10).toString();
    }
    return n;
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const startLevel = (lvl: number) => {
    const n = generateNumber(lvl + 2); // level 1 = 3 digits, level 2 = 4, etc.
    setNumber(n);
    setGuess("");
    setPhase("show");
  };

  useEffect(() => {
    if (phase === "show") {
      const displayTime = 1000 + (number.length * 300); // more time for more digits
      const timer = setTimeout(() => {
        setPhase("input");
        setTimeout(() => inputRef.current?.focus(), 50);
      }, displayTime);
      return () => clearTimeout(timer);
    }
  }, [phase, number]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess === number) {
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
    if (lvl >= 12) return { label: "Photographic Memory", color: "text-emerald-400" };
    if (lvl >= 9) return { label: "Excellent", color: "text-green-400" };
    if (lvl >= 6) return { label: "Above Average", color: "text-blue-400" };
    if (lvl >= 4) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-2xl hover:bg-purple-700 transition-colors"
        >
          Start Memory Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          A number will flash on screen. Memorize it, then type it back.
        </p>
        {highScore > 0 && (
          <p className="text-purple-400 font-bold mt-2">
            Best: Level {highScore} ({highScore + 2} digits)
          </p>
        )}
      </div>
    );
  }

  if (phase === "show") {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-400 text-sm">Level {level} — Memorize this number</p>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p
            className="font-mono font-black text-purple-400 tracking-widest"
            style={{ fontSize: `${Math.max(24, 60 - digits * 3)}px` }}
          >
            {number}
          </p>
        </div>
        <p className="text-gray-500 text-sm">{digits} digits</p>
        <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full animate-shrink"
            style={{
              animation: `shrink ${1000 + digits * 300}ms linear forwards`,
            }}
          />
        </div>
        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    );
  }

  if (phase === "input") {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-400 text-sm">Level {level} — What was the number?</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4 text-white font-mono text-3xl text-center tracking-widest focus:outline-none focus:border-purple-500"
            placeholder="Type the number..."
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (phase === "correct") {
    return (
      <div className="text-center space-y-4">
        <div className="bg-emerald-900/30 rounded-2xl p-8 border border-emerald-800">
          <p className="text-emerald-400 text-2xl font-bold mb-2">Correct!</p>
          <p className="text-4xl font-mono font-black text-white tracking-widest">
            {number}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Level {level} — {digits} digits
          </p>
        </div>
        <button
          onClick={nextLevel}
          className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
        >
          Next Level ({digits + 1} digits)
        </button>
      </div>
    );
  }

  // Wrong
  const finalScore = level - 1;
  const rating = getRating(finalScore);
  return (
    <div className="text-center space-y-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <p className="text-gray-400 text-sm mb-2">Your Number Memory</p>
        <p className="text-6xl font-black text-purple-400">
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
        <p className="text-sm text-gray-500 mb-2">The number was:</p>
        <p className="font-mono text-xl text-emerald-400 tracking-widest">{number}</p>
        <p className="text-sm text-gray-500 mt-2">You typed:</p>
        <p className="font-mono text-xl text-red-400 tracking-widest">{guess}</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
        <p className="font-bold text-white mb-2">How You Compare</p>
        <div className="flex justify-between">
          <span>Genius: 12+</span>
          <span>Great: 9+</span>
          <span>Average: 7</span>
          <span>Low: &lt;4</span>
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
            const t = `My number memory: Level ${finalScore} (${finalScore + 2} digits)! How far can you get?`;
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
