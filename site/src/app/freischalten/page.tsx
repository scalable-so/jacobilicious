import { DownloadSimple, Plus } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { CopyPrompt } from "@/components/CopyPrompt";
import { Cta } from "@/components/Cta";
import { BASE_PATH, MAX_DOWNLOADS } from "@/lib/config";
import { INSTALL_PROMPT } from "@/lib/install-prompt";
import { getRequest } from "@/lib/store";
import { readToken } from "@/lib/token";

export const metadata: Metadata = { title: "Your access | Jacobilicious" };
export const dynamic = "force-dynamic";

const install = [
  { n: "01", title: "Open Claude Code", text: "Start a new session in Claude Code on your computer." },
  {
    n: "02",
    title: "Paste the prompt",
    text: "Copy the prompt and send it. Claude takes the package from your Downloads folder and installs it. If Claude or your computer asks for permission, agree.",
    prompt: true,
  },
  {
    n: "03",
    title: "Type setup",
    text: "Type /jacobilicious-setup. If Claude does not know the command yet, start a new session.",
  },
];

export default async function Unlock({ searchParams }: PageProps<"/freischalten">) {
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
            <h1 className="h-section">This link is no longer valid.</h1>
            <p className="lede mt-4">It has expired or was blocked. Open your access again with your email address.</p>
            <Cta className="mt-8" />
          </div>
        ) : (
          <div className="frame p-6 sm:p-9">
            <p className="label">Personal access for {rec.email}</p>
            <h1 className="h-section mt-4">Welcome, {rec.name}.</h1>
            {rec.downloads >= MAX_DOWNLOADS ? (
              <p className="lede mt-4">
                You have already downloaded the package {MAX_DOWNLOADS} times. That is the limit. Write to Jacob if you
                need it again.
              </p>
            ) : (
              <>
                <p className="lede mt-4">
                  Download the package on your computer. You have {MAX_DOWNLOADS - rec.downloads}{" "}
                  {MAX_DOWNLOADS - rec.downloads === 1 ? "download" : "downloads"} left.
                </p>
                {params.e === "limit" && (
                  <p role="alert" className="mt-4 rounded-lg bg-canvas px-4 py-3 font-medium">
                    The limit is reached.
                  </p>
                )}
                <form method="post" action={`${BASE_PATH}/api/download`} className="mt-8">
                  <input type="hidden" name="t" value={token} />
                  <button type="submit" className="spark inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold tracking-[-0.02em]">
                    <DownloadSimple size={18} weight="bold" aria-hidden />
                    Download the package
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
                Install without the prompt
                <Plus size={16} weight="bold" className="faq-plus shrink-0 transition-transform" aria-hidden />
              </summary>
              <p className="mt-3">
                Unpack the downloaded file. Open a terminal (on Windows: Git Bash), type bash and a space, drag the file
                install.sh into the window and press Enter.
              </p>
            </details>
            <p className="mt-8 text-[0.85rem] leading-relaxed text-mute">
              The package carries your name. Please do not share it. Anyone else who wants it gets their own
              access.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
