"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, ADMIN_DAYS, isAdmin } from "@/lib/admin";
import { LINK_DAYS, MAX_MAILS, adminPin } from "@/lib/config";
import { accessMail, sendMail } from "@/lib/mail";
import { originOf } from "@/lib/origin";
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

/** Approve: the person gets the personal link by mail, when a mail provider is set up. */
export async function approve(form: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const rec = await getRequest(String(form.get("id") ?? ""));
  if (!rec) return;
  rec.status = "approved";
  rec.decidedBy = "owner";
  rec.decidedAt = new Date().toISOString();
  if (rec.mailsSent < MAX_MAILS) {
    const link = `${originOf(await headers())}/freischalten?t=${signToken("dl", rec.id, LINK_DAYS * 86400)}`;
    if (await sendMail(accessMail(rec, link))) rec.mailsSent += 1;
  }
  await saveRequest(rec);
  revalidatePath("/admin");
}

/** Reject or revoke: every link of this person stops working. No mail goes out. */
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
