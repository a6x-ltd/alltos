// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/app/generated/prisma/client";
import { serializeProduct } from "@/lib/api/serializeProduct";

const CATEGORY_REVERSE_MAP: Record<string, "SUPPLEMENT" | "OTC" | "VITAMIN"> = {
  supplement: "SUPPLEMENT",
  otc: "OTC",
  vitamin: "VITAMIN",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryParam = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Prisma.ProductWhereInput = { status: "active" };

  if (categoryParam && CATEGORY_REVERSE_MAP[categoryParam]) {
    where.category = CATEGORY_REVERSE_MAP[categoryParam];
  }

  if (search && search.trim()) {
    where.OR = [
      { name: { contains: search.trim(), mode: "insensitive" } },
      { description: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products: products.map(serializeProduct) });
}
