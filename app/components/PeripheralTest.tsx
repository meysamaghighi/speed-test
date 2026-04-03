"use client";

import { useState, useCallback, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "instructions" | "stimulus" | "center-question" | "location-question" | "result";

interface TrialData {
  centerLetter: string;
  centerCorrect: boolean;
  peripheralAccuracy: number; // 0-100, distance-based score
}

const LETTERS = ["A", "B", "C", "D"];
const TOTAL_TRIALS = 20;

export default function PeripheralTest() {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [trial, setTrial] = useState(0);
  const [centerLetter, setCenterLetter] = useState("");
  const [peripheralX, setPeripheralX] = useState(0);
  const [peripheralY, setPeripheralY] = useState(0);
  const [results, setResults] = useState<TrialData[]>([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [displayTime, setDisplayTime] = useState(500);
  const [peripheralDistance, setPeripheralDistance] = useState(150);

  const centerCorrect = results.filter((r) => r.centerCorrect).length;
  const avgPeripheralAccuracy =
    results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.peripheralAccuracy, 0) / results.length)
      : 0;
  const combinedScore = Math.round((centerCorrect / TOTAL_TRIALS) * 100 * 0.5 + avgPeripheralAccuracy * 0.5);

  const isFinished = phase === "result";
  const pb = usePersonalBest("pb-peripheral-test", "higher", isFinished ? combinedScore : null);

  const startTest = useCallback(() => {
    setResults([]);
    setTrial(0);
    setDisplayTime(500);
    setPeripheralDistance(150);
    nextTrial(0, 500, 150);
  }, []);

  const nextTrial = useCallback((trialNum: number, dispTime: number, periDist: number) => {
    if (trialNum >= TOTAL_TRIALS) {
      setPhase("result");
      return;
    }

    // Generate random center letter
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    setCenterLetter(letter);

    // Generate random peripheral position
    const angle = Math.random() * 2 * Math.PI;
    const x = Math.cos(angle) * periDist;
    const y = Math.sin(angle) * periDist;
    setPeripheralX(x);
    setPeripheralY(y);

    // Show stimulus
    setPhase("stimulus");

    // After display time, move to center question
    setTimeout(() => {
      setPhase("center-question");
    }, dispTime);
  }, []);

  const handleCenterAnswer = useCallback(
    (answer: string) => {
      setSelectedLetter(answer);
      setPhase("location-question");
    },
    []
  );

  const handleLocationClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left - rect.width / 2;
      const clickY = e.clientY - rect.top - rect.height / 2;

      // Calculate distance from actual peripheral target
      const distance = Math.sqrt(
        Math.pow(clickX - peripheralX, 2) + Math.pow(clickY - peripheralY, 2)
      );

      // Score: 100 if within 30px, scaling down to 0 at 200px
      const maxError = 200;
      const accuracy = Math.max(0, Math.round((1 - distance / maxError) * 100));

      const trialData: TrialData = {
        centerLetter,
        centerCorrect: selectedLetter === centerLetter,
        peripheralAccuracy: accuracy,
      };

      const newResults = [...results, trialData];
      setResults(newResults);

      const nextTrialNum = trial + 1;
      setTrial(nextTrialNum);

      // Increase difficulty every 5 trials
      let newDisplayTime = displayTime;
      let newPeripheralDistance = peripheralDistance;

      if (nextTrialNum === 5) {
        newDisplayTime = 400;
      } else if (nextTrialNum === 10) {
        newDisplayTime = 300;
        newPeripheralDistance = 180;
      } else if (nextTrialNum === 15) {
        newDisplayTime = 200;
        newPeripheralDistance = 210;
      }

      setDisplayTime(newDisplayTime);
      setPeripheralDistance(newPeripheralDistance);

      // Brief pause before next trial
      setTimeout(() => {
        nextTrial(nextTrialNum, newDisplayTime, newPeripheralDistance);
      }, 800);
    },
    [centerLetter, peripheralX, peripheralY, selectedLetter, results, trial, displayTime, peripheralDistance, nextTrial]
  );

  const restart = () => {
    setPhase("instructions");
    setResults([]);
    setTrial(0);
  };

  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">UFOV Test</h2>
          <p className="text-sm text-gray-400 mb-4">
            Useful Field of View - measures divided attention and peripheral awareness
          </p>
          <div className="text-gray-400 space-y-3 text-left max-w-md mx-auto">
            <p>1. A letter (A/B/C/D) appears in the CENTER</p>
            <p>2. At the SAME time, a dot appears in your periphery</p>
            <p>3. Both disappear after 200-500ms</p>
            <p>4. First: identify which letter was in the center</p>
            <p>5. Then: click where you saw the peripheral dot</p>
            <p className="text-cyan-400 font-bold pt-2">
              You must do BOTH tasks simultaneously. Focus on the center but notice the periphery!
            </p>
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
    const getRating = () => {
      if (combinedScore >= 80) return { label: "Exceptional", color: "text-yellow-400" };
      if (combinedScore >= 65) return { label: "Excellent", color: "text-green-400" };
      if (combinedScore >= 50) return { label: "Good", color: "text-blue-400" };
      if (combinedScore >= 35) return { label: "Average", color: "text-gray-300" };
      return { label: "Needs Practice", color: "text-gray-400" };
    };

    const rating = getRating();

    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">UFOV Score</p>
          <p className="text-6xl font-black text-cyan-400">{combinedScore}</p>
          <p className={`text-xl font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-3 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-950 rounded-lg p-4">
              <p className="text-3xl font-bold text-white">{centerCorrect}/{TOTAL_TRIALS}</p>
              <p className="text-xs text-gray-500">Center Task</p>
            </div>
            <div className="bg-gray-950 rounded-lg p-4">
              <p className="text-3xl font-bold text-white">{avgPeripheralAccuracy}%</p>
              <p className="text-xs text-gray-500">Peripheral Accuracy</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">About Your Score</p>
          <div className="space-y-1 text-left">
            <p>
              <span className="font-bold text-yellow-400">80+</span> Exceptional dual-task performance
            </p>
            <p>
              <span className="font-bold text-green-400">65-79</span> Excellent divided attention
            </p>
            <p>
              <span className="font-bold text-blue-400">50-64</span> Good peripheral awareness
            </p>
            <p>
              <span className="font-bold text-gray-300">35-49</span> Average performance
            </p>
            <p>
              <span className="font-bold text-gray-400">&lt;35</span> Practice improves scores
            </p>
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
              const text = `UFOV Score: ${combinedScore} (${rating.label}) - Peripheral Vision Test | benchmybrain.com/peripheral-test`;
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

  if (phase === "center-question") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-gray-500 px-1">
          <span>Trial {trial + 1} of {TOTAL_TRIALS}</span>
          <span>Score: {combinedScore}</span>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <p className="text-xl text-gray-300 mb-6">What letter was in the center?</p>
            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              {LETTERS.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleCenterAnswer(letter)}
                  className="p-6 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold rounded-xl transition-colors border border-gray-700 hover:border-cyan-500"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "location-question") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-gray-500 px-1">
          <span>Trial {trial + 1} of {TOTAL_TRIALS}</span>
          <span>Score: {combinedScore}</span>
        </div>

        <div className="text-center space-y-4">
          <p className="text-xl text-gray-300">Now click where you saw the peripheral dot</p>
          <div
            className="relative w-full h-96 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center cursor-crosshair"
            onClick={handleLocationClick}
          >
            <div className="w-3 h-3 bg-white rounded-full opacity-30" />
            <p className="absolute bottom-4 text-xs text-gray-500">Click the location</p>
          </div>
        </div>
      </div>
    );
  }

  // Stimulus phase
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500 px-1">
        <span>Trial {trial + 1} of {TOTAL_TRIALS}</span>
        <span>Score: {combinedScore}</span>
      </div>

      <div className="relative w-full h-96 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center overflow-hidden">
        {/* Center letter */}
        <div className="text-6xl font-black text-white select-none">{centerLetter}</div>

        {/* Peripheral target */}
        <div
          className="absolute w-3 h-3 bg-cyan-400 rounded-full"
          style={{
            left: `calc(50% + ${peripheralX}px)`,
            top: `calc(50% + ${peripheralY}px)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
