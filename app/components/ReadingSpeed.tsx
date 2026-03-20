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
  {
    text: "Octopuses have three hearts, nine brains, and blue blood. Two of their hearts pump blood to the gills, while the third pumps it to the rest of the body. Each of their eight arms contains a mini-brain that can act independently, allowing the arms to taste, touch, and even make basic decisions without input from the central brain. Their blue blood uses copper-based hemocyanin instead of iron-based hemoglobin, which is more efficient at transporting oxygen in cold, low-oxygen deep-sea environments. Octopuses are also masters of camouflage, able to change color, texture, and shape in milliseconds using specialized cells called chromatophores. Some species can even mimic other sea creatures to avoid predators.",
    questions: [
      { q: "How many hearts does an octopus have?", options: ["One", "Two", "Three", "Four"], correct: 2 },
      { q: "Why is octopus blood blue?", options: ["Iron-based hemoglobin", "Copper-based hemocyanin", "High salt content", "Lack of oxygen"], correct: 1 },
      { q: "What are the color-changing cells called?", options: ["Melanocytes", "Chromatophores", "Rhodopsins", "Pigmentocytes"], correct: 1 },
    ],
  },
  {
    text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible. The secret lies in honey's unique chemistry: it has very low moisture content, high acidity, and naturally produces small amounts of hydrogen peroxide. These properties create an inhospitable environment for bacteria and microorganisms. Bees contribute to this preservation by fanning the nectar with their wings to evaporate water, reducing moisture to below 18%. They also add an enzyme called glucose oxidase, which produces the hydrogen peroxide that acts as a natural preservative. However, honey must be stored in sealed containers because it is hygroscopic, meaning it readily absorbs moisture from the air, which could eventually allow fermentation.",
    questions: [
      { q: "How old was the edible honey found in tombs?", options: ["1,000 years", "2,000 years", "3,000 years", "5,000 years"], correct: 2 },
      { q: "What do bees do to reduce moisture in honey?", options: ["Heat it", "Fan it with their wings", "Add wax", "Compress it"], correct: 1 },
      { q: "What does hygroscopic mean?", options: ["Repels water", "Absorbs moisture from air", "Produces heat", "Resists bacteria"], correct: 1 },
    ],
  },
  {
    text: "The Mariana Trench is the deepest known point in Earth's oceans, reaching a depth of approximately 36,000 feet at its lowest point, called the Challenger Deep. The pressure at this depth is over 1,000 times atmospheric pressure at sea level, crushing most human-made equipment. Despite these extreme conditions, life thrives there. Scientists have discovered shrimp-like amphipods, sea cucumbers, and even fish adapted to the crushing pressure and complete darkness. In 2019, explorer Victor Vescovo set a new record by diving to 35,853 feet and was dismayed to find plastic waste at the bottom, including a plastic bag and candy wrappers, highlighting the far reach of human pollution.",
    questions: [
      { q: "What is the deepest point called?", options: ["Mariana Point", "Abyssal Plain", "Challenger Deep", "Hadal Zone"], correct: 2 },
      { q: "What pressure exists at the bottom?", options: ["100 times", "500 times", "Over 1,000 times", "10,000 times"], correct: 2 },
      { q: "What did Victor Vescovo find at the bottom?", options: ["New species", "Volcanic vents", "Plastic waste", "Shipwrecks"], correct: 2 },
    ],
  },
  {
    text: "The speed of light in a vacuum is approximately 186,282 miles per second, making it the fastest speed possible in the universe according to Einstein's theory of special relativity. At this speed, light from the Sun takes about 8 minutes and 20 seconds to reach Earth. The nearest star beyond our Sun, Proxima Centauri, is about 4.24 light-years away, meaning its light takes over four years to reach us. This also means that when we observe distant galaxies billions of light-years away, we are literally looking back in time, seeing them as they appeared billions of years ago. Scientists use this property to study the early universe by observing the most distant objects detectable with current telescopes.",
    questions: [
      { q: "How long does sunlight take to reach Earth?", options: ["About 1 minute", "About 8 minutes", "About 30 minutes", "About 1 hour"], correct: 1 },
      { q: "How far is Proxima Centauri?", options: ["1.5 light-years", "4.24 light-years", "10 light-years", "25 light-years"], correct: 1 },
      { q: "What can scientists study by observing distant galaxies?", options: ["Future events", "Dark matter only", "The early universe", "Parallel dimensions"], correct: 2 },
    ],
  },
  {
    text: "Venus rotates in the opposite direction to most planets in our solar system, meaning the Sun rises in the west and sets in the east. A single day on Venus, measured as one full rotation, takes about 243 Earth days, which is actually longer than its year of 225 Earth days. This makes Venus the only planet where a day is longer than a year. The planet's surface temperature averages around 867 degrees Fahrenheit, hot enough to melt lead, due to a runaway greenhouse effect caused by its thick atmosphere of carbon dioxide. Despite these harsh conditions, Soviet Venera missions in the 1970s and 1980s successfully landed probes on Venus, which transmitted images and data for up to two hours before succumbing to the extreme heat and pressure.",
    questions: [
      { q: "In which direction does Venus rotate?", options: ["Same as Earth", "Opposite to most planets", "It doesn't rotate", "Vertically"], correct: 1 },
      { q: "How long is a day on Venus in Earth days?", options: ["24 hours", "116 days", "243 days", "365 days"], correct: 2 },
      { q: "Which country landed probes on Venus?", options: ["USA", "Soviet Union", "Japan", "China"], correct: 1 },
    ],
  },
  {
    text: "Bananas are technically berries, while strawberries are not. In botanical terms, a berry is a fruit that develops from a single ovary and contains seeds embedded in the flesh. By this definition, grapes, avocados, and even eggplants qualify as berries. Strawberries, raspberries, and blackberries fail the botanical test because they develop from multiple ovaries. The banana plant itself is not actually a tree but the world's largest herbaceous plant, with what appears to be a trunk actually being tightly packed leaf bases. Wild bananas contain large, hard seeds, but the commercial Cavendish banana has been selectively bred to be seedless. This lack of genetic diversity makes commercial bananas vulnerable to diseases like Panama disease, which has already wiped out the previous dominant variety, the Gros Michel.",
    questions: [
      { q: "Are bananas technically berries?", options: ["Yes", "No", "Only some varieties", "Only when ripe"], correct: 0 },
      { q: "What is a banana plant classified as?", options: ["A tree", "A vine", "An herbaceous plant", "A shrub"], correct: 2 },
      { q: "What disease threatens commercial bananas?", options: ["Blight", "Panama disease", "Rust fungus", "Mosaic virus"], correct: 1 },
    ],
  },
  {
    text: "Antarctica is the driest continent on Earth, receiving less precipitation annually than the Sahara Desert. The interior of the continent gets only about 2 inches of precipitation per year, technically classifying it as a polar desert. Despite this, Antarctica holds about 70% of the world's fresh water, locked in its massive ice sheets that are up to 3 miles thick in places. If all of Antarctica's ice melted, global sea levels would rise by approximately 200 feet, submerging most coastal cities. The continent has no permanent human population, but research stations house between 1,000 and 5,000 people depending on the season. Temperatures can drop below minus 128 degrees Fahrenheit, the coldest ever recorded on Earth's surface.",
    questions: [
      { q: "How much of Earth's fresh water does Antarctica hold?", options: ["About 30%", "About 50%", "About 70%", "About 90%"], correct: 2 },
      { q: "How much precipitation does interior Antarctica get yearly?", options: ["About 2 inches", "About 10 inches", "About 20 inches", "About 50 inches"], correct: 0 },
      { q: "How much would sea levels rise if all ice melted?", options: ["20 feet", "75 feet", "200 feet", "500 feet"], correct: 2 },
    ],
  },
];

export default function ReadingSpeed() {
  const [phase, setPhase] = useState<"ready" | "reading" | "quiz" | "result">("ready");
  const [passageIdx, setPassageIdx] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const pb = usePersonalBest("pb-reading", "higher", phase === "result" ? wpm : null);
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
