import { strToU8, zipSync, type Zippable } from "fflate";
import files from "@/generated/package-files.json";
import type { AccessRequest } from "./store";

type PackedFile = { path: string; exec: boolean; b64: string };

/** The personal copy: the package plus ACCESS.md naming the recipient. */
export function buildZip(rec: AccessRequest, issuedAt: Date): Uint8Array {
  const tree: Zippable = {};
  for (const f of files as PackedFile[]) {
    // os 3 = Unix, so the mode in attrs survives and scripts stay executable
    tree[`jacobilicious/${f.path}`] = [
      new Uint8Array(Buffer.from(f.b64, "base64")),
      { os: 3, attrs: (f.exec ? 0o100755 : 0o100644) << 16 },
    ];
  }
  const access = [
    "# Personal copy",
    "",
    `Recipient: ${rec.name} <${rec.email}>`,
    `Issued: ${issuedAt.toISOString().slice(0, 10)}`,
    `ID: ${rec.id}`,
    "",
    "This copy of Jacobilicious is for you. Please do not share it.",
    "Anyone else who wants it gets access on the page where you got it.",
    "",
  ].join("\n");
  tree["jacobilicious/ACCESS.md"] = [strToU8(access), { os: 3, attrs: 0o100644 << 16 }];
  return zipSync(tree, { level: 6 });
}
