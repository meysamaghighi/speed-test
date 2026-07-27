import type { Metadata } from "next";
import BrainAgeTest from "../components/BrainAgeTest";
import RelatedTests from "../components/RelatedTests";

export const metadata: Metadata = {
  title: "Quick Brain Test — 90-Second Brain Age Test | BenchMyBrain",
  description:
    "The quick brain test: 90 seconds, 3 rounds — reaction time, memory, and mental speed — no sign-up, no prior scores needed. Get your Brain Age instantly.",
  keywords: [
    "quick brain test",
    "brain age test",
    "90 second brain test",
    "cognitive age test",
    "what is my brain age",
    "free brain test",
  ],
  openGraph: {
    title: "Quick Brain Test — 90-Second Brain Age Test | BenchMyBrain",
    description:
      "The quick brain test: 90 seconds, 3 rounds — reaction time, memory, and mental speed — no sign-up, no prior scores needed. Get your Brain Age instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Brain Test — 90-Second Brain Age Test | BenchMyBrain",
    description:
      "The quick brain test: 90 seconds, 3 rounds — reaction time, memory, and mental speed — no sign-up, no prior scores needed. Get your Brain Age instantly.",
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

      <RelatedTests current="/brain-age" />

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
            timeRequired: "PT90S",
            isAccessibleForFree: true,
            educationalUse: "Self-assessment",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}
