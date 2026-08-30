// lib/api/serializeProduct.ts
import type { Product as DbProduct } from "@/app/generated/prisma/client";

const CATEGORY_MAP = {
  SUPPLEMENT: "supplement",
  OTC: "otc",
  VITAMIN: "vitamin",
} as const;

const BADGE_MAP = {
  NEW: "NEW",
  BESTSELLER: "Bestseller",
  SALE: "Sale",
} as const;

export function serializeProduct(product: DbProduct) {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : null,
    image: product.image,
    category: CATEGORY_MAP[product.category],
    badge: product.badge ? BADGE_MAP[product.badge] : undefined,
    stock: product.stock,
    rating: Number(product.rating),
    reviews: product.reviewCount,
    slug: product.slug,
  };
}
