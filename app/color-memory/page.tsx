import type { Metadata } from "next";
import ColorMemoryPlay from "./ColorMemoryPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Color Memory Test - Remember the Sequence | BenchMyBrain",
  description:
    "Test your color memory. Watch colored circles flash in sequence and repeat the pattern. How many colors can you remember?",
  keywords: [
    "color memory test",
    "sequence memory",
    "visual memory test",
    "memory game",
    "color sequence test",
  ],
  openGraph: {
    title: "Color Memory Test - Remember the Sequence | BenchMyBrain",
    description:
      "Test your color memory. Watch colored circles flash in sequence and repeat the pattern. How many colors can you remember?",
    type: "website",
  },
  alternates: {
    canonical: "/color-memory",
  },
};

export default function ColorMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <ColorMemoryPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Color Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Working Memory</h3>
            <p className="text-sm text-ink-2">
              This test measures your working memory capacity for visual sequences.
              Most people can remember 5-7 items in short-term memory (Miller's Law).
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Tips to Improve</h3>
            <p className="text-sm text-ink-2">
              Use chunking strategies (group colors into patterns), verbalize the sequence,
              or use mnemonic techniques. Practice improves both speed and capacity.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/color-memory" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Color Memory Test",
            description: "Free online color memory test. Remember and reproduce color sequences.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
