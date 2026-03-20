import type { Metadata } from "next";
import SequenceMemory from "../components/SequenceMemory";

export const metadata: Metadata = {
  title: "Sequence Memory Test - How Long a Pattern Can You Remember?",
  description: "Free sequence memory test (Simon says). Watch tiles light up in order, then repeat the pattern. Each level adds one more step.",
  keywords: ["sequence memory test", "simon says game", "pattern memory", "memory sequence game", "brain training"],
};

export default function SequencePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Sequence Memory</h1>
        <p className="text-gray-400">
          Watch the tiles light up in order, then repeat the sequence. Each level
          adds one more step. How long a sequence can you remember?
        </p>
      </div>
      <SequenceMemory />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Sequence Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">The Simon Effect</h3>
            <p className="text-sm text-gray-400">This test is based on the classic Simon electronic game from the 1970s. It measures your ability to encode and recall ordered sequences, a key component of working memory used in everything from following directions to learning music.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Tips</h3>
            <p className="text-sm text-gray-400">Try creating a mental &quot;path&quot; between the tiles rather than memorizing individual positions. Some people find it helpful to assign each position a number or direction. Practice improves sequence memory significantly.</p>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Sequence Memory Test", description: "Free sequence memory test. Repeat the pattern of tiles.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
    </main>
  );
}
