import type { Metadata } from "next";
import VisualSearchPlay from "./VisualSearchPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Visual Search Test - Find the Odd One Out | BenchMyBrain",
  description:
    "Test your visual search speed. Find the different shape in a grid as fast as you can. Measures attention and visual processing.",
  keywords: [
    "visual search test",
    "attention test",
    "find the difference",
    "visual processing",
    "concentration test",
  ],
  openGraph: {
    title: "Visual Search Test - Find the Odd One Out | BenchMyBrain",
    description:
      "Test your visual search speed. Find the different shape in a grid as fast as you can. Measures attention and visual processing.",
    type: "website",
  },
  alternates: {
    canonical: "/visual-search",
  },
};

export default function VisualSearchPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <VisualSearchPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Visual Search</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Selective Attention</h3>
            <p className="text-sm text-ink-2">
              Visual search tests measure selective attention -- your ability to find a target
              among distractors. Used in cognitive psychology and airport security training.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Pop-Out vs Serial</h3>
            <p className="text-sm text-ink-2">
              Easy searches (very different target) show pop-out effect where search time
              doesn't increase with grid size. Hard searches require serial scanning.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/visual-search" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Visual Search Test",
            description: "Free online visual search test. Measure your attention and visual processing speed.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
