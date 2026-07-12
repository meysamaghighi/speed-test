import type { Metadata } from "next";
import ColorBlindPlay from "./ColorBlindPlay";
import RelatedTests from "../components/RelatedTests";

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
  openGraph: {
    title: "Color Blind Test - Ishihara-Style Color Vision Screening | BenchMyBrain",
    description: "Free online color blindness test with 12 Ishihara-style plates. Screen for red-green and blue-yellow color vision deficiency in under 2 minutes.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Color Blind Test - Ishihara-Style Color Vision Screening | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Blind Test - Ishihara-Style Color Vision Screening | BenchMyBrain",
    description: "Free online color blindness test with 12 Ishihara-style plates. Screen for red-green and blue-yellow color vision deficiency in under 2 minutes.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: "/color-blind",
  },
};

export default function ColorBlindPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <ColorBlindPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Color Blindness</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">How Common Is It?</h3>
            <p className="text-sm text-ink-2">
              About 8% of men and 0.5% of women have some form of color vision
              deficiency. Red-green color blindness is the most common type,
              affecting about 6% of males. Complete color blindness
              (achromatopsia) is extremely rare.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Types of Color Blindness</h3>
            <p className="text-sm text-ink-2">
              Protanopia (no red cones), Deuteranopia (no green cones), and
              Tritanopia (no blue cones) are the three main types. Most
              colorblind people have difficulty distinguishing red from green,
              not seeing in grayscale as commonly believed.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/color-blind" />

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
