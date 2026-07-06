import type { Metadata } from "next";
import EmotionPlay from "./EmotionPlay";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Emotion Recognition Test - Can You Read Faces? | BenchMyBrain",
  description:
    "Test your emotion recognition skills. Identify emoji emotions (happy, sad, angry, surprised, disgusted, fearful, neutral) as fast and accurately as possible.",
  keywords: [
    "emotion recognition test",
    "facial expression test",
    "emotional intelligence test",
    "emotion reading",
    "face emotion test",
    "EQ test",
  ],
  openGraph: {
    title: "Emotion Recognition Test - Can You Read Faces? | BenchMyBrain",
    description:
      "Test your emotion recognition skills. Identify emoji emotions (happy, sad, angry, surprised, disgusted, fearful, neutral) as fast and accurately as possible.",
    type: "website",
  },
  alternates: {
    canonical: "/emotion",
  },
};

export default function EmotionPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
      </div>
        <EmotionPlay />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-ink">How It Works</h2>
        <div className="bg-paper-2 rounded-xl p-5 border border-line">
          <p className="text-sm text-ink-2 mb-3">
            An emoji face appears showing one of seven emotions: happy, sad, angry,
            surprised, disgusted, fearful, or neutral. Click the correct emotion as
            fast as you can.
          </p>
          <p className="text-sm text-ink-2">
            20 rounds total. Your score is based on accuracy and speed. Fast correct
            answers score higher. Reactions over 1 second incur a time penalty.
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-ink">About Emotion Recognition</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Universal Emotions</h3>
            <p className="text-sm text-ink-2">
              Psychologist Paul Ekman identified 6 universal emotions recognized across
              cultures: happiness, sadness, anger, surprise, disgust, and fear. We added
              neutral as a 7th category.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Emotional Intelligence</h3>
            <p className="text-sm text-ink-2">
              Emotion recognition is a key component of emotional intelligence (EQ).
              People with high EQ can quickly and accurately read facial expressions,
              improving social interactions.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Brain Mechanisms</h3>
            <p className="text-sm text-ink-2">
              The amygdala processes emotional facial expressions, especially fear and
              anger. The fusiform face area recognizes faces. Damage to these regions
              impairs emotion recognition.
            </p>
          </div>
          <div className="bg-paper-2 rounded-xl p-5 border border-line">
            <h3 className="font-bold text-ink mb-2">Practice Improves Accuracy</h3>
            <p className="text-sm text-ink-2">
              Emotion recognition can be trained. Therapists, poker players, and law
              enforcement often develop superior emotion reading skills through practice
              and feedback.
            </p>
          </div>
        </div>
      </section>

      <RelatedTests current="/emotion" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Emotion Recognition Test",
            description:
              "Free online emotion recognition test. Identify emotions from emoji faces. Tests emotional intelligence and face reading skills.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

    </main>
  );
}
