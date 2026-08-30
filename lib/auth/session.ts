// lib/auth/session.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth/tokens";

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "alltos_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export async function createSession(userId: string) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({
    data: { token, userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { token } });
    return null;
  }

  return session.user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}
