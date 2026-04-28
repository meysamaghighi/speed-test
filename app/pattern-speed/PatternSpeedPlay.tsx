"use client";

import TestShell from "../components/TestShell";
import RapidEstimationTest from "../components/RapidEstimationTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Rapid Estimation Test — full instructions in the guide below.
    </p>
  </div>
);

export default function PatternSpeedPlay() {
  return (
    <TestShell id="pattern-speed" title="Rapid Estimation Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <RapidEstimationTest />
      </div>
    </TestShell>
  );
}
