import type { Metadata } from "next";
import ChimpTest from "../components/ChimpTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Chimp Test - Are You Smarter Than a Chimpanzee?",
  description:
    "The famous chimp test from Kyoto University. Numbers flash on screen — click them in order after they disappear. Chimps score 80% at 9 numbers. Can you?",
  keywords: ["chimp test", "chimpanzee memory test", "number memory game", "are you smarter than a chimp", "Ayumu chimp test", "sequence memory"],
  openGraph: {
    title: "Chimp Test - Are You Smarter Than a Chimpanzee? | BenchMyBrain",
    description:
      "The famous chimp test from Kyoto University. Numbers flash on screen — click them in order after they disappear. Chimps score 80% at 9 numbers. Can you?",
    type: "website",
  },
};

export default function ChimpPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Chimp Test</h1>
        <p className="text-gray-400">
          Numbers appear on a grid. Click them in order starting from 1. After you
          click the first number, the rest disappear. How many can you remember?
        </p>
      </div>
      <ChimpTest />
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">The Original Chimp Test</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Ayumu the Chimpanzee</h3>
            <p className="text-sm text-gray-400">
              In 2007, researchers at Kyoto University found that chimpanzee Ayumu could remember the positions of 9 numbers after seeing them for just 210 milliseconds — outperforming every human tested. This challenged the assumption that humans have superior memory.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How Chimps Beat Us</h3>
            <p className="text-sm text-gray-400">
              Researchers believe chimps have superior &quot;eidetic&quot; (photographic) short-term memory. They can capture an entire visual scene in a fraction of a second. Humans evolved to trade this ability for language processing in the same brain regions.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/chimp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Chimp Test", description: "The famous chimp memory test. Click numbers in order after they disappear.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can chimps really beat humans at memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. In the 2007 Kyoto University study, chimpanzee Ayumu could remember 9 numbers after seeing them for just 210 milliseconds, outperforming every human tested.",
                },
              },
              {
                "@type": "Question",
                name: "Why are chimps better at this task?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Researchers believe chimps have superior photographic (eidetic) short-term memory. Humans may have traded this ability during evolution to develop language processing in the same brain regions.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good score on the chimp test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most humans can reliably handle 5-7 numbers. Reaching 8-9 is impressive. Consistently scoring 9+ puts you at chimpanzee level — something very few humans can achieve.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
