"use client";

import TestShell from "../components/TestShell";
import EstimationTest from "../components/EstimationTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Dots flash for one second — estimate how many you saw. 10 rounds, from 5 up
      to 85 dots, scored by average accuracy.
    </p>
  </div>
);

export default function EstimationPlay() {
  return (
    <TestShell id="estimation" title="Dot Estimation Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <EstimationTest />
      </div>
    </TestShell>
  );
}
