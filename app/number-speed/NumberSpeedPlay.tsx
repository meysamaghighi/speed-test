"use client";

import TestShell from "../components/TestShell";
import NumberSpeedTest from "../components/NumberSpeedTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Number Speed Test — full instructions in the guide below.
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
