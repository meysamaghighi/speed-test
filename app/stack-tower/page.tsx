import type { Metadata } from "next";
import Link from "next/link";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.meydev.stacktower";

export const metadata: Metadata = {
  title: "Stack Tower - Free Block-Stacking Game for Android | BenchMyBrain",
  description:
    "Stack Tower is a free one-tap block-stacking arcade game for Android. Time each drop, build your tower as high as you can, and chase a new high score every run.",
  openGraph: {
    title: "Stack Tower - Free Block-Stacking Game for Android",
    description:
      "One-tap, endless block-stacking arcade game. Time your drops, build as high as you can, beat your best.",
    type: "website",
  },
  alternates: {
    canonical: "/stack-tower",
  },
};

const FEATURES = [
  { icon: "👆", label: "One-tap controls", desc: "Just tap to drop. Anyone can pick it up in seconds." },
  { icon: "📈", label: "Endless high-score chase", desc: "Every run is a new attempt at your personal best." },
  { icon: "🆓", label: "Free with ads", desc: "No paywall, no sign-up. Free to play, always." },
  { icon: "✈️", label: "Play offline", desc: "No connection needed once it's installed." },
];

// A few offset, rounded rectangles evoking a stacked tower. No real screenshots
// exist for this app yet, so this is a lightweight CSS/JSX motif, not a mockup.
function TowerMotif() {
  const blocks = [
    { w: 46, offset: 4, color: "var(--accent)" },
    { w: 58, offset: -8, color: "var(--accent-2)" },
    { w: 40, offset: 10, color: "var(--accent)" },
    { w: 64, offset: -4, color: "var(--accent-2)" },
    { w: 50, offset: 6, color: "var(--accent)" },
    { w: 70, offset: 0, color: "var(--accent-2)" },
  ];

  return (
    <div className="flex flex-col items-center gap-1.5 py-2" aria-hidden="true">
      {blocks.map((b, i) => (
        <div
          key={i}
          className="h-6 rounded-lg shadow-sm"
          style={{
            width: `${b.w}%`,
            maxWidth: "220px",
            transform: `translateX(${b.offset}px)`,
            background: b.color,
            opacity: 0.55 + (blocks.length - i) * 0.07,
          }}
        />
      ))}
    </div>
  );
}

export default function StackTowerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stack Tower",
    applicationCategory: "GameApplication",
    operatingSystem: "ANDROID",
    url: PLAY_STORE_URL,
    description:
      "A free one-tap block-stacking arcade game for Android. Time each drop, stack blocks as high as you can, and chase a new endless high score.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="max-w-4xl mx-auto px-4 pt-8 pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-8">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-3 mb-3">
          From the makers of BenchMyBrain
        </p>
        <h1
          className="font-display text-4xl md:text-6xl text-ink mb-4"
          style={{ fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95 }}
        >
          Stack Tower
        </h1>
        <p className="text-base text-ink-2 max-w-lg mx-auto">
          A casual, one-tap block-stacking arcade game. Time your drops, stack blocks
          as high as you can, and see how far your precision takes you &mdash; it&apos;s
          endless, so there&apos;s always one more run in you.
        </p>
      </div>

      {/* Primary CTA */}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-8 group relative overflow-hidden rounded-2xl border border-line p-6 hover:bg-paper-2 transition-all"
        style={{ background: "color-mix(in oklab, var(--accent) 8%, var(--paper))" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-lg">🎮</span>
              <h2
                className="font-display text-lg text-ink"
                style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                Play free on Google Play
              </h2>
            </div>
            <p className="text-ink-2 text-sm">Available now for Android. Free, with ads.</p>
          </div>
          <span
            className="shrink-0 text-sm font-bold px-5 py-2.5 rounded-full text-paper group-hover:translate-x-1 transition-transform"
            style={{ background: "var(--accent)" }}
          >
            Get it on Google Play →
          </span>
        </div>
      </a>

      {/* Tower motif */}
      <div className="mb-8 rounded-2xl border border-line bg-paper-2 flex items-end justify-center px-6 pt-6">
        <TowerMotif />
      </div>

      {/* Feature bullets */}
      <section className="mb-10">
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="rounded-xl bg-paper-2 border border-line p-4"
            >
              <div className="text-xl mb-1">{f.icon}</div>
              <h3 className="text-sm font-bold text-ink mb-0.5">{f.label}</h3>
              <p className="text-xs text-ink-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA */}
      <div className="text-center mb-12">
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-bold px-6 py-3 rounded-full text-paper hover:opacity-90 transition-opacity"
          style={{ background: "var(--accent)" }}
        >
          Play free on Google Play
        </a>
      </div>

      <div className="text-center">
        <Link href="/" className="text-sm text-ink-3 hover:text-ink-2 transition-colors">
          ← Back to brain tests
        </Link>
      </div>
    </main>
  );
}
