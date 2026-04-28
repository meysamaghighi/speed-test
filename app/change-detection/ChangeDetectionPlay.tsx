"use client";

import TestShell from "../components/TestShell";
import ChangeDetectionTest from "../components/ChangeDetectionTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Change Detection Test — full instructions in the guide below.
    </p>
  </div>
);

export default function ChangeDetectionPlay() {
  return (
    <TestShell id="change-detection" title="Change Detection Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ChangeDetectionTest />
      </div>
    </TestShell>
  );
}
