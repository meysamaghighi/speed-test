"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";
import LeaderboardPanel from "./LeaderboardPanel";
import ReportUpsell from "./ReportUpsell";

type Phase = "ready" | "show" | "answer" | "result" | "finished";

interface Equation {
  num1: number;
  num2: number;
  operator: "+" | "-" | "×";
  answer: number;
}

export default function MathMemoryTest() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [equation, setEquation] = useState<Equation | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);

  const isFinished = phase === "finished";
  const pb = usePersonalBest("pb-math-memory", "higher", isFinished ? streak : null);

  const generateEquation = useCallback((lvl: number): Equation => {
    const operators: Array<"+" | "-" | "×"> = ["+", "-"];
    if (lvl >= 3) operators.push("×");

    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1: number, num2: number, answer: number;

    if (operator === "+") {
      const max = Math.min(10 + lvl * 5, 50);
      num1 = Math.floor(Math.random() * max) + 1;
      num2 = Math.floor(Math.random() * max) + 1;
      answer = num1 + num2;
    } else if (operator === "-") {
      const max = Math.min(10 + lvl * 5, 50);
      num1 = Math.floor(Math.random() * max) + 10;
      num2 = Math.floor(Math.random() * Math.min(num1, max)) + 1;
      answer = num1 - num2;
    } else {
      // multiplication
      const max = Math.min(3 + Math.floor(lvl / 2), 12);
      num1 = Math.floor(Math.random() * max) + 2;
      num2 = Math.floor(Math.random() * max) + 2;
      answer = num1 * num2;
    }

    return { num1, num2, operator, answer };
  }, []);

  const startRound = useCallback(() => {
    const eq = generateEquation(level);
    setEquation(eq);
    setUserAnswer("");
    setPhase("show");

    const displayTime = Math.max(1500 - level * 50, 800);
    setTimeout(() => {
      setPhase("answer");
    }, displayTime);
  }, [level, generateEquation]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!equation || userAnswer === "") return;

    const correct = parseInt(userAnswer) === equation.answer;
    setIsCorrect(correct);

    if (correct) {
      setStreak(streak + 1);
      setLevel(Math.floor(streak / 3) + 1);
      setPhase("result");
      setTimeout(() => {
        startRound();
      }, 800);
    } else {
      setPhase("finished");
    }
  }, [equation, userAnswer, streak, startRound]);

  const restart = () => {
    setPhase("ready");
    setEquation(null);
    setUserAnswer("");
    setStreak(0);
    setLevel(1);
    setIsCorrect(false);
  };

  // Finished screen
  if (phase === "finished") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Consecutive Correct Answers</p>
          <p className="text-6xl font-black text-blue-400">{streak}</p>
          <p className="text-ink-2 text-sm mt-2">Level {level} difficulty</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best} correct</p>}
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">Math Memory Rating</p>
          <div className="flex justify-between">
            <span>Beginner: 1-5</span>
            <span>Good: 6-10</span>
            <span>Great: 11-15</span>
            <span>Expert: 16+</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={restart}
            className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const text = `I got ${streak} consecutive correct on Math Memory Test! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-blue-600 text-ink font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Share Score
          </button>
        </div>

        <LeaderboardPanel game="math-memory" score={isFinished ? streak : null} unit="streak" />

        <ReportUpsell source="math-memory" />
      </div>
    );
  }

  // Ready screen
  if (phase === "ready") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <h2 className="text-2xl font-bold text-ink mb-4">How to Play</h2>
          <div className="text-left text-ink-2 space-y-2">
            <p>• A math equation will flash briefly</p>
            <p>• Memorize it before it disappears</p>
            <p>• Type the answer</p>
            <p>• Equations get harder as you progress</p>
            <p>• One mistake ends the test</p>
          </div>
        </div>
        <button
          onClick={startRound}
          className="px-8 py-4 bg-blue-600 text-ink font-bold text-xl rounded-xl hover:bg-blue-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  // Show equation
  if (phase === "show" && equation) {
    return (
      <div className="bg-paper-2 rounded-2xl p-12 border border-line text-center">
        <p className="text-ink-2 text-sm mb-4">Memorize this equation</p>
        <p className="text-5xl font-black text-ink">
          {equation.num1} {equation.operator} {equation.num2} = ?
        </p>
        <p className="text-ink-3 text-sm mt-6">Level {level} • Streak: {streak}</p>
      </div>
    );
  }

  // Result screen
  if (phase === "result" && equation) {
    return (
      <div className="bg-paper-2 rounded-2xl p-12 border border-line text-center">
        <p className="text-green-400 font-bold text-2xl mb-4">Correct!</p>
        <p className="text-3xl text-ink">
          {equation.num1} {equation.operator} {equation.num2} = {equation.answer}
        </p>
        <p className="text-ink-2 text-sm mt-4">Streak: {streak}</p>
      </div>
    );
  }

  // Answer input
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-ink-2 px-1">
        <span>Level {level}</span>
        <span>Streak: {streak}</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-paper-2 rounded-2xl p-8 border border-line">
        <p className="text-center text-ink-2 mb-6">What was the answer?</p>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
          placeholder="Type answer"
          className="w-full px-4 py-3 bg-paper-2 text-ink text-center text-2xl rounded-xl border border-line focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={userAnswer === ""}
          className="w-full mt-4 px-6 py-3 bg-blue-600 text-ink font-bold rounded-xl hover:bg-blue-700 disabled:bg-paper-2 disabled:cursor-not-allowed transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
