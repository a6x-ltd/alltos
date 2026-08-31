// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCart } from "@/lib/cart/getOrCreateCart";
import { serializeProduct } from "@/lib/api/serializeProduct";

export async function GET() {
  const cart = await getOrCreateCart();

  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true },
    orderBy: { createdAt: "asc" },
  });

  const lines = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: serializeProduct(item.product),
  }));

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return NextResponse.json({ items: lines, subtotal });
}
