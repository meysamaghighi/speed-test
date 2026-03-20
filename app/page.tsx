import Link from "next/link";

const tests = [
  {
    href: "/reaction",
    title: "Reaction Time",
    desc: "How fast can you click after the screen changes color?",
    color: "from-green-500 to-emerald-600",
    avg: "Average: 250ms",
  },
  {
    href: "/typing",
    title: "Typing Speed",
    desc: "How many words can you type per minute accurately?",
    color: "from-blue-500 to-indigo-600",
    avg: "Average: 40 WPM",
  },
  {
    href: "/memory",
    title: "Number Memory",
    desc: "How many digits can you remember after a brief flash?",
    color: "from-purple-500 to-violet-600",
    avg: "Average: 7 digits",
  },
  {
    href: "/aim",
    title: "Aim Trainer",
    desc: "Click 30 targets as fast as you can. Train your mouse accuracy.",
    color: "from-red-500 to-rose-600",
    avg: "Average: 600ms/target",
  },
  {
    href: "/click-speed",
    title: "Click Speed (CPS)",
    desc: "How many clicks can you do in 5 seconds?",
    color: "from-amber-500 to-yellow-600",
    avg: "Average: 6.5 CPS",
  },
  {
    href: "/chimp",
    title: "Chimp Test",
    desc: "Can you beat a chimpanzee? Click numbers in order from memory.",
    color: "from-orange-500 to-amber-600",
    avg: "Chimps score: 9",
  },
  {
    href: "/visual-memory",
    title: "Visual Memory",
    desc: "Memorize a pattern of tiles and click them back. 3 lives.",
    color: "from-pink-500 to-rose-600",
    avg: "Average: Level 7",
  },
  {
    href: "/sequence",
    title: "Sequence Memory",
    desc: "Watch tiles light up in order, then repeat the pattern. Like Simon.",
    color: "from-teal-500 to-cyan-600",
    avg: "Average: Level 7",
  },
  {
    href: "/verbal",
    title: "Verbal Memory",
    desc: "Words appear one at a time. Have you seen it before? SEEN or NEW.",
    color: "from-indigo-500 to-blue-600",
    avg: "Average: 30 words",
  },
  {
    href: "/stroop",
    title: "Stroop Color Test",
    desc: "Color names in wrong ink colors. Pick the ink color, not the word.",
    color: "from-fuchsia-500 to-pink-600",
    avg: "Tests attention",
  },
  {
    href: "/color-blind",
    title: "Color Blind Test",
    desc: "Can you see the hidden numbers? 12 Ishihara-style plates test your color vision.",
    color: "from-lime-500 to-green-600",
    avg: "8% of men affected",
  },
  {
    href: "/math",
    title: "Math Speed",
    desc: "60-second mental math blitz. Addition, subtraction, multiplication -- difficulty adapts.",
    color: "from-amber-500 to-red-500",
    avg: "Score: 200+ is fast",
  },
  {
    href: "/peripheral",
    title: "Peripheral Vision",
    desc: "Stare at the center dot and click targets in your side vision. Don't look away!",
    color: "from-cyan-500 to-blue-600",
    avg: "Average: 700ms",
  },
  {
    href: "/reading",
    title: "Reading Speed",
    desc: "How fast do you read? WPM test with comprehension quiz -- speed without understanding doesn't count.",
    color: "from-violet-500 to-purple-600",
    avg: "Average: 230 WPM",
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-16 pb-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
          Test Your Speed
        </h1>
        <p className="text-xl text-gray-400 max-w-lg mx-auto">
          Free online tests for reaction time, typing speed, memory, aim, and
          more. No sign-up required.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Link
            key={test.href}
            href={test.href}
            className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all hover:scale-105"
          >
            <div
              className={`h-32 bg-gradient-to-br ${test.color} opacity-80 group-hover:opacity-100 transition-opacity`}
            />
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
              Pick from 14 brain and reflex tests.
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
