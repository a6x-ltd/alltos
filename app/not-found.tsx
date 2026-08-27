// app/not-found.tsx — Nike.com-inspired theme
import Link from 'next/link';
import { Anton, Inter } from 'next/font/google';
import { ArrowRight } from 'lucide-react';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const QUICK_LINKS = [
  { label: 'Vitamins', href: '/products?category=vitamins' },
  { label: 'OTC', href: '/products?category=otc' },
  { label: 'Immunity', href: '/products?category=immunity' },
  { label: 'Energy', href: '/products?category=energy' },
];

export default function NotFound() {
  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <p className="font-[family-name:var(--font-display)] uppercase text-[6rem] md:text-[9rem] leading-none">
          404
        </p>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl mt-2">
          Page not found
        </h1>
        <p className="text-sm text-black/50 mt-3 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist, or may have moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold mt-8 hover:bg-black/85 transition"
        >
          Back to home
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-5 py-2.5 rounded-full border border-black/15 text-xs font-semibold uppercase tracking-wide hover:border-black transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}