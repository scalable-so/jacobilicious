"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CopyPrompt({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="mt-4 rounded-2xl bg-canvas p-4 sm:p-5">
      <pre className="whitespace-pre-wrap font-mono text-[0.8rem] leading-relaxed text-ink">{text}</pre>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-semibold tracking-[-0.02em] text-white"
      >
        {done ? <Check size={16} weight="bold" aria-hidden /> : <Copy size={16} aria-hidden />}
        <span aria-live="polite">{done ? "Kopiert" : "Prompt kopieren"}</span>
      </button>
    </div>
  );
}
