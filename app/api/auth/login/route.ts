// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation/auth";
import { createSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  // Same generic error whether the email doesn't exist or the password is wrong —
  // don't help an attacker figure out which emails are registered.
  const genericError = NextResponse.json(
    { error: "Invalid email or password" },
    { status: 401 },
  );

  if (!user) return genericError;

  const validPassword = await verify(user.passwordHash, password);
  if (!validPassword) return genericError;

  if (!user.emailVerified) {
    return NextResponse.json(
      { error: "Please verify your email before logging in" },
      { status: 403 },
    );
  }

  await createSession(user.id);

  return NextResponse.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  });
}
