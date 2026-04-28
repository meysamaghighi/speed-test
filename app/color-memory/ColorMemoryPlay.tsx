"use client";

import TestShell from "../components/TestShell";
import ColorMemoryTest from "../components/ColorMemoryTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Color Memory Test — full instructions in the guide below.
    </p>
  </div>
);

export default function ColorMemoryPlay() {
  return (
    <TestShell id="color-memory" title="Color Memory Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ColorMemoryTest />
      </div>
    </TestShell>
  );
}
