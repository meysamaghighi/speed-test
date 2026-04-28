"use client";

import TestShell from "../components/TestShell";
import VisualMemory from "../components/VisualMemory";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Visual Memory Test — full instructions in the guide below.
    </p>
  </div>
);

export default function VisualMemoryPlay() {
  return (
    <TestShell id="visual-memory" title="Visual Memory Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <VisualMemory />
      </div>
    </TestShell>
  );
}
