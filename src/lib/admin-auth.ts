import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "@/lib/email";

const COOKIE = "aimp_admin";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function sign(password: string) {
  return createHmac("sha256", password).update("aimonipoint-admin-v1").digest();
}

export function isAdminConfigured() {
  return Boolean(env("ADMIN_PASSWORD"));
}

export function isCorrectPassword(candidate: string) {
  const password = env("ADMIN_PASSWORD");
  return Boolean(password) && timingSafeEqual(sign(candidate), sign(password!));
}

export async function isAdmin() {
  const password = env("ADMIN_PASSWORD");
  const value = (await cookies()).get(COOKIE)?.value;
  if (!password || !value) return false;
  const given = Buffer.from(value, "hex");
  const expected = sign(password);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function startAdminSession() {
  (await cookies()).set(COOKIE, sign(env("ADMIN_PASSWORD")!).toString("hex"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
}

export async function endAdminSession() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
}
