// app/api/wishlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { serializeProduct } from "@/lib/api/serializeProduct";

const addWishlistItemSchema = z.object({
  productId: z.string().min(1),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 },
    );
  }

  const wishlist = await prisma.wishlist.findUnique({
    where: { userId: user.id },
    include: {
      items: { include: { product: true }, orderBy: { createdAt: "desc" } },
    },
  });

  const items = (wishlist?.items ?? []).map((item) => ({
    id: item.id,
    product: serializeProduct(item.product),
  }));

  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = addWishlistItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: parsed.data.productId },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const wishlist = await prisma.wishlist.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  const item = await prisma.wishlistItem.upsert({
    where: {
      wishlistId_productId: { wishlistId: wishlist.id, productId: product.id },
    },
    update: {},
    create: { wishlistId: wishlist.id, productId: product.id },
  });

  return NextResponse.json({ item }, { status: 201 });
}
