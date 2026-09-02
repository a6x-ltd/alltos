// app/api/cart/items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCart } from "@/lib/cart/getOrCreateCart";
import { addCartItemSchema } from "@/lib/validation/cart";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = addCartItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { productId, quantity } = parsed.data;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.status !== "active") {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const cart = await getOrCreateCart();

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  const desiredQuantity = (existing?.quantity ?? 0) + quantity;
  if (desiredQuantity > product.stock) {
    return NextResponse.json(
      { error: `Only ${product.stock} in stock` },
      { status: 409 },
    );
  }

  const item = await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity: desiredQuantity },
    create: { cartId: cart.id, productId, quantity },
  });

  return NextResponse.json({ item }, { status: 201 });
}
