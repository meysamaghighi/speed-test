// "Challenge a Friend" — score-sharing state that travels entirely in a URL
// query param. No backend, no database. Pure, defensive functions only.

export interface ChallengeData {
  name: string;
  score: number;
}

const MAX_NAME_LEN = 20;
const DEFAULT_NAME = "A friend";

function toBase64Url(input: string): string {
  return btoa(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad === 2) b64 += "==";
  else if (pad === 3) b64 += "=";
  else if (pad !== 0) throw new Error("invalid base64url length");
  return atob(b64);
}

// Trim, cap length, and strip anything that isn't a normal name character.
function sanitizeName(raw: unknown): string {
  if (typeof raw !== "string") return DEFAULT_NAME;
  const cleaned = raw
    .trim()
    .slice(0, MAX_NAME_LEN)
    .replace(/[^\p{L}\p{N}\s'.-]/gu, "")
    .trim();
  return cleaned.length > 0 ? cleaned : DEFAULT_NAME;
}

export function encodeChallenge(data: { name: string; score: number }): string {
  const name = sanitizeName(data?.name);
  const score = Number.isFinite(data?.score) ? Number(data.score) : 0;
  const json = JSON.stringify({ name, score });
  return toBase64Url(json);
}

export function decodeChallenge(q: string | null | undefined): ChallengeData | null {
  if (!q || typeof q !== "string") return null;
  try {
    const json = fromBase64Url(q);
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;
    const score = Number(parsed.score);
    if (!Number.isFinite(score)) return null;
    return { name: sanitizeName(parsed.name), score };
  } catch {
    return null;
  }
}
