import type { Metadata } from "next";
import PatternTest from "../components/PatternTest";
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
    description:
      "Test your pattern recognition and logical reasoning skills. Identify the next item in number sequences, color patterns, and shape patterns.",
    type: "website",
  },
  alternates: {
    canonical: "/pattern",
  },
};

export default function PatternPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Pattern Recognition Test
        </h1>
        <p className="text-gray-400">
          Identify the next item in each pattern. 12 questions covering number sequences, colors, shapes, and sizes.
        </p>
      </div>

      <PatternTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Pattern Recognition</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why It Matters</h3>
            <p className="text-sm text-gray-400">
              Pattern recognition is a core component of logical reasoning and IQ tests.
              It helps you identify relationships, predict outcomes, and solve problems.
              Strong pattern recognition is linked to better problem-solving and analytical skills.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How to Improve</h3>
            <p className="text-sm text-gray-400">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is pattern recognition?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pattern recognition is the ability to identify relationships, sequences, and regularities in data. It's a key component of logical reasoning and is commonly tested in IQ assessments. Patterns can be numerical, visual, or conceptual.",
                },
              },
              {
                "@type": "Question",
                name: "How is pattern recognition related to IQ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pattern recognition is strongly correlated with fluid intelligence, which is the ability to think logically and solve new problems. Many IQ tests include pattern recognition sections because it measures abstract reasoning without relying on prior knowledge.",
                },
              },
              {
                "@type": "Question",
                name: "Can you improve pattern recognition skills?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Pattern recognition improves with practice. Work on puzzles, logic games, math sequences, and visual pattern challenges. The more patterns you're exposed to, the faster you'll recognize similar ones in the future.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
