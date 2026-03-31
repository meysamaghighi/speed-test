"use client";

import { useState, useCallback } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

const wordList = [
  "apple","bridge","castle","dragon","engine","forest","garden","harbor","island","jungle",
  "knight","lemon","mirror","needle","orange","palace","quartz","ribbon","silver","temple",
  "umbrella","valley","wallet","yellow","zigzag","anchor","bottle","camera","desert","eagle",
  "finger","guitar","hammer","insect","jacket","kitten","ladder","marble","napkin","oyster",
  "pencil","quiver","rocket","saddle","ticket","unlock","velvet","whistle","yogurt","zipper",
  "bamboo","canyon","dolphin","emerald","falcon","glacier","horizon","ivory","jasmine","kernel",
  "lantern","mustard","nucleus","octopus","phantom","quantum","rainbow","saffron","tornado","uniform",
  "volcano","warrior","crystal","diamond","feather","goblin","harvest","illusion","journey","kingdom",
  "leopard","mushroom","neutron","obsidian","paradox","riddle","serpent","thunder","venture","wizard",
];

export default function VerbalMemory() {
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [seenWords, setSeenWords] = useState<Set<string>>(new Set());
  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const pb = usePersonalBest("pb-verbal", "higher", phase === "done" ? score : null);
  const [isNewWord, setIsNewWord] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getNextWord = useCallback((seen: Set<string>, used: Set<number>, currentWord: string) => {
    // 50% chance to show a seen word (if any exist)
    if (seen.size > 0 && Math.random() < 0.5) {
      const arr = Array.from(seen);
      // Filter out the current word to prevent back-to-back duplicates
      const availableSeen = arr.filter(w => w !== currentWord);
      if (availableSeen.length > 0) {
        const word = availableSeen[Math.floor(Math.random() * availableSeen.length)];
        return { word, isNew: false, newUsed: used };
      }
      // If all seen words are the current word, fall through to show a new word
    }
    // Show a new word
    const available = wordList.filter((_, i) => !used.has(i));
    if (available.length === 0) {
      // All words used, recycle
      const recycleList = wordList.filter(w => w !== currentWord);
      if (recycleList.length === 0) {
        // Edge case: only one word exists, return it
        const word = wordList[Math.floor(Math.random() * wordList.length)];
        return { word, isNew: !seen.has(word), newUsed: used };
      }
      const word = recycleList[Math.floor(Math.random() * recycleList.length)];
      return { word, isNew: !seen.has(word), newUsed: used };
    }
    // Filter out current word from available new words
    const availableFiltered = available.filter(w => w !== currentWord);
    const pickFrom = availableFiltered.length > 0 ? availableFiltered : available;
    const idx = wordList.indexOf(pickFrom[Math.floor(Math.random() * pickFrom.length)]);
    const newUsed = new Set(used);
    newUsed.add(idx);
    return { word: wordList[idx], isNew: true, newUsed };
  }, []);

  const startGame = () => {
    const seen = new Set<string>();
    const used = new Set<number>();
    const { word, isNew, newUsed } = getNextWord(seen, used, "");
    setSeenWords(seen);
    setUsedIndices(newUsed);
    setCurrentWord(word);
    setIsNewWord(isNew);
    setScore(0);
    setLives(3);
    setPhase("playing");
    setIsTransitioning(false);
  };

  const handleAnswer = (answeredSeen: boolean) => {
    const correct = answeredSeen ? !isNewWord : isNewWord;

    let newSeen = new Set(seenWords);
    newSeen.add(currentWord);
    setSeenWords(newSeen);

    // Trigger fade-out transition
    setIsTransitioning(true);

    // Wait for fade-out, then update word and fade back in
    setTimeout(() => {
      if (correct) {
        const newScore = score + 1;
        setScore(newScore);
        const { word, isNew, newUsed } = getNextWord(newSeen, usedIndices, currentWord);
        setUsedIndices(newUsed);
        setCurrentWord(word);
        setIsNewWord(isNew);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          if (score > highScore) setHighScore(score);
          setPhase("done");
          return;
        }
        const { word, isNew, newUsed } = getNextWord(newSeen, usedIndices, currentWord);
        setUsedIndices(newUsed);
        setCurrentWord(word);
        setIsNewWord(isNew);
      }

      // Fade back in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 100);
  };

  const getRating = (s: number) => {
    if (s >= 80) return { label: "Incredible", color: "text-emerald-400" };
    if (s >= 50) return { label: "Excellent", color: "text-green-400" };
    if (s >= 30) return { label: "Good", color: "text-blue-400" };
    if (s >= 15) return { label: "Average", color: "text-yellow-400" };
    return { label: "Keep Practicing", color: "text-orange-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <button
          onClick={startGame}
          className="px-8 py-4 bg-indigo-600 text-white font-bold text-xl rounded-2xl hover:bg-indigo-700 transition-colors"
        >
          Start Verbal Memory
        </button>
        <p className="text-gray-500 text-sm mt-3">
          Words appear one at a time. If you have seen the word before, click
          SEEN. If it is new, click NEW. You have 3 lives.
        </p>
        {highScore > 0 && (
          <p className="text-indigo-400 font-bold mt-2">Best: {highScore} points</p>
        )}
      </div>
    );
  }

  if (phase === "done") {
    const rating = getRating(score);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Verbal Memory Score</p>
          <p className="text-6xl font-black text-indigo-400">{score}</p>
          <p className="text-gray-400 mt-1">words correct</p>
          <p className={`text-lg font-bold mt-2 ${rating.color}`}>{rating.label}</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best}</p>}
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="flex justify-between">
            <span>Top: 80+</span>
            <span>Great: 50+</span>
            <span>Average: 30</span>
            <span>Low: &lt;15</span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={startGame} className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors">Try Again</button>
          <button
            onClick={() => {
              const t = `Verbal Memory: ${score} words correct (${rating.label})! Test your word memory!`;
              if (navigator.share) navigator.share({ text: t }).catch(() => {});
              else navigator.clipboard.writeText(t).then(() => alert("Copied!")).catch(() => {});
            }}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >Share Score</button>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Score: <span className="text-white font-bold">{score}</span></span>
        <span>{"♥".repeat(lives)}{"♡".repeat(3 - lives)}</span>
      </div>

      <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 text-center">
        <p
          className="text-4xl md:text-5xl font-black text-white transition-opacity duration-100"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {currentWord}
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleAnswer(false)}
          className="flex-1 max-w-xs py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-colors"
        >
          NEW
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="flex-1 max-w-xs py-4 bg-orange-600 text-white font-bold text-lg rounded-xl hover:bg-orange-700 transition-colors"
        >
          SEEN
        </button>
      </div>
    </div>
  );
}
