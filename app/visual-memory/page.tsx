import type { Metadata } from "next";
import VisualMemoryPlay from "./VisualMemoryPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Visual Memory Test - How Good Is Your Visual Memory?",
  description:
    "Free visual memory test. A pattern of tiles flashes on a grid — remember and click them. Each level adds more tiles. 3 lives. How far can you go?",
  keywords: ["visual memory test", "memory test", "pattern memory", "grid memory test", "brain memory test", "short term memory"],
  openGraph: {
    title: "Visual Memory Test - How Many Tiles Can You Remember? | BenchMyBrain",
    description:
      "Free visual memory test. A pattern of tiles flashes on a grid — remember and click them. Each level adds more tiles. 3 lives. How far can you go?",
    type: "website",
  },
  alternates: {
    canonical: "/visual-memory",
  },
};

export default function VisualMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <VisualMemoryPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Visual Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What Is Visual Memory?</h3>
            <p className="text-sm text-ink-2">
              Visual memory is the ability to remember shapes, patterns, and spatial information. It is a key component of short-term memory and is heavily used in reading, navigation, and recognizing faces. Strong visual memory helps in games, puzzles, and learning.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Tips to Improve</h3>
            <p className="text-sm text-ink-2">
              Try grouping tiles into shapes (L-shapes, lines, clusters). Instead of memorizing individual tiles, memorize the overall pattern shape. Regular practice improves visual working memory. Some studies show improvement within 2 weeks of daily practice.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/visual-memory" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Visual Memory Test", description: "Free visual memory test. Memorize tile patterns and click them back.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

    </main>
  );
}
