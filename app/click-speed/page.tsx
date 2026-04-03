import type { Metadata } from "next";
import ClickSpeed from "../components/ClickSpeed";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "CPS Test - Click Speed Test | How Fast Can You Click?",
  description:
    "Free CPS test (clicks per second). Click as fast as you can for 5 seconds and measure your click speed. Average is 6.5 CPS.",
  keywords: ["cps test", "click speed test", "clicks per second", "click test", "how fast can I click", "jitter click test"],
  openGraph: {
    title: "Click Speed Test (CPS) - How Fast Can You Click? | BenchMyBrain",
    description:
      "Free CPS test (clicks per second). Click as fast as you can for 5 seconds and measure your click speed. Average is 6.5 CPS.",
    type: "website",
  },
  alternates: {
    canonical: "/click-speed",
  },
};

export default function ClickSpeedPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Click Speed Test</h1>
        <p className="text-gray-400">
          Click as many times as you can in 5 seconds. Measures your CPS (clicks per second).
        </p>
      </div>
      <ClickSpeed />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">Click Speed Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Clicking Techniques</h3>
            <p className="text-sm text-gray-400">
              <strong>Regular clicking:</strong> 4-7 CPS. <strong>Jitter clicking:</strong> vibrate your hand muscles for 8-14 CPS. <strong>Butterfly clicking:</strong> alternate two fingers rapidly for 15-25 CPS. <strong>Drag clicking:</strong> drag finger across button for 25-100+ CPS.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why CPS Matters</h3>
            <p className="text-sm text-gray-400">
              CPS is important in PvP games like Minecraft (faster clicking = more hits), competitive gaming, and osu!. Most games cap the benefit around 10-15 CPS. Beyond that, accuracy matters more than raw speed.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/click-speed" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Click Speed Test (CPS)", description: "Free CPS test. Measure your clicks per second.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good CPS (clicks per second)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The average is about 6.5 CPS. 8-10 CPS is fast. Over 12 CPS typically requires special clicking techniques like jitter clicking or butterfly clicking.",
                },
              },
              {
                "@type": "Question",
                name: "What are the different clicking techniques?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Regular clicking (4-7 CPS), jitter clicking (8-14 CPS, vibrating your hand), butterfly clicking (15-20+ CPS, alternating two fingers), and drag clicking (20-100+ CPS, dragging finger across button).",
                },
              },
              {
                "@type": "Question",
                name: "Does CPS matter in Minecraft PvP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, higher CPS gives an advantage in Minecraft PvP combat. Most competitive players aim for 8-12 CPS. However, aim and timing matter more than raw click speed.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
