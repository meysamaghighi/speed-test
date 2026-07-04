import type { Metadata } from "next";
import { Suspense } from "react";
import CognitiveReport from "../components/CognitiveReport";

export const metadata: Metadata = {
  title: "Full Cognitive Report | BenchMyBrain",
  description:
    "Your personal cognitive report: faculty radar, per-test breakdown, strengths and training recommendations.",
  robots: { index: false, follow: false },
};

export default function ReportPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
      <Suspense fallback={null}>
        <CognitiveReport />
      </Suspense>
    </main>
  );
}
