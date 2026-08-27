// app/account/page.tsx — Nike.com-inspired theme
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Anton, Inter } from 'next/font/google';
import { Package, MapPin, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'orders', label: 'Orders' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'settings', label: 'Settings' },
];

// Replace with real session/order data.
const USER = { firstName: 'Sam', memberSince: '2023' };

const ORDERS = [
  { id: '#WB-10482', date: '12 Aug 2026', status: 'Delivered', total: 61.4, items: 2 },
  { id: '#WB-10367', date: '28 Jun 2026', status: 'Delivered', total: 24.9, items: 1 },
  { id: '#WB-10201', date: '03 Apr 2026', status: 'Processing', total: 52.1, items: 3 },
];

const STATUS_STYLE: Record<string, string> = {
  Delivered: 'bg-black text-white',
  Processing: 'bg-[#F5F5F5] text-black border border-black/20',
  Cancelled: 'bg-transparent text-red-600 border border-red-600',
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Member since {USER.memberSince}
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2">
          Welcome back, {USER.firstName}
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 border-b border-black/10 pb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide transition ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <Link
            href="/wishlist"
            className="ml-auto hidden sm:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black/60 hover:text-black transition"
          >
            <Heart className="w-4 h-4" />
            Wishlist
          </Link>
        </div>

        {activeTab === 'overview' && (
          <div className="mt-8 space-y-10">
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { label: 'Total orders', value: ORDERS.length, icon: Package },
                { label: 'Reward points', value: '340', icon: Heart },
                { label: 'Saved addresses', value: '2', icon: MapPin },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="border border-black/10 rounded-2xl p-5">
                  <Icon className="w-5 h-5 text-black/40 mb-3" strokeWidth={2} />
                  <p className="font-[family-name:var(--font-display)] text-3xl">{value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
                Recent orders
              </h2>
              <div className="divide-y divide-black/10 border-t border-b border-black/10">
                {ORDERS.map((order) => (
                  <button
                    key={order.id}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left hover:bg-[#FAFAFA] transition px-1"
                  >
                    <div>
                      <p className="text-sm font-semibold">{order.id}</p>
                      <p className="text-xs text-black/50 mt-0.5">
                        {order.date} · {order.items} item{order.items > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[order.status]}`}
                      >
                        {order.status}
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-lg w-16 text-right">
                        {formatCurrency(order.total)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-black/30" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="mt-8 divide-y divide-black/10 border-t border-b border-black/10">
            {ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-black/50 mt-0.5">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg">
                  {formatCurrency(order.total)}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {['Home', 'Work'].map((label) => (
              <div key={label} className="border border-black/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-black/40" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
                <p className="text-sm text-black/60 leading-relaxed">
                  123 Example Street
                  <br />
                  London, EC1A 1AA
                  <br />
                  United Kingdom
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="mt-8 max-w-md space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium py-3 border-b border-black/10">
              <Settings className="w-4 h-4 text-black/40" />
              Account preferences
            </div>
            <button className="flex items-center gap-3 text-sm font-medium text-red-600 py-3">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}