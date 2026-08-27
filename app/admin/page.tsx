// app/admin/page.tsx — Nike.com-inspired admin theme
'use client';

import { useState } from 'react';
import { Anton, Inter } from 'next/font/google';
import {
  LayoutDashboard,
  Truck,
  Pill,
  Users,
  Settings,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { products } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';

// NOTE: instantiate fonts once in app/layout.tsx in a real project.
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: Truck },
  { id: 'products', label: 'Products', icon: Pill },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminPage() {
  const [inventory] = useState(products);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total products', value: inventory.length },
    { label: 'Low stock', value: inventory.filter((p) => p.stock < 20).length },
    { label: 'Total revenue', value: '£2,847' },
    { label: 'Orders today', value: '12' },
  ];

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="grid md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="bg-black text-white p-6 md:min-h-screen">
          <h4 className="font-[family-name:var(--font-display)] uppercase text-lg tracking-wide">
            Admin
          </h4>
          <nav className="mt-8 space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium uppercase tracking-wide transition ${
                  activeTab === id
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.25} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="p-6 md:p-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
              Product inventory
            </h3>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-black/85 transition"
            >
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-black/10 rounded-2xl p-5 hover:border-black/30 transition"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
                  {stat.label}
                </span>
                <p className="font-[family-name:var(--font-display)] text-3xl mt-1.5">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Product table */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-3 font-semibold uppercase text-xs tracking-wide">Product</th>
                  <th className="py-3 font-semibold uppercase text-xs tracking-wide">Category</th>
                  <th className="py-3 font-semibold uppercase text-xs tracking-wide">Price</th>
                  <th className="py-3 font-semibold uppercase text-xs tracking-wide">Stock</th>
                  <th className="py-3 font-semibold uppercase text-xs tracking-wide">Status</th>
                  <th className="py-3 font-semibold uppercase text-xs tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((product) => {
                  const status =
                    product.stock > 20 ? 'In stock' : product.stock > 5 ? 'Low stock' : 'Critical';
                  const statusStyle =
                    product.stock > 20
                      ? 'bg-black text-white'
                      : product.stock > 5
                      ? 'bg-[#F5F5F5] text-black border border-black/20'
                      : 'bg-transparent text-red-600 border border-red-600';

                  return (
                    <tr key={product.id} className="border-b border-black/10 hover:bg-[#FAFAFA] transition">
                      <td className="py-3.5 font-medium">{product.name}</td>
                      <td className="py-3.5 capitalize text-black/60">{product.category}</td>
                      <td className="py-3.5">{formatCurrency(product.price)}</td>
                      <td className="py-3.5">{product.stock}</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${statusStyle}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex gap-3">
                          <button className="text-black/50 hover:text-black transition" aria-label="Edit product">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="text-black/50 hover:text-red-600 transition" aria-label="Delete product">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-wrap justify-between items-center gap-4 text-sm text-black/60">
            <span>Showing {inventory.length} products</span>
            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full border border-black/15 hover:border-black transition"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
                1
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-black/15 hover:border-black transition text-sm font-semibold text-black">
                2
              </button>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full border border-black/15 hover:border-black transition"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}