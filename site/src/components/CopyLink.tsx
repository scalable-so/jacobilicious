"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CopyLink({ link }: { link: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(link);
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.85rem] font-medium hover:border-ink"
    >
      {done ? <Check size={14} weight="bold" aria-hidden /> : <Copy size={14} aria-hidden />}
      {done ? "Kopiert" : "Link kopieren"}
    </button>
  );
}
