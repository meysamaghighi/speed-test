"use client";

import { useState, useRef } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

export default function AudioMemory() {
  const [phase, setPhase] = useState<"ready" | "listening" | "playing" | "done">("ready");
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [lives, setLives] = useState(3);
  const audioContextRef = useRef<AudioContext | null>(null);

  const pb = usePersonalBest("pb-audio-memory", "higher", phase === "done" ? level : null);

  const frequencies = [262, 330, 392, 523, 659]; // C4, E4, G4, C5, E5
  const buttonLabels = ["1", "2", "3", "4", "5"];

  const playTone = (freq: number, duration: number = 300) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.value = 0.3;

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
    osc.stop(ctx.currentTime + duration / 1000);
  };

  const playSequence = async (seq: number[]) => {
    setPhase("listening");
    for (let i = 0; i < seq.length; i++) {
      playTone(frequencies[seq[i]]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    setPhase("playing");
  };

  const startGame = () => {
    setLevel(1);
    setLives(3);
    setUserSequence([]);
    startLevel(1);
  };

  const startLevel = (lvl: number) => {
    const seq = Array.from({ length: lvl + 2 }, () => Math.floor(Math.random() * frequencies.length));
    setSequence(seq);
    setUserSequence([]);
    playSequence(seq);
  };

  const handleToneClick = (index: number) => {
    if (phase !== "playing") return;

    playTone(frequencies[index], 200);
    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    // Check if wrong
    if (sequence[newUserSeq.length - 1] !== index) {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setPhase("done");
      } else {
        setTimeout(() => {
          setUserSequence([]);
          playSequence(sequence);
        }, 1000);
      }
      return;
    }

    // Check if complete
    if (newUserSeq.length === sequence.length) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setTimeout(() => {
        if (newLevel > 10) {
          setPhase("done");
        } else {
          startLevel(newLevel);
        }
      }, 1000);
    }
  };

  const getRating = (lvl: number) => {
    if (lvl >= 8) return { label: "Perfect Pitch", color: "text-emerald-400" };
    if (lvl >= 6) return { label: "Excellent", color: "text-green-400" };
    if (lvl >= 5) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "done") {
    const rating = getRating(level);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Highest Level</p>
          <p className="text-6xl font-black text-violet-400">Level {level}</p>
          <p className="text-gray-400 text-sm mt-2">{level + 2} tones</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>
            {rating.label}
          </p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: Level {pb.best}</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Good: Level 6</span>
            <span>Average: Level 5</span>
            <span>Excellent: Level 8+</span>
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
              const t = `Audio Memory: Level ${level} (${rating.label})! Can you remember more tones?`;
              if (navigator.share) {
                navigator.share({ text: t }).catch(() => {});
              } else {
                navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
              }
            }}
            className="px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors"
          >
            Share Score
          </button>
        </div>
      </div>
    );
  }

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-violet-600 text-white font-bold text-xl rounded-2xl hover:bg-violet-700 transition-colors"
        >
          Start Audio Memory
        </button>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
          Hear a sequence of tones. Repeat by clicking buttons 1-5. Like Simon but with audio. Turn on sound!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Level {level} • {sequence.length} tones</span>
        <span>Lives: {"❤️".repeat(lives)}</span>
      </div>

      <div className="relative w-full h-80 md:h-96 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center">
        {phase === "listening" && (
          <div className="text-center">
            <div className="text-4xl mb-4">🔊</div>
            <p className="text-gray-400 text-lg">Listen...</p>
          </div>
        )}
        {phase === "playing" && (
          <div className="flex flex-col gap-3 w-full max-w-sm px-4">
            <p className="text-gray-400 text-sm text-center mb-2">
              Repeat: {userSequence.length}/{sequence.length}
            </p>
            <div className="grid grid-cols-5 gap-2">
              {buttonLabels.map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => handleToneClick(idx)}
                  className="aspect-square bg-violet-600 hover:bg-violet-500 rounded-xl font-bold text-white text-xl transition-all active:scale-95"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400 text-center">
        {phase === "listening" ? "Memorize the sequence of tones" : "Click buttons to repeat the sequence"}
      </div>
    </div>
  );
}
