"use client";

import TestShell from "../components/TestShell";
import ColorBlindTest from "../components/ColorBlindTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Color Blind Test — full instructions in the guide below.
    </p>
  </div>
);

export default function ColorBlindPlay() {
  return (
    <TestShell id="color-blind" title="Color Blind Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ColorBlindTest />
      </div>
    </TestShell>
  );
}
