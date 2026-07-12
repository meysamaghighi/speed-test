"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { TESTS } from "../lib/brainTests";
import {
  FACULTY_ORDER,
  FACULTY_LABEL,
  FACULTY_BLURB,
  FACULTY_OF,
  PAYMENT_LINK,
  track,
  type Faculty,
} from "../lib/report";

interface FacultyScore {
  faculty: Faculty;
  score: number | null; // null = no tests completed in this faculty
  completed: number;
  total: number;
}

function ratingFor(score: number) {
  if (score >= 90) return { label: "Elite", color: "text-emerald-400" };
  if (score >= 75) return { label: "Strong", color: "text-green-400" };
  if (score >= 60) return { label: "Above average", color: "text-blue-400" };
  if (score >= 45) return { label: "Average", color: "text-yellow-400" };
  if (score >= 30) return { label: "Developing", color: "text-orange-400" };
  return { label: "Train this", color: "text-red-400" };
}

function RadarChart({ scores }: { scores: FacultyScore[] }) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const rMax = 110;
  const n = scores.length;

  const point = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  const polygon = (r: (i: number) => number) =>
    scores.map((_, i) => point(i, r(i)).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm mx-auto">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={polygon(() => rMax * f)}
          fill="none"
          stroke="currentColor"
          className="text-line"
          strokeWidth="1"
        />
      ))}
      {scores.map((_, i) => {
        const [x, y] = point(i, rMax);
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" className="text-line" strokeWidth="1" />
        );
      })}
      <polygon
        points={polygon((i) => rMax * ((scores[i].score ?? 0) / 100))}
        fill="rgb(16 185 129 / 0.25)"
        stroke="rgb(16 185 129)"
        strokeWidth="2"
      />
      {scores.map((s, i) => {
        const [x, y] = point(i, rMax + 22);
        return (
          <text
            key={s.faculty}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink-2"
            fontSize="12"
            fontWeight="700"
          >
            {FACULTY_LABEL[s.faculty]}
            {s.score !== null ? ` ${s.score}` : ""}
          </text>
        );
      })}
    </svg>
  );
}

export default function CognitiveReport() {
  const [ready, setReady] = useState(false);
  const [scores, setScores] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const map = new Map<string, number>();
    for (const t of TESTS) {
      try {
        const v = localStorage.getItem(t.key);
        if (v !== null) map.set(t.key, parseFloat(v));
      } catch {}
    }
    setScores(map);
    setReady(true);
  }, []);

  const testScores = useMemo(
    () =>
      TESTS.filter((t) => scores.has(t.key)).map((t) => ({
        ...t,
        raw: scores.get(t.key)!,
        normalized: Math.round(t.toScore(scores.get(t.key)!)),
      })),
    [scores]
  );

  const facultyScores: FacultyScore[] = useMemo(
    () =>
      FACULTY_ORDER.map((faculty) => {
        const inFaculty = TESTS.filter((t) => FACULTY_OF[t.href] === faculty);
        const done = testScores.filter((t) => FACULTY_OF[t.href] === faculty);
        return {
          faculty,
          score: done.length
            ? Math.round(done.reduce((s, t) => s + t.normalized, 0) / done.length)
            : null,
          completed: done.length,
          total: inFaculty.length,
        };
      }),
    [testScores]
  );

  if (!ready) return null;

  // No tests completed yet on this device — nothing to report from.
  if (testScores.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-ink">Full Cognitive Report</h1>
          <p className="text-ink-2 max-w-md mx-auto">
            A detailed breakdown of your cognitive profile: faculty radar chart, per-test analysis,
            strengths, and a personalized training plan — built from your own results, free.
          </p>
        </div>
        <div className="bg-paper-2 border border-line rounded-xl p-5 text-sm text-ink-2 max-w-md mx-auto text-center">
          The report is generated from your own scores, and you haven&apos;t taken any tests on
          this device yet. Try a few first —{" "}
          <Link href="/reaction" className="underline font-bold text-ink">
            Reaction Time
          </Link>{" "}
          is a good place to start.
        </div>
        <p className="text-center">
          <Link href="/brain-score" className="text-ink-3 underline text-sm">
            Back to Brain Score
          </Link>
        </p>
      </div>
    );
  }

  const sorted = [...testScores].sort((a, b) => b.normalized - a.normalized);
  const strengths = sorted.slice(0, 3);
  const weaknesses = sorted.slice(-3).reverse();
  const overall = Math.round(
    testScores.reduce((s, t) => s + t.normalized, 0) / testScores.length
  );

  return (
    <div className="space-y-10 print:text-black">
      <div className="text-center">
        <h1 className="text-4xl font-black text-ink mb-2">Your Cognitive Report</h1>
        <p className="text-ink-3 text-sm">
          Generated {new Date().toLocaleDateString()} · {testScores.length}/{TESTS.length} tests
          completed · benchmybrain.com
        </p>
      </div>

      {testScores.length < 10 && (
        <div className="bg-paper-2 border border-line rounded-xl p-4 text-sm text-ink-2 text-center">
          You&apos;ve completed {testScores.length} of {TESTS.length} tests — your report grows more
          accurate with each test, and updates automatically as you play.
        </div>
      )}

      <section className="bg-paper-2 rounded-2xl p-6 border border-line">
        <h2 className="text-xl font-bold text-ink mb-4 text-center">
          Cognitive profile — overall {overall}/100
        </h2>
        <RadarChart scores={facultyScores} />
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          {facultyScores.map((f) => (
            <div key={f.faculty} className="flex items-start justify-between gap-3 bg-paper rounded-lg p-3 border border-line">
              <div>
                <p className="font-bold text-ink text-sm">{FACULTY_LABEL[f.faculty]}</p>
                <p className="text-xs text-ink-3">{FACULTY_BLURB[f.faculty]}</p>
                <p className="text-xs text-ink-3 mt-1">
                  {f.completed}/{f.total} tests
                </p>
              </div>
              <p className={`text-2xl font-black ${f.score !== null ? ratingFor(f.score).color : "text-ink-3"}`}>
                {f.score ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-paper-2 rounded-2xl p-6 border border-line">
          <h2 className="text-lg font-bold text-emerald-400 mb-3">Top strengths</h2>
          {strengths.map((t) => (
            <p key={t.key} className="text-sm text-ink-2 mb-2">
              <span className="font-bold text-ink">{t.label}</span> — {t.normalized}/100 ({t.raw}{" "}
              {t.unit})
            </p>
          ))}
        </div>
        <div className="bg-paper-2 rounded-2xl p-6 border border-line">
          <h2 className="text-lg font-bold text-orange-400 mb-3">Best training targets</h2>
          {weaknesses.map((t) => (
            <p key={t.key} className="text-sm text-ink-2 mb-2">
              <Link href={t.href} className="font-bold text-ink underline">
                {t.label}
              </Link>{" "}
              — {t.normalized}/100. Retrain this for the biggest overall gain.
            </p>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 rounded-2xl p-6 border border-line">
        <h2 className="text-lg font-bold text-ink mb-4">Every test, scored</h2>
        <div className="space-y-2">
          {sorted.map((t) => {
            const r = ratingFor(t.normalized);
            return (
              <div key={t.key} className="flex items-center gap-3">
                <span className="text-sm text-ink-2 w-40 truncate">{t.label}</span>
                <div className="flex-1 bg-paper rounded-full h-2 overflow-hidden border border-line">
                  <div className="h-full bg-emerald-500" style={{ width: `${t.normalized}%` }} />
                </div>
                <span className="text-sm font-bold text-ink w-10 text-right">{t.normalized}</span>
                <span className={`text-xs w-24 ${r.color}`}>{r.label}</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-ink-3 mt-4">
          Scores are normalized 0–100 against typical human performance ranges for each test, then
          averaged per faculty. They are relative benchmarks for training, not clinical measures.
        </p>
      </section>

      <div className="text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-paper-2 border border-line hover:border-ink-3 text-ink font-bold rounded-xl px-6 py-3 transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>

      {PAYMENT_LINK && (
        <div className="text-center print:hidden bg-paper-2 border border-line rounded-2xl p-6">
          <p className="font-bold text-ink mb-1">This report is free.</p>
          <p className="text-sm text-ink-2 mb-4 max-w-md mx-auto">
            BenchMyBrain has no ads or accounts. If it was useful and you&apos;d like to support it,
            you can chip in — completely optional.
          </p>
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("report_donate_click", { source: "report_page" })}
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl px-6 py-3 transition-colors"
          >
            Support BenchMyBrain ☕
          </a>
        </div>
      )}

      <p className="text-center print:hidden">
        <Link href="/brain-score" className="text-ink-3 underline text-sm">
          Back to Brain Score
        </Link>
      </p>
    </div>
  );
}
