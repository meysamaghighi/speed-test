import type { Metadata } from "next";
import FaceMemoryPlay from "./FaceMemoryPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Face Memory Test - How Good Is Your Face Recognition? | BenchMyBrain",
  description:
    "Test your face memory and recognition skills. Study emoji faces, then identify which ones changed. Progressively harder levels with more faces and less time.",
  keywords: [
    "face memory test",
    "face recognition test",
    "visual memory test",
    "memory game",
    "face recall test",
    "prosopagnosia test",
  ],
  openGraph: {
    title: "Face Memory Test - How Good Is Your Face Recognition? | BenchMyBrain",
    description:
      "Test your face memory and recognition skills. Study emoji faces, then identify which ones changed. Progressively harder levels with more faces and less time.",
    type: "website",
  },
  alternates: {
    canonical: "/face-memory",
  },
};

export default function FaceMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <FaceMemoryPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">How It Works</h2>
        <div className="bg-paper-2 rounded-xl p-5 border border-line">
          <p className="text-sm text-ink-2 mb-3">
            You'll see a grid of emoji faces for a few seconds. Study them carefully.
            Then the grid will reappear with 1-4 faces changed. Your job is to identify
            which faces are different from the original.
          </p>
          <p className="text-sm text-ink-2">
            Each level increases difficulty: larger grids (up to 5×5), shorter viewing time,
            and more simultaneous changes. How far can you get?
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Face Recognition</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Special Brain Region</h3>
            <p className="text-sm text-ink-2">
              The fusiform face area (FFA) in your brain specializes in recognizing faces.
              It's so specialized that humans can recognize thousands of faces, even after years.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Improving Recognition</h3>
            <p className="text-sm text-ink-2">
              Face memory improves with practice and attention. Looking at distinctive features
              (eyes, nose, expression) helps encoding. Sleep consolidates face memories.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Prosopagnosia</h3>
            <p className="text-sm text-ink-2">
              About 2% of people have prosopagnosia (face blindness), difficulty recognizing
              faces. This test measures visual change detection, not clinical face recognition.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Age Effects</h3>
            <p className="text-sm text-ink-2">
              Face memory peaks in your 30s. Young children and older adults tend to score
              lower. Regular social interaction may help maintain face recognition skills.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/face-memory" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Face Memory Test",
            description: "Free online face memory and recognition test. Study faces, identify changes.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
