"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog near the river bank where the children play every summer afternoon.",
  "She sells seashells by the seashore while the waves crash gently against the rocky coastline and seagulls fly above.",
  "A journey of a thousand miles begins with a single step forward into the unknown world of possibilities and wonder.",
  "The old oak tree in the garden has been standing there for over a hundred years watching the seasons change slowly.",
  "Every morning the baker wakes up before dawn to prepare fresh bread rolls and pastries for the busy city streets.",
  "The mountain trail winds through dense forests and across clear streams before reaching the summit at sunset today.",
  "Music fills the air as the street performer plays guitar while passersby stop to listen and drop coins in the hat.",
  "The library on the corner has thousands of books covering every topic from ancient history to modern technology now.",
];

export default function TypingTest() {
  const [phase, setPhase] = useState<"ready" | "typing" | "done">("ready");
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const startTest = useCallback(() => {
    const p = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setText(p);
    setTyped("");
    setPhase("typing");
    setStartTime(0);
    setEndTime(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (startTime === 0) setStartTime(performance.now());
    setTyped(val);

    if (val.length >= text.length) {
      setEndTime(performance.now());
      setPhase("done");
    }
  };

  const elapsed = endTime > 0 ? (endTime - startTime) / 1000 : 0;
  const words = text.split(" ").length;
  const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;

  // Calculate accuracy
  const correctChars = typed
    .split("")
    .filter((c, i) => c === text[i]).length;
  const accuracy =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;

  const getRating = (w: number) => {
    if (w >= 80) return { label: "Blazing Fast", color: "text-emerald-400" };
    if (w >= 60) return { label: "Fast", color: "text-green-400" };
    if (w >= 40) return { label: "Average", color: "text-yellow-400" };
    if (w >= 25) return { label: "Below Average", color: "text-orange-400" };
    return { label: "Beginner", color: "text-red-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startTest}
          className="px-8 py-4 bg-blue-600 text-white font-bold text-xl rounded-2xl hover:bg-blue-700 transition-colors"
        >
          Start Typing Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Type the paragraph as fast and accurately as you can.
        </p>
      </div>
    );
  }

  if (phase === "done") {
    const rating = getRating(wpm);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Your Typing Speed</p>
          <p className="text-6xl font-black text-blue-400">{wpm} WPM</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Accuracy</p>
            <p className="text-2xl font-bold text-white">{accuracy}%</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-2xl font-bold text-white">{elapsed.toFixed(1)}s</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Characters</p>
            <p className="text-2xl font-bold text-white">{text.length}</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Top 1%: 80+ WPM</span>
            <span>Fast: 60+</span>
            <span>Average: 40</span>
            <span>Slow: &lt;25</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={startTest}
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const t = `My typing speed: ${wpm} WPM with ${accuracy}% accuracy! Can you type faster?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
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

  // Typing phase
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 font-mono text-lg leading-relaxed">
        {text.split("").map((char, i) => {
          let color = "text-gray-500";
          if (i < typed.length) {
            color = typed[i] === char ? "text-emerald-400" : "text-red-400 bg-red-400/20";
          } else if (i === typed.length) {
            color = "text-white bg-white/20";
          }
          return (
            <span key={i} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleInput}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-blue-500"
        placeholder="Start typing here..."
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />

      <div className="flex justify-between text-sm text-gray-500">
        <span>{typed.length} / {text.length} characters</span>
        <span>{accuracy}% accuracy</span>
      </div>
    </div>
  );
}
