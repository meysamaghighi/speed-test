import type { Metadata } from "next";
import TrailMakingPlay from "./TrailMakingPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Trail Making Test - Free Online Cognitive Assessment",
  description:
    "Free Trail Making Test. Connect circles in alternating number-letter order (1-A-2-B-3-C...) as fast as you can. Tests executive function and mental flexibility.",
  keywords: ["trail making test", "trail making", "executive function test", "cognitive flexibility", "brain test", "TMT", "neuropsychological test"],
  openGraph: {
    title: "Trail Making Test - Test Executive Function | BenchMyBrain",
    description: "Free Trail Making Test. Connect circles in alternating number-letter order (1-A-2-B-3-C...) as fast as you can. Tests executive function and mental flexibility.",
    type: "website",
    images: [{ url: "/api/og?test=trail-making", width: 1200, height: 630, alt: "Trail Making Test - Test Executive Function | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trail Making Test - Test Executive Function | BenchMyBrain",
    description: "Free Trail Making Test. Connect circles in alternating number-letter order (1-A-2-B-3-C...) as fast as you can. Tests executive function and mental flexibility.",
    images: ["/api/og?test=trail-making"],
  },
  alternates: {
    canonical: "/trail-making",
  },
};

export default function TrailMakingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <TrailMakingPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Trail Making</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Clinical Use</h3>
            <p className="text-sm text-ink-2">
              The Trail Making Test is a neuropsychological assessment used to detect cognitive impairment. Part B (alternating numbers/letters) is particularly sensitive to frontal lobe dysfunction. It's commonly used in dementia screening and TBI assessments.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What It Measures</h3>
            <p className="text-sm text-ink-2">
              This test measures visual scanning, processing speed, mental flexibility, and executive function. The alternating sequence (1-A-2-B) requires you to switch between two mental sets, which is a core executive function skill.
            </p>
          </div>
        </div>
        <p className="text-sm text-ink-2">
          Healthy adults typically complete an alternating number-letter trail like this one — the
          classic Trail Making Test Part B — in roughly 50&ndash;75 seconds (Tombaugh, 2004,
          <em> Archives of Clinical Neuropsychology</em>).
        </p>
      </section>

      <RelatedTests current="/trail-making" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Trail Making Test", description: "Free Trail Making Test. Connect circles in alternating number-letter order.", applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

    </main>
  );
}
