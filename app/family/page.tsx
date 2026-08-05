import type { Metadata } from "next";
import FamilyOverview from "../components/FamilyOverview";

export const metadata: Metadata = {
  title: "Family Scoreboard - Compare Brain Test Scores | BenchMyBrain",
  description:
    "Add family members or friends on this device and see who's on top across every BenchMyBrain test. Local only — nothing is shared online.",
  openGraph: {
    title: "Family Scoreboard - Compare Brain Test Scores | BenchMyBrain",
    description:
      "Add family members or friends on this device and see who's on top across every BenchMyBrain test. Local only — nothing is shared online.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Family Scoreboard - Compare Brain Test Scores | BenchMyBrain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Scoreboard - Compare Brain Test Scores | BenchMyBrain",
    description:
      "Add family members or friends on this device and see who's on top across every BenchMyBrain test.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: "/family",
  },
};

export default function FamilyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1
          className="font-display text-4xl md:text-5xl text-ink mb-3"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Family Scoreboard
        </h1>
        <p className="text-ink-2">
          Add everyone who plays on this device and see who's on top. Scores stay
          on this device — nothing is sent anywhere.
        </p>
      </div>

      <FamilyOverview />
    </main>
  );
}
