"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

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
