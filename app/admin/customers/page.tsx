// app/admin/customers/page.tsx
'use client';

import { useState } from 'react';
import { Search, Mail } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  joined: string;
}

// Replace with real customer data.
const CUSTOMERS: Customer[] = [
  { id: 'C-001', name: 'Sam Whitfield', email: 'sam.w@example.com', orders: 6, spent: 312.4, joined: 'Mar 2023' },
  { id: 'C-002', name: 'Priya Nair', email: 'priya.n@example.com', orders: 2, spent: 74.2, joined: 'Jan 2024' },
  { id: 'C-003', name: 'Tom Baker', email: 'tom.b@example.com', orders: 9, spent: 501.9, joined: 'Sep 2022' },
  { id: 'C-004', name: 'Alicia Grant', email: 'alicia.g@example.com', orders: 1, spent: 19.2, joined: 'Jul 2026' },
];

export default function AdminCustomersPage() {
  const [query, setQuery] = useState('');

  const filtered = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
        Customers
      </h1>

      <div className="relative mt-6 max-w-xs">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers"
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/15 text-sm focus:outline-none focus:border-black transition"
        />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Customer</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Orders</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Total spent</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Joined</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-black/10 hover:bg-[#FAFAFA] transition">
                <td className="py-3.5">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-black/50 text-xs mt-0.5">{c.email}</p>
                </td>
                <td className="py-3.5">{c.orders}</td>
                <td className="py-3.5 font-[family-name:var(--font-display)] text-base">
                  {formatCurrency(c.spent)}
                </td>
                <td className="py-3.5 text-black/60">{c.joined}</td>
                <td className="py-3.5">
                  <button className="text-black/50 hover:text-black transition" aria-label={`Email ${c.name}`}>
                    <Mail className="w-4 h-4" />
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