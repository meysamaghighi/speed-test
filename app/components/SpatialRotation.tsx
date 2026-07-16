"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { usePersonalBest } from "../hooks/usePersonalBest";
import { encodeChallenge, decodeChallenge, type ChallengeData } from "../lib/challenge";
import { track } from "../lib/report";
import ReportUpsell from "./ReportUpsell";

interface Coord {
  x: number;
  y: number;
}

interface Trial {
  shape1: Coord[];
  shape2: Coord[];
  isSame: boolean;
}

export default function SpatialRotation() {
  const [phase, setPhase] = useState<"ready" | "playing" | "result">("ready");
  const [currentRound, setCurrentRound] = useState(0);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const pb = usePersonalBest("pb-spatial", "higher", phase === "result" ? correctCount : null);

  const searchParams = useSearchParams();
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [challengerName, setChallengerName] = useState("");
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [challengeCopied, setChallengeCopied] = useState(false);
  const trackedAccepted = useRef(false);

  useEffect(() => {
    const decoded = decodeChallenge(searchParams?.get("c"));
    setChallenge(decoded);
    if (decoded && !trackedAccepted.current) {
      trackedAccepted.current = true;
      track("rotation_challenge_accepted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const totalRounds = 15;

  // Generate a random connected shape with 5-7 blocks
  const generateShape = (numBlocks: number): Coord[] => {
    const shape: Coord[] = [{ x: 0, y: 0 }];
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    while (shape.length < numBlocks) {
      const base = shape[Math.floor(Math.random() * shape.length)];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const newCoord = { x: base.x + dir.x, y: base.y + dir.y };

      // Check if this coord already exists
      const exists = shape.some((c) => c.x === newCoord.x && c.y === newCoord.y);
      if (!exists) {
        shape.push(newCoord);
      }
    }

    return shape;
  };

  // Rotate shape by given angle (90, 180, 270 degrees)
  const rotateShape = (shape: Coord[], angle: number): Coord[] => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.round(Math.cos(radians));
    const sin = Math.round(Math.sin(radians));

    return shape.map((c) => ({
      x: c.x * cos - c.y * sin,
      y: c.x * sin + c.y * cos,
    }));
  };

  // Normalize shape to start at (0,0)
  const normalizeShape = (shape: Coord[]): Coord[] => {
    const minX = Math.min(...shape.map((c) => c.x));
    const minY = Math.min(...shape.map((c) => c.y));
    return shape.map((c) => ({ x: c.x - minX, y: c.y - minY }));
  };

  const shapeKey = (shape: Coord[]): string =>
    normalizeShape(shape)
      .map((c) => `${c.x},${c.y}`)
      .sort()
      .join("|");

  const isRotationOf = (a: Coord[], b: Coord[]): boolean =>
    [0, 90, 180, 270].some((angle) => shapeKey(rotateShape(a, angle)) === shapeKey(b));

  // Generate all trials for the game
  const generateTrials = (): Trial[] => {
    const newTrials: Trial[] = [];
    const numSame = 8;
    const numDifferent = 7;

    // Generate "Same" trials
    for (let i = 0; i < numSame; i++) {
      const numBlocks = 5 + Math.floor(Math.random() * 3); // 5-7 blocks
      const shape1 = normalizeShape(generateShape(numBlocks));
      const angles = [90, 180, 270];
      const angle = angles[Math.floor(Math.random() * angles.length)];
      const shape2 = normalizeShape(rotateShape(shape1, angle));
      newTrials.push({ shape1, shape2, isSame: true });
    }

    // Generate "Different" trials
    for (let i = 0; i < numDifferent; i++) {
      const numBlocks = 5 + Math.floor(Math.random() * 3);
      const shape1 = normalizeShape(generateShape(numBlocks));
      // A random shape can coincidentally be a rotation of shape1 — that would
      // make the "correct" answer wrong, so reroll until genuinely different
      let shape2 = normalizeShape(generateShape(numBlocks));
      while (isRotationOf(shape1, shape2)) {
        shape2 = normalizeShape(generateShape(numBlocks));
      }
      newTrials.push({ shape1, shape2, isSame: false });
    }

    // Shuffle trials
    return newTrials.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    setTrials(generateTrials());
    setCurrentRound(0);
    setCorrectCount(0);
    setTotalTime(0);
    setStartTime(Date.now());
    setPhase("playing");
  };

  const handleAnswer = (userSaidSame: boolean) => {
    const trial = trials[currentRound];
    const isCorrect = userSaidSame === trial.isSame;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    const elapsed = Date.now() - startTime;
    setTotalTime((prev) => prev + elapsed);

    if (currentRound + 1 >= totalRounds) {
      setPhase("result");
    } else {
      setCurrentRound((prev) => prev + 1);
      setStartTime(Date.now());
    }
  };

  // Render a shape as SVG
  const renderShape = (shape: Coord[], id: string) => {
    if (!shape || shape.length === 0) return null;

    const minX = Math.min(...shape.map((c) => c.x));
    const maxX = Math.max(...shape.map((c) => c.x));
    const minY = Math.min(...shape.map((c) => c.y));
    const maxY = Math.max(...shape.map((c) => c.y));
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    const blockSize = 30;
    const padding = 10;
    const svgWidth = width * blockSize + padding * 2;
    const svgHeight = height * blockSize + padding * 2;

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        className="mx-auto"
        key={id}
      >
        {shape.map((coord, idx) => (
          <rect
            key={idx}
            x={(coord.x - minX) * blockSize + padding}
            y={(coord.y - minY) * blockSize + padding}
            width={blockSize}
            height={blockSize}
            fill="#fb923c"
            stroke="#ea580c"
            strokeWidth="2"
            rx="3"
          />
        ))}
      </svg>
    );
  };

  const getRating = (score: number) => {
    if (score >= 14) return { label: "Spatial Genius", color: "text-emerald-400" };
    if (score >= 12) return { label: "Excellent", color: "text-green-400" };
    if (score >= 10) return { label: "Above Average", color: "text-blue-400" };
    if (score >= 8) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  const handleChallengeShare = () => {
    const name = challengerName.trim() || "A friend";
    const url = `${window.location.origin}/rotation?c=${encodeChallenge({ name, score: correctCount })}`;
    const text = `${name} scored ${correctCount}/${totalRounds} on the Mental Rotation Test — can you beat it?`;
    track("rotation_challenge_created");
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Mental Rotation Test", text, url }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setChallengeCopied(true);
          setTimeout(() => setChallengeCopied(false), 2500);
        })
        .catch(() => {});
    }
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        {challenge && (
          <div className="mb-4 bg-orange-100 border border-orange-300 rounded-xl p-4">
            <p className="text-orange-700 text-sm font-bold">
              🧠 {challenge.name} scored {challenge.score} on the Mental Rotation Test — can you beat it?
            </p>
          </div>
        )}
        <button
          onClick={startGame}
          className="px-8 py-4 bg-orange-600 text-ink font-bold text-xl rounded-2xl hover:bg-orange-700 transition-colors"
        >
          Start Rotation Test
        </button>
        <p className="text-ink-3 text-sm mt-3">
          Compare two shapes and decide if they are the SAME (rotated) or DIFFERENT. 15 rounds total.
        </p>
      </div>
    );
  }

  if (phase === "playing") {
    const trial = trials[currentRound];
    if (!trial) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-ink-2">
          <span>Round {currentRound + 1}/{totalRounds}</span>
          <span>{correctCount} correct</span>
        </div>

        <div className="bg-paper-2 rounded-2xl p-6 border border-line">
          <p className="text-ink-2 text-sm text-center mb-4">
            Are these the same shape?
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:min-h-[240px]">
            {renderShape(trial.shape1, "shape1")}
            {renderShape(trial.shape2, "shape2")}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleAnswer(true)}
            className="px-8 py-4 bg-green-600 text-ink font-bold text-lg rounded-xl hover:bg-green-700 transition-colors"
          >
            Same
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="px-8 py-4 bg-red-600 text-ink font-bold text-lg rounded-xl hover:bg-red-700 transition-colors"
          >
            Different
          </button>
        </div>
      </div>
    );
  }

  // Result phase
  const avgTime = totalRounds > 0 ? (totalTime / totalRounds / 1000).toFixed(1) : "0.0";
  const rating = getRating(correctCount);
  const vsChallenge = challenge
    ? correctCount > challenge.score
      ? `You scored ${correctCount} — you beat ${challenge.name} by ${correctCount - challenge.score}!`
      : correctCount === challenge.score
      ? `You tied ${challenge.name} at ${correctCount}!`
      : `You scored ${correctCount} — ${challenge.name} wins by ${challenge.score - correctCount}`
    : null;

  return (
    <div className="text-center space-y-6">
      <div className="bg-paper-2 rounded-2xl p-8 border border-line">
        <p className="text-ink-2 text-sm mb-2">Your Spatial Rotation Score</p>
        <p className="text-6xl font-black text-orange-400">
          {correctCount}/{totalRounds}
        </p>
        <p className="text-ink-2 mt-2">Average time: {avgTime}s per decision</p>
        <p className={`text-lg font-bold mt-2 ${rating.color}`}>
          {rating.label}
        </p>
        {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
        {pb.best !== null && !pb.isNewBest && <p className="text-ink-3 text-sm mt-2">Personal Best: {pb.best}/{totalRounds}</p>}
        {vsChallenge && (
          <div className="mt-3 border-t border-line pt-3">
            <p className="text-ink-3 text-xs uppercase tracking-wide font-bold">You vs {challenge!.name}</p>
            <p className="text-orange-700 text-sm font-bold mt-1">{vsChallenge}</p>
          </div>
        )}
      </div>

      <div className="bg-paper-2 rounded-xl p-4 border border-line text-sm text-ink-2">
        <p className="font-bold text-ink mb-2">How You Compare</p>
        <div className="flex justify-between">
          <span>Genius: 14+</span>
          <span>Great: 12+</span>
          <span>Average: 10</span>
          <span>Low: &lt;8</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={startGame}
          className="px-6 py-3 bg-paper-2 text-ink font-bold rounded-xl hover:bg-paper-2 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => {
            const t = `Spatial Rotation Test: I scored ${correctCount}/${totalRounds}! Can you beat me?`;
            if (navigator.share) {
              navigator.share({ text: t }).catch(() => {});
            } else {
              navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
            }
          }}
          className="px-6 py-3 bg-orange-600 text-ink font-bold rounded-xl hover:bg-orange-700 transition-colors"
        >
          Share Score
        </button>
      </div>

      <div className="bg-paper-2 rounded-xl p-4 border border-line">
        {!showChallengeForm ? (
          <button
            onClick={() => setShowChallengeForm(true)}
            className="px-6 py-3 bg-paper text-ink font-bold rounded-xl border border-line hover:bg-paper-2 transition-colors"
          >
            Challenge a Friend
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
            <input
              type="text"
              value={challengerName}
              onChange={(e) => setChallengerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChallengeShare();
              }}
              placeholder="Your name (optional)"
              maxLength={20}
              autoComplete="off"
              className="w-full sm:w-48 px-3 py-2 text-sm bg-paper border border-line rounded-lg text-ink text-center focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={handleChallengeShare}
              className="px-5 py-2 bg-orange-600 text-ink font-bold text-sm rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap"
            >
              Send Challenge
            </button>
          </div>
        )}
        {challengeCopied && (
          <p className="text-emerald-500 text-xs font-bold mt-2">Link copied!</p>
        )}
      </div>

      <ReportUpsell source="rotation" />
    </div>
  );
}
