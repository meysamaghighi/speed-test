import Link from "next/link";

const allTests = [
  { href: "/reaction", label: "Reaction Time", color: "from-green-500 to-emerald-600" },
  { href: "/typing", label: "Typing Speed", color: "from-blue-500 to-indigo-600" },
  { href: "/memory", label: "Number Memory", color: "from-purple-500 to-violet-600" },
  { href: "/aim", label: "Aim Trainer", color: "from-red-500 to-rose-600" },
  { href: "/click-speed", label: "Click Speed", color: "from-amber-500 to-yellow-600" },
  { href: "/chimp", label: "Chimp Test", color: "from-orange-500 to-amber-600" },
  { href: "/visual-memory", label: "Visual Memory", color: "from-pink-500 to-rose-600" },
  { href: "/sequence", label: "Sequence Memory", color: "from-teal-500 to-cyan-600" },
  { href: "/verbal", label: "Verbal Memory", color: "from-indigo-500 to-blue-600" },
  { href: "/stroop", label: "Stroop Test", color: "from-fuchsia-500 to-pink-600" },
  { href: "/color-blind", label: "Color Blind", color: "from-lime-500 to-green-600" },
  { href: "/math", label: "Math Speed", color: "from-amber-500 to-red-500" },
  { href: "/peripheral", label: "Peripheral Vision", color: "from-cyan-500 to-blue-600" },
  { href: "/reading", label: "Reading Speed", color: "from-violet-500 to-purple-600" },
  { href: "/reverse-memory", label: "Reverse Memory", color: "from-cyan-500 to-teal-600" },
  { href: "/rotation", label: "Spatial Rotation", color: "from-orange-500 to-red-600" },
  { href: "/rhythm", label: "Rhythm Timing", color: "from-violet-500 to-fuchsia-600" },
  { href: "/pattern", label: "Pattern Recognition", color: "from-rose-500 to-pink-600" },
  { href: "/word-speed", label: "Word Speed", color: "from-sky-500 to-blue-600" },
  { href: "/number-speed", label: "Number Speed", color: "from-emerald-500 to-green-600" },
  { href: "/face-memory", label: "Face Memory", color: "from-yellow-500 to-orange-600" },
  { href: "/color-match", label: "Color Match", color: "from-pink-500 to-red-600" },
  { href: "/focus-timer", label: "Focus Timer", color: "from-gray-500 to-slate-600" },
  { href: "/brain-score", label: "Brain Score", color: "from-indigo-500 to-purple-600" },
];

const relatedMap: Record<string, string[]> = {
  "/reaction": ["/aim", "/click-speed", "/peripheral"],
  "/typing": ["/reaction", "/reading", "/math"],
  "/memory": ["/reverse-memory", "/sequence", "/visual-memory"],
  "/aim": ["/reaction", "/click-speed", "/peripheral"],
  "/click-speed": ["/reaction", "/aim", "/typing"],
  "/chimp": ["/visual-memory", "/memory", "/sequence"],
  "/visual-memory": ["/chimp", "/sequence", "/memory"],
  "/sequence": ["/visual-memory", "/memory", "/chimp"],
  "/verbal": ["/memory", "/reading", "/stroop"],
  "/stroop": ["/reaction", "/verbal", "/color-blind"],
  "/color-blind": ["/stroop", "/peripheral", "/visual-memory"],
  "/math": ["/typing", "/memory", "/reverse-memory"],
  "/peripheral": ["/aim", "/reaction", "/visual-memory"],
  "/reading": ["/typing", "/verbal", "/memory"],
  "/reverse-memory": ["/memory", "/sequence", "/math"],
  "/rotation": ["/visual-memory", "/chimp", "/peripheral"],
  "/rhythm": ["/reaction", "/sequence", "/memory"],
  "/pattern": ["/math", "/sequence", "/memory"],
  "/word-speed": ["/typing", "/reading", "/verbal"],
  "/number-speed": ["/memory", "/reverse-memory", "/sequence"],
  "/face-memory": ["/visual-memory", "/memory", "/chimp"],
  "/color-match": ["/stroop", "/reaction", "/aim"],
  "/focus-timer": ["/reaction", "/rhythm", "/memory"],
  "/brain-score": ["/reaction", "/memory", "/typing"],
};

export default function RelatedTests({ current }: { current: string }) {
  const related = relatedMap[current] ?? [];
  const items = related
    .map((href) => allTests.find((t) => t.href === href))
    .filter(Boolean) as typeof allTests;

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-white mb-4">Related Tests</h2>
      <div className="flex flex-wrap gap-3">
        {items.map((test) => (
          <Link
            key={test.href}
            href={test.href}
            className={`px-4 py-2 bg-gradient-to-r ${test.color} text-white text-sm font-medium rounded-lg transition-opacity hover:opacity-90`}
          >
            {test.label}
          </Link>
        ))}
        <Link
          href="/"
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          All Tests
        </Link>
      </div>
    </section>
  );
}
