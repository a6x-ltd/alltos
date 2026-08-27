// app/wishlist/page.tsx — Nike.com-inspired theme
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Anton, Inter } from 'next/font/google';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/utils/data';
import { Product } from '@/types';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export default function WishlistPage() {
  // Seeded from product data for this preview — replace with real saved-items state.
  const [wishlist, setWishlist] = useState<Product[]>(products.slice(1, 4));

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mb-2">
          Your wishlist
        </h1>
        <p className="text-sm text-black/50 mb-10">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
        </p>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 border-t border-black/10">
            <Heart className="w-10 h-10 text-black/30 mb-4" strokeWidth={1.5} />
            <p className="font-[family-name:var(--font-display)] uppercase text-2xl">
              Nothing saved yet
            </p>
            <p className="text-sm text-black/50 mt-2 max-w-xs">
              Tap the heart on any product to save it here for later.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold mt-8 hover:bg-black/85 transition"
            >
              Discover products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {wishlist.map((product) => (
              <div key={product.id} className="relative">
                <button
                  onClick={() => removeItem(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center hover:bg-black transition"
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                </button>
                <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full flex items-center justify-center gap-2 mt-3 border border-black text-black text-xs font-semibold uppercase tracking-wide px-4 py-2.5 rounded-full hover:bg-black hover:text-white transition"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Move to bag
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}