// app/admin/inventory/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { products as seedProducts } from '@/utils/data';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(seedProducts);

  const adjustStock = (id: number, delta: number) => {
    setInventory((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  };

  const sorted = [...inventory].sort((a, b) => a.stock - b.stock);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
        Inventory
      </h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Product</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Category</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Stock</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.id} className="border-b border-black/10 hover:bg-[#FAFAFA] transition">
                <td className="py-3.5 font-medium">{p.name}</td>
                <td className="py-3.5 capitalize text-black/60">{p.category}</td>
                <td className="py-3.5">
                  <span
                    className={`font-[family-name:var(--font-display)] text-lg ${
                      p.stock <= 5 ? 'text-red-600' : ''
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center border border-black/15 rounded-full w-fit">
                    <button
                      onClick={() => adjustStock(p.id, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition"
                      aria-label={`Decrease stock for ${p.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => adjustStock(p.id, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition"
                      aria-label={`Increase stock for ${p.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}