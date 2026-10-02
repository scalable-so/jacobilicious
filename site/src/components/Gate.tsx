"use client";

import { ArrowLeft, ArrowRight, Check, LockKeyOpen } from "@phosphor-icons/react";
import { type FormEvent, useEffect, useState } from "react";
import { storedCode } from "./Cta";

type Outcome = "open" | "waitlist" | "review" | "closed";

const errors: Record<string, string> = {
  code: "Der Code stimmt nicht. Er steht auf Jacobs Folie.",
  input: "Bitte prüfe Name und E-Mail-Adresse.",
  net: "Das hat nicht geklappt. Bitte versuch es noch einmal.",
  none: "Für diese Adresse ist noch kein Zugang offen.",
};

export function Gate({ privacyUrl, needsCode }: { privacyUrl: string; needsCode: boolean }) {
  const [step, setStep] = useState<"rate" | "details" | "enter" | "done">("rate");
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
  const [link, setLink] = useState<string | null>(null);

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
        setLink(data.link ?? null);
        setStep("done");
      }
    } catch {
      setError(errors.net);
    } finally {
      setBusy(false);
    }
  }

  // Coming back: an approved address opens its package without a new request.
  async function enter(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) setError(errors.input);
      else if (data.outcome === "open" && data.link) window.location.assign(data.link);
      else setError(errors.none);
    } catch {
      setError(errors.net);
    } finally {
      setBusy(false);
    }
  }

  const go = (to: "rate" | "details" | "enter") => {
    setError(null);
    setStep(to);
  };

  if (step === "done" && outcome) return <Done outcome={outcome} email={email} link={link} />;

  return (
    <div className="frame p-6 sm:p-9">
      {step !== "enter" && (
        <p className="label" aria-live="polite">
          {step === "rate" ? "Frage 1 von 2" : "Frage 2 von 2"}
        </p>
      )}

      {step === "rate" && (
        <div>
          <h1 className="h-section mt-4">Wie fandest du den Vortrag?</h1>
          <p className="mt-8 font-semibold tracking-[-0.02em]">Dein Score von 1 bis 10</p>
          <div role="radiogroup" aria-label="Dein Score von 1 bis 10" className="mt-3 grid grid-cols-5 gap-2.5 sm:grid-cols-10 sm:gap-2">
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

          {/* The same question for everyone, whatever the score. */}
          <div className="mt-8">
            <label htmlFor="feedback" className="block font-semibold tracking-[-0.02em]">
              Was kann Jacob beim nächsten Mal besser machen?
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
              disabled={rating === null}
              onClick={() => go("details")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold tracking-[-0.02em] text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Weiter
              <ArrowRight size={18} weight="bold" aria-hidden />
            </button>
          </div>
          <button type="button" onClick={() => go("enter")} className="mt-8 block text-[0.95rem] text-mute underline underline-offset-4 hover:text-ink">
            Schon angefragt? Zugang öffnen
          </button>
        </div>
      )}

      {step === "enter" && (
        <form onSubmit={enter}>
          <h1 className="h-section">Zugang öffnen.</h1>
          <p className="lede mt-4">Gib die E-Mail-Adresse ein, mit der du angefragt hast.</p>
          <label htmlFor="enter-email" className="mt-8 block font-semibold tracking-[-0.02em]">
            E-Mail-Adresse
          </label>
          <input
            id="enter-email"
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
          {error && (
            <p role="alert" className="mt-5 rounded-lg bg-canvas px-4 py-3 font-medium">
              {error}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold tracking-[-0.02em] text-white hover:bg-neutral-800 disabled:opacity-60"
            >
              {busy ? "Einen Moment" : "Öffnen"}
              {!busy && <ArrowRight size={18} weight="bold" aria-hidden />}
            </button>
            <button type="button" onClick={() => go("rate")} className="inline-flex items-center gap-1.5 text-[0.95rem] text-mute hover:text-ink">
              <ArrowLeft size={16} aria-hidden />
              Zurück
            </button>
          </div>
        </form>
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
            <button type="button" onClick={() => go("rate")} className="inline-flex items-center gap-1.5 text-[0.95rem] text-mute hover:text-ink">
              <ArrowLeft size={16} aria-hidden />
              Zurück
            </button>
          </div>
          <p className="mt-6 text-[0.85rem] leading-relaxed text-mute">
            Deine Angaben gehen an Jacob. Er nutzt sie, um dir den Zugang zu geben und dein Feedback zu lesen.{" "}
            <a href={privacyUrl} className="underline underline-offset-2 hover:text-ink">
              Datenschutz
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

function Done({ outcome, email, link }: { outcome: Outcome; email: string; link: string | null }) {
  const [host, setHost] = useState("");
  useEffect(() => setHost(window.location.host), []);

  if (outcome === "open") {
    return (
      <div className="frame p-6 sm:p-9" aria-live="polite">
        <span className="disc disc-ink h-12 w-12">
          <LockKeyOpen size={22} aria-hidden />
        </span>
        <h1 className="h-section mt-6">Du bist drin.</h1>
        <p className="lede mt-4">
          Das Paket lädst du auf deinem Mac. Öffne dort <span className="text-ink">{host}</span> und gib{" "}
          <span className="inline-block max-w-full text-ink [overflow-wrap:anywhere]">{email}</span> ein.
        </p>
        {link && (
          <a href={link} className="spark mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold tracking-[-0.02em]">
            Ich bin am Mac
            <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
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
        Nach der Freigabe öffnest du es hier mit{" "}
        <span className="inline-block max-w-full text-ink [overflow-wrap:anywhere]">{email}</span>
      </p>
    </div>
  );
}
