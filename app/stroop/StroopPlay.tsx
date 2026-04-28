"use client";

import TestShell from "../components/TestShell";
import ColorTest from "../components/ColorTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Stroop Color Test — full instructions in the guide below.
    </p>
  </div>
);

export default function StroopPlay() {
  return (
    <TestShell id="stroop" title="Stroop Color Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ColorTest />
      </div>
    </TestShell>
  );
}
