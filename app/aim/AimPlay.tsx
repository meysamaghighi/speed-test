"use client";

import TestShell from "../components/TestShell";
import AimTrainer from "../components/AimTrainer";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Aim Trainer — full instructions in the guide below.
    </p>
  </div>
);

export default function AimPlay() {
  return (
    <TestShell id="aim" title="Aim Trainer" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <AimTrainer />
      </div>
    </TestShell>
  );
}
