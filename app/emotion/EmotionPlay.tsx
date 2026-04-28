"use client";

import TestShell from "../components/TestShell";
import EmotionTest from "../components/EmotionTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Emotion Recognition Test — full instructions in the guide below.
    </p>
  </div>
);

export default function EmotionPlay() {
  return (
    <TestShell id="emotion" title="Emotion Recognition Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <EmotionTest />
      </div>
    </TestShell>
  );
}
