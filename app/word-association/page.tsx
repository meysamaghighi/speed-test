import type { Metadata } from "next";
import WordAssociationTest from "../components/WordAssociationTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Word Fluency Test - How Many Words Can You Name? | BenchMyBrain",
  description:
    "Test your word fluency! Name as many words as you can in a category within 60 seconds. Measures verbal fluency, vocabulary, and processing speed.",
  keywords: [
    "word fluency test",
    "verbal fluency test",
    "vocabulary test",
    "cognitive test",
    "word naming test",
    "semantic fluency",
  ],
  openGraph: {
    title: "Word Fluency Test - How Many Words Can You Name? | BenchMyBrain",
    description:
      "Test your word fluency! Name as many words as you can in a category within 60 seconds. Measures verbal fluency, vocabulary, and processing speed.",
    type: "website",
  },
  alternates: {
    canonical: "/word-association",
  },
};

export default function WordAssociationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Word Fluency Test
        </h1>
        <p className="text-gray-400">
          Name as many words as you can in a category within 60 seconds. Tests verbal fluency and vocabulary.
        </p>
      </div>

      <WordAssociationTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Word Fluency</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Verbal Fluency</h3>
            <p className="text-sm text-gray-400">
              This test measures your ability to rapidly retrieve words from semantic memory.
              It's a classic neuropsychological test used to assess language ability and executive function.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Cognitive Assessment</h3>
            <p className="text-sm text-gray-400">
              Word fluency tests are used in clinical settings to assess cognitive health.
              They measure vocabulary, processing speed, and mental flexibility.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/word-association" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Word Fluency Test",
            description: "Free online word fluency test. Name as many words as you can in a category within 60 seconds.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good score on the word fluency test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Excellent performance is 20+ words in 60 seconds. Good is 15-19 words, average is 10-14 words, and below average is under 10 words. Native speakers typically score higher than non-native speakers.",
                },
              },
              {
                "@type": "Question",
                name: "What does word fluency measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Word fluency tests measure verbal ability, vocabulary size, processing speed, and executive function. They're used in neuropsychological assessments to evaluate language skills and cognitive health.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
