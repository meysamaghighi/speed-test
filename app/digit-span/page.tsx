import type { Metadata } from "next";
import DigitSpanTest from "../components/DigitSpanTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Digit Span Test - Working Memory Test | BenchMyBrain",
  description:
    "Test your working memory with the digit span test. Digits appear one at a time - type them back forward or backward. How many can you remember?",
  keywords: [
    "digit span test",
    "working memory test",
    "memory test",
    "digit memory",
    "forward digit span",
    "backward digit span",
    "cognitive test",
  ],
  openGraph: {
    title: "Digit Span Test - Working Memory Test | BenchMyBrain",
    description:
      "Test your working memory with the digit span test. Digits appear one at a time - type them back forward or backward. How many can you remember?",
    type: "website",
  },
  alternates: {
    canonical: "/digit-span",
  },
};

export default function DigitSpanPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Digit Span Test</h1>
        <p className="text-gray-400">
          Digits flash one at a time. Type them back in order (forward or backward).
        </p>
      </div>

      <DigitSpanTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">How It Works</h2>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-sm text-gray-400 mb-3">
            Choose forward or backward mode. In forward mode, digits appear one at a time
            and you type them back in the same order. In backward mode, you must reverse
            the order.
          </p>
          <p className="text-sm text-gray-400">
            Start with 3 digits. Each successful round adds one more digit. Keep going
            until you make a mistake. Your score is the maximum number of digits you
            remembered.
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-white">About Digit Span</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Working Memory</h3>
            <p className="text-sm text-gray-400">
              The digit span test measures working memory capacity - your ability to
              hold and manipulate information in your mind. Average forward span is 7±2
              digits (Miller's Law).
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Forward vs Backward</h3>
            <p className="text-sm text-gray-400">
              Forward digit span tests simple recall. Backward digit span is harder
              because it requires mental manipulation. Backward span averages 2-3 digits
              less than forward.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Clinical Use</h3>
            <p className="text-sm text-gray-400">
              Digit span is part of many IQ tests (WAIS, Stanford-Binet) and cognitive
              assessments. It correlates with attention, concentration, and cognitive
              processing speed.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Improving Your Span</h3>
            <p className="text-sm text-gray-400">
              Chunking (grouping digits), rehearsal, and practice can improve digit span.
              Working memory training may help, though benefits don't always transfer to
              other tasks.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/digit-span" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Digit Span Test",
            description:
              "Free online digit span test. Measure working memory by remembering digit sequences forward or backward.",
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
                name: "What is digit span?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Digit span is a measure of working memory capacity - how many digits you can hold in your mind at once. The average forward digit span is about 7±2 digits (Miller's Law).",
                },
              },
              {
                "@type": "Question",
                name: "What is a good digit span score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Average forward digit span is 7 digits. 9+ is excellent, 12+ is elite. Backward digit span is typically 2-3 digits less than forward (5 average, 7+ excellent).",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my digit span?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice with chunking (grouping digits into pairs or triplets), rehearsal, and repetition. Working memory training exercises may help, though benefits vary by individual.",
                },
              },
              {
                "@type": "Question",
                name: "What does backward digit span measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Backward digit span measures working memory manipulation - not just holding information, but mentally reversing it. It's harder than forward span and tests executive function.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
