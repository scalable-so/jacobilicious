import { BASE_PATH } from "./config";

/** The public address of this deployment, taken from the request. SITE_URL wins when set. */
export function originOf(req: Request | Headers): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = req instanceof Headers ? req : req.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:9200";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** The address of the site itself: the origin plus the base path. */
export const siteUrl = (req: Request | Headers): string => `${originOf(req)}${BASE_PATH}`;
