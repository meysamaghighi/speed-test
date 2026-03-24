import type { Metadata } from "next";
import GoNoGo from "../components/GoNoGo";
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
};

export default function GoNoGoPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Go/No-Go Test</h1>
        <p className="text-gray-400">
          Green circle = Click fast. Red circle = DON'T click. Tests reaction time AND impulse control.
        </p>
      </div>
      <GoNoGo />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Go/No-Go</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What It Measures</h3>
            <p className="text-sm text-gray-400">
              The Go/No-Go task measures inhibitory control (the ability to suppress prepotent responses), sustained attention, and reaction time. It's a classic test of executive function used in cognitive neuroscience and clinical assessments.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Clinical Applications</h3>
            <p className="text-sm text-gray-400">
              Go/No-Go tests are used to assess ADHD, impulse control disorders, traumatic brain injury, and frontal lobe dysfunction. People with ADHD typically show more false alarms (clicking on red) and higher reaction time variability.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/go-no-go" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Go/No-Go Test", description: "Free Go/No-Go Test. Test reaction time and impulse control.", applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good Go/No-Go test score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Good performance combines fast reaction time (under 350ms) with high accuracy (over 90%). The key is balancing speed with impulse control - clicking fast on green but successfully inhibiting clicks on red.",
                },
              },
              {
                "@type": "Question",
                name: "What does the Go/No-Go test measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Go/No-Go test measures inhibitory control (impulse suppression), sustained attention, and reaction time. It assesses your ability to quickly respond to one stimulus while withholding response to another.",
                },
              },
              {
                "@type": "Question",
                name: "How is Go/No-Go used to diagnose ADHD?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "People with ADHD often show more false alarms (clicking when they shouldn't) and higher reaction time variability on Go/No-Go tasks. However, this test alone cannot diagnose ADHD - it's one tool among many in clinical assessment.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
