import type { Metadata } from "next";
import PeripheralTest from "../components/PeripheralTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Peripheral Vision Test - UFOV Divided Attention Test | BenchMyBrain",
  description:
    "Test your peripheral vision with the UFOV (Useful Field of View) test. Identify center targets while detecting peripheral stimuli. Measures divided attention and visual awareness.",
  keywords: [
    "peripheral vision test",
    "UFOV test",
    "useful field of view",
    "divided attention test",
    "visual field test",
    "peripheral awareness",
  ],
  openGraph: {
    title: "Peripheral Vision Test - UFOV Divided Attention Test | BenchMyBrain",
    description:
      "Test your peripheral vision with the UFOV test. Identify center targets while detecting peripheral stimuli simultaneously.",
    type: "website",
  },
  alternates: {
    canonical: "/peripheral-test",
  },
};

export default function PeripheralTestPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Peripheral Vision Test
        </h1>
        <p className="text-gray-400">
          The UFOV (Useful Field of View) test. Identify center letters while detecting peripheral targets simultaneously.
        </p>
      </div>

      <PeripheralTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">About the UFOV Test</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is UFOV?</h3>
            <p className="text-sm text-gray-400">
              The Useful Field of View (UFOV) is a validated cognitive test that measures divided attention and peripheral awareness. It requires you to process central and peripheral information simultaneously, testing your ability to split attention across your visual field.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why It Matters</h3>
            <p className="text-sm text-gray-400">
              UFOV performance predicts driving safety, fall risk in older adults, and athletic performance. Athletes, pilots, and drivers need strong divided attention to monitor central tasks while maintaining peripheral awareness of their environment.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/peripheral-test" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Peripheral Vision Test - UFOV",
            description: "Free online UFOV (Useful Field of View) test. Measure divided attention and peripheral awareness.",
            applicationCategory: "HealthApplication",
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
                name: "What is the UFOV test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "UFOV (Useful Field of View) is a cognitive test that measures divided attention and peripheral awareness. You must identify a central target while simultaneously detecting and locating a peripheral stimulus. It's used to assess driving safety, fall risk, and cognitive function.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good UFOV score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Scores above 80 indicate exceptional divided attention abilities. 65-79 is excellent, 50-64 is good, 35-49 is average. Athletes, pilots, and experienced gamers typically score higher due to training in divided attention tasks.",
                },
              },
              {
                "@type": "Question",
                name: "Can you improve UFOV performance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! UFOV can be improved through practice. Activities that train divided attention (sports, action video games, dual-task exercises) have been shown to improve UFOV scores. Regular practice with tests like this can enhance peripheral awareness and attentional control.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
