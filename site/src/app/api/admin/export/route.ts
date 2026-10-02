import { isAdmin } from "@/lib/admin";
import { listRequests } from "@/lib/store";

const cell = (v: unknown) => {
  let s = String(v ?? "");
  // A leading = + - @ would run as a formula in a spreadsheet.
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new Response("Not found", { status: 404 });
  const cols = ["createdAt", "name", "email", "rating", "feedback", "updates", "status", "decidedBy", "decidedAt", "downloads", "lastDownloadAt"] as const;
  const rows = (await listRequests()).map((r) => cols.map((c) => cell(r[c])).join(","));
  return new Response([cols.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="jacobilicious-anfragen.csv"',
      "Cache-Control": "no-store",
    },
  });
}
