import type { Metadata } from "next";
import GoNoGoPlay from "./GoNoGoPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Go/No-Go Test - Free Impulse Control & Reaction Time Test",
  description:
    "Free Go/No-Go Test. Click on green circles, don't click on red ones. 40 trials testing reaction time AND impulse control. Measures sustained attention and inhibitory control.",
  keywords: ["go no-go test", "impulse control test", "inhibition test", "reaction time test", "attention test", "ADHD test", "cognitive control"],
  openGraph: {
    title: "Go/No-Go Test - Test Impulse Control | BenchMyBrain",
    description:
      "Free Go/No-Go Test. Click on green circles, don't click on red ones. 40 trials testing reaction time AND impulse control.",
    type: "website",
  },
  alternates: {
    canonical: "/go-no-go",
  },
};

export default function GoNoGoPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <GoNoGoPlay />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Go/No-Go</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What It Measures</h3>
            <p className="text-sm text-ink-2">
              The Go/No-Go task measures inhibitory control (the ability to suppress prepotent responses), sustained attention, and reaction time. It's a classic test of executive function used in cognitive neuroscience and clinical assessments.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Clinical Applications</h3>
            <p className="text-sm text-ink-2">
              Go/No-Go tests are used to assess ADHD, impulse control disorders, traumatic brain injury, and frontal lobe dysfunction. People with ADHD typically show more false alarms (clicking on red) and higher reaction time variability.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/go-no-go" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Go/No-Go Test", description: "Free Go/No-Go Test. Test reaction time and impulse control.", applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

    </main>
  );
}
