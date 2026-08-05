"use client";

import { useState, useCallback, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";
import LeaderboardPanel from "./LeaderboardPanel";
import ReportUpsell from "./ReportUpsell";

type Phase = "instructions" | "ready" | "searching" | "transition" | "result";

const GRID_SIZES = [3, 4, 5, 6, 8];

export default function VisualSearchTest() {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [level, setLevel] = useState(0);
  const [grid, setGrid] = useState<string[]>([]);
  const [targetIndex, setTargetIndex] = useState(-1);
  const [times, setTimes] = useState<number[]>([]);
  const showTime = useRef(0);

  const currentSize = GRID_SIZES[level];
  const averageTime = times.length > 0 ? Math.round(times.reduce((s, t) => s + t, 0) / times.length) : 0;

  const isFinished = phase === "result";
  const pb = usePersonalBest("pb-visual-search", "lower", isFinished ? averageTime : null);

  const generateGrid = useCallback((size: number) => {
    const total = size * size;
    const arr = new Array(total).fill("O");
    const target = Math.floor(Math.random() * total);
    arr[target] = "Q";
    setTargetIndex(target);
    setGrid(arr);
  }, []);

  const startTest = useCallback(() => {
    setTimes([]);
    setLevel(0);
    setPhase("ready");
    setTimeout(() => nextLevel(0), 1000);
  }, []);

  const nextLevel = useCallback((levelNum: number) => {
    if (levelNum >= GRID_SIZES.length) {
      setPhase("result");
      return;
    }

    const size = GRID_SIZES[levelNum];
    generateGrid(size);
    setPhase("searching");
    showTime.current = performance.now();
  }, [generateGrid]);

  const handleClick = useCallback((index: number) => {
    if (phase !== "searching") return;

    const elapsed = Math.round(performance.now() - showTime.current);

    if (index === targetIndex) {
      // Correct!
      const newTimes = [...times, elapsed];
      setTimes(newTimes);

      const nextLevelNum = level + 1;
      setLevel(nextLevelNum);

      if (nextLevelNum >= GRID_SIZES.length) {
        setPhase("result");
      } else {
        // Leave "searching" immediately so extra clicks in the gap don't
        // register as additional rounds
        setPhase("transition");
        setTimeout(() => nextLevel(nextLevelNum), 800);
      }
    }
  }, [phase, targetIndex, times, level, nextLevel]);

  const restart = () => {
    setPhase("instructions");
    setTimes([]);
    setLevel(0);
  };

  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <h2 className="text-2xl font-bold text-ink mb-4">How to Play</h2>
          <div className="text-ink-2 space-y-3 text-left max-w-md mx-auto">
            <p>1. A grid of similar shapes will appear (letter O)</p>
            <p>2. Find and click the ONE different shape (letter Q)</p>
            <p>3. Grid gets larger each round (3x3 → 4x4 → 5x5 → 6x6 → 8x8)</p>
            <p>4. We measure your average search time across all rounds</p>
          </div>
        </div>

        <button
          onClick={startTest}
          className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-ink text-xl font-bold rounded-xl hover:from-orange-700 hover:to-red-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Average Search Time</p>
          <p className="text-6xl font-black text-orange-400">{averageTime}ms</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-3 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best}ms</p>}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {times.map((t, i) => (
            <div key={i} className="bg-paper-2 rounded-lg p-3 border border-line">
              <p className="text-xs text-ink-3">{GRID_SIZES[i]}×{GRID_SIZES[i]}</p>
              <p className="text-sm font-bold text-ink">{t}ms</p>
            </div>
          ))}
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">How You Compare</p>
          <div className="space-y-1">
            <p>Fast: &lt;1500ms average</p>
            <p>Average: 2000-3000ms</p>
            <p>Slow: &gt;3500ms</p>
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
              const text = `My visual search time: ${averageTime}ms! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-orange-600 text-ink font-bold rounded-xl hover:bg-orange-700 transition-colors"
          >
            Share Score
          </button>
        </div>

        <LeaderboardPanel game="visual-search" score={isFinished ? averageTime : null} unit="ms" />

        <ReportUpsell source="visual-search" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-ink-3 px-1">
        <span>Grid Size: {currentSize}×{currentSize}</span>
        {times.length > 0 && <span>Avg: {averageTime}ms</span>}
      </div>

      {phase === "ready" && (
        <div className="text-center py-20">
          <p className="text-2xl text-ink-2">Get ready...</p>
        </div>
      )}

      {phase === "transition" && (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-emerald-600">Found!</p>
        </div>
      )}

      {phase === "searching" && (
        <div className="max-w-lg mx-auto">
          <p className="text-center text-ink-2 mb-4">Find the Q!</p>
          <div
            className="grid gap-2 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${currentSize}, minmax(0, 1fr))`,
              maxWidth: `${currentSize * 60}px`,
            }}
          >
            {grid.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(idx)}
                className="aspect-square bg-paper-2 border border-line hover:border-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold text-ink transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {times.length > 0 && phase === "searching" && (
        <div className="flex gap-2">
          {times.map((t, i) => (
            <div key={i} className="bg-paper-2 rounded-lg px-3 py-2 text-center flex-1 border border-line">
              <p className="text-xs text-ink-3">{GRID_SIZES[i]}×{GRID_SIZES[i]}</p>
              <p className="text-sm font-bold text-ink">{t}ms</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
