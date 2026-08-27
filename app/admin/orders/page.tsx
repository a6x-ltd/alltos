// app/admin/orders/page.tsx
'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

// Replace with real order data (API/DB).
const ORDERS: Order[] = [
  { id: '#WB-10482', customer: 'Sam Whitfield', date: '12 Aug 2026', items: 2, total: 61.4, status: 'Delivered' },
  { id: '#WB-10481', customer: 'Priya Nair', date: '11 Aug 2026', items: 1, total: 24.9, status: 'Processing' },
  { id: '#WB-10480', customer: 'Tom Baker', date: '10 Aug 2026', items: 3, total: 52.1, status: 'Shipped' },
  { id: '#WB-10479', customer: 'Alicia Grant', date: '09 Aug 2026', items: 1, total: 19.2, status: 'Cancelled' },
  { id: '#WB-10478', customer: 'James Doyle', date: '08 Aug 2026', items: 4, total: 88.7, status: 'Delivered' },
];

const FILTERS = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;

const STATUS_STYLE: Record<Order['status'], string> = {
  Delivered: 'bg-black text-white',
  Shipped: 'bg-[#F5F5F5] text-black border border-black/20',
  Processing: 'bg-[#F5F5F5] text-black border border-black/20',
  Cancelled: 'bg-transparent text-red-600 border border-red-600',
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const filtered = filter === 'All' ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
        Orders
      </h1>

      <div className="flex flex-wrap gap-2 mt-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
              filter === f
                ? 'bg-black text-white'
                : 'border border-black/15 text-black/60 hover:border-black hover:text-black'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Order</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Customer</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Date</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Items</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Total</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Status</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-black/10 hover:bg-[#FAFAFA] transition">
                <td className="py-3.5 font-medium">{order.id}</td>
                <td className="py-3.5">{order.customer}</td>
                <td className="py-3.5 text-black/60">{order.date}</td>
                <td className="py-3.5">{order.items}</td>
                <td className="py-3.5">{formatCurrency(order.total)}</td>
                <td className="py-3.5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3.5">
                  <button className="text-black/50 hover:text-black transition" aria-label="View order">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}