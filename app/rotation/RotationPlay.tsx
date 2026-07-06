"use client";

import TestShell from "../components/TestShell";
import SpatialRotation from "../components/SpatialRotation";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Two flat block shapes appear side by side. Decide if they are the SAME shape (one is just
      rotated) or DIFFERENT shapes. 15 rounds — the test measures accuracy and speed.
    </p>
  </div>
);

export default function RotationPlay() {
  return (
    <TestShell id="rotation" title="Mental Rotation Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <SpatialRotation />
      </div>
    </TestShell>
  );
}
