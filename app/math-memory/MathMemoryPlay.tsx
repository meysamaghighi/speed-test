"use client";

import TestShell from "../components/TestShell";
import MathMemoryTest from "../components/MathMemoryTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Math Memory Test — full instructions in the guide below.
    </p>
  </div>
);

export default function MathMemoryPlay() {
  return (
    <TestShell id="math-memory" title="Math Memory Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <MathMemoryTest />
      </div>
    </TestShell>
  );
}
