"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { usePersonalBest } from "../hooks/usePersonalBest";

type Phase = "instructions" | "countdown" | "active" | "result";

const CATEGORIES = [
  {
    name: "Animals",
    examples: "dog, cat, elephant...",
    validWords: new Set([
      "dog", "cat", "elephant", "lion", "tiger", "bear", "wolf", "fox", "deer", "rabbit",
      "mouse", "rat", "horse", "cow", "pig", "sheep", "goat", "chicken", "duck", "goose",
      "eagle", "hawk", "owl", "crow", "parrot", "penguin", "ostrich", "peacock", "swan", "flamingo",
      "whale", "dolphin", "shark", "fish", "octopus", "squid", "crab", "lobster", "seal", "walrus",
      "monkey", "gorilla", "chimpanzee", "orangutan", "baboon", "lemur", "kangaroo", "koala", "panda", "sloth",
      "giraffe", "zebra", "hippo", "rhinoceros", "rhino", "camel", "llama", "alpaca", "antelope", "gazelle",
      "buffalo", "bison", "moose", "elk", "reindeer", "caribou", "leopard", "cheetah", "jaguar", "panther",
      "hyena", "jackal", "coyote", "badger", "otter", "beaver", "squirrel", "chipmunk", "hamster", "guinea pig",
      "hedgehog", "porcupine", "raccoon", "skunk", "opossum", "bat", "mole", "shrew", "weasel", "ferret",
      "snake", "lizard", "crocodile", "alligator", "turtle", "tortoise", "frog", "toad", "salamander", "newt",
      "spider", "ant", "bee", "wasp", "butterfly", "moth", "beetle", "fly", "mosquito", "dragonfly",
      "snail", "slug", "worm", "caterpillar", "scorpion", "centipede", "millipede", "grasshopper", "cricket", "cockroach",
    ])
  },
  {
    name: "Countries",
    examples: "USA, France, Japan...",
    validWords: new Set([
      "usa", "america", "canada", "mexico", "brazil", "argentina", "chile", "peru", "colombia", "venezuela",
      "france", "germany", "italy", "spain", "portugal", "england", "scotland", "wales", "ireland", "uk",
      "russia", "china", "japan", "korea", "india", "pakistan", "bangladesh", "nepal", "thailand", "vietnam",
      "indonesia", "malaysia", "singapore", "philippines", "australia", "zealand", "fiji", "samoa", "tonga", "papua",
      "egypt", "morocco", "algeria", "tunisia", "libya", "sudan", "ethiopia", "kenya", "tanzania", "uganda",
      "nigeria", "ghana", "senegal", "mali", "niger", "chad", "cameroon", "congo", "angola", "zambia",
      "zimbabwe", "mozambique", "madagascar", "mauritius", "seychelles", "somalia", "rwanda", "burundi", "malawi", "botswana",
      "namibia", "lesotho", "swaziland", "eswatini", "turkey", "greece", "poland", "romania", "bulgaria", "hungary",
      "austria", "switzerland", "belgium", "netherlands", "holland", "denmark", "sweden", "norway", "finland", "iceland",
      "ukraine", "belarus", "lithuania", "latvia", "estonia", "czech", "slovakia", "croatia", "serbia", "bosnia",
      "albania", "macedonia", "montenegro", "slovenia", "iran", "iraq", "syria", "lebanon", "jordan", "israel",
      "palestine", "saudi", "yemen", "oman", "kuwait", "bahrain", "qatar", "emirates", "uae", "afghanistan",
    ])
  },
  {
    name: "Foods",
    examples: "pizza, apple, bread...",
    validWords: new Set([
      "pizza", "burger", "pasta", "spaghetti", "lasagna", "ravioli", "gnocchi", "risotto", "paella", "sushi",
      "ramen", "noodles", "rice", "bread", "toast", "bagel", "croissant", "muffin", "pancake", "waffle",
      "sandwich", "wrap", "taco", "burrito", "enchilada", "quesadilla", "nacho", "salsa", "guacamole", "salad",
      "soup", "stew", "chili", "curry", "biryani", "kebab", "falafel", "hummus", "pita", "naan",
      "steak", "beef", "pork", "chicken", "turkey", "duck", "lamb", "mutton", "ham", "bacon",
      "sausage", "hotdog", "meatball", "fish", "salmon", "tuna", "shrimp", "lobster", "crab", "oyster",
      "apple", "banana", "orange", "grape", "strawberry", "blueberry", "raspberry", "blackberry", "cherry", "peach",
      "pear", "plum", "apricot", "mango", "pineapple", "watermelon", "melon", "cantaloupe", "kiwi", "papaya",
      "coconut", "avocado", "tomato", "potato", "carrot", "broccoli", "cauliflower", "cabbage", "lettuce", "spinach",
      "kale", "celery", "cucumber", "pepper", "onion", "garlic", "ginger", "mushroom", "eggplant", "zucchini",
      "corn", "peas", "beans", "lentils", "chickpeas", "tofu", "egg", "cheese", "milk", "yogurt",
      "butter", "cream", "ice cream", "cake", "cookie", "brownie", "pie", "donut", "chocolate", "candy",
    ])
  },
  {
    name: "Colors",
    examples: "red, blue, green...",
    validWords: new Set([
      "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white",
      "gray", "grey", "silver", "gold", "beige", "tan", "cream", "ivory", "maroon", "burgundy",
      "crimson", "scarlet", "ruby", "rose", "salmon", "coral", "peach", "amber", "bronze", "copper",
      "rust", "sienna", "terracotta", "navy", "cobalt", "azure", "cyan", "turquoise", "teal", "aqua",
      "mint", "jade", "emerald", "lime", "olive", "chartreuse", "sage", "forest", "pine", "moss",
      "violet", "indigo", "lavender", "lilac", "plum", "magenta", "fuchsia", "mauve", "periwinkle", "orchid",
      "mahogany", "chocolate", "coffee", "espresso", "taupe", "khaki", "sand", "wheat", "buff", "camel",
    ])
  },
  {
    name: "Cities",
    examples: "Paris, Tokyo, London...",
    validWords: new Set([
      "paris", "london", "tokyo", "beijing", "shanghai", "delhi", "mumbai", "bangkok", "seoul", "jakarta",
      "manila", "singapore", "dubai", "istanbul", "moscow", "madrid", "barcelona", "rome", "milan", "venice",
      "florence", "naples", "berlin", "munich", "hamburg", "vienna", "zurich", "geneva", "amsterdam", "brussels",
      "lisbon", "porto", "prague", "budapest", "warsaw", "copenhagen", "stockholm", "oslo", "helsinki", "dublin",
      "edinburgh", "manchester", "liverpool", "glasgow", "athens", "cairo", "cape town", "johannesburg", "nairobi", "lagos",
      "sydney", "melbourne", "brisbane", "perth", "auckland", "wellington", "toronto", "montreal", "vancouver", "calgary",
      "york", "angeles", "chicago", "houston", "phoenix", "philadelphia", "antonio", "diego", "dallas", "jose",
      "austin", "jacksonville", "francisco", "columbus", "charlotte", "indianapolis", "seattle", "denver", "boston", "washington",
      "mexico", "paulo", "janeiro", "aires", "bogota", "lima", "santiago", "caracas", "quito", "havana",
      "panama", "rico", "salvador", "brasilia", "montevideo", "asuncion", "sucre", "paz", "salvador", "tegucigalpa",
    ])
  },
  {
    name: "Jobs",
    examples: "doctor, teacher, engineer...",
    validWords: new Set([
      "doctor", "nurse", "surgeon", "dentist", "pharmacist", "therapist", "psychologist", "psychiatrist", "paramedic", "veterinarian",
      "teacher", "professor", "tutor", "principal", "counselor", "librarian", "coach", "trainer", "instructor", "educator",
      "engineer", "architect", "designer", "developer", "programmer", "analyst", "scientist", "researcher", "technician", "mechanic",
      "lawyer", "attorney", "judge", "paralegal", "accountant", "auditor", "banker", "economist", "consultant", "advisor",
      "manager", "director", "executive", "administrator", "supervisor", "coordinator", "assistant", "secretary", "receptionist", "clerk",
      "writer", "editor", "journalist", "reporter", "author", "poet", "blogger", "photographer", "videographer", "filmmaker",
      "artist", "painter", "sculptor", "musician", "singer", "composer", "conductor", "dancer", "actor", "actress",
      "chef", "cook", "baker", "waiter", "waitress", "bartender", "barista", "cashier", "server", "host",
      "pilot", "captain", "sailor", "driver", "trucker", "courier", "delivery", "dispatcher", "conductor", "porter",
      "police", "officer", "detective", "firefighter", "soldier", "guard", "marshal", "sheriff", "agent", "investigator",
      "farmer", "rancher", "gardener", "landscaper", "florist", "forester", "fisherman", "miner", "logger", "builder",
      "carpenter", "plumber", "electrician", "painter", "mason", "welder", "roofer", "glazier", "tiler", "plasterer",
    ])
  }
];

export default function WordAssociationTest() {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [userInput, setUserInput] = useState("");
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [invalidAttempts, setInvalidAttempts] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  const score = submittedWords.length;
  const isFinished = phase === "result";
  const pb = usePersonalBest("pb-word-association", "higher", isFinished ? score : null);

  const startTest = useCallback(() => {
    // Pick a random category
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    setCategory(randomCategory);
    setSubmittedWords([]);
    setInvalidAttempts([]);
    setUserInput("");
    setCountdown(3);
    setPhase("countdown");

    // Countdown 3, 2, 1, GO
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setPhase("active");
          setTimeLeft(60);
          setTimeout(() => inputRef.current?.focus(), 50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleSubmit = useCallback(() => {
    if (phase !== "active" || !userInput.trim()) return;

    const word = userInput.trim().toLowerCase();

    // Check if already submitted
    if (submittedWords.includes(word)) {
      setInvalidAttempts(prev => [...prev, `"${word}" already used`]);
      setUserInput("");
      return;
    }

    // Check if valid word for this category
    if (!category.validWords.has(word)) {
      setInvalidAttempts(prev => [...prev, `"${word}" not valid`]);
      setUserInput("");
      return;
    }

    // Valid submission
    setSubmittedWords(prev => [...prev, word]);
    setUserInput("");
    inputRef.current?.focus();
  }, [phase, userInput, submittedWords, category]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phase === "active") {
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [phase, handleSubmit]);

  useEffect(() => {
    if (phase !== "active") return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase("result");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const restart = () => {
    setPhase("instructions");
    setSubmittedWords([]);
    setInvalidAttempts([]);
    setUserInput("");
  };

  if (phase === "instructions") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="text-gray-400 space-y-3 text-left max-w-md mx-auto">
            <p>1. You'll be given a random category (animals, colors, countries, etc.)</p>
            <p>2. Type as many valid words in that category as you can</p>
            <p>3. You have 60 seconds</p>
            <p>4. Press Enter to submit each word</p>
            <p>5. Duplicates and invalid words don't count</p>
          </div>
        </div>

        <button
          onClick={startTest}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">Category: {category.name}</p>
          <p className="text-6xl font-black text-blue-400">{score}</p>
          <p className="text-gray-400 text-sm mt-2">words in 60 seconds</p>
          {pb.isNewBest && <p className="text-yellow-400 font-bold mt-3 animate-pulse">New Personal Best!</p>}
          {pb.best !== null && !pb.isNewBest && <p className="text-gray-500 text-sm mt-2">Personal Best: {pb.best} words</p>}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-white font-bold mb-3">Your Words</p>
          <div className="flex flex-wrap gap-2 justify-center max-h-48 overflow-y-auto">
            {submittedWords.map((word, i) => (
              <span key={i} className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg text-sm border border-green-800">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
          <p className="font-bold text-white mb-2">How You Compare</p>
          <div className="space-y-1">
            <p>Excellent: 20+ words</p>
            <p>Good: 15-19 words</p>
            <p>Average: 10-14 words</p>
            <p>Below Average: &lt;10 words</p>
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
              const text = `I named ${score} ${category.name.toLowerCase()} in 60 seconds! Can you beat me?`;
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

  if (phase === "countdown") {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl mb-8">Category: {category.name}</p>
        <p className="text-8xl font-black text-white">{countdown}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <div className="text-left">
          <p className="text-sm text-gray-500">Category</p>
          <p className="text-lg font-bold text-white">{category.name}</p>
          <p className="text-xs text-gray-600">{category.examples}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Time Left</p>
          <p className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
            {timeLeft}s
          </p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-bold">Score: {score}</p>
          <p className="text-gray-500 text-sm">{submittedWords.length} word{submittedWords.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="max-w-xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:border-blue-500"
            placeholder="Type a word and press Enter..."
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        {invalidAttempts.length > 0 && (
          <div className="mt-3 text-sm text-red-400">
            {invalidAttempts[invalidAttempts.length - 1]}
          </div>
        )}
      </div>

      {submittedWords.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <p className="text-gray-500 text-sm mb-2">Submitted Words</p>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {submittedWords.map((word, i) => (
              <span key={i} className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-sm border border-green-800">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
