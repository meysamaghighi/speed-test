"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type RoundType = "dots" | "multiplication" | "comparison";
type Phase = "ready" | "show" | "answer" | "result" | "finished";

interface Round {
  type: RoundType;
  value?: number; // For dots and comparison
  value2?: number; // For comparison second group
  mult1?: number; // For multiplication
  mult2?: number;
  correctAnswer: number;
  choices?: number[]; // Multiple choice for multiplication
}

export default function RapidEstimationTest() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [round, setRound] = useState(1);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [roundStartTime, setRoundStartTime] = useState(0);

  const isFinished = phase === "finished";
  const pb = usePersonalBest("pb-pattern-speed", "higher", isFinished ? score : null);

  const generateRound = useCallback((roundNum: number): Round => {
    const types: RoundType[] = ["dots", "multiplication", "comparison"];
    const type = types[roundNum % 3];

    if (type === "dots") {
      const count = Math.floor(5 + Math.random() * 45); // 5-50 dots
      return { type, value: count, correctAnswer: count };
    } else if (type === "multiplication") {
      const a = Math.floor(10 + Math.random() * 30); // 10-40
      const b = Math.floor(10 + Math.random() * 30);
      const correct = a * b;
      const offset = Math.floor(correct * 0.15);
      const choices = [
        correct,
        correct + offset,
        correct - offset,
        correct + offset * 2,
      ].sort(() => Math.random() - 0.5);
      return { type, mult1: a, mult2: b, correctAnswer: correct, choices };
    } else {
      // comparison
      const count1 = Math.floor(8 + Math.random() * 25); // 8-33
      const count2 = Math.floor(8 + Math.random() * 25);
      return { type, value: count1, value2: count2, correctAnswer: count1 > count2 ? 1 : 2 };
    }
  }, []);

  const startRound = useCallback(() => {
    const newRound = generateRound(round);
    setCurrentRound(newRound);
    setUserAnswer(null);
    setPhase("show");
    setRoundStartTime(Date.now());

    // Auto-advance to answer phase after display time
    const displayTime = newRound.type === "dots" ? 1500 : 2000;
    setTimeout(() => {
      setPhase("answer");
    }, displayTime);
  }, [round, generateRound]);

  const handleAnswer = (answer: number) => {
    if (phase !== "answer" || !currentRound) return;

    const timeTaken = Date.now() - roundStartTime;
    let correct = false;

    if (currentRound.type === "dots") {
      const margin = currentRound.correctAnswer * 0.2; // 20% margin
      correct = Math.abs(answer - currentRound.correctAnswer) <= margin;
    } else if (currentRound.type === "multiplication") {
      correct = answer === currentRound.correctAnswer;
    } else {
      correct = answer === currentRound.correctAnswer;
    }

    if (correct) {
      const timeBonus = Math.max(0, 100 - Math.floor(timeTaken / 100));
      setScore(score + 100 + timeBonus);
    }

    setUserAnswer(answer);
    setPhase("result");

    setTimeout(() => {
      if (round >= 15) {
        setPhase("finished");
      } else {
        setRound(round + 1);
        startRound();
      }
    }, 1000);
  };

  const restart = () => {
    setPhase("ready");
    setRound(1);
    setScore(0);
    setCurrentRound(null);
    setUserAnswer(null);
  };

  // Finished screen
  if (phase === "finished") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Final Score</p>
          <p className="text-6xl font-black text-blue-400">{score}</p>
          <p className="text-gray-400 text-sm mt-2">15 rounds completed</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Estimation Rating</p>
          <div className="grid grid-cols-2 gap-2">
            <span>Beginner: 0-800</span>
            <span>Average: 800-1200</span>
            <span>Good: 1200-1600</span>
            <span>Expert: 1600+</span>
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
              const text = `I scored ${score} on Rapid Estimation Test! Can you beat me?`;
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

  // Ready screen
  if (phase === "ready") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-left text-gray-400 space-y-2">
            <p>- 15 rounds of rapid estimation challenges</p>
            <p>- Count dots, estimate multiplication, compare quantities</p>
            <p>- Answer as quickly and accurately as you can</p>
            <p>- Speed bonus for fast answers</p>
          </div>
        </div>
        <button
          onClick={startRound}
          className="px-8 py-4 bg-blue-600 text-white font-bold text-xl rounded-xl hover:bg-blue-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  if (!currentRound) return null;

  // Show phase
  if (phase === "show") {
    if (currentRound.type === "dots") {
      const dots = Array.from({ length: currentRound.value! }, (_, i) => ({
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
      }));
      return (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-400">
            Round {round}/15 - Score: {score}
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <p className="text-center text-white font-bold mb-4">Count the dots!</p>
            <div className="relative w-full aspect-square max-w-md mx-auto bg-gray-800 rounded-xl">
              {dots.map((dot, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-blue-400 rounded-full"
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else if (currentRound.type === "multiplication") {
      return (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-400">
            Round {round}/15 - Score: {score}
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <p className="text-center text-white font-bold mb-4">Quick estimation!</p>
            <div className="text-center text-5xl font-black text-white">
              {currentRound.mult1} x {currentRound.mult2}
            </div>
          </div>
        </div>
      );
    } else {
      const dots1 = Array.from({ length: currentRound.value! }, (_, i) => ({
        x: Math.random() * 40 + 5,
        y: Math.random() * 90 + 5,
      }));
      const dots2 = Array.from({ length: currentRound.value2! }, (_, i) => ({
        x: Math.random() * 40 + 55,
        y: Math.random() * 90 + 5,
      }));
      return (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-400">
            Round {round}/15 - Score: {score}
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <p className="text-center text-white font-bold mb-4">Which side has more?</p>
            <div className="relative w-full aspect-square max-w-md mx-auto bg-gray-800 rounded-xl">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600" />
              <div className="absolute top-4 left-1/4 text-white font-bold">1</div>
              <div className="absolute top-4 right-1/4 text-white font-bold">2</div>
              {dots1.map((dot, i) => (
                <div
                  key={`1-${i}`}
                  className="absolute w-3 h-3 bg-green-400 rounded-full"
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                />
              ))}
              {dots2.map((dot, i) => (
                <div
                  key={`2-${i}`}
                  className="absolute w-3 h-3 bg-purple-400 rounded-full"
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  // Answer or result phase
  const isCorrect = phase === "result" && userAnswer !== null && (() => {
    if (currentRound.type === "dots") {
      const margin = currentRound.correctAnswer * 0.2;
      return Math.abs(userAnswer - currentRound.correctAnswer) <= margin;
    } else if (currentRound.type === "multiplication") {
      return userAnswer === currentRound.correctAnswer;
    } else {
      return userAnswer === currentRound.correctAnswer;
    }
  })();

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-gray-400">
        Round {round}/15 - Score: {score}
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        {phase === "result" && (
          <p className={`text-center font-bold mb-4 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
            {isCorrect ? "Correct!" : "Wrong!"}
            {currentRound.type === "dots" && ` (Answer: ${currentRound.correctAnswer})`}
          </p>
        )}
        {phase === "answer" && (
          <p className="text-center text-gray-400 mb-4">Your answer?</p>
        )}

        {currentRound.type === "dots" && (
          <div className="space-y-3">
            <input
              type="number"
              placeholder="How many dots?"
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 text-center text-xl"
              autoFocus
              disabled={phase === "result"}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  handleAnswer(parseInt(e.currentTarget.value));
                }
              }}
            />
            {phase === "answer" && (
              <button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value) handleAnswer(parseInt(input.value));
                }}
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            )}
          </div>
        )}

        {currentRound.type === "multiplication" && (
          <div className="grid grid-cols-2 gap-3">
            {currentRound.choices!.map((choice) => (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                disabled={phase === "result"}
                className={`px-6 py-4 text-xl font-bold rounded-xl transition-colors ${
                  phase === "result" && choice === currentRound.correctAnswer
                    ? "bg-green-600 text-white"
                    : phase === "result" && choice === userAnswer
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {choice.toLocaleString()}
              </button>
            ))}
          </div>
        )}

        {currentRound.type === "comparison" && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAnswer(1)}
              disabled={phase === "result"}
              className={`px-6 py-4 text-xl font-bold rounded-xl transition-colors ${
                phase === "result" && 1 === currentRound.correctAnswer
                  ? "bg-green-600 text-white"
                  : phase === "result" && 1 === userAnswer
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Left (1)
            </button>
            <button
              onClick={() => handleAnswer(2)}
              disabled={phase === "result"}
              className={`px-6 py-4 text-xl font-bold rounded-xl transition-colors ${
                phase === "result" && 2 === currentRound.correctAnswer
                  ? "bg-green-600 text-white"
                  : phase === "result" && 2 === userAnswer
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Right (2)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
