import type { Metadata } from "next";
import PatternPlay from "./PatternPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Pattern Recognition Test - Test Your Logical Reasoning | BenchMyBrain",
  description:
    "Test your pattern recognition and logical reasoning skills. Identify the next item in number sequences, color patterns, and shape patterns.",
  keywords: [
    "pattern recognition test",
    "logical reasoning test",
    "IQ test",
    "sequence test",
    "pattern matching",
    "cognitive test",
  ],
  openGraph: {
    title: "Pattern Recognition Test - Test Your Logical Reasoning | BenchMyBrain",
    description: "Test your pattern recognition and logical reasoning skills. Identify the next item in number sequences, color patterns, and shape patterns.",
    type: "website",
    images: [{ url: "/api/og?test=pattern", width: 1200, height: 630, alt: "Pattern Recognition Test - Test Your Logical Reasoning | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pattern Recognition Test - Test Your Logical Reasoning | BenchMyBrain",
    description: "Test your pattern recognition and logical reasoning skills. Identify the next item in number sequences, color patterns, and shape patterns.",
    images: ["/api/og?test=pattern"],
  },
  alternates: {
    canonical: "/pattern",
  },
};

export default function PatternPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <PatternPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Pattern Recognition</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why It Matters</h3>
            <p className="text-sm text-ink-2">
              Pattern recognition is a core component of logical reasoning and IQ tests.
              It helps you identify relationships, predict outcomes, and solve problems.
              Strong pattern recognition is linked to better problem-solving and analytical skills.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">How to Improve</h3>
            <p className="text-sm text-ink-2">
              Practice with puzzles, Sudoku, and logic games. Look for patterns in everyday life.
              Study mathematical sequences like Fibonacci, prime numbers, and geometric progressions.
              The more you practice, the faster you'll recognize common patterns.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/pattern" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Pattern Recognition Test",
            description: "Free online pattern recognition test. Test your logical reasoning with number sequences, color patterns, and shape patterns.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
