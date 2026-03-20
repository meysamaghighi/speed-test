import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "./components/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://benchmybrain.com"),
  title: "BenchMyBrain - Free Reaction Time, Typing Speed & Brain Tests",
  description:
    "Free online brain tests: reaction time, typing speed, number memory, aim trainer, click speed, chimp test, visual memory. Compare with averages and share your scores.",
  openGraph: {
    title: "BenchMyBrain - Free Brain & Speed Tests",
    description: "14 free online tests: reaction time, typing speed, memory, aim, color blind, math, and more. No sign-up required.",
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
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-gray-500">
            <p>Free online speed tests. No account required. Your data stays in your browser.</p>
            <p className="mt-2">
              <Link href="https://cashcalcs.com" className="hover:text-gray-300">CashCalcs</Link>
              {" | "}
              <Link href="/" className="hover:text-gray-300">BenchMyBrain</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
