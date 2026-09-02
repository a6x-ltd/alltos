// app/account/addresses/page.tsx
'use client';

import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';

// Replace with real saved addresses.
const ADDRESSES = [
  { label: 'Home', line1: '123 Example Street', city: 'London', postcode: 'EC1A 1AA', default: true },
  { label: 'Work', line1: '45 Business Park', city: 'London', postcode: 'E14 5AB', default: false },
];

export default function AccountAddressesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
          Saved addresses
        </h2>
        <button className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-black/85 transition">
          <Plus className="w-3.5 h-3.5" />
          Add address
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {ADDRESSES.map((addr) => (
          <div key={addr.label} className="border border-black/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black/40" />
                <span className="text-sm font-semibold">{addr.label}</span>
                {addr.default && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide bg-[#F5F5F5] px-2 py-0.5 rounded-full text-black/50">
                    Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-black/40 hover:text-black transition" aria-label={`Edit ${addr.label}`}>
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="text-black/40 hover:text-red-600 transition" aria-label={`Delete ${addr.label}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-black/60 leading-relaxed">
              {addr.line1}
              <br />
              {addr.city}, {addr.postcode}
              <br />
              United Kingdom
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}