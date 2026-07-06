import type { Metadata } from "next";
import PatternSpeedPlay from "./PatternSpeedPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Mental Math Sprint - Rapid Estimation & Number Sense Test | BenchMyBrain",
  description:
    "A fast-paced mental math sprint: count dots quickly, estimate math results, compare quantities. 15 rounds of rapid estimation challenges.",
  keywords: [
    "rapid estimation test",
    "mental math speed",
    "dot counting test",
    "quick math estimation",
    "number sense test",
    "estimation skills",
  ],
  openGraph: {
    title: "Mental Math Sprint - Rapid Estimation & Number Sense Test | BenchMyBrain",
    description:
      "A fast-paced mental math sprint: count dots quickly, estimate math results, compare quantities. 15 rounds of rapid estimation challenges.",
    type: "website",
  },
  alternates: {
    canonical: "/pattern-speed",
  },
};

export default function PatternSpeedPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <PatternSpeedPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About the Mental Math Sprint</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Mental Math Speed</h3>
            <p className="text-sm text-ink-2">
              Rapid estimation combines number sense, visual processing, and mental
              arithmetic. It tests your ability to quickly approximate quantities and
              calculate under time pressure - skills useful in daily life.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Estimation Strategies</h3>
            <p className="text-sm text-ink-2">
              For dot counting: group clusters and multiply. For multiplication:
              round to nearest 10 (23x17 = 20x20 = 400). For comparisons: focus
              on density differences rather than exact counts.
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
            name: "Mental Math Sprint",
            description: "A fast-paced mental math sprint with dots, multiplication, and quantity comparison.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
