import type { Metadata } from "next";
import AimPlay from "./AimPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Aim Trainer - Test Your Mouse Accuracy & Speed",
  description:
    "Free aim trainer. Click 30 targets as fast as you can. Measures your average time per target. Great practice for FPS games.",
  keywords: ["aim trainer", "aim test", "mouse accuracy test", "aim practice", "fps aim trainer", "click accuracy", "aim speed test"],
  openGraph: {
    title: "Aim Trainer - Test & Improve Your Mouse Accuracy | BenchMyBrain",
    description: "Free aim trainer. Click 30 targets as fast as you can. Measures your average time per target. Great practice for FPS games.",
    type: "website",
    images: [{ url: "/api/og?test=aim", width: 1200, height: 630, alt: "Aim Trainer - Test & Improve Your Mouse Accuracy | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aim Trainer - Test & Improve Your Mouse Accuracy | BenchMyBrain",
    description: "Free aim trainer. Click 30 targets as fast as you can. Measures your average time per target. Great practice for FPS games.",
    images: ["/api/og?test=aim"],
  },
  alternates: {
    canonical: "/aim",
  },
};

export default function AimPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <AimPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">Improve Your Aim</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">For Gaming</h3>
            <p className="text-sm text-ink-2">
              Aim trainers help develop muscle memory for FPS games (Valorant, CS2, Apex Legends, Overwatch). Pro players practice aim training 15-30 minutes daily. Focus on consistency over speed — accuracy first, then speed.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Mouse Sensitivity</h3>
            <p className="text-sm text-ink-2">
              Lower mouse sensitivity generally improves accuracy (most pros use 400-800 DPI). Use a large mouse pad for big arm movements. Your wrist handles fine adjustments, your arm handles large movements.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/aim" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Aim Trainer", description: "Free aim trainer. Practice your mouse accuracy and speed.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

    </main>
  );
}
