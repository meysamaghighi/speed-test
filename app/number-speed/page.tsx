import type { Metadata } from "next";
import NumberSpeedPlay from "./NumberSpeedPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Number Speed Test - Test Your Digit Span & Working Memory | BenchMyBrain",
  description:
    "Numbers flash for a fraction of a second — type them back before the clock runs out. A speeded digit span test for working memory. Free, no sign-up.",
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
      "Numbers flash for a fraction of a second — type them back before the clock runs out. A speeded digit span test for working memory.",
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
        <h2 className="text-xl font-bold text-ink">About Number Speed</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Speeded Working Memory</h3>
            <p className="text-sm text-ink-2">
              Number Speed is a speeded digit span: the sequence flashes at
              roughly three digits per second and recall runs against a deadline.
              It measures how quickly your working memory can encode and replay
              information — not just how much it holds.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">How It Differs from Digit Span</h3>
            <p className="text-sm text-ink-2">
              In the classic <a href="/digit-span" className="underline">Digit Span
              test</a>, digits appear one at a time at a comfortable pace and you
              recall them untimed. Here both ends are compressed, so most people
              score 1-2 digits below their relaxed span. Most adults manage 5-7
              digits untimed; 9+ under time pressure is exceptional.
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
            description: "Free online speeded digit span test. Measure how fast your working memory encodes under time pressure.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
