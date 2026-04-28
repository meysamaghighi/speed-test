"use client";

import TestShell from "../components/TestShell";
import WordAssociationTest from "../components/WordAssociationTest";

const HOW_TO = (
  <div>
    <p className="mb-3">
      Word Fluency Test — full instructions in the guide below.
    </p>
  </div>
);

export default function WordAssociationPlay() {
  return (
    <TestShell id="word-association" title="Word Fluency Test" howTo={HOW_TO} status="idle">
      <div className="px-4 py-6">
        <WordAssociationTest />
      </div>
    </TestShell>
  );
}
