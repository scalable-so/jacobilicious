import { z } from "zod";
import { LINK_DAYS, accessMode } from "@/lib/config";
import { firstStatus, outcomeFor } from "@/lib/decision";
import { type AccessRequest, getRequest, saveRequest } from "@/lib/store";
import { idForEmail, signToken } from "@/lib/token";

const Body = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().pipe(z.email().max(200)),
  rating: z.number().int().min(1).max(10),
  feedback: z.string().trim().max(2000).default(""),
  updates: z.boolean().default(false),
  website: z.string().max(200).default(""), // honeypot: people leave it empty
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "input" }, { status: 400 });
  const input = parsed.data;

  // A filled honeypot is a bot. Answer like a normal waitlist entry and store nothing.
  if (input.website) return Response.json({ outcome: "waitlist" });

  const id = idForEmail(input.email);
  const existing = await getRequest(id);

  // The first request counts. Asking again with a better rating changes nothing.
  const rec: AccessRequest = existing ?? {
    id,
    createdAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    rating: input.rating,
    feedback: input.feedback,
    updates: input.updates,
    status: firstStatus(input.rating, accessMode()),
    downloads: 0,
  };
  if (!existing) {
    if (rec.status === "approved") {
      rec.decidedBy = "auto";
      rec.decidedAt = rec.createdAt;
    }
    await saveRequest(rec);
  }

  const outcome = outcomeFor(rec.status, rec.rating);
  const link = outcome === "open" ? `/freischalten?t=${signToken("dl", rec.id, LINK_DAYS * 86400)}` : undefined;
  return Response.json({ outcome, link });
}
