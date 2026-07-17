// Maps a document.referrer URL to a normalized AI-assistant source label,
// or null if the referrer is not a known AI assistant.

const AI_SOURCE_BY_HOST: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "gemini.google.com": "gemini",
  "bard.google.com": "gemini",
  "claude.ai": "claude",
  "copilot.microsoft.com": "copilot",
  "you.com": "you",
  "poe.com": "poe",
  "grok.com": "grok",
  "x.ai": "grok",
};

export function detectAiSource(referrer: string): string | null {
  if (!referrer) return null;

  let hostname: string;
  try {
    hostname = new URL(referrer).hostname;
  } catch {
    return null;
  }

  hostname = hostname.toLowerCase();
  if (hostname.startsWith("www.")) {
    hostname = hostname.slice(4);
  }

  return AI_SOURCE_BY_HOST[hostname] ?? null;
}
