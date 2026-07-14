import type { Metadata } from "next";
import PeripheralTest from "../components/PeripheralTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "UFOV Divided Attention Test - Peripheral Vision Challenge | BenchMyBrain",
  description:
    "Test your divided attention with the UFOV (Useful Field of View) test. Identify center targets while detecting peripheral stimuli. Measures divided attention and visual awareness.",
  keywords: [
    "peripheral vision test",
    "UFOV test",
    "useful field of view",
    "divided attention test",
    "visual field test",
    "peripheral awareness",
  ],
  openGraph: {
    title: "UFOV Divided Attention Test - Peripheral Vision Challenge | BenchMyBrain",
    description: "Test your divided attention with the UFOV test. Identify center targets while detecting peripheral stimuli simultaneously.",
    type: "website",
    images: [{ url: "/api/og?test=peripheral-test", width: 1200, height: 630, alt: "UFOV Divided Attention Test - Peripheral Vision Challenge | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UFOV Divided Attention Test - Peripheral Vision Challenge | BenchMyBrain",
    description: "Test your divided attention with the UFOV test. Identify center targets while detecting peripheral stimuli simultaneously.",
    images: ["/api/og?test=peripheral-test"],
  },
  alternates: {
    canonical: "/peripheral-test",
  },
};

export default function PeripheralTestPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-ink mb-3">
          UFOV Divided Attention Test
        </h1>
        <p className="text-ink-2">
          The UFOV (Useful Field of View) test. Identify center letters while detecting peripheral targets simultaneously &mdash; unlike the{" "}
          <a href="/peripheral" className="underline">Peripheral Reaction Test</a>, this measures accuracy under split attention, not reaction speed.
        </p>
      </div>

      <PeripheralTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About the UFOV Test</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What is UFOV?</h3>
            <p className="text-sm text-ink-2">
              The Useful Field of View (UFOV) is a validated cognitive test that measures divided attention and peripheral awareness. It requires you to process central and peripheral information simultaneously, testing your ability to split attention across your visual field.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why It Matters</h3>
            <p className="text-sm text-ink-2">
              UFOV performance predicts driving safety, fall risk in older adults, and athletic performance. Athletes, pilots, and drivers need strong divided attention to monitor central tasks while maintaining peripheral awareness of their environment.
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
            name: "UFOV Divided Attention Test",
            description: "Free online UFOV (Useful Field of View) test. Measure divided attention and peripheral awareness.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
