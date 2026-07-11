"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "../lib/report";

// Free Full Cognitive Report CTA — shown on Brain Score once a few tests are done.
export default function ReportUpsell({ completedCount }: { completedCount: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = completedCount >= 3;
    setVisible(show);
    if (show) track("report_cta_view", { source: "brain_score" });
  }, [completedCount]);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 border border-emerald-500/40 rounded-2xl p-6 text-center">
      <h3 className="text-lg font-black text-ink mb-1">Your Full Cognitive Report</h3>
      <p className="text-sm text-ink-2 mb-4">
        Faculty radar chart, a breakdown of all your results, strengths and a personal training
        plan — built from your scores. Free.
      </p>
      <Link
        href="/report"
        onClick={() => track("report_cta_click", { source: "brain_score" })}
        className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl px-6 py-3 transition-colors"
      >
        View your report →
      </Link>
    </div>
  );
}
