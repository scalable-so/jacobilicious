import { cookies } from "next/headers";
import { readToken } from "./token";

export const ADMIN_COOKIE = "jl_admin";
export const ADMIN_DAYS = 30;

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return readToken(jar.get(ADMIN_COOKIE)?.value, "adm") === "owner";
}
