import type { Metadata } from "next";
import RapidEstimationTest from "../components/RapidEstimationTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Rapid Estimation Test - Mental Math Speed & Number Sense | BenchMyBrain",
  description:
    "Test your rapid estimation skills. Count dots quickly, estimate math results, compare quantities. 15 rounds of fast-paced number challenges.",
  keywords: [
    "rapid estimation test",
    "mental math speed",
    "dot counting test",
    "quick math estimation",
    "number sense test",
    "estimation skills",
  ],
  openGraph: {
    title: "Rapid Estimation Test - Mental Math Speed & Number Sense | BenchMyBrain",
    description:
      "Test your rapid estimation skills. Count dots quickly, estimate math results, compare quantities. 15 rounds of fast-paced number challenges.",
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
        <h1 className="text-4xl font-black text-white mb-3">
          Rapid Estimation Test
        </h1>
        <p className="text-gray-400">
          Count dots, estimate multiplication, compare quantities. 15 rounds of fast-paced
          estimation challenges. Speed and accuracy both matter!
        </p>
      </div>

      <RapidEstimationTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Rapid Estimation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Mental Math Speed</h3>
            <p className="text-sm text-gray-400">
              Rapid estimation combines number sense, visual processing, and mental
              arithmetic. It tests your ability to quickly approximate quantities and
              calculate under time pressure - skills useful in daily life.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Estimation Strategies</h3>
            <p className="text-sm text-gray-400">
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
            name: "Rapid Estimation Test",
            description: "Test your rapid estimation skills with dots, multiplication, and quantity comparison.",
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
                name: "What is rapid estimation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rapid estimation is the ability to quickly approximate quantities, calculate mental math, and compare numbers under time pressure. It combines visual processing, number sense, and mental arithmetic.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve estimation speed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice regularly with timed exercises. Learn mental math shortcuts like rounding. For dot counting, practice grouping clusters. Build number sense through daily estimation games.",
                },
              },
              {
                "@type": "Question",
                name: "What's a good score on rapid estimation test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "800-1200 is average, 1200-1600 is good, and 1600+ is expert level. The test rewards both accuracy and speed, with time bonuses for quick answers.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
