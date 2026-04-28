"use client";

import TestShell from "../components/TestShell";
import NumberComparisonTest from "../components/NumberComparisonTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Number Comparison Test — full instructions in the guide below.
    </p>
  </div>
);

export default function NumberComparisonPlay() {
  return (
    <TestShell id="number-comparison" title="Number Comparison Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <NumberComparisonTest />
      </div>
    </TestShell>
  );
}
