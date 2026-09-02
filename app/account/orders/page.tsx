// app/account/orders/page.tsx
import { formatCurrency } from '@/utils/currency';

// Replace with real order data.
const ORDERS = [
  { id: '#WB-10482', date: '12 Aug 2026', status: 'Delivered', total: 61.4, items: 2 },
  { id: '#WB-10367', date: '28 Jun 2026', status: 'Delivered', total: 24.9, items: 1 },
  { id: '#WB-10201', date: '03 Apr 2026', status: 'Processing', total: 52.1, items: 3 },
  { id: '#WB-10098', date: '11 Jan 2026', status: 'Cancelled', total: 32.5, items: 1 },
];

const STATUS_STYLE: Record<string, string> = {
  Delivered: 'bg-black text-white',
  Processing: 'bg-[#F5F5F5] text-black border border-black/20',
  Cancelled: 'bg-transparent text-red-600 border border-red-600',
};

export default function AccountOrdersPage() {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
        Order history
      </h2>
      <div className="divide-y divide-black/10 border-t border-b border-black/10">
        {ORDERS.map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-sm font-semibold">{order.id}</p>
              <p className="text-xs text-black/50 mt-0.5">
                {order.date} · {order.items} item{order.items > 1 ? 's' : ''}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[order.status]}`}
            >
              {order.status}
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg w-16 text-right">
              {formatCurrency(order.total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}