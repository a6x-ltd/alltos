// app/api/cart/items/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCart } from "@/lib/cart/getOrCreateCart";
import { updateCartItemSchema } from "@/lib/validation/cart";

async function verifyOwnership(itemId: string) {
  const cart = await getOrCreateCart();
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item || item.cartId !== cart.id) return null;
  return item;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = updateCartItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const existingItem = await verifyOwnership(id);
  if (!existingItem) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  const product = await prisma.product.findUnique({
    where: { id: existingItem.productId },
  });
  if (!product || parsed.data.quantity > product.stock) {
    return NextResponse.json(
      { error: `Only ${product?.stock ?? 0} in stock` },
      { status: 409 },
    );
  }

  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity: parsed.data.quantity },
  });

  return NextResponse.json({ item: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const existingItem = await verifyOwnership(id);
  if (!existingItem) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id } });

  return NextResponse.json({ message: "Item removed" });
}
