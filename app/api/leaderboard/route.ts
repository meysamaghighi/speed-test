import { GAMES } from "../../lib/leaderboard/config.ts";
import { getBoard, storeAvailable, checkRateLimit } from "../../lib/leaderboard/store.ts";
import { createHash } from "node:crypto";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const game = url.searchParams.get("game") ?? "";
  if (!Object.hasOwn(GAMES, game)) return Response.json({ error: "unknown game" }, { status: 400 });
  const avail = storeAvailable();
  if (!avail.ok) return Response.json({ error: avail.reason }, { status: 503 });
  const playerId = (url.searchParams.get("playerId") ?? undefined)?.slice(0, 64);
  // Only the personalized path bypasses the CDN and hits the origin on every
  // request (see the Cache-Control split below) — the shared board is public
  // and CDN-cached, so rate limiting it would do nothing useful. Mirrors the
  // submit route's per-IP limiter (same 10/rolling-minute budget), keyed
  // separately ("r:ip:") so read and write budgets don't share a counter.
  if (playerId) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 16) : "noip";
    if (!(await checkRateLimit([`r:ip:${ipHash}`]))) {
      return Response.json({ error: "too many requests, slow down" }, { status: 429 });
    }
  }
  try {
    const board = await getBoard(game, playerId);
    // A personalized response (playerId present) must never be marked
    // publicly cacheable — only the anonymous, shared board is CDN-cacheable.
    const headers = playerId
      ? { "Cache-Control": "private, no-store" }
      : { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" };
    return Response.json(board, { headers });
  } catch {
    return Response.json({ error: "leaderboard unavailable" }, { status: 503 });
  }
}
