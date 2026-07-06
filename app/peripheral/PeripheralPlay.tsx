"use client";

import TestShell from "../components/TestShell";
import PeripheralVision from "../components/PeripheralVision";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Stare at the center dot. Targets flash in your side vision — click them
      without moving your eyes. 15 rounds, scored by average detection time.
    </p>
  </div>
);

export default function PeripheralPlay() {
  return (
    <TestShell id="peripheral" title="Peripheral Reaction Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <PeripheralVision />
      </div>
    </TestShell>
  );
}
