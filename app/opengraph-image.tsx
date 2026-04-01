import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BenchMyBrain - 40 Free Cognitive Tests";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1e0d3a 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Brain emoji with glow effect */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 24,
            display: "flex",
            filter: "drop-shadow(0 0 30px rgba(138, 92, 246, 0.6))",
          }}
        >
          🧠
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: 16,
            display: "flex",
          }}
        >
          BenchMyBrain
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            color: "#a78bfa",
            letterSpacing: "0.01em",
            display: "flex",
          }}
        >
          40 Free Cognitive Tests
        </div>

        {/* Lightning bolts decoration */}
        <div
          style={{
            fontSize: 36,
            color: "#22d3ee",
            marginTop: 24,
            display: "flex",
            gap: 16,
          }}
        >
          ⚡ 🧪 ⚡
        </div>

        {/* URL at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            color: "#9ca3af",
            display: "flex",
          }}
        >
          benchmybrain.com
        </div>
      </div>
    ),
    { ...size }
  );
}
