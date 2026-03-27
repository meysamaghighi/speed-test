import type { Metadata } from "next";
import SpatialRotation from "../components/SpatialRotation";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Mental Rotation Test - 3D Spatial Rotation Recognition Game | BenchMyBrain",
  description:
    "Free online mental rotation test. Test your spatial reasoning and 3D spatial rotation recognition with this interactive game. Compare rotated 3D shapes and measure your visual-spatial intelligence.",
  keywords: [
    "mental rotation test",
    "3d spatial rotation recognition game",
    "spatial rotation test",
    "mental rotation",
    "spatial reasoning test",
    "visual spatial test",
    "3D rotation game",
    "spatial intelligence test",
  ],
  openGraph: {
    title: "Mental Rotation Test - 3D Spatial Rotation Game | BenchMyBrain",
    description:
      "Test your spatial reasoning with this mental rotation challenge. Compare rotated 3D shapes and measure your visual-spatial intelligence. Free online test.",
    type: "website",
  },
};

export default function RotationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Spatial Rotation Test
        </h1>
        <p className="text-gray-400">
          Compare two block shapes and decide if they are the SAME (rotated) or DIFFERENT. Test your mental rotation ability across 15 rounds.
        </p>
      </div>

      <SpatialRotation />

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-white">What is a Mental Rotation Test?</h2>
        <p className="text-gray-300 leading-relaxed">
          A mental rotation test (also called a spatial rotation test or 3D spatial rotation recognition game) measures your ability to mentally manipulate and rotate 3D objects in your mind. In this test, you compare two 3D block shapes shown from different angles and determine if they are the same shape (just rotated) or completely different shapes. Mental rotation is a core component of spatial intelligence and visual-spatial reasoning.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8">How Does the Mental Rotation Test Work?</h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <ol className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">1.</span>
              <span>Two 3D block shapes appear on your screen in different orientations</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">2.</span>
              <span>Mentally rotate one of the shapes to match the orientation of the other</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">3.</span>
              <span>Decide if they are the SAME shape (rotated) or DIFFERENT shapes</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">4.</span>
              <span>Complete 15 rounds to get your spatial rotation score</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-white shrink-0">5.</span>
              <span>The test measures both accuracy and response time</span>
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8">About Spatial Reasoning and Mental Rotation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is Spatial Reasoning?</h3>
            <p className="text-sm text-gray-400">
              Spatial reasoning is the ability to mentally manipulate 2D and 3D objects.
              It involves visualizing rotations, understanding how shapes fit together,
              and recognizing objects from different angles. Mental rotation tests specifically measure 3D spatial rotation recognition — your ability to imagine how objects look from different perspectives. This skill is fundamental for architects, engineers, surgeons, and pilots.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Who Uses Spatial Rotation Skills?</h3>
            <p className="text-sm text-gray-400">
              STEM professionals rely heavily on mental rotation and spatial skills. Studies show that engineers, mathematicians, and scientists score significantly higher on spatial rotation tests than the general population. Video game players, especially those who play 3D games, also develop stronger spatial reasoning and mental rotation abilities through practice.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/rotation" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Spatial Rotation Test",
            description: "Free online mental rotation test. Measure your spatial reasoning and visual-spatial intelligence.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is mental rotation?</h3>
            <p className="text-gray-300">
              Mental rotation is the ability to imagine how a 2D or 3D object would look when rotated in space. It&apos;s a key component of spatial intelligence and is measured by tests where you compare shapes shown from different angles. A mental rotation test challenges you to mentally rotate 3D objects and recognize if they match.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is 3D spatial rotation recognition?</h3>
            <p className="text-gray-300">
              3D spatial rotation recognition is the specific ability to identify whether two 3D shapes shown from different angles are the same object (just rotated) or different objects. This skill is tested in mental rotation games and assessments used in cognitive research and job screening for technical roles.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Can you improve spatial reasoning and mental rotation?</h3>
            <p className="text-gray-300">
              Yes! Studies show that spatial skills and mental rotation abilities can be significantly improved through practice. Playing 3D video games, doing puzzles, learning origami, practicing with mental rotation tests, and playing 3D spatial rotation recognition games like this one can all strengthen your abilities. Research shows improvements of 20-30% with regular practice.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Why is spatial reasoning important?</h3>
            <p className="text-gray-300">
              Spatial reasoning and mental rotation predict success in STEM careers. These skills are essential for architects, engineers, surgeons, pilots, and mathematicians. Research shows spatial reasoning is as important as math ability for predicting performance in technical fields. Many employers use mental rotation tests during hiring for technical positions.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">What is a good score on the mental rotation test?</h3>
            <p className="text-gray-300">
              Scoring 12+ out of 15 (80%+) is considered excellent and indicates strong spatial reasoning. Most people score between 9-12 (60-80%). Professional architects and engineers typically score in the 80-90% range. With practice using 3D spatial rotation recognition games, most people can improve their scores significantly.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-2">How do mental rotation tests work?</h3>
            <p className="text-gray-300">
              Mental rotation tests present pairs of 3D objects in different orientations. You must mentally rotate one object to determine if it matches the other. The test measures accuracy and speed — faster correct responses indicate stronger spatial rotation abilities. This type of 3D spatial rotation recognition game has been used in cognitive research since the 1970s.
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
                name: "What is mental rotation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Mental rotation is the ability to imagine how a 2D or 3D object would look when rotated in space. It's a key component of spatial intelligence and is measured by tests where you compare shapes shown from different angles. A mental rotation test challenges you to mentally rotate 3D objects and recognize if they match.",
                },
              },
              {
                "@type": "Question",
                name: "What is 3D spatial rotation recognition?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "3D spatial rotation recognition is the specific ability to identify whether two 3D shapes shown from different angles are the same object (just rotated) or different objects. This skill is tested in mental rotation games and assessments used in cognitive research and job screening for technical roles.",
                },
              },
              {
                "@type": "Question",
                name: "Can you improve spatial reasoning and mental rotation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Studies show that spatial skills and mental rotation abilities can be significantly improved through practice. Playing 3D video games, doing puzzles, learning origami, practicing with mental rotation tests, and playing 3D spatial rotation recognition games like this one can all strengthen your abilities. Research shows improvements of 20-30% with regular practice.",
                },
              },
              {
                "@type": "Question",
                name: "Why is spatial reasoning important?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Spatial reasoning and mental rotation predict success in STEM careers. These skills are essential for architects, engineers, surgeons, pilots, and mathematicians. Research shows spatial reasoning is as important as math ability for predicting performance in technical fields. Many employers use mental rotation tests during hiring for technical positions.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good score on the mental rotation test?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Scoring 12+ out of 15 (80%+) is considered excellent and indicates strong spatial reasoning. Most people score between 9-12 (60-80%). Professional architects and engineers typically score in the 80-90% range. With practice using 3D spatial rotation recognition games, most people can improve their scores significantly.",
                },
              },
              {
                "@type": "Question",
                name: "How do mental rotation tests work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Mental rotation tests present pairs of 3D objects in different orientations. You must mentally rotate one object to determine if it matches the other. The test measures accuracy and speed — faster correct responses indicate stronger spatial rotation abilities. This type of 3D spatial rotation recognition game has been used in cognitive research since the 1970s.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
