// app/admin/discounts/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Copy } from 'lucide-react';

interface Discount {
  code: string;
  type: 'Percentage' | 'Fixed';
  value: string;
  used: number;
  status: 'Active' | 'Expired';
}

// Replace with real discount data.
const DISCOUNTS: Discount[] = [
  { code: 'WELCOME10', type: 'Percentage', value: '10%', used: 214, status: 'Active' },
  { code: 'SUMMER5', type: 'Fixed', value: '£5.00', used: 88, status: 'Active' },
  { code: 'BFRIDAY25', type: 'Percentage', value: '25%', used: 1032, status: 'Expired' },
];

export default function AdminDiscountsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
          Discounts
        </h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-black/85 transition"
        >
          <Plus className="w-4 h-4" />
          New discount
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Code</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Type</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Value</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Used</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">Status</th>
              <th className="py-3 font-semibold uppercase text-xs tracking-wide">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {DISCOUNTS.map((d) => (
              <tr key={d.code} className="border-b border-black/10 hover:bg-[#FAFAFA] transition">
                <td className="py-3.5 font-medium tracking-wide">{d.code}</td>
                <td className="py-3.5 text-black/60">{d.type}</td>
                <td className="py-3.5">{d.value}</td>
                <td className="py-3.5">{d.used}</td>
                <td className="py-3.5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                      d.status === 'Active'
                        ? 'bg-black text-white'
                        : 'bg-transparent text-black/40 border border-black/15'
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="py-3.5">
                  <button
                    onClick={() => copyCode(d.code)}
                    className="text-black/50 hover:text-black transition"
                    aria-label={`Copy ${d.code}`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copied === d.code && (
                    <span className="ml-2 text-[10px] uppercase text-black/50">Copied</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}