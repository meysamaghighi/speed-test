"use client";

import TestShell from "../components/TestShell";
import FaceMemoryTest from "../components/FaceMemoryTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Face Memory Test — full instructions in the guide below.
    </p>
  </div>
);

export default function FaceMemoryPlay() {
  return (
    <TestShell id="face-memory" title="Face Memory Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <FaceMemoryTest />
      </div>
    </TestShell>
  );
}
