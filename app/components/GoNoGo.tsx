"use client";

import { useState, useRef, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Trial = "go" | "nogo";

export default function GoNoGo() {
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [currentTrial, setCurrentTrial] = useState<Trial | null>(null);
  const [trialNumber, setTrialNumber] = useState(0);
  const [goTimes, setGoTimes] = useState<number[]>([]);
  const [hits, setHits] = useState(0); // correct go clicks
  const [misses, setMisses] = useState(0); // missed go trials
  const [falseAlarms, setFalseAlarms] = useState(0); // clicked on nogo
  const totalTrials = 40;
  const goCount = 28; // 70% go trials
  const trialStartTime = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const clickedThisTrial = useRef(false);
  const trialSequence = useRef<Trial[]>([]);

  const averageRT = goTimes.length > 0 ? Math.round(goTimes.reduce((s, t) => s + t, 0) / goTimes.length) : 0;
  const accuracy = trialNumber > 0 ? Math.round(((hits + (trialNumber - hits - misses - falseAlarms)) / trialNumber) * 100) : 0;

  const pb = usePersonalBest("pb-go-no-go", "lower", phase === "done" ? averageRT : null);

  const startGame = () => {
    setTrialNumber(0);
    setGoTimes([]);
    setHits(0);
    setMisses(0);
    setFalseAlarms(0);

    // Generate randomized trial sequence: 70% go, 30% nogo
    const sequence: Trial[] = [];
    for (let i = 0; i < goCount; i++) sequence.push("go");
    for (let i = 0; i < totalTrials - goCount; i++) sequence.push("nogo");
    // Shuffle using Fisher-Yates
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    trialSequence.current = sequence;

    setPhase("playing");
    nextTrial(0);
  };

  const nextTrial = (currentIndex: number) => {
    if (currentIndex >= totalTrials) {
      setCurrentTrial(null);
      setPhase("done");
      return;
    }

    // Get trial from randomized sequence
    const trial: Trial = trialSequence.current[currentIndex];

    // Wait 800-1500ms between trials
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      clickedThisTrial.current = false;
      setCurrentTrial(trial);
      trialStartTime.current = performance.now();
      setTrialNumber(currentIndex + 1);

      // Auto-advance after 1000ms
      timeoutRef.current = window.setTimeout(() => {
        if (trial === "go" && !clickedThisTrial.current) {
          setMisses(prev => prev + 1);
        }
        setCurrentTrial(null);
        nextTrial(currentIndex + 1);
      }, 1000);
    }, delay);
  };

  const handleClick = () => {
    if (!currentTrial || clickedThisTrial.current) return;
    clickedThisTrial.current = true;

    const rt = performance.now() - trialStartTime.current;

    if (currentTrial === "go") {
      setGoTimes(prev => [...prev, rt]);
      setHits(prev => prev + 1);
    } else {
      setFalseAlarms(prev => prev + 1);
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentTrial(null);
    nextTrial(trialNumber);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getRating = (rt: number, acc: number) => {
    if (rt < 300 && acc >= 95) return { label: "Excellent", color: "text-emerald-400" };
    if (rt < 400 && acc >= 90) return { label: "Very Good", color: "text-green-400" };
    if (rt < 500 && acc >= 85) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "done") {
    const rating = getRating(averageRT, accuracy);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Average Reaction Time</p>
          <p className="text-6xl font-black text-green-400">{averageRT}ms</p>
          <p className="text-gray-400 text-sm mt-2">Accuracy: {accuracy}%</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {Math.round(pb.best)}ms</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Hits</p>
            <p className="text-xl font-bold text-green-400">{hits}/{goCount}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">Misses</p>
            <p className="text-xl font-bold text-orange-400">{misses}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500">False Alarms</p>
            <p className="text-xl font-bold text-red-400">{falseAlarms}</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Fast: &lt;300ms</span>
            <span>Good: &lt;400ms</span>
            <span>Average: &lt;500ms</span>
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
              const t = `Go/No-Go Test: ${averageRT}ms, ${accuracy}% accuracy (${rating.label})! Test your impulse control!`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-2xl hover:bg-green-700 transition-colors"
        >
          Start Go/No-Go
        </button>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
          Green circle = Click as fast as you can. Red circle = DON'T click. 40 trials. Tests reaction time AND impulse control.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Trial: {trialNumber} / {totalTrials}</span>
        {goTimes.length > 0 && <span>Avg RT: {averageRT}ms</span>}
      </div>

      <div className="relative w-full h-80 md:h-96 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center">
        {currentTrial && (
          <button
            onClick={handleClick}
            className={`w-32 h-32 rounded-full transition-all ${
              currentTrial === "go"
                ? "bg-green-500 hover:bg-green-400 shadow-lg shadow-green-500/30"
                : "bg-red-500 shadow-lg shadow-red-500/30 cursor-not-allowed"
            }`}
          />
        )}
        {!currentTrial && <p className="text-gray-600 text-lg">Ready...</p>}
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
        <div className="flex justify-between">
          <span>Hits: {hits}</span>
          <span>Misses: {misses}</span>
          <span>False Alarms: {falseAlarms}</span>
        </div>
      </div>
    </div>
  );
}
