"use client";

import TestShell from "../components/TestShell";
import WordSpeedTest from "../components/WordSpeedTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Word Speed Test — full instructions in the guide below.
    </p>
  </div>
);

export default function WordSpeedPlay() {
  return (
    <TestShell id="word-speed" title="Word Speed Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <WordSpeedTest />
      </div>
    </TestShell>
  );
}
