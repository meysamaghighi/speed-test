"use client";

import TestShell from "../components/TestShell";
import TypingTest from "../components/TypingTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Typing Speed Test — full instructions in the guide below.
    </p>
  </div>
);

export default function TypingPlay() {
  return (
    <TestShell id="typing" title="Typing Speed Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <TypingTest />
      </div>
    </TestShell>
  );
}
