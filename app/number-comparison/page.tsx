import type { Metadata } from "next";
import NumberComparisonTest from "../components/NumberComparisonTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Number Comparison Test - Which Is Larger? | BenchMyBrain",
  description:
    "Test your number comparison speed. See two numbers and click the larger one as fast as you can. Measures numerical processing and reaction time.",
  keywords: [
    "number comparison test",
    "numerical processing",
    "math speed test",
    "cognitive speed",
    "number sense test",
  ],
  openGraph: {
    title: "Number Comparison Test - Which Is Larger? | BenchMyBrain",
    description:
      "Test your number comparison speed. See two numbers and click the larger one as fast as you can. Measures numerical processing and reaction time.",
    type: "website",
  },
  alternates: {
    canonical: "/number-comparison",
  },
};

export default function NumberComparisonPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Number Comparison Test
        </h1>
        <p className="text-gray-400">
          Click the larger number as fast as you can. Tests numerical processing speed.
        </p>
      </div>

      <NumberComparisonTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Number Comparison</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Number Sense</h3>
            <p className="text-sm text-gray-400">
              This test measures your numerical cognition -- how quickly your brain processes
              and compares quantities. Faster comparisons indicate stronger number sense.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Distance Effect</h3>
            <p className="text-sm text-gray-400">
              Numbers that are far apart (23 vs 87) are compared faster than close numbers
              (847 vs 851). This is called the distance effect in cognitive psychology.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/number-comparison" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Number Comparison Test",
            description: "Free online number comparison test. Measure your numerical processing speed.",
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
                name: "What is a good number comparison time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fast times are under 500ms with 95%+ accuracy. Average is 600-800ms with 90%+ accuracy. Times over 1000ms or accuracy below 85% suggest slower numerical processing.",
                },
              },
              {
                "@type": "Question",
                name: "What is the distance effect?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The distance effect is a cognitive phenomenon where numbers far apart (e.g. 23 vs 87) are compared faster than close numbers (e.g. 847 vs 851). Larger differences are easier to process.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
