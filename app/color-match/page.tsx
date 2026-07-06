import type { Metadata } from "next";
import ColorMatchPlay from "./ColorMatchPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Odd Color Out - Color Perception Test | BenchMyBrain",
  description:
    "Test your color perception. Find the tile with a slightly different shade in an increasingly difficult grid. How subtle can you detect?",
  keywords: [
    "color perception test",
    "odd color out",
    "color vision test",
    "color difference test",
    "visual perception test",
    "eye test",
    "shade detection",
  ],
  openGraph: {
    title: "Odd Color Out - Color Perception Test | BenchMyBrain",
    description:
      "Test your color perception. Find the tile with a slightly different shade in an increasingly difficult grid.",
    type: "website",
  },
  alternates: {
    canonical: "/color-match",
  },
};

export default function ColorMatchPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <ColorMatchPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Color Perception</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What This Tests</h3>
            <p className="text-sm text-ink-2">
              This test measures your ability to distinguish subtle color differences.
              It tests your cone cells (color receptors) and visual cortex processing.
              People with normal color vision can typically reach level 15-18.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why It Gets Harder</h3>
            <p className="text-sm text-ink-2">
              As levels increase, the grid grows larger (more tiles to scan) and the
              color difference shrinks. Your brain must detect increasingly subtle
              hue or lightness variations under time pressure.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Factors That Help</h3>
            <p className="text-sm text-ink-2">
              Screen brightness and quality matter. Calibrated displays show more
              subtle differences. Women statistically have slightly better color
              discrimination due to having more cone types on average.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Real-World Application</h3>
            <p className="text-sm text-ink-2">
              Color discrimination is important for designers, artists, photographers,
              and quality control inspectors. This type of test is also used to screen
              for color vision deficiencies.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/color-match" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Odd Color Out - Color Perception Test",
            description:
              "Free online color perception test. Find the differently-shaded tile in an increasingly difficult grid.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
