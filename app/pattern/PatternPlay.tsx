"use client";

import TestShell from "../components/TestShell";
import PatternTest from "../components/PatternTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Pattern Recognition Test — full instructions in the guide below.
    </p>
  </div>
);

export default function PatternPlay() {
  return (
    <TestShell id="pattern" title="Pattern Recognition Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <PatternTest />
      </div>
    </TestShell>
  );
}
