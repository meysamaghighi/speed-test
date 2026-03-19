import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Speed Test - Reaction Time, Typing Speed & Memory Tests",
  description:
    "Free online tests: measure your reaction time, typing speed, and number memory. Compare with averages and share your scores.",
};

const navLinks = [
  { href: "/reaction", label: "Reaction Time" },
  { href: "/typing", label: "Typing Speed" },
  { href: "/memory", label: "Number Memory" },
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
      </head>
      <body className="bg-gray-950 text-white min-h-screen font-sans antialiased">
        <nav className="border-b border-gray-800 sticky top-0 z-50 bg-gray-950/90 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-black text-lg text-white">
              SpeedTest
            </Link>
            <div className="flex gap-4 text-sm font-medium text-gray-400">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {children}

        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-gray-500">
            <p>Free online speed tests. No account required. Your data stays in your browser.</p>
            <p className="mt-2">
              <Link href="https://cashcalcs.com" className="hover:text-gray-300">CashCalcs</Link>
              {" | "}
              <Link href="/" className="hover:text-gray-300">SpeedTest</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
