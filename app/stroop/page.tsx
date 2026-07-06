import type { Metadata } from "next";
import StroopPlay from "./StroopPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Stroop Color Test - Can Your Brain Ignore the Word?",
  description: "Free Stroop effect test. A color name appears in a different ink color. Pick the ink color, not the word. Tests cognitive flexibility and attention.",
  keywords: ["stroop test", "stroop effect", "color test", "brain test", "cognitive test", "attention test", "color word test"],
  openGraph: {
    title: "Stroop Color Test - Test Your Brain's Processing Speed | BenchMyBrain",
    description: "Free Stroop effect test. A color name appears in a different ink color. Pick the ink color, not the word. Tests cognitive flexibility and attention.",
    type: "website",
  },
  alternates: {
    canonical: "/stroop",
  },
};

export default function StroopPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <StroopPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">The Stroop Effect</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What Is It?</h3>
            <p className="text-sm text-ink-2">The Stroop effect (discovered by John Ridley Stroop in 1935) demonstrates that reading is so automatic that your brain struggles to ignore the word and focus on the ink color. This interference reveals how your brain processes conflicting information.</p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why It Matters</h3>
            <p className="text-sm text-ink-2">The Stroop test measures cognitive flexibility, selective attention, and processing speed. It is widely used in psychology and neuroscience research, and even in clinical assessments for conditions like ADHD, dementia, and brain injuries.</p>
          </div>
        </div>
      </section>
      <RelatedTests current="/stroop" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Stroop Color Test", description: "Free Stroop effect test. Pick the ink color, not the word.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
    </main>
  );
}
