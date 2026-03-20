import type { Metadata } from "next";
import PeripheralVision from "../components/PeripheralVision";

export const metadata: Metadata = {
  title: "Peripheral Vision Test - How Wide Is Your Field of View? | BenchMyBrain",
  description:
    "Test your peripheral vision online. Stare at the center and detect targets appearing at the edges of your vision. Free, no sign-up required.",
  keywords: [
    "peripheral vision test",
    "field of view test",
    "side vision test",
    "vision test online",
    "peripheral awareness",
    "eye test",
  ],
};

export default function PeripheralPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Peripheral Vision Test
        </h1>
        <p className="text-gray-400">
          Keep your eyes on the center dot. Click targets that appear in your
          side vision. 15 rounds -- don't look away from center!
        </p>
      </div>

      <PeripheralVision />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About Peripheral Vision</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why It Matters</h3>
            <p className="text-sm text-gray-400">
              Peripheral vision covers about 170 degrees of your visual field.
              It's crucial for driving, sports, and spatial awareness. Athletes
              with better peripheral vision tend to have faster reaction times
              and better game awareness.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Can You Improve It?</h3>
            <p className="text-sm text-gray-400">
              Yes! Peripheral vision can be trained through specific exercises.
              Sports like basketball and martial arts naturally improve
              peripheral awareness. Regular practice with tests like this one
              can also help sharpen your side vision over time.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Peripheral Vision Test",
            description: "Free online peripheral vision and field of view test.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}
