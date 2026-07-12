import type { Metadata } from "next";
import VerbalPlay from "./VerbalPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Verbal Memory Test - How Many Words Can You Remember?",
  description: "Free verbal memory test. Words appear one at a time. Click SEEN if you saw it before, or NEW if it is new. 3 lives. How high can you score?",
  keywords: ["verbal memory test", "word memory test", "memory game", "brain test", "seen or new game", "word recognition test"],
  openGraph: {
    title: "Verbal Memory Test - How Many Words Can You Remember? | BenchMyBrain",
    description: "Free verbal memory test. Words appear one at a time. Click SEEN if you saw it before, or NEW if it is new. 3 lives. How high can you score?",
    type: "website",
    images: [{ url: "/api/og?test=verbal", width: 1200, height: 630, alt: "Verbal Memory Test - How Many Words Can You Remember? | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verbal Memory Test - How Many Words Can You Remember? | BenchMyBrain",
    description: "Free verbal memory test. Words appear one at a time. Click SEEN if you saw it before, or NEW if it is new. 3 lives. How high can you score?",
    images: ["/api/og?test=verbal"],
  },
  alternates: {
    canonical: "/verbal",
  },
};

export default function VerbalPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <VerbalPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Verbal Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What It Measures</h3>
            <p className="text-sm text-ink-2">Verbal memory (word recognition) tests your ability to store and retrieve words from short-term memory. This skill is essential for reading comprehension, learning new vocabulary, and everyday conversation.</p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Strategy</h3>
            <p className="text-sm text-ink-2">Create a vivid mental image for each new word. For example, &quot;castle&quot; = picture a specific castle you know. Visual associations are much stronger than rote repetition. The more distinctive the image, the better you will remember it.</p>
          </div>
        </div>
      </section>
      <RelatedTests current="/verbal" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Verbal Memory Test", description: "Free verbal memory test. How many words can you remember?", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
    </main>
  );
}
