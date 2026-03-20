import type { Metadata } from "next";
import AimTrainer from "../components/AimTrainer";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Aim Trainer - Test Your Mouse Accuracy & Speed",
  description:
    "Free aim trainer. Click 30 targets as fast as you can. Measures your average time per target. Great practice for FPS games.",
  keywords: ["aim trainer", "aim test", "mouse accuracy test", "aim practice", "fps aim trainer", "click accuracy", "aim speed test"],
  openGraph: {
    title: "Aim Trainer - Test & Improve Your Mouse Accuracy | BenchMyBrain",
    description:
      "Free aim trainer. Click 30 targets as fast as you can. Measures your average time per target. Great practice for FPS games.",
    type: "website",
  },
};

export default function AimPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Aim Trainer</h1>
        <p className="text-gray-400">
          Click 30 targets as fast and accurately as you can. We measure your
          average reaction time per target.
        </p>
      </div>
      <AimTrainer />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">Improve Your Aim</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">For Gaming</h3>
            <p className="text-sm text-gray-400">
              Aim trainers help develop muscle memory for FPS games (Valorant, CS2, Apex Legends, Overwatch). Pro players practice aim training 15-30 minutes daily. Focus on consistency over speed — accuracy first, then speed.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Mouse Sensitivity</h3>
            <p className="text-sm text-gray-400">
              Lower mouse sensitivity generally improves accuracy (most pros use 400-800 DPI). Use a large mouse pad for big arm movements. Your wrist handles fine adjustments, your arm handles large movements.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/aim" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Aim Trainer", description: "Free aim trainer. Practice your mouse accuracy and speed.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good aim trainer score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Under 500ms per target is good. Under 400ms is very fast. Professional FPS gamers average 300-400ms per target with near-perfect accuracy.",
                },
              },
              {
                "@type": "Question",
                name: "Does aim training actually help in games?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, research shows that regular aim training improves mouse accuracy and speed in FPS games. Even 10-15 minutes daily can show measurable improvement within a week.",
                },
              },
              {
                "@type": "Question",
                name: "What DPI should I use for aiming?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most competitive FPS players use 400-800 DPI with low in-game sensitivity. Lower sensitivity allows more precise micro-adjustments. Find what feels comfortable and stick with it.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
