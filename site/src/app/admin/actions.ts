"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, ADMIN_DAYS, isAdmin } from "@/lib/admin";
import { adminPin } from "@/lib/config";
import { getRequest, saveRequest } from "@/lib/store";
import { samePin, signToken } from "@/lib/token";

export async function login(form: FormData) {
  // A fixed pause makes guessing the PIN slow.
  await new Promise((r) => setTimeout(r, 700));
  if (!samePin(String(form.get("pin") ?? ""), adminPin())) redirect("/admin?e=pin");
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, signToken("adm", "owner", ADMIN_DAYS * 86400), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_DAYS * 86400,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
}

/** Approve: the address may now open the package on the site. */
export async function approve(form: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const rec = await getRequest(String(form.get("id") ?? ""));
  if (!rec) return;
  rec.status = "approved";
  rec.decidedBy = "owner";
  rec.decidedAt = new Date().toISOString();
  await saveRequest(rec);
  revalidatePath("/admin");
}

/** Reject or revoke: the address and every link of this person stop working. */
export async function reject(form: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const rec = await getRequest(String(form.get("id") ?? ""));
  if (!rec) return;
  rec.status = "rejected";
  rec.decidedBy = "owner";
  rec.decidedAt = new Date().toISOString();
  await saveRequest(rec);
  revalidatePath("/admin");
}
