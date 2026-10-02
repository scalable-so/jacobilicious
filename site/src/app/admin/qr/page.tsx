import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { isAdmin } from "@/lib/admin";
import { originOf } from "@/lib/origin";

export const metadata: Metadata = { title: "QR-Folie | Jacobilicious" };
export const dynamic = "force-dynamic";

// One 16:9 frame for the talk. Open it full screen or take a screenshot for the deck.
export default async function QrSlide() {
  if (!(await isAdmin())) redirect("/admin");
  const origin = originOf(await headers());
  const svg = await QRCode.toString(origin, { type: "svg", margin: 0, errorCorrectionLevel: "M" });
  const host = origin.replace(/^https?:\/\//, "");

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-canvas p-4">
      <div className="glass relative aspect-video w-full max-w-[1600px] overflow-hidden bg-white [container-type:inline-size]">
        <div className="absolute inset-0 grid grid-cols-[1.2fr_1fr] items-center gap-[4cqw] p-[6.8cqw]">
          <div>
            <p className="label !text-[1cqw]">Das Setup zum Vortrag</p>
            <h1 className="mt-[1.6cqw] text-[6.8cqw] font-semibold leading-none tracking-[-0.055em]">Scannen. Bewerten. Loslegen.</h1>
            <p className="mt-[2.6cqw] text-[2.2cqw] leading-tight tracking-[-0.03em] text-mute">
              {host}
            </p>
          </div>
          <div className="frame justify-self-end p-[2.2cqw] [--u:1.6cqw]">
            <div className="w-[26cqw] [&>svg]:block [&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        </div>
        <p className="label absolute bottom-[1.6cqw] left-[1.6cqw] !text-[0.95cqw] !text-faint">Jacob, Founder at scalable.so</p>
      </div>
    </main>
  );
}
