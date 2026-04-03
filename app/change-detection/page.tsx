import type { Metadata } from "next";
import ChangeDetectionTest from "../components/ChangeDetectionTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Change Detection Test - Visual Attention & Memory | BenchMyBrain",
  description:
    "Test your change blindness. A grid of colored circles flashes twice - one color changes. Can you spot what changed?",
  keywords: [
    "change detection test",
    "change blindness test",
    "visual attention test",
    "spot the difference",
    "visual memory test",
    "attention to detail",
  ],
  openGraph: {
    title: "Change Detection Test - Visual Attention & Memory | BenchMyBrain",
    description:
      "Test your change blindness. A grid of colored circles flashes twice - one color changes. Can you spot what changed?",
    type: "website",
  },
  alternates: {
    canonical: "/change-detection",
  },
};

export default function ChangeDetectionPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Change Detection Test
        </h1>
        <p className="text-gray-400">
          A grid of colored circles appears, briefly disappears, then reappears with ONE color changed.
          Click the circle that changed.
        </p>
      </div>

      <ChangeDetectionTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Change Blindness</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Change Blindness</h3>
            <p className="text-sm text-gray-400">
              Change blindness is the phenomenon where large changes to a visual
              scene go unnoticed, especially during brief disruptions. Even
              obvious changes can be missed if attention isn't focused there.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Visual Working Memory</h3>
            <p className="text-sm text-gray-400">
              Research shows we can hold about 3-4 complex visual objects in
              working memory at once. This test challenges your ability to
              encode and compare visual information across time.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/change-detection" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Change Detection Test",
            description: "Test your visual attention and change blindness with colored grids.",
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
                name: "What is change detection?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Change detection is the ability to notice differences between two visual scenes. It requires visual working memory to encode the first scene and compare it to the second.",
                },
              },
              {
                "@type": "Question",
                name: "Why do we miss obvious changes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Change blindness occurs because our visual system doesn't store complete scene representations. We only encode what we attend to, so changes outside our focus often go unnoticed.",
                },
              },
              {
                "@type": "Question",
                name: "What's a good score on change detection test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Level 1-2 is beginner (2x2 grid), 3-4 is average (3x3 and 4x4), 5-6 is good (5x5), and 7+ is excellent. Most people struggle beyond 4x4 grids.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
