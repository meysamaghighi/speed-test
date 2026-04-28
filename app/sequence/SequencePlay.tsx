"use client";

import TestShell from "../components/TestShell";
import SequenceMemory from "../components/SequenceMemory";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Sequence Memory — full instructions in the guide below.
    </p>
  </div>
);

export default function SequencePlay() {
  return (
    <TestShell id="sequence" title="Sequence Memory" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <SequenceMemory />
      </div>
    </TestShell>
  );
}
