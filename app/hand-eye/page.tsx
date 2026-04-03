import type { Metadata } from "next";
import HandEye from "../components/HandEye";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Hand-Eye Coordination Test - Free Online Motor Skills Test",
  description:
    "Free Hand-Eye Coordination Test. Click/tap a moving target that bounces around the screen. It gets smaller and faster each level. 30 seconds. Tests motor control and visual tracking.",
  keywords: ["hand-eye coordination test", "motor skills test", "coordination test", "reaction time", "tracking test", "aiming test"],
  openGraph: {
    title: "Hand-Eye Coordination Test - Test Motor Skills | BenchMyBrain",
    description:
      "Free Hand-Eye Coordination Test. Click/tap a moving target that gets smaller and faster. 30 seconds.",
    type: "website",
  },
  alternates: {
    canonical: "/hand-eye",
  },
};

export default function HandEyePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Hand-Eye Coordination</h1>
        <p className="text-gray-400">
          Click the moving target as many times as you can in 30 seconds. It gets smaller and faster!
        </p>
      </div>
      <HandEye />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Hand-Eye Coordination</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What It Measures</h3>
            <p className="text-sm text-gray-400">
              Hand-eye coordination is the ability to process visual input and execute precise motor responses. This test measures visual tracking, predictive timing, reaction time, and fine motor control. It's essential for sports, gaming, and everyday tasks.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Improving Coordination</h3>
            <p className="text-sm text-gray-400">
              Hand-eye coordination improves with practice. Activities like playing sports (tennis, baseball), video games (especially FPS and rhythm games), juggling, and even typing can enhance coordination. Regular practice shows measurable improvement within weeks.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/hand-eye" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Hand-Eye Coordination Test", description: "Free hand-eye coordination test. Click moving targets.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good hand-eye coordination score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "25+ catches in 30 seconds is very good. The average is around 20-25 catches. The target gets smaller and faster with each level, so maintaining accuracy becomes increasingly difficult.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my hand-eye coordination?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice activities that require precise visual-motor integration: sports (tennis, table tennis, baseball), video games (FPS, rhythm games), juggling, or even this test repeatedly. Improvement is typically visible within 2-3 weeks of daily practice.",
                },
              },
              {
                "@type": "Question",
                name: "What affects hand-eye coordination?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hand-eye coordination depends on visual processing speed, reaction time, motor control, and predictive timing. Age, fatigue, screen refresh rate, input lag, and mouse/touchscreen sensitivity all affect performance.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
