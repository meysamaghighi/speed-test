"use client";

import TestShell from "../components/TestShell";
import VisualSearchTest from "../components/VisualSearchTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Visual Search Test — full instructions in the guide below.
    </p>
  </div>
);

export default function VisualSearchPlay() {
  return (
    <TestShell id="visual-search" title="Visual Search Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <VisualSearchTest />
      </div>
    </TestShell>
  );
}
