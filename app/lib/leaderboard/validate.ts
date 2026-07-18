import { GAMES } from "./config.ts";

// Deliberately small blocklist — light guardrails per spec, not moderation.
const PROFANITY = ["fuck", "shit", "cunt", "nigger", "faggot", "bitch", "asshole", "dick", "pussy", "hitler"];

export function sanitizeNickname(raw: string): string {
  let s = String(raw ?? "")
    .replace(/[​‌‍؜﻿­]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20)
    .trim();
  const lower = s.toLowerCase().replace(/[^a-z]/g, "");
  if (!s || PROFANITY.some((w) => lower.includes(w))) return "Player";
  return s;
}

export function validateScore(
  game: string,
  score: unknown
): { ok: true; value: number } | { ok: false; error: string } {
  const cfg = GAMES[game];
  if (!cfg) return { ok: false, error: "unknown game" };
  if (typeof score !== "number" || !Number.isFinite(score)) return { ok: false, error: "score must be a number" };
  if (score < cfg.min || score > cfg.max) return { ok: false, error: "score out of bounds" };
  return { ok: true, value: score };
}
