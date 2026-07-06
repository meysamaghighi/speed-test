import type { Metadata } from "next";
import DigitSpanPlay from "./DigitSpanPlay";
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
      </div>
        <DigitSpanPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">How It Works</h2>
        <div className="bg-paper-2 rounded-xl p-5 border border-line">
          <p className="text-sm text-ink-2 mb-3">
            Choose forward or backward mode. In forward mode, digits appear one at a time
            and you type them back in the same order. In backward mode, you must reverse
            the order.
          </p>
          <p className="text-sm text-ink-2">
            Start with 3 digits. Each successful round adds one more digit. Keep going
            until you make a mistake. Your score is the maximum number of digits you
            remembered.
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Digit Span</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Working Memory</h3>
            <p className="text-sm text-ink-2">
              The digit span test measures working memory capacity - your ability to
              hold and manipulate information in your mind. Average forward span is 7±2
              digits (Miller's Law).
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Forward vs Backward</h3>
            <p className="text-sm text-ink-2">
              Forward digit span tests simple recall. Backward digit span is harder
              because it requires mental manipulation. Backward span averages 2-3 digits
              less than forward.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Clinical Use</h3>
            <p className="text-sm text-ink-2">
              Digit span is part of many IQ tests (WAIS, Stanford-Binet) and cognitive
              assessments. It correlates with attention, concentration, and cognitive
              processing speed.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Improving Your Span</h3>
            <p className="text-sm text-ink-2">
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

    </main>
  );
}
