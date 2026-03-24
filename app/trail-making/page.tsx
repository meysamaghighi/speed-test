import type { Metadata } from "next";
import TrailMaking from "../components/TrailMaking";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Trail Making Test - Free Online Cognitive Assessment",
  description:
    "Free Trail Making Test. Connect circles in alternating number-letter order (1-A-2-B-3-C...) as fast as you can. Tests executive function and mental flexibility.",
  keywords: ["trail making test", "trail making", "executive function test", "cognitive flexibility", "brain test", "TMT", "neuropsychological test"],
  openGraph: {
    title: "Trail Making Test - Test Executive Function | BenchMyBrain",
    description:
      "Free Trail Making Test. Connect circles in alternating number-letter order (1-A-2-B-3-C...) as fast as you can. Tests executive function and mental flexibility.",
    type: "website",
  },
};

export default function TrailMakingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Trail Making Test</h1>
        <p className="text-gray-400">
          Connect circles in alternating order: 1-A-2-B-3-C... as fast as you can. Tests executive function and cognitive flexibility.
        </p>
      </div>
      <TrailMaking />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Trail Making</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Clinical Use</h3>
            <p className="text-sm text-gray-400">
              The Trail Making Test is a neuropsychological assessment used to detect cognitive impairment. Part B (alternating numbers/letters) is particularly sensitive to frontal lobe dysfunction. It's commonly used in dementia screening and TBI assessments.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What It Measures</h3>
            <p className="text-sm text-gray-400">
              This test measures visual scanning, processing speed, mental flexibility, and executive function. The alternating sequence (1-A-2-B) requires you to switch between two mental sets, which is a core executive function skill.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/trail-making" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Trail Making Test", description: "Free Trail Making Test. Connect circles in alternating number-letter order.", applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good Trail Making Test score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Under 30 seconds is considered good for healthy adults. The average is around 30-45 seconds. Scores over 60 seconds may indicate cognitive impairment, but many factors affect performance including age and education.",
                },
              },
              {
                "@type": "Question",
                name: "What does Trail Making Test B measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Trail Making Test Part B measures executive function, particularly cognitive flexibility and the ability to switch between mental sets. It requires visual scanning, number sequencing, letter sequencing, and the ability to alternate between them.",
                },
              },
              {
                "@type": "Question",
                name: "How is Trail Making used clinically?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Clinically, the Trail Making Test is used to screen for cognitive impairment in conditions like dementia, traumatic brain injury, ADHD, and other neurological disorders. It's part of many neuropsychological test batteries.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
