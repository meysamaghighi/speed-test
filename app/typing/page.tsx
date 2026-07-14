import type { Metadata } from "next";
import TypingPlay from "./TypingPlay";
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
    description: "Free typing speed test. Measure your WPM (words per minute) and accuracy. Average typing speed is 40 WPM.",
    type: "website",
    images: [{ url: "/api/og?test=typing", width: 1200, height: 630, alt: "Typing Speed Test - How Fast Can You Type? | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Test - How Fast Can You Type? | BenchMyBrain",
    description: "Free typing speed test. Measure your WPM (words per minute) and accuracy. Average typing speed is 40 WPM.",
    images: ["/api/og?test=typing"],
  },
  alternates: {
    canonical: "/typing",
  },
};

export default function TypingPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <TypingPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">Typing Speed Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-paper-2 rounded-xl text-sm border border-line">
            <thead>
              <tr className="border-b border-line text-ink-2">
                <th className="p-4 text-left">Speed</th>
                <th className="p-4 text-left">WPM</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="text-ink-2">
              <tr className="border-b border-line/50">
                <td className="p-4 text-red-400 font-bold">Slow</td>
                <td className="p-4">&lt;25</td>
                <td className="p-4">Hunt-and-peck typing, looking at keyboard</td>
              </tr>
              <tr className="border-b border-line/50">
                <td className="p-4 text-yellow-400 font-bold">Average</td>
                <td className="p-4">40</td>
                <td className="p-4">Casual typist, adequate for most tasks</td>
              </tr>
              <tr className="border-b border-line/50">
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

    </main>
  );
}
