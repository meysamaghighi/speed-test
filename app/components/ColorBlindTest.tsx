"use client";

import { useState, useMemo } from "react";

interface Plate {
  number: number;
  bgDots: string; // hex color for background dots
  fgDots: string; // hex color for number dots
  confusedWith?: number; // what colorblind people see
  type: string; // which deficiency it tests
}

const plates: Plate[] = [
  { number: 12, bgDots: "#8B9467", fgDots: "#D4583C", type: "demo" },
  { number: 8, bgDots: "#C56640", fgDots: "#6BA050", type: "red-green" },
  { number: 6, bgDots: "#7DB05D", fgDots: "#D64A48", type: "red-green" },
  { number: 29, bgDots: "#D46040", fgDots: "#78B058", type: "red-green" },
  { number: 5, bgDots: "#C56640", fgDots: "#68A04C", type: "red-green" },
  { number: 3, bgDots: "#7DB05D", fgDots: "#E47840", type: "red-green" },
  { number: 15, bgDots: "#D65050", fgDots: "#68A04C", type: "red-green" },
  { number: 74, bgDots: "#7DB05D", fgDots: "#D4583C", type: "red-green" },
  { number: 45, bgDots: "#E47840", fgDots: "#68A04C", type: "red-green" },
  { number: 7, bgDots: "#D65050", fgDots: "#90C058", type: "red-green" },
  { number: 16, bgDots: "#7DB05D", fgDots: "#C56640", type: "red-green" },
  { number: 2, bgDots: "#C88850", fgDots: "#3A8CB8", type: "blue-yellow" },
];

function generateDots(
  plate: Plate,
  width: number,
  height: number
): { x: number; y: number; r: number; color: string }[] {
  const dots: { x: number; y: number; r: number; color: string }[] = [];
  const cx = width / 2;
  const cy = height / 2;
  const plateRadius = Math.min(width, height) / 2 - 5;

  // Seeded random based on plate number for consistency
  let seed = plate.number * 1000 + 42;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  };

  // Build digit mask
  const numStr = plate.number.toString();
  const isInDigit = (x: number, y: number): boolean => {
    // Scale to a virtual grid
    const totalWidth = numStr.length * 60;
    const gx = ((x - cx) / plateRadius) * 120 + totalWidth / 2;
    const gy = ((y - cy) / plateRadius) * 120 + 40;

    for (let i = 0; i < numStr.length; i++) {
      const digit = numStr[i];
      const ox = i * 60;
      if (isDigitPixel(digit, gx - ox, gy)) return true;
    }
    return false;
  };

  // Place dots
  for (let i = 0; i < 800; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * plateRadius;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    const r = 3 + rand() * 6;
    const inDigit = isInDigit(x, y);
    const baseColor = inDigit ? plate.fgDots : plate.bgDots;

    // Add slight color variation
    dots.push({ x, y, r, color: varyColor(baseColor, rand) });
  }

  return dots;
}

function varyColor(hex: string, rand: () => number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const vary = (v: number) => Math.max(0, Math.min(255, v + Math.floor((rand() - 0.5) * 24)));
  return `rgb(${vary(r)},${vary(g)},${vary(b)})`;
}

function isDigitPixel(digit: string, x: number, y: number): boolean {
  // Simple 5x7 bitmap font for digits
  const bitmaps: Record<string, string[]> = {
    "0": [" ### ", "#   #", "#   #", "#   #", "#   #", "#   #", " ### "],
    "1": ["  #  ", " ##  ", "  #  ", "  #  ", "  #  ", "  #  ", " ### "],
    "2": [" ### ", "#   #", "    #", "  ## ", " #   ", "#    ", "#####"],
    "3": [" ### ", "#   #", "    #", "  ## ", "    #", "#   #", " ### "],
    "4": ["   # ", "  ## ", " # # ", "#  # ", "#####", "   # ", "   # "],
    "5": ["#####", "#    ", "#### ", "    #", "    #", "#   #", " ### "],
    "6": [" ### ", "#    ", "#### ", "#   #", "#   #", "#   #", " ### "],
    "7": ["#####", "    #", "   # ", "  #  ", " #   ", " #   ", " #   "],
    "8": [" ### ", "#   #", "#   #", " ### ", "#   #", "#   #", " ### "],
    "9": [" ### ", "#   #", "#   #", " ####", "    #", "   # ", " ##  "],
  };

  const bitmap = bitmaps[digit];
  if (!bitmap) return false;

  const cellW = 60 / 5;
  const cellH = 80 / 7;
  const col = Math.floor(x / cellW);
  const row = Math.floor(y / cellH);

  if (row < 0 || row >= 7 || col < 0 || col >= 5) return false;
  return bitmap[row]?.[col] === "#";
}

export default function ColorBlindTest() {
  const [currentPlate, setCurrentPlate] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState<{ plate: number; correct: boolean }[]>([]);
  const [phase, setPhase] = useState<"testing" | "result">("testing");

  const plate = plates[currentPlate];
  const dots = useMemo(() => generateDots(plate, 280, 280), [currentPlate]);

  const handleSubmit = () => {
    const userNum = parseInt(answer.trim());
    const correct = userNum === plate.number;
    const newResults = [...results, { plate: plate.number, correct }];
    setResults(newResults);
    setAnswer("");

    if (currentPlate + 1 >= plates.length) {
      setPhase("result");
    } else {
      setCurrentPlate(currentPlate + 1);
    }
  };

  const correctCount = results.filter((r) => r.correct).length;
  const total = results.length;

  const getRating = () => {
    const pct = correctCount / plates.length;
    if (pct >= 0.83) return { label: "Normal Color Vision", color: "text-green-400", desc: "You identified all or nearly all plates correctly. Your color vision appears normal." };
    if (pct >= 0.67) return { label: "Mild Deficiency", color: "text-yellow-400", desc: "You missed a few plates. You may have a mild color vision deficiency. Consider a professional eye exam." };
    if (pct >= 0.42) return { label: "Moderate Deficiency", color: "text-orange-400", desc: "You missed several plates. This suggests a moderate color vision deficiency. We recommend seeing an eye care professional." };
    return { label: "Significant Deficiency", color: "text-red-400", desc: "You missed many plates. This may indicate a significant color vision deficiency. Please consult an eye care professional for proper diagnosis." };
  };

  const reset = () => {
    setCurrentPlate(0);
    setAnswer("");
    setResults([]);
    setPhase("testing");
  };

  if (phase === "result") {
    const rating = getRating();
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Result</p>
          <p className={`text-3xl font-black ${rating.color}`}>{rating.label}</p>
          <p className="text-5xl font-black text-white mt-4">{correctCount}/{plates.length}</p>
          <p className="text-gray-400 mt-1">plates identified correctly</p>
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">{rating.desc}</p>
          <p className="text-xs text-gray-600 mt-4">This is a screening tool, not a medical diagnosis. See an eye care professional for definitive testing.</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors">
            Try Again
          </button>
          <button
            onClick={() => {
              const text = `Color Vision Test: ${correctCount}/${plates.length} - ${rating.label} | benchmybrain.com/color-blind`;
              if (navigator.share) {
                navigator.share({ title: "Color Vision Test", text });
              } else {
                navigator.clipboard.writeText(text);
              }
            }}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
        <span>Plate {currentPlate + 1} of {plates.length}</span>
        <span>{correctCount} correct so far</span>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 inline-block">
        <svg width="280" height="280" viewBox="0 0 280 280" className="rounded-full">
          <circle cx="140" cy="140" r="138" fill="#e8e4d8" />
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.color} />
          ))}
        </svg>
      </div>

      <div className="space-y-3">
        <p className="text-gray-300">What number do you see?</p>
        <div className="flex gap-3 justify-center">
          <input
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && answer.trim() && handleSubmit()}
            placeholder="Type number..."
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-center text-lg w-40 focus:outline-none focus:border-gray-500"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-30"
          >
            Next
          </button>
        </div>
        <button
          onClick={() => { setAnswer("0"); handleSubmit(); }}
          className="text-sm text-gray-500 hover:text-gray-300"
        >
          I can't see a number
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
          style={{ width: `${((currentPlate) / plates.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
