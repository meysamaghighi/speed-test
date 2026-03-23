"use client";

import { useState, useEffect, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "waiting" | "playing" | "result";
type Emotion = "happy" | "sad" | "angry" | "surprised" | "disgusted" | "fearful" | "neutral";

interface Emoji {
  emoji: string;
  emotion: Emotion;
}

const EMOJIS: Emoji[] = [
  { emoji: "😀", emotion: "happy" },
  { emoji: "😃", emotion: "happy" },
  { emoji: "😄", emotion: "happy" },
  { emoji: "😊", emotion: "happy" },
  { emoji: "☹️", emotion: "sad" },
  { emoji: "😢", emotion: "sad" },
  { emoji: "😭", emotion: "sad" },
  { emoji: "😞", emotion: "sad" },
  { emoji: "😠", emotion: "angry" },
  { emoji: "😡", emotion: "angry" },
  { emoji: "🤬", emotion: "angry" },
  { emoji: "😤", emotion: "angry" },
  { emoji: "😲", emotion: "surprised" },
  { emoji: "😮", emotion: "surprised" },
  { emoji: "😯", emotion: "surprised" },
  { emoji: "😱", emotion: "surprised" },
  { emoji: "🤢", emotion: "disgusted" },
  { emoji: "🤮", emotion: "disgusted" },
  { emoji: "😖", emotion: "disgusted" },
  { emoji: "😣", emotion: "disgusted" },
  { emoji: "😨", emotion: "fearful" },
  { emoji: "😰", emotion: "fearful" },
  { emoji: "😱", emotion: "fearful" },
  { emoji: "😧", emotion: "fearful" },
  { emoji: "😐", emotion: "neutral" },
  { emoji: "😑", emotion: "neutral" },
  { emoji: "😶", emotion: "neutral" },
  { emoji: "😏", emotion: "neutral" },
];

const EMOTION_LABELS: Record<Emotion, string> = {
  happy: "Happy",
  sad: "Sad",
  angry: "Angry",
  surprised: "Surprised",
  disgusted: "Disgusted",
  fearful: "Fearful",
  neutral: "Neutral",
};

interface Round {
  emoji: Emoji;
  userAnswer: Emotion | null;
  correct: boolean;
  reactionTime: number; // ms
}

export default function EmotionTest() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentEmoji, setCurrentEmoji] = useState<Emoji | null>(null);
  const [startTime, setStartTime] = useState(0);

  const totalRounds = 20;
  const currentRound = rounds.length;

  const correctCount = rounds.filter((r) => r.correct).length;
  const accuracy = rounds.length > 0 ? (correctCount / rounds.length) * 100 : 0;
  const avgReactionTime =
    rounds.length > 0
      ? rounds.reduce((sum, r) => sum + r.reactionTime, 0) / rounds.length
      : 0;

  // Score = accuracy (0-100) - penalty for slow reactions
  const timePenalty = Math.max(0, (avgReactionTime - 1000) / 100); // -1 per 100ms over 1s
  const score = Math.max(0, Math.round(accuracy - timePenalty));

  const isFinished = rounds.length === totalRounds && phase === "result";
  const pb = usePersonalBest("pb-emotion", "higher", isFinished ? score : null);

  const shuffle = (arr: Emoji[]): Emoji[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const nextRound = useCallback(() => {
    if (rounds.length >= totalRounds) {
      setPhase("result");
      return;
    }

    const shuffled = shuffle(EMOJIS);
    const emoji = shuffled[0];
    setCurrentEmoji(emoji);
    setStartTime(performance.now());
  }, [rounds]);

  const handleAnswer = (answer: Emotion) => {
    if (!currentEmoji || phase !== "playing") return;

    const reactionTime = performance.now() - startTime;
    const correct = answer === currentEmoji.emotion;

    const newRound: Round = {
      emoji: currentEmoji,
      userAnswer: answer,
      correct,
      reactionTime,
    };

    const newRounds = [...rounds, newRound];
    setRounds(newRounds);

    if (newRounds.length >= totalRounds) {
      setPhase("result");
    } else {
      // Brief delay before next emoji
      setTimeout(() => {
        nextRound();
      }, 300);
    }
  };

  const startTest = () => {
    setRounds([]);
    setPhase("playing");
    nextRound();
  };

  const restart = () => {
    setPhase("waiting");
    setRounds([]);
    setCurrentEmoji(null);
    setStartTime(0);
  };

  const getRating = (sc: number) => {
    if (sc >= 95) return { label: "Elite Recognition", color: "text-emerald-400" };
    if (sc >= 85) return { label: "Excellent", color: "text-green-400" };
    if (sc >= 70) return { label: "Good", color: "text-yellow-400" };
    if (sc >= 50) return { label: "Average", color: "text-orange-400" };
    return { label: "Needs Practice", color: "text-red-400" };
  };

  // Result screen
  if (phase === "result") {
    const rating = getRating(score);

    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Emotion Recognition Score</p>
          <p className="text-6xl font-black text-purple-400">{score}</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && (
            <p className="text-yellow-400 font-bold mt-2 animate-pulse">
              New Personal Best!
            </p>
          )}
          {pb.best !== null && !pb.isNewBest && (
            <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-2xl font-black text-green-400">{correctCount}/20</p>
            <p className="text-xs text-gray-500">Correct</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-2xl font-black text-blue-400">{accuracy.toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Accuracy</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-2xl font-black text-cyan-400">{avgReactionTime.toFixed(0)}ms</p>
            <p className="text-xs text-gray-500">Avg Time</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">Scoring</p>
          <p>Score = Accuracy % - time penalty</p>
          <p className="text-xs mt-2 text-gray-500">
            Fast & accurate = higher score. Over 1s reaction time reduces score.
          </p>
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
              const text = `I scored ${score}/100 on Emotion Recognition Test (${rating.label}, ${accuracy.toFixed(0)}% accuracy)! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ text }).catch(() => {});
              } else {
                navigator.clipboard
                  .writeText(text)
                  .then(() => alert("Copied!"))
                  .catch(() => {});
              }
            }}
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  // Waiting screen
  if (phase === "waiting") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-4xl mb-4">😊</p>
          <p className="text-gray-300 mb-4">
            An emoji face will appear. Identify the emotion as quickly and accurately as possible.
          </p>
          <p className="text-sm text-gray-500">
            20 rounds. Speed and accuracy both matter.
          </p>
        </div>

        <button
          onClick={startTest}
          className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors text-lg"
        >
          Start Test
        </button>
      </div>
    );
  }

  // Playing phase
  if (phase === "playing" && currentEmoji) {
    const emotions: Emotion[] = ["happy", "sad", "angry", "surprised", "disgusted", "fearful", "neutral"];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Round {currentRound + 1}/{totalRounds}
          </p>
          <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 mb-6">
            <p className="text-9xl">{currentEmoji.emoji}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() => handleAnswer(emotion)}
              className="px-4 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors"
            >
              {EMOTION_LABELS[emotion]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
