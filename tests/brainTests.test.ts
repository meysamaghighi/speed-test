import { test } from "node:test";
import assert from "node:assert/strict";
import { TESTS, clamp, LOWER_BOARDS } from "../app/lib/brainTests.ts";

test("clamp bounds to 0-100 and passes through in-range values", () => {
  assert.equal(clamp(-50), 0);
  assert.equal(clamp(0), 0);
  assert.equal(clamp(42.5), 42.5);
  assert.equal(clamp(100), 100);
  assert.equal(clamp(150), 100);
});

test("clamp(NaN) propagates NaN rather than coercing to a bound", () => {
  // Documents actual behavior, not a claim it's ideal: Math.max/min propagate
  // NaN instead of clamping it, so corrupted/missing raw data (e.g. a
  // malformed localStorage PB) would flow through toScore as NaN rather than
  // failing loudly or clamping to 0. Not fixed here (out of scope for a
  // soak-work test pass) — flagged so a future pass can decide whether
  // toScore call sites should guard against NaN raw values.
  assert.ok(Number.isNaN(clamp(NaN)));
});

test("no duplicate keys in TESTS (pb-* keys double as localStorage keys)", () => {
  const keys = TESTS.map((t) => t.key);
  assert.equal(new Set(keys).size, keys.length, `duplicate key(s) found: ${keys.filter((k, i) => keys.indexOf(k) !== i).join(", ")}`);
});

test("no duplicate hrefs in TESTS (each route maps to exactly one test)", () => {
  const hrefs = TESTS.map((t) => t.href);
  assert.equal(new Set(hrefs).size, hrefs.length, `duplicate href(s) found: ${hrefs.filter((h, i) => hrefs.indexOf(h) !== i).join(", ")}`);
});

test("every TestDef has a non-empty key, label, href, and unit", () => {
  for (const t of TESTS) {
    assert.ok(t.key.length > 0, `empty key for ${t.label}`);
    assert.ok(t.label.length > 0, `empty label for ${t.key}`);
    assert.ok(t.href.startsWith("/"), `href should start with / for ${t.key}: ${t.href}`);
    assert.ok(t.unit.length > 0, `empty unit for ${t.key}`);
    assert.ok(t.mode === "higher" || t.mode === "lower", `invalid mode for ${t.key}: ${t.mode}`);
  }
});

test("every toScore always returns a value clamped to [0, 100]", () => {
  // Sweep a wide range including negative, zero, and very large raw values —
  // a broken formula (e.g. an inverted mode, or a missing clamp) would
  // otherwise only surface as a visually wrong score on a live test page.
  const probes = [-1000, -1, 0, 1, 50, 100, 500, 1000, 10000, 1_000_000];
  for (const t of TESTS) {
    for (const raw of probes) {
      const score = t.toScore(raw);
      assert.ok(
        Number.isFinite(score) && score >= 0 && score <= 100,
        `${t.key}.toScore(${raw}) = ${score}, expected a finite value in [0, 100]`
      );
    }
  }
});

// Regression guard for the family scoreboard's `lowerBoards` set (used by
// saveFamily/mergeFamilyState): it must be derived from TESTS's own `mode`,
// never hand-maintained or built from app/lib/leaderboard/config.ts's GAMES
// (an unrelated, single-entry config for the *world* leaderboard). Getting
// this wrong silently ranks the slowest reaction time as the "best" score.
test("LOWER_BOARDS contains exactly the pb-* keys whose TESTS mode is lower", () => {
  const expected = new Set(TESTS.filter((t) => t.mode === "lower").map((t) => t.key));
  assert.deepEqual([...LOWER_BOARDS].sort(), [...expected].sort());
  assert.ok(LOWER_BOARDS.size > 0, "sanity: at least one lower-is-better test exists");
  for (const key of LOWER_BOARDS) {
    assert.ok(TESTS.some((t) => t.key === key && t.mode === "lower"), `${key} in LOWER_BOARDS must map to a mode:"lower" test`);
  }
});

test("every toScore respects its declared mode (monotonic in the right direction)", () => {
  // "lower" mode: a smaller raw value must never score worse than a larger one.
  // "higher" mode: a larger raw value must never score worse than a smaller one.
  // Sampled well inside each test's typical range (avoids the flat clamped
  // tails at the extreme ends, which are correct but not informative here).
  for (const t of TESTS) {
    const a = t.toScore(10);
    const b = t.toScore(1000);
    if (t.mode === "lower") {
      assert.ok(a >= b, `${t.key} is "lower" mode but toScore(10)=${a} < toScore(1000)=${b}`);
    } else {
      assert.ok(b >= a, `${t.key} is "higher" mode but toScore(1000)=${b} < toScore(10)=${a}`);
    }
  }
});
