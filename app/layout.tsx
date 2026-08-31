import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import AiReferralTracker from "./components/AiReferralTracker";
import ErrorReporter from "./components/ErrorReporter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benchmybrain.com"),
  title: "BenchMyBrain - Free Reaction Time, Typing Speed & Brain Tests",
  description:
    "Free online brain tests: reaction time, typing speed, number memory, trail making, go/no-go, n-back, hand-eye coordination, audio memory, aim trainer, click speed, chimp test, visual memory, pattern recognition, spatial rotation, rhythm timing. Compare with averages and share your scores.",
  openGraph: {
    title: "BenchMyBrain - Free Brain & Speed Tests",
    description:
      "30 free online tests: reaction time, typing speed, memory, trail making, go/no-go, n-back, hand-eye, audio memory, aim, pattern recognition, spatial rotation, rhythm, and more. No sign-up required.",
    type: "website",
    siteName: "BenchMyBrain",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-2621005924235240"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LN22YK2CZT"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LN22YK2CZT');` }} />
      </head>
      <body className="bg-paper text-ink min-h-screen font-body antialiased">
        <AiReferralTracker />
        <ErrorReporter />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
