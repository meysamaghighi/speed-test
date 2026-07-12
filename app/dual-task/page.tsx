import type { Metadata } from "next";
import DualTaskPlay from "./DualTaskPlay";
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
    description: "Test your divided attention. Track a moving dot visually while counting audio beeps. How well can you multitask?",
    type: "website",
    images: [{ url: "/api/og?test=dual-task", width: 1200, height: 630, alt: "Dual Task Test - Divided Attention & Multitasking | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dual Task Test - Divided Attention & Multitasking | BenchMyBrain",
    description: "Test your divided attention. Track a moving dot visually while counting audio beeps. How well can you multitask?",
    images: ["/api/og?test=dual-task"],
  },
  alternates: {
    canonical: "/dual-task",
  },
};

export default function DualTaskPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <DualTaskPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Divided Attention</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Multitasking Myth</h3>
            <p className="text-sm text-ink-2">
              True simultaneous multitasking is impossible - your brain rapidly
              switches between tasks. However, automatic tasks (like tracking) can
              run alongside conscious tasks (like counting) with practice.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Real-World Uses</h3>
            <p className="text-sm text-ink-2">
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

    </main>
  );
}
