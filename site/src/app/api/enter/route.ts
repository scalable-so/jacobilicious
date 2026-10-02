import { z } from "zod";
import { LINK_DAYS } from "@/lib/config";
import { getRequest } from "@/lib/store";
import { idForEmail, signToken } from "@/lib/token";

const Body = z.object({ email: z.string().trim().toLowerCase().pipe(z.email().max(200)) });

// Coming back: an approved address opens its package. Every other address gets
// the same answer, so this route does not tell who asked and who was turned down.
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "input" }, { status: 400 });
  // A fixed pause makes guessing addresses slow.
  await new Promise((r) => setTimeout(r, 500));
  const rec = await getRequest(idForEmail(parsed.data.email));
  if (!rec || rec.status !== "approved") return Response.json({ outcome: "none" });
  return Response.json({ outcome: "open", link: `/freischalten?t=${signToken("dl", rec.id, LINK_DAYS * 86400)}` });
}
