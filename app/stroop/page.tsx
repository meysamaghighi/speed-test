import type { Metadata } from "next";
import ColorTest from "../components/ColorTest";
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
        <h1 className="text-4xl font-black text-white mb-3">Stroop Color Test</h1>
        <p className="text-gray-400">
          A color name appears in a different ink color. Your job: select the
          <strong> ink color</strong>, not the word. Harder than it sounds.
        </p>
      </div>
      <ColorTest />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">The Stroop Effect</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What Is It?</h3>
            <p className="text-sm text-gray-400">The Stroop effect (discovered by John Ridley Stroop in 1935) demonstrates that reading is so automatic that your brain struggles to ignore the word and focus on the ink color. This interference reveals how your brain processes conflicting information.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why It Matters</h3>
            <p className="text-sm text-gray-400">The Stroop test measures cognitive flexibility, selective attention, and processing speed. It is widely used in psychology and neuroscience research, and even in clinical assessments for conditions like ADHD, dementia, and brain injuries.</p>
          </div>
        </div>
      </section>
      <RelatedTests current="/stroop" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Stroop Color Test", description: "Free Stroop effect test. Pick the ink color, not the word.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the Stroop effect?", acceptedAnswer: { "@type": "Answer", text: "The Stroop effect is the delay in reaction time when the color of a word doesn't match the word itself (e.g., the word 'RED' written in blue). Your brain automatically reads the word, conflicting with naming the color." } }, { "@type": "Question", name: "Why is the Stroop test important?", acceptedAnswer: { "@type": "Answer", text: "It measures executive function — your brain's ability to inhibit automatic responses. It's used clinically to detect cognitive decline, ADHD, and brain injuries." } }, { "@type": "Question", name: "What is a good Stroop test score?", acceptedAnswer: { "@type": "Answer", text: "High accuracy (90%+) with fast response times indicates strong executive function. Most people are 50-100ms slower on incongruent trials (mismatched word and color) compared to congruent ones." } }] }) }} />
    </main>
  );
}
