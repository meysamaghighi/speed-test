"use client";

import TestShell from "../components/TestShell";
import PeripheralVision from "../components/PeripheralVision";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Peripheral Vision Test — full instructions in the guide below.
    </p>
  </div>
);

export default function PeripheralPlay() {
  return (
    <TestShell id="peripheral" title="Peripheral Vision Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <PeripheralVision />
      </div>
    </TestShell>
  );
}
