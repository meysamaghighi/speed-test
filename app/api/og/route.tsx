import { ImageResponse } from "next/og";
import { TESTS } from "../../lib/brainTests";

// Dynamic OG/share card for "Challenge a Friend" links (?c= on /rotation etc).
// Public, unauthenticated route hit directly by link-unfurl bots (Discord,
// Slack, iMessage, WhatsApp, Reddit...) so every input is untrusted and must
// be validated/clamped independently of any caller — never trust the query
// string, never throw.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Whitelist of shareable test ids, derived from the single source of truth
// (app/lib/brainTests.ts) so every test page has a valid display name here
// without a second list to keep in sync. Unknown ids fall back to the
// generic site card below.
const TEST_LABELS: Record<string, string> = Object.fromEntries(
  TESTS.map((t) => [t.href.replace(/^\//, ""), t.label])
);

// Known per-test max score, used to clamp obviously-bogus values into a
// plausible range. Tests without an entry just get a generic numeric clamp.
const TEST_MAX: Record<string, number> = {
  rotation: 15,
};
const DEFAULT_MAX = 999;
const MAX_NAME_LEN = 24;

const BG = "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1e0d3a 100%)";
const WHITE = "#ffffff";
const LILAC = "#d8d3ff";
const PURPLE = "#a78bfa";
const CYAN = "#22d3ee";
const GRAY = "#9ca3af";

function safeTestId(raw: string | null): string | null {
  if (!raw) return null;
  return Object.prototype.hasOwnProperty.call(TEST_LABELS, raw) ? raw : null;
}

function safeScore(raw: string | null, max: number): number | null {
  if (raw === null) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return null;
  return Math.min(Math.max(n, 0), max);
}

function safeName(raw: string | null): string | null {
  if (!raw || typeof raw !== "string") return null;
  const cleaned = raw
    .trim()
    .slice(0, MAX_NAME_LEN)
    .replace(/[^\p{L}\p{N}\s'.-]/gu, "")
    .trim();
  return cleaned.length > 0 ? cleaned : null;
}

export async function GET(req: Request) {
  let searchParams: URLSearchParams;
  try {
    searchParams = new URL(req.url).searchParams;
  } catch {
    searchParams = new URLSearchParams();
  }

  const testId = safeTestId(searchParams.get("test"));
  const max = testId ? TEST_MAX[testId] ?? DEFAULT_MAX : DEFAULT_MAX;
  const score = testId ? safeScore(searchParams.get("score"), max) : null;
  const name = testId ? safeName(searchParams.get("name")) : null;
  const testLabel = testId ? TEST_LABELS[testId] : null;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: BG,
            fontFamily: "system-ui, sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 96,
              marginBottom: 20,
              display: "flex",
              filter: "drop-shadow(0 0 30px rgba(138, 92, 246, 0.6))",
            }}
          >
            🧠
          </div>

          {testLabel ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: LILAC,
                  letterSpacing: "-0.01em",
                  marginBottom: 6,
                  display: "flex",
                }}
              >
                {name && score !== null ? `${name} scored` : testLabel}
              </div>
              {score !== null && (
                <div
                  style={{
                    fontSize: 148,
                    fontWeight: 900,
                    color: WHITE,
                    lineHeight: 1,
                    display: "flex",
                  }}
                >
                  {score}
                </div>
              )}
              {name && score !== null && (
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 500,
                    color: GRAY,
                    marginTop: 10,
                    marginBottom: 26,
                    display: "flex",
                  }}
                >
                  {`on the ${testLabel}`}
                </div>
              )}
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  color: CYAN,
                  marginTop: score !== null && !name ? 26 : 0,
                  display: "flex",
                }}
              >
                Can you beat it?
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  fontSize: 76,
                  fontWeight: 900,
                  color: WHITE,
                  letterSpacing: "-0.02em",
                  marginBottom: 14,
                  display: "flex",
                }}
              >
                BenchMyBrain
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 500,
                  color: PURPLE,
                  display: "flex",
                }}
              >
                Free Cognitive Tests — Can You Beat Your Friends?
              </div>
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: 40,
              fontSize: 28,
              color: GRAY,
              display: "flex",
            }}
          >
            benchmybrain.com
          </div>
        </div>
      ),
      { ...size }
    );
  } catch {
    // Last-resort fallback: never let a malformed request 500 the unfurl.
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: BG,
            color: WHITE,
            fontSize: 76,
            fontWeight: 900,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          BenchMyBrain
        </div>
      ),
      { ...size }
    );
  }
}
