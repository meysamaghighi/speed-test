import type { Metadata } from "next";
import RhythmPlay from "./RhythmPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Rhythm Timing Test - Test Your Sense of Rhythm | BenchMyBrain",
  description:
    "Test your rhythm and timing accuracy with this free online tool. Listen to beat patterns and tap them back. Challenge your musical timing and coordination.",
  keywords: [
    "rhythm test",
    "timing test",
    "beat memory",
    "rhythm accuracy",
    "musical timing",
    "sense of rhythm",
  ],
  openGraph: {
    title: "Rhythm Timing Test - Test Your Sense of Rhythm | BenchMyBrain",
    description:
      "Test your rhythm and timing accuracy with this free online tool. Listen to beat patterns and tap them back. Challenge your musical timing and coordination.",
    type: "website",
  },
  alternates: {
    canonical: "/rhythm",
  },
};

export default function RhythmPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <RhythmPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Rhythm & Timing</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why Rhythm Matters</h3>
            <p className="text-sm text-ink-2">
              Rhythm timing is crucial for musicians, dancers, and athletes. It
              involves coordination between auditory processing, motor planning,
              and precise execution. Good rhythm timing indicates strong neural
              synchronization and motor control.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Can You Improve?</h3>
            <p className="text-sm text-ink-2">
              Yes! Rhythm timing improves with practice. Musicians train this
              skill constantly. Playing rhythm games, practicing with a
              metronome, or learning an instrument all enhance your ability to
              internalize and reproduce timing patterns accurately.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/rhythm" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Rhythm Timing Test",
            description: "Free online rhythm and timing test. Listen to beats and tap them back to test your sense of rhythm.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
