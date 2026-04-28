"use client";

import TestShell from "../components/TestShell";
import ReactionTest from "../components/ReactionTest";
import { useProgress } from "../hooks/useProgress";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Wait for the screen to turn green, then click as fast as you can. 5
      rounds, we take your average. Don&apos;t click too early — that&apos;s a
      false start.
    </p>
    <p className="mb-1 font-semibold text-ink">Tips</p>
    <ul className="list-disc list-inside space-y-1">
      <li>Average human reaction is about 250ms</li>
      <li>Pro gamers average 150-200ms</li>
      <li>Try when alert — afternoon usually beats morning</li>
    </ul>
  </div>
);

export default function ReactionPlay() {
  const { recordPlay } = useProgress();

  const handleComplete = (avgMs: number) => {
    recordPlay("reaction", avgMs, "lower");
  };

  return (
    <TestShell
      id="reaction"
      title="Reaction Time"
      howTo={HOW_TO}
      // ReactionTest owns its own waiting / ready / go / result flow and
      // renders its own final result screen. Shell stays at "idle" and
      // contributes only the new chrome (back link, how-to, fullscreen).
      status="idle"
    >
      <div className="px-4 py-6 max-w-2xl mx-auto bg-gray-950 text-white">
        <ReactionTest onComplete={handleComplete} />
      </div>
    </TestShell>
  );
}
