"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";
import LeaderboardPanel from "./LeaderboardPanel";
import ReportUpsell from "./ReportUpsell";

type Phase = "waiting" | "showing" | "input" | "result" | "failed";

export default function NumberSpeedTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [digitSpan, setDigitSpan] = useState(3);
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const deadlineRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Speed pressure: brief flash + timed recall is what separates this test
  // from the classic (untimed) Digit Span
  const flashMs = (span: number) => span * 350;
  const recallMs = (span: number) => 2000 + span * 800;

  // You fail on `digitSpan`, so the last completed span is digitSpan - 1
  // (nothing completed if you fail the starting 3-digit round)
  const maxDigitSpan = digitSpan > 3 ? digitSpan - 1 : 0;
  const isFinished = phase === "result" || phase === "failed";
  const pb = usePersonalBest("pb-number-speed", "higher", isFinished ? maxDigitSpan : null);

  const generateSequence = useCallback((length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10));
  }, []);

  const startRound = useCallback((span: number) => {
    const sequence = generateSequence(span);
    setCurrentSequence(sequence);
    setInput("");
    setPhase("showing");
    setRound(prev => prev + 1);

    setTimeout(() => {
      deadlineRef.current = Date.now() + recallMs(span);
      setTimeLeft(recallMs(span));
      setPhase("input");
      setTimeout(() => inputRef.current?.focus(), 100);
    }, flashMs(span));
  }, [generateSequence]);

  const start = useCallback(() => {
    setDigitSpan(3);
    setRound(0);
    startRound(3);
  }, [startRound]);

  useEffect(() => {
    if (phase === "input") {
      inputRef.current?.focus();
    }
  }, [phase]);

  // Wall-clock recall deadline: background-tab throttling can delay the tick
  // but can't extend the time limit
  useEffect(() => {
    if (phase !== "input") return;
    const id = setInterval(() => {
      const remaining = deadlineRef.current - Date.now();
      if (remaining <= 0) {
        clearInterval(id);
        setPhase("failed");
      } else {
        setTimeLeft(remaining);
      }
    }, 100);
    return () => clearInterval(id);
  }, [phase]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "input") return;
    if (Date.now() > deadlineRef.current) {
      setPhase("failed");
      return;
    }

    const userSequence = input.split("").map(c => parseInt(c, 10)).filter(n => !isNaN(n));
    const correct = userSequence.length === currentSequence.length &&
      userSequence.every((n, i) => n === currentSequence[i]);

    if (correct) {
      const nextSpan = digitSpan + 1;
      setDigitSpan(nextSpan);
      startRound(nextSpan);
    } else {
      setPhase("failed");
    }
  }, [phase, input, currentSequence, digitSpan, startRound]);

  const getRating = (span: number) => {
    if (span >= 9) return { label: "Exceptional", color: "text-emerald-400" };
    if (span >= 7) return { label: "Excellent", color: "text-green-400" };
    if (span >= 6) return { label: "Above Average", color: "text-blue-400" };
    if (span >= 5) return { label: "Average", color: "text-yellow-400" };
    return { label: "Below Average", color: "text-orange-400" };
  };

  // Result/Failed screen
  if (phase === "result" || phase === "failed") {
    const rating = getRating(maxDigitSpan);
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <p className="text-ink-2 text-sm mb-2">Your Speed Span</p>
          <p className="text-6xl font-black text-emerald-400">{maxDigitSpan}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {phase === "failed" && (
            <div className="mt-4 text-sm">
              <p className="text-ink-2">The sequence was:</p>
              <p className="text-ink font-bold text-2xl mt-1">
                {currentSequence.join(" ")}
              </p>
            </div>
          )}
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best} digits</p>}
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">Digit Span Scale</p>
          <div className="space-y-1 text-left">
            <p><span className="text-orange-400 font-bold">&lt;5:</span> Below Average</p>
            <p><span className="text-yellow-400 font-bold">5-6:</span> Average (most adults)</p>
            <p><span className="text-blue-400 font-bold">7-8:</span> Above Average</p>
            <p><span className="text-green-400 font-bold">9+:</span> Exceptional working memory</p>
          </div>
        </div>

        <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
          <p className="font-bold text-ink mb-2">About Number Speed</p>
          <p>
            This is a speeded digit span: the sequence flashes at roughly three
            digits per second and recall runs against a deadline. It measures how
            fast your working memory can encode — most people score 1-2 digits
            below their relaxed span. For the classic untimed protocol, try the
            Digit Span test.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setPhase("waiting")}
            className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const text = `My Number Speed span is ${maxDigitSpan} (${rating.label})! Can you beat me?`;
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

        <LeaderboardPanel game="number-speed" score={isFinished ? maxDigitSpan : null} unit="level" />

        <ReportUpsell source="number-speed" />
      </div>
    );
  }

  // Showing sequence
  if (phase === "showing") {
    return (
      <div className="space-y-6">
        <div className="text-center text-sm text-ink-3">
          Memorize it — fast!
        </div>
        <div className="bg-paper-2 rounded-2xl p-12 md:p-16 border border-line text-center">
          <p className="text-5xl md:text-7xl font-black text-ink tracking-wider">
            {currentSequence.join(" ")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-ink-2 text-sm">
            Round {round} • {digitSpan} digits
          </p>
        </div>
      </div>
    );
  }

  // Input phase
  if (phase === "input") {
    return (
      <div className="space-y-6">
        <div className="text-center text-sm text-ink-3">
          Type the numbers you saw (no spaces)
        </div>
        <div className="max-w-md mx-auto">
          <div className="bg-paper rounded-full h-1.5 overflow-hidden border border-line">
            <div
              className="h-full bg-emerald-500 transition-[width] duration-100 ease-linear"
              style={{ width: `${Math.max(0, (timeLeft / recallMs(digitSpan)) * 100)}%` }}
            />
          </div>
        </div>
        <div className="bg-paper-2 rounded-2xl p-12 border border-line">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full px-4 py-3 text-3xl bg-paper-2 border border-line rounded-xl text-ink text-center focus:outline-none focus:border-emerald-500 tracking-widest"
              placeholder="..."
              autoComplete="off"
              maxLength={digitSpan}
            />
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-emerald-600 text-ink font-bold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="text-center">
          <p className="text-ink-2 text-sm">
            Round {round} • {digitSpan} digits
          </p>
        </div>
      </div>
    );
  }

  // Waiting screen
  return (
    <div className="text-center space-y-6">
      <div className="bg-paper-2 rounded-2xl p-12 border border-line">
        <p className="text-ink-2 mb-4">
          A number sequence flashes on screen — much faster than a normal memory
          test. Type it back before the timer runs out.
        </p>
        <p className="text-ink-3 text-sm mb-6">
          Start with 3 digits. Each correct answer adds 1 digit. One wrong
          answer — or a blown deadline — ends the test.
        </p>
        {pb.best !== null && (
          <p className="text-emerald-400 font-bold mb-6">
            Personal Best: {pb.best} digits
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
