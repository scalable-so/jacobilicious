import type { Metadata } from "next";
import Link from "next/link";
import { KeepCode } from "@/components/Cta";
import { Gate } from "@/components/Gate";
import { eventCode, legal } from "@/lib/config";

export const metadata: Metadata = { title: "Zugang holen | Jacobilicious" };
export const dynamic = "force-dynamic";

export default function Zugang() {
  return (
    <div className="glass min-h-[100dvh]">
      <KeepCode />
      <header className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
        <Link href="/" className="text-[1.15rem] font-semibold tracking-[-0.05em]">
          Jacobilicious
        </Link>
      </header>
      <main className="mx-auto max-w-xl px-5 pb-20 pt-6 sm:px-8 sm:pt-12">
        <Gate privacyUrl={legal.privacy} needsCode={Boolean(eventCode())} />
      </main>
    </div>
  );
}
