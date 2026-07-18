import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeNickname, validateScore } from "../app/lib/leaderboard/validate.ts";
import { submitScore, getBoard, checkRateLimit, __resetMemoryStore } from "../app/lib/leaderboard/store.ts";

test("sanitizeNickname trims, caps at 20, collapses whitespace", () => {
  assert.equal(sanitizeNickname("  Meysam   A  "), "Meysam A");
  assert.equal(sanitizeNickname("x".repeat(50)).length, 20);
});

test("sanitizeNickname strips control/zero-width chars", () => {
  assert.equal(sanitizeNickname("Bob ​‍cat"), "Bob cat");
});

test("sanitizeNickname empty or profane becomes Player", () => {
  assert.equal(sanitizeNickname("   "), "Player");
  assert.equal(sanitizeNickname("fuck"), "Player");
});

test("validateScore enforces per-game bounds and numeric type", () => {
  assert.deepEqual(validateScore("reaction", 250), { ok: true, value: 250 });
  assert.equal(validateScore("reaction", 79).ok, false);
  assert.equal(validateScore("reaction", 2001).ok, false);
  assert.equal(validateScore("reaction", "250").ok, false);
  assert.equal(validateScore("reaction", NaN).ok, false);
  assert.equal(validateScore("nope", 250).ok, false);
});

test("submitScore keeps one row per player, only improves", async () => {
  __resetMemoryStore();
  const a1 = await submitScore({ game: "reaction", score: 300, nickname: "A", playerId: "p1", cc: "SE" });
  assert.equal(a1.accepted, true);
  assert.equal(a1.worldRank, 1);
  // Worse score (higher ms on lower-is-better) is rejected but still reports rank.
  const a2 = await submitScore({ game: "reaction", score: 400, nickname: "A", playerId: "p1", cc: "SE" });
  assert.equal(a2.accepted, false);
  assert.equal(a2.best, 300);
  // Better score overwrites.
  const a3 = await submitScore({ game: "reaction", score: 200, nickname: "A", playerId: "p1", cc: "SE" });
  assert.equal(a3.accepted, true);
  const board = await getBoard("reaction", "p1");
  assert.equal(board.totalPlayers, 1);
  assert.equal(board.top[0].score, 200);
});

test("lower-is-better ranking orders ascending; country rank filters by cc", async () => {
  __resetMemoryStore();
  await submitScore({ game: "reaction", score: 250, nickname: "Swede", playerId: "s1", cc: "SE" });
  await submitScore({ game: "reaction", score: 180, nickname: "Yank", playerId: "u1", cc: "US" });
  const r = await submitScore({ game: "reaction", score: 210, nickname: "Swede2", playerId: "s2", cc: "SE" });
  assert.equal(r.worldRank, 2);       // 180 < 210 < 250
  assert.equal(r.countryRank, 1);     // best SE
  const board = await getBoard("reaction");
  assert.deepEqual(board.top.map((x) => x.name), ["Yank", "Swede2", "Swede"]);
  assert.equal(board.top[0].rank, 1);
});

test("rate limit allows 10 then blocks", async () => {
  __resetMemoryStore();
  for (let i = 0; i < 10; i++) assert.equal(await checkRateLimit(["k1"]), true);
  assert.equal(await checkRateLimit(["k1"]), false);
});
