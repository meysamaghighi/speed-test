import type { Metadata } from "next";
import ReadingSpeed from "../components/ReadingSpeed";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Reading Speed Test - How Fast Do You Read? | BenchMyBrain",
  description:
    "Measure your reading speed in words per minute (WPM) with comprehension quiz. The average adult reads 200-250 WPM. How fast are you?",
  keywords: [
    "reading speed test",
    "reading speed",
    "wpm test",
    "words per minute",
    "how fast do I read",
    "reading comprehension test",
    "speed reading test",
  ],
  openGraph: {
    title: "Reading Speed Test - How Fast Do You Read? | BenchMyBrain",
    description: "Measure your reading speed in words per minute (WPM) with comprehension quiz. The average adult reads 200-250 WPM. How fast are you?",
    type: "website",
  },
  alternates: {
    canonical: "/reading",
  },
};

export default function ReadingPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Reading Speed Test
        </h1>
        <p className="text-gray-400">
          Read a passage at your normal pace, then answer comprehension
          questions. Speed without understanding doesn't count!
        </p>
      </div>

      <ReadingSpeed />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Reading Speed</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Average Speeds</h3>
            <p className="text-sm text-gray-400">
              The average adult reads at 200-250 WPM. College students average
              300 WPM. Speed readers can reach 700+ WPM, though comprehension
              typically drops above 500 WPM. The world speed reading record is
              over 4,700 WPM.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How to Read Faster</h3>
            <p className="text-sm text-gray-400">
              Reduce subvocalization (saying words in your head). Use a finger
              or pointer to guide your eyes. Practice reading in chunks rather
              than word by word. Expand your vocabulary so you spend less time
              on unfamiliar words.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/reading" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Reading Speed Test",
            description: "Free online reading speed test with comprehension quiz. Measure your WPM.",
            applicationCategory: "EducationalApplication",
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
                name: "What is a good reading speed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The average adult reads 230 WPM. 300+ WPM is above average. Speed readers can reach 500-1000 WPM, but comprehension typically drops above 500 WPM.",
                },
              },
              {
                "@type": "Question",
                name: "How can I read faster?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Reduce subvocalization (saying words in your head), use a pointer to guide your eyes, practice with progressively faster material, expand your peripheral reading span, and avoid re-reading sentences.",
                },
              },
              {
                "@type": "Question",
                name: "Does speed reading actually work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Research shows that speed reading techniques can increase reading speed, but usually at the cost of comprehension. For most people, 400-500 WPM with good comprehension is a realistic goal.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
