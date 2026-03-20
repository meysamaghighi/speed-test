import type { Metadata } from "next";
import VerbalMemory from "../components/VerbalMemory";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Verbal Memory Test - How Many Words Can You Remember?",
  description: "Free verbal memory test. Words appear one at a time. Click SEEN if you saw it before, or NEW if it is new. 3 lives. How high can you score?",
  keywords: ["verbal memory test", "word memory test", "memory game", "brain test", "seen or new game", "word recognition test"],
  openGraph: {
    title: "Verbal Memory Test - How Many Words Can You Remember? | BenchMyBrain",
    description: "Free verbal memory test. Words appear one at a time. Click SEEN if you saw it before, or NEW if it is new. 3 lives. How high can you score?",
    type: "website",
  },
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
      <RelatedTests current="/verbal" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Verbal Memory Test", description: "Free verbal memory test. How many words can you remember?", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is verbal memory?", acceptedAnswer: { "@type": "Answer", text: "Verbal memory is the ability to remember words and language-based information. It's essential for learning, conversation, reading comprehension, and vocabulary building." } }, { "@type": "Question", name: "What is a good verbal memory score?", acceptedAnswer: { "@type": "Answer", text: "Remembering 30 words is average. 50+ is good. 80+ is exceptional. The test becomes harder as more words are introduced and you need to track which ones you've seen." } }, { "@type": "Question", name: "How can I improve verbal memory?", acceptedAnswer: { "@type": "Answer", text: "Read regularly, play word games, use mnemonic devices (create stories or associations), get enough sleep, and practice active recall instead of passive rereading." } }] }) }} />
    </main>
  );
}
