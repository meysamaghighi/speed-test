import type { Metadata } from "next";
import RhythmTest from "../components/RhythmTest";
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
        <h1 className="text-4xl font-black text-white mb-3">
          Rhythm Timing Test
        </h1>
        <p className="text-gray-400">
          Listen to the beat pattern, then tap it back as accurately as you can.
          Each level adds one beat and tightens the timing tolerance.
        </p>
      </div>

      <RhythmTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Rhythm & Timing</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why Rhythm Matters</h3>
            <p className="text-sm text-gray-400">
              Rhythm timing is crucial for musicians, dancers, and athletes. It
              involves coordination between auditory processing, motor planning,
              and precise execution. Good rhythm timing indicates strong neural
              synchronization and motor control.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Can You Improve?</h3>
            <p className="text-sm text-gray-400">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is rhythm timing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rhythm timing is the ability to perceive and reproduce time intervals accurately. It involves listening to a pattern of beats and recreating it with precise timing. This skill is essential for musicians, dancers, and anyone working with timed sequences.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my sense of rhythm?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice with a metronome, play rhythm-based video games, learn a musical instrument, or take dance classes. Regular practice with timed patterns helps train your brain to internalize and reproduce rhythms more accurately.",
                },
              },
              {
                "@type": "Question",
                name: "Is rhythm timing innate or learned?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both. Humans have a natural ability to perceive rhythm, but precision timing is largely learned through practice. Musicians and dancers develop exceptional timing through years of training. Anyone can improve with consistent practice.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
