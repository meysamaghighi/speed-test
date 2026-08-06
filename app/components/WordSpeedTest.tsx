"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";
import LeaderboardPanel from "./LeaderboardPanel";
import ReportUpsell from "./ReportUpsell";

type Phase = "waiting" | "playing" | "result";

const WORD_LISTS = {
  short: ["cat", "dog", "sun", "hat", "run", "cup", "pen", "box", "top", "job", "car", "bed", "egg", "fly", "ice"],
  medium: ["house", "water", "paper", "money", "happy", "table", "phone", "apple", "green", "start", "earth", "music", "peace", "dream", "power"],
  long: ["computer", "mountain", "elephant", "happiness", "yesterday", "beautiful", "important", "chocolate", "restaurant", "adventure", "university", "wonderful", "understand", "butterfly", "telephone"],
};

const TOTAL_WORDS = 20;

export default function WordSpeedTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [results, setResults] = useState<{ word: string; correct: boolean; time: number }[]>([]);
  const [endTime, setEndTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Freeze the clock at finish — computing from Date.now() made the score
  // decay with every render of the result screen
  const elapsedMs = endTime > 0 ? endTime - startTime : Date.now() - startTime;
  const wpm = results.length > 0 ? Math.round(results.filter(r => r.correct).length / (elapsedMs / 60000)) : 0;
  const accuracy = results.length > 0 ? Math.round((results.filter(r => r.correct).length / results.length) * 100) : 0;

  const isFinished = phase === "result";
  // Beyond ~250 WPM on single words is paste/automation — don't save it
  const isPlausible = wpm > 0 && wpm <= 250;
  const pb = usePersonalBest("pb-word-speed", "higher", isFinished && isPlausible ? wpm : null);

  const generateWords = useCallback(() => {
    const selected: string[] = [];
    for (let i = 0; i < TOTAL_WORDS; i++) {
      let list: string[];
      if (i < 5) list = WORD_LISTS.short;
      else if (i < 12) list = WORD_LISTS.medium;
      else list = WORD_LISTS.long;
      selected.push(list[Math.floor(Math.random() * list.length)]);
    }
    return selected;
  }, []);

  const start = useCallback(() => {
    const newWords = generateWords();
    setWords(newWords);
    setCurrentWordIndex(0);
    setResults([]);
    setInput("");
    setStartTime(Date.now());
    setEndTime(0);
    setPhase("playing");
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [generateWords]);

  useEffect(() => {
    if (phase === "playing") {
      inputRef.current?.focus();
    }
  }, [phase, currentWordIndex]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "playing" || !words[currentWordIndex]) return;

    const correct = input.trim().toLowerCase() === words[currentWordIndex].toLowerCase();
    const time = Date.now() - startTime;
    setResults(prev => [...prev, { word: words[currentWordIndex], correct, time }]);
    setInput("");

    if (currentWordIndex + 1 >= TOTAL_WORDS) {
      setEndTime(Date.now());
      setPhase("result");
    } else {
      setCurrentWordIndex(prev => prev + 1);
    }
  }, [phase, words, currentWordIndex, input, startTime]);

  // Result screen
  if (phase === "result") {
    const totalTime = elapsedMs / 1000;
    const correctWords = results.filter(r => r.correct).length;
    const incorrectResults = results.filter(r => !r.correct);

    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Your Speed</p>
          <p className="text-6xl font-black text-emerald-400">{wpm} WPM</p>
          <p className="text-ink-2 mt-3">Accuracy: <span className="text-ink font-bold">{accuracy}%</span></p>
          <p className="text-ink-3 text-sm mt-1">Time: {totalTime.toFixed(1)}s</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best} WPM</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-paper-2 rounded-xl p-4 border border-line">
            <p className="text-xs text-ink-3 mb-1">Correct Words</p>
            <p className="text-2xl font-bold text-green-400">{correctWords}/{TOTAL_WORDS}</p>
          </div>
          <div className="bg-paper-2 rounded-xl p-4 border border-line">
            <p className="text-xs text-ink-3 mb-1">Avg Time Per Word</p>
            <p className="text-2xl font-bold text-blue-400">{(totalTime / TOTAL_WORDS).toFixed(1)}s</p>
          </div>
        </div>

        {incorrectResults.length > 0 && (
          <div className="bg-paper-2 rounded-xl p-4 border border-line text-left">
            <p className="text-sm font-bold text-red-400 mb-2">Missed Words</p>
            <div className="flex flex-wrap gap-2">
              {incorrectResults.map((r, i) => (
                <span key={i} className="px-2 py-1 bg-paper-2 text-ink-2 text-sm rounded">
                  {r.word}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setPhase("waiting")}
            className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const text = `I typed ${wpm} WPM with ${accuracy}% accuracy on Word Speed Test! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-emerald-600 text-ink font-bold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Share Score
          </button>
        </div>

        <LeaderboardPanel game="word-speed" score={isFinished && isPlausible ? wpm : null} unit="WPM" />

        <ReportUpsell source="word-speed" />
      </div>
    );
  }

  // Playing screen
  if (phase === "playing") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-ink-3">
          <span>Word {currentWordIndex + 1} of {TOTAL_WORDS}</span>
          <span>Time: {((Date.now() - startTime) / 1000).toFixed(1)}s</span>
        </div>

        <div className="bg-paper-2 rounded-2xl p-12 border border-line text-center">
          <p className="text-5xl md:text-6xl font-black text-ink mb-8">
            {words[currentWordIndex]}
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 text-xl bg-paper-2 border border-line rounded-xl text-ink text-center focus:outline-none focus:border-emerald-500"
              placeholder="Type here..."
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

        <div className="flex gap-2">
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${r.correct ? "bg-green-500" : "bg-red-500"}`}
            />
          ))}
          {Array.from({ length: TOTAL_WORDS - results.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex-1 h-2 rounded bg-paper-2" />
          ))}
        </div>
      </div>
    );
  }

  // Waiting screen
  return (
    <div className="text-center space-y-6">
      <div className="bg-paper-2 rounded-2xl p-12 border border-line">
        <p className="text-ink-2 mb-4">
          You'll see {TOTAL_WORDS} words one at a time. Type each word as fast as you can and press Enter.
        </p>
        <p className="text-ink-3 text-sm mb-6">
          Words start short and get progressively longer. Speed and accuracy both matter!
        </p>
        {pb.best !== null && (
          <p className="text-emerald-400 font-bold mb-6">
            Personal Best: {pb.best} WPM
          </p>
        )}
        <button
          onClick={start}
          className="px-8 py-4 bg-emerald-600 text-ink text-xl font-bold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
