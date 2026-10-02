// All settings come from environment variables. See .env.local.example.

export const THRESHOLD = 8; // rating from which access is open right away
export const LINK_DAYS = 7; // how long a personal link works
export const MAX_DOWNLOADS = 3; // downloads per person

export function gateSecret(): string {
  const s = process.env.GATE_SECRET;
  if (!s || s.length < 32) throw new Error("GATE_SECRET is missing or shorter than 32 characters");
  return s;
}

export const adminPin = () => (process.env.ADMIN_PIN ?? "").trim();

/** "auto": a rating of 8 or more opens access at once. "manual": Jacob approves everyone. */
export const accessMode = (): "auto" | "manual" =>
  process.env.ACCESS_MODE === "manual" ? "manual" : "auto";

export const legal = {
  imprint: process.env.NEXT_PUBLIC_IMPRINT_URL ?? "https://scalable.so/legal/imprint",
  privacy: process.env.NEXT_PUBLIC_PRIVACY_URL ?? "https://scalable.so/legal/privacy",
};
