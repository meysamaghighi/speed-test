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
};

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-3">
          About BenchMyBrain
        </h1>
        <p className="text-gray-400">
          Free brain testing for everyone. No sign-up, no gimmicks, no tracking.
        </p>
      </div>

      <section className="space-y-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-3">What Is This?</h2>
          <p className="text-gray-400 mb-3">
            BenchMyBrain is a free brain testing site with 40 interactive cognitive tests. Test your reaction time, memory, focus, spatial reasoning, typing speed, and more.
          </p>
          <p className="text-gray-400">
            All tests are original and custom-built for this site. Nothing is embedded from other platforms. Each test runs entirely in your browser with no server-side processing of your performance data.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-3">No Accounts Required</h2>
          <p className="text-gray-400 mb-3">
            You don't need to create an account or log in. Your personal bests are saved locally in your browser (localStorage) so you can track progress over time.
          </p>
          <p className="text-gray-400">
            We don't collect or store any personal information. No email addresses, no passwords, no profiles.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-3">Privacy & Data</h2>
          <p className="text-gray-400 mb-3">
            <strong className="text-white">Analytics:</strong> We use Google Analytics (GA4) to understand site usage -- which tests are popular, where visitors come from, device types, etc. This is anonymous and aggregated data only.
          </p>
          <p className="text-gray-400 mb-3">
            <strong className="text-white">No tracking cookies:</strong> Beyond Google Analytics, we don't use tracking pixels, third-party cookies, or behavioral tracking.
          </p>
          <p className="text-gray-400 mb-3">
            <strong className="text-white">Ads:</strong> We may show non-intrusive ads via Google AdSense to support hosting costs. No popups, no interstitials, no video ads.
          </p>
          <p className="text-gray-400">
            <strong className="text-white">Your test data:</strong> All test scores and personal bests stay in your browser. We never see or store your individual performance.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-3">Who Built This?</h2>
          <p className="text-gray-400 mb-3">
            BenchMyBrain is built and maintained by <strong className="text-white">MeyDev</strong>, an independent developer creating free tools, games, and productivity apps.
          </p>
          <p className="text-gray-400 mb-3">
            Check out our other projects:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
            <li><a href="https://cashcalcs.com" className="text-green-400 hover:text-green-300 transition-colors">CashCalcs</a> - Financial calculators and tools</li>
            <li><a href="https://playmini.fun" className="text-purple-400 hover:text-purple-300 transition-colors">PlayMini</a> - 30+ browser games</li>
            <li><a href="https://doodlelab.fun" className="text-pink-400 hover:text-pink-300 transition-colors">DoodleLab</a> - Drawing and creative games</li>
          </ul>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
          <p className="text-gray-400 mb-2">
            Questions, feedback, or bug reports? Email us:
          </p>
          <p className="text-gray-400">
            <a href="mailto:meydev.studio@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">meydev.studio@gmail.com</a>
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-3">Open Source & Free Forever</h2>
          <p className="text-gray-400">
            BenchMyBrain is free and will always be free. No premium tiers, no paywalls, no "unlock full results" upsells. We believe everyone should have access to brain training and cognitive testing tools.
          </p>
        </div>
      </section>
    </main>
  );
}
