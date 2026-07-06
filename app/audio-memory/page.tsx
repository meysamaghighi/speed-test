import type { Metadata } from "next";
import AudioMemoryPlay from "./AudioMemoryPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Audio Memory Test - Free Online Auditory Memory Test",
  description:
    "Free Audio Memory Test. Hear a sequence of tones. Repeat by clicking buttons 1-5. Like Simon Says but with audio. Tests auditory working memory and pattern recognition. Turn on sound!",
  keywords: ["audio memory test", "auditory memory", "sound memory test", "simon game", "tone memory", "musical memory", "working memory"],
  openGraph: {
    title: "Audio Memory Test - Test Auditory Memory | BenchMyBrain",
    description:
      "Free Audio Memory Test. Hear a sequence of tones and repeat it. Like Simon with audio. Tests auditory working memory.",
    type: "website",
  },
  alternates: {
    canonical: "/audio-memory",
  },
};

export default function AudioMemoryPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <AudioMemoryPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Audio Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Auditory Working Memory</h3>
            <p className="text-sm text-ink-2">
              This test measures auditory working memory - your ability to hold and manipulate sound information in your mind. It's distinct from visual memory and is crucial for language comprehension, following spoken instructions, and musical ability.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Musical Training</h3>
            <p className="text-sm text-ink-2">
              Musicians typically score higher on auditory memory tests. Research shows that musical training enhances auditory working memory, pitch discrimination, and pattern recognition. Even non-musicians can improve with practice.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/audio-memory" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Audio Memory Test", description: "Free audio memory test. Hear tones and repeat the sequence.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

    </main>
  );
}
