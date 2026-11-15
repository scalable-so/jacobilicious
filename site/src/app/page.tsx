import { Plus } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/Reveal";
import { legal, REPO_URL } from "@/lib/config";

const gains = [
  {
    title: "Claude knows you.",
    text: "Role, business, goals and tone sit in 1 file. Every session reads it. You never explain yourself again.",
  },
  {
    title: "Every document has 1 home.",
    text: "Fixed folders, each with a table of contents. You and the agent find everything without searching.",
  },
  {
    title: "Nothing gets lost.",
    text: "Your computer saves privately to GitHub every hour. You never need a Git command.",
  },
];

const steps = [
  { n: "01", title: "Download the package", text: "Open the GitHub repo and download it with Code, then Download ZIP." },
  { n: "02", title: "Install", text: "Claude Code installs the package with 1 prompt from the README." },
  { n: "03", title: "Type setup", text: "1 command in Claude Code guides you through the rest." },
];

const faqs = [
  {
    q: "What do I need?",
    a: "A computer with macOS, Windows or Linux, Claude Code as the desktop app or in the terminal, and a GitHub account. The setup helps you with the GitHub account.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "No. Every step is explained: what happens, why it is built this way and what you gain from it.",
  },
  {
    q: "What happens to my files?",
    a: "They stay on your computer and in your private GitHub repos. The setup overwrites and deletes nothing.",
  },
];

export default function Home() {
  return (
    <>
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-[1.15rem] font-semibold tracking-[-0.05em]">
          Jacobilicious
        </Link>
        <a
          href={REPO_URL}
          className="rounded-full border border-ink px-4 py-1.5 text-[0.9rem] font-semibold tracking-[-0.02em] hover:bg-ink hover:text-white"
        >
          GitHub
        </a>
      </header>

      <main>
        {/* hero: text left, the portrait behind fluted glass right */}
        <section className="glass">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-14 pt-8 sm:px-8 md:grid-cols-[1.25fr_1fr] md:pb-20 md:pt-14">
            <div>
              <p className="label">For business owners</p>
              <h1 className="h-hero mt-5">
                <span className="block max-w-[11ch]">An agent setup built to scale.</span>
                <span className="block text-mute">Finally.</span>
              </h1>
              <p className="lede mt-6 max-w-[34ch]">
                Jacobilicious sets up Claude Code on your computer. After that, the agent knows who you are and where
                every document lives.
              </p>
              <Cta spark className="mt-9" />
            </div>
            <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
              <Image
                src="/jacob-fluted.webp"
                alt="Jacob, Founder at scalable.so, behind fluted glass"
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
            <h2 className="h-section max-w-[16ch]">3 things that change after setup.</h2>
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

        {/* the 5 skills: one you type, four that start on their own */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <h2 className="h-section max-w-[18ch]">5 skills. You start only 1 yourself.</h2>
              <p className="lede mt-4 max-w-[40ch]">The other 4 start on their own when you need them.</p>
            </Reveal>
            <div className="mt-12 grid gap-7 md:grid-cols-6">
              <Reveal className="md:col-span-4 md:row-span-2">
                <article className="flex h-full min-h-[300px] flex-col justify-between rounded-[calc(var(--u)*0.9)] bg-ink p-7 text-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] md:p-10">
                  <p className="label !text-faint">You type</p>
                  <div>
                    <p className="font-mono text-[clamp(1.25rem,3.1vw,2.3rem)] tracking-[-0.02em]">
                      /jacobilicious-setup
                    </p>
                    <p className="mt-4 max-w-[46ch] text-neutral-300">
                      9 steps from a bare computer to a ready workspace. Every step is explained. You can pause
                      at any time.
                    </p>
                  </div>
                </article>
              </Reveal>
              <Reveal delay={0.06} className="md:col-span-2">
                <article className="frame glass flex h-full flex-col justify-end p-6">
                  <p className="font-mono text-[0.8rem] text-mute">/jacobilicious</p>
                  <h3 className="h-card mt-1">Context</h3>
                  <p className="mt-2 text-mute">
                    Puts documents and knowledge in the right place and keeps the tables of contents current.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.12} className="md:col-span-2">
                <article className="frame flex h-full flex-col justify-end p-6">
                  <p className="font-mono text-[0.8rem] text-mute">/jacobilicious</p>
                  <h3 className="h-card mt-1">Audit</h3>
                  <p className="mt-2 text-mute">
                    Checks that everything is saved and finds what makes your sessions slow.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.06} className="md:col-span-3">
                <article className="frame flex h-full flex-col justify-end p-6">
                  <p className="font-mono text-[0.8rem] text-mute">/jacobilicious</p>
                  <h3 className="h-card mt-1">Engineer</h3>
                  <p className="mt-2 text-mute">
                    Turns a task you explain for the 2nd time into a skill or a rule for your agent.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.12} className="md:col-span-3">
                <article className="frame glass flex h-full flex-col justify-end p-6">
                  <p className="font-mono text-[0.8rem] text-mute">/jacobilicious</p>
                  <h3 className="h-card mt-1">AI-native</h3>
                  <p className="mt-2 text-mute">
                    Scores your setup out of 100 and shows the next steps, best first.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* the way in: one rail, three discs */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="h-section">Ready in 3 steps.</h2>
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
                Jacobilicious is the alter ego of Jacob. The setup comes from his own repos.
              </p>
              <p className="label mt-4">Jacob, Founder at scalable.so</p>
            </div>
          </div>
        </section>

        {/* questions */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
          <h2 className="h-section">Quick questions.</h2>
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
              <span className="block">Free on GitHub.</span>
              <span className="block text-mute">Get the package.</span>
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
              Imprint
            </a>
            <a href={legal.privacy} className="hover:text-ink">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
