import { BASE_PATH, PUBLIC_URL } from "./config";

/** The public address of this deployment, taken from the request. SITE_URL wins when set. */
export function originOf(req: Request | Headers): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = req instanceof Headers ? req : req.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:9200";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/**
 * The address of the site itself. Production always answers with 110x.ai/jacobilicious:
 * behind the 110x.ai rewrite the request host is jacobilicious.vercel.app.
 */
export const siteUrl = (req: Request | Headers): string =>
  process.env.VERCEL_ENV === "production" && !process.env.SITE_URL ? PUBLIC_URL : `${originOf(req)}${BASE_PATH}`;
