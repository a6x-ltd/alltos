// app/admin/dashboard/page.tsx
import Link from 'next/link';
import { Package, AlertTriangle, PoundSterling, ShoppingBag } from 'lucide-react';
import { products } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';

// Replace with real order data.
const RECENT_ORDERS = [
  { id: '#WB-10482', customer: 'Sam Whitfield', total: 61.4, status: 'Delivered' },
  { id: '#WB-10481', customer: 'Priya Nair', total: 24.9, status: 'Processing' },
  { id: '#WB-10480', customer: 'Tom Baker', total: 52.1, status: 'Shipped' },
];

const STATUS_STYLE: Record<string, string> = {
  Delivered: 'bg-black text-white',
  Shipped: 'bg-[#F5F5F5] text-black border border-black/20',
  Processing: 'bg-[#F5F5F5] text-black border border-black/20',
  Cancelled: 'bg-transparent text-red-600 border border-red-600',
};

export default function AdminDashboardPage() {
  const lowStock = products.filter((p) => p.stock < 20);

  const stats = [
    { label: 'Total products', value: products.length, icon: Package },
    { label: 'Low stock', value: lowStock.length, icon: AlertTriangle },
    { label: 'Total revenue', value: '£2,847', icon: PoundSterling },
    { label: 'Orders today', value: '12', icon: ShoppingBag },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="border border-black/10 rounded-2xl p-5 hover:border-black/30 transition"
          >
            <Icon className="w-5 h-5 text-black/40 mb-3" strokeWidth={2} />
            <p className="font-[family-name:var(--font-display)] text-3xl">{value}</p>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Recent orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              Recent orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-60 transition"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-black/10 border-t border-b border-black/10">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3.5 text-sm">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-black/50 text-xs mt-0.5">{order.customer}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="font-[family-name:var(--font-display)] text-base w-16 text-right">
                  {formatCurrency(order.total)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock alert */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              Low stock alert
            </h2>
            <Link
              href="/admin/inventory"
              className="text-xs font-semibold uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-60 transition"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-black/10 border-t border-b border-black/10">
            {lowStock.length === 0 ? (
              <p className="text-sm text-black/50 py-4">Everything is well stocked.</p>
            ) : (
              lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-3.5 text-sm">
                  <p className="font-medium">{p.name}</p>
                  <span className="text-red-600 font-semibold text-xs uppercase tracking-wide">
                    {p.stock} left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}