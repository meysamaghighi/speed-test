"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "instructions" | "ready" | "showing" | "input" | "result";

const WORD_PAIRS = [
  ["hot", "cold"],
  ["up", "down"],
  ["black", "white"],
  ["big", "small"],
  ["fast", "slow"],
  ["happy", "sad"],
  ["young", "old"],
  ["day", "night"],
  ["left", "right"],
  ["high", "low"],
  ["long", "short"],
  ["light", "dark"],
  ["good", "bad"],
  ["hard", "soft"],
  ["heavy", "light"],
  ["wet", "dry"],
  ["open", "close"],
  ["start", "stop"],
  ["full", "empty"],
  ["loud", "quiet"],
  ["strong", "weak"],
  ["rich", "poor"],
  ["clean", "dirty"],
  ["new", "old"],
];

export default function WordAssociationTest() {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [round, setRound] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [times, setTimes] = useState<number[]>([]);
  const [showTime, setShowTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalRounds = 10;
  const averageTime = times.length > 0 ? Math.round(times.reduce((s, t) => s + t, 0) / times.length) : 0;

  const isFinished = phase === "result" && times.length === totalRounds;
  const pb = usePersonalBest("pb-word-association", "lower", isFinished ? averageTime : null);

  const shuffledPairs = useRef<typeof WORD_PAIRS>([]);

  const startTest = useCallback(() => {
    // Shuffle pairs
    shuffledPairs.current = [...WORD_PAIRS].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setTimes([]);
    setRound(0);
    setPhase("ready");
    setTimeout(() => nextRound(0), 1000);
  }, []);

  const nextRound = useCallback((roundNum: number) => {
    if (roundNum >= totalRounds) {
      setPhase("result");
      return;
    }

    const [word, answer] = shuffledPairs.current[roundNum];
    const flip = Math.random() < 0.5;
    setCurrentWord(flip ? answer : word);
    setExpectedAnswer(flip ? word : answer);
    setUserInput("");
    setPhase("showing");

    setTimeout(() => {
      setShowTime(performance.now());
      setPhase("input");
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 500);
  }, []);

  const handleSubmit = useCallback(() => {
    if (phase !== "input" || !userInput.trim()) return;

    const elapsed = Math.round(performance.now() - showTime);
    const newTimes = [...times, elapsed];
    setTimes(newTimes);

    const nextRoundNum = round + 1;
    setRound(nextRoundNum);

    if (nextRoundNum >= totalRounds) {
      setPhase("result");
    } else {
      setTimeout(() => nextRound(nextRoundNum), 800);
    }
  }, [phase, userInput, showTime, times, round, nextRound]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phase === "input") {
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [phase, handleSubmit]);

  const restart = () => {
    setPhase("instructions");
    setTimes([]);
    setRound(0);
  };

  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-gray-400 space-y-3 text-left max-w-md mx-auto">
            <p>1. A word will appear (e.g. "hot")</p>
            <p>2. Type the opposite or related word as fast as you can (e.g. "cold")</p>
            <p>3. Press Enter to submit</p>
            <p>4. Complete 10 rounds -- we measure your average response time</p>
          </div>
        </div>

        <button
          onClick={startTest}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors"
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
          <p className="text-6xl font-black text-blue-400">{averageTime}ms</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-3 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}ms</p>}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {times.map((t, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <p className="text-xs text-gray-500">#{i + 1}</p>
              <p className="text-sm font-bold text-white">{t}ms</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="space-y-1">
            <p>Fast: &lt;800ms</p>
            <p>Average: 1000-1500ms</p>
            <p>Slow: &gt;2000ms</p>
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
              const text = `My word association time: ${averageTime}ms! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
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
        {times.length > 0 && <span>Avg: {averageTime}ms</span>}
      </div>

      {phase === "ready" && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">Get ready...</p>
        </div>
      )}

      {phase === "showing" && (
        <div className="text-center py-20">
          <p className="text-5xl font-black text-white">{currentWord}</p>
        </div>
      )}

      {phase === "input" && (
        <div className="text-center space-y-6">
          <p className="text-5xl font-black text-white">{currentWord}</p>
          <div className="max-w-sm mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-center text-xl focus:outline-none focus:border-blue-500"
              placeholder="Type the opposite..."
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      )}

      {times.length > 0 && (phase === "ready" || phase === "showing" || phase === "input") && (
        <div className="flex gap-2">
          {times.map((t, i) => (
            <div key={i} className="bg-gray-900 rounded-lg px-3 py-2 text-center flex-1 border border-gray-800">
              <p className="text-xs text-gray-500">#{i + 1}</p>
              <p className="text-sm font-bold text-white">{t}ms</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
