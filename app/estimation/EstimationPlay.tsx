"use client";

import TestShell from "../components/TestShell";
import EstimationTest from "../components/EstimationTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Estimation Test — full instructions in the guide below.
    </p>
  </div>
);

export default function EstimationPlay() {
  return (
    <TestShell id="estimation" title="Estimation Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <EstimationTest />
      </div>
    </TestShell>
  );
}
