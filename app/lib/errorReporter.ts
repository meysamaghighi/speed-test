export const MAX_EVENTS_PER_SESSION = 5;
export const MAX_LABEL_LENGTH = 100;
export const MAX_PATH_LENGTH = 40;

/**
 * Collapse a raw error message to a stable identity.
 *
 * GA4 custom dimensions have a cardinality limit; unbounded strings would push
 * every distinct error into the "(other)" bucket and make the data useless. So
 * anything that varies between two occurrences of the SAME bug is removed:
 * absolute URLs, content-hashed bundle names, and line:column numbers.
 * Ordinary filenames (pop.mp3, analytics.js) are kept — they identify the bug.
 */
export function normalizeMessage(raw: string): string {
  return raw
    .replace(/https?:\/\/[^\s)]+/g, " ")
    .replace(/\b[\w-]*[0-9a-f]{8,}[\w-]*\.(?:js|css|mjs)\b/gi, " ")
    .replace(/:\d+:\d+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Build the `event_label` payload: path first, so truncation never costs us the location. */
export function buildLabel(path: string, message: string): string {
  const shortPath = path.slice(0, MAX_PATH_LENGTH);
  return `${shortPath}|${normalizeMessage(message)}`.slice(0, MAX_LABEL_LENGTH);
}

/** Per-session send budget: dedupes identical labels and caps total volume. */
export function createErrorBudget(max: number = MAX_EVENTS_PER_SESSION) {
  const seen = new Set<string>();
  let sent = 0;
  return {
    shouldSend(label: string): boolean {
      if (sent >= max) return false;
      if (seen.has(label)) return false;
      seen.add(label);
      sent += 1;
      return true;
    },
  };
}
