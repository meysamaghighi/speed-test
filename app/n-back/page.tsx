import type { Metadata } from "next";
import NBackPlay from "./NBackPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "N-Back Test - Free Working Memory Test",
  description:
    "Free N-Back Test. See a sequence of letters. Click 'Match' if the current letter matches the one from N positions back. Tests working memory and fluid intelligence. Starts at 2-back.",
  keywords: ["n-back test", "working memory test", "dual n-back", "cognitive training", "brain training", "IQ test", "fluid intelligence"],
  openGraph: {
    title: "N-Back Test - Test Working Memory | BenchMyBrain",
    description: "Free N-Back Test. See a sequence of letters. Click 'Match' if current = N back. Tests working memory and fluid intelligence.",
    type: "website",
    images: [{ url: "/api/og?test=n-back", width: 1200, height: 630, alt: "N-Back Test - Test Working Memory | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "N-Back Test - Test Working Memory | BenchMyBrain",
    description: "Free N-Back Test. See a sequence of letters. Click 'Match' if current = N back. Tests working memory and fluid intelligence.",
    images: ["/api/og?test=n-back"],
  },
  alternates: {
    canonical: "/n-back",
  },
};

export default function NBackPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <NBackPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About N-Back</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Working Memory</h3>
            <p className="text-sm text-ink-2">
              The N-Back task is one of the most well-researched working memory tests. It requires you to continuously update and maintain information in your working memory while comparing new stimuli to old ones. This is a core cognitive skill.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Brain Training</h3>
            <p className="text-sm text-ink-2">
              Research suggests that regular N-Back training may improve fluid intelligence (problem-solving ability). Some studies show gains in working memory capacity and attention control. The dual N-Back variant (tracking two sequences) is particularly challenging.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/n-back" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "N-Back Test", description: "Free N-Back working memory test. Match letters from N positions back.", applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

    </main>
  );
}
