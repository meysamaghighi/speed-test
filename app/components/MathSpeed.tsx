"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

interface Problem {
  question: string;
  answer: number;
  difficulty: number;
}

function generateProblem(level: number): Problem {
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (level <= 3) {
    // Easy: single digit addition/subtraction
    const a = rand(2, 15);
    const b = rand(2, 10);
    if (Math.random() < 0.5) {
      return { question: `${a} + ${b}`, answer: a + b, difficulty: 1 };
    }
    return { question: `${Math.max(a, b)} - ${Math.min(a, b)}`, answer: Math.max(a, b) - Math.min(a, b), difficulty: 1 };
  }

  if (level <= 6) {
    // Medium: larger numbers, multiplication
    const op = Math.random();
    if (op < 0.33) {
      const a = rand(10, 50);
      const b = rand(10, 50);
      return { question: `${a} + ${b}`, answer: a + b, difficulty: 2 };
    }
    if (op < 0.66) {
      const a = rand(20, 80);
      const b = rand(5, 30);
      return { question: `${a} - ${b}`, answer: a - b, difficulty: 2 };
    }
    const a = rand(3, 12);
    const b = rand(3, 12);
    return { question: `${a} x ${b}`, answer: a * b, difficulty: 2 };
  }

  if (level <= 10) {
    // Hard: bigger multiplication, multi-step
    const op = Math.random();
    if (op < 0.4) {
      const a = rand(5, 15);
      const b = rand(10, 25);
      return { question: `${a} x ${b}`, answer: a * b, difficulty: 3 };
    }
    if (op < 0.7) {
      const a = rand(50, 200);
      const b = rand(30, 100);
      return { question: `${a} + ${b}`, answer: a + b, difficulty: 3 };
    }
    const a = rand(100, 500);
    const b = rand(50, 200);
    return { question: `${a} - ${b}`, answer: a - b, difficulty: 3 };
  }

  // Expert: large multiplication, division
  const op = Math.random();
  if (op < 0.5) {
    const a = rand(12, 30);
    const b = rand(12, 30);
    return { question: `${a} x ${b}`, answer: a * b, difficulty: 4 };
  }
  const b = rand(3, 12);
  const answer = rand(10, 50);
  const a = b * answer;
  return { question: `${a} / ${b}`, answer, difficulty: 4 };
}

export default function MathSpeed() {
  const [phase, setPhase] = useState<"ready" | "playing" | "result">("ready");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const pb = usePersonalBest("pb-math", "higher", phase === "result" ? score : null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const startGame = () => {
    setPhase("playing");
    setLevel(1);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTotalAnswered(0);
    setCorrect(0);
    setTimeLeft(60);
    setProblem(generateProblem(1));
    setAnswer("");
  };

  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setPhase("result");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      inputRef.current?.focus();
      return () => clearInterval(timerRef.current);
    }
  }, [phase]);

  const handleSubmit = useCallback(() => {
    if (!problem || !answer.trim()) return;
    const userAnswer = parseInt(answer.trim());
    const isCorrect = userAnswer === problem.answer;

    setTotalAnswered((t) => t + 1);
    setFlash(isCorrect ? "correct" : "wrong");
    setTimeout(() => setFlash(null), 300);

    if (isCorrect) {
      const points = problem.difficulty * 10 + Math.max(0, Math.floor(timeLeft / 10));
      setScore((s) => s + points);
      setCorrect((c) => c + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBestStreak((b) => Math.max(b, ns));
        // Level up every 3 correct in a row
        if (ns % 3 === 0) setLevel((l) => Math.min(l + 1, 15));
        return ns;
      });
    } else {
      setStreak(0);
      setLevel((l) => Math.max(1, l - 1));
    }

    setProblem(generateProblem(isCorrect ? level : Math.max(1, level - 1)));
    setAnswer("");
    inputRef.current?.focus();
  }, [answer, problem, level, timeLeft]);

  const getRating = () => {
    if (score >= 500) return { label: "Math Genius", color: "text-yellow-400" };
    if (score >= 350) return { label: "Lightning Fast", color: "text-green-400" };
    if (score >= 200) return { label: "Quick Thinker", color: "text-blue-400" };
    if (score >= 100) return { label: "Solid", color: "text-gray-300" };
    return { label: "Keep Practicing", color: "text-gray-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-lg text-gray-300 mb-4">Solve as many math problems as you can in <strong className="text-white">60 seconds</strong>.</p>
          <p className="text-sm text-gray-500 mb-6">Difficulty increases as you get more right. Wrong answers lower the level.</p>
          <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all">
            Start
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const rating = getRating();
    const accuracy = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Score</p>
          <p className="text-5xl font-black text-white">{score}</p>
          <p className={`text-xl font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-2xl font-bold text-white">{correct}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{accuracy}%</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{bestStreak}</p>
              <p className="text-xs text-gray-500">Best Streak</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={startGame} className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors">
            Play Again
          </button>
          <button
            onClick={() => {
              const text = `Math Speed: ${score} points (${correct} correct, ${accuracy}% accuracy) | benchmybrain.com/math`;
              if (navigator.share) navigator.share({ title: "Math Speed Test", text });
              else navigator.clipboard.writeText(text);
            }}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Score: <strong className="text-white">{score}</strong></span>
        <span className={`font-mono text-2xl font-black ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}>
          {timeLeft}s
        </span>
        <span className="text-gray-400">Streak: <strong className="text-amber-400">{streak}</strong></span>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${timeLeft <= 10 ? "bg-red-500" : "bg-gradient-to-r from-amber-500 to-orange-500"}`}
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>

      <div className={`bg-gray-900 rounded-2xl p-8 border transition-colors ${flash === "correct" ? "border-green-500" : flash === "wrong" ? "border-red-500" : "border-gray-800"}`}>
        <p className="text-xs text-gray-500 mb-2">Level {level}</p>
        <p className="text-5xl font-black text-white mb-6">{problem?.question}</p>
        <div className="flex gap-3 justify-center">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/[^0-9-]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="?"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-center text-2xl w-32 focus:outline-none focus:border-gray-500"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-30"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
