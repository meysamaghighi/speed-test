import type { Metadata } from "next";
import VerbalMemory from "../components/VerbalMemory";

export const metadata: Metadata = {
  title: "Verbal Memory Test - How Many Words Can You Remember?",
  description: "Free verbal memory test. Words appear one at a time. Click SEEN if you saw it before, or NEW if it is new. 3 lives. How high can you score?",
  keywords: ["verbal memory test", "word memory test", "memory game", "brain test", "seen or new game", "word recognition test"],
};

export default function VerbalPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Verbal Memory</h1>
        <p className="text-gray-400">
          Words appear one at a time. If you have seen the word before in this
          round, click SEEN. If it is new, click NEW. You have 3 lives.
        </p>
      </div>
      <VerbalMemory />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Verbal Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What It Measures</h3>
            <p className="text-sm text-gray-400">Verbal memory (word recognition) tests your ability to store and retrieve words from short-term memory. This skill is essential for reading comprehension, learning new vocabulary, and everyday conversation.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Strategy</h3>
            <p className="text-sm text-gray-400">Create a vivid mental image for each new word. For example, &quot;castle&quot; = picture a specific castle you know. Visual associations are much stronger than rote repetition. The more distinctive the image, the better you will remember it.</p>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Verbal Memory Test", description: "Free verbal memory test. How many words can you remember?", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
    </main>
  );
}
