import type { Metadata } from "next";
import ChangeDetectionPlay from "./ChangeDetectionPlay";
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
      </div>
        <ChangeDetectionPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Change Blindness</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Change Blindness</h3>
            <p className="text-sm text-ink-2">
              Change blindness is the phenomenon where large changes to a visual
              scene go unnoticed, especially during brief disruptions. Even
              obvious changes can be missed if attention isn't focused there.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Visual Working Memory</h3>
            <p className="text-sm text-ink-2">
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

    </main>
  );
}
