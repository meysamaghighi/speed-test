"use client";

import TestShell from "../components/TestShell";
import NumberMemory from "../components/NumberMemory";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Number Memory Test — full instructions in the guide below.
    </p>
  </div>
);

export default function MemoryPlay() {
  return (
    <TestShell id="memory" title="Number Memory Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <NumberMemory />
      </div>
    </TestShell>
  );
}
