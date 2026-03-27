"use client";

import { useState, useCallback, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "instructions" | "ready" | "showing" | "result";

export default function NumberComparisonTest() {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [round, setRound] = useState(0);
  const [leftNum, setLeftNum] = useState(0);
  const [rightNum, setRightNum] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [correct, setCorrect] = useState(0);
  const showTime = useRef(0);

  const totalRounds = 20;
  const averageTime = times.length > 0 ? Math.round(times.reduce((s, t) => s + t, 0) / times.length) : 0;
  const accuracy = times.length > 0 ? Math.round((correct / times.length) * 100) : 0;

  const isFinished = phase === "result";
  const pb = usePersonalBest("pb-number-comparison", "lower", isFinished ? averageTime : null);

  const generateNumbers = useCallback((roundNum: number) => {
    // Start easy, get progressively harder
    let range: number;
    let diff: number;

    if (roundNum < 5) {
      // Easy: 10-99, difference > 20
      range = 90;
      diff = 20 + Math.random() * 60;
    } else if (roundNum < 10) {
      // Medium: 100-999, difference > 50
      range = 900;
      diff = 50 + Math.random() * 400;
    } else if (roundNum < 15) {
      // Hard: 100-999, difference 10-50
      range = 900;
      diff = 10 + Math.random() * 40;
    } else {
      // Very hard: 1000-9999, difference 1-100
      range = 9000;
      diff = 1 + Math.random() * 100;
    }

    const base = roundNum < 5 ? 10 : roundNum < 15 ? 100 : 1000;
    const num1 = base + Math.floor(Math.random() * range);
    const num2 = num1 + (Math.random() < 0.5 ? 1 : -1) * Math.floor(diff);

    return Math.random() < 0.5 ? [num1, num2] : [num2, num1];
  }, []);

  const startTest = useCallback(() => {
    setTimes([]);
    setCorrect(0);
    setRound(0);
    setPhase("ready");
    setTimeout(() => nextRound(0), 1000);
  }, []);

  const nextRound = useCallback((roundNum: number) => {
    if (roundNum >= totalRounds) {
      setPhase("result");
      return;
    }

    const [left, right] = generateNumbers(roundNum);
    setLeftNum(left);
    setRightNum(right);
    setPhase("showing");
    showTime.current = performance.now();
  }, [generateNumbers]);

  const handleChoice = useCallback((choice: "left" | "right") => {
    if (phase !== "showing") return;

    const elapsed = Math.round(performance.now() - showTime.current);
    const newTimes = [...times, elapsed];
    setTimes(newTimes);

    const isCorrect = (choice === "left" && leftNum > rightNum) || (choice === "right" && rightNum > leftNum);
    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    }

    const nextRoundNum = round + 1;
    setRound(nextRoundNum);

    if (nextRoundNum >= totalRounds) {
      setPhase("result");
    } else {
      setTimeout(() => nextRound(nextRoundNum), 300);
    }
  }, [phase, times, leftNum, rightNum, round, nextRound]);

  const restart = () => {
    setPhase("instructions");
    setTimes([]);
    setCorrect(0);
    setRound(0);
  };

  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-gray-400 space-y-3 text-left max-w-md mx-auto">
            <p>1. Two numbers will appear side by side</p>
            <p>2. Click the LARGER number as fast as you can</p>
            <p>3. Complete 20 rounds</p>
            <p>4. Numbers get progressively harder to compare</p>
          </div>
        </div>

        <button
          onClick={startTest}
          className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl font-bold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Average Response Time</p>
          <p className="text-6xl font-black text-emerald-400">{averageTime}ms</p>
          <p className="text-lg text-gray-400 mt-3">Accuracy: {accuracy}%</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-3 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}ms</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="space-y-1">
            <p>Fast: &lt;500ms with 95%+ accuracy</p>
            <p>Average: 600-800ms with 90%+ accuracy</p>
            <p>Slow: &gt;1000ms or &lt;85% accuracy</p>
          </div>
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
              const text = `My number comparison time: ${averageTime}ms (${accuracy}% accuracy)! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500 px-1">
        <span>Round {round + 1} of {totalRounds}</span>
        {times.length > 0 && <span>Avg: {averageTime}ms | {accuracy}%</span>}
      </div>

      {phase === "ready" && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">Get ready...</p>
        </div>
      )}

      {phase === "showing" && (
        <div className="flex gap-6 justify-center items-center py-16">
          <button
            onClick={() => handleChoice("left")}
            className="w-48 h-32 bg-gray-900 border-2 border-gray-700 hover:border-emerald-500 rounded-2xl flex items-center justify-center transition-colors"
          >
            <span className="text-5xl font-black text-white">{leftNum}</span>
          </button>
          <button
            onClick={() => handleChoice("right")}
            className="w-48 h-32 bg-gray-900 border-2 border-gray-700 hover:border-emerald-500 rounded-2xl flex items-center justify-center transition-colors"
          >
            <span className="text-5xl font-black text-white">{rightNum}</span>
          </button>
        </div>
      )}
    </div>
  );
}
