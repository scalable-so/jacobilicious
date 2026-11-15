import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/geist-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jacobilicious",
  description:
    "Jacobilicious sets up Claude Code on your computer. After that, the agent knows who you are and where every document lives.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh]">{children}</body>
    </html>
  );
}
