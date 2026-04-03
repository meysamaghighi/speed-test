import type { Metadata } from "next";
import FocusTimerTest from "../components/FocusTimerTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Focus Timer Test - Test Your Internal Clock | BenchMyBrain",
  description:
    "Test your internal sense of time. Estimate exact durations (5s, 10s, 15s, 30s) without a visible clock. Measure your time perception accuracy.",
  keywords: [
    "time perception test",
    "internal clock test",
    "time estimation test",
    "focus test",
    "chronoception test",
    "temporal perception",
  ],
  openGraph: {
    title: "Focus Timer Test - Test Your Internal Clock | BenchMyBrain",
    description:
      "Test your internal sense of time. Estimate exact durations (5s, 10s, 15s, 30s) without a visible clock. Measure your time perception accuracy.",
    type: "website",
  },
  alternates: {
    canonical: "/focus-timer",
  },
};

export default function FocusTimerPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Focus Timer Test
        </h1>
        <p className="text-gray-400">
          Estimate exact durations without a visible clock. Test your internal sense of time.
        </p>
      </div>

      <FocusTimerTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">How It Works</h2>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-sm text-gray-400 mb-3">
            You'll see a target duration (e.g., 10 seconds). Press START, then wait and press
            STOP when you think that much time has passed. No clock is visible during timing.
          </p>
          <p className="text-sm text-gray-400 mb-3">
            You'll complete 4 rounds with progressively longer durations: 5, 10, 15, and 30 seconds.
            Your score is based on accuracy (% error from the target time).
          </p>
          <p className="text-sm text-gray-400">
            Score = 100 - average error percentage. Lower error = higher score (max 100).
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-white">About Time Perception</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Chronoception</h3>
            <p className="text-sm text-gray-400">
              Chronoception (time perception) is the sense of time passing. Unlike vision or hearing,
              there's no single "time receptor." The brain's suprachiasmatic nucleus (SCN) helps
              regulate circadian rhythms and time estimation.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why Time Feels Different</h3>
            <p className="text-sm text-gray-400">
              Attention affects time perception. Boring tasks feel longer; engaging activities
              feel shorter. Anxiety and fear slow perceived time. Age also matters—time feels
              faster as you get older due to proportional memory formation.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Brain Regions Involved</h3>
            <p className="text-sm text-gray-400">
              The cerebellum and basal ganglia are key for time estimation. The prefrontal cortex
              helps with longer durations (seconds to minutes). Dopamine levels affect time
              perception—higher dopamine makes time feel slower.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Improving Time Sense</h3>
            <p className="text-sm text-gray-400">
              Musicians and athletes often have better time perception due to rhythmic training.
              Meditation and mindfulness improve awareness of time passing. Counting (not recommended
              here) can help, but true internal sense comes from practice and attention.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/focus-timer" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Focus Timer Test",
            description: "Free online time perception and internal clock test. Estimate durations without a visible timer.",
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
                name: "What is chronoception?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chronoception is the sense of time passing. Unlike other senses, there's no single receptor. The brain's suprachiasmatic nucleus (SCN) and other regions work together to estimate time.",
                },
              },
              {
                "@type": "Question",
                name: "Why does time feel different in different situations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Attention affects time perception. Boring or anxious moments feel longer; engaging activities feel shorter. Dopamine levels also matter—higher dopamine makes time feel slower. Age affects perception too.",
                },
              },
              {
                "@type": "Question",
                name: "Which brain regions control time perception?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The cerebellum and basal ganglia handle short-interval timing (milliseconds to seconds). The prefrontal cortex manages longer durations. Dopamine pathways modulate time perception speed.",
                },
              },
              {
                "@type": "Question",
                name: "Can I improve my internal clock?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Musicians and athletes often have superior time sense from rhythmic training. Meditation improves awareness of time passing. Practice and focused attention help refine your internal clock.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
