import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BenchMyBrain - 20 Free Brain & Speed Tests | Reaction Time, Typing, Memory",
  description:
    "Free online brain tests: reaction time, typing speed, number memory, reverse memory, spatial rotation, rhythm timing, pattern recognition, aim trainer, click speed, chimp test, visual memory, sequence memory, verbal memory, Stroop, color blind, math speed, peripheral vision, and reading speed. No sign-up required.",
  keywords: [
    "brain test",
    "reaction time test",
    "typing speed test",
    "memory test",
    "pattern recognition test",
    "IQ test",
    "aim trainer",
    "click speed test",
    "chimp test",
    "cognitive test",
    "reflex test",
    "brain games",
    "speed test online",
  ],
  openGraph: {
    title: "BenchMyBrain - 20 Free Brain & Speed Tests",
    description:
      "Free online brain tests: reaction time, typing speed, memory, spatial rotation, rhythm timing, pattern recognition, aim, color blind, math, and more. No sign-up required.",
    type: "website",
  },
};

const tests = [
  {
    href: "/reaction",
    title: "Reaction Time",
    desc: "How fast can you click after the screen changes color?",
    color: "from-green-500 to-emerald-600",
    avg: "Average: 250ms",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <path d="M24 8v16l10 10" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="3" opacity="0.5" />
        <circle cx="24" cy="24" r="3" fill="white" />
      </svg>
    ),
  },
  {
    href: "/typing",
    title: "Typing Speed",
    desc: "How many words can you type per minute accurately?",
    color: "from-blue-500 to-indigo-600",
    avg: "Average: 40 WPM",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <rect x="4" y="14" width="40" height="24" rx="4" stroke="white" strokeWidth="3" opacity="0.5" />
        <rect x="10" y="20" width="5" height="4" rx="1" fill="white" />
        <rect x="18" y="20" width="5" height="4" rx="1" fill="white" />
        <rect x="26" y="20" width="5" height="4" rx="1" fill="white" />
        <rect x="34" y="20" width="5" height="4" rx="1" fill="white" />
        <rect x="14" y="28" width="20" height="4" rx="1" fill="white" />
      </svg>
    ),
  },
  {
    href: "/memory",
    title: "Number Memory",
    desc: "How many digits can you remember after a brief flash?",
    color: "from-purple-500 to-violet-600",
    avg: "Average: 7 digits",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <text x="8" y="34" fill="white" fontSize="20" fontWeight="900" fontFamily="monospace" opacity="0.9">4</text>
        <text x="20" y="34" fill="white" fontSize="20" fontWeight="900" fontFamily="monospace">7</text>
        <text x="32" y="34" fill="white" fontSize="20" fontWeight="900" fontFamily="monospace" opacity="0.5">2</text>
      </svg>
    ),
  },
  {
    href: "/reverse-memory",
    title: "Reverse Memory",
    desc: "Digits flash one at a time. Type them back in REVERSE order.",
    color: "from-cyan-500 to-teal-600",
    avg: "Average: 5 digits",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <text x="4" y="28" fill="white" fontSize="18" fontWeight="900" fontFamily="monospace" opacity="0.5">3</text>
        <text x="18" y="28" fill="white" fontSize="18" fontWeight="900" fontFamily="monospace" opacity="0.7">7</text>
        <text x="32" y="28" fill="white" fontSize="18" fontWeight="900" fontFamily="monospace">4</text>
        <path d="M38 14 L34 18 L38 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      </svg>
    ),
  },
  {
    href: "/aim",
    title: "Aim Trainer",
    desc: "Click 30 targets as fast as you can. Train your mouse accuracy.",
    color: "from-red-500 to-rose-600",
    avg: "Average: 600ms/target",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="3" opacity="0.3" />
        <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="3" opacity="0.6" />
        <circle cx="24" cy="24" r="4" fill="white" />
        <line x1="24" y1="4" x2="24" y2="12" stroke="white" strokeWidth="2" />
        <line x1="24" y1="36" x2="24" y2="44" stroke="white" strokeWidth="2" />
        <line x1="4" y1="24" x2="12" y2="24" stroke="white" strokeWidth="2" />
        <line x1="36" y1="24" x2="44" y2="24" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  {
    href: "/click-speed",
    title: "Click Speed (CPS)",
    desc: "How many clicks can you do in 5 seconds?",
    color: "from-amber-500 to-yellow-600",
    avg: "Average: 6.5 CPS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <path d="M20 8c0 0-2 4-2 8s4 8 4 12c0 4-2 8-2 12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <path d="M28 8c0 0 2 4 2 8s-4 8-4 12c0 4 2 8 2 12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <circle cx="24" cy="24" r="6" fill="white" opacity="0.9" />
      </svg>
    ),
  },
  {
    href: "/chimp",
    title: "Chimp Test",
    desc: "Can you beat a chimpanzee? Click numbers in order from memory.",
    color: "from-orange-500 to-amber-600",
    avg: "Chimps score: 9",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <rect x="6" y="10" width="10" height="10" rx="2" fill="white" opacity="0.9" />
        <rect x="19" y="10" width="10" height="10" rx="2" fill="white" opacity="0.5" />
        <rect x="32" y="10" width="10" height="10" rx="2" fill="white" opacity="0.3" />
        <rect x="6" y="28" width="10" height="10" rx="2" fill="white" opacity="0.3" />
        <rect x="19" y="28" width="10" height="10" rx="2" fill="white" opacity="0.7" />
        <text x="8.5" y="18.5" fill="black" fontSize="8" fontWeight="900">1</text>
        <text x="21.5" y="18.5" fill="black" fontSize="8" fontWeight="900">2</text>
        <text x="34.5" y="18.5" fill="black" fontSize="8" fontWeight="900">3</text>
      </svg>
    ),
  },
  {
    href: "/visual-memory",
    title: "Visual Memory",
    desc: "Memorize a pattern of tiles and click them back. 3 lives.",
    color: "from-pink-500 to-rose-600",
    avg: "Average: Level 7",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <rect x="6" y="6" width="10" height="10" rx="2" fill="white" opacity="0.9" />
        <rect x="19" y="6" width="10" height="10" rx="2" fill="white" opacity="0.2" />
        <rect x="32" y="6" width="10" height="10" rx="2" fill="white" opacity="0.9" />
        <rect x="6" y="19" width="10" height="10" rx="2" fill="white" opacity="0.2" />
        <rect x="19" y="19" width="10" height="10" rx="2" fill="white" opacity="0.9" />
        <rect x="32" y="19" width="10" height="10" rx="2" fill="white" opacity="0.2" />
        <rect x="6" y="32" width="10" height="10" rx="2" fill="white" opacity="0.2" />
        <rect x="19" y="32" width="10" height="10" rx="2" fill="white" opacity="0.9" />
        <rect x="32" y="32" width="10" height="10" rx="2" fill="white" opacity="0.2" />
      </svg>
    ),
  },
  {
    href: "/sequence",
    title: "Sequence Memory",
    desc: "Watch tiles light up in order, then repeat the pattern. Like Simon.",
    color: "from-teal-500 to-cyan-600",
    avg: "Average: Level 7",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <circle cx="12" cy="24" r="5" fill="white" opacity="0.4" />
        <circle cx="24" cy="24" r="5" fill="white" opacity="0.7" />
        <circle cx="36" cy="24" r="5" fill="white" opacity="1" />
        <path d="M17 24h2" stroke="white" strokeWidth="2" opacity="0.5" />
        <path d="M29 24h2" stroke="white" strokeWidth="2" opacity="0.7" />
      </svg>
    ),
  },
  {
    href: "/verbal",
    title: "Verbal Memory",
    desc: "Words appear one at a time. Have you seen it before? SEEN or NEW.",
    color: "from-indigo-500 to-blue-600",
    avg: "Average: 30 words",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <text x="6" y="22" fill="white" fontSize="14" fontWeight="800" fontFamily="sans-serif" opacity="0.9">Abc</text>
        <text x="14" y="38" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif" opacity="0.4">seen?</text>
      </svg>
    ),
  },
  {
    href: "/stroop",
    title: "Stroop Color Test",
    desc: "Color names in wrong ink colors. Pick the ink color, not the word.",
    color: "from-fuchsia-500 to-pink-600",
    avg: "Tests attention",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <text x="5" y="30" fontSize="16" fontWeight="900" fontFamily="sans-serif" fill="#3b82f6">RED</text>
        <text x="5" y="42" fontSize="8" fontFamily="sans-serif" fill="white" opacity="0.5">What color?</text>
      </svg>
    ),
  },
  {
    href: "/color-blind",
    title: "Color Blind Test",
    desc: "Can you see the hidden numbers? 12 Ishihara-style plates test your color vision.",
    color: "from-lime-500 to-green-600",
    avg: "8% of men affected",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <circle cx="24" cy="24" r="18" fill="white" opacity="0.15" />
        <circle cx="16" cy="18" r="4" fill="#7BA05B" />
        <circle cx="26" cy="14" r="3.5" fill="#C45A3C" />
        <circle cx="32" cy="22" r="4.5" fill="#7BA05B" />
        <circle cx="20" cy="28" r="3" fill="#C45A3C" />
        <circle cx="30" cy="32" r="4" fill="#7BA05B" />
        <circle cx="14" cy="30" r="3.5" fill="#C45A3C" />
        <circle cx="24" cy="22" r="3" fill="#C45A3C" />
      </svg>
    ),
  },
  {
    href: "/math",
    title: "Math Speed",
    desc: "60-second mental math blitz. Addition, subtraction, multiplication -- difficulty adapts.",
    color: "from-amber-500 to-red-500",
    avg: "Score: 200+ is fast",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <text x="4" y="22" fill="white" fontSize="16" fontWeight="900" fontFamily="monospace" opacity="0.7">7x8</text>
        <text x="4" y="40" fill="white" fontSize="14" fontWeight="900" fontFamily="monospace">=56</text>
      </svg>
    ),
  },
  {
    href: "/peripheral",
    title: "Peripheral Vision",
    desc: "Stare at the center dot and click targets in your side vision. Don't look away!",
    color: "from-cyan-500 to-blue-600",
    avg: "Average: 700ms",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <circle cx="24" cy="24" r="3" fill="white" />
        <circle cx="24" cy="24" r="14" stroke="white" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
        <circle cx="8" cy="18" r="4" fill="white" opacity="0.8" />
        <circle cx="40" cy="30" r="3.5" fill="white" opacity="0.5" />
        <circle cx="36" cy="10" r="3" fill="white" opacity="0.3" />
      </svg>
    ),
  },
  {
    href: "/reading",
    title: "Reading Speed",
    desc: "How fast do you read? WPM test with comprehension quiz -- speed without understanding doesn't count.",
    color: "from-violet-500 to-purple-600",
    avg: "Average: 230 WPM",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <rect x="10" y="6" width="28" height="36" rx="3" stroke="white" strokeWidth="2.5" opacity="0.4" />
        <line x1="16" y1="14" x2="32" y2="14" stroke="white" strokeWidth="2" opacity="0.8" />
        <line x1="16" y1="20" x2="32" y2="20" stroke="white" strokeWidth="2" opacity="0.6" />
        <line x1="16" y1="26" x2="28" y2="26" stroke="white" strokeWidth="2" opacity="0.4" />
        <line x1="16" y1="32" x2="30" y2="32" stroke="white" strokeWidth="2" opacity="0.2" />
      </svg>
    ),
  },
  {
    href: "/rotation",
    title: "Spatial Rotation",
    desc: "Compare two block shapes. Are they the SAME (rotated) or DIFFERENT? Mental rotation test.",
    color: "from-orange-500 to-red-600",
    avg: "Average: 10/15",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <rect x="12" y="12" width="8" height="8" rx="1" fill="white" opacity="0.9" />
        <rect x="20" y="12" width="8" height="8" rx="1" fill="white" opacity="0.9" />
        <rect x="12" y="20" width="8" height="8" rx="1" fill="white" opacity="0.9" />
        <path d="M32 28 L36 28 L36 24 M36 28 L36 32 L40 32 L40 24 L36 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    href: "/rhythm",
    title: "Rhythm Timing",
    desc: "Listen to a beat pattern and tap it back. Test your sense of rhythm and timing accuracy.",
    color: "from-violet-500 to-fuchsia-600",
    avg: "Average: Level 5",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <circle cx="12" cy="24" r="4" fill="white" opacity="0.4" />
        <circle cx="24" cy="24" r="5" fill="white" opacity="0.7" />
        <circle cx="36" cy="24" r="6" fill="white" opacity="1" />
        <path d="M12 12v8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <path d="M24 14v8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M36 10v10" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="1" />
      </svg>
    ),
  },
  {
    href: "/pattern",
    title: "Pattern Recognition",
    desc: "What comes next? Identify patterns in numbers, colors, shapes, and sizes.",
    color: "from-rose-500 to-pink-600",
    avg: "Tests IQ reasoning",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <circle cx="10" cy="24" r="5" fill="white" opacity="0.9" />
        <rect x="19" y="19" width="10" height="10" rx="2" fill="white" opacity="0.6" />
        <circle cx="38" cy="24" r="5" fill="white" opacity="0.9" />
        <text x="18" y="44" fill="white" fontSize="24" fontWeight="900" opacity="0.4">?</text>
      </svg>
    ),
  },
  {
    href: "/word-speed",
    title: "Word Speed",
    desc: "Type words as fast as you can. How many WPM can you hit?",
    color: "from-sky-500 to-blue-600",
    avg: "Average: 40 WPM",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <text x="6" y="22" fill="white" fontSize="14" fontWeight="bold" opacity="0.9">ABC</text>
        <text x="6" y="40" fill="white" fontSize="14" fontWeight="bold" opacity="0.5">XYZ</text>
        <path d="M34 12l6 6-6 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/number-speed",
    title: "Number Speed",
    desc: "Remember and type back growing number sequences.",
    color: "from-emerald-500 to-green-600",
    avg: "Average: 7 digits",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
        <text x="4" y="30" fill="white" fontSize="16" fontWeight="bold" opacity="0.9">1 2 3</text>
        <text x="14" y="44" fill="white" fontSize="10" opacity="0.4">...</text>
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-16 pb-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
          Test Your Brain
        </h1>
        <p className="text-xl text-gray-400 max-w-lg mx-auto">
          Free online tests for reaction time, typing speed, memory, aim, and
          more. No sign-up required.
        </p>
      </div>

      {/* Brain Score CTA */}
      <Link
        href="/brain-score"
        className="block mb-8 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 hover:from-indigo-500 hover:to-purple-500 transition-all"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Brain Score</h2>
            <p className="text-indigo-200 text-sm">
              Take all 17 tests and get your overall cognitive score out of 1000. How smart are you?
            </p>
          </div>
          <div className="text-5xl font-black text-white/20 group-hover:text-white/30 transition-colors">
            ?
          </div>
        </div>
      </Link>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Link
            key={test.href}
            href={test.href}
            className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all hover:scale-105"
          >
            <div
              className={`h-32 bg-gradient-to-br ${test.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
            >
              {test.icon}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                {test.title}
              </h2>
              <p className="text-gray-400 text-sm mb-3">{test.desc}</p>
              <p className="text-xs text-gray-500">{test.avg}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">1</div>
            <h3 className="font-bold text-white mb-1">Choose a Test</h3>
            <p className="text-sm text-gray-400">
              Pick from 18 brain and reflex tests.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">2</div>
            <h3 className="font-bold text-white mb-1">Take the Test</h3>
            <p className="text-sm text-gray-400">
              Follow the instructions and try your best. Each test takes under 60 seconds.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">3</div>
            <h3 className="font-bold text-white mb-1">Share Your Score</h3>
            <p className="text-sm text-gray-400">
              See how you compare to averages and share with friends.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
