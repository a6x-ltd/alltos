// app/admin/products/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { products } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';

export default function AdminProductsPage() {
  const [inventory] = useState(products);
  const [query, setQuery] = useState('');

  const filtered = inventory.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
          Products
        </h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-black/85 transition"
        >
          <Plus className="w-4 h-4" />
          Add new
        </button>
      </div>

      <div className="relative mt-6 max-w-xs">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/15 text-sm focus:outline-none focus:border-black transition"
        />
      </div>

      <div className="mt-6 overflow-x-auto">
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
            {filtered.map((product) => {
              const status = product.stock > 20 ? 'In stock' : product.stock > 5 ? 'Low stock' : 'Critical';
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
    </div>
  );
}