import type { Metadata } from "next";
import ChimpTest from "../components/ChimpTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Chimp Test - Are You Smarter Than a Chimpanzee? Beat the Chimp Memory Test",
  description:
    "Take the famous chimpanzee memory test from Kyoto University. Can you beat the chimp? Numbers flash on screen — click them in order. Test your memory against Ayumu the chimp. Free online chimp memory test.",
  keywords: ["chimp test", "chimpanzee memory test", "are you smarter than a chimpanzee", "beat the chimp", "chimp memory test", "Ayumu chimp test", "number memory game"],
  openGraph: {
    title: "Chimp Test - Are You Smarter Than a Chimpanzee? | BenchMyBrain",
    description:
      "Take the famous chimpanzee memory test. Can you beat the chimp? Test your memory against Ayumu's legendary performance.",
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
        <h2 className="text-2xl font-bold text-white">What is the Chimp Test?</h2>
        <p className="text-gray-300 leading-relaxed">
          The chimp test (also known as the chimpanzee memory test) is a famous cognitive experiment from Kyoto University that challenges humans to beat a chimpanzee at a number memory task. In this test, numbers appear briefly on a grid, and you must click them in ascending order after they disappear. The question &quot;are you smarter than a chimpanzee?&quot; became famous when researchers discovered that Ayumu, a young chimp, could consistently outperform humans at this specific memory challenge.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8">The Original Chimp Memory Test</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Ayumu the Chimpanzee</h3>
            <p className="text-sm text-gray-400">
              In 2007, researchers at Kyoto University found that chimpanzee Ayumu could remember the positions of 9 numbers after seeing them for just 210 milliseconds — outperforming every human tested. This challenged the assumption that humans have superior memory. Ayumu became famous for his ability to beat humans at this memory test consistently.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How Chimps Beat Us</h3>
            <p className="text-sm text-gray-400">
              Researchers believe chimps have superior &quot;eidetic&quot; (photographic) short-term memory. They can capture an entire visual scene in a fraction of a second. Humans evolved to trade this ability for language processing in the same brain regions. This is why it&apos;s so difficult to beat the chimp at this specific task.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8">How Does the Chimp Memory Test Work?</h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <ol className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">1.</span>
              <span>Numbers (1-9) appear randomly on a grid</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">2.</span>
              <span>When you click the first number (1), all other numbers disappear</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">3.</span>
              <span>You must click the remaining positions in ascending order from memory</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">4.</span>
              <span>The test starts with 4 numbers and increases difficulty as you succeed</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">5.</span>
              <span>Your goal: beat the chimp by reaching 9+ numbers consistently</span>
            </li>
          </ol>
        </div>
      </section>

      <RelatedTests current="/chimp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Chimp Test", description: "The famous chimp memory test. Click numbers in order after they disappear.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Are you smarter than a chimpanzee?</h3>
            <p className="text-gray-300">
              It depends on the task. While humans excel at language, abstract reasoning, and complex problem-solving, chimpanzees have superior photographic memory for spatial positions. The chimp test specifically measures one type of memory where chimps naturally excel. So while you might be smarter overall, beating the chimp at this specific memory test is extremely difficult.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Can chimps really beat humans at memory?</h3>
            <p className="text-gray-300">
              Yes. In the 2007 Kyoto University study, chimpanzee Ayumu could remember 9 numbers after seeing them for just 210 milliseconds, outperforming every human tested. Ayumu&apos;s ability to beat humans at the chimp memory test has been replicated in hundreds of trials.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why are chimps better at this task?</h3>
            <p className="text-gray-300">
              Researchers believe chimps have superior photographic (eidetic) short-term memory. They can capture an entire visual scene in a fraction of a second. Humans may have traded this ability during evolution to develop language processing in the same brain regions.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is a good score on the chimp test?</h3>
            <p className="text-gray-300">
              Most humans can reliably handle 5-7 numbers. Reaching 8-9 is impressive. Consistently scoring 9+ puts you at chimpanzee level — something very few humans can achieve. If you can beat the chimp by consistently scoring 9 or higher, you have exceptional visual memory.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How can I beat the chimp memory test?</h3>
            <p className="text-gray-300">
              To beat the chimp, practice chunking (grouping numbers mentally), use spatial patterns instead of memorizing individual positions, and try to capture the entire grid as a single image. Regular practice can improve your score, but reaching Ayumu&apos;s level of 9+ numbers consistently is rare for humans.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Who is Ayumu the chimpanzee?</h3>
            <p className="text-gray-300">
              Ayumu is a chimpanzee at Kyoto University&apos;s Primate Research Institute who became famous for his extraordinary memory abilities. Born in 2000, Ayumu has been participating in cognitive research since he was young and consistently beats humans at the chimp memory test.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Are you smarter than a chimpanzee?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on the task. While humans excel at language, abstract reasoning, and complex problem-solving, chimpanzees have superior photographic memory for spatial positions. The chimp test specifically measures one type of memory where chimps naturally excel. So while you might be smarter overall, beating the chimp at this specific memory test is extremely difficult.",
                },
              },
              {
                "@type": "Question",
                name: "Can chimps really beat humans at memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. In the 2007 Kyoto University study, chimpanzee Ayumu could remember 9 numbers after seeing them for just 210 milliseconds, outperforming every human tested. Ayumu's ability to beat humans at the chimp memory test has been replicated in hundreds of trials.",
                },
              },
              {
                "@type": "Question",
                name: "Why are chimps better at this task?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Researchers believe chimps have superior photographic (eidetic) short-term memory. They can capture an entire visual scene in a fraction of a second. Humans may have traded this ability during evolution to develop language processing in the same brain regions.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good score on the chimp test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most humans can reliably handle 5-7 numbers. Reaching 8-9 is impressive. Consistently scoring 9+ puts you at chimpanzee level — something very few humans can achieve. If you can beat the chimp by consistently scoring 9 or higher, you have exceptional visual memory.",
                },
              },
              {
                "@type": "Question",
                name: "How can I beat the chimp memory test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To beat the chimp, practice chunking (grouping numbers mentally), use spatial patterns instead of memorizing individual positions, and try to capture the entire grid as a single image. Regular practice can improve your score, but reaching Ayumu's level of 9+ numbers consistently is rare for humans.",
                },
              },
              {
                "@type": "Question",
                name: "Who is Ayumu the chimpanzee?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ayumu is a chimpanzee at Kyoto University's Primate Research Institute who became famous for his extraordinary memory abilities. Born in 2000, Ayumu has been participating in cognitive research since he was young and consistently beats humans at the chimp memory test.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
