// lib/cart/getOrCreateCart.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { generateToken } from "@/lib/auth/tokens";

const CART_COOKIE_NAME = "alltos_cart_session";
const CART_COOKIE_DURATION_MS = 1000 * 60 * 60 * 24 * 90; // 90 days

export async function getOrCreateCart() {
  const user = await getCurrentUser();
  const cookieStore = await cookies();

  if (user) {
    let cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: user.id } });
    }

    const guestSessionId = cookieStore.get(CART_COOKIE_NAME)?.value;
    if (guestSessionId) {
      const guestCart = await prisma.cart.findUnique({
        where: { sessionId: guestSessionId },
        include: { items: true },
      });
      if (guestCart && guestCart.id !== cart.id) {
        for (const item of guestCart.items) {
          await prisma.cartItem.upsert({
            where: {
              cartId_productId: { cartId: cart.id, productId: item.productId },
            },
            update: { quantity: { increment: item.quantity } },
            create: {
              cartId: cart.id,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
        await prisma.cart.delete({ where: { id: guestCart.id } });
      }
      cookieStore.delete(CART_COOKIE_NAME);
    }

    return cart;
  }

  let sessionId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (sessionId) {
    const existing = await prisma.cart.findUnique({ where: { sessionId } });
    if (existing) return existing;
  }

  sessionId = generateToken();
  const cart = await prisma.cart.create({ data: { sessionId } });

  cookieStore.set(CART_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + CART_COOKIE_DURATION_MS),
    path: "/",
  });

  return cart;
}
