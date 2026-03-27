"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "ready" | "running" | "answer" | "finished";

export default function DualTaskTest() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });
  const [beepCount, setBeepCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const audioContext = useRef<AudioContext | null>(null);
  const animationFrame = useRef<number>(0);
  const beepInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const isFinished = phase === "finished";
  const pb = usePersonalBest("pb-dual-task", "higher", isFinished ? accuracy : null);

  const playBeep = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);

    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + 0.1);
  }, []);

  const startTest = useCallback(() => {
    setPhase("running");
    setTimeLeft(30);
    setBeepCount(0);
    setUserAnswer("");
    setAccuracy(0);

    let count = 0;
    const totalBeeps = 8 + Math.floor(Math.random() * 5); // 8-12 beeps

    // Schedule random beeps
    const scheduledBeeps: number[] = [];
    for (let i = 0; i < totalBeeps; i++) {
      const time = Math.random() * 29000 + 500; // Random time between 0.5s and 29.5s
      scheduledBeeps.push(time);
    }
    scheduledBeeps.sort((a, b) => a - b);

    scheduledBeeps.forEach(time => {
      setTimeout(() => {
        playBeep();
        count++;
      }, time);
    });

    setBeepCount(totalBeeps);

    // Countdown timer
    timerInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerInterval.current) clearInterval(timerInterval.current);
          setPhase("answer");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Dot animation
    let x = 50, y = 50;
    let vx = (Math.random() - 0.5) * 2;
    let vy = (Math.random() - 0.5) * 2;

    const animate = () => {
      x += vx;
      y += vy;

      // Bounce off edges
      if (x <= 5 || x >= 95) vx *= -1;
      if (y <= 5 || y >= 95) vy *= -1;

      // Keep in bounds
      x = Math.max(5, Math.min(95, x));
      y = Math.max(5, Math.min(95, y));

      setDotPosition({ x, y });
      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    // Stop after 30 seconds
    setTimeout(() => {
      cancelAnimationFrame(animationFrame.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
      setPhase("answer");
    }, 30000);
  }, [playBeep]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const guessed = parseInt(userAnswer);
    if (isNaN(guessed)) return;

    const error = Math.abs(guessed - beepCount);
    const acc = Math.max(0, 100 - error * 10);
    setAccuracy(Math.round(acc));
    setPhase("finished");
  }, [userAnswer, beepCount]);

  useEffect(() => {
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (beepInterval.current) clearInterval(beepInterval.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  const restart = () => {
    setPhase("ready");
    setDotPosition({ x: 50, y: 50 });
    setBeepCount(0);
    setUserAnswer("");
    setAccuracy(0);
    setTimeLeft(30);
  };

  // Finished screen
  if (phase === "finished") {
    const getRating = (acc: number) => {
      if (acc >= 90) return { label: "Excellent", color: "text-emerald-400" };
      if (acc >= 70) return { label: "Good", color: "text-green-400" };
      if (acc >= 50) return { label: "Fair", color: "text-yellow-400" };
      return { label: "Needs Practice", color: "text-orange-400" };
    };
    const rating = getRating(accuracy);

    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Dual Task Accuracy</p>
          <p className="text-6xl font-black text-cyan-400">{accuracy}%</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          <p className="text-gray-400 text-sm mt-3">
            Actual beeps: {beepCount} • Your answer: {userAnswer}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}%</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">About Divided Attention</p>
          <p>
            This test measures your ability to track visual and auditory information simultaneously.
            It's crucial for multitasking and is often impaired by distractions or fatigue.
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
              const text = `I scored ${accuracy}% on the Dual Task Test! Can you track a dot AND count beeps?`;
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

  // Ready screen
  if (phase === "ready") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-left text-gray-400 space-y-2">
            <p>• Keep your eyes on the moving red dot</p>
            <p>• At the same time, COUNT how many beeps you hear</p>
            <p>• After 30 seconds, report the number of beeps</p>
            <p>• Tests divided attention (multitasking)</p>
            <p className="text-yellow-400 font-bold">🔊 Turn on sound!</p>
          </div>
        </div>
        <button
          onClick={startTest}
          className="px-8 py-4 bg-cyan-600 text-white font-bold text-xl rounded-xl hover:bg-cyan-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  // Answer input
  if (phase === "answer") {
    return (
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-center text-white text-xl mb-6">
            How many beeps did you hear?
          </p>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            autoFocus
            min="0"
            placeholder="Enter number"
            className="w-full px-4 py-3 bg-gray-800 text-white text-center text-2xl rounded-xl border border-gray-700 focus:border-cyan-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={userAnswer === ""}
            className="w-full mt-4 px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        </form>
      </div>
    );
  }

  // Running test
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400 px-1">
        <span>Track the dot • Count the beeps</span>
        <span className="text-white font-bold">{timeLeft}s</span>
      </div>

      <div className="relative bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden" style={{ paddingBottom: "75%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-700 text-sm">Keep your eyes on the red dot</p>
        </div>
        <div
          className="absolute w-6 h-6 rounded-full bg-red-500 shadow-lg shadow-red-500/50 transition-all duration-75"
          style={{
            left: `${dotPosition.x}%`,
            top: `${dotPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
        <p className="text-gray-400 text-sm">
          🔊 Counting beeps while tracking the dot...
        </p>
      </div>
    </div>
  );
}
