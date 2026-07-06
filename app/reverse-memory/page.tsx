import type { Metadata } from "next";
import ReverseMemoryPlay from "./ReverseMemoryPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Digit Span Backward - Reverse Number Memory Test | BenchMyBrain",
  description:
    "Test your working memory with the digit span backward test. Remember sequences of digits and type them in reverse order. Free online brain test.",
  keywords: [
    "reverse memory test",
    "digit span backward",
    "working memory test",
    "number sequence test",
    "backward digit span",
    "working memory assessment",
  ],
  openGraph: {
    title: "Digit Span Backward - Reverse Number Memory Test | BenchMyBrain",
    description:
      "Test your working memory with the digit span backward test. Remember sequences of digits and type them in reverse order. Free online brain test.",
    type: "website",
  },
  alternates: {
    canonical: "/reverse-memory",
  },
};

export default function ReverseMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <ReverseMemoryPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Working Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">What is Working Memory?</h3>
            <p className="text-sm text-ink-2">
              Working memory is your brain's ability to temporarily hold and manipulate information.
              The digit span backward test specifically measures your ability to mentally reverse sequences,
              a key component of working memory that's crucial for problem-solving and learning.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">How to Improve</h3>
            <p className="text-sm text-ink-2">
              Practice backward counting, mental math, and memory games. Playing strategy games,
              learning new skills, and regular cognitive training can strengthen working memory.
              Adequate sleep and physical exercise also significantly boost cognitive function.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/reverse-memory" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Digit Span Backward Test",
            description: "Free online reverse memory test. Measure your working memory by typing digit sequences backward.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
