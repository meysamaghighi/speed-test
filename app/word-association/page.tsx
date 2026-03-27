import type { Metadata } from "next";
import WordAssociationTest from "../components/WordAssociationTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Word Association Test - How Fast Can You Think? | BenchMyBrain",
  description:
    "Test your word association speed. See a word and type the opposite as fast as you can. Measures verbal processing speed and cognitive flexibility.",
  keywords: [
    "word association test",
    "cognitive speed test",
    "verbal processing",
    "thinking speed test",
    "reaction time test",
  ],
  openGraph: {
    title: "Word Association Test - How Fast Can You Think? | BenchMyBrain",
    description:
      "Test your word association speed. See a word and type the opposite as fast as you can. Measures verbal processing speed and cognitive flexibility.",
    type: "website",
  },
};

export default function WordAssociationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Word Association Test
        </h1>
        <p className="text-gray-400">
          See a word, type the opposite as fast as you can. Tests verbal processing speed.
        </p>
      </div>

      <WordAssociationTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Word Association</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Processing Speed</h3>
            <p className="text-sm text-gray-400">
              This test measures how quickly your brain can process language, access semantic
              memory, and generate responses. Faster times indicate better verbal fluency.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Cognitive Flexibility</h3>
            <p className="text-sm text-gray-400">
              Word association tests cognitive flexibility -- the ability to switch between
              concepts quickly. Used in psychology and cognitive assessments.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/word-association" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Word Association Test",
            description: "Free online word association test. Measure your verbal processing speed.",
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
                name: "What is a good word association time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fast responses are under 800ms. Average is 1000-1500ms. Times over 2000ms suggest slower verbal processing. Native speakers are typically faster than non-native speakers.",
                },
              },
              {
                "@type": "Question",
                name: "What does word association measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It measures verbal processing speed, semantic memory access, and cognitive flexibility. Used in psychology to assess language skills and cognitive function.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
