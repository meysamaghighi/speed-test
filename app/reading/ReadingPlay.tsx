"use client";

import TestShell from "../components/TestShell";
import ReadingSpeed from "../components/ReadingSpeed";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Reading Speed Test — full instructions in the guide below.
    </p>
  </div>
);

export default function ReadingPlay() {
  return (
    <TestShell id="reading" title="Reading Speed Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ReadingSpeed />
      </div>
    </TestShell>
  );
}
