import type { Metadata } from "next";
import MathPlay from "./MathPlay";
import RelatedTests from "../components/RelatedTests";

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
  openGraph: {
    title: "Math Speed Test - 60-Second Mental Math Challenge | BenchMyBrain",
    description: "Test your mental math speed with this free 60-second challenge. Addition, subtraction, multiplication and division with increasing difficulty. Beat the clock!",
    type: "website",
  },
  alternates: {
    canonical: "/math",
  },
};

export default function MathPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <MathPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Mental Math</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why Practice Mental Math?</h3>
            <p className="text-sm text-ink-2">
              Mental math strengthens working memory, improves concentration,
              and builds number sense. Studies show that regular mental
              arithmetic practice can improve cognitive function and even slow
              age-related cognitive decline.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Tips to Improve</h3>
            <p className="text-sm text-ink-2">
              Break problems into parts (e.g., 15x12 = 15x10 + 15x2). Practice
              times tables until automatic. Use rounding (298+147 = 300+145).
              Regular practice for just 5 minutes a day can dramatically improve
              your speed.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/math" />

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good math speed score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A score of 200+ points in 60 seconds is fast. The test adapts difficulty based on your performance, so higher scores mean you're solving harder problems quickly.",
                },
              },
              {
                "@type": "Question",
                name: "Does mental math speed matter?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Mental math builds number sense and estimation skills useful in everyday life — splitting bills, calculating tips, budgeting, and quick decision-making.",
                },
              },
              {
                "@type": "Question",
                name: "How can I get faster at mental math?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice daily, learn mental shortcuts (multiply by 9: multiply by 10 then subtract), break problems into parts (23x4 = 20x4 + 3x4), and use estimation to check answers.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
