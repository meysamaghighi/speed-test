import type { Metadata } from "next";
import ReactionTest from "../components/ReactionTest";
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
};

export default function ReactionPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Reaction Time Test
        </h1>
        <p className="text-gray-400">
          Wait for the screen to turn green, then click as fast as you can. 5
          rounds, we take your average.
        </p>
      </div>

      <ReactionTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Reaction Time</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What Affects It?</h3>
            <p className="text-sm text-gray-400">
              Sleep, caffeine, age, attention, and practice all affect reaction
              time. Most people react faster in the afternoon than morning.
              Gamers typically have faster reactions than non-gamers.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Average Times</h3>
            <p className="text-sm text-gray-400">
              The average human reaction time to visual stimulus is about 250ms.
              Professional esports players average 150-200ms. The absolute human
              limit is around 100ms due to nerve signal travel time.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/reaction" />

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good reaction time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Under 200ms is considered fast. The average human reaction time is about 250ms. Professional gamers typically score 150-180ms. The absolute human limit is around 100ms.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my reaction time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Get enough sleep (7-9 hours), reduce caffeine jitters, practice regularly with tests like this, play fast-paced video games, and test when alert (afternoon is typically best).",
                },
              },
              {
                "@type": "Question",
                name: "Does age affect reaction time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Reaction time peaks in your mid-20s and gradually slows. A 60-year-old averages about 50ms slower than a 20-year-old. Regular practice can offset some of this decline.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
