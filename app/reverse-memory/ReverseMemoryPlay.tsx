"use client";

import TestShell from "../components/TestShell";
import ReverseMemory from "../components/ReverseMemory";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Digit Span Backward Test — full instructions in the guide below.
    </p>
  </div>
);

export default function ReverseMemoryPlay() {
  return (
    <TestShell id="reverse-memory" title="Digit Span Backward Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ReverseMemory />
      </div>
    </TestShell>
  );
}
