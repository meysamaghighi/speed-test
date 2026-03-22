import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "#22d3ee",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size }
  );
}
