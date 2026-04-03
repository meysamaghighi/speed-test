import type { Metadata } from "next";
import ReverseMemory from "../components/ReverseMemory";
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
        <h1 className="text-4xl font-black text-white mb-3">
          Digit Span Backward Test
        </h1>
        <p className="text-gray-400">
          Digits will flash one at a time. Memorize them, then type them back in REVERSE order.
        </p>
      </div>

      <ReverseMemory />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Working Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is Working Memory?</h3>
            <p className="text-sm text-gray-400">
              Working memory is your brain's ability to temporarily hold and manipulate information.
              The digit span backward test specifically measures your ability to mentally reverse sequences,
              a key component of working memory that's crucial for problem-solving and learning.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How to Improve</h3>
            <p className="text-sm text-gray-400">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the digit span backward test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The digit span backward test measures working memory by presenting a sequence of digits that you must recall in reverse order. It's more challenging than forward recall because it requires both memory and mental manipulation of information.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good score on the backward digit span test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Average adults can typically recall 4-5 digits backward (levels 2-3). Scores of 7+ digits backward (level 5+) are considered above average, while 10+ digits backward (level 8+) indicates exceptional working memory.",
                },
              },
              {
                "@type": "Question",
                name: "How does working memory differ from regular memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Working memory is temporary storage for information you're actively using, like remembering a phone number while dialing. Regular (long-term) memory stores information for extended periods. Working memory has limited capacity but is crucial for reasoning, learning, and problem-solving.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
