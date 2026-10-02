"use client";

import { ArrowLeft, ArrowRight, Check, EnvelopeSimple, Eye } from "@phosphor-icons/react";
import { type FormEvent, useEffect, useState } from "react";
import { storedCode } from "./Cta";

type Outcome = "mail" | "waitlist" | "review" | "closed";
type Preview = { subject: string; text: string; link: string };

const errors: Record<string, string> = {
  code: "Der Code stimmt nicht. Er steht auf Jacobs Folie.",
  input: "Bitte prüfe Name und E-Mail-Adresse.",
  net: "Das hat nicht geklappt. Bitte versuch es noch einmal.",
};

export function Gate({ privacyUrl, needsCode }: { privacyUrl: string; needsCode: boolean }) {
  const [step, setStep] = useState<"rate" | "details" | "done">("rate");
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [hasCode, setHasCode] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    const k = storedCode();
    if (k) {
      setCode(k);
      setHasCode(true);
    }
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (rating === null || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, rating, feedback, code, updates, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(errors[data.error] ?? errors.net);
        if (data.error === "code") setHasCode(false);
      } else {
        setOutcome(data.outcome);
        setPreview(data.preview ?? null);
        setStep("done");
      }
    } catch {
      setError(errors.net);
    } finally {
      setBusy(false);
    }
  }

  if (step === "done" && outcome) return <Done outcome={outcome} email={email} preview={preview} />;

  return (
    <div className="frame p-6 sm:p-9">
      <p className="label" aria-live="polite">
        {step === "rate" ? "Frage 1 von 2" : "Frage 2 von 2"}
      </p>

      {step === "rate" && (
        <div>
          <h1 className="h-section mt-4">Wie fandest du Jacobs Vortrag?</h1>
          <div role="radiogroup" aria-label="Bewertung von 1 bis 10" className="mt-8 grid grid-cols-5 gap-2.5 sm:grid-cols-10 sm:gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                onClick={() => setRating(n)}
                className={`disc aspect-square w-full text-[0.95rem] transition-transform hover:-translate-y-0.5 ${rating === n ? "disc-ink" : ""}`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="label mt-3 flex justify-between">
            <span>1 = schwach</span>
            <span>10 = stark</span>
          </div>

          {rating !== null && (
            <div className="mt-8">
              <label htmlFor="feedback" className="block font-semibold tracking-[-0.02em]">
                {rating >= 8 ? "Was nimmst du mit?" : "Was hat dir gefehlt?"}
              </label>
              <textarea
                id="feedback"
                rows={3}
                maxLength={2000}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Ein Satz reicht."
                className="field mt-2 resize-none"
              />
              <button
                type="button"
                onClick={() => setStep("details")}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold tracking-[-0.02em] text-white hover:bg-neutral-800"
              >
                Weiter
                <ArrowRight size={18} weight="bold" aria-hidden />
              </button>
            </div>
          )}
        </div>
      )}

      {step === "details" && (
        <form onSubmit={submit} noValidate={false}>
          <h1 className="h-section mt-4">Wohin soll der Zugang?</h1>
          <div className="mt-8 grid gap-5">
            <div>
              <label htmlFor="name" className="block font-semibold tracking-[-0.02em]">
                Vorname
              </label>
              <input id="name" required maxLength={80} autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className="field mt-2" />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold tracking-[-0.02em]">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@firma.de"
                className="field mt-2"
              />
            </div>
            {needsCode && !hasCode && (
              <div>
                <label htmlFor="code" className="block font-semibold tracking-[-0.02em]">
                  Code vom Vortrag
                </label>
                <input id="code" required maxLength={64} autoCapitalize="characters" value={code} onChange={(e) => setCode(e.target.value)} className="field mt-2 font-mono uppercase" />
                <p className="mt-1.5 text-[0.9rem] text-mute">Er steht auf Jacobs Folie.</p>
              </div>
            )}
            {/* honeypot: hidden from people, bots fill it */}
            <div className="hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-mute">
              <input type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-black" />
              Jacob darf mir schreiben, wenn es Neues zu Jacobilicious gibt.
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-5 rounded-lg bg-canvas px-4 py-3 font-medium">
              {error}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={busy}
              className="spark inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold tracking-[-0.02em] disabled:opacity-60"
            >
              {busy ? "Einen Moment" : "Zugang anfragen"}
              {!busy && <ArrowRight size={18} weight="bold" aria-hidden />}
            </button>
            <button type="button" onClick={() => setStep("rate")} className="inline-flex items-center gap-1.5 text-[0.95rem] text-mute hover:text-ink">
              <ArrowLeft size={16} aria-hidden />
              Zurück
            </button>
          </div>
          <p className="mt-6 text-[0.85rem] leading-relaxed text-mute">
            Deine Angaben gehen an Jacob. Er nutzt sie, um dir den Zugang zu schicken und dein Feedback zu lesen.{" "}
            <a href={privacyUrl} className="underline underline-offset-2 hover:text-ink">
              Datenschutz
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

function Done({ outcome, email, preview }: { outcome: Outcome; email: string; preview: Preview | null }) {
  if (outcome === "mail") {
    return (
      <div className="frame p-6 sm:p-9" aria-live="polite">
        <span className="disc disc-ink h-12 w-12">
          <EnvelopeSimple size={22} aria-hidden />
        </span>
        <h1 className="h-section mt-6">Schau in dein Postfach.</h1>
        <p className="lede mt-4">
          Dein persönlicher Link ist unterwegs an <span className="text-ink">{email}</span>. Öffne ihn auf deinem Mac.
        </p>
        {preview && (
          <div className="mt-8 rounded-xl border border-dashed border-faint p-5">
            <p className="label flex items-center gap-2">
              <Eye size={14} aria-hidden />
              Mail-Vorschau, nur in der Testumgebung
            </p>
            <p className="mt-3 font-semibold tracking-[-0.02em]">{preview.subject}</p>
            <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-[0.95rem] text-mute">{preview.text}</pre>
            <a href={preview.link} className="mt-4 inline-flex items-center gap-2 font-semibold underline underline-offset-4">
              Link öffnen
              <ArrowRight size={16} weight="bold" aria-hidden />
            </a>
          </div>
        )}
      </div>
    );
  }

  if (outcome === "closed") {
    return (
      <div className="frame p-6 sm:p-9" aria-live="polite">
        <h1 className="h-section">Für diese Adresse ist kein Zugang offen.</h1>
        <p className="lede mt-4">Wenn du glaubst, dass das ein Fehler ist, schreib Jacob direkt.</p>
      </div>
    );
  }

  const waitlist = outcome === "waitlist";
  return (
    <div className="frame p-6 sm:p-9" aria-live="polite">
      {/* done, now, next: the feedback is in, Jacob reads it, the decision follows */}
      <div className="grid max-w-md grid-cols-3" aria-hidden>
        <div>
          <div className="flex items-center">
            <span className="wl-disc disc disc-ink h-12 w-12 shrink-0" style={{ animationDelay: "0.1s" }}>
              <Check size={20} weight="bold" />
            </span>
            <span className="wl-wire h-px flex-1 bg-faint" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="label mt-3 whitespace-nowrap max-sm:!text-[10px]">Feedback</p>
        </div>
        <div>
          <div className="flex items-center">
            <span className="wl-now disc h-12 w-12 shrink-0 text-[0.8rem]" style={{ animationDelay: "1.1s" }}>
              02
            </span>
            <span className="wl-wire h-px flex-1 border-t border-dashed border-faint" style={{ animationDelay: "1.5s" }} />
          </div>
          <p className="label mt-3 whitespace-nowrap max-sm:!text-[10px]">Jacob liest</p>
        </div>
        <div>
          <span className="wl-disc disc h-12 w-12 text-[0.8rem] text-faint" style={{ animationDelay: "2s" }}>
            03
          </span>
          <p className="label mt-3 whitespace-nowrap max-sm:!text-[10px]">Entscheidung</p>
        </div>
      </div>
      <h1 className="h-section mt-8">{waitlist ? "Danke für dein ehrliches Feedback." : "Fast geschafft."}</h1>
      <p className="lede mt-4">
        {waitlist
          ? "Du stehst auf der Warteliste. Jacob liest dein Feedback und entscheidet dann, ob er das Paket für dich freigibt."
          : "Jacob gibt jeden Zugang selbst frei."}{" "}
        Bei einer Freigabe kommt dein Link an <span className="inline-block max-w-full text-ink [overflow-wrap:anywhere]">{email}</span>
      </p>
    </div>
  );
}
