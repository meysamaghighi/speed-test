import type { Metadata } from "next";
import PeripheralTest from "../components/PeripheralTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Peripheral Vision Test - How Far Can You See? | BenchMyBrain",
  description:
    "Test your peripheral vision. Focus on the center and detect targets at the edge of your vision. Measures visual field awareness.",
  keywords: [
    "peripheral vision test",
    "side vision test",
    "visual field test",
    "vision test",
    "eye test",
  ],
  openGraph: {
    title: "Peripheral Vision Test - How Far Can You See? | BenchMyBrain",
    description:
      "Test your peripheral vision. Focus on the center and detect targets at the edge of your vision. Measures visual field awareness.",
    type: "website",
  },
  alternates: {
    canonical: "/peripheral-test",
  },
};

export default function PeripheralTestPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Peripheral Vision Test
        </h1>
        <p className="text-gray-400">
          Focus on the center dot and click targets that appear in your side vision.
        </p>
      </div>

      <PeripheralTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Peripheral Vision</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Visual Field</h3>
            <p className="text-sm text-gray-400">
              Peripheral vision is what you see outside your central focus. Humans have
              about 180-200 degrees of horizontal visual field. Athletes, drivers, and
              gamers rely heavily on peripheral awareness.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Rods vs Cones</h3>
            <p className="text-sm text-gray-400">
              Peripheral vision uses rod cells, which detect motion and low light but
              not fine detail. Central vision uses cones for sharp, color detail. This
              is why you notice movement better in your periphery.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/peripheral-test" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Peripheral Vision Test",
            description: "Free online peripheral vision test. Measure your visual field awareness.",
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
                name: "What is a good peripheral vision score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Excellent peripheral vision is 220+ pixels detection distance. Good is 180-220 pixels. Average is 150-180 pixels. Athletes and gamers tend to score higher due to training.",
                },
              },
              {
                "@type": "Question",
                name: "Can peripheral vision be improved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Athletes use peripheral awareness drills. Playing sports, video games, or practicing visual attention exercises can improve peripheral detection speed and range.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
