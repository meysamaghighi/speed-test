import type { Metadata } from "next";
import WordSpeedPlay from "./WordSpeedPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Word Speed Test - How Fast Can You Type Words? | BenchMyBrain",
  description:
    "Test your word typing speed. Type words as fast as you can, measured in WPM. Free online test with accuracy tracking.",
  keywords: [
    "word speed test",
    "typing speed",
    "fast typing test",
    "wpm test",
    "word typing",
    "typing accuracy",
  ],
  openGraph: {
    title: "Word Speed Test - How Fast Can You Type Words? | BenchMyBrain",
    description:
      "Test your word typing speed. Type words as fast as you can, measured in WPM. Free online test with accuracy tracking.",
    type: "website",
  },
  alternates: {
    canonical: "/word-speed",
  },
};

export default function WordSpeedPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <WordSpeedPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Word Speed</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Speed vs Accuracy</h3>
            <p className="text-sm text-ink-2">
              This test measures both speed and accuracy. Going fast with many
              errors will lower your WPM score. Focus on typing correctly
              without looking at the keyboard for best results.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Progressive Difficulty</h3>
            <p className="text-sm text-ink-2">
              Words start with 3-4 letters and gradually increase to 8-10
              letters. This tests your ability to maintain speed with longer,
              more complex words.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/word-speed" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Word Speed Test",
            description: "Free online word typing speed test. Measure your WPM and accuracy.",
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
                name: "What is a good word typing speed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "40-60 WPM is average for casual typists. 60-80 WPM is professional level. Over 80 WPM is considered fast. Top typists can exceed 100 WPM with high accuracy.",
                },
              },
              {
                "@type": "Question",
                name: "How is WPM calculated in this test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WPM (Words Per Minute) is calculated by counting the number of correctly typed words divided by the time taken in minutes. Only correctly typed words count toward your WPM score.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my word typing speed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice touch typing without looking at the keyboard, focus on accuracy first then speed, use proper finger placement on home row keys, and take this test regularly to track progress.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
