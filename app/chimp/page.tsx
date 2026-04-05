import type { Metadata } from "next";
import ChimpTest from "../components/ChimpTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Are You Smarter Than a Chimpanzee? Take the Chimp Memory Test",
  description:
    "Are you smarter than a chimpanzee? Take the famous chimp test from Kyoto University. Numbers flash on screen — can you beat the chimp like Ayumu? Test your memory against the world's smartest chimp. Free online chimp memory test.",
  keywords: ["are you smarter than a chimpanzee", "chimp test", "chimpanzee memory test", "are you smarter than a chimp", "beat the chimp", "chimp memory test", "Ayumu chimp test", "number memory test"],
  openGraph: {
    title: "Are You Smarter Than a Chimpanzee? Take the Chimp Memory Test",
    description:
      "Are you smarter than a chimpanzee? Take the famous chimp test from Kyoto University. Can you beat Ayumu the chimp at this legendary memory challenge?",
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
        <h1 className="text-4xl font-black text-white mb-3">Chimp Test</h1>
        <p className="text-gray-400">
          Numbers appear on a grid. Click them in order starting from 1. After you
          click the first number, the rest disappear. How many can you remember?
        </p>
      </div>
      <ChimpTest />
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
      </section>

      <RelatedTests current="/chimp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Chimp Test", description: "The famous chimp memory test. Click numbers in order after they disappear.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Are you smarter than a chimpanzee?</h3>
            <p className="text-gray-300">
              It depends on the task. While humans excel at language, abstract reasoning, and complex problem-solving, chimpanzees have superior photographic memory for spatial positions. The chimp test specifically measures one type of memory where chimps naturally excel. In the 2007 Kyoto University study, Ayumu the chimp scored 80% accuracy while humans averaged 40%. So while you might be smarter overall, beating the chimp at this specific memory test is extremely difficult. Most humans cannot beat the chimp even with practice.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Are you smarter than a chimp at the memory test?</h3>
            <p className="text-gray-300">
              Probably not. The 2007 Kyoto University research showed that Ayumu the chimpanzee consistently beat humans at the chimp memory test, scoring approximately 80% on the hardest trials while college students averaged under 40%. Chimps have superior photographic memory for visual-spatial information, making it extremely difficult for humans to beat the chimp at this specific task.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Can chimps really beat humans at memory?</h3>
            <p className="text-gray-300">
              Yes. In the 2007 Kyoto University study, chimpanzee Ayumu could remember the positions of 9 numbers after seeing them for just 210 milliseconds, outperforming every human tested. Ayumu&apos;s ability to beat humans at the chimp memory test has been replicated in hundreds of trials. Chimps scored approximately 80% accuracy on the hardest trials, while humans averaged 40%.
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
                  text: "It depends on the task. While humans excel at language, abstract reasoning, and complex problem-solving, chimpanzees have superior photographic memory for spatial positions. The chimp test specifically measures one type of memory where chimps naturally excel. In the 2007 Kyoto University study, Ayumu the chimp scored 80% accuracy while humans averaged 40%. So while you might be smarter overall, beating the chimp at this specific memory test is extremely difficult. Most humans cannot beat the chimp even with practice.",
                },
              },
              {
                "@type": "Question",
                name: "Are you smarter than a chimp at the memory test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Probably not. The 2007 Kyoto University research showed that Ayumu the chimpanzee consistently beat humans at the chimp memory test, scoring approximately 80% on the hardest trials while college students averaged under 40%. Chimps have superior photographic memory for visual-spatial information, making it extremely difficult for humans to beat the chimp at this specific task.",
                },
              },
              {
                "@type": "Question",
                name: "Can chimps really beat humans at memory?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. In the 2007 Kyoto University study, chimpanzee Ayumu could remember the positions of 9 numbers after seeing them for just 210 milliseconds, outperforming every human tested. Ayumu's ability to beat humans at the chimp memory test has been replicated in hundreds of trials. Chimps scored approximately 80% accuracy on the hardest trials, while humans averaged 40%.",
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
