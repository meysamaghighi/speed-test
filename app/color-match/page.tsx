import type { Metadata } from "next";
import ColorMatchTest from "../components/ColorMatchTest";
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
        <h1 className="text-4xl font-black text-white mb-3">
          Odd Color Out
        </h1>
        <p className="text-gray-400">
          Find the tile that is a different shade. Gets harder as you level up.
        </p>
      </div>

      <ColorMatchTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Color Perception</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What This Tests</h3>
            <p className="text-sm text-gray-400">
              This test measures your ability to distinguish subtle color differences.
              It tests your cone cells (color receptors) and visual cortex processing.
              People with normal color vision can typically reach level 15-18.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why It Gets Harder</h3>
            <p className="text-sm text-gray-400">
              As levels increase, the grid grows larger (more tiles to scan) and the
              color difference shrinks. Your brain must detect increasingly subtle
              hue or lightness variations under time pressure.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Factors That Help</h3>
            <p className="text-sm text-gray-400">
              Screen brightness and quality matter. Calibrated displays show more
              subtle differences. Women statistically have slightly better color
              discrimination due to having more cone types on average.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Real-World Application</h3>
            <p className="text-sm text-gray-400">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What does the Odd Color Out test measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It measures your color discrimination ability -- how well you can distinguish subtle differences in hue and lightness. It tests the sensitivity of your cone cells and visual processing speed.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good score on this test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Reaching level 15+ with high accuracy indicates excellent color perception. Most people with normal color vision can reach level 10-15. Scores above 2400 are considered excellent.",
                },
              },
              {
                "@type": "Question",
                name: "Is this test related to the Stroop test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The Stroop test measures cognitive interference (reading vs. color naming). This test measures pure color perception -- your ability to detect subtle shade differences, which is a visual rather than cognitive skill.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
