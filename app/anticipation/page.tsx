import type { Metadata } from "next";
import AnticipationPlay from "./AnticipationPlay";
import RelatedTests from "../components/RelatedTests";

const TITLE = "Anticipation Timing Test - Free Coincidence Timing Test";
const DESCRIPTION =
  "Free anticipation timing test. Predict when a moving target reaches the finish line after it vanishes. Measures coincidence-anticipation timing and predictive motor control.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "anticipation timing test",
    "coincidence anticipation timing",
    "timing test",
    "predictive timing test",
    "reaction anticipation test",
    "motor timing test",
    "interception timing",
  ],
  openGraph: {
    title: "Anticipation Timing Test - Predict the Perfect Moment | BenchMyBrain",
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/api/og?test=anticipation", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anticipation Timing Test - Predict the Perfect Moment | BenchMyBrain",
    description: DESCRIPTION,
    images: ["/api/og?test=anticipation"],
  },
  alternates: {
    canonical: "/anticipation",
  },
};

export default function AnticipationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <AnticipationPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">What Is Anticipation Timing?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Coincidence-Anticipation</h3>
            <p className="text-sm text-ink-2">
              Anticipation timing (also called coincidence-anticipation timing) is the ability to predict when a moving object will arrive at a specific point, even after losing sight of it. It&apos;s distinct from simple reaction time &mdash; you&apos;re not reacting to a signal, you&apos;re predicting one.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Used in Sports Science</h3>
            <p className="text-sm text-ink-2">
              This skill is central to hitting a baseball, timing a tennis return, or catching a pass. Athletes train it directly; researchers measure it with devices like the Bassin Anticipation Timer. Regular practice sharpens your internal sense of motion and timing.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/anticipation" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Anticipation Timing Test",
            description:
              "Free anticipation timing test. Predict when a moving target reaches the finish line after it vanishes.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}
