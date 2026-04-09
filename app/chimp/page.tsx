import type { Metadata } from "next";
import { Suspense } from "react";
import ChimpTest from "../components/ChimpTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Chimp Memory Test — Are You Smarter Than a Chimpanzee?",
  description:
    "Take the Ayumu chimp memory test. Can you beat a chimpanzee at memory? Test your working memory against the world's most famous cognitive research.",
  keywords: ["are you smarter than a chimpanzee", "chimp test", "chimpanzee memory test", "are you smarter than a chimp", "beat the chimp", "chimp memory test", "Ayumu chimp test", "number memory test"],
  openGraph: {
    title: "Chimp Memory Test — Are You Smarter Than a Chimpanzee?",
    description:
      "Take the Ayumu chimp memory test. Can you beat a chimpanzee at memory? Test your working memory against the world's most famous cognitive research.",
    type: "website",
  },
  alternates: {
    canonical: "/chimp",
  },
};

export default function ChimpPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">Chimp Memory Test</h1>
        <p className="text-gray-400 mb-6">
          In 2007, researchers at Primate Research Institute, Kyoto discovered that a chimpanzee named Ayumu could memorize and tap sequences of numbers faster and more accurately than any adult human tested. This finding challenged long-held assumptions about human cognitive superiority. Numbers appear on a grid — click them in order starting from 1. After you click the first number, the rest disappear.
        </p>
        <div className="bg-orange-950/40 border border-orange-800 rounded-xl p-4 mb-4">
          <p className="text-orange-300 font-bold text-lg">Can you beat a chimp?</p>
          <p className="text-gray-400 text-sm mt-1">Ayumu consistently recalled 9 numbers. Most humans max out at 5–7.</p>
        </div>
      </div>
      <Suspense>
        <ChimpTest />
      </Suspense>
      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-white">Are You Smarter Than a Chimpanzee?</h2>
        <p className="text-gray-300 leading-relaxed">
          The question &quot;are you smarter than a chimpanzee?&quot; became famous after a 2007 Kyoto University study revealed something shocking: chimpanzees could beat humans at a specific memory test. While humans excel at language, abstract reasoning, and complex problem-solving, chimps have one surprising advantage — photographic memory for spatial positions. The chimp test challenges you to prove whether you can beat a chimp at their own game. Spoiler: it&apos;s harder than you think. Most humans cannot beat the chimp consistently, even with practice.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8">What is the Chimp Test?</h2>
        <p className="text-gray-300 leading-relaxed">
          The chimp test (also known as the chimpanzee memory test or chimp memory test) is a cognitive experiment from Kyoto University where numbers appear briefly on a grid, and you must click them in ascending order after they disappear. The test measures your working memory and visual recall — specifically, whether you&apos;re smarter than a chimpanzee at remembering number positions. The original research by Tetsuro Matsuzawa showed that Ayumu, a young chimp, could consistently outperform adult humans, scoring 80%+ on trials where humans averaged under 40%.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8">The Original Experiment: How Ayumu Beat Humans</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Ayumu the Chimpanzee</h3>
            <p className="text-sm text-gray-400">
              In 2007, researchers at Kyoto University&apos;s Primate Research Institute found that Ayumu, a young chimpanzee, could remember the positions of 9 numbers after seeing them for just 210 milliseconds — outperforming every human tested. Ayumu scored approximately 80% accuracy on the hardest trials, while college students averaged 40%. This discovery challenged the long-held assumption that humans have superior memory in all domains. The study made headlines worldwide when people asked: &quot;Are you smarter than a chimpanzee?&quot; For this specific memory task, the answer for most humans is no.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why Chimps Beat Us</h3>
            <p className="text-sm text-gray-400">
              Researchers believe chimps have superior &quot;eidetic&quot; (photographic) short-term memory for visual-spatial information. They can capture an entire visual scene in a fraction of a second — a skill that may have helped their ancestors track multiple predators and food sources simultaneously. Humans likely traded this ability during evolution to develop language processing in the same brain regions. This evolutionary trade-off is why it&apos;s so difficult for humans to beat the chimp at this memory test, even with extensive practice. Are you smarter than a chimp overall? Yes. Can you beat the chimp at this test? Probably not.
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
              <span>Your goal: beat the chimp by reaching 9+ numbers consistently (most humans can&apos;t)</span>
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8">Can You Beat the Chimp? Tips for Improving</h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-300 mb-4">
            While it&apos;s extremely difficult to beat a chimpanzee at this memory test, humans can improve with practice. Here are strategies to help you get closer to Ayumu&apos;s level:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="text-white shrink-0">•</span>
              <span><strong>Chunk patterns:</strong> Instead of memorizing individual numbers, try to see patterns (diagonals, clusters, shapes)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white shrink-0">•</span>
              <span><strong>Snapshot the grid:</strong> Take a mental &quot;photo&quot; of the entire grid rather than scanning numbers sequentially</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white shrink-0">•</span>
              <span><strong>Use spatial memory:</strong> Remember positions relative to other numbers, not absolute locations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white shrink-0">•</span>
              <span><strong>Practice regularly:</strong> Your score can improve 20-30% with consistent practice over several weeks</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white shrink-0">•</span>
              <span><strong>Stay relaxed:</strong> Anxiety reduces working memory capacity. Take deep breaths before each round</span>
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            Even with these strategies, reaching Ayumu&apos;s consistent 80%+ accuracy on 9-number trials is extremely rare for humans. If you can beat the chimp regularly, you have exceptional visual memory!
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8">Understanding Your Chimp Test Score</h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-300 mb-4">
            How do you compare to other humans and chimps on the chimp memory test? Here&apos;s what different scores mean:
          </p>
          <div className="space-y-4 text-gray-300">
            <div className="border-l-4 border-red-600 pl-4">
              <strong className="text-white">4-5 numbers:</strong> Below average. Most first-time users start here. With practice, you can improve significantly.
            </div>
            <div className="border-l-4 border-yellow-600 pl-4">
              <strong className="text-white">6-7 numbers:</strong> Average human performance. This is where most people plateau after a few tries. You&apos;re in the majority, but far from beating the chimp.
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <strong className="text-white">8 numbers:</strong> Above average. You have good visual memory and are approaching chimp-level performance. Only about 20% of humans reach this consistently.
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <strong className="text-white">9+ numbers:</strong> Exceptional. You&apos;ve beaten the chimp test at Ayumu&apos;s level. Less than 5% of humans can maintain this score. You have rare photographic memory abilities for spatial recall.
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            Remember: Ayumu the chimpanzee scores 80%+ accuracy at the 9-number level consistently. Most humans struggle to reach 40% accuracy at that level, even with extensive practice.
          </p>
        </div>
      </section>

      <RelatedTests current="/chimp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Chimp Memory Test", description: "The famous chimp memory test. Click numbers in order after they disappear.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is the chimp test?</h3>
            <p className="text-gray-300">
              The chimp test is a working memory experiment made famous by a 2007 study at Primate Research Institute, Kyoto. Numbers appear briefly on a grid; after you tap the first one, the rest disappear and you must click all positions in ascending order from memory. It tests visual-spatial recall — a domain where chimpanzees outperform most humans.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Who is Ayumu?</h3>
            <p className="text-gray-300">
              Ayumu is a chimpanzee at Kyoto University&apos;s Primate Research Institute, born in 2000. In 2007, researcher Tetsuro Matsuzawa found that Ayumu could memorize the positions of 9 numbers after seeing them for just 210 milliseconds — faster and more accurately than any adult human in the study. The discovery went viral and spawned online chimp tests worldwide.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Are chimps really smarter than humans?</h3>
            <p className="text-gray-300">
              Not overall — but for this specific task, yes. Humans vastly outperform chimps in language, abstract reasoning, tool-making, and social cognition. However, chimps appear to have superior photographic short-term memory for visual-spatial positions. Researchers believe humans may have traded that ability during evolution to free up brain regions for language processing.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What does my score mean?</h3>
            <p className="text-gray-300">
              Scores of 4–5 numbers are typical for first-time players. Most people plateau at 6–7 with practice. Reaching 8 is above average; 9+ means you are performing at Ayumu&apos;s level — fewer than 5% of humans get there consistently. Ayumu himself averaged 80%+ accuracy at 9 numbers; most humans average under 40% at that difficulty.
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
                name: "What is the chimp test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The chimp test is a working memory experiment made famous by a 2007 study at Primate Research Institute, Kyoto. Numbers appear briefly on a grid; after you tap the first one, the rest disappear and you must click all positions in ascending order from memory. It tests visual-spatial recall — a domain where chimpanzees outperform most humans.",
                },
              },
              {
                "@type": "Question",
                name: "Who is Ayumu?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ayumu is a chimpanzee at Kyoto University's Primate Research Institute, born in 2000. In 2007, researcher Tetsuro Matsuzawa found that Ayumu could memorize the positions of 9 numbers after seeing them for just 210 milliseconds — faster and more accurately than any adult human in the study.",
                },
              },
              {
                "@type": "Question",
                name: "Are chimps really smarter than humans?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Not overall — but for this specific task, yes. Humans vastly outperform chimps in language, abstract reasoning, and social cognition. However, chimps appear to have superior photographic short-term memory for visual-spatial positions, a skill humans may have traded during evolution to free up brain regions for language.",
                },
              },
              {
                "@type": "Question",
                name: "What does my score mean?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Scores of 4–5 numbers are typical for first-time players. Most people plateau at 6–7 with practice. Reaching 8 is above average; 9+ means you are performing at Ayumu's level — fewer than 5% of humans get there consistently.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
