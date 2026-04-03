import type { Metadata } from "next";
import AudioMemory from "../components/AudioMemory";
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
        <h1 className="text-4xl font-black text-white mb-3">Audio Memory Test</h1>
        <p className="text-gray-400">
          Hear a sequence of tones. Repeat by clicking buttons 1-5. Like Simon but with audio. Turn on sound!
        </p>
      </div>
      <AudioMemory />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Audio Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Auditory Working Memory</h3>
            <p className="text-sm text-gray-400">
              This test measures auditory working memory - your ability to hold and manipulate sound information in your mind. It's distinct from visual memory and is crucial for language comprehension, following spoken instructions, and musical ability.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Musical Training</h3>
            <p className="text-sm text-gray-400">
              Musicians typically score higher on auditory memory tests. Research shows that musical training enhances auditory working memory, pitch discrimination, and pattern recognition. Even non-musicians can improve with practice.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/audio-memory" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Audio Memory Test", description: "Free audio memory test. Hear tones and repeat the sequence.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good audio memory score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Level 6 is considered good for most people. Level 5 is average. Musicians and people with musical training often reach Level 8 or higher. The sequence length increases with each level (Level 6 = 8 tones).",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my auditory memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice makes perfect. Musical training (learning an instrument), active listening exercises, repeating phone numbers out loud, and games like this test all improve auditory working memory. Improvement is typically visible within weeks of regular practice.",
                },
              },
              {
                "@type": "Question",
                name: "What does audio memory measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Audio memory measures auditory working memory - the ability to encode, store, and recall sound sequences. It's distinct from visual memory and correlates with language skills, musical ability, and the capacity to follow complex spoken instructions.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
