"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PAYMENT_LINK, isUnlocked, track } from "../lib/report";

// One dismissible card. Hidden entirely until NEXT_PUBLIC_STRIPE_PAYMENT_LINK is configured.
export default function ReportUpsell({ completedCount }: { completedCount: number }) {
  const [visible, setVisible] = useState(false);
  const [unlocked, setUnlockedState] = useState(false);

  useEffect(() => {
    const dismissed = (() => {
      try {
        return localStorage.getItem("bmb_report_upsell_dismissed") === "1";
      } catch {
        return false;
      }
    })();
    const u = isUnlocked();
    setUnlockedState(u);
    const show = completedCount >= 3 && (u || (!!PAYMENT_LINK && !dismissed));
    setVisible(show);
    if (show && !u) track("report_upsell_view", { source: "brain_score" });
  }, [completedCount]);

  if (!visible) return null;

  if (unlocked) {
    return (
      <div className="bg-paper-2 border border-line rounded-xl p-4 text-center">
        <Link href="/report" className="text-emerald-400 font-bold underline">
          View your Full Cognitive Report →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 border border-emerald-500/40 rounded-2xl p-6 text-center relative">
      <button
        aria-label="Dismiss"
        onClick={() => {
          try {
            localStorage.setItem("bmb_report_upsell_dismissed", "1");
          } catch {}
          setVisible(false);
        }}
        className="absolute top-2 right-3 text-ink-3 hover:text-ink"
      >
        ×
      </button>
      <h3 className="text-lg font-black text-ink mb-1">Get your Full Cognitive Report</h3>
      <p className="text-sm text-ink-2 mb-4">
        Faculty radar chart, percentile breakdown of all your results, strengths and a personal
        training plan. One-time purchase, yours forever.
      </p>
      <a
        href={PAYMENT_LINK}
        onClick={() => track("report_upsell_click", { source: "brain_score" })}
        className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl px-6 py-3 transition-colors"
      >
        Unlock report — $4.99
      </a>
    </div>
  );
}
