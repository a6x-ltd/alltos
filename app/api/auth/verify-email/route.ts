// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const token = body?.token;

  if (!token || typeof token !== "string") {
    return NextResponse.json(
      { error: "Missing verification token" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { verifyToken: token } });

  if (
    !user ||
    !user.verifyTokenExpiresAt ||
    user.verifyTokenExpiresAt < new Date()
  ) {
    return NextResponse.json(
      { error: "Invalid or expired verification link" },
      { status: 400 },
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
    },
  });

  return NextResponse.json({ message: "Email verified successfully" });
}
