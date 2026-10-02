import { DownloadSimple, Plus } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { CopyPrompt } from "@/components/CopyPrompt";
import { Cta } from "@/components/Cta";
import { MAX_DOWNLOADS } from "@/lib/config";
import { INSTALL_PROMPT } from "@/lib/install-prompt";
import { getRequest } from "@/lib/store";
import { readToken } from "@/lib/token";

export const metadata: Metadata = { title: "Dein Zugang | Jacobilicious" };
export const dynamic = "force-dynamic";

const install = [
  { n: "01", title: "Claude Code öffnen", text: "Starte auf deinem Mac eine neue Sitzung in Claude Code." },
  {
    n: "02",
    title: "Prompt einfügen",
    text: "Kopiere den Prompt und schick ihn ab. Claude holt das Paket aus deinem Ordner Downloads und installiert es. Fragt Claude oder dein Mac nach Erlaubnis, stimme zu.",
    prompt: true,
  },
  {
    n: "03",
    title: "Setup tippen",
    text: "Tippe /jacobilicious-setup. Kennt Claude den Befehl noch nicht, starte eine neue Sitzung.",
  },
];

export default async function Freischalten({ searchParams }: PageProps<"/freischalten">) {
  const params = await searchParams;
  const token = typeof params.t === "string" ? params.t : "";
  const id = readToken(token, "dl");
  const rec = id ? await getRequest(id) : null;
  const open = rec?.status === "approved";

  return (
    <div className="glass min-h-[100dvh]">
      <header className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
        <Link href="/" className="text-[1.15rem] font-semibold tracking-[-0.05em]">
          Jacobilicious
        </Link>
      </header>
      <main className="mx-auto max-w-2xl px-5 pb-20 pt-6 sm:px-8 sm:pt-12">
        {!rec || !open ? (
          <div className="frame p-6 sm:p-9">
            <h1 className="h-section">Dieser Link gilt nicht mehr.</h1>
            <p className="lede mt-4">Er ist abgelaufen oder wurde gesperrt. Öffne deinen Zugang neu mit deiner E-Mail-Adresse.</p>
            <Cta className="mt-8" />
          </div>
        ) : (
          <div className="frame p-6 sm:p-9">
            <p className="label">Persönlicher Zugang für {rec.email}</p>
            <h1 className="h-section mt-4">Willkommen, {rec.name}.</h1>
            {rec.downloads >= MAX_DOWNLOADS ? (
              <p className="lede mt-4">
                Du hast das Paket schon {MAX_DOWNLOADS} Mal geladen. Mehr geht nicht. Schreib Jacob, wenn du es noch einmal
                brauchst.
              </p>
            ) : (
              <>
                <p className="lede mt-4">
                  Lade das Paket auf deinem Mac. Du hast noch {MAX_DOWNLOADS - rec.downloads}{" "}
                  {MAX_DOWNLOADS - rec.downloads === 1 ? "Download" : "Downloads"}.
                </p>
                {params.e === "limit" && (
                  <p role="alert" className="mt-4 rounded-lg bg-canvas px-4 py-3 font-medium">
                    Das Limit ist erreicht.
                  </p>
                )}
                <form method="post" action="/api/download" className="mt-8">
                  <input type="hidden" name="t" value={token} />
                  <button type="submit" className="spark inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold tracking-[-0.02em]">
                    <DownloadSimple size={18} weight="bold" aria-hidden />
                    Paket laden
                  </button>
                </form>
              </>
            )}

            <ol className="mt-12 grid gap-7 border-t border-line pt-8">
              {install.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="disc h-11 w-11 shrink-0 text-[0.75rem]">{s.n}</span>
                  <div className="min-w-0">
                    <h2 className="font-semibold tracking-[-0.02em]">{s.title}</h2>
                    <p className="mt-1 text-mute">{s.text}</p>
                    {s.prompt && <CopyPrompt text={INSTALL_PROMPT} />}
                  </div>
                </li>
              ))}
            </ol>
            <details className="mt-8 border-t border-line pt-5 text-[0.9rem] text-mute">
              <summary className="flex items-center justify-between gap-6 font-medium text-ink">
                Ohne Prompt installieren
                <Plus size={16} weight="bold" className="faq-plus shrink-0 transition-transform" aria-hidden />
              </summary>
              <p className="mt-3">
                Entpacke die geladene Datei per Doppelklick. Öffne die App Terminal, tippe bash und ein Leerzeichen, zieh
                die Datei install.sh ins Fenster und drück Enter.
              </p>
            </details>
            <p className="mt-8 text-[0.85rem] leading-relaxed text-mute">
              Das Paket trägt deinen Namen. Bitte gib es nicht weiter. Wer es auch haben will, holt sich einen eigenen
              Zugang.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
