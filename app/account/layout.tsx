// app/account/layout.tsx — shared shell for all /account/* pages
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anton, Inter } from 'next/font/google';
import { Heart } from 'lucide-react';

// NOTE: consider hoisting these to the root app/layout.tsx if the rest of the
// site also uses Anton/Inter, so the font is only loaded once.
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const TABS = [
  { label: 'Overview', href: '/account/overview' },
  { label: 'Orders', href: '/account/orders' },
  { label: 'Addresses', href: '/account/addresses' },
  { label: 'Settings', href: '/account/settings' },
];

// Replace with real session data.
const USER = { firstName: 'Sam', memberSince: '2023' };

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Member since {USER.memberSince}
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2">
          Welcome back, {USER.firstName}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mt-8 border-b border-black/10 pb-6 mb-10">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide transition ${
                  active ? 'bg-black text-white' : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
          <Link
            href="/wishlist"
            className="ml-auto hidden sm:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black/60 hover:text-black transition"
          >
            <Heart className="w-4 h-4" />
            Wishlist
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}