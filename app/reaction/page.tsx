import type { Metadata } from "next";
import ReactionPlay from "./ReactionPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Reaction Time Test - How Fast Are Your Reflexes? | BenchMyBrain",
  description:
    "Test your reaction time with this free online tool. Click when the screen turns green and see your speed in milliseconds. Average is 250ms.",
  keywords: [
    "reaction time test",
    "reaction speed test",
    "reflex test",
    "how fast are my reflexes",
    "click speed test",
    "reaction time average",
  ],
  openGraph: {
    title: "Reaction Time Test - How Fast Are Your Reflexes? | BenchMyBrain",
    description:
      "Test your reaction time with this free online tool. Click when the screen turns green and see your speed in milliseconds. Average is 250ms.",
    type: "website",
  },
  alternates: {
    canonical: "/reaction",
  },
};

export default function ReactionPage() {
  return (
    <main className="bg-paper text-ink">
      <ReactionPlay />

      <section className="max-w-2xl mx-auto px-4 mt-12 space-y-6">
        <h2
          className="font-display text-xl text-ink"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          About Reaction Time
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What Affects It?</h3>
            <p className="text-sm text-ink-2">
              Sleep, caffeine, age, attention, and practice all affect reaction
              time. Most people react faster in the afternoon than morning.
              Gamers typically have faster reactions than non-gamers.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Average Times</h3>
            <p className="text-sm text-ink-2">
              The average human reaction time to visual stimulus is about 250ms.
              Professional esports players average 150-200ms. The absolute human
              limit is around 100ms due to nerve signal travel time.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4">
        <RelatedTests current="/reaction" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Reaction Time Test",
            description: "Free online reaction time test. Measure your reflexes in milliseconds.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
