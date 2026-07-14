import type { Metadata } from "next";
import HandEyePlay from "./HandEyePlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Hand-Eye Coordination Test - Free Online Motor Skills Test",
  description:
    "Free Hand-Eye Coordination Test. Click/tap a moving target that bounces around the screen. It gets smaller and faster each level. 30 seconds. Tests motor control and visual tracking.",
  keywords: ["hand-eye coordination test", "motor skills test", "coordination test", "reaction time", "tracking test", "aiming test"],
  openGraph: {
    title: "Hand-Eye Coordination Test - Test Motor Skills | BenchMyBrain",
    description: "Free Hand-Eye Coordination Test. Click/tap a moving target that gets smaller and faster. 30 seconds.",
    type: "website",
    images: [{ url: "/api/og?test=hand-eye", width: 1200, height: 630, alt: "Hand-Eye Coordination Test - Test Motor Skills | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hand-Eye Coordination Test - Test Motor Skills | BenchMyBrain",
    description: "Free Hand-Eye Coordination Test. Click/tap a moving target that gets smaller and faster. 30 seconds.",
    images: ["/api/og?test=hand-eye"],
  },
  alternates: {
    canonical: "/hand-eye",
  },
};

export default function HandEyePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <HandEyePlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Hand-Eye Coordination</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What It Measures</h3>
            <p className="text-sm text-ink-2">
              Hand-eye coordination is the ability to process visual input and execute precise motor responses. This test measures visual tracking, predictive timing, reaction time, and fine motor control. It's essential for sports, gaming, and everyday tasks.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Improving Coordination</h3>
            <p className="text-sm text-ink-2">
              Hand-eye coordination improves with practice. Activities like playing sports (tennis, baseball), video games (especially FPS and rhythm games), juggling, and even typing can enhance coordination. Regular practice shows measurable improvement within weeks.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/hand-eye" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Hand-Eye Coordination Test", description: "Free hand-eye coordination test. Click moving targets.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

    </main>
  );
}
