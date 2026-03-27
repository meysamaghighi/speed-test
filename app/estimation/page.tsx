import type { Metadata } from "next";
import EstimationTest from "../components/EstimationTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Estimation Test - Number Sense & Subitizing | BenchMyBrain",
  description:
    "Test your number estimation and subitizing ability. Dots flash for 1 second - how many were there? From 5 to 85 dots across 10 rounds.",
  keywords: [
    "estimation test",
    "number sense test",
    "subitizing test",
    "quantity estimation",
    "numeracy test",
    "dot counting",
  ],
  openGraph: {
    title: "Estimation Test - Number Sense & Subitizing | BenchMyBrain",
    description:
      "Test your number estimation and subitizing ability. Dots flash for 1 second - how many were there? From 5 to 85 dots across 10 rounds.",
    type: "website",
  },
};

export default function EstimationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Estimation Test
        </h1>
        <p className="text-gray-400">
          Dots appear for 1 second. Estimate how many you saw.
          10 rounds, from 5 to 85 dots. Tests your number sense.
        </p>
      </div>

      <EstimationTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Number Sense</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Subitizing</h3>
            <p className="text-sm text-gray-400">
              Subitizing is the ability to instantly recognize small quantities (1-4)
              without counting. Beyond 5 items, we switch to estimation or counting.
              This is an innate ability shared with many animals.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Estimation Strategies</h3>
            <p className="text-sm text-gray-400">
              For larger quantities, experts use clustering (count one cluster,
              multiply) or reference points (compare to known quantities).
              Estimation accuracy improves with practice and math skills.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/estimation" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Estimation Test",
            description: "Test your number sense and quantity estimation from 5 to 85 dots.",
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
                name: "What is number sense?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Number sense is an intuitive understanding of quantities, their relationships, and magnitude. It includes subitizing (instant recognition of small quantities) and estimation of larger quantities.",
                },
              },
              {
                "@type": "Question",
                name: "Can estimation be improved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Practice estimation regularly. Play guessing games (jellybeans in jar). Use clustering strategies. Strong math skills correlate with better estimation ability.",
                },
              },
              {
                "@type": "Question",
                name: "What's a good score on estimation test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "90%+ accuracy is excellent, 80-89% is very good, 70-79% is good, 60-69% is fair. Most people score 70-80% accuracy. Lower quantities are easier to estimate accurately.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
