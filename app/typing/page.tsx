import type { Metadata } from "next";
import TypingTest from "../components/TypingTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Typing Speed Test - How Fast Can You Type? | BenchMyBrain",
  description:
    "Free typing speed test. Measure your WPM (words per minute) and accuracy. Average typing speed is 40 WPM.",
  keywords: [
    "typing test",
    "typing speed test",
    "wpm test",
    "words per minute",
    "how fast can I type",
    "typing practice",
    "typing speed",
  ],
  openGraph: {
    title: "Typing Speed Test - How Fast Can You Type? | BenchMyBrain",
    description:
      "Free typing speed test. Measure your WPM (words per minute) and accuracy. Average typing speed is 40 WPM.",
    type: "website",
  },
  alternates: {
    canonical: "/typing",
  },
};

export default function TypingPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Typing Speed Test
        </h1>
        <p className="text-gray-400">
          Type the paragraph as fast and accurately as you can. Your speed is
          measured in words per minute (WPM).
        </p>
      </div>

      <TypingTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">Typing Speed Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-900 rounded-xl text-sm border border-gray-800">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="p-4 text-left">Speed</th>
                <th className="p-4 text-left">WPM</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="p-4 text-red-400 font-bold">Slow</td>
                <td className="p-4">&lt;25</td>
                <td className="p-4">Hunt-and-peck typing, looking at keyboard</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="p-4 text-yellow-400 font-bold">Average</td>
                <td className="p-4">40</td>
                <td className="p-4">Casual typist, adequate for most tasks</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="p-4 text-green-400 font-bold">Fast</td>
                <td className="p-4">60-80</td>
                <td className="p-4">Touch typist, professional level</td>
              </tr>
              <tr>
                <td className="p-4 text-emerald-400 font-bold">Expert</td>
                <td className="p-4">80+</td>
                <td className="p-4">Top 1% — speed typist or programmer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <RelatedTests current="/typing" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Typing Speed Test",
            description: "Free typing speed test. Measure your WPM and accuracy.",
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
                name: "What is a good typing speed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "40 WPM is average for casual typists. 60-80 WPM is professional level. Over 80 WPM puts you in the top 1%. World records exceed 200 WPM.",
                },
              },
              {
                "@type": "Question",
                name: "How can I type faster?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Learn touch typing (don't look at the keyboard), practice daily for 15 minutes, focus on accuracy first then speed, use proper finger placement on home row keys.",
                },
              },
              {
                "@type": "Question",
                name: "Does typing speed matter for programming?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Somewhat. Most programmers type 50-80 WPM. But thinking about code matters more than raw typing speed. Fast typing helps more with communication (emails, Slack) than coding itself.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
