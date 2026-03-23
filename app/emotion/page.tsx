import type { Metadata } from "next";
import EmotionTest from "../components/EmotionTest";
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
};

export default function EmotionPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          Emotion Recognition Test
        </h1>
        <p className="text-gray-400">
          Emoji faces appear. Identify the emotion as quickly and accurately as possible.
        </p>
      </div>

      <EmotionTest />

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-white">How It Works</h2>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-sm text-gray-400 mb-3">
            An emoji face appears showing one of seven emotions: happy, sad, angry,
            surprised, disgusted, fearful, or neutral. Click the correct emotion as
            fast as you can.
          </p>
          <p className="text-sm text-gray-400">
            20 rounds total. Your score is based on accuracy and speed. Fast correct
            answers score higher. Reactions over 1 second incur a time penalty.
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-white">About Emotion Recognition</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Universal Emotions</h3>
            <p className="text-sm text-gray-400">
              Psychologist Paul Ekman identified 6 universal emotions recognized across
              cultures: happiness, sadness, anger, surprise, disgust, and fear. We added
              neutral as a 7th category.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Emotional Intelligence</h3>
            <p className="text-sm text-gray-400">
              Emotion recognition is a key component of emotional intelligence (EQ).
              People with high EQ can quickly and accurately read facial expressions,
              improving social interactions.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Brain Mechanisms</h3>
            <p className="text-sm text-gray-400">
              The amygdala processes emotional facial expressions, especially fear and
              anger. The fusiform face area recognizes faces. Damage to these regions
              impairs emotion recognition.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="font-bold text-white mb-2">Practice Improves Accuracy</h3>
            <p className="text-sm text-gray-400">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What emotions are tested?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The test covers 7 emotions: happy, sad, angry, surprised, disgusted, fearful, and neutral. These are based on Ekman's universal emotions, recognized across all cultures.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good emotion recognition score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "95+ is elite (near-perfect recognition), 85+ is excellent, 70+ is good, 50+ is average. Speed matters too - faster recognition with high accuracy scores higher.",
                },
              },
              {
                "@type": "Question",
                name: "Can emotion recognition be improved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Practice, feedback, and attention to facial cues improve emotion recognition. Studies show training can increase accuracy, especially for subtle or mixed emotions.",
                },
              },
              {
                "@type": "Question",
                name: "Why is emotion recognition important?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Emotion recognition is crucial for social interaction, empathy, and communication. It's a key component of emotional intelligence (EQ) and predicts relationship quality and workplace success.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
