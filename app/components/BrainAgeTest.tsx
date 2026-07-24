"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReportUpsell from "./ReportUpsell";

type Phase = "ready" | "reaction" | "memory" | "speed" | "result";
type ReactionSub = "armed" | "go" | "early";
type MemorySub = "show" | "input";

const MEMORY_MAX_LEVEL = 8; // cap so the memory step can't run forever
const SPEED_ROUNDS = 8;

// Same 0-100 clamp used by app/lib/brainTests.ts (not exported there, so
// replicated locally to keep this component self-contained).
function clampScore(v: number) {
  return Math.max(0, Math.min(100, v));
}

// Exact formula as the `pb-reaction` entry in brainTests.ts: 150ms=100, 500ms=0.
function reactionToScore(ms: number) {
  return clampScore(100 - ((ms - 150) / 350) * 100);
}

// Exact formula as the `pb-number-memory` entry in brainTests.ts: level 12=100.
function memoryToScore(level: number) {
  return clampScore((level / 12) * 100);
}

function getBrainAgeRating(age: number) {
  if (age <= 25) return "Sharp as a 20-something!";
  if (age <= 35) return "Prime cognitive form";
  if (age <= 45) return "Solid, steady mind";
  if (age <= 55) return "A wise, seasoned brain";
  return "Textbook — everyone's mind slows, yours included \u{1F604}";
}

function generateDigits(digits: number) {
  let n = "";
  for (let i = 0; i < digits; i++) {
    n += Math.floor(Math.random() * 10).toString();
  }
  return n;
}

export default function BrainAgeTest() {
  const [phase, setPhase] = useState<Phase>("ready");

  // Reaction step
  const [reactionSub, setReactionSub] = useState<ReactionSub>("armed");
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const goTime = useRef(0);
  const reactionTimeout = useRef<NodeJS.Timeout | null>(null);

  // Memory step
  const [memorySub, setMemorySub] = useState<MemorySub>("show");
  const [memoryLevel, setMemoryLevel] = useState(1);
  const [memoryNumber, setMemoryNumber] = useState("");
  const [memoryGuess, setMemoryGuess] = useState("");
  const [memoryReachedLevel, setMemoryReachedLevel] = useState(0);
  const memoryInputRef = useRef<HTMLInputElement>(null);

  // Speed step
  const [speedRound, setSpeedRound] = useState(0);
  const [speedLeft, setSpeedLeft] = useState(0);
  const [speedRight, setSpeedRight] = useState(0);
  const [speedCorrect, setSpeedCorrect] = useState(0);
  const [speedLocked, setSpeedLocked] = useState(false);

  useEffect(() => {
    return () => {
      if (reactionTimeout.current) clearTimeout(reactionTimeout.current);
    };
  }, []);

  // ---------- Reaction ----------
  const armReactionTrial = useCallback(() => {
    setReactionSub("armed");
    const delay = 1000 + Math.random() * 2000; // 1-3s
    reactionTimeout.current = setTimeout(() => {
      goTime.current = performance.now();
      setReactionSub("go");
    }, delay);
  }, []);

  const startReaction = () => {
    setPhase("reaction");
    armReactionTrial();
  };

  // ---------- Memory ----------
  const startMemoryLevel = useCallback((level: number) => {
    setMemoryNumber(generateDigits(level + 2)); // level 1 = 3 digits
    setMemoryGuess("");
    setMemorySub("show");
  }, []);

  const startMemory = useCallback(() => {
    setMemoryLevel(1);
    setMemoryReachedLevel(0);
    startMemoryLevel(1);
    setPhase("memory");
  }, [startMemoryLevel]);

  useEffect(() => {
    if (phase !== "memory" || memorySub !== "show") return;
    const displayTime = 1000 + memoryNumber.length * 300;
    const t = setTimeout(() => {
      setMemorySub("input");
      setTimeout(() => memoryInputRef.current?.focus(), 50);
    }, displayTime);
    return () => clearTimeout(t);
  }, [phase, memorySub, memoryNumber]);

  // ---------- Speed ----------
  const generateSpeedPair = useCallback((): [number, number] => {
    const a = 10 + Math.floor(Math.random() * 989); // 10-998
    let b = a + (Math.random() < 0.5 ? 1 : -1) * (5 + Math.floor(Math.random() * 60));
    if (b < 10) b = a + 10;
    return Math.random() < 0.5 ? [a, b] : [b, a];
  }, []);

  const nextSpeedRound = useCallback(
    (roundNum: number) => {
      if (roundNum >= SPEED_ROUNDS) {
        setPhase("result");
        return;
      }
      const [left, right] = generateSpeedPair();
      setSpeedLeft(left);
      setSpeedRight(right);
      setSpeedLocked(false);
    },
    [generateSpeedPair]
  );

  const startSpeed = useCallback(() => {
    setSpeedRound(0);
    setSpeedCorrect(0);
    setPhase("speed");
    nextSpeedRound(0);
  }, [nextSpeedRound]);

  const finishMemory = useCallback(
    (reachedLevel: number) => {
      setMemoryReachedLevel(reachedLevel);
      startSpeed();
    },
    [startSpeed]
  );

  // ---------- Handlers ----------
  const handleReactionClick = () => {
    if (reactionSub === "armed") {
      // Clicked before green — low-stakes, just re-arm the same trial.
      if (reactionTimeout.current) clearTimeout(reactionTimeout.current);
      setReactionSub("early");
    } else if (reactionSub === "go") {
      const elapsed = Math.round(performance.now() - goTime.current);
      setReactionMs(elapsed);
      startMemory();
    } else if (reactionSub === "early") {
      armReactionTrial();
    }
  };

  const handleMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (memoryGuess === memoryNumber) {
      if (memoryLevel >= MEMORY_MAX_LEVEL) {
        finishMemory(memoryLevel);
      } else {
        const next = memoryLevel + 1;
        setMemoryLevel(next);
        startMemoryLevel(next);
      }
    } else {
      finishMemory(memoryLevel - 1);
    }
  };

  const handleSpeedChoice = (choice: "left" | "right") => {
    if (phase !== "speed" || speedLocked) return;
    setSpeedLocked(true);
    const isCorrect =
      (choice === "left" && speedLeft > speedRight) ||
      (choice === "right" && speedRight > speedLeft);
    setSpeedCorrect((prev) => prev + (isCorrect ? 1 : 0));
    const next = speedRound + 1;
    setSpeedRound(next);
    setTimeout(() => nextSpeedRound(next), 250);
  };

  const restart = () => {
    if (reactionTimeout.current) clearTimeout(reactionTimeout.current);
    setPhase("ready");
    setReactionSub("armed");
    setReactionMs(null);
    setMemorySub("show");
    setMemoryLevel(1);
    setMemoryNumber("");
    setMemoryGuess("");
    setMemoryReachedLevel(0);
    setSpeedRound(0);
    setSpeedCorrect(0);
    setSpeedLocked(false);
  };

  // ---------- Derived scores ----------
  const reactionScore = reactionMs !== null ? reactionToScore(reactionMs) : 0;
  const memoryScore = memoryToScore(memoryReachedLevel);
  const speedAccuracy = Math.round((speedCorrect / SPEED_ROUNDS) * 100);
  const speedScore = speedAccuracy;
  const composite = (reactionScore + memoryScore + speedScore) / 3;
  const brainAge = Math.max(20, Math.min(65, Math.round(65 - (composite / 100) * 45)));
  const rating = getBrainAgeRating(brainAge);

  // ---------- Render ----------
  if (phase === "ready") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-paper-2 rounded-2xl p-8 border border-line">
          <h2 className="text-2xl font-bold text-ink mb-4">Find Your Brain Age</h2>
          <p className="text-ink-2 max-w-md mx-auto">
            3 quick rounds — a reaction click, a number to remember, and a
            speed-comparison round — about 90 seconds total. Then we turn
            your results into a fun Brain Age.
          </p>
        </div>
        <button
          onClick={startReaction}
          className="px-8 py-4 bg-indigo-600 text-white font-bold text-xl rounded-2xl hover:bg-indigo-700 transition-colors"
        >
          Start
        </button>
      </div>
    );
  }

  if (phase === "reaction") {
    const bgColor =
      reactionSub === "go" ? "bg-emerald-500" : reactionSub === "early" ? "bg-orange-500" : "bg-red-600";
    const message =
      reactionSub === "armed"
        ? "Wait for green..."
        : reactionSub === "go"
        ? "CLICK NOW!"
        : "Too early! Click to try again";

    return (
      <div className="space-y-4">
        <p className="text-sm text-ink-3 text-center">Step 1 of 3 — Reaction</p>
        <button
          onClick={handleReactionClick}
          className={`w-full h-64 md:h-80 rounded-2xl ${bgColor} transition-colors duration-100 flex items-center justify-center cursor-pointer select-none`}
        >
          <span className="text-2xl md:text-3xl font-bold text-white drop-shadow">{message}</span>
        </button>
      </div>
    );
  }

  if (phase === "memory") {
    const digits = memoryLevel + 2;

    if (memorySub === "show") {
      return (
        <div className="text-center space-y-4">
          <p className="text-sm text-ink-3">Step 2 of 3 — Memory</p>
          <p className="text-ink-2 text-sm">Memorize this number</p>
          <div className="bg-paper-2 rounded-2xl p-8 border border-line">
            <p
              className="font-mono font-black text-indigo-400 tracking-widest"
              style={{ fontSize: `${Math.max(24, 60 - digits * 3)}px` }}
            >
              {memoryNumber}
            </p>
          </div>
          <p className="text-ink-3 text-sm">{digits} digits</p>
        </div>
      );
    }

    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-ink-3">Step 2 of 3 — Memory</p>
        <p className="text-ink-2 text-sm">What was the number?</p>
        <form onSubmit={handleMemorySubmit} className="space-y-4">
          <input
            ref={memoryInputRef}
            type="tel"
            value={memoryGuess}
            onChange={(e) => setMemoryGuess(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-paper-2 border border-line rounded-xl px-4 py-4 text-ink font-mono text-3xl text-center tracking-widest focus:outline-none focus:border-indigo-500"
            placeholder="Type the number..."
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (phase === "speed") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-ink-3 text-center">
          Step 3 of 3 — Speed ({Math.min(speedRound + 1, SPEED_ROUNDS)} of {SPEED_ROUNDS})
        </p>
        <p className="text-center text-ink-2 text-sm">Click the larger number</p>
        <div className="flex gap-6 justify-center items-center py-16">
          <button
            onClick={() => handleSpeedChoice("left")}
            disabled={speedLocked}
            className="w-40 h-28 md:w-48 md:h-32 bg-paper-2 border-2 border-line hover:border-indigo-500 rounded-2xl flex items-center justify-center transition-colors disabled:opacity-60"
          >
            <span className="text-5xl font-black text-ink">{speedLeft}</span>
          </button>
          <button
            onClick={() => handleSpeedChoice("right")}
            disabled={speedLocked}
            className="w-40 h-28 md:w-48 md:h-32 bg-paper-2 border-2 border-line hover:border-indigo-500 rounded-2xl flex items-center justify-center transition-colors disabled:opacity-60"
          >
            <span className="text-5xl font-black text-ink">{speedRight}</span>
          </button>
        </div>
      </div>
    );
  }

  // result
  return (
    <div className="text-center space-y-6">
      <div className="bg-paper-2 rounded-2xl p-8 border border-line">
        <p className="text-ink-2 text-sm mb-2">Your Brain Age</p>
        <p className="text-6xl font-black text-indigo-400">{brainAge}</p>
        <p className="text-lg font-bold text-ink mt-2">{rating}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-paper-2 rounded-lg p-3 border border-line">
          <p className="text-xs text-ink-3">Reaction</p>
          <p className="text-lg font-bold text-ink">{reactionMs ?? 0}ms</p>
        </div>
        <div className="bg-paper-2 rounded-lg p-3 border border-line">
          <p className="text-xs text-ink-3">Memory</p>
          <p className="text-lg font-bold text-ink">Level {memoryReachedLevel}</p>
        </div>
        <div className="bg-paper-2 rounded-lg p-3 border border-line">
          <p className="text-xs text-ink-3">Speed</p>
          <p className="text-lg font-bold text-ink">{speedAccuracy}%</p>
        </div>
      </div>

      <p className="text-xs text-ink-3">Just for fun — not a medical or scientific measure.</p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={restart}
          className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => {
            const text = `My Brain Age is ${brainAge}! (${rating}) What's yours?`;
            if (navigator.share) {
              navigator.share({ text }).catch(() => {});
            } else {
              navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => {});
            }
          }}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Share Score
        </button>
      </div>

      <ReportUpsell source="brain-age" />
    </div>
  );
}
