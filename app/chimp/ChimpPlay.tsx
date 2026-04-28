"use client";

import TestShell from "../components/TestShell";
import ChimpTest from "../components/ChimpTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Chimp Memory Test — full instructions in the guide below.
    </p>
  </div>
);

export default function ChimpPlay() {
  return (
    <TestShell id="chimp" title="Chimp Memory Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ChimpTest />
      </div>
    </TestShell>
  );
}
