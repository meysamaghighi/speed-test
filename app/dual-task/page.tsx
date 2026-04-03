import type { Metadata } from "next";
import DualTaskTest from "../components/DualTaskTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Dual Task Test - Divided Attention & Multitasking | BenchMyBrain",
  description:
    "Test your divided attention. Track a moving dot visually while counting audio beeps. How well can you multitask?",
  keywords: [
    "dual task test",
    "divided attention test",
    "multitasking test",
    "attention test",
    "cognitive load test",
    "dual processing",
  ],
  openGraph: {
    title: "Dual Task Test - Divided Attention & Multitasking | BenchMyBrain",
    description:
      "Test your divided attention. Track a moving dot visually while counting audio beeps. How well can you multitask?",
    type: "website",
  },
  alternates: {
    canonical: "/dual-task",
  },
};

export default function DualTaskPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Dual Task Test
        </h1>
        <p className="text-gray-400">
          Track a moving red dot with your eyes while counting beeps.
          Tests your ability to process visual and audio information simultaneously.
        </p>
      </div>

      <DualTaskTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Divided Attention</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Multitasking Myth</h3>
            <p className="text-sm text-gray-400">
              True simultaneous multitasking is impossible - your brain rapidly
              switches between tasks. However, automatic tasks (like tracking) can
              run alongside conscious tasks (like counting) with practice.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Real-World Uses</h3>
            <p className="text-sm text-gray-400">
              Divided attention is crucial for driving (watching road + monitoring
              mirrors), conversations in noisy environments, and cooking multiple
              dishes. Deficits appear in ADHD, concussions, and sleep deprivation.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/dual-task" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Dual Task Test",
            description: "Test your divided attention by tracking visual and auditory stimuli simultaneously.",
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
                name: "What is divided attention?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Divided attention is the ability to process multiple sources of information or perform multiple tasks simultaneously. It's a key executive function controlled by the prefrontal cortex.",
                },
              },
              {
                "@type": "Question",
                name: "Can multitasking be improved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, with practice. Video games, juggling, and dual-task exercises improve multitasking. However, removing distractions is often more effective than improving multitasking ability.",
                },
              },
              {
                "@type": "Question",
                name: "What's a good score on dual task test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "90%+ accuracy is excellent, 70-89% is good, 50-69% is fair, and below 50% suggests difficulty with divided attention. Most people score 70-85%.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
