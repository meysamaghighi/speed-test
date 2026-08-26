import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeMessage,
  buildLabel,
  createErrorBudget,
  MAX_LABEL_LENGTH,
} from "../app/lib/errorReporter.ts";

test("normalizeMessage strips absolute URLs", () => {
  const out = normalizeMessage("Failed at https://doodlelab.fun/_next/x.js oops");
  assert.equal(out.includes("https://"), false);
  assert.equal(out.includes("oops"), true);
});

test("normalizeMessage strips hashed bundle names but keeps ordinary filenames", () => {
  assert.equal(normalizeMessage("boom in main-a1b2c3d4e5.js"), "boom in");
  assert.equal(normalizeMessage("boom in pop.mp3"), "boom in pop.mp3");
});

test("normalizeMessage strips line:col so one bug is one label", () => {
  const a = normalizeMessage("TypeError: x is not a function:12:44");
  const b = normalizeMessage("TypeError: x is not a function:98:3");
  assert.equal(a, b);
});

test("buildLabel puts path first and stays within the GA4 limit", () => {
  const label = buildLabel("/spiral-draw", "TypeError: " + "y".repeat(300));
  assert.equal(label.startsWith("/spiral-draw|"), true);
  assert.equal(label.length <= MAX_LABEL_LENGTH, true);
});

test("buildLabel truncates a very long path so the message still survives", () => {
  const label = buildLabel("/" + "a".repeat(200), "TypeError: boom");
  assert.equal(label.includes("TypeError: boom"), true);
  assert.equal(label.length <= MAX_LABEL_LENGTH, true);
});

test("budget sends the first occurrence and suppresses duplicates", () => {
  const b = createErrorBudget();
  assert.equal(b.shouldSend("/a|boom"), true);
  assert.equal(b.shouldSend("/a|boom"), false);
});

test("budget allows exactly five distinct labels then stops", () => {
  const b = createErrorBudget();
  for (let i = 0; i < 5; i++) {
    assert.equal(b.shouldSend(`/a|boom${i}`), true, `label ${i} should send`);
  }
  assert.equal(b.shouldSend("/a|boom5"), false);
});
