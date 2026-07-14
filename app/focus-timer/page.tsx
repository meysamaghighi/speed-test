import type { Metadata } from "next";
import FocusTimerPlay from "./FocusTimerPlay";
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
    description: "Test your internal sense of time. Estimate exact durations (5s, 10s, 15s, 30s) without a visible clock. Measure your time perception accuracy.",
    type: "website",
    images: [{ url: "/api/og?test=focus-timer", width: 1200, height: 630, alt: "Focus Timer Test - Test Your Internal Clock | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Timer Test - Test Your Internal Clock | BenchMyBrain",
    description: "Test your internal sense of time. Estimate exact durations (5s, 10s, 15s, 30s) without a visible clock. Measure your time perception accuracy.",
    images: ["/api/og?test=focus-timer"],
  },
  alternates: {
    canonical: "/focus-timer",
  },
};

export default function FocusTimerPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <FocusTimerPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">How It Works</h2>
        <div className="bg-paper-2 rounded-xl p-5 border border-line">
          <p className="text-sm text-ink-2 mb-3">
            You'll see a target duration (e.g., 10 seconds). Press START, then wait and press
            STOP when you think that much time has passed. No clock is visible during timing.
          </p>
          <p className="text-sm text-ink-2 mb-3">
            You'll complete 4 rounds with progressively longer durations: 5, 10, 15, and 30 seconds.
            Your score is based on accuracy (% error from the target time).
          </p>
          <p className="text-sm text-ink-2">
            Score = 100 - average error percentage. Lower error = higher score (max 100).
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Time Perception</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Chronoception</h3>
            <p className="text-sm text-ink-2">
              Chronoception (time perception) is the sense of time passing. Unlike vision or hearing,
              there's no single "time receptor." The brain's suprachiasmatic nucleus (SCN) helps
              regulate circadian rhythms and time estimation.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why Time Feels Different</h3>
            <p className="text-sm text-ink-2">
              Attention affects time perception. Boring tasks feel longer; engaging activities
              feel shorter. Anxiety and fear slow perceived time. Age also matters—time feels
              faster as you get older due to proportional memory formation.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Brain Regions Involved</h3>
            <p className="text-sm text-ink-2">
              The cerebellum and basal ganglia are key for time estimation. The prefrontal cortex
              helps with longer durations (seconds to minutes). Dopamine levels affect time
              perception—higher dopamine makes time feel slower.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Improving Time Sense</h3>
            <p className="text-sm text-ink-2">
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

    </main>
  );
}
