import type { Metadata } from "next";
import BrainAgeTest from "../components/BrainAgeTest";

export const metadata: Metadata = {
  title: "Brain Age Test - What's Your Cognitive Age? | BenchMyBrain",
  description:
    "A free 90-second brain age test. Three quick rounds — reaction time, memory, and mental speed — combine into a fun, shareable brain age number.",
  keywords: [
    "brain age test",
    "cognitive age test",
    "what is my brain age",
    "mental age test",
    "free brain test",
  ],
  openGraph: {
    title: "Brain Age Test - What's Your Cognitive Age? | BenchMyBrain",
    description:
      "A free 90-second brain age test. Three quick rounds — reaction time, memory, and mental speed — combine into a fun, shareable brain age number.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Age Test - What's Your Cognitive Age? | BenchMyBrain",
    description:
      "A free 90-second brain age test. Three quick rounds — reaction time, memory, and mental speed — combine into a fun, shareable brain age number.",
  },
  alternates: {
    canonical: "/brain-age",
  },
};

export default function BrainAgePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1
          className="font-display text-3xl text-ink"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Brain Age Test
        </h1>
      </div>

      <BrainAgeTest />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Brain Age Test",
            description:
              "Free online brain age test combining reaction time, memory, and speed into a fun composite score.",
            applicationCategory: "GameApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}
