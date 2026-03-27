import type { Metadata } from "next";
import MathMemoryTest from "../components/MathMemoryTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Math Memory Test - Mental Math & Working Memory | BenchMyBrain",
  description:
    "Test your math working memory. Equations flash briefly, then disappear. Can you solve them from memory? Difficulty increases with each correct answer.",
  keywords: [
    "math memory test",
    "working memory test",
    "mental math test",
    "equation memory",
    "math speed test",
    "cognitive math",
  ],
  openGraph: {
    title: "Math Memory Test - Mental Math & Working Memory | BenchMyBrain",
    description:
      "Test your math working memory. Equations flash briefly, then disappear. Can you solve them from memory? Difficulty increases with each correct answer.",
    type: "website",
  },
};

export default function MathMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Math Memory Test
        </h1>
        <p className="text-gray-400">
          A math equation flashes briefly. Memorize it, then solve from memory.
          One wrong answer ends the test.
        </p>
      </div>

      <MathMemoryTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Math Working Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Dual Processing</h3>
            <p className="text-sm text-gray-400">
              This test requires both memory (holding the equation) and computation
              (solving it). Your working memory must juggle both tasks simultaneously,
              making it harder than pure memory or pure math alone.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Mental Math Skills</h3>
            <p className="text-sm text-gray-400">
              Strong mental math correlates with better problem-solving and
              logical reasoning. Practice improves both speed and working memory
              capacity. Kids who do mental math regularly score higher on IQ tests.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/math-memory" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Math Memory Test",
            description: "Test your math working memory with equations that flash and disappear.",
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
                name: "What is math working memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Math working memory is your brain's ability to hold and manipulate numerical information. It's crucial for mental arithmetic, problem-solving, and following multi-step instructions.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve mental math?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice regularly with tests like this. Learn mental math tricks (doubling, halving, using friendly numbers). Play number games. Do calculations without a calculator whenever possible.",
                },
              },
              {
                "@type": "Question",
                name: "What's a good score on math memory test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1-5 correct is beginner, 6-10 is good, 11-15 is great, and 16+ is expert level. The test gets progressively harder with multiplication and larger numbers.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
