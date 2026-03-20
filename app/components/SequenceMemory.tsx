"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function SequenceMemory() {
  const [phase, setPhase] = useState<"ready" | "showing" | "input" | "correct" | "wrong">("ready");
  const [sequence, setSequence] = useState<number[]>([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const showingRef = useRef(false);
  const gridSize = 9; // 3x3

  const startGame = () => {
    setLevel(1);
    const first = [Math.floor(Math.random() * gridSize)];
    setSequence(first);
    showSequence(first);
  };

  const showSequence = useCallback((seq: number[]) => {
    setPhase("showing");
    showingRef.current = true;
    let i = 0;
    const interval = setInterval(() => {
      if (!showingRef.current) {
        clearInterval(interval);
        return;
      }
      if (i < seq.length) {
        setActiveCell(seq[i]);
        setTimeout(() => setActiveCell(null), 400);
        i++;
      } else {
        clearInterval(interval);
        setPhase("input");
        setInputIndex(0);
      }
    }, 600);
  }, []);

  useEffect(() => {
    return () => { showingRef.current = false; };
  }, []);

  const handleCellClick = (idx: number) => {
    if (phase !== "input") return;

    setActiveCell(idx);
    setTimeout(() => setActiveCell(null), 200);

    if (idx === sequence[inputIndex]) {
      const next = inputIndex + 1;
      if (next >= sequence.length) {
        setPhase("correct");
      } else {
        setInputIndex(next);
      }
    } else {
      const score = level - 1;
      if (score > highScore) setHighScore(score);
      setPhase("wrong");
    }
  };

  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    const newSeq = [...sequence, Math.floor(Math.random() * gridSize)];
    setSequence(newSeq);
    showSequence(newSeq);
  };

  const getRating = (lvl: number) => {
    if (lvl >= 15) return { label: "Superhuman", color: "text-emerald-400" };
    if (lvl >= 10) return { label: "Excellent", color: "text-green-400" };
    if (lvl >= 7) return { label: "Good", color: "text-blue-400" };
    if (lvl >= 4) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-2xl hover:bg-teal-700 transition-colors"
        >
          Start Sequence Memory
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Watch the sequence of tiles light up, then repeat it. Each level adds
          one more tile to the sequence.
        </p>
        {highScore > 0 && (
          <p className="text-teal-400 font-bold mt-2">Best: Level {highScore}</p>
        )}
      </div>
    );
  }

  if (phase === "correct") {
    return (
      <div className="text-center space-y-4">
        <div className="bg-emerald-900/30 rounded-2xl p-8 border border-emerald-800">
          <p className="text-emerald-400 text-2xl font-bold mb-2">Correct!</p>
          <p className="text-gray-400">Level {level} — {sequence.length} tiles</p>
        </div>
        <button
          onClick={nextLevel}
          className="px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors"
        >
          Next Level
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
          <p className="text-gray-400 text-sm mb-2">Sequence Memory</p>
          <p className="text-6xl font-black text-teal-400">Level {score}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Amazing: 15+</span>
            <span>Great: 10+</span>
            <span>Average: 7</span>
            <span>Low: &lt;4</span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={startGame} className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors">Try Again</button>
          <button
            onClick={() => {
              const t = `Sequence Memory: Level ${score}! Can you beat my pattern memory?`;
              if (navigator.share) navigator.share({ text: t }).catch(() => {});
              else navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
            }}
            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors"
          >Share Score</button>
        </div>
      </div>
    );
  }

  // Showing or Input phase
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Level {level}</span>
        <span>{phase === "showing" ? "Watch..." : "Your turn!"}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {Array.from({ length: gridSize }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            disabled={phase === "showing"}
            className={`aspect-square rounded-xl transition-all duration-200 ${
              activeCell === idx
                ? "bg-white scale-95"
                : "bg-gray-800 hover:bg-gray-700 cursor-pointer"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
