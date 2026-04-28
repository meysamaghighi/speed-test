"use client";

import TestShell from "../components/TestShell";
import VerbalMemory from "../components/VerbalMemory";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Verbal Memory — full instructions in the guide below.
    </p>
  </div>
);

export default function VerbalPlay() {
  return (
    <TestShell id="verbal" title="Verbal Memory" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <VerbalMemory />
      </div>
    </TestShell>
  );
}
