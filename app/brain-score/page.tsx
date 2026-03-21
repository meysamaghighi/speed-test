import type { Metadata } from "next";
import BrainScore from "../components/BrainScore";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Brain Score - Your Overall Cognitive Score | BenchMyBrain",
  description:
    "Get your Brain Score out of 1000 based on 17 cognitive tests: reaction time, memory, typing, aim, pattern recognition, and more. See how your brain stacks up.",
  keywords: [
    "brain score",
    "cognitive score",
    "IQ test",
    "brain test results",
    "mental performance",
    "cognitive benchmark",
    "brain age test",
  ],
  openGraph: {
    title: "Brain Score - Your Overall Cognitive Score | BenchMyBrain",
    description:
      "Get your Brain Score out of 1000 based on 17 cognitive tests. See how your brain stacks up.",
    type: "website",
  },
};

export default function BrainScorePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Brain Score</h1>
        <p className="text-gray-400">
          Your overall cognitive score out of 1000, calculated from your
          personal bests across all tests. The more tests you take, the more
          accurate your score.
        </p>
      </div>

      <BrainScore />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Brain Score</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How It Works</h3>
            <p className="text-sm text-gray-400">
              Each of the 17 tests measures a different cognitive ability. Your
              personal best on each test is normalized to a 0-100 scale, then
              averaged to produce your Brain Score (0-1000). The more tests you
              complete, the more comprehensive your score.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Improve Your Score</h3>
            <p className="text-sm text-gray-400">
              Your brain is trainable. Regular practice on specific tests can
              improve your scores over time. Focus on your weakest areas for the
              biggest gains. Sleep, exercise, and nutrition also significantly
              affect cognitive performance.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/brain-score" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Brain Score Calculator",
            description:
              "Calculate your overall Brain Score out of 1000 based on 17 cognitive tests.",
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
                name: "What is Brain Score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Brain Score is a composite cognitive score from 0-1000 based on your performance across 17 different brain tests including reaction time, memory, typing speed, pattern recognition, and more.",
                },
              },
              {
                "@type": "Question",
                name: "How is Brain Score calculated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each test score is normalized to a 0-100 scale based on human performance ranges. These normalized scores are averaged and multiplied by 10 to give a score out of 1000. Complete all 17 tests for the most accurate result.",
                },
              },
              {
                "@type": "Question",
                name: "Can I improve my Brain Score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Cognitive abilities are trainable. Regular practice, good sleep (7-9 hours), exercise, and proper nutrition all help. Focus on your weakest test areas for the biggest improvements to your overall score.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
