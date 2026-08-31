// app/search/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
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

const POPULAR_SEARCHES = ['Vitamin C', 'Magnesium', 'Probiotic', 'Omega-3', 'Sleep'];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="relative">
          <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-black/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            autoFocus
            className="w-full pl-10 pr-10 py-4 border-0 border-b-2 border-black/15 bg-transparent font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl focus:outline-none focus:border-black transition"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {!query.trim() && (
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-full border border-black/15 text-sm hover:border-black transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {query.trim() && (
          <div className="mt-10">
            <p className="text-sm text-black/50 mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>

            {results.length === 0 ? (
              <p className="text-sm text-black/50 py-12 text-center">
                No products matched your search. Try a different term.
              </p>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
                {results.map((product) => (
                  <div key={product.id} className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                    <ProductCard product={product} onAddToCart={handleAddToCart} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}