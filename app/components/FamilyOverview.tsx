"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  addProfile,
  houseChampions,
  removeProfile,
  setActive,
  standings,
  topChampions,
  emptyState,
  MAX_PROFILES,
  MAX_NAME_LEN,
  type FamilyState,
} from "../lib/family/profiles";
import { loadFamily, newProfileId, saveFamily } from "../lib/family/storage";
import { TESTS, LOWER_BOARDS } from "../lib/brainTests";

function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

function NameInput({
  name,
  setName,
  submitName,
  autoFocus,
  className,
}: {
  name: string;
  setName: (v: string) => void;
  submitName: () => void;
  autoFocus?: boolean;
  className: string;
}) {
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && submitName()}
      placeholder={autoFocus ? "Name" : "+ Add"}
      maxLength={MAX_NAME_LEN}
      className={className}
    />
  );
}

// Site-level overview: one player picker + profile manager at the top, the
// house-champion tally across every board, then one compact standings block
// per test that actually has a recorded score. Read-only — scores are
// recorded by app/hooks/usePersonalBest.ts on the individual test pages, so
// nothing here ever calls recordBest.
export default function FamilyOverview() {
  const [state, setState] = useState<FamilyState>(emptyState);
  const [name, setName] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadFamily());
    setHydrated(true);
  }, []);

  const update = useCallback((next: FamilyState) => {
    setState(next);
    saveFamily(next, LOWER_BOARDS);
  }, []);

  // Renders nothing until localStorage has been read on the client, so the
  // server-rendered markup and the first client render agree (no hydration
  // mismatch — see FamilyBoard.tsx for the same guard).
  if (!hydrated) return null;

  const submitName = () => {
    const id = newProfileId();
    const next = addProfile(state, name, id);
    if (next !== state) {
      update(next);
      setName("");
    }
  };

  const switchPlayer = (id: string) => {
    if (id === state.activeId) return;
    update(setActive(state, id));
  };

  const removePlayer = (id: string, playerName: string) => {
    if (
      !window.confirm(`Remove ${playerName} and all of their scores? This can't be undone.`)
    ) {
      return;
    }
    update(removeProfile(state, id));
  };

  if (state.profiles.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <p className="text-ink font-medium">Add players to start a scoreboard</p>
        <p className="text-ink-2 text-sm mt-1">
          Everyone on this device gets their own best score. Nothing is shared online.
        </p>
        <div className="mt-3 flex gap-2">
          <NameInput
            name={name}
            setName={setName}
            submitName={submitName}
            autoFocus
            className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-ink"
          />
          <button
            onClick={submitName}
            className="rounded-lg border border-line bg-paper px-4 py-2 text-ink font-medium"
          >
            Add
          </button>
        </div>
      </div>
    );
  }

  const champions = topChampions(houseChampions(state, LOWER_BOARDS));
  const playedTests = TESTS.filter((t) => {
    const board = state.bests[t.key];
    return board && Object.keys(board).length > 0;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <div className="flex flex-wrap gap-2">
          {state.profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => switchPlayer(p.id)}
              className={`rounded-full px-3 py-1 text-sm border ${
                state.activeId === p.id ? "border-ink text-ink font-semibold" : "border-line text-ink-2"
              }`}
              style={state.activeId === p.id ? { boxShadow: `inset 0 -2px 0 ${p.color}` } : undefined}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                style={{ background: p.color }}
              />
              {p.name}
            </button>
          ))}
          {state.profiles.length < MAX_PROFILES && (
            <NameInput
              name={name}
              setName={setName}
              submitName={submitName}
              className="w-24 rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink"
            />
          )}
        </div>

        {champions.length > 0 && (
          <p className="text-ink-2 text-sm mt-3 border-t border-line pt-3">
            🏆 House champion{champions.length > 1 ? "s" : ""}:{" "}
            <span className="text-ink font-semibold">
              {joinNames(champions.map((c) => c.profile.name))}
            </span>{" "}
            — {champions[0].firsts} game{champions[0].firsts === 1 ? "" : "s"} in first place
            {champions.length > 1 ? " each" : ""}
          </p>
        )}

        <details className="mt-3">
          <summary className="text-ink-2 text-xs cursor-pointer">Manage players</summary>
          <div className="mt-2 flex flex-wrap gap-2">
            {state.profiles.map((p) => (
              <button
                key={p.id}
                onClick={() => removePlayer(p.id, p.name)}
                className="rounded-lg border border-line px-2 py-1 text-xs text-ink-2"
              >
                Remove {p.name}
              </button>
            ))}
          </div>
        </details>
      </div>

      {playedTests.length === 0 ? (
        <div className="rounded-xl border border-line bg-paper-2 p-4">
          <p className="text-ink font-medium">No scores yet</p>
          <p className="text-ink-2 text-sm mt-1">
            Play any test above with {state.profiles.length === 1 ? "this player" : "a player"}{" "}
            active and it shows up here.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {playedTests.map((t) => {
            const rows = standings(state, t.key, t.mode === "lower");
            return (
              <div key={t.key} className="rounded-xl border border-line bg-paper-2 p-4">
                <Link
                  href={t.href}
                  className="text-ink font-semibold hover:underline"
                >
                  {t.label}
                </Link>
                <ol className="mt-2 space-y-1">
                  {rows.map((r) => (
                    <li
                      key={r.profile.id}
                      className="flex items-center justify-between rounded-lg px-2 py-1"
                    >
                      <span className="text-ink text-sm">
                        <span className="text-ink-2 tabular-nums mr-2">
                          #{r.rank} of {rows.length}
                        </span>
                        <span
                          className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                          style={{ background: r.profile.color }}
                        />
                        {r.profile.name}
                      </span>
                      <span className="text-ink tabular-nums text-sm font-semibold">
                        {r.score}
                        {t.unit}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
