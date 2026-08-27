// app/products/sale/page.tsx — "Sale" listing
'use client';

import { useMemo, useState } from 'react';
import { Anton, Inter } from 'next/font/google';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';
import { Product } from '@/types';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

// NOTE: your Product type has no discount/sale-price field, so there's no real
// way to know which items are actually on sale. This mocks a subset with a
// flat 20% off for preview purposes — replace with a real `salePrice` (or
// `discountPercent`) field on Product and filter on that instead.
const MOCK_DISCOUNT = 0.2;
const SALE_PRODUCT_IDS = [1, 3]; // stand-in for a real "onSale" flag

interface SaleItem {
  product: Product;
  originalPrice: number;
  salePrice: number;
}

export default function SalePage() {
  const saleItems: SaleItem[] = useMemo(
    () =>
      products
        .filter((p) => SALE_PRODUCT_IDS.includes(p.id))
        .map((p) => ({
          product: p,
          originalPrice: p.price,
          salePrice: Math.round(p.price * (1 - MOCK_DISCOUNT) * 100) / 100,
        })),
    []
  );

  const categories = useMemo(
    () => Array.from(new Set(saleItems.map((s) => s.product.category))),
    [saleItems]
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? saleItems.filter((s) => s.product.category === activeCategory)
    : saleItems;

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
          Limited time
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2">
          Sale
        </h1>
        <p className="text-sm text-black/50 mt-2">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} reduced
        </p>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
                activeCategory === null
                  ? 'bg-black text-white'
                  : 'border border-black/15 text-black/60 hover:border-black hover:text-black'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide capitalize transition ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'border border-black/15 text-black/60 hover:border-black hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-sm text-black/50 mt-16 text-center">
            No sale items right now — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 mt-10">
            {filtered.map(({ product, originalPrice, salePrice }) => (
              <div key={product.id} className="relative">
                <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                  -{Math.round(MOCK_DISCOUNT * 100)}%
                </span>
                <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
                {/* ProductCard renders the base price internally — this line
                    surfaces the discounted price alongside it until Product
                    has a real salePrice field to pass through instead. */}
                <div className="flex items-center gap-2 mt-2 px-1">
                  <span className="text-sm font-semibold text-red-600">
                    {formatCurrency(salePrice)}
                  </span>
                  <span className="text-xs text-black/40 line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}