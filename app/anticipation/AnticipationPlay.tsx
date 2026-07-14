"use client";

import TestShell from "../components/TestShell";
import AnticipationTest from "../components/AnticipationTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Anticipation Timing Test — full instructions in the guide below.
    </p>
  </div>
);

export default function AnticipationPlay() {
  return (
    <TestShell id="anticipation" title="Anticipation Timing" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <AnticipationTest />
      </div>
    </TestShell>
  );
}
