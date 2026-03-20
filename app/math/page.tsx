import type { Metadata } from "next";
import MathSpeed from "../components/MathSpeed";

export const metadata: Metadata = {
  title: "Math Speed Test - How Fast Is Your Mental Math? | BenchMyBrain",
  description:
    "Test your mental math speed with this free 60-second challenge. Addition, subtraction, multiplication and division with increasing difficulty. Beat the clock!",
  keywords: [
    "math speed test",
    "mental math test",
    "arithmetic test",
    "math quiz",
    "how fast can you do math",
    "math game",
    "brain math test",
  ],
};

export default function MathPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Math Speed Test
        </h1>
        <p className="text-gray-400">
          60 seconds. Solve as many problems as you can. Difficulty adapts to
          your level -- streak bonuses for consecutive correct answers.
        </p>
      </div>

      <MathSpeed />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Mental Math</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why Practice Mental Math?</h3>
            <p className="text-sm text-gray-400">
              Mental math strengthens working memory, improves concentration,
              and builds number sense. Studies show that regular mental
              arithmetic practice can improve cognitive function and even slow
              age-related cognitive decline.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Tips to Improve</h3>
            <p className="text-sm text-gray-400">
              Break problems into parts (e.g., 15x12 = 15x10 + 15x2). Practice
              times tables until automatic. Use rounding (298+147 = 300+145).
              Regular practice for just 5 minutes a day can dramatically improve
              your speed.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Math Speed Test",
            description: "Free mental math speed test. 60-second challenge with adaptive difficulty.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}
