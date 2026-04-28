"use client";

import TestShell from "../components/TestShell";
import DigitSpanTest from "../components/DigitSpanTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Digit Span Test — full instructions in the guide below.
    </p>
  </div>
);

export default function DigitSpanPlay() {
  return (
    <TestShell id="digit-span" title="Digit Span Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <DigitSpanTest />
      </div>
    </TestShell>
  );
}
