// lib/email/sendVerificationEmail.ts
import { resend } from "./resend";

export async function sendVerificationEmail(
  to: string,
  firstName: string,
  token: string,
) {
  const verifyUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

  const { error } = await resend.emails.send({
    from: "ALLTOS <onboarding@resend.dev>", // swap for your verified domain later
    to,
    subject: "Verify your ALLTOS account",
    html: `
      <p>Hi ${firstName},</p>
      <p>Thanks for creating an ALLTOS account. Please verify your email address to get started:</p>
      <p><a href="${verifyUrl}">Verify my email</a></p>
      <p>This link expires in 24 hours. If you didn't create this account, you can ignore this email.</p>
    `,
  });

  if (error) {
    console.error("Failed to send verification email:", error);
  }
}
