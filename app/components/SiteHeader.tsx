import Link from "next/link";
import MobileNav from "./MobileNav";
import CommandPalette from "./CommandPalette";

const navLinks = [
  { href: "/daily", label: "🔥 Daily" },
  { href: "/reaction", label: "Reaction" },
  { href: "/typing", label: "Typing" },
  { href: "/memory", label: "Memory" },
  { href: "/aim", label: "Aim" },
  { href: "/click-speed", label: "CPS" },
  { href: "/chimp", label: "Chimp" },
  { href: "/visual-memory", label: "Visual" },
  { href: "/sequence", label: "Sequence" },
  { href: "/verbal", label: "Verbal" },
  { href: "/stroop", label: "Stroop" },
  { href: "/color-blind", label: "Color" },
  { href: "/math", label: "Math" },
  { href: "/peripheral", label: "Peripheral" },
  { href: "/reading", label: "Reading" },
  { href: "/reverse-memory", label: "Reverse" },
  { href: "/pattern", label: "Pattern" },
  { href: "/rotation", label: "Rotation" },
  { href: "/rhythm", label: "Rhythm" },
  { href: "/word-speed", label: "Word Speed" },
  { href: "/number-speed", label: "Number Speed" },
  { href: "/face-memory", label: "Face Memory" },
  { href: "/color-match", label: "Color Match" },
  { href: "/focus-timer", label: "Focus Timer" },
  { href: "/digit-span", label: "Digit Span" },
  { href: "/emotion", label: "Emotion" },
  { href: "/trail-making", label: "Trail Making" },
  { href: "/go-no-go", label: "Go/No-Go" },
  { href: "/n-back", label: "N-Back" },
  { href: "/hand-eye", label: "Hand-Eye" },
  { href: "/audio-memory", label: "Audio Memory" },
  { href: "/brain-score", label: "Brain Score" },
];

export default function SiteHeader() {
  return (
    <nav
      className="border-b border-line sticky top-0 z-50 backdrop-blur"
      style={{ background: "color-mix(in oklab, var(--paper) 88%, transparent)" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-ink"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          BenchMyBrain
        </Link>
        <div className="flex items-center gap-2">
          <CommandPalette />
          <MobileNav links={navLinks} />
        </div>
      </div>
    </nav>
  );
}
