import type { Metadata } from "next";
import { Suspense } from "react";
import RotationPlay from "./RotationPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Mental Rotation Test Online - Free 3D Spatial Rotation Test",
  description:
    "Take the mental rotation test online for free. Compare rotated 3D shapes and measure your spatial intelligence. Used by engineers and architects. Test your mental rotation skills now.",
  keywords: [
    "mental rotation test online",
    "mental rotation test",
    "mental rotation tests",
    "3D rotation test",
    "spatial rotation test",
    "brain rotation test",
    "spatial reasoning test",
    "3d spatial rotation recognition game",
    "visual spatial test",
    "spatial intelligence test",
  ],
  openGraph: {
    title: "Mental Rotation Test Online - Free 3D Spatial Rotation Test",
    description:
      "Take the mental rotation test online for free. Compare rotated 3D shapes and measure your spatial intelligence. Used by engineers and architects.",
    type: "website",
  },
  alternates: {
    canonical: "/rotation",
  },
};

export default function RotationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
      <Suspense>
        <RotationPlay />
      </Suspense>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-ink">What is a Mental Rotation Test?</h2>
        <p className="text-ink-2 leading-relaxed">
          A mental rotation test measures your ability to turn a shape in your mind&apos;s eye. In this version, you compare two flat block shapes and decide whether the second is the same shape rotated (by 90&deg;, 180&deg;, or 270&deg;) or a different shape entirely. Mental rotation is a core measure of spatial intelligence and visual-spatial reasoning, widely used in cognitive research and professional assessments for STEM careers.
        </p>

        <h2 className="text-2xl font-bold text-ink mt-8">What is Mental Rotation?</h2>
        <p className="text-ink-2 leading-relaxed">
          Mental rotation is the cognitive ability to imagine how a 2D or 3D object would look when rotated in space. A mental rotation test specifically measures how quickly and accurately you can perform this mental transformation. First studied by psychologists Roger Shepard and Jacqueline Metzler in 1971, mental rotation tests have become the gold standard for measuring spatial rotation ability. Research shows that response time increases linearly with the angle of rotation — meaning larger rotations take proportionally longer to process mentally, proving we actually &quot;rotate&quot; objects in our minds rather than matching patterns.
        </p>

        <h2 className="text-2xl font-bold text-ink mt-8">How Does the Spatial Rotation Test Work?</h2>
        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <ol className="space-y-3 text-ink-2">
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">1.</span>
              <span>Two flat block shapes appear on your screen in different orientations</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">2.</span>
              <span>Mentally rotate one of the shapes to match the orientation of the other</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">3.</span>
              <span>Decide if they are the SAME shape (rotated) or DIFFERENT shapes</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">4.</span>
              <span>Complete 15 rounds to get your spatial rotation score</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-ink shrink-0">5.</span>
              <span>The test measures both accuracy and response time</span>
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-ink mt-8">Why Spatial Rotation Matters: STEM Careers and Navigation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Predicts Success in STEM Fields</h3>
            <p className="text-sm text-ink-2">
              Spatial rotation ability is one of the strongest predictors of success in STEM careers. Research shows that performance on mental rotation tests correlates with achievement in engineering, architecture, mathematics, physics, and computer science. Many technical employers use spatial rotation tests during hiring to screen candidates. Professional engineers and architects typically score 80-90% on mental rotation assessments, significantly higher than the general population average of 60-70%.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Essential for Navigation and 3D Thinking</h3>
            <p className="text-sm text-ink-2">
              Spatial rotation skills are crucial for real-world navigation, reading maps, understanding architectural blueprints, and any task requiring 3D visualization. Pilots, surgeons, mechanics, and air traffic controllers all rely heavily on mental rotation abilities. Video game players, especially those who play first-person 3D games, develop stronger spatial rotation skills through practice. Studies show that regular practice with rotation tests can improve performance by 20-30%.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-ink mt-8">How to Improve Your Spatial Rotation Skills</h2>
        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <p className="text-ink-2 mb-4">
            Good news: spatial rotation and mental rotation abilities can be significantly improved with practice. Here are proven strategies:
          </p>
          <ul className="space-y-3 text-ink-2">
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Practice regularly:</strong> Take spatial rotation tests multiple times per week</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Play 3D video games:</strong> First-person shooters and puzzle games improve mental rotation skills</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Try physical puzzles:</strong> Rubik&apos;s cube, tangrams, and 3D jigsaw puzzles build spatial reasoning</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Learn origami or model building:</strong> Hands-on 3D manipulation strengthens mental rotation</span>
            </li>
            <li className="flex gap-3">
              <span className="text-ink shrink-0">•</span>
              <span><strong>Study architecture and mechanical drawings:</strong> Reading blueprints trains 3D visualization</span>
            </li>
          </ul>
          <p className="text-ink-2 mt-4">
            Research consistently shows improvements of 20-30% in mental rotation test scores after 10-15 hours of targeted practice. Unlike many cognitive abilities, spatial rotation is highly trainable!
          </p>
        </div>
      </section>

      <RelatedTests current="/rotation" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Mental Rotation Test Online",
            description: "Free mental rotation test online. Measure your spatial reasoning and visual-spatial intelligence with this 3D rotation test.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
