// app/products/new/page.tsx — "New arrivals" listing
'use client';

import { useMemo, useState } from 'react';
import { Anton, Inter } from 'next/font/google';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/utils/data';
import { Product } from '@/types';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export default function NewArrivalsPage() {
  // Sourced from the `badge` field on your Product data — anything tagged
  // 'NEW' shows up here. Swap for a real `releasedAt`/`isNew` field if you add one.
  const newProducts = useMemo(() => products.filter((p) => p.badge === 'NEW'), []);

  const categories = useMemo(
    () => Array.from(new Set(newProducts.map((p) => p.category))),
    [newProducts]
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? newProducts.filter((p) => p.category === activeCategory)
    : newProducts;

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Just landed
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2">
          New arrivals
        </h1>
        <p className="text-sm text-black/50 mt-2">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
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
            Nothing new here right now — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 mt-10">
            {filtered.map((product) => (
              <div key={product.id} className="relative">
                {/* <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                  New
                </span> */}
                <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}