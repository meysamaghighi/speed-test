"use client";

import { useState, useCallback, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "instructions" | "ready" | "testing" | "result";

export default function PeripheralTest() {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [round, setRound] = useState(0);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [distances, setDistances] = useState<number[]>([]);
  const showTime = useRef(0);

  const totalRounds = 10;
  const maxDistance = distances.length > 0 ? Math.max(...distances) : 0;

  const isFinished = phase === "result";
  const pb = usePersonalBest("pb-peripheral-test", "higher", isFinished ? maxDistance : null);

  const startTest = useCallback(() => {
    setDistances([]);
    setRound(0);
    setPhase("ready");
    setTimeout(() => nextRound(0), 1500);
  }, []);

  const nextRound = useCallback((roundNum: number) => {
    if (roundNum >= totalRounds) {
      setPhase("result");
      return;
    }

    // Random position, at least 100px from center
    const angle = Math.random() * 2 * Math.PI;
    const minDist = 100;
    const maxDist = 250;
    const dist = minDist + Math.random() * (maxDist - minDist);

    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;

    setTargetX(x);
    setTargetY(y);
    setPhase("testing");
    showTime.current = performance.now();
  }, []);

  const handleTargetClick = useCallback(() => {
    if (phase !== "testing") return;

    const elapsed = performance.now() - showTime.current;

    // Calculate distance from center
    const distance = Math.round(Math.sqrt(targetX * targetX + targetY * targetY));
    const newDistances = [...distances, distance];
    setDistances(newDistances);

    const nextRoundNum = round + 1;
    setRound(nextRoundNum);

    if (nextRoundNum >= totalRounds) {
      setPhase("result");
    } else {
      setTimeout(() => nextRound(nextRoundNum), 1000);
    }
  }, [phase, targetX, targetY, distances, round, nextRound]);

  const restart = () => {
    setPhase("instructions");
    setDistances([]);
    setRound(0);
  };

  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-gray-400 space-y-3 text-left max-w-md mx-auto">
            <p>1. Keep your eyes focused on the CENTER DOT at all times</p>
            <p>2. Small targets will appear at various distances from center</p>
            <p>3. Click when you notice a target in your peripheral vision</p>
            <p>4. DON'T look away from the center -- use only side vision</p>
            <p>5. We measure the farthest distance you can detect</p>
          </div>
        </div>

        <button
          onClick={startTest}
          className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xl font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-colors"
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
          <p className="text-gray-400 text-sm mb-2">Maximum Detection Distance</p>
          <p className="text-6xl font-black text-cyan-400">{maxDistance}px</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-3 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}px</p>}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {distances.map((d, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <p className="text-xs text-gray-500">#{i + 1}</p>
              <p className="text-sm font-bold text-white">{d}px</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="space-y-1">
            <p>Excellent: 220+ pixels</p>
            <p>Good: 180-220 pixels</p>
            <p>Average: 150-180 pixels</p>
            <p>Below Average: &lt;150 pixels</p>
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
              const text = `My peripheral vision: ${maxDistance}px detection distance! Can you beat me?`;
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500 px-1">
        <span>Round {round + 1} of {totalRounds}</span>
        {distances.length > 0 && <span>Max: {maxDistance}px</span>}
      </div>

      {phase === "ready" && (
        <div className="text-center space-y-4">
          <p className="text-2xl text-gray-400">Focus on the center dot...</p>
          <div className="relative w-full h-96 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <p className="absolute bottom-4 text-xs text-gray-500">Keep your eyes on the red dot!</p>
          </div>
        </div>
      )}

      {phase === "testing" && (
        <div className="relative w-full h-96 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center overflow-hidden">
          {/* Center dot */}
          <div className="w-3 h-3 bg-red-500 rounded-full z-10" />

          {/* Target */}
          <button
            onClick={handleTargetClick}
            className="absolute w-8 h-8 bg-emerald-500 rounded-full hover:bg-emerald-400 transition-colors"
            style={{
              left: `calc(50% + ${targetX}px)`,
              top: `calc(50% + ${targetY}px)`,
              transform: "translate(-50%, -50%)",
            }}
          />

          <p className="absolute bottom-4 text-xs text-gray-500">Keep looking at the red dot!</p>
        </div>
      )}

      {distances.length > 0 && (phase === "ready" || phase === "testing") && (
        <div className="flex gap-2 overflow-x-auto">
          {distances.map((d, i) => (
            <div key={i} className="bg-gray-900 rounded-lg px-3 py-2 text-center flex-shrink-0 border border-gray-800">
              <p className="text-xs text-gray-500">#{i + 1}</p>
              <p className="text-sm font-bold text-white">{d}px</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
