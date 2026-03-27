import type { Metadata } from "next";
import PatternSpeedTest from "../components/PatternSpeedTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Pattern Speed Test - Visual Memory & Recognition | BenchMyBrain",
  description:
    "Test your visual pattern memory. Memorize flashing grid patterns and reproduce them. How many cells can you remember?",
  keywords: [
    "pattern memory test",
    "visual memory test",
    "pattern recognition",
    "grid memory",
    "spatial memory test",
    "pattern speed",
  ],
  openGraph: {
    title: "Pattern Speed Test - Visual Memory & Recognition | BenchMyBrain",
    description:
      "Test your visual pattern memory. Memorize flashing grid patterns and reproduce them. How many cells can you remember?",
    type: "website",
  },
};

export default function PatternSpeedPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Pattern Speed Test
        </h1>
        <p className="text-gray-400">
          A grid pattern flashes briefly. Click the highlighted cells to recreate it.
          Each level adds one more cell.
        </p>
      </div>

      <PatternSpeedTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Pattern Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Working Memory</h3>
            <p className="text-sm text-gray-400">
              Pattern memory tests your visual working memory - the ability to hold
              and manipulate visual information. Most people can remember 4-7 items
              in their visual working memory at once.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Chunking Strategy</h3>
            <p className="text-sm text-gray-400">
              Expert tip: group nearby cells into shapes or patterns. Instead of
              remembering 9 individual cells, try seeing them as triangles, lines,
              or clusters. This "chunking" dramatically improves recall.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/pattern-speed" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Pattern Speed Test",
            description: "Test your visual pattern memory with increasing difficulty.",
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
                name: "What is pattern memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pattern memory is your brain's ability to encode, store, and recall visual patterns. It's a key component of visual working memory and spatial intelligence.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve pattern recognition?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice regularly with tests like this. Use chunking strategies - group items into meaningful patterns. Play chess, solve puzzles, and practice mindfulness to improve attention.",
                },
              },
              {
                "@type": "Question",
                name: "What's a good score on pattern speed test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Level 1-3 is beginner, 4-6 is average, 7-9 is good, and 10+ is expert. Most people plateau around level 5-7 due to working memory limits.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
