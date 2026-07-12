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
    description: "Test your word typing speed. Type words as fast as you can, measured in WPM. Free online test with accuracy tracking.",
    type: "website",
    images: [{ url: "/api/og?test=word-speed", width: 1200, height: 630, alt: "Word Speed Test - How Fast Can You Type Words? | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Speed Test - How Fast Can You Type Words? | BenchMyBrain",
    description: "Test your word typing speed. Type words as fast as you can, measured in WPM. Free online test with accuracy tracking.",
    images: ["/api/og?test=word-speed"],
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

    </main>
  );
}
