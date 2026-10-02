import { LINK_DAYS, MAX_DOWNLOADS, mailFrom, mailReady, ownerEmail, resendKey } from "./config";
import type { AccessRequest } from "./store";

export type Mail = { to: string; subject: string; text: string };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Plain text is the source. The HTML version only adds line breaks and links.
function toHtml(text: string): string {
  const body = esc(text)
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" style="color:#000">$1</a>')
    .replace(/\n/g, "<br>");
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#000;max-width:520px">${body}</div>`;
}

/** Sends through Resend. Returns false when no provider is set up or the call fails. */
export async function sendMail(mail: Mail): Promise<boolean> {
  if (!mailReady()) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey()}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: mailFrom(), to: [mail.to], subject: mail.subject, text: mail.text, html: toHtml(mail.text) }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function accessMail(rec: AccessRequest, link: string): Mail {
  return {
    to: rec.email,
    subject: "Dein Zugang zu Jacobilicious",
    text: [
      `Hi ${rec.name},`,
      "",
      "hier ist dein persönlicher Zugang zu Jacobilicious:",
      link,
      "",
      "Öffne den Link auf deinem Mac. Dort lädst du das Paket und siehst die 3 Schritte zum Start.",
      "",
      `Der Link gilt ${LINK_DAYS} Tage und für ${MAX_DOWNLOADS} Downloads. Er ist nur für dich, bitte gib ihn nicht weiter.`,
      "",
      "Viel Spaß beim Einrichten",
      "Jacob",
    ].join("\n"),
  };
}

export function ownerMail(rec: AccessRequest, adminUrl: string): Mail | null {
  const to = ownerEmail();
  if (!to) return null;
  const state = rec.status === "waitlist" ? "wartet auf deine Entscheidung" : "hat den Link per Mail bekommen";
  return {
    to,
    subject: `Jacobilicious: ${rec.rating}/10 von ${rec.name}`,
    text: [
      `${rec.name} <${rec.email}> ${state}.`,
      "",
      `Bewertung: ${rec.rating}/10`,
      `Feedback: ${rec.feedback || "(keins)"}`,
      `Updates erlaubt: ${rec.updates ? "ja" : "nein"}`,
      "",
      `Freigeben oder ablehnen: ${adminUrl}`,
    ].join("\n"),
  };
}
