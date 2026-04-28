"use client";

import TestShell from "../components/TestShell";
import AudioMemory from "../components/AudioMemory";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Audio Memory Test — full instructions in the guide below.
    </p>
  </div>
);

export default function AudioMemoryPlay() {
  return (
    <TestShell id="audio-memory" title="Audio Memory Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <AudioMemory />
      </div>
    </TestShell>
  );
}
