"use client";

import TestShell from "../components/TestShell";
import TrailMaking from "../components/TrailMaking";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Trail Making Test — full instructions in the guide below.
    </p>
  </div>
);

export default function TrailMakingPlay() {
  return (
    <TestShell id="trail-making" title="Trail Making Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <TrailMaking />
      </div>
    </TestShell>
  );
}
