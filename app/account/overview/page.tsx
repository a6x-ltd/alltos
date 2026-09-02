// app/account/overview/page.tsx
import Link from 'next/link';
import { Package, Heart, MapPin, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

// Replace with real order data.
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

export default function AccountOverviewPage() {
  return (
    <div className="space-y-10">
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
            Recent orders
          </h2>
          <Link
            href="/account/orders"
            className="text-xs font-semibold uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-60 transition"
          >
            View all
          </Link>
        </div>
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
  );
}