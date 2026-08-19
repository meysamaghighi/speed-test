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

test("sanitizeNickname strips real control bytes (NUL, C0)", () => {
  assert.equal(sanitizeNickname("Bob\x00\x01\x1Fcat"), "Bobcat");
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

test("rejected resubmit updates display name/country but keeps best score", async () => {
  __resetMemoryStore();
  await submitScore({ game: "reaction", score: 300, nickname: "OldName", playerId: "p1", cc: "SE" });
  const r = await submitScore({ game: "reaction", score: 400, nickname: "NewName", playerId: "p1", cc: "US" });
  assert.equal(r.accepted, false);
  assert.equal(r.best, 300);        // score unchanged (worse rejected)
  assert.equal(r.countryRank, 1);   // ranked within the NEW country (US)
  const board = await getBoard("reaction", "p1");
  assert.equal(board.top[0].name, "NewName"); // display identity follows the player
  assert.equal(board.top[0].cc, "US");
  assert.equal(board.top[0].score, 300);
});

test("rate limit allows 10 then blocks", async () => {
  __resetMemoryStore();
  for (let i = 0; i < 10; i++) assert.equal(await checkRateLimit(["k1"]), true);
  assert.equal(await checkRateLimit(["k1"]), false);
});

// ---------------------------------------------------------------------
// Redis REST path — exercises the real Upstash code path via a mocked
// fetch. store.ts reads UPSTASH_REDIS_REST_URL/TOKEN lazily (per-call),
// so flipping them here at test time is enough to switch off the memory
// fallback without restructuring the module. Kept LAST in the file, with
// fetch/env fully restored in `finally`, so earlier (and any later)
// memory-path tests are unaffected by run order.
// ---------------------------------------------------------------------

type FakeFetchCall = { cmd: unknown[] };

function withFakeRedis(
  responses: unknown[],
  run: (calls: FakeFetchCall[]) => Promise<void>
): Promise<void> {
  const calls: FakeFetchCall[] = [];
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  process.env.UPSTASH_REDIS_REST_URL = "https://fake-redis.example/";
  process.env.UPSTASH_REDIS_REST_TOKEN = "fake-token";

  globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
    const cmd = JSON.parse(String(init?.body)) as unknown[];
    calls.push({ cmd });
    const result = responses.shift();
    return {
      ok: true,
      json: async () => ({ result }),
    } as Response;
  }) as typeof fetch;

  return run(calls).finally(() => {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
    else process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    if (originalToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
    else process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
  });
}

test("redis path: submitScore happy path issues correctly-shaped commands", async () => {
  await withFakeRedis(
    [
      1, // ZADD GT CH lb:bmb:reaction -300 p1 -> absent member inserted, changed=1
      "-300", // ZSCORE lb:bmb:reaction p1 -> read back authoritative current score
      1, // HSET
      ["p1", "-300"], // ZRANGE (fullBoard, for computeRanks)
      [JSON.stringify({ name: "A", cc: "SE", ts: 1 })], // HMGET (readMeta)
    ],
    async (calls) => {
      const r = await submitScore({ game: "reaction", score: 300, nickname: "A", playerId: "p1", cc: "SE" });
      assert.equal(r.accepted, true);
      assert.equal(r.best, 300);
      assert.equal(r.worldRank, 1);
      assert.equal(r.countryRank, 1);

      assert.deepEqual(calls[0].cmd, ["ZADD", "lb:bmb:reaction", "GT", "CH", -300, "p1"]);
      assert.deepEqual(calls[1].cmd, ["ZSCORE", "lb:bmb:reaction", "p1"]);
      assert.equal(calls[2].cmd[0], "HSET");
      assert.equal(calls[2].cmd[1], "lb:bmb:reaction:meta");
      assert.deepEqual(calls[3].cmd, ["ZRANGE", "lb:bmb:reaction", 0, -1, "REV", "WITHSCORES"]);
      assert.equal(calls[4].cmd[0], "HMGET");
    }
  );
});

test("redis path: worse score rejected via GT — accepted false, best keeps the prior (better) score", async () => {
  await withFakeRedis(
    [
      0, // ZADD GT CH lb:bmb:reaction -220 p1 -> -220 is not > existing -180, not changed
      "-180", // ZSCORE readback -> current best is still -180 (score 180)
      1, // HSET
      ["p1", "-180"], // ZRANGE
      [JSON.stringify({ name: "A", cc: "SE", ts: 1 })], // HMGET
    ],
    async (calls) => {
      // reaction is lower-is-better, so a *higher* ms value (220) is WORSE
      // than an existing best of 180ms (stored -180 > stored -220 fails GT).
      const r = await submitScore({ game: "reaction", score: 220, nickname: "A", playerId: "p1", cc: "SE" });
      assert.equal(r.accepted, false);
      assert.equal(r.best, 180);
      assert.deepEqual(calls[0].cmd, ["ZADD", "lb:bmb:reaction", "GT", "CH", -220, "p1"]);
      assert.deepEqual(calls[1].cmd, ["ZSCORE", "lb:bmb:reaction", "p1"]);
    }
  );
});

// ---------------------------------------------------------------------
// Race test: two near-simultaneous submitScore() calls for the same
// playerId, with the worse score's write landing after the better one's.
// This is the scenario a plain read-then-write (ZSCORE then ZADD) gets
// wrong: both calls can read "no prior score" before either writes, so
// both decide to accept, and whichever ZADD lands last wins — a worse
// score can silently overwrite a better one. ZADD GT CH fixes this by
// making the compare-and-set atomic. The fake backend below implements
// real ZSET semantics (including GT/CH) so this test exercises actual
// state, not just a scripted response queue.
// ---------------------------------------------------------------------

type Cmd = (string | number)[];

function makeFakeRedisBackend() {
  const zsets = new Map<string, Map<string, number>>();
  const hashes = new Map<string, Map<string, string>>();

  function handle(cmd: Cmd): unknown {
    const [op, ...rest] = cmd;
    if (op === "ZSCORE") {
      const [key, member] = rest as [string, string];
      const v = zsets.get(key)?.get(member);
      return v === undefined ? null : String(v);
    }
    if (op === "ZADD") {
      let i = 0;
      const key = rest[i++] as string;
      let gt = false;
      let ch = false;
      while (rest[i] === "GT" || rest[i] === "CH" || rest[i] === "NX" || rest[i] === "XX") {
        if (rest[i] === "GT") gt = true;
        if (rest[i] === "CH") ch = true;
        i++;
      }
      const score = Number(rest[i++]);
      const member = rest[i++] as string;
      let z = zsets.get(key);
      if (!z) { z = new Map(); zsets.set(key, z); }
      const prev = z.get(member);
      let added = 0;
      let changed = 0;
      if (prev === undefined) {
        z.set(member, score);
        added = 1;
        changed = 1;
      } else if (!gt || score > prev) {
        if (score !== prev) changed = 1;
        z.set(member, score);
      }
      return ch ? changed : added;
    }
    if (op === "HSET") {
      const [key, field, value] = rest as [string, string, string];
      let h = hashes.get(key);
      if (!h) { h = new Map(); hashes.set(key, h); }
      const isNew = !h.has(field);
      h.set(field, value);
      return isNew ? 1 : 0;
    }
    if (op === "ZRANGE") {
      const [key] = rest as [string];
      const z = zsets.get(key) ?? new Map();
      const entries = [...z.entries()].sort((a, b) => b[1] - a[1]);
      const flat: string[] = [];
      entries.forEach(([m, s]) => flat.push(m, String(s)));
      return flat;
    }
    if (op === "HMGET") {
      const [key, ...fields] = rest as string[];
      const h = hashes.get(key) ?? new Map();
      return fields.map((f) => h.get(f) ?? null);
    }
    throw new Error(`fake redis backend: unhandled cmd ${String(op)}`);
  }

  return { handle, zsets };
}

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

test("redis path: concurrent submits — a worse score landing last must not overwrite a better one", async () => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.UPSTASH_REDIS_REST_URL = "https://fake-redis.example/";
  process.env.UPSTASH_REDIS_REST_TOKEN = "fake-token";

  const backend = makeFakeRedisBackend();
  type Pending = { cmd: Cmd; respond: () => void };
  const pending: Pending[] = [];

  globalThis.fetch = ((_url: string | URL, init?: RequestInit) => {
    const cmd = JSON.parse(String(init?.body)) as Cmd;
    return new Promise<Response>((resolve) => {
      pending.push({
        cmd,
        // Compute against the backend lazily, at release time — not at
        // push time — so the order we choose to release calls in is the
        // order state mutations actually happen in, letting us script the
        // exact interleaving under test.
        respond: () => {
          const result = backend.handle(cmd);
          resolve({ ok: true, json: async () => ({ result }) } as Response);
        },
      });
    });
  }) as typeof fetch;

  try {
    // reaction is lower-is-better: 200ms is BETTER than 400ms.
    const better = submitScore({ game: "reaction", score: 200, nickname: "A", playerId: "p1", cc: "SE" });
    const worse = submitScore({ game: "reaction", score: 400, nickname: "A", playerId: "p1", cc: "SE" });

    // Let both calls reach their first redis round trip.
    await flush();
    assert.equal(pending.length, 2, "both calls should be blocked on their first redis round trip");

    // Drain strictly in FIFO arrival order, one call at a time, flushing
    // between each release so each call's continuation runs (and queues its
    // next command) before we decide what to release next. This is what
    // produces the race window without hardcoding which command comes
    // first: on the OLD code, both calls' first command is a ZSCORE read,
    // so releasing them FIFO makes BOTH read "no prior score" before either
    // has issued its ZADD write — exactly the interleaving that lets the
    // second (worse) write clobber the first (better) one. On the FIXED
    // code, each call's first command is already the atomic `ZADD GT CH`
    // write, so by the time the second call's write is released, the first
    // call's write has already been applied to the backend (respond()
    // applies it synchronously) and GT correctly rejects it — no race is
    // even possible to construct.
    while (pending.length > 0) {
      const p = pending.shift()!;
      p.respond();
      await flush();
    }

    await Promise.all([better, worse]);

    // The real assertion: the persisted board state must still show the
    // BETTER score (200), not the worse one (400) that wrote last.
    const persisted = backend.zsets.get("lb:bmb:reaction")?.get("p1");
    assert.equal(persisted, -200, "a worse score must not overwrite a better one on a losing race");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
    else process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    if (originalToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
    else process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
  }
});

test("redis path: checkRateLimit issues INCR/EXPIRE and blocks over the cap", async () => {
  await withFakeRedis([1, 1, 11], async (calls) => {
    const first = await checkRateLimit(["rk1"]);
    assert.equal(first, true);
    const second = await checkRateLimit(["rk1"]);
    assert.equal(second, false);

    assert.deepEqual(calls[0].cmd, ["INCR", "lb:rl:rk1"]);
    assert.deepEqual(calls[1].cmd, ["EXPIRE", "lb:rl:rk1", 60]);
    assert.deepEqual(calls[2].cmd, ["INCR", "lb:rl:rk1"]);
  });
});

// --------- Route handlers ---------

import { GET as boardGET } from "../app/api/leaderboard/route.ts";
import { POST as submitPOST } from "../app/api/leaderboard/submit/route.ts";
import { GET as meGET } from "../app/api/leaderboard/me/route.ts";

function postReq(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://x/api/leaderboard/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test("submit route: happy path stores country from vercel header", async () => {
  __resetMemoryStore();
  const res = await submitPOST(postReq(
    { game: "reaction", score: 222, nickname: "Zoe", playerId: "pz" },
    { "x-vercel-ip-country": "SE" }
  ));
  assert.equal(res.status, 200);
  const j = await res.json();
  assert.equal(j.accepted, true);
  assert.equal(j.worldRank, 1);
  const withPlayerRes = await boardGET(new Request("http://x/api/leaderboard?game=reaction&playerId=pz"));
  assert.equal(withPlayerRes.headers.get("Cache-Control"), "private, no-store");
  const b = await withPlayerRes.json();
  assert.equal(b.top[0].cc, "SE");
  assert.equal(b.you.rank, 1);
});

test("board route: Cache-Control is shared/cacheable without playerId, private with it", async () => {
  __resetMemoryStore();
  const anon = await boardGET(new Request("http://x/api/leaderboard?game=reaction"));
  assert.equal(anon.headers.get("Cache-Control"), "s-maxage=30, stale-while-revalidate=60");
  const personal = await boardGET(new Request("http://x/api/leaderboard?game=reaction&playerId=pz"));
  assert.equal(personal.headers.get("Cache-Control"), "private, no-store");
});

test("me route: 400 on unknown game", async () => {
  assert.equal((await meGET(new Request("http://x/api/leaderboard/me?game=nope&playerId=p1"))).status, 400);
});

test("me route: 400 when playerId missing", async () => {
  assert.equal((await meGET(new Request("http://x/api/leaderboard/me?game=reaction"))).status, 400);
});

test("me route: {you: null} for an unknown player", async () => {
  __resetMemoryStore();
  const res = await meGET(new Request("http://x/api/leaderboard/me?game=reaction&playerId=ghost"));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Cache-Control"), "private, no-store");
  const j = await res.json();
  assert.equal(j.you, null);
});

test("me route: {you: {rank, score}} for a known player", async () => {
  __resetMemoryStore();
  // lower-is-better: 180 beats 250, so u1 (180) ranks #1 and s1 (250) ranks #2.
  await submitScore({ game: "reaction", score: 250, nickname: "Swede", playerId: "s1", cc: "SE" });
  await submitScore({ game: "reaction", score: 180, nickname: "Yank", playerId: "u1", cc: "US" });
  const res = await meGET(new Request("http://x/api/leaderboard/me?game=reaction&playerId=u1"));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Cache-Control"), "private, no-store");
  const j = await res.json();
  assert.deepEqual(j.you, { rank: 1, score: 180 });
});

test("submit route: rejects garbage", async () => {
  __resetMemoryStore();
  assert.equal((await submitPOST(postReq({ game: "reaction", score: 5, nickname: "a", playerId: "p" }))).status, 400);
  assert.equal((await submitPOST(postReq({ game: "nope", score: 200, nickname: "a", playerId: "p" }))).status, 400);
  assert.equal((await submitPOST(postReq({ game: "reaction", score: 200, nickname: "a" }))).status, 400); // no playerId
  const bad = new Request("http://x/api/leaderboard/submit", { method: "POST", body: "not json" });
  assert.equal((await submitPOST(bad)).status, 400);
});

test("board route: 400 on unknown game", async () => {
  assert.equal((await boardGET(new Request("http://x/api/leaderboard?game=nope"))).status, 400);
});

test("board route: personalized requests are rate limited per IP, anonymous ones are not", async () => {
  __resetMemoryStore();
  const withIp = (playerId: string) =>
    new Request(`http://x/api/leaderboard?game=reaction&playerId=${playerId}`, {
      headers: { "x-forwarded-for": "203.0.113.9" },
    });
  for (let i = 0; i < 10; i++) {
    assert.equal((await boardGET(withIp(`p${i}`))).status, 200);
  }
  assert.equal((await boardGET(withIp("p10"))).status, 429);
  // The shared, cacheable board (no playerId) is unaffected by the same IP's cap.
  const anon = await boardGET(
    new Request("http://x/api/leaderboard?game=reaction", { headers: { "x-forwarded-for": "203.0.113.9" } }),
  );
  assert.equal(anon.status, 200);
});

test("prototype property names are not valid games", async () => {
  __resetMemoryStore();
  for (const g of ["hasOwnProperty", "constructor", "toString", "__proto__"]) {
    assert.equal((await boardGET(new Request(`http://x/api/leaderboard?game=${g}`))).status, 400);
    assert.equal((await submitPOST(postReq({ game: g, score: 99999999, nickname: "x", playerId: "y" }))).status, 400);
  }
  assert.equal(validateScore("hasOwnProperty", 99999999).ok, false);
});

// --------- World leaderboard config: all 40 tests ---------

import { GAMES, BOUNDS_BY_UNIT } from "../app/lib/leaderboard/config.ts";
import { TESTS } from "../app/lib/brainTests.ts";

// digit-span is the one TESTS slug that does NOT resolve to its own board:
// it's retired in favor of two mode-specific EXTRA_BOARDS entries (see
// config.ts) because forward/backward digit span have very different
// difficulty and shouldn't rank together. Every other TESTS slug still
// resolves 1:1.
const RETIRED_TEST_SLUGS = new Set(["digit-span"]);
const EXTRA_BOARD_IDS = ["digit-span-forward", "digit-span-backward"];

test("every brain test has a world board config, keyed by slug (except retired ids folded into EXTRA_BOARDS)", () => {
  for (const t of TESTS) {
    const slug = t.href.replace(/^\//, "");
    if (RETIRED_TEST_SLUGS.has(slug)) continue;
    assert.ok(GAMES[slug], `missing world board config for slug "${slug}" (${t.label})`);
  }
  // GAMES = every TESTS slug, minus the retired ones, plus the extra boards
  // that replace them.
  assert.equal(Object.keys(GAMES).length, TESTS.length - RETIRED_TEST_SLUGS.size + EXTRA_BOARD_IDS.length);
});

test("extra board ids (digit-span-forward/backward) are explicitly present", () => {
  for (const id of EXTRA_BOARD_IDS) {
    assert.ok(GAMES[id], `expected extra board "${id}" to exist`);
  }
  // And the retired shared id is gone, so nothing can submit to it.
  assert.ok(!GAMES["digit-span"], `"digit-span" should have been replaced by mode-specific boards`);
});

test("digit-span-forward and digit-span-backward both exist with correct, matching bounds", () => {
  const expected = { min: 1, max: 30, lowerIsBetter: false };
  assert.deepEqual(GAMES["digit-span-forward"], expected);
  assert.deepEqual(GAMES["digit-span-backward"], expected);
  // Bounds must match what the "digits" unit gives everywhere else.
  assert.deepEqual(BOUNDS_BY_UNIT.digits, { min: 1, max: 30 });
});

test("world board ids are slugs, never pb-* family keys", () => {
  for (const id of Object.keys(GAMES)) {
    assert.ok(!id.startsWith("pb-"), `world board id "${id}" looks like a family key`);
  }
});

test("direction comes from the test's own mode", () => {
  for (const t of TESTS) {
    const slug = t.href.replace(/^\//, "");
    if (RETIRED_TEST_SLUGS.has(slug)) continue;
    assert.equal(
      GAMES[slug].lowerIsBetter,
      t.mode === "lower",
      `direction mismatch for ${slug}`,
    );
  }
});

test("reaction keeps its live bounds — real scores exist in Redis under this key", () => {
  assert.deepEqual(GAMES.reaction, { min: 80, max: 2000, lowerIsBetter: true });
});

test("every unit used by TESTS has a bounds entry", () => {
  for (const t of TESTS) {
    assert.ok(BOUNDS_BY_UNIT[t.unit], `no bounds defined for unit "${t.unit}" (${t.label})`);
  }
});

test("bounds are sane: min < max, non-negative", () => {
  for (const [unit, b] of Object.entries(BOUNDS_BY_UNIT)) {
    assert.ok(b.min < b.max, `${unit}: min must be < max`);
    assert.ok(b.min >= 0, `${unit}: min must be >= 0`);
  }
});

test("plateauing level tests get an endurance-appropriate override, not the unit default", () => {
  // VisualMemory, ChangeDetectionTest, and FaceMemoryTest all cap their
  // difficulty ramp and become endurance counters past some level, so they
  // must not be silently rejected at the generic `level` ceiling of 50.
  for (const slug of ["visual-memory", "change-detection", "face-memory"]) {
    assert.ok(GAMES[slug], `missing config for ${slug}`);
    assert.notEqual(
      GAMES[slug].max,
      BOUNDS_BY_UNIT.level.max,
      `${slug} should use an OVERRIDES ceiling, not the generic level max`,
    );
    assert.equal(GAMES[slug].max, 500, `${slug} should have a generous endurance ceiling`);
    assert.equal(GAMES[slug].lowerIsBetter, false);
  }
});

// --------- Regression: viewer's own country beyond the top-100 slice ---------

test("viewer ranked outside the top 100 still gets a correct country back from the server", async () => {
  __resetMemoryStore();
  // 104 filler players (all US) fill up ranks 1-104 — already past the
  // top-100 slice `getBoard` returns, so anything seeded after this is
  // guaranteed to land outside `top` regardless of exact scores below.
  for (let i = 0; i < 104; i++) {
    await submitScore({
      game: "reaction", score: 100 + i, nickname: `Filler${i}`, playerId: `filler${i}`, cc: "US",
    });
  }
  // Two same-country peers, ranked worse than all fillers, so the viewer's
  // countryRank reflects a real position among multiple SE players rather
  // than trivially being "1 of 1".
  await submitScore({ game: "reaction", score: 210, nickname: "SwedeA", playerId: "swedeA", cc: "SE" });
  await submitScore({ game: "reaction", score: 220, nickname: "SwedeB", playerId: "swedeB", cc: "SE" });

  // The viewer: worst score of everyone, so lands dead last — well outside
  // the top-100 slice.
  const result = await submitScore({
    game: "reaction", score: 2000, nickname: "Outsider", playerId: "outsider", cc: "SE",
  });
  assert.equal(result.worldRank, 107, "107 total players, viewer is worst");
  assert.equal(result.cc, "SE", "submitScore must echo the viewer's own country back");
  assert.equal(result.countryRank, 3, "countryRank must be computed over the FULL board, not just top-100");

  const board = await getBoard("reaction", "outsider");
  assert.equal(board.totalPlayers, 107);
  assert.ok(board.top.length <= 100, "top must stay capped at 100");
  assert.equal(
    board.top.find((r) => r.name === "Outsider"),
    undefined,
    "viewer must be absent from top — that's the whole premise of this regression",
  );
  assert.ok(board.you, "getBoard must still report `you` for a player outside the top 100");
  assert.equal(board.you?.rank, 107);
  assert.equal(
    board.you?.cc,
    "SE",
    "viewer's country must be recoverable via meta even though they're absent from `top`",
  );
});
