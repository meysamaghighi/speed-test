import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-ink-3">
          Free online speed tests. No account required. Your data stays in your browser.
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Link href="/about" className="text-sm text-ink-2 hover:text-ink underline">
            About
          </Link>
          <Link href="/family" className="text-sm text-ink-2 hover:text-ink underline">
            Family Scoreboard
          </Link>
        </div>
        <div className="mt-6">
          <p className="text-xs text-ink-3 mb-2 font-mono uppercase tracking-wider">
            Sibling sites
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="https://playmini.fun"
              className="px-4 py-1.5 border border-line rounded-full text-sm text-ink hover:bg-paper-2 transition-colors"
            >
              PlayMini · Browser games
            </Link>
            <Link
              href="https://doodlelab.fun?utm_source=benchmybrain&utm_medium=crosspromo&utm_content=footer"
              target="_blank"
              rel="noopener"
              className="px-4 py-1.5 border border-line rounded-full text-sm text-ink hover:bg-paper-2 transition-colors"
            >
              🎨 DoodleLab · Free drawing games
            </Link>
            <Link
              href="/stack-tower"
              className="px-4 py-1.5 border border-line rounded-full text-sm text-ink hover:bg-paper-2 transition-colors"
            >
              🗼 Stack Tower · Free Android game
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-ink-3 font-mono">© 2026 · made by Meysam</p>
      </div>
    </footer>
  );
}
