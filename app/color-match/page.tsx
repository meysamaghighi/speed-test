import type { Metadata } from "next";
import ColorMatchTest from "../components/ColorMatchTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Color Match Test - Color Recognition Speed Test | BenchMyBrain",
  description:
    "Test your color recognition and response speed. See a color name displayed in a different color, then tap the correct displayed color. 20 rounds of cognitive challenge.",
  keywords: [
    "color match test",
    "color recognition test",
    "Stroop test",
    "cognitive test",
    "color perception test",
    "visual attention test",
  ],
  openGraph: {
    title: "Color Match Test - Color Recognition Speed Test | BenchMyBrain",
    description:
      "Test your color recognition and response speed. See a color name displayed in a different color, then tap the correct displayed color. 20 rounds of cognitive challenge.",
    type: "website",
  },
};

export default function ColorMatchPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Color Match Test
        </h1>
        <p className="text-gray-400">
          Tap the displayed color (not the word). 20 rounds testing speed and accuracy.
        </p>
      </div>

      <ColorMatchTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">How It Works</h2>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-sm text-gray-400 mb-3">
            You'll see a color name (like "RED") displayed in a different color (like blue text).
            Your task is to identify the DISPLAYED COLOR (blue), not what the word says (red).
          </p>
          <p className="text-sm text-gray-400 mb-3">
            This creates cognitive interference similar to the Stroop effect, where reading the word
            competes with identifying the color. Fast, accurate responses require focus and inhibition.
          </p>
          <p className="text-sm text-gray-400">
            Score = (correct answers × 100) + speed bonus. Faster correct answers earn higher scores.
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-white">About Color Perception</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">The Stroop Effect</h3>
            <p className="text-sm text-gray-400">
              This test is inspired by the Stroop effect, where naming the ink color of a
              color word (e.g., "RED" in blue ink) is slower than reading the word itself.
              It measures cognitive control and selective attention.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why It's Hard</h3>
            <p className="text-sm text-gray-400">
              Reading is automatic for literate adults. When you see "RED," your brain
              reads it faster than it processes the color. You must inhibit the automatic
              reading response to focus on the visual color.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Brain Regions Involved</h3>
            <p className="text-sm text-gray-400">
              The anterior cingulate cortex (ACC) detects conflict between word reading and
              color naming. The prefrontal cortex helps you inhibit the wrong response and
              select the correct one.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Improving Performance</h3>
            <p className="text-sm text-gray-400">
              Practice reduces interference. Gamers and musicians often score better due to
              enhanced executive function. Adequate sleep and reduced stress improve cognitive
              control and performance on tasks like this.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/color-match" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Color Match Test",
            description: "Free online color recognition and cognitive control test. Match displayed colors, not words.",
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
                name: "What is the Stroop effect?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Stroop effect is a cognitive phenomenon where naming the color of a word (e.g., 'RED' printed in blue ink) takes longer than reading the word. It demonstrates interference between automatic reading and color naming.",
                },
              },
              {
                "@type": "Question",
                name: "Why is this test difficult?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Reading is automatic for literate adults. When you see a color word, your brain reads it faster than identifying the ink color. You must inhibit the automatic reading response to focus on the visual color.",
                },
              },
              {
                "@type": "Question",
                name: "What does this test measure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "This test measures cognitive control, selective attention, and inhibition. It engages the anterior cingulate cortex (conflict detection) and prefrontal cortex (response inhibition).",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve my score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Practice reduces interference. Focus on the color, not the word. Adequate sleep, reduced stress, and activities that enhance executive function (gaming, music) can improve performance.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
