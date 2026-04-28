"use client";

import TestShell from "../components/TestShell";
import ClickSpeed from "../components/ClickSpeed";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Click Speed Test — full instructions in the guide below.
    </p>
  </div>
);

export default function ClickSpeedPlay() {
  return (
    <TestShell id="click-speed" title="Click Speed Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ClickSpeed />
      </div>
    </TestShell>
  );
}
