"use client";

import TestShell from "../components/TestShell";
import DualTaskTest from "../components/DualTaskTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Dual Task Test — full instructions in the guide below.
    </p>
  </div>
);

export default function DualTaskPlay() {
  return (
    <TestShell id="dual-task" title="Dual Task Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <DualTaskTest />
      </div>
    </TestShell>
  );
}
