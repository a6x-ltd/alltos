// app/page.tsx (Homepage) — Nike.com-inspired layout & aesthetic
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anton, Inter } from 'next/font/google';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/utils/data';
import { Product } from '@/types';




// NOTE: instantiate fonts once in app/layout.tsx in a real project.
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

// Replace these with real category photography — square/portrait shots work best.
const CATEGORIES = [
  { label: 'Vitamins', href: '/products?category=vitamins', image: '/images/nut-geek.png', large: true },
  { label: 'OTC', href: '/products?category=otc', image: '/images/supplement.jpg', large: false },
  { label: 'Immunity', href: '/products?category=immunity', image: '/images/gummies.webp', large: false },
  { label: 'Energy', href: '/products?category=energy', image: '/images/whey2.jpg', large: false },
  { label: 'Sleep', href: '/products?category=sleep', image: '/images/sleep.png', large: false },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlideCount = 3; // decorative — wire up to real slides if you add more hero images

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Would dispatch to cart context/state
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-(family-name:--font-body) bg-white text-black`}>
      

      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-[92vh] overflow-hidden">
        <Image
          src="/images/althos-chick.jpg"
          alt="Wellness and health products"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

        <div className="relative h-full min-h-[80vh] md:min-h-[92vh] flex flex-col justify-end px-6 md:px-12 pb-14 md:pb-20">
         
          <h1 className="font-(family-name:--font-display) mb-3 uppercase text-white leading-[0.85] text-[3rem] sm:text-[4.5rem] md:text-[6.5rem]">
            Fuel your
            <br />
            vitality.
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-sm  high-empathy">
             Formulated for the modern self.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#ead6c8] text-black px-8 py-3.5  text-sm font-semibold hover:bg-white/90 transition aero"
            >
              Shop now
            </Link>
            <Link
              href="#featured"
              className="inline-flex items-center gap-2 border border-[#ead6c8] text-[#ead6c8] px-8 py-3.5  text-sm font-semibold hover:bg-white hover:text-black transition aero"
            >
              Explore
            </Link>
          </div>

          {/* Decorative slide indicators */}
          <div className="hidden md:flex absolute bottom-10 right-12 gap-2">
            {Array.from({ length: heroSlideCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="py-14 md:py-20 px-6 md:px-12">
        <h2 className="font-(family-name:--font-display) uppercase text-2xl md:text-3xl mb-6">
          Shop by category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 md:gap-4">
          {CATEGORIES.map(({ label, href, image, large }) => (
            <Link
              key={label}
              href={href}
              className={`group relative overflow-hidden bg-black ${
                large
                  ? 'lg:col-span-2 lg:row-span-2 aspect-4/5 sm:aspect-square lg:aspect-auto'
                  : 'aspect-square'
              }`}
            >
              <Image
                src={image}
                alt={label}
                fill
                className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <p className="text-white font-(family-name:--font-display) uppercase text-xl md:text-2xl">
                  {label}
                </p>
                <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold uppercase tracking-wide mt-1 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0">
                  Shop
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-14 md:py-20 px-6 md:px-12" id="featured">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <h2 className="font-(family-name:--font-display) uppercase text-2xl md:text-3xl">
            Bestsellers
          </h2>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-60 transition"
          >
            Shop all
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {featuredProducts.map((product, i) => (
            <div key={product.id} className="relative">
              {i < 2 && (
                <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                  Bestseller
                </span>
              )}
              <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership / promo banner */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <Image
          src="/images/wellness.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-xl">
          <h2 className="font-(family-name:--font-display) uppercase text-white text-4xl md:text-5xl leading-[0.9]">
            Members get more.
          </h2>
          <p className="text-white/80 text-sm md:text-base mt-4">
            Join free for early access to new formulas, personalised routines,
            and exclusive member pricing.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold mt-8 hover:bg-white/90 transition"
          >
            Join us
          </Link>
        </div>
      </section>
    </div>
  );
}