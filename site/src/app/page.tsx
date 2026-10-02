import { Plus } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Cta, KeepCode } from "@/components/Cta";
import { Reveal } from "@/components/Reveal";
import { legal } from "@/lib/config";

const gains = [
  {
    title: "Claude kennt dich.",
    text: "Rolle, Business, Ziele und Ton stehen einmal in einer Datei. Jede Sitzung liest sie. Du erklärst dich nie wieder.",
  },
  {
    title: "Jedes Dokument hat 1 Zuhause.",
    text: "Feste Ordner, jeder mit Inhaltsverzeichnis. Du und der Agent finden alles, ohne zu suchen.",
  },
  {
    title: "Nichts geht verloren.",
    text: "Dein Mac sichert jede Stunde privat auf GitHub. Du brauchst nie einen Git-Befehl.",
  },
];

const steps = [
  { n: "01", title: "Zugang holen", text: "Bewerte den Vortrag und trag deine Mail ein." },
  { n: "02", title: "Installieren", text: "Öffne den Link auf deinem Mac und starte die Installation." },
  { n: "03", title: "Setup tippen", text: "Ein Befehl in Claude Code führt dich durch den Rest." },
];

const faqs = [
  {
    q: "Was brauche ich?",
    a: "Einen Mac, Claude Code als Desktop-App oder im Terminal und ein GitHub-Konto. Beim GitHub-Konto hilft dir das Setup.",
  },
  {
    q: "Brauche ich Technikwissen?",
    a: "Nein. Jeder Schritt wird erklärt: was passiert, warum es so gebaut ist und was du davon hast.",
  },
  {
    q: "Warum soll ich den Vortrag bewerten?",
    a: "Jacob will wissen, wie der Vortrag ankam. Dein Feedback entscheidet mit, wer das Paket bekommt.",
  },
  {
    q: "Was passiert mit meinen Dateien?",
    a: "Sie bleiben auf deinem Mac und in deinen privaten GitHub-Repos. Das Setup überschreibt und löscht nichts.",
  },
];

export default function Home() {
  return (
    <>
      <KeepCode />
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-[1.15rem] font-semibold tracking-[-0.05em]">
          Jacobilicious
        </Link>
        <Link
          href="/zugang"
          className="rounded-full border border-ink px-4 py-1.5 text-[0.9rem] font-semibold tracking-[-0.02em] hover:bg-ink hover:text-white"
        >
          Zugang holen
        </Link>
      </header>

      <main>
        {/* hero: text left, the portrait behind fluted glass right */}
        <section className="glass">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-14 pt-8 sm:px-8 md:grid-cols-[1.25fr_1fr] md:pb-20 md:pt-14">
            <div>
              <p className="label">Für Unternehmer am Mac</p>
              <h1 className="h-hero mt-5 max-w-[11ch]">Ein Agent, der dein Business kennt.</h1>
              <p className="lede mt-6 max-w-[34ch]">
                Jacobilicious richtet Claude Code auf deinem Mac ein. Danach weiß der Agent, wer du bist und wo jedes
                Dokument liegt.
              </p>
              <Cta spark className="mt-9" />
            </div>
            <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
              <Image
                src="/jacob-fluted.webp"
                alt="Jacob, Founder at scalable.so, hinter Riffelglas"
                width={1080}
                height={1285}
                priority
                sizes="(min-width: 768px) 40vw, 420px"
                className="h-auto w-full select-none"
              />
            </div>
          </div>
        </section>

        {/* what changes: three plain rows */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="h-section max-w-[16ch]">Drei Dinge, die danach anders sind.</h2>
          </Reveal>
          <div className="mt-10 md:mt-14">
            {gains.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <div className="grid gap-2 border-t border-line py-7 md:grid-cols-[1fr_1.1fr] md:gap-10 md:py-9">
                  <h3 className="h-card">{g.title}</h3>
                  <p className="text-mute">{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* the 4 skills: one you type, three that start on their own */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <h2 className="h-section max-w-[18ch]">4 Skills. Nur einen startest du selbst.</h2>
              <p className="lede mt-4 max-w-[40ch]">Die anderen 3 starten von selbst, sobald du sie brauchst.</p>
            </Reveal>
            <div className="mt-12 grid gap-7 md:grid-cols-6">
              <Reveal className="md:col-span-4 md:row-span-2">
                <article className="flex h-full min-h-[300px] flex-col justify-between rounded-[calc(var(--u)*0.9)] bg-ink p-7 text-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] md:p-10">
                  <p className="label !text-faint">Du tippst</p>
                  <div>
                    <p className="font-mono text-[clamp(1.25rem,3.1vw,2.3rem)] tracking-[-0.02em]">
                      /jacobilicious-setup
                    </p>
                    <p className="mt-4 max-w-[46ch] text-neutral-300">
                      9 Schritte vom leeren Mac zum fertigen Arbeitsplatz. Jeder Schritt wird erklärt. Du kannst
                      jederzeit pausieren.
                    </p>
                  </div>
                </article>
              </Reveal>
              <Reveal delay={0.06} className="md:col-span-2">
                <article className="frame glass flex h-full flex-col justify-end p-6">
                  <h3 className="h-card">Context</h3>
                  <p className="mt-2 text-mute">
                    Legt Dokumente und Wissen an den richtigen Ort und hält die Verzeichnisse aktuell.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.12} className="md:col-span-2">
                <article className="frame flex h-full flex-col justify-end p-6">
                  <h3 className="h-card">Audit</h3>
                  <p className="mt-2 text-mute">
                    Prüft, ob alles gesichert ist, und findet, was deine Sitzungen langsam macht.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.06} className="md:col-span-6">
                <article className="frame grid h-full gap-2 p-6 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10">
                  <h3 className="h-card">Engineer</h3>
                  <p className="text-mute">
                    Macht aus einer Aufgabe, die du zum zweiten Mal erklärst, einen Skill oder eine Regel für deinen Agenten.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* the way in: one rail, three discs */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="h-section">In 3 Schritten startklar.</h2>
          </Reveal>
          <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            <div aria-hidden className="absolute left-6 top-6 hidden h-px w-[calc(66.6%+1.5rem)] bg-faint md:block" />
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="relative flex gap-5 md:block">
                  <span className={`disc h-12 w-12 shrink-0 text-[0.8rem] ${i === 2 ? "disc-ink" : ""}`}>{s.n}</span>
                  <div className="md:mt-6">
                    <h3 className="h-card">{s.title}</h3>
                    <p className="mt-2 max-w-[30ch] text-mute">{s.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* who is behind it */}
        <section className="border-y border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center md:gap-12 md:py-16">
            <Image
              src="/jacob-avatar.jpg"
              alt="Jacob"
              width={480}
              height={480}
              className="h-28 w-28 shrink-0 rounded-full object-cover shadow-[var(--frame)]"
            />
            <div>
              <p className="max-w-[40ch] text-[calc(var(--u)*1.35)] font-medium leading-[1.3] tracking-[-0.03em]">
                Jacobilicious ist das Alter Ego von Jacob. Der Aufbau stammt aus seinen eigenen Repos.
              </p>
              <p className="label mt-4">Jacob, Founder at scalable.so</p>
            </div>
          </div>
        </section>

        {/* questions */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
          <h2 className="h-section">Kurz gefragt.</h2>
          <div className="mt-8 border-b border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-line">
                <summary className="flex items-center justify-between gap-6 py-5 text-[calc(var(--u)*1.15)] font-semibold tracking-[-0.025em]">
                  {f.q}
                  <Plus size={18} weight="bold" className="faq-plus shrink-0 transition-transform" aria-hidden />
                </summary>
                <p className="max-w-[58ch] pb-6 text-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* the one ask */}
        <section className="glass border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <h2 className="h-hero">
              <span className="block">Bewerte den Vortrag.</span>
              <span className="block text-mute">Hol dir das Paket.</span>
            </h2>
            <Cta spark className="mt-9" />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-[0.9rem] text-mute sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            Set up with Jacobilicious, Founder at{" "}
            <a href="https://scalable.so" className="text-ink underline underline-offset-4">
              scalable.so
            </a>
          </p>
          <nav className="flex gap-6">
            <a href={legal.imprint} className="hover:text-ink">
              Impressum
            </a>
            <a href={legal.privacy} className="hover:text-ink">
              Datenschutz
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
