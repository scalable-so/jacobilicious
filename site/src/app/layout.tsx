import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/geist-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jacobilicious",
  description:
    "Jacobilicious richtet Claude Code auf deinem Mac ein. Danach weiß der Agent, wer du bist und wo jedes Dokument liegt.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de">
      <body className="min-h-[100dvh]">{children}</body>
    </html>
  );
}
