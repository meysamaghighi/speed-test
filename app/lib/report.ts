// Cognitive Report: faculty grouping + unlock helpers.
// Faculty mapping mirrors the home page grouping (single place to update if tests move).

export type Faculty = "reflex" | "memory" | "logic" | "attention" | "verbal" | "spatial";

export const FACULTY_ORDER: Faculty[] = ["reflex", "memory", "logic", "attention", "verbal", "spatial"];

export const FACULTY_LABEL: Record<Faculty, string> = {
  reflex: "Reflex",
  memory: "Memory",
  logic: "Logic",
  attention: "Attention",
  verbal: "Verbal",
  spatial: "Spatial",
};

export const FACULTY_BLURB: Record<Faculty, string> = {
  reflex: "Speed of motor and perceptual response",
  memory: "Encoding, holding and recalling information",
  logic: "Reasoning, math and pattern inference",
  attention: "Focus, impulse control and divided attention",
  verbal: "Word recognition, reading and language",
  spatial: "Mental rotation and visuospatial reasoning",
};

export const FACULTY_OF: Record<string, Faculty> = {
  "/reaction": "reflex",
  "/typing": "reflex",
  "/aim": "reflex",
  "/click-speed": "reflex",
  "/hand-eye": "reflex",
  "/rhythm": "reflex",
  "/anticipation": "reflex",

  "/chimp": "memory",
  "/memory": "memory",
  "/visual-memory": "memory",
  "/sequence": "memory",
  "/reverse-memory": "memory",
  "/digit-span": "memory",
  "/face-memory": "memory",
  "/audio-memory": "memory",
  "/color-memory": "memory",
  "/n-back": "memory",
  "/number-speed": "memory",
  "/math-memory": "memory",

  "/math": "logic",
  "/pattern": "logic",
  "/pattern-speed": "logic",
  "/number-comparison": "logic",
  "/estimation": "logic",

  "/stroop": "attention",
  "/peripheral": "attention",
  "/peripheral-test": "attention",
  "/color-match": "attention",
  "/focus-timer": "attention",
  "/trail-making": "attention",
  "/go-no-go": "attention",
  "/visual-search": "attention",
  "/dual-task": "attention",
  "/change-detection": "attention",
  "/emotion": "attention",

  "/verbal": "verbal",
  "/word-speed": "verbal",
  "/word-association": "verbal",
  "/reading": "verbal",

  "/rotation": "spatial",
  "/color-blind": "spatial",
};

export const UNLOCK_KEY = "bmb_report_unlocked";

// Public payment link — set NEXT_PUBLIC_STRIPE_PAYMENT_LINK in Vercel to enable the upsell.
export const PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "";

export function isUnlocked(): boolean {
  try {
    return localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

export function setUnlocked() {
  try {
    localStorage.setItem(UNLOCK_KEY, "1");
  } catch {}
}

export function track(event: string, params?: Record<string, unknown>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("event", event, params);
  } catch {}
}
