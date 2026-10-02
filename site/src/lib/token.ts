import { createHmac, timingSafeEqual } from "node:crypto";
import { gateSecret } from "./config";

// Signed, expiring tokens. Nothing in them is secret; the signature proves we issued them.
// kind "dl" = personal download link, kind "adm" = admin session.
export type TokenKind = "dl" | "adm";
type Payload = { k: TokenKind; id: string; exp: number };

const b64 = (s: string | Buffer) => Buffer.from(s).toString("base64url");
const sig = (body: string) => createHmac("sha256", gateSecret()).update(body).digest("base64url");

export function signToken(kind: TokenKind, id: string, ttlSeconds: number, now = Date.now()): string {
  const body = b64(JSON.stringify({ k: kind, id, exp: Math.floor(now / 1000) + ttlSeconds } satisfies Payload));
  return `${body}.${sig(body)}`;
}

export function readToken(token: string | undefined | null, kind: TokenKind, now = Date.now()): string | null {
  if (!token) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  const want = Buffer.from(sig(body));
  const got = Buffer.from(mac);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString()) as Payload;
    if (p.k !== kind || typeof p.id !== "string" || p.exp * 1000 < now) return null;
    return p.id;
  } catch {
    return null;
  }
}

/** One stable id per email address, so a second request finds the first one. */
export function idForEmail(email: string): string {
  return createHmac("sha256", gateSecret()).update(`id:${email}`).digest("hex").slice(0, 24);
}

export function samePin(given: string, expected: string): boolean {
  const a = createHmac("sha256", gateSecret()).update(given).digest();
  const b = createHmac("sha256", gateSecret()).update(expected).digest();
  return expected.length > 0 && timingSafeEqual(a, b);
}
