"use client";

import { useState, useEffect, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

export default function RhythmTest() {
  const [phase, setPhase] = useState<"ready" | "listen" | "tap" | "feedback" | "result">("ready");
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const pb = usePersonalBest("pb-rhythm", "higher", phase === "result" ? level - 1 : null);
  const [beatPattern, setBeatPattern] = useState<number[]>([]);
  const [userTaps, setUserTaps] = useState<number[]>([]);
  const [tapStartTime, setTapStartTime] = useState(0);
  const [avgError, setAvgError] = useState(0);
  const [tolerance, setTolerance] = useState(200); // starts at 200ms, tightens by 10ms each level
  const [flash, setFlash] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playTick = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.3;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Silent fail if Web Audio API not available
    }
  };

  const generateBeatPattern = (numBeats: number) => {
    const pattern: number[] = [0];
    for (let i = 1; i < numBeats; i++) {
      const interval = 300 + Math.random() * 500; // 300-800ms between beats
      pattern.push(pattern[i - 1] + interval);
    }
    return pattern;
  };

  const startGame = () => {
    setLevel(1);
    setLives(3);
    setTolerance(200);
    startLevel(1);
  };

  const startLevel = (lvl: number) => {
    const numBeats = 3 + lvl; // level 1 = 4 beats, level 2 = 5, etc.
    const pattern = generateBeatPattern(numBeats);
    setBeatPattern(pattern);
    setUserTaps([]);
    setPhase("listen");
  };

  // Play beat sequence during "listen" phase
  useEffect(() => {
    if (phase === "listen" && beatPattern.length > 0) {
      beatPattern.forEach((time, i) => {
        setTimeout(() => {
          playTick();
          setFlash(true);
          setTimeout(() => setFlash(false), 100);
        }, time);
      });

      // After all beats, switch to tap phase
      const totalTime = beatPattern[beatPattern.length - 1] + 1000;
      setTimeout(() => {
        setPhase("tap");
        setTapStartTime(Date.now());
      }, totalTime);
    }
  }, [phase, beatPattern]);

  const handleTap = () => {
    if (phase !== "tap") return;

    const tapTime = Date.now() - tapStartTime;
    const newTaps = [...userTaps, tapTime];
    setUserTaps(newTaps);

    playTick();
    setFlash(true);
    setTimeout(() => setFlash(false), 100);

    // If we've recorded all taps, evaluate
    if (newTaps.length === beatPattern.length) {
      evaluateTaps(newTaps);
    }
  };

  const evaluateTaps = (taps: number[]) => {
    // Compare intervals between taps vs intervals between beats (rhythm, not absolute timing)
    const beatIntervals = beatPattern.slice(1).map((t, i) => t - beatPattern[i]);
    const tapIntervals = taps.slice(1).map((t, i) => t - taps[i]);
    const errors = tapIntervals.map((tap, i) => Math.abs(tap - beatIntervals[i]));
    const avgErr = errors.length > 0 ? errors.reduce((a, b) => a + b, 0) / errors.length : 0;
    setAvgError(avgErr);

    // Check if passed
    if (avgErr < tolerance) {
      // Success
      setPhase("feedback");
      setTimeout(() => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        setTolerance(Math.max(50, tolerance - 10)); // tighten tolerance, min 50ms
        startLevel(nextLevel);
      }, 1500);
    } else {
      // Miss
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setPhase("result");
      } else {
        setPhase("feedback");
        setTimeout(() => {
          startLevel(level);
        }, 1500);
      }
    }
  };

  const getRating = (lvl: number) => {
    if (lvl >= 10) return { label: "Rhythm Master", color: "text-emerald-400" };
    if (lvl >= 7) return { label: "Excellent", color: "text-green-400" };
    if (lvl >= 5) return { label: "Good Rhythm", color: "text-blue-400" };
    if (lvl >= 3) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-xl rounded-2xl hover:opacity-90 transition-opacity"
        >
          Start Rhythm Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Listen to the beat pattern, then tap it back as accurately as you can.
        </p>
        {pb.best !== null && pb.best > 0 && (
          <p className="text-violet-400 font-bold mt-2">
            Best: Level {pb.best}
          </p>
        )}
      </div>
    );
  }

  if (phase === "listen") {
    return (
      <div className="text-center space-y-6">
        <p className="text-gray-400 text-sm">Level {level} — Listen carefully</p>
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: lives }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-red-500 rounded-full" />
          ))}
        </div>
        <div
          className={`w-64 h-64 mx-auto rounded-full border-8 flex items-center justify-center transition-colors duration-100 ${
            flash
              ? "bg-white border-white"
              : "bg-gray-900 border-violet-500"
          }`}
        >
          <p className="text-2xl font-bold text-gray-400">Listen...</p>
        </div>
        <p className="text-gray-500 text-sm">{beatPattern.length} beats</p>
      </div>
    );
  }

  if (phase === "tap") {
    return (
      <div className="text-center space-y-6">
        <p className="text-gray-400 text-sm">Level {level} — Tap the rhythm back</p>
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: lives }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-red-500 rounded-full" />
          ))}
        </div>
        <button
          onClick={handleTap}
          className={`w-64 h-64 mx-auto rounded-full border-8 flex items-center justify-center transition-all duration-100 cursor-pointer ${
            flash
              ? "bg-white border-white scale-95"
              : "bg-gradient-to-br from-violet-600 to-fuchsia-600 border-violet-500 hover:scale-105"
          }`}
        >
          <p className="text-3xl font-bold text-white">Tap!</p>
        </button>
        <div className="flex justify-center gap-2">
          {Array.from({ length: beatPattern.length }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < userTaps.length ? "bg-violet-400" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (phase === "feedback") {
    const passed = avgError < tolerance;
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: lives }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-red-500 rounded-full" />
          ))}
        </div>
        <div
          className={`rounded-2xl p-8 border ${
            passed
              ? "bg-emerald-900/30 border-emerald-800"
              : "bg-red-900/30 border-red-800"
          }`}
        >
          <p
            className={`text-2xl font-bold mb-2 ${
              passed ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {passed ? "Good!" : "Miss"}
          </p>
          <p className="text-gray-400 text-sm">
            Average timing: {Math.round(avgError)}ms off
          </p>
          <p className="text-gray-500 text-xs mt-1">
            (Tolerance: {Math.round(tolerance)}ms)
          </p>
        </div>
      </div>
    );
  }

  // Result phase
  const finalScore = level - 1;
  const rating = getRating(finalScore);
  return (
    <div className="text-center space-y-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <p className="text-gray-400 text-sm mb-2">Your Rhythm Timing</p>
        <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
          Level {finalScore}
        </p>
        <p className="text-gray-400 mt-1">{finalScore + 3} beats</p>
        <p className={`text-lg font-bold mt-2 ${rating.color}`}>
          {rating.label}
        </p>
        {pb.isNewBest && (
          <p className="text-yellow-400 font-bold mt-2 animate-pulse">
            New Personal Best!
          </p>
        )}
        {pb.best !== null && !pb.isNewBest && (
          <p className="text-gray-500 text-sm mt-2">Personal Best: Level {pb.best}</p>
        )}
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
        <p className="font-bold text-white mb-2">How You Compare</p>
        <div className="flex justify-between">
          <span>Master: 10+</span>
          <span>Great: 7+</span>
          <span>Average: 5</span>
          <span>Low: &lt;3</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={startGame}
          className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => {
            const t = `My rhythm timing: Level ${finalScore} (${finalScore + 3} beats)! Can you match my rhythm?`;
            if (navigator.share) {
              navigator.share({ text: t }).catch(() => {});
            } else {
              navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
            }
          }}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Share Score
        </button>
      </div>
    </div>
  );
}
