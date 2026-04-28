"use client";

import TestShell from "../components/TestShell";
import GoNoGo from "../components/GoNoGo";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Go/No-Go Test — full instructions in the guide below.
    </p>
  </div>
);

export default function GoNoGoPlay() {
  return (
    <TestShell id="go-no-go" title="Go/No-Go Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <GoNoGo />
      </div>
    </TestShell>
  );
}
