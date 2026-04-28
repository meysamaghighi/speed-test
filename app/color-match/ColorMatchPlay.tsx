"use client";

import TestShell from "../components/TestShell";
import ColorMatchTest from "../components/ColorMatchTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Odd Color Out — full instructions in the guide below.
    </p>
  </div>
);

export default function ColorMatchPlay() {
  return (
    <TestShell id="color-match" title="Odd Color Out" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <ColorMatchTest />
      </div>
    </TestShell>
  );
}
