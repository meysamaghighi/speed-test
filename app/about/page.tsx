import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BenchMyBrain - Free Brain & Cognitive Tests",
  description:
    "Learn about BenchMyBrain: 40 free, original brain tests built by MeyDev. No accounts, no personal data, no downloads. Test your reaction time, memory, focus, and more.",
  openGraph: {
    title: "About BenchMyBrain - Free Brain Tests",
    description: "40 free, original cognitive tests. No accounts, no personal data, no downloads.",
    type: "website",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1
          className="font-display text-4xl md:text-5xl text-ink mb-3"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          About BenchMyBrain
        </h1>
        <p className="text-ink-2">
          Free brain testing for everyone. No sign-up, no gimmicks, no tracking.
        </p>
      </div>

      <section className="space-y-6">
        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <h2 className="text-xl font-bold text-ink mb-3">What Is This?</h2>
          <p className="text-ink-2 mb-3">
            BenchMyBrain is a free brain testing site with 41 interactive cognitive tests &mdash; 40 that feed your overall Brain Score, plus a color vision screening. Test your reaction time, memory, focus, spatial reasoning, typing speed, and more.
          </p>
          <p className="text-ink-2">
            All tests are original and custom-built for this site. Nothing is embedded from other platforms. Each test runs entirely in your browser with no server-side processing of your performance data.
          </p>
        </div>

        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <h2 className="text-xl font-bold text-ink mb-3">No Accounts Required</h2>
          <p className="text-ink-2 mb-3">
            You don&apos;t need to create an account or log in. Your personal bests are saved locally in your browser (localStorage) so you can track progress over time.
          </p>
          <p className="text-ink-2">
            We don&apos;t collect or store any personal information. No email addresses, no passwords, no profiles.
          </p>
        </div>

        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <h2 className="text-xl font-bold text-ink mb-3">Privacy &amp; Data</h2>
          <p className="text-ink-2 mb-3">
            <strong className="text-ink">Analytics:</strong> We use Google Analytics (GA4) to understand site usage &mdash; which tests are popular, where visitors come from, device types, etc. This is anonymous and aggregated data only.
          </p>
          <p className="text-ink-2 mb-3">
            <strong className="text-ink">No tracking cookies:</strong> Beyond Google Analytics, we don&apos;t use tracking pixels, third-party cookies, or behavioral tracking.
          </p>
          <p className="text-ink-2 mb-3">
            <strong className="text-ink">Payments:</strong> Everything is free. If you choose to support the site with an optional donation, it&apos;s processed by Stripe — we never see your card details, and it&apos;s never required to use anything.
          </p>
          <p className="text-ink-2">
            <strong className="text-ink">Your test data:</strong> All test scores and personal bests stay in your browser. We never see or store your individual performance.
          </p>
        </div>

        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <h2 className="text-xl font-bold text-ink mb-3">Who Built This?</h2>
          <p className="text-ink-2 mb-3">
            BenchMyBrain is built and maintained by <strong className="text-ink">MeyDev</strong>, an independent developer creating free tools, games, and productivity apps.
          </p>
          <p className="text-ink-2 mb-3">Check out our sibling sites:</p>
          <ul className="list-disc list-inside text-ink-2 space-y-1 ml-2">
            <li>
              <a href="https://playmini.fun" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>PlayMini</a>
              <span> &mdash; 30+ browser games</span>
            </li>
            <li>
              <a href="https://doodlelab.fun" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>DoodleLab</a>
              <span> &mdash; drawing and creative games</span>
            </li>
          </ul>
        </div>

        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <h2 className="text-xl font-bold text-ink mb-3">Contact</h2>
          <p className="text-ink-2 mb-2">
            Questions, feedback, or bug reports? Email us:
          </p>
          <p className="text-ink-2">
            <a href="mailto:meydev.studio@gmail.com" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>meydev.studio@gmail.com</a>
          </p>
        </div>

        <div className="bg-paper-2 rounded-xl p-6 border border-line">
          <h2 className="text-xl font-bold text-ink mb-3">Free to Play, Forever</h2>
          <p className="text-ink-2">
            Every test on BenchMyBrain is free and always will be &mdash; no accounts, no test paywalls, no limits on plays. Your scores, personal bests, Brain Score, and the <strong className="text-ink">Full Cognitive Report</strong> (a detailed breakdown of your results) are all free too. If you find it useful, you can support the site with an optional donation &mdash; but nothing here is ever locked.
          </p>
        </div>
      </section>
    </main>
  );
}
