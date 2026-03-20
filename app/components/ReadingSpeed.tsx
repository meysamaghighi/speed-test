"use client";

import { useState, useRef, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

const passages = [
  {
    text: "The human brain processes visual information in just 13 milliseconds, making it the fastest organ in the body at interpreting the world around us. This remarkable speed allows us to recognize faces, read signs, and navigate complex environments without conscious effort. Researchers at MIT discovered this by showing participants rapid sequences of images and testing their ability to identify specific objects. The study revealed that our brains can identify images even when they are shown for durations shorter than a single eye fixation. This finding has implications for understanding attention, memory, and how we construct our perception of reality from a constant stream of sensory data.",
    questions: [
      { q: "How fast can the brain process visual information?", options: ["13 milliseconds", "130 milliseconds", "1.3 seconds", "13 seconds"], correct: 0 },
      { q: "Where was the research conducted?", options: ["Harvard", "Stanford", "MIT", "Oxford"], correct: 2 },
      { q: "What did researchers show participants?", options: ["Written text", "Rapid image sequences", "Audio recordings", "Moving objects"], correct: 1 },
    ],
  },
  {
    text: "Coffee is the second most traded commodity in the world after crude oil, generating over $100 billion in revenue annually. The drink originated in Ethiopia, where legend says a goat herder named Kaldi noticed his goats became energetic after eating berries from a certain tree. Today, Brazil produces about one-third of the world's coffee supply, followed by Vietnam and Colombia. The average American drinks about three cups of coffee per day, and studies have linked moderate coffee consumption to reduced risks of several diseases, including Parkinson's, type 2 diabetes, and certain cancers. However, excessive consumption can lead to anxiety, insomnia, and elevated heart rate.",
    questions: [
      { q: "What is the most traded commodity in the world?", options: ["Coffee", "Gold", "Crude oil", "Natural gas"], correct: 2 },
      { q: "Where did coffee originate?", options: ["Brazil", "Colombia", "Vietnam", "Ethiopia"], correct: 3 },
      { q: "How many cups does the average American drink daily?", options: ["One", "Two", "Three", "Five"], correct: 2 },
    ],
  },
  {
    text: "The Great Wall of China is not actually visible from space with the naked eye, despite the popular myth. Astronauts have confirmed that the wall is too narrow to be seen from orbit without aid. The structure stretches over 13,000 miles and was built over many centuries, beginning in the 7th century BC. Contrary to another common belief, the wall is not a single continuous structure but rather a series of walls and fortifications built by various Chinese dynasties. The most well-preserved sections were built during the Ming Dynasty between 1368 and 1644. Today, some sections have deteriorated significantly due to natural erosion and human activity, with estimates suggesting that about 30% of the Ming-era wall has disappeared.",
    questions: [
      { q: "Can the Great Wall be seen from space with the naked eye?", options: ["Yes", "No", "Only at certain times", "Only from the Moon"], correct: 1 },
      { q: "How long is the Great Wall?", options: ["5,000 miles", "8,000 miles", "13,000 miles", "20,000 miles"], correct: 2 },
      { q: "When were the best-preserved sections built?", options: ["7th century BC", "Han Dynasty", "Tang Dynasty", "Ming Dynasty"], correct: 3 },
    ],
  },
];

export default function ReadingSpeed() {
  const pb = usePersonalBest("pb-reading", "higher");
  const [phase, setPhase] = useState<"ready" | "reading" | "quiz" | "result">("ready");
  const [passageIdx, setPassageIdx] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const passage = passages[passageIdx];

  const startReading = () => {
    setPassageIdx(Math.floor(Math.random() * passages.length));
    setPhase("reading");
    setStartTime(performance.now());
    setCurrentQuestion(0);
    setQuizCorrect(0);
  };

  const finishReading = () => {
    const elapsed = performance.now() - startTime;
    setReadingTime(elapsed);
    const wordCount = passage.text.split(/\s+/).length;
    const minutes = elapsed / 60000;
    setWpm(Math.round(wordCount / minutes));
    setPhase("quiz");
    setSelectedAnswer(null);
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const isCorrect = idx === passage.questions[currentQuestion].correct;
    if (isCorrect) setQuizCorrect((c) => c + 1);

    setTimeout(() => {
      if (currentQuestion + 1 >= passage.questions.length) {
        setPhase("result");
      } else {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
      }
    }, 800);
  };

  const getRating = () => {
    // Adjust WPM by comprehension
    const comprehension = quizCorrect / passage.questions.length;
    const adjustedWpm = Math.round(wpm * comprehension);

    if (adjustedWpm >= 400) return { label: "Speed Reader", color: "text-yellow-400" };
    if (adjustedWpm >= 300) return { label: "Fast Reader", color: "text-green-400" };
    if (adjustedWpm >= 200) return { label: "Above Average", color: "text-blue-400" };
    if (adjustedWpm >= 150) return { label: "Average Reader", color: "text-gray-300" };
    return { label: "Careful Reader", color: "text-gray-400" };
  };

  if (phase === "ready") {
    return (
      <div className="text-center">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-lg text-gray-300 mb-4">Read a passage as fast as you can, then answer <strong className="text-white">comprehension questions</strong>.</p>
          <p className="text-sm text-gray-500 mb-6">Your score combines speed AND understanding. Skimming won't help!</p>
          <button onClick={startReading} className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-violet-400 hover:to-purple-400 transition-all">
            Start Reading
          </button>
        </div>
      </div>
    );
  }

  if (phase === "reading") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Reading...</span>
          <Timer startTime={startTime} />
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-lg leading-relaxed text-gray-200">{passage.text}</p>
        </div>
        <div className="text-center">
          <button onClick={finishReading} className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors">
            Done Reading
          </button>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const q = passage.questions[currentQuestion];
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {passage.questions.length}</span>
          <span>{wpm} WPM</span>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-lg font-bold text-white mb-6">{q.q}</p>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let btnClass = "bg-gray-800 border-gray-700 hover:bg-gray-700";
              if (selectedAnswer !== null) {
                if (i === q.correct) btnClass = "bg-green-900 border-green-600";
                else if (i === selectedAnswer) btnClass = "bg-red-900 border-red-600";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl border text-white font-medium transition-colors ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Result
  pb.checkAndSet(wpm);
  const rating = getRating();
  const comprehension = Math.round((quizCorrect / passage.questions.length) * 100);
  return (
    <div className="text-center space-y-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <p className="text-gray-400 text-sm mb-2">Reading Speed</p>
        <p className="text-5xl font-black text-white">{wpm}<span className="text-2xl text-gray-400"> WPM</span></p>
        <p className={`text-xl font-bold mt-2 ${rating.color}`}>{rating.label}</p>
        {pb.isNewBest && <p className="text-yellow-400 font-bold mt-2 animate-pulse">New Personal Best!</p>}
        {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best} WPM</p>}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <p className="text-2xl font-bold text-white">{Math.round(readingTime / 1000)}s</p>
            <p className="text-xs text-gray-500">Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{comprehension}%</p>
            <p className="text-xs text-gray-500">Comprehension</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{quizCorrect}/{passage.questions.length}</p>
            <p className="text-xs text-gray-500">Correct</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={startReading} className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors">
          Try Again
        </button>
        <button
          onClick={() => {
            const text = `Reading Speed: ${wpm} WPM with ${comprehension}% comprehension - ${rating.label} | benchmybrain.com/reading`;
            if (navigator.share) navigator.share({ title: "Reading Speed Test", text });
            else navigator.clipboard.writeText(text);
          }}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  );
}

function Timer({ startTime }: { startTime: number }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setElapsed(Math.round((performance.now() - startTime) / 1000)), 100);
    return () => clearInterval(iv);
  }, [startTime]);
  return <span className="font-mono text-white">{elapsed}s</span>;
}
