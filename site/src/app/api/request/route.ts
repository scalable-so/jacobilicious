import { z } from "zod";
import { LINK_DAYS, MAX_MAILS, accessMode, eventCode, mailReady, previewMail } from "@/lib/config";
import { firstStatus, outcomeFor } from "@/lib/decision";
import { accessMail, ownerMail, sendMail } from "@/lib/mail";
import { originOf } from "@/lib/origin";
import { type AccessRequest, getRequest, saveRequest } from "@/lib/store";
import { idForEmail, signToken } from "@/lib/token";

const Body = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().pipe(z.email().max(200)),
  rating: z.number().int().min(1).max(10),
  feedback: z.string().trim().max(2000).default(""),
  code: z.string().trim().max(64).default(""),
  updates: z.boolean().default(false),
  website: z.string().max(200).default(""), // honeypot: people leave it empty
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "input" }, { status: 400 });
  const input = parsed.data;

  // A filled honeypot is a bot. Answer like a normal waitlist entry and store nothing.
  if (input.website) return Response.json({ outcome: "waitlist" });

  const expected = eventCode();
  if (expected && input.code.toLowerCase() !== expected.toLowerCase()) {
    return Response.json({ error: "code" }, { status: 403 });
  }

  const id = idForEmail(input.email);
  const existing = await getRequest(id);
  const canMail = mailReady() || previewMail();

  // The first request counts. Asking again with a better rating changes nothing.
  const rec: AccessRequest = existing ?? {
    id,
    createdAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    rating: input.rating,
    feedback: input.feedback,
    updates: input.updates,
    status: firstStatus(input.rating, accessMode(), canMail),
    mailsSent: 0,
    downloads: 0,
  };

  const origin = originOf(req);
  let preview: { subject: string; text: string; link: string } | undefined;

  if ((rec.status === "verify" || rec.status === "approved") && rec.mailsSent < MAX_MAILS) {
    const link = `${origin}/freischalten?t=${signToken("dl", rec.id, LINK_DAYS * 86400)}`;
    const mail = accessMail(rec, link);
    if (previewMail()) {
      preview = { subject: mail.subject, text: mail.text, link };
      rec.mailsSent += 1;
    } else if (await sendMail(mail)) {
      rec.mailsSent += 1;
    } else if (!existing) {
      rec.status = "waitlist"; // the mail did not go out, so Jacob decides by hand
    }
  }

  await saveRequest(rec);

  if (!existing) {
    const note = ownerMail(rec, `${origin}/admin`);
    if (note) await sendMail(note);
  }

  return Response.json({ outcome: outcomeFor(rec.status, rec.rating), preview });
}
