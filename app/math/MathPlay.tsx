"use client";

import TestShell from "../components/TestShell";
import MathSpeed from "../components/MathSpeed";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Math Speed Test — full instructions in the guide below.
    </p>
  </div>
);

export default function MathPlay() {
  return (
    <TestShell id="math" title="Math Speed Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <MathSpeed />
      </div>
    </TestShell>
  );
}
