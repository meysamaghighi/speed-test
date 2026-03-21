import type { Metadata } from "next";
import SpatialRotation from "../components/SpatialRotation";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Spatial Rotation Test - Mental Rotation Challenge | BenchMyBrain",
  description:
    "Test your spatial reasoning with this mental rotation challenge. Compare rotated shapes and measure your visual-spatial intelligence. Free online test.",
  keywords: [
    "spatial rotation test",
    "mental rotation",
    "spatial reasoning",
    "visual spatial test",
    "3D rotation test",
    "spatial intelligence",
  ],
  openGraph: {
    title: "Spatial Rotation Test - Mental Rotation Challenge | BenchMyBrain",
    description:
      "Test your spatial reasoning with this mental rotation challenge. Compare rotated shapes and measure your visual-spatial intelligence. Free online test.",
    type: "website",
  },
};

export default function RotationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Spatial Rotation Test
        </h1>
        <p className="text-gray-400">
          Compare two block shapes and decide if they are the SAME (rotated) or DIFFERENT. Test your mental rotation ability across 15 rounds.
        </p>
      </div>

      <SpatialRotation />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Spatial Reasoning</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is Spatial Reasoning?</h3>
            <p className="text-sm text-gray-400">
              Spatial reasoning is the ability to mentally manipulate 2D and 3D objects.
              It involves visualizing rotations, understanding how shapes fit together,
              and recognizing objects from different angles. This skill is fundamental
              for architects, engineers, surgeons, and pilots.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Who Uses It?</h3>
            <p className="text-sm text-gray-400">
              STEM professionals rely heavily on spatial skills. Studies show that
              engineers, mathematicians, and scientists score significantly higher on
              spatial tests than the general population. Video game players, especially
              those who play 3D games, also develop stronger spatial reasoning.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/rotation" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Spatial Rotation Test",
            description: "Free online mental rotation test. Measure your spatial reasoning and visual-spatial intelligence.",
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
                name: "What is mental rotation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Mental rotation is the ability to imagine how a 2D or 3D object would look when rotated. It's a key component of spatial intelligence and is measured by tests where you compare shapes shown from different angles.",
                },
              },
              {
                "@type": "Question",
                name: "Can you improve spatial reasoning?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Studies show that spatial skills can be improved through practice. Playing 3D video games, doing puzzles, learning origami, and taking tests like this one can all strengthen your mental rotation abilities.",
                },
              },
              {
                "@type": "Question",
                name: "Why is spatial reasoning important?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Spatial reasoning predicts success in STEM careers. It's essential for architects, engineers, surgeons, pilots, and mathematicians. Research shows it's as important as math ability for predicting performance in technical fields.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
