// prisma/seed.ts
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "@node-rs/argon2";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Products — migrated from utils/data.ts
  const products = [
    {
      sku: "ALT-VITD-001",
      name: "Vitamin D Complex",
      slug: "vitamin-d-complex",
      description:
        "High-potency vitamin D with zinc and citrus bioflavonoids for immune support",
      image: "/images/vitd.webp",
      category: "VITAMIN" as const,
      badge: "NEW" as const,
      price: 24.9,
      stock: 43,
      rating: 4.8,
      reviewCount: 214,
    },
    {
      sku: "ALT-OMEGA-001",
      name: "Omega-3 + EPA",
      slug: "omega-3-epa",
      description:
        "Algal oil supplement with 1200mg EPA/DHA for heart and brain health",
      image: "/images/omega3.jpg",
      category: "SUPPLEMENT" as const,
      price: 32.5,
      stock: 12,
      rating: 4.9,
      reviewCount: 187,
    },
    {
      sku: "ALT-PROB-001",
      name: "Daily Probiotic",
      slug: "daily-probiotic",
      description:
        "10 clinically studied strains with 50 billion CFU for gut health",
      image: "/images/probiotic.jpg",
      category: "SUPPLEMENT" as const,
      badge: "BESTSELLER" as const,
      price: 28.9,
      stock: 27,
      rating: 4.7,
      reviewCount: 302,
    },
    {
      sku: "ALT-MAG-001",
      name: "Magnesium Glycinate",
      slug: "magnesium-glycinate",
      description:
        "400mg highly bioavailable magnesium for sleep and muscle recovery",
      image: "/images/magnesium.webp",
      category: "SUPPLEMENT" as const,
      price: 19.2,
      stock: 56,
      rating: 4.6,
      reviewCount: 156,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products`);

  // Admin user — CHANGE THIS PASSWORD after first login
  const adminPasswordHash = await hash("ChangeMe123!");
  await prisma.user.upsert({
    where: { email: "admin@alltos.co.uk" },
    update: {},
    create: {
      email: "admin@alltos.co.uk",
      passwordHash: adminPasswordHash,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      emailVerified: true,
    },
  });
  console.log("Seeded admin user (admin@alltos.co.uk / ChangeMe123!)");

  // Store settings — single row
  const existingSettings = await prisma.storeSettings.findFirst();
  if (!existingSettings) {
    await prisma.storeSettings.create({ data: {} });
    console.log("Seeded default store settings");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
