import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { CopyLink } from "@/components/CopyLink";
import { isAdmin } from "@/lib/admin";
import { LINK_DAYS, MAX_DOWNLOADS, accessMode, adminPin } from "@/lib/config";
import type { Status } from "@/lib/decision";
import { originOf } from "@/lib/origin";
import { listRequests } from "@/lib/store";
import { signToken } from "@/lib/token";
import { approve, login, logout, reject } from "./actions";

export const metadata: Metadata = { title: "Admin | Jacobilicious" };
export const dynamic = "force-dynamic";

const statusLabel: Record<Status, string> = {
  waitlist: "Wartet",
  approved: "Freigegeben",
  rejected: "Gesperrt",
};

const day = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });

export default async function Admin({ searchParams }: PageProps<"/admin">) {
  const params = await searchParams;

  if (!adminPin()) {
    return (
      <Shell>
        <h1 className="h-section">Admin ist aus.</h1>
        <p className="lede mt-4">Setze die Umgebungsvariable ADMIN_PIN, dann geht diese Seite an.</p>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <h1 className="h-section">Admin</h1>
        <form action={login} className="mt-8 max-w-xs">
          <label htmlFor="pin" className="block font-semibold tracking-[-0.02em]">
            PIN
          </label>
          <input id="pin" name="pin" type="password" inputMode="numeric" autoComplete="current-password" required className="field mt-2 font-mono" />
          {params.e === "pin" && (
            <p role="alert" className="mt-3 font-medium">
              Die PIN stimmt nicht.
            </p>
          )}
          <button type="submit" className="mt-5 rounded-full bg-ink px-6 py-3 font-semibold tracking-[-0.02em] text-white hover:bg-neutral-800">
            Öffnen
          </button>
        </form>
      </Shell>
    );
  }

  const recs = await listRequests();
  const origin = originOf(await headers());
  const waiting = recs.filter((r) => r.status === "waitlist").length;
  const avg = recs.length ? (recs.reduce((s, r) => s + r.rating, 0) / recs.length).toFixed(1) : "0";
  const stats = [
    { label: "Anfragen", value: String(recs.length) },
    { label: "Warten auf dich", value: String(waiting) },
    { label: "Bewertung im Schnitt", value: avg },
    { label: "Downloads", value: String(recs.reduce((s, r) => s + r.downloads, 0)) },
  ];

  return (
    <Shell wide>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="h-section">Anfragen</h1>
        <div className="flex flex-wrap gap-2 text-[0.9rem] font-medium">
          <Link href="/admin/qr" className="rounded-full border border-line px-4 py-2 hover:border-ink">
            QR-Folie
          </Link>
          <a href="/api/admin/export" className="rounded-full border border-line px-4 py-2 hover:border-ink">
            CSV laden
          </a>
          <form action={logout}>
            <button type="submit" className="rounded-full border border-line px-4 py-2 hover:border-ink">
              Abmelden
            </button>
          </form>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-line py-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="label">{s.label}</dt>
            <dd className="mt-1 text-[calc(var(--u)*2)] font-semibold tracking-[-0.05em]">{s.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-[0.9rem] text-mute">
        Modus: {accessMode() === "auto" ? "Ab 8 Punkten ist der Zugang sofort offen. Darunter entscheidest du." : "Du gibst jeden Zugang selbst frei."}{" "}
        Freigegebene öffnen das Paket auf der Seite mit ihrer E-Mail-Adresse. Den Link kannst du zusätzlich selbst schicken.
      </p>

      {recs.length === 0 ? (
        <p className="lede mt-12">Noch keine Anfragen.</p>
      ) : (
        <ul className="mt-8 grid gap-5">
          {recs.map((r) => {
            const link = `${origin}/freischalten?t=${signToken("dl", r.id, LINK_DAYS * 86400)}`;
            return (
              <li key={r.id} className="frame grid gap-4 p-5 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-6">
                <span className={`disc h-12 w-12 text-[0.95rem] ${r.status === "waitlist" ? "disc-ink" : ""}`}>{r.rating}</span>
                <div className="min-w-0">
                  <p className="font-semibold tracking-[-0.02em]">
                    {r.name} <span className="break-all font-normal text-mute">{r.email}</span>
                  </p>
                  {r.feedback && <p className="mt-1.5 whitespace-pre-wrap text-[0.95rem]">{r.feedback}</p>}
                  <p className="label mt-3">
                    {day(r.createdAt)} Uhr, {statusLabel[r.status]}
                    {r.decidedBy === "owner" ? " von dir" : ""}, {r.downloads}/{MAX_DOWNLOADS} Downloads
                    {r.updates ? ", Updates erlaubt" : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.status === "approved" && <CopyLink link={link} />}
                  {r.status !== "approved" && (
                    <form action={approve}>
                      <input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="rounded-full bg-ink px-4 py-1.5 text-[0.85rem] font-semibold text-white hover:bg-neutral-800">
                        Freigeben
                      </button>
                    </form>
                  )}
                  {r.status !== "rejected" && (
                    <form action={reject}>
                      <input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="rounded-full border border-line px-4 py-1.5 text-[0.85rem] font-medium hover:border-ink">
                        {r.status === "approved" ? "Sperren" : "Ablehnen"}
                      </button>
                    </form>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Shell>
  );
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-[100dvh]">
      <header className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
        <Link href="/" className="text-[1.15rem] font-semibold tracking-[-0.05em]">
          Jacobilicious
        </Link>
      </header>
      <main className={`mx-auto px-5 pb-20 pt-6 sm:px-8 sm:pt-10 ${wide ? "max-w-5xl" : "max-w-xl"}`}>{children}</main>
    </div>
  );
}
