"use client";

import TestShell from "../components/TestShell";
import RapidEstimationTest from "../components/RapidEstimationTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      15 rapid rounds of three challenge types: estimate dot counts, pick the
      right product, and compare quantities. Correct answers score — answering
      fast earns bonus points.
    </p>
  </div>
);

export default function PatternSpeedPlay() {
  return (
    <TestShell id="pattern-speed" title="Mental Math Sprint" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <RapidEstimationTest />
      </div>
    </TestShell>
  );
}
