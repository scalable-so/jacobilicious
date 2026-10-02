import { MAX_DOWNLOADS } from "@/lib/config";
import { originOf } from "@/lib/origin";
import { getRequest, saveRequest } from "@/lib/store";
import { readToken } from "@/lib/token";
import { buildZip } from "@/lib/zip";

// POST, not GET: mail scanners follow links, and a followed link must not use up a download.
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = String(form?.get("t") ?? "");
  const id = readToken(token, "dl");
  const rec = id ? await getRequest(id) : null;
  const back = `${originOf(req)}/freischalten?t=${encodeURIComponent(token)}`;

  if (!rec || rec.status !== "approved") return Response.redirect(back, 303);
  if (rec.downloads >= MAX_DOWNLOADS) return Response.redirect(`${back}&e=limit`, 303);

  const now = new Date();
  const zip = buildZip(rec, now);
  rec.downloads += 1;
  rec.lastDownloadAt = now.toISOString();
  await saveRequest(rec);

  return new Response(Buffer.from(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="jacobilicious.zip"',
      "Content-Length": String(zip.byteLength),
      "Cache-Control": "no-store",
    },
  });
}
