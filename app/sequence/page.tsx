import type { Metadata } from "next";
import SequencePlay from "./SequencePlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Sequence Memory Test - How Long a Pattern Can You Remember?",
  description: "Free sequence memory test (Simon says). Watch tiles light up in order, then repeat the pattern. Each level adds one more step.",
  keywords: ["sequence memory test", "simon says game", "pattern memory", "memory sequence game", "brain training"],
  openGraph: {
    title: "Sequence Memory Test - How Long a Pattern Can You Remember? | BenchMyBrain",
    description: "Free sequence memory test (Simon says). Watch tiles light up in order, then repeat the pattern. Each level adds one more step.",
    type: "website",
    images: [{ url: "/api/og?test=sequence", width: 1200, height: 630, alt: "Sequence Memory Test - How Long a Pattern Can You Remember? | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sequence Memory Test - How Long a Pattern Can You Remember? | BenchMyBrain",
    description: "Free sequence memory test (Simon says). Watch tiles light up in order, then repeat the pattern. Each level adds one more step.",
    images: ["/api/og?test=sequence"],
  },
  alternates: {
    canonical: "/sequence",
  },
};

export default function SequencePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <SequencePlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Sequence Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">The Simon Effect</h3>
            <p className="text-sm text-ink-2">This test is based on the classic Simon electronic game from the 1970s. It measures your ability to encode and recall ordered sequences, a key component of working memory used in everything from following directions to learning music.</p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Tips</h3>
            <p className="text-sm text-ink-2">Try creating a mental &quot;path&quot; between the tiles rather than memorizing individual positions. Some people find it helpful to assign each position a number or direction. Practice improves sequence memory significantly.</p>
          </div>
        </div>
        <p className="text-sm text-ink-2">
          Healthy adults typically reach a spatial sequence span of about 6 tiles on tasks like
          this — the classic Corsi block-tapping test (Kessels et al., 2000,
          <em> Applied Neuropsychology</em>).
        </p>
      </section>
      <RelatedTests current="/sequence" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Sequence Memory Test", description: "Free sequence memory test. Repeat the pattern of tiles.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
    </main>
  );
}
