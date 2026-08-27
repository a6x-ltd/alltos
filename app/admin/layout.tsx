// app/admin/layout.tsx — shared shell for all /admin/* pages
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anton, Inter } from 'next/font/google';
import {
  LayoutDashboard,
  Truck,
  Pill,
  Users,
  Boxes,
  BarChart3,
  Tag,
  FileText,
  Settings,
} from 'lucide-react';

// NOTE: if the rest of the site also uses Anton/Inter, consider hoisting this
// to the root app/layout.tsx instead so the font is only loaded once.
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: Truck },
  { label: 'Products', href: '/admin/products', icon: Pill },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Discounts', href: '/admin/discounts', icon: Tag },
  { label: 'Content', href: '/admin/content', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
    >
      <div className="grid md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="bg-black text-white p-6 md:min-h-screen">
          <Link
            href="/admin/dashboard"
            className="font-[family-name:var(--font-display)] uppercase text-lg tracking-wide"
          >
            Admin
          </Link>
          <nav className="mt-8 space-y-1">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || pathname?.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium uppercase tracking-wide transition ${
                    active
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.25} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Page content */}
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}