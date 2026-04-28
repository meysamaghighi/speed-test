"use client";

import TestShell from "../components/TestShell";
import FocusTimerTest from "../components/FocusTimerTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Focus Timer Test — full instructions in the guide below.
    </p>
  </div>
);

export default function FocusTimerPlay() {
  return (
    <TestShell id="focus-timer" title="Focus Timer Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <FocusTimerTest />
      </div>
    </TestShell>
  );
}
