import type { Metadata } from "next";
import MathMemoryPlay from "./MathMemoryPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Math Memory Test - Mental Math & Working Memory | BenchMyBrain",
  description:
    "Test your math working memory. Equations flash briefly, then disappear. Can you solve them from memory? Difficulty increases with each correct answer.",
  keywords: [
    "math memory test",
    "working memory test",
    "mental math test",
    "equation memory",
    "math speed test",
    "cognitive math",
  ],
  openGraph: {
    title: "Math Memory Test - Mental Math & Working Memory | BenchMyBrain",
    description: "Test your math working memory. Equations flash briefly, then disappear. Can you solve them from memory? Difficulty increases with each correct answer.",
    type: "website",
    images: [{ url: "/api/og?test=math-memory", width: 1200, height: 630, alt: "Math Memory Test - Mental Math & Working Memory | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Memory Test - Mental Math & Working Memory | BenchMyBrain",
    description: "Test your math working memory. Equations flash briefly, then disappear. Can you solve them from memory? Difficulty increases with each correct answer.",
    images: ["/api/og?test=math-memory"],
  },
  alternates: {
    canonical: "/math-memory",
  },
};

export default function MathMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <MathMemoryPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Math Working Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Dual Processing</h3>
            <p className="text-sm text-ink-2">
              This test requires both memory (holding the equation) and computation
              (solving it). Your working memory must juggle both tasks simultaneously,
              making it harder than pure memory or pure math alone.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Mental Math Skills</h3>
            <p className="text-sm text-ink-2">
              Strong mental math correlates with better problem-solving and
              logical reasoning. Practice improves both speed and working memory
              capacity. Kids who do mental math regularly score higher on IQ tests.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/math-memory" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Math Memory Test",
            description: "Test your math working memory with equations that flash and disappear.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
