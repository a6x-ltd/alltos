// app/admin/reports/page.tsx
import { products } from '@/utils/data';

// Replace with real analytics data.
const WEEKLY_REVENUE = [
  { label: 'Mon', value: 320 },
  { label: 'Tue', value: 410 },
  { label: 'Wed', value: 280 },
  { label: 'Thu', value: 512 },
  { label: 'Fri', value: 601 },
  { label: 'Sat', value: 730 },
  { label: 'Sun', value: 455 },
];

const TOP_PRODUCTS = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

export default function AdminReportsPage() {
  const max = Math.max(...WEEKLY_REVENUE.map((d) => d.value));

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
        Reports
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Revenue chart — plain CSS bars, swap for a chart library if one's installed */}
        <div className="border border-black/10 rounded-2xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-6">
            Revenue this week
          </h2>
          <div className="flex items-end gap-3 h-40">
            {WEEKLY_REVENUE.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-black rounded-t-md transition-all"
                  style={{ height: `${(d.value / max) * 100}%` }}
                />
                <span className="text-[10px] font-semibold uppercase text-black/50">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="border border-black/10 rounded-2xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-6">
            Top products by reviews
          </h2>
          <div className="space-y-4">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-display)] text-lg w-5 text-black/30">
                    {i + 1}
                  </span>
                  <span className="font-medium">{p.name}</span>
                </div>
                <span className="text-black/50">{p.reviews} reviews</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}