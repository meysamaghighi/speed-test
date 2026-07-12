import type { Metadata } from "next";
import MemoryPlay from "./MemoryPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Number Memory Test - How Many Digits Can You Remember? | BenchMyBrain",
  description:
    "Test your number memory. A number flashes on screen, then you type it back. How many digits can you remember? Average is 7.",
  keywords: [
    "number memory test",
    "digit span test",
    "memory test",
    "short term memory test",
    "how good is my memory",
    "brain test",
  ],
  openGraph: {
    title: "Number Memory Test - How Many Digits Can You Remember? | BenchMyBrain",
    description: "Test your number memory. A number flashes on screen, then you type it back. How many digits can you remember? Average is 7.",
    type: "website",
    images: [{ url: "/api/og?test=memory", width: 1200, height: 630, alt: "Number Memory Test - How Many Digits Can You Remember? | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Memory Test - How Many Digits Can You Remember? | BenchMyBrain",
    description: "Test your number memory. A number flashes on screen, then you type it back. How many digits can you remember? Average is 7.",
    images: ["/api/og?test=memory"],
  },
  alternates: {
    canonical: "/memory",
  },
};

export default function MemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <MemoryPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Number Memory</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">The Magic Number 7</h3>
            <p className="text-sm text-ink-2">
              Psychologist George Miller found that most people can hold 7 plus
              or minus 2 items in short-term memory. This is why phone numbers
              are 7 digits long. With practice, you can improve by chunking
              digits into groups.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">How to Improve</h3>
            <p className="text-sm text-ink-2">
              Group digits into chunks (e.g., 583291 becomes 583-291). Create
              associations or stories with the numbers. Practice regularly —
              memory span improves with training, like any other skill.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/memory" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Number Memory Test",
            description: "Test your number memory. How many digits can you remember?",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
