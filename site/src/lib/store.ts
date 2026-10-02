import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { get, list, put } from "@vercel/blob";
import type { Status } from "./decision";

// One JSON record per person, keyed by an id derived from the email address.
// On Vercel the records live in a private Blob store. Without a Blob token
// (local development) they live in .data/ inside the site folder.

export type AccessRequest = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  updates: boolean; // agreed to hear from Jacob again
  status: Status;
  decidedBy?: "auto" | "owner";
  decidedAt?: string;
  verifiedAt?: string; // first time the personal link was opened
  mailsSent: number;
  downloads: number;
  lastDownloadAt?: string;
};

const PREFIX = "requests/";
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const dataDir = () => join(process.cwd(), ".data", "requests");

export async function getRequest(id: string): Promise<AccessRequest | null> {
  if (!/^[a-f0-9]{24}$/.test(id)) return null;
  if (useBlob()) {
    const res = await get(`${PREFIX}${id}.json`, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return null;
    return (await new Response(res.stream).json()) as AccessRequest;
  }
  try {
    return JSON.parse(await readFile(join(dataDir(), `${id}.json`), "utf8")) as AccessRequest;
  } catch {
    return null;
  }
}

export async function saveRequest(rec: AccessRequest): Promise<void> {
  const body = JSON.stringify(rec);
  if (useBlob()) {
    await put(`${PREFIX}${rec.id}.json`, body, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }
  await mkdir(dataDir(), { recursive: true });
  await writeFile(join(dataDir(), `${rec.id}.json`), body);
}

export async function listRequests(): Promise<AccessRequest[]> {
  let ids: string[] = [];
  if (useBlob()) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      ids.push(...page.blobs.map((b) => b.pathname.slice(PREFIX.length).replace(/\.json$/, "")));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else {
    try {
      ids = (await readdir(dataDir())).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
    } catch {
      ids = [];
    }
  }
  const recs = await Promise.all(ids.map(getRequest));
  return recs
    .filter((r): r is AccessRequest => r !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
