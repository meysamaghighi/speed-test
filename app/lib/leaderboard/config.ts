export const SITE = "bmb";

export type GameCfg = { min: number; max: number; lowerIsBetter: boolean };

// Pilot scope: exactly one game per site (spec 2026-07-18-leaderboard-design).
export const GAMES: Record<string, GameCfg> = {
  reaction: { min: 80, max: 2000, lowerIsBetter: true },
};
