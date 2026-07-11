import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Stack Tower | BenchMyBrain",
  description: "Privacy policy for the Stack Tower mobile game by MeyDev.",
  alternates: {
    canonical: "/privacy/stack-tower",
  },
};

export default function StackTowerPrivacy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-ink mb-2">
        Privacy Policy - Stack Tower
      </h1>
      <p className="text-sm text-ink-3 mb-8">Last updated: July 11, 2026</p>

      <div className="max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-ink mt-8 mb-3">
            Introduction
          </h2>
          <p className="text-ink-2 leading-relaxed">
            Stack Tower (&quot;the Game&quot;) is a mobile game developed by MeyDev
            (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). This privacy policy
            explains how we handle information when you use our Game.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mt-8 mb-3">
            Information We Collect
          </h2>
          <p className="text-ink-2 leading-relaxed">
            <strong className="text-ink">We do not collect any personal information directly.</strong> The
            Game does not require you to create an account, provide your name, email
            address, or any other personal details.
          </p>
          <p className="text-ink-2 leading-relaxed mt-3">
            All game data (high scores, coins, unlocked themes) is stored locally on
            your device using AsyncStorage and is never transmitted to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mt-8 mb-3">
            Third-Party Services
          </h2>
          <p className="text-ink-2 leading-relaxed">
            The Game uses the following third-party services that may collect
            information:
          </p>
          <h3 className="text-lg font-medium text-ink mt-4 mb-2">Google AdMob</h3>
          <p className="text-ink-2 leading-relaxed">
            We use Google AdMob to display advertisements (interstitial and rewarded
            ads). AdMob may collect and process certain data including:
          </p>
          <ul className="list-disc pl-6 text-ink-2 mt-2 space-y-1">
            <li>Device identifiers (advertising ID)</li>
            <li>IP address</li>
            <li>Device information (model, OS version)</li>
            <li>Ad interaction data</li>
          </ul>
          <p className="text-ink-2 leading-relaxed mt-3">
            For more information, see{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-emerald-500 underline hover:text-emerald-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mt-8 mb-3">
            Children&apos;s Privacy
          </h2>
          <p className="text-ink-2 leading-relaxed">
            The Game is not directed at children under the age of 13. We do not
            knowingly collect personal information from children. The ads shown may
            be personalized by Google based on their own data practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mt-8 mb-3">
            Data Retention
          </h2>
          <p className="text-ink-2 leading-relaxed">
            Since we do not collect personal data, there is no data retention on our
            end. Game progress stored locally on your device can be deleted by
            uninstalling the Game or clearing its app data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mt-8 mb-3">
            Changes to This Policy
          </h2>
          <p className="text-ink-2 leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be
            posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mt-8 mb-3">Contact Us</h2>
          <p className="text-ink-2 leading-relaxed">
            If you have any questions about this privacy policy, contact us at{" "}
            <a
              href="mailto:meydevapps@gmail.com"
              className="text-emerald-500 underline hover:text-emerald-400"
            >
              meydevapps@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
