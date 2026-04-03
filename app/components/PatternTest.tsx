"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type PatternType = "number" | "color" | "size" | "shape" | "letter";

interface Pattern {
  type: PatternType;
  sequence: string[];
  correctAnswer: string;
  wrongOptions: string[];
}

// Color palette for visual patterns
const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#f97316", "#ec4899", "#06b6d4"];
const shapes = ["circle", "square", "triangle"];

function generateNumberPattern(difficulty: number): Pattern {
  const patterns = [
    // Addition patterns
    () => {
      const start = Math.floor(Math.random() * 5) + 1;
      const step = difficulty <= 4 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 5) + 3;
      const seq = [start, start + step, start + step * 2, start + step * 3];
      const answer = start + step * 4;
      return { seq, answer };
    },
    // Multiplication patterns
    () => {
      const start = Math.floor(Math.random() * 3) + 2;
      const mult = 2;
      const seq = [start, start * mult, start * mult * mult, start * mult * mult * mult];
      const answer = start * mult * mult * mult * mult;
      return { seq, answer };
    },
    // Squares
    () => {
      const start = difficulty <= 6 ? 1 : 2;
      const seq = [start, start + 1, start + 2, start + 3].map(n => n * n);
      const answer = (start + 4) * (start + 4);
      return { seq, answer };
    },
    // Fibonacci-like
    () => {
      const a = Math.floor(Math.random() * 3) + 1;
      const b = Math.floor(Math.random() * 3) + 2;
      const seq = [a, b, a + b, a + 2 * b];
      const answer = 2 * a + 3 * b;
      return { seq, answer };
    },
    // Alternating add/subtract
    () => {
      const start = Math.floor(Math.random() * 5) + 10;
      const add = Math.floor(Math.random() * 3) + 3;
      const sub = Math.floor(Math.random() * 2) + 1;
      const seq = [start, start + add, start + add - sub, start + add - sub + add];
      const answer = start + add - sub + add - sub;
      return { seq, answer };
    },
    // Fibonacci true sequence - variation 1
    () => {
      const seq = [1, 1, 2, 3];
      const answer = 5;
      return { seq, answer };
    },
    // Fibonacci true sequence - variation 2
    () => {
      const seq = [2, 3, 5, 8];
      const answer = 13;
      return { seq, answer };
    },
    // Fibonacci true sequence - variation 3
    () => {
      const seq = [1, 2, 3, 5];
      const answer = 8;
      return { seq, answer };
    },
    // Alternating operations: multiply then subtract - variation 1
    () => {
      const seq = [2, 6, 4, 12];
      const answer = 10;
      return { seq, answer };
    },
    // Alternating operations: multiply then subtract - variation 2
    () => {
      const seq = [3, 9, 7, 21];
      const answer = 19;
      return { seq, answer };
    },
    // Alternating operations: multiply then subtract - variation 3
    () => {
      const seq = [4, 12, 10, 30];
      const answer = 28;
      return { seq, answer };
    },
    // Mirror/palindrome pattern - variation 1
    () => {
      const seq = [1, 3, 5, 7];
      const answer = 5;
      return { seq, answer };
    },
    // Mirror/palindrome pattern - variation 2
    () => {
      const seq = [2, 4, 6, 8];
      const answer = 6;
      return { seq, answer };
    },
    // Mirror/palindrome pattern - variation 3
    () => {
      const seq = [10, 20, 30, 40];
      const answer = 30;
      return { seq, answer };
    },
    // Cubes - variation 1
    () => {
      const seq = [1, 8, 27, 64];
      const answer = 125;
      return { seq, answer };
    },
    // Cubes - variation 2
    () => {
      const seq = [8, 27, 64, 125];
      const answer = 216;
      return { seq, answer };
    },
    // Powers of 2
    () => {
      const seq = [2, 4, 8, 16];
      const answer = 32;
      return { seq, answer };
    },
    // Powers of 3
    () => {
      const seq = [3, 9, 27, 81];
      const answer = 243;
      return { seq, answer };
    },
    // Geometric with offset: prev*2+1 - variation 1
    () => {
      const seq = [3, 7, 15, 31];
      const answer = 63;
      return { seq, answer };
    },
    // Geometric with offset: prev*2+1 - variation 2
    () => {
      const seq = [1, 3, 7, 15];
      const answer = 31;
      return { seq, answer };
    },
    // Geometric with offset: prev*3+1 - variation 3
    () => {
      const seq = [1, 4, 13, 40];
      const answer = 121;
      return { seq, answer };
    },
    // Prime numbers - variation 1
    () => {
      const seq = [2, 3, 5, 7];
      const answer = 11;
      return { seq, answer };
    },
    // Prime numbers - variation 2
    () => {
      const seq = [3, 5, 7, 11];
      const answer = 13;
      return { seq, answer };
    },
    // Prime numbers - variation 3
    () => {
      const seq = [5, 7, 11, 13];
      const answer = 17;
      return { seq, answer };
    },
    // Triangular numbers
    () => {
      const seq = [1, 3, 6, 10];
      const answer = 15;
      return { seq, answer };
    },
  ];

  const patternFn = patterns[Math.floor(Math.random() * Math.min(patterns.length, 3 + Math.floor(difficulty / 3)))];
  const { seq, answer } = patternFn();

  // Generate wrong options
  const wrongOptions: string[] = [];
  const answerNum = answer;
  const offsets = [-3, -2, -1, 1, 2, 3, Math.floor(answerNum * 0.5), Math.floor(answerNum * 1.5)];

  for (const offset of offsets) {
    const wrong = answerNum + offset;
    if (wrong !== answerNum && wrong > 0 && !wrongOptions.includes(String(wrong))) {
      wrongOptions.push(String(wrong));
      if (wrongOptions.length >= 3) break;
    }
  }

  return {
    type: "number",
    sequence: seq.map(String),
    correctAnswer: String(answer),
    wrongOptions,
  };
}

function generateLetterPattern(difficulty: number): Pattern {
  const patterns = [
    // Skip by 2: A, C, E, G
    () => {
      const seq = ["A", "C", "E", "G"];
      const answer = "I";
      return { seq, answer };
    },
    // Skip by 2: B, D, F, H
    () => {
      const seq = ["B", "D", "F", "H"];
      const answer = "J";
      return { seq, answer };
    },
    // Skip by 2: C, E, G, I
    () => {
      const seq = ["C", "E", "G", "I"];
      const answer = "K";
      return { seq, answer };
    },
    // Skip by 3: A, D, G, J
    () => {
      const seq = ["A", "D", "G", "J"];
      const answer = "M";
      return { seq, answer };
    },
    // Skip by 3: B, E, H, K
    () => {
      const seq = ["B", "E", "H", "K"];
      const answer = "N";
      return { seq, answer };
    },
    // Reverse skip by 2: Z, X, V, T
    () => {
      const seq = ["Z", "X", "V", "T"];
      const answer = "R";
      return { seq, answer };
    },
    // Skip by 4: A, E, I, M
    () => {
      const seq = ["A", "E", "I", "M"];
      const answer = "Q";
      return { seq, answer };
    },
    // Skip by 1 (consecutive): C, D, E, F
    () => {
      const seq = ["C", "D", "E", "F"];
      const answer = "G";
      return { seq, answer };
    },
  ];

  const { seq, answer } = patterns[Math.floor(Math.random() * patterns.length)]();

  // Generate wrong options
  const wrongOptions: string[] = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const answerIndex = alphabet.indexOf(answer);

  // Try common mistakes: answer-1, answer+1, answer-2, answer+2
  const offsets = [-2, -1, 1, 2, -3, 3];
  for (const offset of offsets) {
    const wrongIndex = answerIndex + offset;
    if (wrongIndex >= 0 && wrongIndex < alphabet.length) {
      const wrong = alphabet[wrongIndex];
      if (wrong !== answer && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
        if (wrongOptions.length >= 3) break;
      }
    }
  }

  // If we don't have enough, add random letters
  while (wrongOptions.length < 3) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (randomLetter !== answer && !wrongOptions.includes(randomLetter)) {
      wrongOptions.push(randomLetter);
    }
  }

  return {
    type: "letter",
    sequence: seq,
    correctAnswer: answer,
    wrongOptions,
  };
}

function generateColorPattern(difficulty: number): Pattern {
  const patternLength = 4;
  const sequence: string[] = [];

  if (difficulty <= 4) {
    // Simple repeating pattern: A B A B
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    let c2 = colors[Math.floor(Math.random() * colors.length)];
    while (c2 === c1) c2 = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(c1, c2, c1, c2);
    const answer = c1;

    const wrongOptions = colors.filter(c => c !== answer).slice(0, 3);
    return { type: "color", sequence, correctAnswer: answer, wrongOptions };
  } else if (difficulty <= 8) {
    // Three-color rotation: A B C A
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    let c2 = colors[Math.floor(Math.random() * colors.length)];
    while (c2 === c1) c2 = colors[Math.floor(Math.random() * colors.length)];
    let c3 = colors[Math.floor(Math.random() * colors.length)];
    while (c3 === c1 || c3 === c2) c3 = colors[Math.floor(Math.random() * colors.length)];

    sequence.push(c1, c2, c3, c1);
    const answer = c2;

    const wrongOptions = colors.filter(c => c !== answer).slice(0, 3);
    return { type: "color", sequence, correctAnswer: answer, wrongOptions };
  } else {
    // Advancing pattern: shifts by one each time
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    const start = Math.floor(Math.random() * (shuffled.length - 4));
    sequence.push(shuffled[start], shuffled[start + 1], shuffled[start + 2], shuffled[start + 3]);
    const answer = shuffled[start + 4] || shuffled[0];

    const wrongOptions = shuffled.filter(c => c !== answer).slice(0, 3);
    return { type: "color", sequence, correctAnswer: answer, wrongOptions };
  }
}

function generateSizePattern(difficulty: number): Pattern {
  // Sizes: small, medium, large (represented as numbers 1, 2, 3)
  const sizes = [1, 2, 3];
  const sizeNames = ["small", "medium", "large"];

  if (difficulty <= 6) {
    // Growing: 1 2 3 1
    const seq = [1, 2, 3, 1];
    const answer = 2;
    const wrongOptions = [1, 3];

    return {
      type: "size",
      sequence: seq.map(s => sizeNames[s - 1]),
      correctAnswer: sizeNames[answer - 1],
      wrongOptions: wrongOptions.map(s => sizeNames[s - 1]),
    };
  } else {
    // Shrinking: 3 2 1 3
    const seq = [3, 2, 1, 3];
    const answer = 2;
    const wrongOptions = [1, 3];

    return {
      type: "size",
      sequence: seq.map(s => sizeNames[s - 1]),
      correctAnswer: sizeNames[answer - 1],
      wrongOptions: wrongOptions.map(s => sizeNames[s - 1]),
    };
  }
}

function generateShapePattern(difficulty: number): Pattern {
  if (difficulty <= 6) {
    // Simple alternating: circle square circle square
    const s1 = shapes[Math.floor(Math.random() * shapes.length)];
    let s2 = shapes[Math.floor(Math.random() * shapes.length)];
    while (s2 === s1) s2 = shapes[Math.floor(Math.random() * shapes.length)];

    const seq = [s1, s2, s1, s2];
    const answer = s1;
    const wrongOptions = shapes.filter(s => s !== answer);

    return { type: "shape", sequence: seq, correctAnswer: answer, wrongOptions };
  } else {
    // Rotating: circle square triangle circle
    const shuffled = [...shapes].sort(() => Math.random() - 0.5);
    const seq = [shuffled[0], shuffled[1], shuffled[2], shuffled[0]];
    const answer = shuffled[1];
    const wrongOptions = shuffled.filter(s => s !== answer);

    return { type: "shape", sequence: seq, correctAnswer: answer, wrongOptions };
  }
}

function generatePattern(round: number): Pattern {
  const difficulty = round + 1;
  const types: PatternType[] = ["number", "letter", "color", "size", "shape"];

  // Bias toward numbers and letters early, introduce visual patterns later
  let type: PatternType;
  if (round < 3) {
    type = Math.random() < 0.7 ? "number" : "letter";
  } else if (round < 6) {
    type = Math.random() < 0.5 ? "number" : types[Math.floor(Math.random() * types.length)];
  } else {
    type = types[Math.floor(Math.random() * types.length)];
  }

  switch (type) {
    case "number":
      return generateNumberPattern(difficulty);
    case "letter":
      return generateLetterPattern(difficulty);
    case "color":
      return generateColorPattern(difficulty);
    case "size":
      return generateSizePattern(difficulty);
    case "shape":
      return generateShapePattern(difficulty);
  }
}

export default function PatternTest() {
  const [phase, setPhase] = useState<"ready" | "playing" | "result">("ready");
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const pb = usePersonalBest("pb-pattern", "higher", phase === "result" ? score : null);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [options, setOptions] = useState<string[]>([]);
  const totalRounds = 12;

  const startGame = () => {
    setPhase("playing");
    setRound(0);
    setScore(0);
    nextRound(0);
  };

  const nextRound = useCallback((roundNum: number) => {
    const p = generatePattern(roundNum);
    setPattern(p);
    setTimeLeft(15);
    setFeedback(null);

    // Shuffle options
    const allOptions = [p.correctAnswer, ...p.wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, []);

  useEffect(() => {
    if (phase === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === "playing" && timeLeft === 0) {
      // Time's up - wrong answer
      handleAnswer("");
    }
  }, [phase, timeLeft]);

  const handleAnswer = (answer: string) => {
    if (feedback !== null) return;

    const isCorrect = answer === pattern?.correctAnswer;
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextRoundNum = round + 1;
      if (nextRoundNum >= totalRounds) {
        setPhase("result");
      } else {
        setRound(nextRoundNum);
        nextRound(nextRoundNum);
      }
    }, 800);
  };

  const getRating = (s: number) => {
    if (s >= 11) return { label: "Pattern Genius", color: "text-emerald-400" };
    if (s >= 9) return { label: "Excellent", color: "text-green-400" };
    if (s >= 7) return { label: "Above Average", color: "text-blue-400" };
    if (s >= 5) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  const renderSequenceItem = (item: string, index: number) => {
    if (!pattern) return null;

    if (pattern.type === "number" || pattern.type === "letter") {
      return (
        <div key={index} className="bg-gray-800 rounded-xl px-4 py-4 min-w-[60px] sm:min-w-[80px] sm:px-6 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-black text-white">{item}</span>
        </div>
      );
    }

    if (pattern.type === "color") {
      return (
        <div
          key={index}
          className="rounded-xl w-20 h-20"
          style={{ backgroundColor: item }}
        />
      );
    }

    if (pattern.type === "size") {
      const sizes = { small: 40, medium: 60, large: 80 };
      const size = sizes[item as keyof typeof sizes];
      return (
        <div key={index} className="flex items-center justify-center w-20 h-20">
          <div
            className="bg-rose-500 rounded-full"
            style={{ width: size, height: size }}
          />
        </div>
      );
    }

    if (pattern.type === "shape") {
      return (
        <div key={index} className="flex items-center justify-center w-20 h-20">
          {item === "circle" && <div className="w-16 h-16 bg-rose-500 rounded-full" />}
          {item === "square" && <div className="w-16 h-16 bg-rose-500 rounded-lg" />}
          {item === "triangle" && (
            <div className="w-0 h-0 border-l-[32px] border-r-[32px] border-b-[56px] border-l-transparent border-r-transparent border-b-rose-500" />
          )}
        </div>
      );
    }
  };

  const renderOption = (option: string) => {
    if (!pattern) return null;

    if (pattern.type === "number" || pattern.type === "letter") {
      return <span className="text-2xl font-black">{option}</span>;
    }

    if (pattern.type === "color") {
      return (
        <div className="w-12 h-12 rounded-lg mx-auto" style={{ backgroundColor: option }} />
      );
    }

    if (pattern.type === "size") {
      const sizes = { small: 30, medium: 45, large: 60 };
      const size = sizes[option as keyof typeof sizes];
      return (
        <div className="flex items-center justify-center h-16">
          <div
            className="bg-rose-500 rounded-full"
            style={{ width: size, height: size }}
          />
        </div>
      );
    }

    if (pattern.type === "shape") {
      return (
        <div className="flex items-center justify-center h-16">
          {option === "circle" && <div className="w-12 h-12 bg-rose-500 rounded-full" />}
          {option === "square" && <div className="w-12 h-12 bg-rose-500 rounded-lg" />}
          {option === "triangle" && (
            <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[42px] border-l-transparent border-r-transparent border-b-rose-500" />
          )}
        </div>
      );
    }
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-rose-600 text-white font-bold text-xl rounded-2xl hover:bg-rose-700 transition-colors"
        >
          Start Pattern Test
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Identify the next item in each pattern. Tests logical reasoning and pattern recognition.
        </p>
      </div>
    );
  }

  if (phase === "result") {
    const rating = getRating(score);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Pattern Recognition</p>
          <p className="text-6xl font-black text-rose-400">
            {score}/{totalRounds}
          </p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}/{totalRounds}</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Genius: 11+</span>
            <span>Great: 9+</span>
            <span>Average: 7</span>
            <span>Low: &lt;5</span>
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
              const t = `Pattern Recognition: ${score}/${totalRounds} correct! Can you beat my score?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Question {round + 1} / {totalRounds}</span>
        <span className={`font-mono text-lg font-bold ${timeLeft <= 5 ? "text-red-400" : "text-white"}`}>
          {timeLeft}s
        </span>
        <span>Score: <span className="text-white font-bold">{score}</span></span>
      </div>

      <div className="bg-gray-900 rounded-2xl p-4 sm:p-8 border border-gray-800">
        <p className="text-gray-400 text-sm mb-4">What comes next?</p>
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 overflow-x-auto">
          {pattern?.sequence.map((item, i) => renderSequenceItem(item, i))}
          <div className="text-3xl sm:text-4xl font-black text-gray-600">?</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          let bg = "bg-gray-800 hover:bg-gray-700";
          if (feedback !== null) {
            if (opt === pattern?.correctAnswer) bg = "bg-emerald-700";
            else if (feedback === "wrong") bg = "bg-gray-800 opacity-50";
          }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={feedback !== null}
              className={`py-4 text-white font-bold text-lg rounded-xl transition-colors ${bg}`}
            >
              {renderOption(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
