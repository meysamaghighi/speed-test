"use client";

import { useState, useRef, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "waiting" | "instructions" | "timing" | "result";

interface Round {
  targetSeconds: number;
  actualSeconds: number;
  errorPercent: number;
}

const TARGET_DURATIONS = [5, 10, 15, 30]; // seconds

export default function FocusTimerTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalRounds = TARGET_DURATIONS.length;
  const currentRound = rounds.length;

  // Score = 100 - average error percentage (higher is better, max 100)
  const avgError =
    rounds.length > 0
      ? rounds.reduce((sum, r) => sum + r.errorPercent, 0) / rounds.length
      : 0;
  const score = Math.max(0, Math.round(100 - avgError));

  const isFinished = rounds.length === totalRounds && phase === "result";
  const pb = usePersonalBest("pb-focus-timer", "higher", isFinished ? score : null);

  const startTest = () => {
    setPhase("instructions");
    setRounds([]);
    setCurrentTarget(TARGET_DURATIONS[0]);
  };

  const startTiming = useCallback(() => {
    setPhase("timing");
    setStartTime(performance.now());
    setElapsedTime(0);

    // Update elapsed time every 10ms (for internal tracking, not displayed)
    timerRef.current = setInterval(() => {
      setElapsedTime(performance.now() - startTime);
    }, 10);
  }, [startTime]);

  const stopTiming = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const actualMs = performance.now() - startTime;
    const actualSeconds = actualMs / 1000;
    const errorPercent = Math.abs(actualSeconds - currentTarget) / currentTarget * 100;

    const newRound: Round = {
      targetSeconds: currentTarget,
      actualSeconds: parseFloat(actualSeconds.toFixed(2)),
      errorPercent: parseFloat(errorPercent.toFixed(1)),
    };

    const newRounds = [...rounds, newRound];
    setRounds(newRounds);

    if (newRounds.length >= totalRounds) {
      setPhase("result");
    } else {
      setPhase("instructions");
      setCurrentTarget(TARGET_DURATIONS[newRounds.length]);
    }
  }, [startTime, currentTarget, rounds]);

  const restart = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPhase("waiting");
    setRounds([]);
    setCurrentTarget(0);
    setStartTime(0);
    setElapsedTime(0);
  };

  const getRating = (sc: number) => {
    if (sc >= 95) return { label: "Perfect Timing", color: "text-emerald-400" };
    if (sc >= 85) return { label: "Excellent Focus", color: "text-green-400" };
    if (sc >= 70) return { label: "Good Estimation", color: "text-yellow-400" };
    if (sc >= 50) return { label: "Needs Practice", color: "text-orange-400" };
    return { label: "Keep Trying", color: "text-red-400" };
  };

  // Result screen
  if (phase === "result") {
    const rating = getRating(score);

    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Focus Score</p>
          <p className="text-6xl font-black text-cyan-400">{score}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          <p className="text-sm text-gray-500 mt-1">Avg Error: {avgError.toFixed(1)}%</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>}
        </div>

        <div className="space-y-3">
          {rounds.map((round, idx) => {
            const diff = round.actualSeconds - round.targetSeconds;
            const diffSign = diff > 0 ? "+" : "";
            return (
              <div key={idx} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Target: {round.targetSeconds}s</p>
                    <p className="text-lg font-bold text-white">
                      {round.actualSeconds}s
                      <span className={`text-sm ml-2 ${diff > 0 ? "text-orange-400" : diff < 0 ? "text-blue-400" : "text-green-400"}`}>
                        ({diffSign}{diff.toFixed(2)}s)
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${round.errorPercent < 5 ? "text-green-400" : round.errorPercent < 15 ? "text-yellow-400" : "text-orange-400"}`}>
                      {round.errorPercent.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600">error</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Scoring</p>
          <p>Score = 100 - average error %</p>
          <p className="text-xs mt-2 text-gray-500">Lower error = higher score (max 100)</p>
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
              const text = `I scored ${score}/100 on Focus Timer Test (${rating.label}, ${avgError.toFixed(1)}% avg error)! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
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

  // Timing screen (dark, no clock visible)
  if (phase === "timing") {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "400px" }}>
        <button
          onClick={stopTiming}
          className="px-12 py-8 bg-cyan-600 text-white font-bold rounded-2xl hover:bg-cyan-700 transition-colors text-2xl"
        >
          STOP
        </button>
      </div>
    );
  }

  // Instructions screen (before each round)
  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-sm text-gray-500 mb-2">Round {currentRound + 1} of {totalRounds}</p>
          <p className="text-6xl font-black text-cyan-400 mb-4">{currentTarget}s</p>
          <p className="text-gray-300 mb-4">
            Press START, then press STOP when you think exactly {currentTarget} seconds have passed.
          </p>
          <p className="text-sm text-gray-500">
            No clock will be shown. Use your internal sense of time.
          </p>
        </div>

        <button
          onClick={startTiming}
          className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors text-lg"
        >
          START
        </button>
      </div>
    );
  }

  // Waiting screen
  return (
    <div className="text-center space-y-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <p className="text-4xl mb-4">⏱️</p>
        <p className="text-gray-300 mb-4">
          Test your internal clock. Estimate exact durations without looking at a timer.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          You'll do 4 rounds with different target durations: 5s, 10s, 15s, and 30s.
        </p>
        <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How it works:</p>
          <p>1. See the target duration (e.g., 10 seconds)</p>
          <p>2. Press START</p>
          <p>3. Wait (screen goes dark, no clock visible)</p>
          <p>4. Press STOP when you think time is up</p>
          <p className="text-xs text-gray-500 mt-2">Accuracy is measured as % error from target</p>
        </div>
      </div>

      <button
        onClick={startTest}
        className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors text-lg"
      >
        Start Test
      </button>
    </div>
  );
}
