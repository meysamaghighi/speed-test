"use client";

import { useState, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

const colors = [
  { name: "Red", hex: "#ef4444" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Green", hex: "#22c55e" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Orange", hex: "#f97316" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Cyan", hex: "#06b6d4" },
];

export default function ColorTest() {
  const pb = usePersonalBest("pb-stroop", "higher");
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [displayName, setDisplayName] = useState("");
  const [displayColor, setDisplayColor] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [lastTime, setLastTime] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const totalRounds = 20;

  const generateRound = useCallback(() => {
    // Pick a random color name to display
    const nameIdx = Math.floor(Math.random() * colors.length);
    // Pick a DIFFERENT color to display it in (the ink color)
    let inkIdx = nameIdx;
    while (inkIdx === nameIdx) {
      inkIdx = Math.floor(Math.random() * colors.length);
    }

    const name = colors[nameIdx].name;
    const inkColor = colors[inkIdx].hex;
    const correct = colors[inkIdx].name; // Answer is the INK color, not the word

    // Generate 4 options including the correct one
    const optionSet = new Set<string>([correct]);
    // Also add the word name as a distractor
    optionSet.add(name);
    while (optionSet.size < 4) {
      optionSet.add(colors[Math.floor(Math.random() * colors.length)].name);
    }

    // Shuffle options
    const shuffled = Array.from(optionSet).sort(() => Math.random() - 0.5);

    setDisplayName(name);
    setDisplayColor(inkColor);
    setCorrectAnswer(correct);
    setOptions(shuffled);
    setLastTime(performance.now());
    setFeedback(null);
  }, []);

  const startGame = () => {
    setScore(0);
    setRound(0);
    setTimes([]);
    setPhase("playing");
    generateRound();
  };

  const handleAnswer = (answer: string) => {
    if (feedback !== null) return;

    const elapsed = performance.now() - lastTime;
    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setTimes([...times, elapsed]);
    }

    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      const nextRound = round + 1;
      setRound(nextRound);
      if (nextRound >= totalRounds) {
        setPhase("done");
      } else {
        generateRound();
      }
    }, 500);
  };

  const average =
    times.length > 0
      ? Math.round(times.reduce((s, t) => s + t, 0) / times.length)
      : 0;

  const getRating = (s: number, avg: number) => {
    if (s >= 19 && avg < 800) return { label: "Stroop Master", color: "text-emerald-400" };
    if (s >= 17) return { label: "Excellent", color: "text-green-400" };
    if (s >= 14) return { label: "Good", color: "text-blue-400" };
    if (s >= 10) return { label: "Average", color: "text-yellow-400" };
    return { label: "Tricky, right?", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-fuchsia-600 text-white font-bold text-xl rounded-2xl hover:bg-fuchsia-700 transition-colors"
        >
          Start Stroop Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          A color name appears in a different ink color. Select the <strong>ink color</strong>,
          not the word. This is called the Stroop effect — your brain wants to
          read the word instead.
        </p>
      </div>
    );
  }

  if (phase === "done") {
    pb.checkAndSet(score);
    const rating = getRating(score, average);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Stroop Color Test</p>
          <p className="text-6xl font-black text-fuchsia-400">
            {score}/{totalRounds}
          </p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}/{totalRounds}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Accuracy</p>
            <p className="text-2xl font-bold text-white">{Math.round((score / totalRounds) * 100)}%</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Avg Response</p>
            <p className="text-2xl font-bold text-white">{average}ms</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Perfect: 20/20</span>
            <span>Good: 17+</span>
            <span>Average: 14</span>
            <span>Tricky: &lt;10</span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={startGame} className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors">Try Again</button>
          <button
            onClick={() => {
              const t = `Stroop Color Test: ${score}/${totalRounds} correct in ${average}ms avg! The Stroop effect is tricky!`;
              if (navigator.share) navigator.share({ text: t }).catch(() => {});
              else navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
            }}
            className="px-6 py-3 bg-fuchsia-600 text-white font-bold rounded-xl hover:bg-fuchsia-700 transition-colors"
          >Share Score</button>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Round {round + 1} / {totalRounds}</span>
        <span>Score: <span className="text-white font-bold">{score}</span></span>
      </div>

      <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 text-center">
        <p
          className="text-5xl md:text-6xl font-black"
          style={{ color: displayColor }}
        >
          {displayName}
        </p>
        <p className="text-gray-500 text-sm mt-3">What color is the INK?</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          let bg = "bg-gray-800 hover:bg-gray-700";
          if (feedback !== null) {
            if (opt === correctAnswer) bg = "bg-emerald-700";
            else if (opt !== correctAnswer && feedback === "wrong") bg = "bg-gray-800 opacity-50";
          }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`py-4 text-white font-bold text-lg rounded-xl transition-colors ${bg}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
