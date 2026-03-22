import type { Metadata } from "next";
import FaceMemoryTest from "../components/FaceMemoryTest";
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
};

export default function FaceMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Face Memory Test
        </h1>
        <p className="text-gray-400">
          Memorize the grid of faces, then identify which ones changed. Each level increases difficulty.
        </p>
      </div>

      <FaceMemoryTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">How It Works</h2>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-sm text-gray-400 mb-3">
            You'll see a grid of emoji faces for a few seconds. Study them carefully.
            Then the grid will reappear with 1-4 faces changed. Your job is to identify
            which faces are different from the original.
          </p>
          <p className="text-sm text-gray-400">
            Each level increases difficulty: larger grids (up to 5×5), shorter viewing time,
            and more simultaneous changes. How far can you get?
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-white">About Face Recognition</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Special Brain Region</h3>
            <p className="text-sm text-gray-400">
              The fusiform face area (FFA) in your brain specializes in recognizing faces.
              It's so specialized that humans can recognize thousands of faces, even after years.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Improving Recognition</h3>
            <p className="text-sm text-gray-400">
              Face memory improves with practice and attention. Looking at distinctive features
              (eyes, nose, expression) helps encoding. Sleep consolidates face memories.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Prosopagnosia</h3>
            <p className="text-sm text-gray-400">
              About 2% of people have prosopagnosia (face blindness), difficulty recognizing
              faces. This test measures visual change detection, not clinical face recognition.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Age Effects</h3>
            <p className="text-sm text-gray-400">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is face memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Face memory is the ability to recognize and recall faces. The fusiform face area (FFA) in the brain specializes in face recognition, allowing humans to remember thousands of faces.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve face recognition?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice looking at distinctive facial features (eyes, nose, expression) rather than the face as a whole. Regular social interaction, adequate sleep, and memory exercises like this test can help improve face recognition.",
                },
              },
              {
                "@type": "Question",
                name: "What is prosopagnosia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Prosopagnosia, or face blindness, is a condition affecting about 2% of people where recognizing faces is difficult or impossible. People with prosopagnosia often rely on voice, clothing, or context to identify others.",
                },
              },
              {
                "@type": "Question",
                name: "Does age affect face memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Face recognition ability peaks in your 30s. Young children's face recognition is still developing, and older adults tend to have slightly reduced face memory. Regular social interaction may help maintain skills.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
