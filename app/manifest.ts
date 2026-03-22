import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BenchMyBrain - Brain Speed Tests",
    short_name: "BenchMyBrain",
    description: "Free brain speed tests. Reaction time, typing speed, memory, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#22d3ee",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
