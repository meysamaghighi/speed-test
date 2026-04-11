import type { Metadata } from "next";
import DailyChallenge from "./DailyChallenge";

export const metadata: Metadata = {
  title: "Daily Brain Challenge | BenchMyBrain",
  description:
    "5 brain tests per day. Same tests for everyone, seeded by date. Build your streak and share your results. Wordle for your brain.",
  keywords: [
    "daily brain challenge",
    "daily brain test",
    "brain test streak",
    "daily cognitive test",
    "benchmybrain daily",
    "brain games daily",
    "online brain challenge",
  ],
  openGraph: {
    title: "Daily Brain Challenge | BenchMyBrain",
    description:
      "5 tests per day. Same for everyone. Build a streak. Share your results.",
    type: "website",
  },
  alternates: {
    canonical: "/daily",
  },
};

export default function DailyPage() {
  return <DailyChallenge />;
}
