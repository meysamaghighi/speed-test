import type { Metadata } from "next";
import NumberComparisonPlay from "./NumberComparisonPlay";
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
      </div>
        <NumberComparisonPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Number Comparison</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Number Sense</h3>
            <p className="text-sm text-ink-2">
              This test measures your numerical cognition -- how quickly your brain processes
              and compares quantities. Faster comparisons indicate stronger number sense.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Distance Effect</h3>
            <p className="text-sm text-ink-2">
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

    </main>
  );
}
