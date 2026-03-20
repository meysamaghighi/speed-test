import type { Metadata } from "next";
import ColorBlindTest from "../components/ColorBlindTest";

export const metadata: Metadata = {
  title: "Color Blind Test - Free Ishihara Color Vision Screening | BenchMyBrain",
  description:
    "Free online color blindness test with 12 Ishihara-style plates. Screen for red-green and blue-yellow color vision deficiency in under 2 minutes.",
  keywords: [
    "color blind test",
    "color blindness test",
    "am I color blind",
    "ishihara test",
    "color vision test",
    "red green color blind",
    "color deficiency test",
  ],
};

export default function ColorBlindPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Color Blind Test
        </h1>
        <p className="text-gray-400">
          12 Ishihara-style plates. Identify the number hidden in each circle of
          colored dots. Takes about 2 minutes.
        </p>
      </div>

      <ColorBlindTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Color Blindness</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How Common Is It?</h3>
            <p className="text-sm text-gray-400">
              About 8% of men and 0.5% of women have some form of color vision
              deficiency. Red-green color blindness is the most common type,
              affecting about 6% of males. Complete color blindness
              (achromatopsia) is extremely rare.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Types of Color Blindness</h3>
            <p className="text-sm text-gray-400">
              Protanopia (no red cones), Deuteranopia (no green cones), and
              Tritanopia (no blue cones) are the three main types. Most
              colorblind people have difficulty distinguishing red from green,
              not seeing in grayscale as commonly believed.
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
            name: "Color Blind Test",
            description: "Free online Ishihara color vision test with 12 plates.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}
