"use client";

import TestShell from "../components/TestShell";
import HandEye from "../components/HandEye";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Hand-Eye Coordination — full instructions in the guide below.
    </p>
  </div>
);

export default function HandEyePlay() {
  return (
    <TestShell id="hand-eye" title="Hand-Eye Coordination" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <HandEye />
      </div>
    </TestShell>
  );
}
