import type { Metadata } from "next";
import { Suspense } from "react";
import ChimpPlay from "./ChimpPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Chimp Memory Test — Are You Smarter Than a Chimpanzee?",
  description:
    "Take the Ayumu chimp memory test. Can you beat a chimpanzee at memory? Test your working memory against the world's most famous cognitive research.",
  keywords: ["are you smarter than a chimpanzee", "chimp test", "chimpanzee memory test", "are you smarter than a chimp", "beat the chimp", "chimp memory test", "Ayumu chimp test", "number memory test", "chimp memory test online", "chimpanzee vs human memory", "ayumu chimpanzee test score", "primate institute kyoto memory test", "human benchmark chimp", "how does the chimpanzee memory test work"],
  openGraph: {
    title: "Chimp Memory Test — Are You Smarter Than a Chimpanzee?",
    description: "Take the Ayumu chimp memory test. Can you beat a chimpanzee at memory? Test your working memory against the world's most famous cognitive research.",
    type: "website",
    images: [{ url: "/api/og?test=chimp", width: 1200, height: 630, alt: "Chimp Memory Test — Are You Smarter Than a Chimpanzee?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chimp Memory Test — Are You Smarter Than a Chimpanzee?",
    description: "Take the Ayumu chimp memory test. Can you beat a chimpanzee at memory? Test your working memory against the world's most famous cognitive research.",
    images: ["/api/og?test=chimp"],
  },
  alternates: {
    canonical: "/chimp",
  },
};

export default function ChimpPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 mb-4">
          <p className="text-orange-700 font-bold text-lg">Can you beat a chimp?</p>
          <p className="text-ink-2 text-sm mt-1">Ayumu consistently recalled 9 numbers. Most humans max out at 5–7.</p>
        </div>
      </div>
      <Suspense>
        <ChimpPlay />
      </Suspense>
      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-ink">Are You Smarter Than a Chimpanzee?</h2>
        <p className="text-ink-2 leading-relaxed">
          The question &quot;are you smarter than a chimpanzee?&quot; became famous after a 2007 Kyoto University study revealed something shocking: chimpanzees could beat humans at a specific memory test. While humans excel at language, abstract reasoning, and complex problem-solving, chimps have one surprising advantage — photographic memory for spatial positions. The chimp test challenges you to prove whether you can beat a chimp at their own game. Spoiler: it&apos;s harder than you think. Most humans cannot beat the chimp consistently, even with practice.
        </p>

        <h2 className="text-2xl font-bold text-ink mt-8">What is the Chimp Test?</h2>
        <p className="text-ink-2 leading-relaxed">
          The chimp test (also known as the chimpanzee memory test or chimp memory test) is a cognitive experiment from Kyoto University where numbers appear briefly on a grid, and you must click them in ascending order after they disappear. The test measures your working memory and visual recall — specifically, whether you&apos;re smarter than a chimpanzee at remembering number positions. The original research by Tetsuro Matsuzawa showed that Ayumu, a young chimp, could consistently outperform adult humans, scoring 80%+ on trials where humans averaged under 40%.
        </p>

        <h2 className="text-2xl font-bold text-ink mt-8">The Original Experiment: How Ayumu Beat Humans</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Ayumu the Chimpanzee</h3>
            <p className="text-sm text-ink-2">
              In 2007, researchers at Kyoto University&apos;s Primate Research Institute found that Ayumu, a young chimpanzee, could remember the positions of 9 numbers after seeing them for just 210 milliseconds — outperforming every human tested. Ayumu scored approximately 80% accuracy on the hardest trials, while college students averaged 40%. This discovery challenged the long-held assumption that humans have superior memory in all domains. The study made headlines worldwide when people asked: &quot;Are you smarter than a chimpanzee?&quot; For this specific memory task, the answer for most humans is no.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Why Chimps Beat Us</h3>
            <p className="text-sm text-ink-2">
              Researchers believe chimps have superior &quot;eidetic&quot; (photographic) short-term memory for visual-spatial information. They can capture an entire visual scene in a fraction of a second — a skill that may have helped their ancestors track multiple predators and food sources simultaneously. Humans likely traded this ability during evolution to develop language processing in the same brain regions. This evolutionary trade-off is why it&apos;s so difficult for humans to beat the chimp at this memory test, even with extensive practice. Are you smarter than a chimp overall? Yes. Can you beat the chimp at this test? Probably not.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-ink mt-8">How Does the Chimp Memory Test Work?</h2>
        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <ol className="space-y-3 text-ink-2">
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">1.</span>
              <span>Numbers (1-9) appear randomly on a grid</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">2.</span>
              <span>When you click the first number (1), all other numbers disappear</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">3.</span>
              <span>You must click the remaining positions in ascending order from memory</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">4.</span>
              <span>The test starts with 4 numbers and increases difficulty as you succeed</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">5.</span>
              <span>Your goal: beat the chimp by reaching 9+ numbers consistently (most humans can&apos;t)</span>
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-ink mt-8">Can You Beat the Chimp? Tips for Improving</h2>
        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <p className="text-ink-2 mb-4">
            While it&apos;s extremely difficult to beat a chimpanzee at this memory test, humans can improve with practice. Here are strategies to help you get closer to Ayumu&apos;s level:
          </p>
          <ul className="space-y-3 text-ink-2">
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Chunk patterns:</strong> Instead of memorizing individual numbers, try to see patterns (diagonals, clusters, shapes)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Snapshot the grid:</strong> Take a mental &quot;photo&quot; of the entire grid rather than scanning numbers sequentially</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Use spatial memory:</strong> Remember positions relative to other numbers, not absolute locations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Practice regularly:</strong> Your score can improve 20-30% with consistent practice over several weeks</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Stay relaxed:</strong> Anxiety reduces working memory capacity. Take deep breaths before each round</span>
            </li>
          </ul>
          <p className="text-ink-2 mt-4">
            Even with these strategies, reaching Ayumu&apos;s consistent 80%+ accuracy on 9-number trials is extremely rare for humans. If you can beat the chimp regularly, you have exceptional visual memory!
          </p>
        </div>

        <h2 className="text-2xl font-bold text-ink mt-8">Understanding Your Chimp Test Score</h2>
        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <p className="text-ink-2 mb-4">
            How do you compare to other humans and chimps on the chimp memory test? Here&apos;s what different scores mean:
          </p>
          <div className="space-y-4 text-ink-2">
            <div className="border-l-4 border-red-600 pl-4">
              <strong className="text-ink">4-5 numbers:</strong> Below average. Most first-time users start here. With practice, you can improve significantly.
            </div>
            <div className="border-l-4 border-yellow-600 pl-4">
              <strong className="text-ink">6-7 numbers:</strong> Average human performance. This is where most people plateau after a few tries. You&apos;re in the majority, but far from beating the chimp.
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <strong className="text-ink">8 numbers:</strong> Above average. You have good visual memory and are approaching chimp-level performance. Only about 20% of humans reach this consistently.
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <strong className="text-ink">9+ numbers:</strong> Exceptional. You&apos;ve beaten the chimp test at Ayumu&apos;s level. Less than 5% of humans can maintain this score. You have rare photographic memory abilities for spatial recall.
            </div>
          </div>
          <p className="text-ink-2 mt-4">
            Remember: Ayumu the chimpanzee scores 80%+ accuracy at the 9-number level consistently. Most humans struggle to reach 40% accuracy at that level, even with extensive practice.
          </p>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-ink">The Science Behind the Chimp Memory Test</h2>
        <p className="text-ink-2 leading-relaxed">
          The chimp memory test is rooted in a landmark 2007 study by Tetsuro Matsuzawa and Sana Inoue at Kyoto University&apos;s Primate Research Institute (PRI). Published in the journal <em>Current Biology</em>, the study titled &quot;Working memory of numerals in chimpanzees&quot; demonstrated that young chimpanzees possess a remarkable form of eidetic memory — the ability to capture and retain a visual scene almost instantaneously.
        </p>

        <h3 className="text-xl font-bold text-ink">Working Memory vs Short-Term Memory</h3>
        <p className="text-ink-2 leading-relaxed">
          The chimp test specifically measures <strong>working memory</strong> — the cognitive system that temporarily holds and manipulates information. Working memory differs from short-term memory in an important way: short-term memory is passive storage (like remembering a phone number for a few seconds), while working memory requires active processing (like remembering number <em>positions</em> and recalling them in a specific order). The Kyoto primate institute memory test revealed that chimpanzees excel at the visual-spatial component of working memory, even though humans outperform them on verbal and sequential working memory tasks.
        </p>

        <h3 className="text-xl font-bold text-ink">Matsuzawa&apos;s Research at Kyoto University PRI</h3>
        <p className="text-ink-2 leading-relaxed">
          Professor Tetsuro Matsuzawa spent over 30 years studying chimpanzee cognition at the Primate Research Institute in Inuyama, Japan. His research group trained chimpanzees to recognize Arabic numerals (1–9) and their sequential order on touchscreen monitors. In the critical experiment, numbers appeared on screen for durations as short as 210 milliseconds — roughly the time of a single eye fixation — before being masked by white squares. Ayumu, the star subject, could recall all 9 positions with approximately 80% accuracy at that speed. Human university students tested under identical conditions scored around 40% on the hardest trials. The study was replicated multiple times and the results held consistently, establishing that this chimpanzee advantage is genuine, not a fluke.
        </p>

        <h3 className="text-xl font-bold text-ink">The Cognitive Trade-Off Hypothesis</h3>
        <p className="text-ink-2 leading-relaxed">
          Why can chimps beat humans at this memory test? Matsuzawa proposed the &quot;cognitive trade-off hypothesis&quot;: as humans evolved language capabilities, the brain regions responsible for rapid visual-spatial encoding were repurposed for linguistic processing. Chimpanzees, who never developed complex language, retained this ancestral photographic memory ability. This hypothesis suggests that humans didn&apos;t simply &quot;lose&quot; this skill — they traded it for something even more powerful: the ability to communicate through language. The chimp memory test captures this evolutionary trade-off in action.
        </p>
      </section>

      <RelatedTests current="/chimp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Chimp Memory Test", description: "The famous chimp memory test. Click numbers in order after they disappear.", applicationCategory: "GameApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-ink mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">What is the chimp test?</h3>
            <p className="text-ink-2">
              The chimp test is a working memory experiment made famous by a 2007 study at Primate Research Institute, Kyoto. Numbers appear briefly on a grid; after you tap the first one, the rest disappear and you must click all positions in ascending order from memory. It tests visual-spatial recall — a domain where chimpanzees outperform most humans.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Who is Ayumu?</h3>
            <p className="text-ink-2">
              Ayumu is a chimpanzee at Kyoto University&apos;s Primate Research Institute, born in 2000. In 2007, researcher Tetsuro Matsuzawa found that Ayumu could memorize the positions of 9 numbers after seeing them for just 210 milliseconds — faster and more accurately than any adult human in the study. The discovery went viral and spawned online chimp tests worldwide.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Are chimps really smarter than humans?</h3>
            <p className="text-ink-2">
              Not overall — but for this specific task, yes. Humans vastly outperform chimps in language, abstract reasoning, tool-making, and social cognition. However, chimps appear to have superior photographic short-term memory for visual-spatial positions. Researchers believe humans may have traded that ability during evolution to free up brain regions for language processing.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">What does my score mean?</h3>
            <p className="text-ink-2">
              Scores of 4–5 numbers are typical for first-time players. Most people plateau at 6–7 with practice. Reaching 8 is above average; 9+ means you are performing at Ayumu&apos;s level — fewer than 5% of humans get there consistently. Ayumu himself averaged 80%+ accuracy at 9 numbers; most humans average under 40% at that difficulty.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Is this the official &quot;are you smarter than a chimpanzee&quot; test?</h3>
            <p className="text-ink-2">
              This is a faithful free recreation of the Kyoto University chimpanzee memory test made famous by Ayumu and researcher Tetsuro Matsuzawa. The original test is not publicly available online — it was run on touchscreen hardware in a controlled lab setting. This version replicates the core mechanic: numbers flash briefly on a grid, you tap the first one, the rest vanish, and you must recall all positions in order. The difficulty scaling (starting at 4 numbers, increasing as you succeed) mirrors the original protocol.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Are you smarter than a chimpanzee overall?</h3>
            <p className="text-ink-2">
              Yes — in almost every meaningful cognitive domain. Humans vastly outperform chimpanzees in language, abstract reasoning, planning, tool-making, mathematics, and social cognition. Chimps have one narrow advantage: photographic short-term memory for visual-spatial positions. This specific ability — snapshotting a grid of numbers in milliseconds — is the only domain where chimps consistently beat adult humans in controlled studies. So the honest answer is: you are smarter than a chimpanzee, but you probably cannot beat a chimpanzee at this particular test.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Human vs chimpanzee: how do the scores actually compare?</h3>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left py-2 pr-4 font-semibold text-ink">Metric</th>
                    <th className="text-left py-2 pr-4 font-semibold text-orange-400">Ayumu (chimp)</th>
                    <th className="text-left py-2 font-semibold text-blue-400">Average human</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr><td className="py-2 pr-4">Numbers recalled (consistent)</td><td className="py-2 pr-4 text-orange-400">9</td><td className="py-2 text-blue-400">6–7</td></tr>
                  <tr><td className="py-2 pr-4">Accuracy at 9 numbers</td><td className="py-2 pr-4 text-orange-400">~80%</td><td className="py-2 text-blue-400">~40%</td></tr>
                  <tr><td className="py-2 pr-4">Flash duration mastered</td><td className="py-2 pr-4 text-orange-400">210 ms</td><td className="py-2 text-blue-400">500+ ms</td></tr>
                  <tr><td className="py-2 pr-4">Improvement with practice</td><td className="py-2 pr-4 text-orange-400">Minimal (already maxed)</td><td className="py-2 text-blue-400">20–30% possible</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Can I play the chimp memory test online for free?</h3>
            <p className="text-ink-2">
              Yes — this is a free online chimp memory test you can play directly in your browser, no download or sign-up required. It faithfully recreates the Kyoto University experiment where Ayumu the chimpanzee outperformed humans. The test works on desktop, tablet, and mobile devices. Simply click &quot;Start&quot; above to begin testing your memory against a chimpanzee.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">What was Ayumu the chimpanzee&apos;s test score?</h3>
            <p className="text-ink-2">
              In the original 2007 Kyoto University study, Ayumu consistently recalled all 9 numbers with approximately 80% accuracy when the numbers were displayed for just 210 milliseconds. Even at the shortest exposure times, Ayumu maintained high accuracy. By comparison, the best-performing human participants in the same study scored around 40% on 9-number trials with the same brief exposure. Ayumu&apos;s score represents the gold standard for this test — if you can consistently recall 9 numbers, you are performing at the same level as one of the most cognitively gifted chimpanzees ever studied.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">What is the Primate Research Institute Kyoto memory test?</h3>
            <p className="text-ink-2">
              The Primate Research Institute (PRI) at Kyoto University in Inuyama, Japan, is where Professor Tetsuro Matsuzawa and his team conducted the famous chimpanzee memory experiments. The &quot;PRI memory test&quot; or &quot;Kyoto primate institute memory test&quot; refers to the numerical sequence task where chimpanzees and humans compete to remember the positions of numbers on a touchscreen. The original lab test used custom hardware and software. This online version replicates the same core mechanics so anyone can experience the test that made Ayumu famous worldwide.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">How is this different from Human Benchmark&apos;s chimp test?</h3>
            <p className="text-ink-2">
              Both this chimp memory test and Human Benchmark&apos;s version are based on the same Kyoto University experiment. The core mechanic is identical: numbers appear on a grid, you click the first one, the rest disappear, and you recall positions in order. BenchMyBrain&apos;s version includes additional context about the original research, Ayumu&apos;s actual scores, and the science behind why chimps beat humans. The difficulty scaling starts at 4 numbers and increases as you succeed, matching the original experimental protocol.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Does the chimp memory test measure IQ?</h3>
            <p className="text-ink-2">
              No — the chimp test measures a specific type of visual-spatial working memory, not general intelligence or IQ. You can have a high IQ and still struggle with this test, because it targets a narrow cognitive skill (rapid visual encoding) that is largely independent of verbal reasoning, logic, or problem-solving ability. The test is better understood as a measure of your visual working memory capacity and processing speed. That said, working memory is one component of fluid intelligence, so a very high chimp test score does suggest strong cognitive processing in that domain.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-6 border border-line">
            <h3 className="font-bold text-ink mb-2">Can children beat the chimp test more easily than adults?</h3>
            <p className="text-ink-2">
              Interestingly, yes — younger participants often perform better on visual-spatial memory tasks like the chimp test. In Matsuzawa&apos;s research, younger chimpanzees (including Ayumu, who was 5 years old during the original study) outperformed older chimps. Similarly, children and teenagers tend to have faster visual processing speeds than adults. This may be because the brain&apos;s visual-spatial encoding abilities are at their peak during development, before the prefrontal cortex fully matures and shifts resources toward abstract reasoning and language. If you&apos;re an adult struggling to beat the chimp, age may be a factor — but practice still helps.
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
              {
                "@type": "Question",
                name: "Is this the official are you smarter than a chimpanzee test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "This is a faithful free recreation of the Kyoto University chimpanzee memory test made famous by Ayumu. The original test ran on lab hardware and is not publicly available. This version replicates the core mechanic: numbers flash briefly on a grid, you tap the first, the rest vanish, and you recall all positions in order.",
                },
              },
              {
                "@type": "Question",
                name: "Are you smarter than a chimpanzee?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — in almost every meaningful cognitive domain. Humans vastly outperform chimpanzees in language, abstract reasoning, planning, and mathematics. Chimps have one narrow advantage: photographic short-term memory for visual-spatial positions. You are smarter than a chimpanzee overall, but you probably cannot beat a chimpanzee at this specific memory test.",
                },
              },
              {
                "@type": "Question",
                name: "Can I play the chimp memory test online for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — BenchMyBrain offers a free online chimp memory test you can play directly in your browser, no download or sign-up required. It faithfully recreates the Kyoto University experiment where Ayumu the chimpanzee outperformed humans.",
                },
              },
              {
                "@type": "Question",
                name: "What was Ayumu the chimpanzee's test score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In the original 2007 Kyoto University study, Ayumu consistently recalled all 9 numbers with approximately 80% accuracy when numbers were displayed for just 210 milliseconds. The best-performing human participants scored around 40% on 9-number trials with the same brief exposure.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Primate Research Institute Kyoto memory test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Primate Research Institute (PRI) at Kyoto University in Inuyama, Japan, is where Professor Tetsuro Matsuzawa conducted the famous chimpanzee memory experiments. The PRI memory test refers to the numerical sequence task where chimpanzees and humans compete to remember positions of numbers on a touchscreen.",
                },
              },
              {
                "@type": "Question",
                name: "Does the chimp memory test measure IQ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No — the chimp test measures visual-spatial working memory, not general intelligence or IQ. You can have a high IQ and still struggle with this test, because it targets rapid visual encoding, which is largely independent of verbal reasoning or problem-solving ability.",
                },
              },
              {
                "@type": "Question",
                name: "Can children beat the chimp test more easily than adults?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — younger participants often perform better on visual-spatial memory tasks like the chimp test. In Matsuzawa's research, younger chimpanzees outperformed older chimps. Similarly, children and teenagers tend to have faster visual processing speeds than adults, possibly because visual-spatial encoding peaks during development.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
