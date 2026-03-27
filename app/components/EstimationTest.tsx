"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "ready" | "show" | "answer" | "result" | "finished";

export default function EstimationTest() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [round, setRound] = useState(1);
  const [actualCount, setActualCount] = useState(0);
  const [dotPositions, setDotPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [errors, setErrors] = useState<number[]>([]);

  const totalRounds = 10;
  const isFinished = phase === "finished";
  const avgAccuracy = errors.length > 0
    ? Math.round(100 - errors.reduce((a, b) => a + b, 0) / errors.length)
    : 0;
  const pb = usePersonalBest("pb-estimation", "higher", isFinished ? avgAccuracy : null);

  const generateDots = useCallback((count: number) => {
    const dots: Array<{ x: number; y: number }> = [];
    const minDistance = 25; // Minimum distance between dots

    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let x: number, y: number;

      do {
        x = Math.random() * 85 + 5; // 5-90%
        y = Math.random() * 85 + 5;
        attempts++;

        // Check distance from existing dots
        const tooClose = dots.some(dot => {
          const dx = dot.x - x;
          const dy = dot.y - y;
          return Math.sqrt(dx * dx + dy * dy) < minDistance;
        });

        if (!tooClose || attempts > 50) break;
      } while (attempts < 50);

      dots.push({ x, y });
    }

    return dots;
  }, []);

  const startRound = useCallback(() => {
    // Progressive difficulty: 5, 8, 12, 17, 23, 30, 40, 52, 67, 85
    const counts = [5, 8, 12, 17, 23, 30, 40, 52, 67, 85];
    const count = counts[round - 1] || 50;

    setActualCount(count);
    const dots = generateDots(count);
    setDotPositions(dots);
    setUserAnswer("");
    setPhase("show");

    // Show for 1 second
    setTimeout(() => {
      setPhase("answer");
    }, 1000);
  }, [round, generateDots]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const guess = parseInt(userAnswer);
    if (isNaN(guess)) return;

    const error = Math.abs(guess - actualCount);
    const percentError = (error / actualCount) * 100;
    setErrors([...errors, percentError]);

    setPhase("result");

    setTimeout(() => {
      if (round < totalRounds) {
        setRound(round + 1);
        startRound();
      } else {
        setPhase("finished");
      }
    }, 1500);
  }, [userAnswer, actualCount, errors, round, startRound]);

  const restart = () => {
    setPhase("ready");
    setRound(1);
    setActualCount(0);
    setDotPositions([]);
    setUserAnswer("");
    setErrors([]);
  };

  // Finished screen
  if (phase === "finished") {
    const getRating = (acc: number) => {
      if (acc >= 90) return { label: "Excellent", color: "text-emerald-400" };
      if (acc >= 80) return { label: "Very Good", color: "text-green-400" };
      if (acc >= 70) return { label: "Good", color: "text-yellow-400" };
      if (acc >= 60) return { label: "Fair", color: "text-orange-400" };
      return { label: "Needs Practice", color: "text-red-400" };
    };
    const rating = getRating(avgAccuracy);

    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Average Estimation Accuracy</p>
          <p className="text-6xl font-black text-amber-400">{avgAccuracy}%</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}%</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <p className="font-bold text-white mb-2 text-sm">Round-by-Round Accuracy</p>
          <div className="grid grid-cols-5 gap-2 text-xs">
            {errors.map((err, i) => {
              const acc = Math.round(100 - err);
              return (
                <div key={i} className="bg-gray-800 rounded p-2">
                  <span className="text-gray-500">#{i + 1}</span>
                  <div className={`font-bold ${acc >= 85 ? "text-green-400" : acc >= 70 ? "text-yellow-400" : "text-red-400"}`}>
                    {acc}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">About Number Sense</p>
          <p>
            This tests "subitizing" (instantly recognizing small quantities) and estimation.
            Research shows humans can instantly count up to 4-5 items, beyond that we estimate.
          </p>
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
              const text = `I scored ${avgAccuracy}% accuracy on the Estimation Test! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  // Ready screen
  if (phase === "ready") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-left text-gray-400 space-y-2">
            <p>• Dots appear for 1 second</p>
            <p>• Estimate how many you saw</p>
            <p>• 10 rounds, from 5 to 85 dots</p>
            <p>• Tests your "number sense" and estimation ability</p>
          </div>
        </div>
        <button
          onClick={startRound}
          className="px-8 py-4 bg-amber-600 text-white font-bold text-xl rounded-xl hover:bg-amber-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  // Result screen
  if (phase === "result") {
    const guess = parseInt(userAnswer);
    const error = Math.abs(guess - actualCount);
    const accuracy = Math.round(100 - (error / actualCount) * 100);

    return (
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
        <p className="text-gray-400 text-sm mb-2">Round {round} of {totalRounds}</p>
        <p className="text-xl text-white mb-4">
          Actual: <span className="font-black text-2xl">{actualCount}</span> •
          Your guess: <span className="font-black text-2xl">{guess}</span>
        </p>
        <p className={`text-3xl font-bold ${accuracy >= 85 ? "text-green-400" : accuracy >= 70 ? "text-yellow-400" : "text-red-400"}`}>
          {accuracy}% accurate
        </p>
      </div>
    );
  }

  // Answer input
  if (phase === "answer") {
    return (
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-400 px-1">
          <span>Round {round} of {totalRounds}</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-center text-white text-xl mb-6">
            How many dots did you see?
          </p>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            autoFocus
            min="0"
            placeholder="Enter your guess"
            className="w-full px-4 py-3 bg-gray-800 text-white text-center text-2xl rounded-xl border border-gray-700 focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={userAnswer === ""}
            className="w-full mt-4 px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  // Show dots
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400 px-1">
        <span>Round {round} of {totalRounds}</span>
        <span>Memorize!</span>
      </div>

      <div className="relative bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden" style={{ paddingBottom: "75%" }}>
        <div className="absolute inset-0">
          {dotPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-amber-400"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
