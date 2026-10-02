"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect } from "react";

const KEY = "jl_code";

/** The event code arrives in the QR link as ?k=. Keep it for the form, then clean the address bar. */
export function KeepCode() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const k = url.searchParams.get("k");
    if (!k) return;
    sessionStorage.setItem(KEY, k);
    url.searchParams.delete("k");
    window.history.replaceState(null, "", url.pathname + url.search);
  }, []);
  return null;
}

export const storedCode = () => (typeof window === "undefined" ? "" : sessionStorage.getItem(KEY) ?? "");

export function Cta({ spark = false, className = "" }: { spark?: boolean; className?: string }) {
  const base =
    "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-semibold tracking-[-0.02em] transition-transform";
  const look = spark ? "spark" : "bg-ink text-white hover:bg-neutral-800";
  return (
    <Link href="/zugang" className={`${base} ${look} ${className}`}>
      Zugang holen
      <ArrowRight size={18} weight="bold" aria-hidden />
    </Link>
  );
}
