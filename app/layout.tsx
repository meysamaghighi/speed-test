import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "./components/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://benchmybrain.com"),
  title: "BenchMyBrain - Free Reaction Time, Typing Speed & Brain Tests",
  description:
    "Free online brain tests: reaction time, typing speed, number memory, trail making, go/no-go, n-back, hand-eye coordination, audio memory, aim trainer, click speed, chimp test, visual memory, pattern recognition, spatial rotation, rhythm timing. Compare with averages and share your scores.",
  openGraph: {
    title: "BenchMyBrain - Free Brain & Speed Tests",
    description: "30 free online tests: reaction time, typing speed, memory, trail making, go/no-go, n-back, hand-eye, audio memory, aim, pattern recognition, spatial rotation, rhythm, and more. No sign-up required.",
    type: "website",
    siteName: "BenchMyBrain",
  },
};

const navLinks = [
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-2621005924235240"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LN22YK2CZT"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LN22YK2CZT');` }} />
      </head>
      <body className="bg-gray-950 text-white min-h-screen font-sans antialiased">
        <nav className="border-b border-gray-800 sticky top-0 z-50 bg-gray-950/90 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-black text-lg text-white">
              BenchMyBrain
            </Link>
            <MobileNav links={navLinks} />
          </div>
        </nav>

        {children}

        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <p className="text-xs text-gray-500">Free online speed tests. No account required. Your data stays in your browser.</p>
            <div className="mt-3 mb-4">
              <Link href="/about" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">About</Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Check out our other sites:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="https://cashcalcs.com" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-200 transition-colors">CashCalcs</Link>
                <Link href="/" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-200 transition-colors">BenchMyBrain</Link>
                <Link href="https://doodlelab.fun" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-200 transition-colors">DoodleLab</Link>
                <Link href="https://playmini.fun" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-200 transition-colors">PlayMini</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
