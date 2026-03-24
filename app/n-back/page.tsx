import type { Metadata } from "next";
import NBack from "../components/NBack";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "N-Back Test - Free Working Memory Test",
  description:
    "Free N-Back Test. See a sequence of letters. Click 'Match' if the current letter matches the one from N positions back. Tests working memory and fluid intelligence. Starts at 2-back.",
  keywords: ["n-back test", "working memory test", "dual n-back", "cognitive training", "brain training", "IQ test", "fluid intelligence"],
  openGraph: {
    title: "N-Back Test - Test Working Memory | BenchMyBrain",
    description:
      "Free N-Back Test. See a sequence of letters. Click 'Match' if current = N back. Tests working memory and fluid intelligence.",
    type: "website",
  },
};

export default function NBackPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">N-Back Test</h1>
        <p className="text-gray-400">
          See letters one at a time. Click "Match" if current letter = letter from N positions back. Levels up.
        </p>
      </div>
      <NBack />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About N-Back</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Working Memory</h3>
            <p className="text-sm text-gray-400">
              The N-Back task is one of the most well-researched working memory tests. It requires you to continuously update and maintain information in your working memory while comparing new stimuli to old ones. This is a core cognitive skill.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Brain Training</h3>
            <p className="text-sm text-gray-400">
              Research suggests that regular N-Back training may improve fluid intelligence (problem-solving ability). Some studies show gains in working memory capacity and attention control. The dual N-Back variant (tracking two sequences) is particularly challenging.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/n-back" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "N-Back Test", description: "Free N-Back working memory test. Match letters from N positions back.", applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good N-Back score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most people can do 2-back comfortably. 3-back is average, 4-back is good, and 5+ back is excellent. Trained participants can reach 6-8 back, though accuracy typically drops at higher levels.",
                },
              },
              {
                "@type": "Question",
                name: "Does N-Back training increase IQ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Some studies suggest that N-Back training can improve fluid intelligence (Gf), but the evidence is mixed. It definitely improves working memory capacity and may transfer to other cognitive tasks. Consistent training (20+ sessions) shows the best results.",
                },
              },
              {
                "@type": "Question",
                name: "What does N-Back measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "N-Back measures working memory capacity, attention control, and the ability to update and maintain information. It correlates with fluid intelligence and executive function. It's widely used in cognitive neuroscience research.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
