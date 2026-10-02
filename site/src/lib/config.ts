// All settings come from environment variables. See .env.local.example.

export const THRESHOLD = 8; // rating from which access is given right away
export const LINK_DAYS = 7; // how long a personal link works
export const MAX_DOWNLOADS = 3; // downloads per personal link
export const MAX_MAILS = 3; // access mails per person

export function gateSecret(): string {
  const s = process.env.GATE_SECRET;
  if (!s || s.length < 32) throw new Error("GATE_SECRET is missing or shorter than 32 characters");
  return s;
}

export const eventCode = () => (process.env.EVENT_CODE ?? "").trim();
export const adminPin = () => (process.env.ADMIN_PIN ?? "").trim();
export const ownerEmail = () => (process.env.OWNER_EMAIL ?? "").trim();
export const mailFrom = () => (process.env.MAIL_FROM ?? "").trim();
export const resendKey = () => (process.env.RESEND_API_KEY ?? "").trim();

/** "auto": a rating of 8 or more gets the link by mail at once. "manual": Jacob approves everyone. */
export const accessMode = (): "auto" | "manual" =>
  process.env.ACCESS_MODE === "manual" ? "manual" : "auto";

export const mailReady = () => Boolean(resendKey() && mailFrom());

/** Without a mail provider, non-production deployments show the mail on screen so the flow can be reviewed. */
export const previewMail = () => !mailReady() && process.env.VERCEL_ENV !== "production";

export const legal = {
  imprint: process.env.NEXT_PUBLIC_IMPRINT_URL ?? "https://scalable.so/legal/imprint",
  privacy: process.env.NEXT_PUBLIC_PRIVACY_URL ?? "https://scalable.so/legal/privacy",
};
