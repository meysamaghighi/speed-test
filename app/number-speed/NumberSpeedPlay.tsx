"use client";

import TestShell from "../components/TestShell";
import NumberSpeedTest from "../components/NumberSpeedTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      A number sequence flashes briefly — type it back before the timer runs out.
      Each correct answer adds a digit and raises the pressure.
    </p>
  </div>
);

export default function NumberSpeedPlay() {
  return (
    <TestShell id="number-speed" title="Number Speed Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <NumberSpeedTest />
      </div>
    </TestShell>
  );
}
