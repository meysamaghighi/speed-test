"use client";

import TestShell from "../components/TestShell";
import SpatialRotation from "../components/SpatialRotation";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Mental Rotation Test Online — full instructions in the guide below.
    </p>
  </div>
);

export default function RotationPlay() {
  return (
    <TestShell id="rotation" title="Mental Rotation Test Online" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <SpatialRotation />
      </div>
    </TestShell>
  );
}
