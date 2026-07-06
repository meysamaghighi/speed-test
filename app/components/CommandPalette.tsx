"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Item = { label: string; href: string; group: string };

const ITEMS: Item[] = [
  { label: "Home", href: "/", group: "Pages" },
  { label: "Daily Challenge", href: "/daily", group: "Pages" },
  { label: "Brain Score", href: "/brain-score", group: "Pages" },
  { label: "About", href: "/about", group: "Pages" },
  { label: "Reaction Time", href: "/reaction", group: "Reflex" },
  { label: "Typing Speed", href: "/typing", group: "Reflex" },
  { label: "Aim Trainer", href: "/aim", group: "Reflex" },
  { label: "Click Speed", href: "/click-speed", group: "Reflex" },
  { label: "Hand-Eye Coordination", href: "/hand-eye", group: "Reflex" },
  { label: "Rhythm Timing", href: "/rhythm", group: "Reflex" },
  { label: "Chimp Test", href: "/chimp", group: "Memory" },
  { label: "Number Memory", href: "/memory", group: "Memory" },
  { label: "Visual Memory", href: "/visual-memory", group: "Memory" },
  { label: "Sequence Memory", href: "/sequence", group: "Memory" },
  { label: "Reverse Memory", href: "/reverse-memory", group: "Memory" },
  { label: "Digit Span", href: "/digit-span", group: "Memory" },
  { label: "Face Memory", href: "/face-memory", group: "Memory" },
  { label: "Audio Memory", href: "/audio-memory", group: "Memory" },
  { label: "N-Back", href: "/n-back", group: "Memory" },
  { label: "Number Speed", href: "/number-speed", group: "Memory" },
  { label: "Math Speed", href: "/math", group: "Logic" },
  { label: "Pattern Recognition", href: "/pattern", group: "Logic" },
  { label: "Mental Math Sprint", href: "/pattern-speed", group: "Logic" },
  { label: "Number Comparison", href: "/number-comparison", group: "Logic" },
  { label: "Dot Estimation", href: "/estimation", group: "Logic" },
  { label: "Stroop Effect", href: "/stroop", group: "Attention" },
  { label: "Peripheral Reaction", href: "/peripheral", group: "Attention" },
  { label: "Color Match", href: "/color-match", group: "Attention" },
  { label: "Focus Timer", href: "/focus-timer", group: "Attention" },
  { label: "Trail Making", href: "/trail-making", group: "Attention" },
  { label: "Go/No-Go", href: "/go-no-go", group: "Attention" },
  { label: "Emotion Recognition", href: "/emotion", group: "Attention" },
  { label: "Visual Search", href: "/visual-search", group: "Attention" },
  { label: "Dual Task", href: "/dual-task", group: "Attention" },
  { label: "Change Detection", href: "/change-detection", group: "Attention" },
  { label: "Verbal Memory", href: "/verbal", group: "Verbal" },
  { label: "Word Speed", href: "/word-speed", group: "Verbal" },
  { label: "Reading Speed", href: "/reading", group: "Verbal" },
  { label: "Word Association", href: "/word-association", group: "Verbal" },
  { label: "Spatial Rotation", href: "/rotation", group: "Spatial" },
  { label: "Color Blind Test", href: "/color-blind", group: "Spatial" },
];

function matches(item: Item, q: string): boolean {
  const haystack = `${item.label} ${item.group}`.toLowerCase();
  const needle = q.toLowerCase().trim();
  if (!needle) return true;
  let pos = 0;
  for (const ch of needle) {
    const idx = haystack.indexOf(ch, pos);
    if (idx === -1) return false;
    pos = idx + 1;
  }
  return true;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  useEffect(() => { close(); }, [pathname, close]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = ITEMS.filter(i => matches(i, query));

  useEffect(() => {
    if (open) {
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[selected] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selected, open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selected];
        if (item) { router.push(item.href); close(); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, router, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-ink-2 hover:text-ink transition-colors p-1 rounded-lg"
        aria-label="Search (⌘K)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <kbd className="hidden sm:inline text-xs font-mono border border-line rounded px-1.5 py-0.5 text-ink-3 leading-none">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0"
            style={{ background: "color-mix(in oklab, var(--ink) 15%, transparent)" }}
            onClick={close}
          />
          <div className="relative w-full max-w-lg bg-paper border border-line rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
              <svg className="w-4 h-4 text-ink-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pages and tests…"
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="text-xs text-ink-3 font-mono border border-line rounded px-1.5 py-0.5 leading-none">ESC</kbd>
            </div>

            <div ref={listRef} className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-ink-3">No results</p>
              ) : filtered.map((item, i) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => { router.push(item.href); close(); }}
                  onMouseMove={() => setSelected(i)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-4 transition-colors ${
                    i === selected ? "bg-paper-2 text-ink" : "text-ink-2"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span className="shrink-0 text-xs font-mono text-ink-3">{item.group}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 px-4 py-2 border-t border-line text-xs text-ink-3 font-mono">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
