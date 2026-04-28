"use client";

import TestShell from "../components/TestShell";
import NBack from "../components/NBack";

const HOW_TO = (
  <div>
    <p className="mb-3">
      N-Back Test — full instructions in the guide below.
    </p>
  </div>
);

export default function NBackPlay() {
  return (
    <TestShell id="n-back" title="N-Back Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <NBack />
      </div>
    </TestShell>
  );
}
