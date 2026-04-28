"use client";

import TestShell from "../components/TestShell";
import RhythmTest from "../components/RhythmTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Rhythm Timing Test — full instructions in the guide below.
    </p>
  </div>
);

export default function RhythmPlay() {
  return (
    <TestShell id="rhythm" title="Rhythm Timing Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <RhythmTest />
      </div>
    </TestShell>
  );
}
