import type { Metadata } from "next";
import NumberSpeedPlay from "./NumberSpeedPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Number Speed Test - Test Your Digit Span & Working Memory | BenchMyBrain",
  description:
    "Test your digit span and working memory. Memorize sequences of numbers and recall them. Free online test for cognitive assessment.",
  keywords: [
    "digit span test",
    "number memory test",
    "working memory test",
    "cognitive test",
    "memory span",
    "number recall",
  ],
  openGraph: {
    title: "Number Speed Test - Test Your Digit Span & Working Memory | BenchMyBrain",
    description:
      "Test your digit span and working memory. Memorize sequences of numbers and recall them. Free online test for cognitive assessment.",
    type: "website",
  },
  alternates: {
    canonical: "/number-speed",
  },
};

export default function NumberSpeedPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <NumberSpeedPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Digit Span</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Working Memory</h3>
            <p className="text-sm text-ink-2">
              Digit span measures your working memory capacity — how many items
              you can temporarily hold and manipulate in your mind. It's a key
              component of intelligence tests like the WAIS.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What's Normal?</h3>
            <p className="text-sm text-ink-2">
              Most adults can remember 5-7 digits. George Miller's famous paper
              "The Magical Number Seven" identified this as the typical limit of
              short-term memory. Scores of 9+ are exceptional.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/number-speed" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Number Speed Test",
            description: "Free online digit span test. Measure your working memory capacity.",
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
                name: "What is a good digit span score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The average adult can remember 5-7 digits. A score of 7-8 is above average, and 9+ is exceptional. Professional memory athletes can exceed 20+ digits with specialized training.",
                },
              },
              {
                "@type": "Question",
                name: "What does digit span measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Digit span measures working memory capacity — the amount of information you can hold in your mind at once. It's used in IQ tests and cognitive assessments to evaluate short-term memory and attention.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my digit span?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice chunking (grouping digits), use visualization techniques, practice regularly with tests like this, get enough sleep, and try memory training games. Working memory can improve with consistent practice.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
