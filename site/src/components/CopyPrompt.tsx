"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CopyPrompt({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  return (
    <div className="mt-4 rounded-2xl bg-canvas p-4 sm:p-5">
      <pre className="select-all whitespace-pre-wrap font-mono text-[0.8rem] leading-relaxed text-ink">{text}</pre>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setState("done");
            setTimeout(() => setState("idle"), 1800);
          } catch {
            setState("failed");
          }
        }}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-semibold tracking-[-0.02em] text-white"
      >
        {state === "done" ? <Check size={16} weight="bold" aria-hidden /> : <Copy size={16} aria-hidden />}
        <span aria-live="polite">{state === "done" ? "Kopiert" : "Prompt kopieren"}</span>
      </button>
      {state === "failed" && (
        <p role="alert" className="mt-3 text-[0.85rem] text-mute">
          Das Kopieren hat nicht geklappt. Klick auf den Text, dann ist er markiert, und kopiere ihn von Hand.
        </p>
      )}
    </div>
  );
}
