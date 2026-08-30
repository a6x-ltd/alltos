// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation/auth";
import { generateToken } from "@/lib/auth/tokens";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Deliberately vague — don't reveal whether an email is registered
    return NextResponse.json(
      { error: "Unable to create account with these details" },
      { status: 409 },
    );
  }

  const passwordHash = await hash(password);
  const verifyToken = generateToken();
  const verifyTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      verifyToken,
      verifyTokenExpiresAt,
      cart: { create: {} },
      wishlist: { create: {} },
    },
  });

  // TODO (Step 3): send real verification email via Resend
  console.log(
    `[DEV] Verification link: ${process.env.APP_URL}/verify-email?token=${verifyToken}`,
  );

  return NextResponse.json(
    {
      message:
        "Account created. Please check your email to verify your account.",
    },
    { status: 201 },
  );
}
